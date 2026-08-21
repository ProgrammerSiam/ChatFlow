'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import { SearchUser } from '@/types';

export function useUserSearch(initialQuery: string = '') {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const { user: currentUser } = useAuthStore();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 250);

    return () => clearTimeout(handler);
  }, [query]);

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ['users', 'search', debouncedQuery],
    queryFn: async () => {
      return api.searchUsers(debouncedQuery);
    },
    enabled: true,
    staleTime: 15 * 1000,
  });

  // Client-side filter to exclude current logged-in user
  const users: SearchUser[] = (data || []).filter(
    (u) => u._id !== currentUser?._id
  );

  return {
    query,
    setQuery,
    debouncedQuery,
    users,
    isLoading: isLoading || (debouncedQuery !== query.trim()),
    isFetching,
    error,
    refetch,
  };
}
