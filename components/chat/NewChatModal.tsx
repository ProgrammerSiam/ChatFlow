'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, UserPlus, X, Loader2, User as UserIcon } from 'lucide-react';
import { useChatUIStore } from '@/store/useChatUIStore';
import { useConversations } from '@/hooks/useConversations';
import { useUserSearch } from '@/hooks/useUserSearch';
import { toast } from 'sonner';
import { SearchUser } from '@/types';

export default function NewChatModal() {
  const router = useRouter();
  const { isNewChatOpen, setNewChatOpen, setActiveConversationId } = useChatUIStore();
  const { conversations, createDirectConversation, isCreatingDirect } = useConversations();
  const { query, setQuery, users, isLoading, error } = useUserSearch();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isNewChatOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setNewChatOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isNewChatOpen, setNewChatOpen]);

  if (!isNewChatOpen) return null;

  const handleSelectUser = async (targetUser: SearchUser) => {
    setSelectedUserId(targetUser._id);
    try {
      // 1. Cache optimization: Check if direct conversation already exists
      const existingConv = conversations.find(
        (c) =>
          c.type === 'direct' &&
          ((c.participant && c.participant._id === targetUser._id) ||
            (c.participants && c.participants.some((p) => p._id === targetUser._id)))
      );

      if (existingConv) {
        setNewChatOpen(false);
        setActiveConversationId(existingConv._id);
        router.push(`/chat/${existingConv._id}`);
        return;
      }

      // 2. Otherwise create direct conversation via API
      const newConv = await createDirectConversation(targetUser._id);
      setNewChatOpen(false);
      setActiveConversationId(newConv._id);
      router.push(`/chat/${newConv._id}`);
      toast.success(`Started conversation with ${targetUser.name}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Could not start conversation';
      toast.error(msg);
    } finally {
      setSelectedUserId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-2xl text-card-foreground">
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold tracking-tight">New Direct Message</h2>
          </div>
          <button
            onClick={() => setNewChatOpen(false)}
            className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search user by name or phone number..."
              autoFocus
              className="w-full rounded-xl border border-input bg-background pl-9 pr-4 py-2.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        <div className="mt-4 max-h-60 overflow-y-auto space-y-2 pr-1">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-xs">Searching users...</span>
            </div>
          ) : error ? (
            <div className="py-6 text-center text-xs text-destructive">
              Failed to load search results. Please try again.
            </div>
          ) : query.trim().length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground">
              Type a name or phone number to find people.
            </div>
          ) : users.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground">
              No matching users found.
            </div>
          ) : (
            users.map((u) => {
              const isSelected = selectedUserId === u._id;
              return (
                <button
                  key={u._id}
                  onClick={() => handleSelectUser(u)}
                  disabled={isCreatingDirect}
                  className="flex w-full items-center justify-between rounded-xl p-3 text-left hover:bg-muted/70 transition-colors border border-transparent hover:border-border disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                      {u.name ? u.name.charAt(0).toUpperCase() : <UserIcon className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-tight">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.phone}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
