'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  X,
  User as UserIcon,
  Phone,
  Crown,
  Trash2,
  Copy,
  Check,
  MessageSquare,
  Share2,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Conversation, User } from '@/types';
import { useConversations } from '@/hooks/useConversations';
import { useChatUIStore } from '@/store/useChatUIStore';
import { toast } from 'sonner';
import { triggerCelebration } from '@/lib/confetti';
import CoolTooltip from '@/shared/CoolTooltip';
import ConfirmModal from '@/shared/ConfirmModal';

interface MemberProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: User | null;
  conversation: Conversation;
  isAdmin: boolean;
  isSelf: boolean;
  isParticipantAdmin: boolean;
  onPromote?: (id: string, name: string) => void;
  onRemove?: (id: string, name: string) => void;
}

export default function MemberProfileModal({
  isOpen,
  onClose,
  member,
  conversation,
  isAdmin,
  isSelf,
  isParticipantAdmin,
  onPromote,
  onRemove,
}: MemberProfileModalProps) {
  const router = useRouter();
  const { conversations, createDirectConversation } = useConversations();
  const { setActiveConversationId } = useChatUIStore();
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [shared, setShared] = useState(false);
  const [isStartingChat, setIsStartingChat] = useState(false);

  if (!isOpen || !member) return null;

  // Find existing direct conversation if any
  const existingDirectConv = conversations.find(
    (c) =>
      c.type === 'direct' &&
      ((c.participant && c.participant._id === member._id) ||
        (c.participants && c.participants.some((p) => p._id === member._id)))
  );

  const handleCopy = async () => {
    const text = `${member.name} (${member.phone || 'No phone'})`;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setCopiedPhone(true);
        triggerCelebration();
        toast.success(`Copied "${text}" to clipboard`);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareData = {
      title: `Member: ${member.name}`,
      text: `Connect with ${member.name} (${member.phone || ''}) on ChatFlow!`,
      url: shareUrl,
    };

    if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        setShared(true);
        triggerCelebration();
        toast.success('Shared successfully');
        setTimeout(() => setShared(false), 2000);
        return;
      } catch (err: unknown) {
        if ((err as Error)?.name === 'AbortError') return;
      }
    }

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setShared(true);
        triggerCelebration();
        toast.success('Chat link copied to clipboard');
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const handleDirectMessage = async () => {
    if (isSelf) return;
    setIsStartingChat(true);
    try {
      if (existingDirectConv) {
        onClose();
        setActiveConversationId(existingDirectConv._id);
        router.push(`/chat/${existingDirectConv._id}`);
        return;
      }

      const newConv = await createDirectConversation(member._id);
      triggerCelebration();
      onClose();
      setActiveConversationId(newConv._id);
      router.push(`/chat/${newConv._id}`);
      toast.success(`Started conversation with ${member.name}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to start direct conversation';
      toast.error(msg);
    } finally {
      setIsStartingChat(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-[28px] border border-slate-200/80 dark:border-border/80 bg-white dark:bg-card p-6 sm:p-7 shadow-2xl text-card-foreground relative overflow-hidden"
      >
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-36 w-36 rounded-full bg-purple-500/15 blur-2xl dark:bg-purple-500/20" />

        {/* Header Close */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-border/60 relative z-10">
          <div className="flex items-center gap-2">
            <UserIcon className="h-4.5 w-4.5 text-purple-600 dark:text-purple-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Member Profile
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100/80 hover:bg-slate-200/80 dark:bg-muted text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Member Profile Hero */}
        <div className="flex flex-col items-center text-center pt-5 pb-2 relative z-10 space-y-3">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-tr from-[#8E7CFF] via-[#A293FF] to-[#D5CCFF] text-white font-bold text-2xl shadow-lg">
              {member.name.charAt(0).toUpperCase()}
            </div>
            <span className="absolute bottom-0 right-0 h-4.5 w-4.5 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-card" />
          </div>

          <div>
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {member.name}
              </h2>
              {isSelf && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-muted text-slate-600 dark:text-slate-300">
                  You
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {member.phone || 'Registered Teammate'}
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5">
            {isParticipantAdmin ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200/70 dark:border-amber-800/60 text-xs font-bold text-amber-700 dark:text-amber-300 px-2.5 py-0.5 shadow-2xs">
                <Crown className="h-3 w-3" />
                <span>Group Admin</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200/70 dark:border-purple-800/60 text-xs font-semibold text-purple-700 dark:text-purple-300 px-2.5 py-0.5 shadow-2xs">
                <UserIcon className="h-3 w-3" />
                <span>Group Member</span>
              </span>
            )}

            {existingDirectConv && !isSelf && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/70 dark:border-emerald-800/60 text-xs font-semibold text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 shadow-2xs">
                <Check className="h-3 w-3" />
                <span>Direct Contact</span>
              </span>
            )}
          </div>

          {/* Quick Action Buttons: Copy & Share */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer text-xs font-semibold shadow-2xs ${
                copiedPhone
                  ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                  : 'border-slate-200/80 dark:border-border bg-slate-50 dark:bg-muted/40 hover:bg-slate-100 hover:border-purple-300 text-slate-700 dark:text-slate-200'
              }`}
            >
              {copiedPhone ? <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-slate-500" />}
              <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleShare}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer text-xs font-semibold shadow-2xs ${
                shared
                  ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                  : 'border-slate-200/80 dark:border-border bg-slate-50 dark:bg-muted/40 hover:bg-slate-100 hover:border-purple-300 text-slate-700 dark:text-slate-200'
              }`}
            >
              {shared ? <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="h-3.5 w-3.5 text-slate-500" />}
              <span>{shared ? 'Shared' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Details Card */}
        <div className="space-y-2 mt-4 relative z-10">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/70 dark:bg-muted/30 border border-slate-200/60 dark:border-border/50">
            <div className="flex items-center gap-3">
              <div className="flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Phone</p>
                <p className="text-xs font-mono font-medium text-slate-800 dark:text-slate-200">{member.phone || 'Not available'}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/70 dark:bg-muted/30 border border-slate-200/60 dark:border-border/50">
            <div className="flex items-center gap-3">
              <div className="flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Group Role</p>
                <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                  {isParticipantAdmin ? 'Administrator' : 'Participant'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="pt-5 space-y-2 relative z-10">
          {!isSelf && (
            <button
              onClick={handleDirectMessage}
              disabled={isStartingChat}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8E7CFF] via-[#725CFF] to-[#6366F1] text-xs font-semibold text-white shadow-xs hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
            >
              <MessageSquare className="h-4 w-4" />
              <span>{existingDirectConv ? 'Open Direct Chat' : 'Start Direct Chat'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Admin Tools */}
          {isAdmin && !isSelf && (
            <div className="flex items-center gap-2 pt-1">
              {!isParticipantAdmin && onPromote && (
                <button
                  onClick={() => {
                    onClose();
                    onPromote(member._id, member.name);
                  }}
                  className="flex-1 h-9.5 flex items-center justify-center gap-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-700 dark:text-amber-300 border border-amber-200/70 dark:border-amber-800/60 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Crown className="h-3.5 w-3.5" />
                  <span>Promote Admin</span>
                </button>
              )}

              {onRemove && (
                <button
                  onClick={() => {
                    onClose();
                    onRemove(member._id, member.name);
                  }}
                  className="flex-1 h-9.5 flex items-center justify-center gap-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600 dark:text-rose-400 border border-rose-200/70 dark:border-rose-800/60 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Remove Member</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
