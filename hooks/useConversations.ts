'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Conversation } from '@/types';
import { useAuthStore } from '@/store/useAuthStore';

export function useConversations() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  const query = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const res = await api.getConversations();
      return res.data || [];
    },
    enabled: isAuthenticated,
    staleTime: 30 * 1000,
  });

  const createDirectMutation = useMutation({
    mutationFn: (userId: string) => api.createDirectConversation(userId),
    onSuccess: (newConv) => {
      queryClient.setQueryData<Conversation[]>(['conversations'], (old = []) => {
        const filtered = old.filter((c) => c._id !== newConv._id);
        return [newConv, ...filtered];
      });
    },
  });

  const createGroupMutation = useMutation({
    mutationFn: ({ name, participantIds }: { name: string; participantIds: string[] }) =>
      api.createGroupConversation(name, participantIds),
    onSuccess: (newGroup) => {
      queryClient.setQueryData<Conversation[]>(['conversations'], (old = []) => {
        const filtered = old.filter((c) => c._id !== newGroup._id);
        return [newGroup, ...filtered];
      });
    },
  });

  return {
    ...query,
    conversations: query.data || [],
    createDirectConversation: createDirectMutation.mutateAsync,
    isCreatingDirect: createDirectMutation.isPending,
    createGroupConversation: createGroupMutation.mutateAsync,
    isCreatingGroup: createGroupMutation.isPending,
  };
}
