'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  X,
  Shield,
  UserMinus,
  UserPlus,
  Edit2,
  Check,
  LogOut,
  Loader2,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { Conversation, SearchUser } from '@/types';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatUIStore } from '@/store/useChatUIStore';
import { useUserSearch } from '@/hooks/useUserSearch';
import { api } from '@/lib/api';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import ConfirmModal from '@/shared/ConfirmModal';
import AddMembersModal from './AddMembersModal';

export default function GroupInfoDrawer({
  conversation,
}: {
  conversation: Conversation;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuthStore();
  const { isGroupInfoOpen, setGroupInfoOpen, setActiveConversationId } = useChatUIStore();

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(conversation.name || '');
  const [isUpdatingName, setIsUpdatingName] = useState(false);

  const [isAddingMembers, setIsAddingMembers] = useState(false);
  const [selectedToAdd, setSelectedToAdd] = useState<SearchUser[]>([]);
  const { query, setQuery, users: searchResults, isLoading: isSearching } = useUserSearch();
  const [isSubmittingMembers, setIsSubmittingMembers] = useState(false);

  const [loadingActionUserId, setLoadingActionUserId] = useState<string | null>(null);

  // Confirmation States
  const [isLeaveGroupConfirmOpen, setIsLeaveGroupConfirmOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<{ id: string; name: string } | null>(null);
  const [memberToPromote, setMemberToPromote] = useState<{ id: string; name: string } | null>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isGroupInfoOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setGroupInfoOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGroupInfoOpen, setGroupInfoOpen]);

  if (!isGroupInfoOpen || conversation.type !== 'group') return null;

  const currentUserId = currentUser?._id;
  const isAdmin = conversation.admins?.some((a) =>
    typeof a === 'string' ? a === currentUserId : (a as unknown as { _id?: string })._id === currentUserId
  );

  // Filter out existing group participants from add members search
  const existingMemberIds = new Set(
    (conversation.participants || []).map((p) => p._id)
  );
  const addableUsers = searchResults.filter((u) => !existingMemberIds.has(u._id));

  const handleRename = async () => {
    const trimmed = nameInput.trim();
    if (!trimmed || trimmed === conversation.name) {
      setIsEditingName(false);
      return;
    }
    setIsUpdatingName(true);
    try {
      const updated = await api.renameGroup(conversation._id, trimmed);
      queryClient.setQueryData<Conversation[]>(['conversations'], (old = []) =>
        old.map((c) => (c._id === conversation._id ? { ...c, name: updated.name } : c))
      );
      toast.success('Group name updated');
      setIsEditingName(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to rename group';
      toast.error(msg);
    } finally {
      setIsUpdatingName(false);
    }
  };

  const handleAddMembers = async () => {
    if (selectedToAdd.length === 0) return;
    setIsSubmittingMembers(true);
    try {
      const userIds = selectedToAdd.map((u) => u._id);
      const updated = await api.addGroupParticipants(conversation._id, userIds);
      queryClient.setQueryData<Conversation[]>(['conversations'], (old = []) =>
        old.map((c) => (c._id === conversation._id ? updated : c))
      );
      toast.success(`Added ${selectedToAdd.length} member(s)`);
      setSelectedToAdd([]);
      setIsAddingMembers(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to add members';
      toast.error(msg);
    } finally {
      setIsSubmittingMembers(false);
    }
  };

  const handleRemoveMember = async (userId: string, memberName: string) => {
    setLoadingActionUserId(userId);
    try {
      await api.removeGroupParticipant(conversation._id, userId);
      queryClient.setQueryData<Conversation[]>(['conversations'], (old = []) =>
        old.map((c) => {
          if (c._id !== conversation._id) return c;
          return {
            ...c,
            participants: (c.participants || []).filter((p) => p._id !== userId),
            admins: (c.admins || []).filter((a) => a !== userId),
          };
        })
      );
      toast.success(`Removed ${memberName} from group`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to remove member';
      toast.error(msg);
    } finally {
      setLoadingActionUserId(null);
    }
  };

  const handlePromoteAdmin = async (userId: string, memberName: string) => {
    setLoadingActionUserId(userId);
    try {
      const updated = await api.promoteGroupAdmin(conversation._id, userId);
      queryClient.setQueryData<Conversation[]>(['conversations'], (old = []) =>
        old.map((c) => (c._id === conversation._id ? updated : c))
      );
      toast.success(`${memberName} is now a group admin`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to promote member';
      toast.error(msg);
    } finally {
      setLoadingActionUserId(null);
    }
  };

  const handleLeaveGroup = async () => {
    if (!currentUserId) return;
    try {
      await api.removeGroupParticipant(conversation._id, currentUserId);
      queryClient.setQueryData<Conversation[]>(['conversations'], (old = []) =>
        old.filter((c) => c._id !== conversation._id)
      );
      setGroupInfoOpen(false);
      setActiveConversationId(null);
      router.push('/chat');
      toast.success('You left the group');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to leave group';
      toast.error(msg);
    }
  };

  return (
    <>
      <div
        onClick={() => setGroupInfoOpen(false)}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
      />
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-card border-l shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      {/* Drawer Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Group Info
        </h3>
        <button
          onClick={() => setGroupInfoOpen(false)}
          className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Group Name & Icon */}
        <div className="flex flex-col items-center text-center space-y-3 py-4 bg-muted/30 rounded-2xl border">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary font-bold text-2xl shadow-inner">
            {conversation.name ? conversation.name.charAt(0).toUpperCase() : 'G'}
          </div>

          <div className="w-full px-4">
            {isEditingName ? (
              <div className="flex items-center gap-2 justify-center">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="h-10 rounded-xl border border-slate-200 dark:border-border bg-background px-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                  autoFocus
                />
                <button
                  onClick={handleRename}
                  disabled={isUpdatingName}
                  className="h-10 px-3 rounded-xl bg-purple-600 p-1.5 text-white hover:bg-purple-700"
                >
                  {isUpdatingName ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={() => setIsEditingName(false)}
                  className="h-10 px-3 rounded-xl border border-slate-200 dark:border-border text-muted-foreground hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-xl font-bold tracking-tight">{conversation.name}</h2>
                {isAdmin && (
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted"
                    title="Rename Group (Admin)"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {(conversation.participants || []).length} participants •{' '}
              {(conversation.admins || []).length} admin(s)
            </p>
          </div>
        </div>

        {/* Admin Section: Add Members Button */}
        {isAdmin && (
          <div className="pt-1">
            <button
              onClick={() => setIsAddingMembers(true)}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 text-purple-700 dark:text-purple-300 border border-purple-200/70 dark:border-purple-800/40 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
            >
              <UserPlus className="h-4 w-4" />
              <span>Add Members</span>
            </button>
          </div>
        )}

        {/* Participants List */}
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Members ({(conversation.participants || []).length})
          </span>

          <div className="space-y-2">
            {(conversation.participants || []).map((participant) => {
              const isMemberAdmin = conversation.admins?.some((a) =>
                typeof a === 'string' ? a === participant._id : (a as unknown as { _id?: string })._id === participant._id
              );
              const isSelf = participant._id === currentUserId;
              const isLoadingThis = loadingActionUserId === participant._id;

              return (
                <div
                  key={participant._id}
                  className="flex items-center justify-between rounded-xl p-2.5 bg-background border hover:bg-muted/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                      {participant.name ? participant.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium">
                          {participant.name} {isSelf && '(You)'}
                        </span>
                        {isMemberAdmin && (
                          <span className="inline-flex items-center gap-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 text-[10px] font-semibold">
                            <Shield className="h-2.5 w-2.5" />
                            Admin
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{participant.phone}</p>
                    </div>
                  </div>

                  {/* Admin actions (hidden for non-admins, cannot remove self from here) */}
                  {isAdmin && !isSelf && (
                    <div className="flex items-center gap-1">
                      {isLoadingThis ? (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      ) : (
                        <>
                          {!isMemberAdmin && (
                            <button
                              onClick={() => setMemberToPromote({ id: participant._id, name: participant.name })}
                              title="Promote to Admin"
                              className="rounded-md p-1.5 text-muted-foreground hover:text-amber-600 hover:bg-amber-500/10 transition-colors cursor-pointer"
                            >
                              <ShieldCheck className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => setMemberToRemove({ id: participant._id, name: participant.name })}
                            title="Remove Member"
                            className="rounded-md p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                          >
                            <UserMinus className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Drawer Footer: Leave Group */}
      <div className="p-4 border-t bg-muted/20">
        <button
          onClick={() => setIsLeaveGroupConfirmOpen(true)}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 py-2.5 text-sm font-medium text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Leave Group
        </button>
      </div>

      {/* Promote to Admin Confirmation Dialog */}
      <ConfirmModal
        isOpen={!!memberToPromote}
        onClose={() => setMemberToPromote(null)}
        onConfirm={async () => {
          if (!memberToPromote) return;
          const { id, name } = memberToPromote;
          setMemberToPromote(null);
          await handlePromoteAdmin(id, name);
        }}
        title={`Promote ${memberToPromote?.name || 'Member'} to Admin?`}
        description={`${memberToPromote?.name || 'This member'} will have administrative permissions to rename the group, manage members, and promote other teammates.`}
        confirmText="Promote to Admin"
        variant="primary"
        icon="crown"
      />

      {/* Leave Group Confirmation Dialog */}
      <ConfirmModal
        isOpen={isLeaveGroupConfirmOpen}
        onClose={() => setIsLeaveGroupConfirmOpen(false)}
        onConfirm={async () => {
          setIsLeaveGroupConfirmOpen(false);
          await handleLeaveGroup();
        }}
        title={`Leave "${conversation.name}"?`}
        description="You will no longer receive new messages or announcements from this group channel."
        confirmText="Leave Group"
        variant="danger"
        icon="logout"
      />

      {/* Remove Member Confirmation Dialog */}
      <ConfirmModal
        isOpen={!!memberToRemove}
        onClose={() => setMemberToRemove(null)}
        onConfirm={async () => {
          if (!memberToRemove) return;
          const { id, name } = memberToRemove;
          setMemberToRemove(null);
          await handleRemoveMember(id, name);
        }}
        title={`Remove ${memberToRemove?.name || 'Member'}?`}
        description={`Are you sure you want to remove ${memberToRemove?.name || 'this member'} from the group? They will lose access to the chat history.`}
        confirmText="Remove Member"
        variant="danger"
        icon="trash"
      />

      {/* Add Members Popup Modal */}
      <AddMembersModal
        isOpen={isAddingMembers}
        onClose={() => setIsAddingMembers(false)}
        conversation={conversation}
      />

    </div>
    </>
  );
}
