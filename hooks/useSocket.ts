'use client';

import { useEffect, useRef } from 'react';
import { useQueryClient, InfiniteData } from '@tanstack/react-query';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatUIStore } from '@/store/useChatUIStore';
import { initializeSocket, setSocketQueryClient } from '@/lib/socket';
import { Conversation, Message, MessagesResponse } from '@/types';

export function useSocket() {
  const queryClient = useQueryClient();
  const { token, user, isAuthenticated } = useAuthStore();
  const { activeConversationId } = useChatUIStore();
  const activeIdRef = useRef(activeConversationId);
  const currentUserIdRef = useRef(user?._id);

  useEffect(() => {
    activeIdRef.current = activeConversationId;
    currentUserIdRef.current = user?._id;
  }, [activeConversationId, user?._id]);

  useEffect(() => {
    setSocketQueryClient(queryClient);
  }, [queryClient]);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      return;
    }

    const socket = initializeSocket(token);

    const handleNewMessage = (msg: Message) => {
      const activeId = activeIdRef.current;
      const currentUserId = currentUserIdRef.current;
      const convId = msg.conversation;

      // 1. If message belongs to active chat, update active messages cache with deduplication
      if (activeId && convId === activeId) {
        queryClient.setQueryData<InfiniteData<MessagesResponse>>(
          ['messages', activeId],
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
                if (m._id === msg._id) {
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
        const existing = oldConvs.find((c) => c._id === convId);
        const isActive = activeId === convId;
        const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
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

          const remaining = oldConvs.filter((c) => c._id !== convId);
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

    socket.on('message:new', handleNewMessage);
    socket.on('conversation:updated', handleConversationUpdated);

    return () => {
      socket.off('message:new', handleNewMessage);
      socket.off('conversation:updated', handleConversationUpdated);
    };
  }, [isAuthenticated, token, queryClient]);
}
