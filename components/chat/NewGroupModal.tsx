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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-[32px] border border-border/80 bg-white/95 dark:bg-card/95 p-7 shadow-2xl backdrop-blur-2xl text-card-foreground">
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 font-bold">
              <Users className="h-4 w-4" />
            </div>
            <h2 className="text-base font-bold tracking-tight">Create Group Chat</h2>
          </div>
          <button
            onClick={() => setNewGroupOpen(false)}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleCreateGroup} className="space-y-4 mt-4">
          {/* Group Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Group Name
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g. Design & Engineering Flow"
              required
              autoFocus
              className="w-full rounded-2xl border border-input bg-background px-4 py-2.5 text-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 shadow-xs"
            />
          </div>

          {/* Selected Chips */}
          {selectedParticipants.length > 0 && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Selected Teammates ({selectedParticipants.length})
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40">
                {selectedParticipants.map((u) => (
                  <span
                    key={u._id}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-card border border-purple-200 dark:border-purple-800/40 px-3 py-1 text-xs font-semibold text-foreground shadow-xs"
                  >
                    <span>{u.name}</span>
                    <button
                      type="button"
                      onClick={() => toggleSelectUser(u)}
                      className="rounded-full p-0.5 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
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
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Add Members (Select at least 2)
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search teammates by name or phone..."
                className="w-full rounded-2xl border border-input bg-background pl-10 pr-4 py-2.5 text-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 shadow-xs"
              />
            </div>
          </div>

          {/* Search Results List */}
          <div className="max-h-48 overflow-y-auto space-y-1 pr-1 border rounded-2xl p-1 bg-background/50">
            {isLoading ? (
              <div className="py-6 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin text-purple-600" />
                <span className="text-xs">Searching teammates...</span>
              </div>
            ) : users.length === 0 ? (
              <div className="py-6 text-center text-muted-foreground space-y-1">
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
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-purple-100/70 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800/60'
                        : 'hover:bg-muted/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold text-xs shadow-inner">
                        {targetUser.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-xs leading-tight text-foreground">
                          {targetUser.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground font-mono">
                          {targetUser.phone}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                        isSelected
                          ? 'bg-purple-600 border-purple-600 text-white'
                          : 'border-muted-foreground/40'
                      }`}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isCreatingGroup || selectedParticipants.length < 2 || !groupName.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 py-3 text-xs font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:opacity-95 hover:shadow-purple-500/40 active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              {isCreatingGroup ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creating Group Channel...</span>
                </>
              ) : (
                <>
                  <Users className="h-4 w-4" />
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
