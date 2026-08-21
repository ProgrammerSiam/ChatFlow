'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useSocket } from '@/hooks/useSocket';
import Sidebar from '@/components/chat/Sidebar';
import ConnectionBanner from '@/components/chat/ConnectionBanner';
import NewChatModal from '@/components/chat/NewChatModal';
import NewGroupModal from '@/components/chat/NewGroupModal';
import UserProfileModal from '@/components/chat/UserProfileModal';
import { Loader2 } from 'lucide-react';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuthStore();

  // Initialize socket lifecycle
  useSocket();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm font-medium text-muted-foreground">
            Restoring ChatFlow session...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const isDetailView = pathname !== '/chat' && pathname.startsWith('/chat/');

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <ConnectionBanner />
      <div className="flex flex-1 overflow-hidden">
        {/* On mobile: Hide sidebar if viewing conversation details */}
        <div
          className={`h-full ${
            isDetailView ? 'hidden md:flex' : 'flex w-full md:w-auto'
          }`}
        >
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <main
          className={`flex-1 h-full overflow-hidden ${
            !isDetailView ? 'hidden md:flex flex-col' : 'flex flex-col'
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
