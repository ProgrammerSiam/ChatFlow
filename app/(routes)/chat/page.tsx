'use client';

import { MessageSquarePlus, Users, Sparkles, LogOut, Home } from 'lucide-react';
import { useChatUIStore } from '@/store/useChatUIStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ChatIndexPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setNewChatOpen, setNewGroupOpen } = useChatUIStore();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    queryClient.clear();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-purple-50/30 via-background to-background dark:from-purple-950/10 dark:via-background dark:to-background h-full">
      <div className="max-w-md space-y-6 rounded-[32px] border border-border/70 bg-white/85 dark:bg-card/85 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl">
        <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-3xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 shadow-inner">
          <Sparkles className="h-9 w-9" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            {user?.name ? `Welcome, ${user.name}!` : 'Your Conversations'}
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm leading-relaxed">
            Select an existing conversation from the sidebar or start a new direct or group chat with your teammates.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <button
            onClick={() => setNewChatOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-purple-500/25 transition-all hover:opacity-95 hover:shadow-purple-500/35 active:scale-95 cursor-pointer"
          >
            <MessageSquarePlus className="h-4 w-4" />
            <span>New Chat</span>
          </button>
          <button
            onClick={() => setNewGroupOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white dark:bg-muted px-5 py-2.5 text-xs font-semibold text-foreground shadow-xs hover:bg-muted transition-colors active:scale-95 cursor-pointer"
          >
            <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span>New Group</span>
          </button>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white dark:bg-muted px-4 py-2.5 text-xs font-semibold text-foreground shadow-xs hover:bg-muted transition-colors active:scale-95 cursor-pointer"
          >
            <Home className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span>Homepage</span>
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/10 px-4 py-2.5 text-xs font-semibold text-destructive hover:bg-destructive hover:text-white transition-colors active:scale-95 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
