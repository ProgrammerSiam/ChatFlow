'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Users, X, Search, Loader2, Check, User as UserIcon } from 'lucide-react';
import { useChatUIStore } from '@/store/useChatUIStore';
import { useConversations } from '@/hooks/useConversations';
import { useUserSearch } from '@/hooks/useUserSearch';
import { toast } from 'sonner';
import { SearchUser } from '@/types';

export default function NewGroupModal() {
  const router = useRouter();
  const { isNewGroupOpen, setNewGroupOpen, setActiveConversationId } = useChatUIStore();
  const { createGroupConversation, isCreatingGroup } = useConversations();
  const { query, setQuery, users, isLoading } = useUserSearch();

  const [groupName, setGroupName] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<SearchUser[]>([]);

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

          {/* Search Results List with Top & Bottom Shadow Fades */}
          <div className="relative">
            {/* Top Shadow Vignette */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white dark:from-card to-transparent z-10 rounded-t-2xl" />

            {/* Scrollable List */}
            <div className="max-h-52 overflow-y-auto overflow-x-hidden no-scrollbar space-y-2 py-1 pb-3 pr-0.5">
              {isLoading ? (
                <div className="py-6 flex flex-col items-center justify-center gap-2 text-slate-400">
                  <Loader2 className="h-5 w-5 animate-spin text-purple-600" />
                  <span className="text-xs">Searching teammates...</span>
                </div>
              ) : users.length === 0 ? (
                <div className="py-6 text-center text-slate-400 space-y-1 border border-slate-200/60 rounded-2xl bg-slate-50/40 p-4">
                  <UserIcon className="h-6 w-6 mx-auto opacity-30" />
                  <p className="text-xs">No teammates found</p>
                </div>
              ) : (
                users.map((targetUser) => {
                  const isSelected = selectedParticipants.some((p) => p._id === targetUser._id);
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
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#8E7CFF] via-[#A293FF] to-[#D5CCFF] text-white font-bold text-xs shadow-2xs">
                          {targetUser.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-sm leading-tight text-slate-900 dark:text-white">
                            {targetUser.name}
                          </p>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">
                            {targetUser.phone}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`flex h-5.5 w-5.5 items-center justify-center rounded-lg border transition-all ${
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
              className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8E7CFF] via-[#725CFF] to-[#6366F1] text-sm font-medium text-white shadow-xs hover:opacity-95 active:scale-[0.99] disabled:opacity-50 transition-all cursor-pointer"
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
