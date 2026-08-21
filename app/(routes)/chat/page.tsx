'use client';

import { MessageSquarePlus, Users, MessageCircle, LogOut } from 'lucide-react';
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
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-muted/10 h-full">
      <div className="max-w-md space-y-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-inner">
          <MessageCircle className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            {user?.name ? `Welcome, ${user.name}!` : 'Your Conversations'}
          </h2>
          <p className="text-sm text-muted-foreground">
            Select an existing conversation from the sidebar or start a new direct or group chat.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setNewChatOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow hover:opacity-90 transition-opacity"
          >
            <MessageSquarePlus className="h-4 w-4" />
            New Chat
          </button>
          <button
            onClick={() => setNewGroupOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-input bg-card px-5 py-2.5 text-sm font-medium text-card-foreground shadow-sm hover:bg-accent transition-colors"
          >
            <Users className="h-4 w-4" />
            New Group
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
