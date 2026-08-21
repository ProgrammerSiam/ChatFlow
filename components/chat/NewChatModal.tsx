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
  const { conversations, createDirectConversation } = useConversations();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-[32px] border border-border/80 bg-white/95 dark:bg-card/95 p-7 shadow-2xl backdrop-blur-2xl text-card-foreground">
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 font-bold">
              <UserPlus className="h-4 w-4" />
            </div>
            <h2 className="text-base font-bold tracking-tight">New Direct Message</h2>
          </div>
          <button
            onClick={() => setNewChatOpen(false)}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="mt-4 relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or phone number..."
            autoFocus
            className="w-full rounded-2xl border border-input bg-background pl-10 pr-4 py-2.5 text-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 shadow-xs"
          />
        </div>

        {/* Results List */}
        <div className="mt-4 max-h-60 overflow-y-auto space-y-1 pr-1">
          {isLoading ? (
            <div className="py-8 flex flex-col items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
              <span className="text-xs">Searching teammates...</span>
            </div>
          ) : error ? (
            <p className="py-6 text-center text-xs text-destructive">Failed to search users</p>
          ) : users.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground space-y-1">
              <UserIcon className="h-8 w-8 mx-auto opacity-30" />
              <p className="text-xs font-medium">No teammates found</p>
              <p className="text-[11px] text-muted-foreground">Try typing their full phone or name</p>
            </div>
          ) : (
            users.map((targetUser) => {
              const isSelected = selectedUserId === targetUser._id;
              return (
                <button
                  key={targetUser._id}
                  onClick={() => handleSelectUser(targetUser)}
                  disabled={isSelected}
                  className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-purple-50/60 dark:hover:bg-purple-950/30 text-left transition-colors group cursor-pointer border border-transparent hover:border-purple-200/50 dark:hover:border-purple-800/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold text-sm shadow-inner">
                      {targetUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-xs sm:text-sm leading-tight text-foreground">
                        {targetUser.name}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">
                        {targetUser.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isSelected ? (
                      <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                    ) : (
                      <span className="rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/40 px-3 py-1 text-[11px] font-semibold text-purple-700 dark:text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity">
                        Chat ➔
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
