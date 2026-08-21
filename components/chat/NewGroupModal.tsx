'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Users, X, Search, Loader2, Check, User as UserIcon, UserPlus, CheckCircle2, MessageSquare } from 'lucide-react';
import { useChatUIStore } from '@/store/useChatUIStore';
import { useConversations } from '@/hooks/useConversations';
import { useUserSearch } from '@/hooks/useUserSearch';
import { toast } from 'sonner';
import { SearchUser } from '@/types';
import { triggerMilestoneCelebration } from '@/lib/confetti';

export default function NewGroupModal() {
  const router = useRouter();
  const { isNewGroupOpen, setNewGroupOpen, setActiveConversationId } = useChatUIStore();
  const { conversations, createGroupConversation, isCreatingGroup } = useConversations();
  const { query, setQuery, users, isLoading } = useUserSearch();

  const [groupName, setGroupName] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<SearchUser[]>([]);
  const [filterMode, setFilterMode] = useState<'all' | 'direct_only' | 'shared_groups_only' | 'new_only'>('all');

  // Close on Escape key
  useEffect(() => {
    if (!isNewGroupOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setNewGroupOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isNewGroupOpen, setNewGroupOpen]);

  // Helper to check if direct conversation already exists
  const getExistingConversation = (userId: string) => {
    return conversations.find(
      (c) =>
        c.type === 'direct' &&
        ((c.participant && c.participant._id === userId) ||
          (c.participants && c.participants.some((p) => p._id === userId)))
    );
  };

  // Helper to check shared group objects
  const getSharedGroups = (userId: string) => {
    return conversations.filter(
      (c) =>
        c.type === 'group' &&
        (c.participants || []).some((p) => p._id === userId)
    );
  };

  const directUsersCount = useMemo(() => {
    return users.filter((u) => !!getExistingConversation(u._id)).length;
  }, [users, conversations]);

  const sharedGroupsUsersCount = useMemo(() => {
    return users.filter((u) => getSharedGroups(u._id).length > 0).length;
  }, [users, conversations]);

  const newUsersCount = useMemo(() => {
    return users.filter((u) => !getExistingConversation(u._id) && getSharedGroups(u._id).length === 0).length;
  }, [users, conversations]);

  const displayedUsers = useMemo(() => {
    if (filterMode === 'direct_only') {
      return users.filter((u) => !!getExistingConversation(u._id));
    }
    if (filterMode === 'shared_groups_only') {
      return users.filter((u) => getSharedGroups(u._id).length > 0);
    }
    if (filterMode === 'new_only') {
      return users.filter((u) => !getExistingConversation(u._id) && getSharedGroups(u._id).length === 0);
    }
    return users;
  }, [users, conversations, filterMode]);

  if (!isNewGroupOpen) return null;

  const toggleSelectUser = (u: SearchUser) => {
    if (selectedParticipants.some((p) => p._id === u._id)) {
      setSelectedParticipants((prev) => prev.filter((p) => p._id !== u._id));
    } else {
      setSelectedParticipants((prev) => [...prev, u]);
    }
  };

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = groupName.trim();

    if (!trimmedName) {
      toast.error('Please enter a group name');
      return;
    }

    if (selectedParticipants.length < 2) {
      toast.error('Please select at least 2 participants (total 3+ members)');
      return;
    }

    try {
      const participantIds = selectedParticipants.map((p) => p._id);
      const newGroup = await createGroupConversation({
        name: trimmedName,
        participantIds,
      });

      triggerMilestoneCelebration();
      toast.success(`Group "${trimmedName}" created successfully!`);
      setNewGroupOpen(false);
      setGroupName('');
      setSelectedParticipants([]);
      setActiveConversationId(newGroup._id);
      router.push(`/chat/${newGroup._id}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create group';
      toast.error(msg);
    }
  };

  return (
    <div
      onClick={() => setNewGroupOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-[28px] border border-slate-200/80 dark:border-border/80 bg-white dark:bg-card p-6 sm:p-7 shadow-2xl text-card-foreground"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-border/60">
          <div className="flex items-center gap-3">
            <div className="flex h-9.5 w-9.5 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-100 to-indigo-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 font-bold shadow-2xs">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Create Group Chat
              </h2>
              <p className="text-xs text-slate-400">Start a new shared collaboration workspace</p>
            </div>
          </div>
          <button
            onClick={() => setNewGroupOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100/80 hover:bg-slate-200/80 dark:bg-muted text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleCreateGroup} className="space-y-4 mt-5">
          {/* Group Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Group Name
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g. Design & Engineering Flow"
              required
              autoFocus
              className="w-full h-12 rounded-xl border border-slate-200 dark:border-border bg-slate-50/60 dark:bg-muted/40 px-4 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:bg-white dark:focus:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400 shadow-2xs transition-all"
            />
          </div>

          {/* Selected Chips */}
          {selectedParticipants.length > 0 && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Selected Teammates ({selectedParticipants.length})
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto no-scrollbar p-2.5 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40">
                {selectedParticipants.map((u) => (
                  <span
                    key={u._id}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white dark:bg-card border border-purple-200 dark:border-purple-800/40 px-2.5 py-1 text-xs font-medium text-slate-800 dark:text-slate-200 shadow-2xs"
                  >
                    <span>{u.name}</span>
                    <button
                      type="button"
                      onClick={() => toggleSelectUser(u)}
                      className="rounded-md p-0.5 hover:bg-slate-100 dark:hover:bg-muted text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Search Participants */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Add Members (Select at least 2)
            </label>
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 h-4.5 w-4.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search teammates by name or phone..."
                className="w-full h-12 rounded-xl border border-slate-200 dark:border-border bg-slate-50/60 dark:bg-muted/40 pl-10.5 pr-4 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:bg-white dark:focus:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400 shadow-2xs transition-all"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          {/* Filter Tabs */}
          {!isLoading && users.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  filterMode === 'all'
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border border-slate-900 dark:border-white shadow-2xs'
                    : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/70 dark:bg-muted/40 dark:text-slate-400'
                }`}
              >
                <Users className="h-3 w-3" />
                <span>All Users ({users.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setFilterMode('direct_only')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  filterMode === 'direct_only'
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border border-slate-900 dark:border-white shadow-2xs'
                    : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/70 dark:bg-muted/40 dark:text-slate-400'
                }`}
              >
                <MessageSquare className="h-3 w-3" />
                <span>Direct Contacts ({directUsersCount})</span>
              </button>

              {sharedGroupsUsersCount > 0 && (
                <button
                  type="button"
                  onClick={() => setFilterMode('shared_groups_only')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    filterMode === 'shared_groups_only'
                      ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border border-slate-900 dark:border-white shadow-2xs'
                      : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/70 dark:bg-muted/40 dark:text-slate-400'
                  }`}
                >
                  <Users className="h-3 w-3" />
                  <span>In Your Groups ({sharedGroupsUsersCount})</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setFilterMode('new_only')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  filterMode === 'new_only'
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border border-slate-900 dark:border-white shadow-2xs'
                    : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/70 dark:bg-muted/40 dark:text-slate-400'
                }`}
              >
                <UserPlus className="h-3 w-3" />
                <span>New Contacts ({newUsersCount})</span>
              </button>
            </div>
          )}

          {/* Search Results List with Top & Bottom Shadow Fades */}
          <div className="relative">
            {/* Top Shadow Vignette */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white dark:from-card to-transparent z-10 rounded-t-2xl" />

            {/* Scrollable List */}
            <div className="max-h-52 overflow-y-auto overflow-x-hidden no-scrollbar space-y-2 py-1 pb-3 pr-0.5">
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
                      <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-muted/70" />
                    </div>
                  ))}
                </div>
              ) : displayedUsers.length === 0 ? (
                <div className="py-6 text-center text-slate-400 space-y-1 border border-slate-200/60 rounded-2xl bg-slate-50/40 p-4">
                  <UserIcon className="h-6 w-6 mx-auto opacity-30" />
                  <p className="text-xs">
                    {filterMode === 'direct_only'
                      ? 'No direct contacts found'
                      : filterMode === 'shared_groups_only'
                      ? 'No teammates found in shared groups'
                      : filterMode === 'new_only'
                      ? 'No new contacts found'
                      : 'No teammates found'}
                  </p>
                </div>
              ) : (
                displayedUsers.map((targetUser) => {
                  const isSelected = selectedParticipants.some((p) => p._id === targetUser._id);
                  const existingConv = getExistingConversation(targetUser._id);
                  const isAlreadyMessaged = !!existingConv;
                  const sharedGroups = getSharedGroups(targetUser._id);

                  return (
                    <button
                      key={targetUser._id}
                      type="button"
                      onClick={() => toggleSelectUser(targetUser)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-purple-50/80 dark:bg-purple-950/60 border-purple-300 dark:border-purple-800 shadow-2xs'
                          : 'bg-white dark:bg-card border-slate-200/70 dark:border-border/60 hover:border-purple-200 hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#8E7CFF] via-[#A293FF] to-[#D5CCFF] text-white font-bold text-xs shadow-2xs">
                          {targetUser.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-left min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-sm leading-tight text-slate-900 dark:text-white truncate">
                              {targetUser.name}
                            </p>
                            {isAlreadyMessaged ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border border-purple-100 dark:border-purple-900/40 px-1.5 py-0.2 rounded-md shrink-0">
                                <CheckCircle2 className="h-2.5 w-2.5 text-purple-600 dark:text-purple-400" />
                                <span>Direct Contact</span>
                              </span>
                            ) : sharedGroups.length > 0 ? (
                              <span
                                title={`In group: ${sharedGroups.map((g) => g.name).join(', ')}`}
                                className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/40 px-1.5 py-0.2 rounded-md shrink-0 max-w-[150px]"
                              >
                                <Users className="h-2.5 w-2.5 text-blue-600 dark:text-blue-400 shrink-0" />
                                <span className="truncate">
                                  {sharedGroups.length === 1
                                    ? sharedGroups[0].name
                                    : `${sharedGroups[0].name} (+${sharedGroups.length - 1})`}
                                </span>
                              </span>
                            ) : null}
                          </div>
                          <p className="text-xs text-slate-400 font-mono mt-0.5 truncate">
                            {targetUser.phone}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`flex h-5.5 w-5.5 items-center justify-center rounded-lg border transition-all shrink-0 ${
                          isSelected
                            ? 'bg-purple-600 border-purple-600 text-white shadow-xs'
                            : 'border-slate-300 dark:border-border bg-slate-50/80'
                        }`}
                      >
                        {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Bottom Shadow Vignette */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-white dark:from-card to-transparent z-10 rounded-b-2xl" />
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isCreatingGroup || selectedParticipants.length < 2 || !groupName.trim()}
              className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-slate-950 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-sm font-semibold shadow-md shadow-slate-950/20 active:scale-[0.99] disabled:opacity-40 transition-all cursor-pointer border border-slate-900 dark:border-white"
            >
              {isCreatingGroup ? (
                <>
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                  <span>Creating Group Channel...</span>
                </>
              ) : (
                <>
                  <Users className="h-4.5 w-4.5" />
                  <span>Create Group ({selectedParticipants.length + 1} Members)</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
