'use client';

import { useState, useEffect, useMemo } from 'react';
import { Users, UserPlus, X, Search, Loader2, Check, User as UserIcon, CheckCircle2, MessageSquare } from 'lucide-react';
import { Conversation, SearchUser } from '@/types';
import { useUserSearch } from '@/hooks/useUserSearch';
import { useConversations } from '@/hooks/useConversations';
import { api } from '@/lib/api';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { triggerCelebration } from '@/lib/confetti';

interface AddMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversation: Conversation;
}

export default function AddMembersModal({
  isOpen,
  onClose,
  conversation,
}: AddMembersModalProps) {
  const queryClient = useQueryClient();
  const { conversations } = useConversations();
  const [selectedToAdd, setSelectedToAdd] = useState<SearchUser[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterMode, setFilterMode] = useState<'all' | 'available_only' | 'direct_only'>('all');
  const { query, setQuery, users, isLoading } = useUserSearch();

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, isSubmitting]);

  // Existing participants in this group
  const existingIds = useMemo(
    () => new Set((conversation.participants || []).map((p) => p._id)),
    [conversation.participants]
  );

  // Helper to check if direct conversation exists
  const getExistingDirectConv = (userId: string) => {
    return conversations.find(
      (c) =>
        c.type === 'direct' &&
        ((c.participant && c.participant._id === userId) ||
          (c.participants && c.participants.some((p) => p._id === userId)))
    );
  };

  const availableUsersCount = useMemo(() => {
    return users.filter((u) => !existingIds.has(u._id)).length;
  }, [users, existingIds]);

  const directUsersCount = useMemo(() => {
    return users.filter((u) => !existingIds.has(u._id) && !!getExistingDirectConv(u._id)).length;
  }, [users, existingIds, conversations]);

  const displayedUsers = useMemo(() => {
    if (filterMode === 'available_only') {
      return users.filter((u) => !existingIds.has(u._id));
    }
    if (filterMode === 'direct_only') {
      return users.filter((u) => !existingIds.has(u._id) && !!getExistingDirectConv(u._id));
    }
    return users;
  }, [users, existingIds, filterMode, conversations]);

  if (!isOpen) return null;

  const toggleSelectUser = (u: SearchUser) => {
    if (existingIds.has(u._id)) return; // Already in group
    if (selectedToAdd.some((p) => p._id === u._id)) {
      setSelectedToAdd((prev) => prev.filter((p) => p._id !== u._id));
    } else {
      setSelectedToAdd((prev) => [...prev, u]);
    }
  };

  const handleAddMembers = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedToAdd.length === 0) return;

    setIsSubmitting(true);
    try {
      const userIds = selectedToAdd.map((u) => u._id);
      const updated = await api.addGroupParticipants(conversation._id, userIds);
      queryClient.setQueryData<Conversation[]>(['conversations'], (old = []) =>
        old.map((c) => (c._id === conversation._id ? updated : c))
      );
      triggerCelebration();
      toast.success(`Added ${selectedToAdd.length} member(s) to "${conversation.name}"`);
      setSelectedToAdd([]);
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to add members';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      onClick={() => !isSubmitting && onClose()}
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
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Add Members
              </h2>
              <p className="text-xs text-slate-400">
                Invite teammates to <span className="font-semibold text-purple-600 dark:text-purple-400">{conversation.name}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100/80 hover:bg-slate-200/80 dark:bg-muted text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleAddMembers} className="space-y-4 mt-5">
          {/* Selected Chips */}
          {selectedToAdd.length > 0 && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Selected ({selectedToAdd.length})
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto no-scrollbar p-2.5 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40">
                {selectedToAdd.map((u) => (
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

          {/* Search Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Search Teammates
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

          {/* Filter Tabs */}
          {!isLoading && users.length > 0 && (
            <div className="flex items-center gap-2 pt-0.5">
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  filterMode === 'all'
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300 border border-purple-200/70 dark:border-purple-800/60 shadow-2xs'
                    : 'bg-slate-100/70 text-slate-500 hover:bg-slate-100 dark:bg-muted/40 dark:text-slate-400'
                }`}
              >
                <Users className="h-3 w-3" />
                <span>All Users ({users.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setFilterMode('available_only')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  filterMode === 'available_only'
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300 border border-purple-200/70 dark:border-purple-800/60 shadow-2xs'
                    : 'bg-slate-100/70 text-slate-500 hover:bg-slate-100 dark:bg-muted/40 dark:text-slate-400'
                }`}
              >
                <UserPlus className="h-3 w-3" />
                <span>Available to Add ({availableUsersCount})</span>
              </button>

              <button
                type="button"
                onClick={() => setFilterMode('direct_only')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  filterMode === 'direct_only'
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300 border border-purple-200/70 dark:border-purple-800/60 shadow-2xs'
                    : 'bg-slate-100/70 text-slate-500 hover:bg-slate-100 dark:bg-muted/40 dark:text-slate-400'
                }`}
              >
                <MessageSquare className="h-3 w-3" />
                <span>Direct Contacts ({directUsersCount})</span>
              </button>
            </div>
          )}

          {/* Results List with Top/Bottom Shadow Fades */}
          <div className="relative">
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white dark:from-card to-transparent z-10 rounded-t-2xl" />

            <div className="max-h-56 overflow-y-auto overflow-x-hidden no-scrollbar space-y-2 py-1 pb-3 pr-0.5">
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
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {filterMode === 'available_only'
                      ? 'All registered teammates are already members'
                      : query
                      ? 'No matching teammates found'
                      : 'No registered teammates found'}
                  </p>
                </div>
              ) : (
                displayedUsers.map((targetUser) => {
                  const isAlreadyMember = existingIds.has(targetUser._id);
                  const isSelected = selectedToAdd.some((p) => p._id === targetUser._id);

                  return (
                    <button
                      key={targetUser._id}
                      type="button"
                      disabled={isAlreadyMember}
                      onClick={() => toggleSelectUser(targetUser)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all border ${
                        isAlreadyMember
                          ? 'bg-slate-50/80 dark:bg-muted/20 border-slate-200/40 dark:border-border/30 opacity-60 cursor-not-allowed'
                          : isSelected
                          ? 'bg-purple-50/80 dark:bg-purple-950/60 border-purple-300 dark:border-purple-800 shadow-2xs cursor-pointer'
                          : 'bg-white dark:bg-card border-slate-200/70 dark:border-border/60 hover:border-purple-200 hover:shadow-xs cursor-pointer'
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
                            {isAlreadyMember && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/70 dark:border-emerald-800/40 px-1.5 py-0.2 rounded-md shrink-0">
                                <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-400" />
                                <span>Already in Group</span>
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 font-mono mt-0.5 truncate">
                            {targetUser.phone}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`flex h-5.5 w-5.5 items-center justify-center rounded-lg border transition-all shrink-0 ${
                          isAlreadyMember
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-600'
                            : isSelected
                            ? 'bg-purple-600 border-purple-600 text-white shadow-xs'
                            : 'border-slate-300 dark:border-border bg-slate-50/80'
                        }`}
                      >
                        {isAlreadyMember ? (
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        ) : isSelected ? (
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        ) : null}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-white dark:from-card to-transparent z-10 rounded-b-2xl" />
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || selectedToAdd.length === 0}
              className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8E7CFF] via-[#725CFF] to-[#6366F1] text-sm font-medium text-white shadow-xs hover:opacity-95 active:scale-[0.99] disabled:opacity-50 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                  <span>Adding Members...</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-4.5 w-4.5" />
                  <span>Add {selectedToAdd.length > 0 ? `${selectedToAdd.length} ` : ''}Member(s)</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
