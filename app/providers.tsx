'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect, type ReactNode } from 'react';
import { Toaster } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';

function AuthInitializer({ children }: { children: ReactNode }) {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return <>{children}</>;
}

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer>
        {children}
        <Toaster
          position="top-center"
          theme="system"
          toastOptions={{
            className:
              '!rounded-2xl !border !border-slate-200/80 dark:!border-border/80 !bg-white/95 dark:!bg-card/95 !text-slate-900 dark:!text-white !backdrop-blur-md !shadow-xl !px-4 !py-3 !text-xs !font-medium',
            duration: 2500,
          }}
        />
      </AuthInitializer>
    </QueryClientProvider>
  );
}
