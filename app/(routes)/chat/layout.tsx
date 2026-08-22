'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useSocket } from '@/hooks/useSocket';
import Sidebar from '@/components/chat/Sidebar';
import NewChatModal from '@/components/chat/NewChatModal';
import NewGroupModal from '@/components/chat/NewGroupModal';
import UserProfileModal from '@/components/chat/UserProfileModal';
import { useChatUIStore } from '@/store/useChatUIStore';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuthStore();
  const { setNewChatOpen } = useChatUIStore();

  // Initialize socket lifecycle
  useSocket();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Global Command+K / Ctrl+K keyboard shortcut for Global Search
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setNewChatOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [setNewChatOpen]);

  // Layout-based Skeleton Loading (Exact layout and element anatomy)
  if (isLoading) {
    return (
      <div className="flex flex-col h-screen overflow-hidden bg-[#FAFAFA] dark:bg-background p-2 sm:p-3 gap-2 sm:gap-3 select-none">
        <div className="flex flex-1 overflow-hidden gap-2 sm:gap-3">
          
          {/* Sidebar Skeleton */}
          <aside className="w-full md:w-80 lg:w-84 h-full rounded-[24px] bg-[#FAFAFA] dark:bg-card border border-slate-200/80 dark:border-border/70 p-3.5 sm:p-4 flex flex-col justify-between shadow-xs shrink-0 overflow-hidden animate-pulse">
            <div className="space-y-3.5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-xl bg-slate-200 dark:bg-muted" />
                  <div className="h-4 w-20 rounded-md bg-slate-200 dark:bg-muted" />
                </div>
                <div className="h-8 w-8 rounded-xl bg-slate-200 dark:bg-muted" />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="h-10.5 rounded-xl bg-slate-200 dark:bg-muted" />
                <div className="h-10.5 rounded-xl bg-slate-200 dark:bg-muted" />
              </div>

              {/* Search Bar */}
              <div className="h-10 rounded-xl bg-white dark:bg-muted/40 border border-slate-200/60" />

              {/* Filter Chips */}
              <div className="flex gap-1.5">
                <div className="h-7 w-14 rounded-xl bg-slate-200 dark:bg-muted" />
                <div className="h-7 w-16 rounded-xl bg-slate-200 dark:bg-muted" />
                <div className="h-7 w-16 rounded-xl bg-slate-200 dark:bg-muted" />
              </div>

              {/* Conversations Feed Skeletons */}
              <div className="space-y-2 pt-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-2xl">
                    <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-muted shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3.5 w-3/4 rounded bg-slate-200 dark:bg-muted" />
                      <div className="h-2.5 w-1/2 rounded bg-slate-200 dark:bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Profile Skeleton */}
            <div className="pt-2 border-t border-slate-200/50">
              <div className="h-12 rounded-2xl bg-white dark:bg-muted/50 border border-slate-200/60" />
            </div>
          </aside>

          {/* Main Chat Canvas Skeleton */}
          <main className="flex-1 h-full rounded-[24px] bg-white dark:bg-card border border-slate-200/80 dark:border-border/70 shadow-xs flex flex-col justify-between overflow-hidden animate-pulse">
            {/* Header Skeleton */}
            <div className="h-14 px-5 border-b border-slate-100 dark:border-border/50 flex items-center justify-between">
              <div className="h-7 w-28 rounded-xl bg-slate-100 dark:bg-muted" />
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-xl bg-slate-100 dark:bg-muted" />
                <div className="h-8 w-20 rounded-xl bg-slate-100 dark:bg-muted" />
              </div>
            </div>

            {/* Central Sphere & Prompt Skeleton */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6">
              <div className="h-28 w-28 rounded-full bg-purple-100/60 dark:bg-purple-950/40" />
              <div className="space-y-2 flex flex-col items-center">
                <div className="h-4 w-28 rounded bg-slate-100 dark:bg-muted" />
                <div className="h-7 w-64 rounded-md bg-slate-100 dark:bg-muted" />
              </div>
              <div className="w-full max-w-2xl h-36 rounded-2xl bg-slate-50 dark:bg-muted/30 border border-slate-200/60" />
              <div className="grid grid-cols-3 gap-3 w-full max-w-2xl">
                <div className="h-20 rounded-2xl bg-slate-50 dark:bg-muted/30 border border-slate-200/60" />
                <div className="h-20 rounded-2xl bg-slate-50 dark:bg-muted/30 border border-slate-200/60" />
                <div className="h-20 rounded-2xl bg-slate-50 dark:bg-muted/30 border border-slate-200/60" />
              </div>
            </div>

            {/* Footer Skeleton */}
            <div className="h-10 px-5 border-t border-slate-100 dark:border-border/50" />
          </main>

        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const isDetailView = pathname !== '/chat' && pathname.startsWith('/chat/');

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#FAFAFA] dark:bg-background p-2 sm:p-3 gap-2 sm:gap-3">
      <div className="flex flex-1 overflow-hidden gap-2 sm:gap-3">
        {/* Left Sidebar */}
        <div
          className={`h-full ${
            isDetailView ? 'hidden md:flex' : 'flex w-full md:w-auto'
          }`}
        >
          <Sidebar />
        </div>

        {/* Main Content Area (Rounded Canvas) */}
        <main
          className={`flex-1 h-full overflow-hidden ${
            isDetailView ? 'flex' : 'hidden md:flex'
          }`}
        >
          {children}
        </main>
      </div>

      {/* Global Modals */}
      <NewChatModal />
      <NewGroupModal />
      <UserProfileModal />
    </div>
  );
}
