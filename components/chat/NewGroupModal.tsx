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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl border bg-card p-6 shadow-2xl text-card-foreground">
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold tracking-tight">Create Group Chat</h2>
          </div>
          <button
            onClick={() => setNewGroupOpen(false)}
            className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleCreateGroup} className="mt-4 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Group Name
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g. Design Team, Project Phoenix"
              className="mt-1 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {/* Selected participants chips */}
          {selectedParticipants.length > 0 && (
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Selected Members ({selectedParticipants.length})
              </label>
              <div className="mt-1.5 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 bg-muted/40 rounded-xl border">
                {selectedParticipants.map((p) => (
                  <span
                    key={p._id}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 text-primary px-2.5 py-1 text-xs font-medium"
                  >
                    {p.name}
                    <button
                      type="button"
                      onClick={() => toggleSelectUser(p)}
                      className="rounded-full hover:bg-primary/20 p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Add Participants (Select at least 2)
            </label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search people to add..."
                className="w-full rounded-xl border border-input bg-background pl-9 pr-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 rounded-lg">
            {isLoading ? (
              <div className="flex items-center justify-center py-6 text-muted-foreground gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span className="text-xs">Searching users...</span>
              </div>
            ) : query.trim().length === 0 ? (
              <div className="py-4 text-center text-xs text-muted-foreground">
                Type name or number to search for participants.
              </div>
            ) : users.length === 0 ? (
              <div className="py-4 text-center text-xs text-muted-foreground">
                No users found.
              </div>
            ) : (
              users.map((u) => {
                const isSelected = selectedParticipants.some((p) => p._id === u._id);
                return (
                  <button
                    key={u._id}
                    type="button"
                    onClick={() => toggleSelectUser(u)}
                    className={`flex w-full items-center justify-between rounded-xl p-2.5 text-left transition-colors border ${
                      isSelected
                        ? 'bg-primary/5 border-primary/30'
                        : 'hover:bg-muted/70 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground font-semibold text-xs">
                        {u.name ? u.name.charAt(0).toUpperCase() : <UserIcon className="h-3.5 w-3.5" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-tight">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.phone}</p>
                      </div>
                    </div>
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
                        isSelected
                          ? 'bg-primary text-primary-foreground border-primary'
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

          <div className="flex items-center justify-end gap-3 pt-3 border-t">
            <button
              type="button"
              onClick={() => setNewGroupOpen(false)}
              className="rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreatingGroup || !groupName.trim() || selectedParticipants.length < 2}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isCreatingGroup && <Loader2 className="h-4 w-4 animate-spin" />}
              Create Group ({selectedParticipants.length + 1} members)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
