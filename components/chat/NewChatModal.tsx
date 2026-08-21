'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, UserPlus, X, Loader2, User as UserIcon, MessageSquare } from 'lucide-react';
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
    <div
      onClick={() => setNewChatOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-[28px] border border-slate-200/80 dark:border-border/80 bg-white dark:bg-card p-6 sm:p-7 shadow-2xl text-card-foreground"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-border/60">
          <div className="flex items-center gap-3">
            <div className="flex h-9.5 w-9.5 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-100 to-indigo-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 font-bold shadow-2xs">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                New Direct Message
              </h2>
              <p className="text-xs text-slate-400">Search and chat with any registered user</p>
            </div>
          </div>
          <button
            onClick={() => setNewChatOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100/80 hover:bg-slate-200/80 dark:bg-muted text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="mt-5 space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Search Teammate
          </label>
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-4.5 w-4.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or phone number..."
              autoFocus
              className="w-full h-12 rounded-xl border border-slate-200 dark:border-border bg-slate-50/60 dark:bg-muted/40 pl-10.5 pr-4 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:bg-white dark:focus:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400 shadow-2xs transition-all"
            />
          </div>
        </div>

        {/* Results List with Top & Bottom Shadow Fades */}
        <div className="relative mt-4">
          {/* Top Shadow Vignette */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white dark:from-card to-transparent z-10 rounded-t-2xl" />

          {/* Scrollable List */}
          <div className="max-h-64 overflow-y-auto overflow-x-hidden no-scrollbar space-y-2 py-1 pb-3 pr-0.5">
            {isLoading ? (
              <div className="space-y-2 py-1 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50/70 dark:bg-muted/30 border border-slate-200/50 dark:border-border/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-muted/70 shrink-0" />
                      <div className="space-y-1.5">
                        <div className="h-4 w-28 rounded bg-slate-200 dark:bg-muted/70" />
                        <div className="h-3 w-20 rounded bg-slate-200 dark:bg-muted/70" />
                      </div>
                    </div>
                    <div className="h-7 w-16 rounded-xl bg-slate-200 dark:bg-muted/70" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="py-8 text-center text-xs text-rose-500">
                Failed to search users. Please try again.
              </div>
            ) : users.length === 0 ? (
              <div className="py-8 text-center text-slate-400 space-y-1 border border-slate-200/60 rounded-2xl bg-slate-50/40 p-4">
                <UserIcon className="h-7 w-7 mx-auto opacity-30" />
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {query ? 'No matching users found' : 'No registered users found'}
                </p>
                <p className="text-xs text-slate-400">
                  {query ? 'Check spelling and try again' : 'Invite teammates to join ChatFlow'}
                </p>
              </div>
            ) : (
              users.map((targetUser) => {
                const isStarting = selectedUserId === targetUser._id;
                return (
                  <button
                    key={targetUser._id}
                    disabled={isStarting}
                    onClick={() => handleSelectUser(targetUser)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-card border border-slate-200/70 dark:border-border/60 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-xs transition-all text-left cursor-pointer group disabled:opacity-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#8E7CFF] via-[#A293FF] to-[#D5CCFF] text-white font-bold text-xs shadow-2xs group-hover:scale-105 transition-transform">
                          {targetUser.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-card" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm leading-tight text-slate-900 dark:text-white">
                          {targetUser.name}
                        </p>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">
                          {targetUser.phone}
                        </p>
                      </div>
                    </div>

                    {isStarting ? (
                      <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                    ) : (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 text-xs font-semibold group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>Chat</span>
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Bottom Shadow Vignette */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-white dark:from-card to-transparent z-10 rounded-b-2xl" />
        </div>

      </div>
    </div>
  );
}
