'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  User as UserIcon,
  ShieldCheck,
  Phone,
  Calendar,
  Copy,
  Check,
  UserPlus,
  Edit2,
  Trash2,
  Crown,
  LogOut,
  X,
  Loader2,
  Lock,
  Share2,
  Bell,
  Sparkles,
} from 'lucide-react';
import { Conversation, SearchUser } from '@/types';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatUIStore } from '@/store/useChatUIStore';
import { useUserSearch } from '@/hooks/useUserSearch';
import { api } from '@/lib/api';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import CoolTooltip from '@/shared/CoolTooltip';
import ConfirmModal from '@/shared/ConfirmModal';
import AddMembersModal from './AddMembersModal';

interface ConversationDetailsPanelProps {
  conversation: Conversation;
  onClose?: () => void;
}

export default function ConversationDetailsPanel({
  conversation,
  onClose,
}: ConversationDetailsPanelProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuthStore();

  // Robust active user detection
  let activeUser = currentUser;
  if (!activeUser && typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('chatflow_user');
      if (stored) activeUser = JSON.parse(stored);
    } catch {
      // ignore
    }
  }

  const currentUserId = activeUser?._id;
  const currentPhone = activeUser?.phone?.trim();
  const currentName = activeUser?.name?.toLowerCase().trim();

  // Find self in participants
  const selfParticipant = (conversation.participants || []).find(
    (p) =>
      (currentUserId && p._id === currentUserId) ||
      (currentPhone && p.phone?.trim() === currentPhone) ||
      (currentName && p.name?.toLowerCase().trim() === currentName)
  );

  const resolvedSelfId = selfParticipant?._id || currentUserId;

  const isGroup = conversation.type === 'group';
  const isAdmin =
    isGroup &&
    Boolean(
      (conversation.admins || []).some((a) => {
        const adminId =
          typeof a === 'string'
            ? a
            : (a as unknown as { _id?: string; id?: string })?._id ||
              (a as unknown as { _id?: string; id?: string })?.id;
        return (
          (resolvedSelfId && adminId === resolvedSelfId) ||
          (currentUserId && adminId === currentUserId) ||
          (selfParticipant && adminId === selfParticipant._id)
        );
      })
    );

  // Group Edit & Admin States
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(conversation.name || '');
  const [isUpdatingName, setIsUpdatingName] = useState(false);

  const [isAddingMembers, setIsAddingMembers] = useState(false);
  const [selectedToAdd, setSelectedToAdd] = useState<SearchUser[]>([]);
  const [isSubmittingMembers, setIsSubmittingMembers] = useState(false);
  const [loadingActionUserId, setLoadingActionUserId] = useState<string | null>(null);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Confirmation Modals State
  const [isLeaveGroupConfirmOpen, setIsLeaveGroupConfirmOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<{ id: string; name: string } | null>(null);
  const [memberToPromote, setMemberToPromote] = useState<{ id: string; name: string } | null>(null);

  const { query, setQuery, users, isLoading: isSearchingUsers } = useUserSearch();

  // Filter out users already in the group
  const existingParticipantIds = new Set((conversation.participants || []).map((p) => p._id));
  const availableUsersToAdd = users.filter((u) => !existingParticipantIds.has(u._id));

  const handleCopyPhone = (phone?: string) => {
    if (!phone) return;
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    toast.success('Phone number copied');
    setTimeout(() => setCopiedPhone(false), 2000);
  };

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
        old.map((c) => (c._id === conversation._id ? updated : c))
      );
      toast.success('Group renamed successfully');
      setIsEditingName(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to rename group';
      toast.error(msg);
    } finally {
      setIsUpdatingName(false);
    }
  };

  const toggleSelectUserToAdd = (u: SearchUser) => {
    if (selectedToAdd.some((p) => p._id === u._id)) {
      setSelectedToAdd((prev) => prev.filter((p) => p._id !== u._id));
    } else {
      setSelectedToAdd((prev) => [...prev, u]);
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
      router.push('/chat');
      toast.success('You left the group');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to leave group';
      toast.error(msg);
    }
  };

  // Direct User Profile Panel
  if (!isGroup) {
    const participant = conversation.participant;
    const title = participant?.name || 'User Profile';
    const phone = participant?.phone || '';

    return (
      <aside className="w-full h-full rounded-[24px] bg-white dark:bg-card border border-slate-200/80 dark:border-border/70 shadow-xs flex flex-col justify-between overflow-hidden select-none">
        
        {/* Panel Header */}
        <div className="h-14 border-b border-slate-100 dark:border-border/50 px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-900 dark:text-white">Contact Info</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-muted cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar p-5 space-y-6">
          {/* User Hero Card */}
          <div className="flex flex-col items-center text-center space-y-3 pt-2">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-[#8E7CFF] via-[#A293FF] to-[#D5CCFF] text-white font-bold text-2xl shadow-md">
                {title.charAt(0).toUpperCase()}
              </div>
              <span className="absolute bottom-0 right-0 h-4.5 w-4.5 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-card" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{phone || 'Registered User'}</p>
            </div>

            {/* Quick Action Pills */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => handleCopyPhone(phone)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-border bg-slate-50 dark:bg-muted/40 hover:bg-slate-100 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors cursor-pointer"
              >
                {copiedPhone ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={() => toast.success('Profile shared')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-border bg-slate-50 dark:bg-muted/40 hover:bg-slate-100 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors cursor-pointer"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Contact Details
            </span>

            {/* Phone Item */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/70 dark:bg-muted/30 border border-slate-200/60 dark:border-border/50">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600">
                  <Phone className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">Phone Number</p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 font-mono">{phone || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-border/50">
          <div className="text-center">
            <span className="text-[11px] text-slate-400">Direct ChatFlow Channel</span>
          </div>
        </div>

      </aside>
    );
  }

  // Group Info Panel
  return (
    <aside className="w-full h-full rounded-[24px] bg-white dark:bg-card border border-slate-200/80 dark:border-border/70 shadow-xs flex flex-col justify-between overflow-hidden select-none">
      
      {/* Header */}
      <div className="h-14 border-b border-slate-100 dark:border-border/50 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Users className="h-4.5 w-4.5 text-purple-600" />
          <span className="text-sm font-semibold text-slate-900 dark:text-white">Group Info</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-muted cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar p-4 space-y-5">
        
        {/* Group Hero Card */}
        <div className="flex flex-col items-center text-center space-y-2.5 pt-1">
          <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold text-xl shadow-xs">
            <Users className="h-8 w-8" />
          </div>

          {/* Group Name & Inline Rename (Admin) */}
          {isEditingName ? (
            <div className="flex items-center gap-1.5 w-full max-w-xs mt-1">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full h-9 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted px-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400"
                autoFocus
              />
              <button
                onClick={handleRename}
                disabled={isUpdatingName}
                className="h-9 px-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700"
              >
                {isUpdatingName ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
              </button>
              <button
                onClick={() => setIsEditingName(false)}
                className="h-9 px-2 rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white truncate max-w-[220px]">
                {conversation.name}
              </h2>
              {isAdmin && (
                <button
                  onClick={() => setIsEditingName(true)}
                  className="p-1.5 text-slate-400 hover:text-purple-600 rounded-xl hover:bg-purple-50 transition-colors cursor-pointer"
                  title="Rename Group"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
              )}
            </div>
          )}

          <p className="text-xs text-slate-400">
            {(conversation.participants || []).length} participants • {(conversation.admins || []).length} admin(s)
          </p>
        </div>

        {/* Admin Action: Add Members */}
        {isAdmin && (
          <div className="pt-1">
            <button
              onClick={() => setIsAddingMembers(true)}
              className="w-full h-10.5 flex items-center justify-center gap-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 text-purple-700 dark:text-purple-300 border border-purple-200/70 dark:border-purple-800/40 text-xs font-semibold transition-all cursor-pointer"
            >
              <UserPlus className="h-4 w-4" />
              <span>Add Members</span>
            </button>
          </div>
        )}

        {/* Member List */}
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Members ({(conversation.participants || []).length})
          </span>

          <div className="space-y-1.5">
            {(conversation.participants || []).map((p) => {
              const isParticipantAdmin = (conversation.admins || []).some((a) => {
                const adminId =
                  typeof a === 'string'
                    ? a
                    : (a as unknown as { _id?: string; id?: string })?._id ||
                      (a as unknown as { _id?: string; id?: string })?.id;
                return adminId === p._id;
              });
              const isSelf =
                (resolvedSelfId && p._id === resolvedSelfId) ||
                (currentUserId && p._id === currentUserId) ||
                (currentPhone && p.phone?.trim() === currentPhone) ||
                (currentName && p.name?.toLowerCase().trim() === currentName);

              return (
                <div
                  key={p._id}
                  className="flex items-center justify-between p-2.5 rounded-2xl bg-white dark:bg-card border border-slate-200/70 dark:border-border/60 hover:bg-slate-50/60 dark:hover:bg-muted/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-100 to-indigo-100 text-purple-700 font-bold text-xs">
                      {p.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                          {p.name} {isSelf && '(You)'}
                        </span>
                        {isParticipantAdmin && (
                          <span className="inline-flex items-center gap-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-[10px] font-bold text-amber-700 dark:text-amber-300 px-1.5 py-0.2">
                            <Crown className="h-2.5 w-2.5" />
                            Admin
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono truncate">{p.phone}</p>
                    </div>
                  </div>

                  {/* Admin Actions for other members */}
                  {isAdmin && !isSelf && (
                    <div className="flex items-center gap-1 shrink-0">
                      {!isParticipantAdmin && (
                        <CoolTooltip content="Promote to Admin" side="left">
                          <button
                            onClick={() => setMemberToPromote({ id: p._id, name: p.name })}
                            disabled={loadingActionUserId === p._id}
                            className="p-1 text-slate-400 hover:text-amber-600 rounded-lg hover:bg-amber-50 cursor-pointer"
                          >
                            <Crown className="h-3.5 w-3.5" />
                          </button>
                        </CoolTooltip>
                      )}

                      <CoolTooltip content="Remove Member" side="left">
                        <button
                          onClick={() => setMemberToRemove({ id: p._id, name: p.name })}
                          disabled={loadingActionUserId === p._id}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </CoolTooltip>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Footer: Leave Group */}
      <div className="p-3.5 border-t border-slate-100 dark:border-border/50">
        <button
          onClick={() => setIsLeaveGroupConfirmOpen(true)}
          className="w-full h-10 flex items-center justify-center gap-2 rounded-xl border border-rose-200/80 bg-rose-50/60 hover:bg-rose-100 text-rose-600 text-xs font-semibold transition-colors cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>Leave Group</span>
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
      {isGroup && (
        <AddMembersModal
          isOpen={isAddingMembers}
          onClose={() => setIsAddingMembers(false)}
          conversation={conversation}
        />
      )}

    </aside>
  );
}
