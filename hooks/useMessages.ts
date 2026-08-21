'use client';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Message, MessagesResponse } from '@/types';
import { useAuthStore } from '@/store/useAuthStore';
import { useMemo } from 'react';

export function useMessages(conversationId: string | null) {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  const query = useInfiniteQuery({
    queryKey: ['messages', conversationId],
    queryFn: async ({ pageParam }: { pageParam?: string }) => {
      if (!conversationId) {
        return { messages: [], hasMore: false };
      }
      return api.getMessages(conversationId, 20, pageParam);
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage: MessagesResponse) => {
      if (!lastPage.hasMore || !lastPage.messages || lastPage.messages.length === 0) {
        return undefined;
      }
      // Safely find the oldest message regardless of server array ordering
      let oldest = lastPage.messages[0];
      for (const m of lastPage.messages) {
        if (new Date(m.createdAt).getTime() < new Date(oldest.createdAt).getTime()) {
          oldest = m;
        }
      }
      return oldest?._id;
    },
    enabled: !!conversationId && isAuthenticated,
    staleTime: 10 * 1000,
  });

  // Flatten all messages across pages and sort chronologically (oldest to newest)
  const messages = useMemo(() => {
    if (!query.data) return [];
    const allMsgs: Message[] = [];
    const seenIds = new Set<string>();

    // Pages are loaded newest first or oldest first; let's combine and dedupe
    for (const page of query.data.pages) {
      if (Array.isArray(page.messages)) {
        for (const msg of page.messages) {
          const id = msg._id || msg.tempId;
          if (id && !seenIds.has(id)) {
            seenIds.add(id);
            allMsgs.push(msg);
          }
        }
      }
    }

    return allMsgs.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [query.data]);

  return {
    ...query,
    messages,
    queryClient,
  };
}
