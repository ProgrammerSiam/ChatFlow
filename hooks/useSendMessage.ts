'use client';

import { useMutation, useQueryClient, InfiniteData } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Conversation, Message, MessagesResponse, User } from '@/types';
import { useAuthStore } from '@/store/useAuthStore';

export function useSendMessage(conversationId: string | null) {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const mutation = useMutation({
    mutationFn: async ({ text }: { text: string; tempId: string }) => {
      if (!conversationId) throw new Error('No active conversation');
      return api.sendMessage(conversationId, text);
    },
    onMutate: async ({ text, tempId }) => {
      if (!conversationId) return;

      // Cancel outgoing refetches so they don't overwrite optimistic update
      await queryClient.cancelQueries({ queryKey: ['messages', conversationId] });

      // Fallback user if store is hydrating
      let activeUser: User | null = user;
      if (!activeUser && typeof window !== 'undefined') {
        try {
          const stored = localStorage.getItem('chatflow_user');
          if (stored) activeUser = JSON.parse(stored);
        } catch {
          // ignore
        }
      }

      const optimisticMsg: Message = {
        _id: tempId,
        tempId,
        conversation: conversationId,
        sender: activeUser
          ? {
              _id: activeUser._id,
              name: activeUser.name,
              phone: activeUser.phone,
            }
          : 'me',
        text,
        createdAt: new Date().toISOString(),
        status: 'sending',
      };

      // Optimistically append to message list
      queryClient.setQueryData<InfiniteData<MessagesResponse>>(
        ['messages', conversationId],
        (oldData) => {
          if (!oldData) {
            return {
              pages: [{ messages: [optimisticMsg], hasMore: false }],
              pageParams: [undefined],
            };
          }

          const newPages = [...oldData.pages];
          if (newPages.length > 0) {
            const lastPageIndex = newPages.length - 1;
            newPages[lastPageIndex] = {
              ...newPages[lastPageIndex],
              messages: [...newPages[lastPageIndex].messages, optimisticMsg],
            };
          } else {
            newPages.push({ messages: [optimisticMsg], hasMore: false });
          }

          return {
            ...oldData,
            pages: newPages,
          };
        }
      );

      // Optimistically update conversation's last message in sidebar
      queryClient.setQueryData<Conversation[]>(['conversations'], (oldConvs = []) => {
        const existingIndex = oldConvs.findIndex((c) => c._id === conversationId);
        if (existingIndex === -1) return oldConvs;

        const updated = {
          ...oldConvs[existingIndex],
          lastMessage: {
            _id: tempId,
            text,
            sender: activeUser?._id || 'me',
            createdAt: new Date().toISOString(),
          },
          updatedAt: new Date().toISOString(),
        };

        const remaining = oldConvs.filter((c) => c._id !== conversationId);
        return [updated, ...remaining];
      });

      return { tempId };
    },
    onSuccess: (serverMsg, variables) => {
      if (!conversationId) return;

      const confirmedMsg: Message = {
        ...serverMsg,
        status: 'sent',
      };

      // Replace optimistic message with confirmed server message
      queryClient.setQueryData<InfiniteData<MessagesResponse>>(
        ['messages', conversationId],
        (oldData) => {
          if (!oldData) {
            return {
              pages: [{ messages: [confirmedMsg], hasMore: false }],
              pageParams: [undefined],
            };
          }

          let found = false;
          const newPages = oldData.pages.map((page) => {
            const updatedMessages = page.messages.map((m) => {
              if (m.tempId === variables.tempId || m._id === variables.tempId) {
                found = true;
                return confirmedMsg;
              }
              return m;
            });
            return { ...page, messages: updatedMessages };
          });

          // If temp message wasn't found, append server message to last page
          if (!found) {
            const lastIndex = newPages.length - 1;
            if (lastIndex >= 0) {
              newPages[lastIndex] = {
                ...newPages[lastIndex],
                messages: [...newPages[lastIndex].messages, confirmedMsg],
              };
            } else {
              newPages.push({ messages: [confirmedMsg], hasMore: false });
            }
          }

          return {
            ...oldData,
            pages: newPages,
          };
        }
      );

      // Invalidate conversations so sidebar is strictly synced
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: (_err, variables) => {
      if (!conversationId) return;

      // Mark message as failed
      queryClient.setQueryData<InfiniteData<MessagesResponse>>(
        ['messages', conversationId],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              messages: page.messages.map((m) =>
                m.tempId === variables.tempId || m._id === variables.tempId
                  ? { ...m, status: 'failed' }
                  : m
              ),
            })),
          };
        }
      );
    },
  });

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || !conversationId) return;
    const tempId = `temp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    return mutation.mutate({ text: trimmed, tempId });
  };

  const retry = (tempId: string, text: string) => {
    if (!conversationId) return;
    // Set status back to sending
    queryClient.setQueryData<InfiniteData<MessagesResponse>>(
      ['messages', conversationId],
      (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            messages: page.messages.map((m) =>
              m.tempId === tempId || m._id === tempId
                ? { ...m, status: 'sending' }
                : m
            ),
          })),
        };
      }
    );
    mutation.mutate({ text, tempId });
  };

  return {
    sendMessage: send,
    retryMessage: retry,
    isPending: mutation.isPending,
  };
}
