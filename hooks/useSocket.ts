'use client';

import { useEffect, useRef } from 'react';
import { useQueryClient, InfiniteData } from '@tanstack/react-query';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatUIStore } from '@/store/useChatUIStore';
import { initializeSocket, getSocket, setSocketQueryClient } from '@/lib/socket';
import { Conversation, Message, MessagesResponse } from '@/types';

export function useSocket() {
  const queryClient = useQueryClient();
  const { token, user, isAuthenticated } = useAuthStore();
  const { activeConversationId } = useChatUIStore();
  const activeIdRef = useRef(activeConversationId);
  const currentUserIdRef = useRef(user?._id);

  // Keep refs in sync — these are read inside event handlers to avoid
  // stale closures without forcing effect re-runs.
  useEffect(() => {
    activeIdRef.current = activeConversationId;
  }, [activeConversationId]);

  useEffect(() => {
    currentUserIdRef.current = user?._id;
  }, [user?._id]);

  // Provide the QueryClient reference to the socket module for gap-fill
  useEffect(() => {
    setSocketQueryClient(queryClient);
  }, [queryClient]);

  // ────────────────────────────────────────────────────────────
  // Effect 1: Socket initialization + event listener registration
  // Deps: [isAuthenticated, token, queryClient]
  // Does NOT include activeConversationId — handlers read from
  // activeIdRef.current instead to avoid teardown/rebuild on every
  // conversation switch.
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isAuthenticated || !token) {
      return;
    }

    const socket = initializeSocket(token);

    const handleNewMessage = (rawMsg: Message | Record<string, unknown>) => {
      const msg = rawMsg as Message;
      const activeId = activeIdRef.current;
      const currentUserId = currentUserIdRef.current;

      const rawConv = msg.conversation || (msg as unknown as Record<string, unknown>).conversationId || (msg as unknown as Record<string, unknown>).conversation_id || (msg as unknown as Record<string, unknown>).room;
      const convId =
        typeof rawConv === 'object' && rawConv !== null
          ? (rawConv as { _id?: string })._id || (rawConv as { id?: string }).id
          : rawConv;

      const convIdStr = convId ? String(convId).trim() : null;
      const activeIdStr = activeId ? String(activeId).trim() : null;

      // 1. If message belongs to active chat, update active messages cache with deduplication
      if (activeIdStr && convIdStr && convIdStr === activeIdStr) {
        queryClient.setQueryData<InfiniteData<MessagesResponse>>(
          ['messages', activeIdStr],
          (oldData) => {
            if (!oldData) {
              return {
                pages: [{ messages: [msg], hasMore: false }],
                pageParams: [undefined],
              };
            }

            let alreadyExists = false;
            let replacedSending = false;

            const newPages = oldData.pages.map((page) => {
              const updated = page.messages.map((m) => {
                if (m._id === msg._id || (m.tempId && m.tempId === msg.tempId)) {
                  alreadyExists = true;
                  return msg;
                }
                if (m.status === 'sending' && m.text === msg.text) {
                  replacedSending = true;
                  return { ...msg, status: 'sent' as const };
                }
                return m;
              });
              return { ...page, messages: updated };
            });

            if (alreadyExists || replacedSending) {
              return {
                ...oldData,
                pages: newPages,
              };
            }

            const lastIndex = newPages.length - 1;
            if (lastIndex >= 0) {
              newPages[lastIndex] = {
                ...newPages[lastIndex],
                messages: [...newPages[lastIndex].messages, msg],
              };
            } else {
              newPages.push({ messages: [msg], hasMore: false });
            }

            return {
              ...oldData,
              pages: newPages,
            };
          }
        );
      }

      // 2. Update sidebar conversations cache (reorder to top, update lastMessage, unread count)
      queryClient.setQueryData<Conversation[]>(['conversations'], (oldConvs = []) => {
        const existing = oldConvs.find((c) => String(c._id).trim() === convIdStr);
        const isActive = activeIdStr && convIdStr && activeIdStr === convIdStr;
        const senderId = typeof msg.sender === 'object' ? msg.sender?._id : msg.sender;
        const isFromSelf = senderId === currentUserId;

        if (existing) {
          const updated: Conversation = {
            ...existing,
            lastMessage: {
              _id: msg._id,
              text: msg.text,
              sender: msg.sender,
              createdAt: msg.createdAt,
            },
            unreadCount:
              isActive || isFromSelf
                ? 0
                : (existing.unreadCount || 0) + 1,
            updatedAt: msg.createdAt || new Date().toISOString(),
          };

          const remaining = oldConvs.filter((c) => String(c._id).trim() !== convIdStr);
          return [updated, ...remaining];
        } else {
          // If conversation is brand new to this client, invalidate conversations to fetch fresh shape
          queryClient.invalidateQueries({ queryKey: ['conversations'] });
          return oldConvs;
        }
      });
    };

    const handleConversationUpdated = (updatedConv: Conversation) => {
      queryClient.setQueryData<Conversation[]>(['conversations'], (oldConvs = []) => {
        const index = oldConvs.findIndex((c) => c._id === updatedConv._id);
        if (index === -1) {
          return [updatedConv, ...oldConvs];
        }
        const copy = [...oldConvs];
        copy[index] = {
          ...copy[index],
          ...updatedConv,
        };
        return copy;
      });
    };

    // Register all standard real-time message event variants
    socket.on('message:new', handleNewMessage);
    socket.on('message', handleNewMessage);
    socket.on('new_message', handleNewMessage);
    socket.on('newMessage', handleNewMessage);
    socket.on('conversation:updated', handleConversationUpdated);
    socket.on('conversation_updated', handleConversationUpdated);

    return () => {
      socket.off('message:new', handleNewMessage);
      socket.off('message', handleNewMessage);
      socket.off('new_message', handleNewMessage);
      socket.off('newMessage', handleNewMessage);
      socket.off('conversation:updated', handleConversationUpdated);
      socket.off('conversation_updated', handleConversationUpdated);
    };
  }, [isAuthenticated, token, queryClient]);

  // ────────────────────────────────────────────────────────────
  // Effect 2: Room join/leave on conversation switch
  // Deps: [activeConversationId, isAuthenticated]
  // Separated from Effect 1 so switching conversations doesn't
  // tear down and rebuild all event listeners.
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isAuthenticated || !activeConversationId) return;

    const socket = getSocket();
    if (!socket) return;

    const joinRoom = () => {
      // Read the latest activeConversationId from ref in case it changed
      // between this handler being registered and firing
      const currentActiveId = activeIdRef.current;
      if (currentActiveId) {
        socket.emit('join', currentActiveId);
        socket.emit('join_conversation', currentActiveId);
        socket.emit('joinRoom', currentActiveId);
      }
    };

    // Join immediately if already connected
    if (socket.connected) {
      joinRoom();
    }

    // Also join on (re)connect so room membership survives reconnection
    socket.on('connect', joinRoom);

    return () => {
      socket.off('connect', joinRoom);
    };
  }, [activeConversationId, isAuthenticated]);
}
