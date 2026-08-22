'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Users,
  X,
  MessageSquare,
  ArrowRight,
  Command,
  User as UserIcon,
} from 'lucide-react';
import { useChatUIStore } from '@/store/useChatUIStore';
import { useConversations } from '@/hooks/useConversations';
import { useUserSearch } from '@/hooks/useUserSearch';
import { toast } from 'sonner';
import { SearchUser } from '@/types';

type SearchTab = 'all' | 'conversations' | 'groups' | 'teammates';

export default function GlobalSearchModal() {
  const router = useRouter();
  const { isGlobalSearchOpen, setGlobalSearchOpen, setActiveConversationId } =
    useChatUIStore();
  const { conversations, createDirectConversation } = useConversations();
  const { query, setQuery, users, isLoading: isSearchingUsers } = useUserSearch();
  const [activeTab, setActiveTab] = useState<SearchTab>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isGlobalSearchOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isGlobalSearchOpen]);

  // Close on Escape key & Keyboard Navigation
  useEffect(() => {
    if (!isGlobalSearchOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setGlobalSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGlobalSearchOpen, setGlobalSearchOpen]);

  // Helper to check existing direct conversation
  const getExistingConversation = (userId: string) => {
    return conversations.find(
      (c) =>
        c.type === 'direct' &&
        ((c.participant && c.participant._id === userId) ||
          (c.participants && c.participants.some((p) => p._id === userId)))
    );
  };

  // Filter existing direct conversations
  const matchingDirects = useMemo(() => {
    const directs = conversations.filter((c) => c.type === 'direct');
    if (!query.trim()) return directs;
    const q = query.toLowerCase().trim();
    return directs.filter(
      (c) =>
        c.participant?.name?.toLowerCase().includes(q) ||
        c.participant?.phone?.includes(q) ||
        c.lastMessage?.text?.toLowerCase().includes(q)
    );
  }, [conversations, query]);

  // Filter existing group channels
  const matchingGroups = useMemo(() => {
    const groups = conversations.filter((c) => c.type === 'group');
    if (!query.trim()) return groups;
    const q = query.toLowerCase().trim();
    return groups.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) ||
        c.lastMessage?.text?.toLowerCase().includes(q) ||
        (c.participants || []).some(
          (p) =>
            p.name?.toLowerCase().includes(q) || p.phone?.includes(q)
        )
    );
  }, [conversations, query]);

  // Filter teammates from live search excluding those already shown in direct conversations
  const matchingTeammates = useMemo(() => {
    return users;
  }, [users]);

  if (!isGlobalSearchOpen) return null;

  const handleClose = () => {
    setGlobalSearchOpen(false);
    setQuery('');
    setActiveTab('all');
  };

  const handleOpenConversation = (convId: string) => {
    handleClose();
    setActiveConversationId(convId);
    router.push(`/chat/${convId}`);
  };

  const handleSelectTeammate = async (targetUser: SearchUser) => {
    try {
      const existingConv = getExistingConversation(targetUser._id);
      if (existingConv) {
        handleOpenConversation(existingConv._id);
        return;
      }
      const newConv = await createDirectConversation(targetUser._id);
      handleOpenConversation(newConv._id);
      toast.success(`Started conversation with ${targetUser.name}`);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Could not start conversation';
      toast.error(msg);
    }
  };

  const totalResults =
    (activeTab === 'all' || activeTab === 'conversations' ? matchingDirects.length : 0) +
    (activeTab === 'all' || activeTab === 'groups' ? matchingGroups.length : 0) +
    (activeTab === 'all' || activeTab === 'teammates' ? matchingTeammates.length : 0);

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/60 backdrop-blur-md p-3 sm:p-4 pt-12 sm:pt-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-[28px] border border-slate-200/80 dark:border-border/80 bg-white dark:bg-card p-5 sm:p-6 shadow-2xl text-card-foreground flex flex-col max-h-[85vh] overflow-hidden"
      >
        {/* Command Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-border/60">
          <div className="flex items-center gap-3">
            <div className="flex h-9.5 w-9.5 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-100 via-indigo-100 to-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 font-bold shadow-2xs">
              <Command className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                  Global Search
                </h2>
                <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-muted px-1.5 py-0.5 rounded border border-slate-200/60 dark:border-border/40">
                  ⌘K
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Jump to any conversation, group channel, or teammate
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100/80 hover:bg-slate-200/80 dark:bg-muted text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search Omnibox */}
        <div className="mt-4">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-4.5 w-4.5 text-purple-500 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search conversations, channels, phone numbers, or teammates..."
              className="w-full h-12 rounded-xl border border-slate-200 dark:border-border bg-slate-50/60 dark:bg-muted/40 pl-10.5 pr-10 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:bg-white dark:focus:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400 shadow-2xs transition-all font-sans"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Category Chips */}
        <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 dark:bg-muted/40 dark:text-slate-400'
            }`}
          >
            All Results
          </button>
          <button
            onClick={() => setActiveTab('conversations')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'conversations'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 dark:bg-muted/40 dark:text-slate-400'
            }`}
          >
            <MessageSquare className="h-3 w-3" />
            <span>Direct Chats ({matchingDirects.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'groups'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 dark:bg-muted/40 dark:text-slate-400'
            }`}
          >
            <Users className="h-3 w-3" />
            <span>Channels ({matchingGroups.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('teammates')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'teammates'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 dark:bg-muted/40 dark:text-slate-400'
            }`}
          >
            <UserIcon className="h-3 w-3" />
            <span>Teammates ({matchingTeammates.length})</span>
          </button>
        </div>

        {/* Results Container */}
        <div className="relative mt-2 flex-1 overflow-hidden min-h-[220px]">
          {/* Scroll Area */}
          <div className="max-h-[50vh] overflow-y-auto space-y-3 py-1 pr-1 no-scrollbar">
            {totalResults === 0 && !isSearchingUsers ? (
              <div className="py-12 text-center text-slate-400 space-y-1.5 border border-slate-200/60 dark:border-border/50 rounded-2xl bg-slate-50/40 dark:bg-muted/20 p-6">
                <Search className="h-8 w-8 mx-auto opacity-30 text-purple-600" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {query ? `No results matching "${query}"` : 'Type to search across everything'}
                </p>
                <p className="text-xs text-slate-400">
                  Search by teammate name, phone number, or group channel topic
                </p>
              </div>
            ) : (
              <>
                {/* 1. Group Channels */}
                {(activeTab === 'all' || activeTab === 'groups') &&
                  matchingGroups.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 pt-1">
                        Group Channels ({matchingGroups.length})
                      </p>
                      {matchingGroups.map((group) => (
                        <button
                          key={group._id}
                          onClick={() => handleOpenConversation(group._id)}
                          className="w-full flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-card border border-slate-200/70 dark:border-border/60 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-xs transition-all text-left cursor-pointer group"
                        >
                          <div className="flex items-center gap-3 min-w-0 pr-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 font-bold shrink-0 border border-purple-100 dark:border-purple-900/40 shadow-2xs group-hover:scale-105 transition-transform">
                              <Users className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-sm leading-tight text-slate-900 dark:text-white truncate">
                                  {group.name}
                                </p>
                                <span className="inline-flex items-center text-[10px] font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/70 border border-purple-200/60 dark:border-purple-800/50 px-1.5 py-0.5 rounded-md shrink-0">
                                  Group • {group.participants?.length || 0}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 mt-0.5 truncate">
                                {group.lastMessage?.text || 'No recent messages'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-100 dark:bg-muted text-slate-700 dark:text-slate-300 text-xs font-semibold group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-colors shrink-0">
                            <span>Open</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                {/* 2. Direct Conversations */}
                {(activeTab === 'all' || activeTab === 'conversations') &&
                  matchingDirects.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 pt-1">
                        Direct Chats ({matchingDirects.length})
                      </p>
                      {matchingDirects.map((conv) => {
                        const title = conv.participant?.name || 'Teammate';
                        return (
                          <button
                            key={conv._id}
                            onClick={() => handleOpenConversation(conv._id)}
                            className="w-full flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-card border border-slate-200/70 dark:border-border/60 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-xs transition-all text-left cursor-pointer group"
                          >
                            <div className="flex items-center gap-3 min-w-0 pr-2">
                              <div className="relative shrink-0">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 font-bold text-xs shadow-2xs group-hover:scale-105 transition-transform border border-indigo-100 dark:border-indigo-900/40">
                                  {title.charAt(0).toUpperCase()}
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-card" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold text-sm leading-tight text-slate-900 dark:text-white truncate">
                                    {title}
                                  </p>
                                  <span className="inline-flex items-center text-[10px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/60 dark:border-indigo-800/50 px-1.5 py-0.5 rounded-md shrink-0">
                                    Direct
                                  </span>
                                </div>
                                <p className="text-xs text-slate-400 mt-0.5 truncate font-mono">
                                  {conv.lastMessage?.text || conv.participant?.phone || 'Direct message'}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-100 dark:bg-muted text-slate-700 dark:text-slate-300 text-xs font-semibold group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-colors shrink-0">
                              <span>Open</span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                {/* 3. Teammate Directory */}
                {(activeTab === 'all' || activeTab === 'teammates') &&
                  matchingTeammates.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 pt-1">
                        Teammate Directory ({matchingTeammates.length})
                      </p>
                      {matchingTeammates.map((targetUser) => {
                        const existingConv = getExistingConversation(targetUser._id);
                        return (
                          <button
                            key={targetUser._id}
                            onClick={() => handleSelectTeammate(targetUser)}
                            className="w-full flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-card border border-slate-200/70 dark:border-border/60 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-xs transition-all text-left cursor-pointer group"
                          >
                            <div className="flex items-center gap-3 min-w-0 pr-2">
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#8E7CFF] via-[#A293FF] to-[#D5CCFF] text-white font-bold text-xs shadow-2xs group-hover:scale-105 transition-transform shrink-0">
                                {targetUser.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold text-sm leading-tight text-slate-900 dark:text-white truncate">
                                    {targetUser.name}
                                  </p>
                                  {existingConv ? (
                                    <span className="text-[10px] font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-1.5 py-0.2 rounded-md shrink-0">
                                      Active Chat
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 dark:bg-muted px-1.5 py-0.2 rounded-md shrink-0">
                                      Directory
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-400 font-mono mt-0.5 truncate">
                                  {targetUser.phone}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold shadow-2xs transition-colors shrink-0">
                              <MessageSquare className="h-3.5 w-3.5" />
                              <span>{existingConv ? 'Open' : 'Chat'}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
              </>
            )}
          </div>
        </div>

        {/* Command Footer Shortcuts */}
        <div className="pt-3 border-t border-slate-100 dark:border-border/60 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-muted border border-slate-200/80 dark:border-border/60 font-mono text-[10px] text-slate-600 dark:text-slate-300">
                ↵
              </kbd>
              <span>to select</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-muted border border-slate-200/80 dark:border-border/60 font-mono text-[10px] text-slate-600 dark:text-slate-300">
                ESC
              </kbd>
              <span>to close</span>
            </span>
          </div>
          <span className="text-[10px] text-purple-600 dark:text-purple-400 font-medium">
            Omni-search active
          </span>
        </div>
      </div>
    </div>
  );
}
