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
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ['users', 'search', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery) return [];
      return api.searchUsers(debouncedQuery);
    },
    enabled: debouncedQuery.length > 0,
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
    isLoading: isLoading || (debouncedQuery !== query && query.length > 0),
    isFetching,
    error,
    refetch,
  };
}
