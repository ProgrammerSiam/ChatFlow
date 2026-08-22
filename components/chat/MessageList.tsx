'use client';

import { useEffect, useRef, useState, useLayoutEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertCircle,
  ArrowDown,
  Check,
  Clock,
  RotateCcw,
  Copy,
  ExternalLink,
  Search,
  MessageSquare,
} from 'lucide-react';
import { Message, GroupParticipant } from '@/types';
import { useAuthStore } from '@/store/useAuthStore';
import { useConversations } from '@/hooks/useConversations';
import { toast } from 'sonner';
import CoolTooltip from '@/shared/CoolTooltip';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  participants?: GroupParticipant[];
  isGroup?: boolean;
  searchQuery?: string;
  onClearSearch?: () => void;
  fetchNextPage: () => void;
  onRetryMessage: (tempId: string, text: string) => void;
}

const AVATAR_GRADIENTS = [
  'bg-gradient-to-tr from-amber-500 to-yellow-400 text-white shadow-amber-500/20',
  'bg-gradient-to-tr from-purple-500 to-indigo-500 text-white shadow-purple-500/20',
  'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-emerald-500/20',
  'bg-gradient-to-tr from-blue-500 to-cyan-400 text-white shadow-blue-500/20',
  'bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-rose-500/20',
  'bg-gradient-to-tr from-violet-500 to-fuchsia-500 text-white shadow-violet-500/20',
];

function getAvatarColor(seed: string) {
  if (!seed) return AVATAR_GRADIENTS[0];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index];
}

function highlightSearchTerm(text: string, query: string) {
  if (!query || !query.trim()) return text;
  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const segments = text.split(regex);
  return segments.map((seg, idx) =>
    regex.test(seg) ? (
      <mark
        key={idx}
        className="bg-amber-300 dark:bg-amber-400 text-slate-950 font-bold px-0.5 rounded-xs"
      >
        {seg}
      </mark>
    ) : (
      seg
    )
  );
}

const isMediaUrl = (url: string) => {
  return Boolean(
    url.match(/^https?:\/\/.+\.(gif|webp|png|jpe?g)($|\?)/i) ||
    url.includes('giphy.com/media') ||
    url.includes('media.giphy.com') ||
    url.includes('i.giphy.com') ||
    url.includes('tenor.com') ||
    url.includes('media.tenor.com')
  );
};

// URL linkifier, GIF renderer, and search term highlighter helper
function renderMessageContent(text: string, isSelf: boolean, searchQuery?: string) {
  const trimmed = text.trim();
  if (isMediaUrl(trimmed)) {
    return (
      <div className="space-y-1 pt-0.5 pb-0.5">
        <div className="relative overflow-hidden rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 max-w-xs sm:max-w-sm max-h-64">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={trimmed}
            alt="Animated GIF"
            loading="lazy"
            className="w-full h-auto max-h-60 object-contain rounded-xl"
          />
        </div>
      </div>
    );
  }

  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
  const parts = text.split(urlRegex);

  return parts.map((part, i) => {
    if (part.match(urlRegex)) {
      let url = part;
      let trailingPunctuation = '';
      const matchTrailing = url.match(/[.,!?;:]+$/);
      if (matchTrailing) {
        trailingPunctuation = matchTrailing[0];
        url = url.slice(0, -trailingPunctuation.length);
      }

      const href = url.startsWith('www.') ? `https://${url}` : url;

      if (isMediaUrl(href)) {
        return (
          <div key={i} className="my-1.5 overflow-hidden rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 max-w-xs sm:max-w-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={href}
              alt="Animated GIF"
              loading="lazy"
              className="w-full h-auto max-h-60 object-contain rounded-xl"
            />
          </div>
        );
      }

      return (
        <span key={i} className="inline-flex items-center gap-0.5">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`font-semibold underline underline-offset-3 transition-all break-all rounded px-1.5 py-0.5 inline-flex items-center gap-1 cursor-pointer select-text ${
              isSelf
                ? 'bg-white/20 text-white hover:bg-white/30 hover:text-white decoration-white/70 shadow-2xs'
                : 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/70 hover:text-purple-700 dark:hover:text-purple-300 decoration-purple-400/60 shadow-2xs'
            }`}
            title={`Open link: ${href}`}
          >
            <span>{searchQuery ? highlightSearchTerm(url, searchQuery) : url}</span>
            <ExternalLink className="h-3 w-3 shrink-0 opacity-80" />
          </a>
          {trailingPunctuation}
        </span>
      );
    }
    return searchQuery ? (
      <span key={i}>{highlightSearchTerm(part, searchQuery)}</span>
    ) : (
      part
    );
  });
}

export default function MessageList({
  messages,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  participants,
  isGroup,
  searchQuery,
  onClearSearch,
  fetchNextPage,
  onRetryMessage,
}: MessageListProps) {
  const { user: currentUser } = useAuthStore();
  const router = useRouter();
  const { createDirectConversation } = useConversations();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollDownPill, setShowScrollDownPill] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [profilePopup, setProfilePopup] = useState<{
    id: string;
    name: string;
    phone?: string;
    x: number;
    y: number;
    initial: string;
    avatarColor: string;
  } | null>(null);

  const prevMessagesCountRef = useRef(messages.length);
  const prevScrollHeightRef = useRef<number>(0);

  const isSearchActive = Boolean(searchQuery && searchQuery.trim().length > 0);

  const displayedMessages = useMemo(() => {
    if (!isSearchActive || !searchQuery) return messages;
    const q = searchQuery.trim().toLowerCase();
    return messages.filter((m) => m.text?.toLowerCase().includes(q));
  }, [messages, isSearchActive, searchQuery]);

  // Close profile popup on document click
  useEffect(() => {
    if (!profilePopup) return;
    const handleClose = () => setProfilePopup(null);
    document.addEventListener('click', handleClose);
    return () => document.removeEventListener('click', handleClose);
  }, [profilePopup]);

  const handleStartDirectChat = async (userId: string) => {
    try {
      setProfilePopup(null);
      if (!userId || userId === currentUser?._id) return;
      const conv = await createDirectConversation(userId);
      if (conv?._id) {
        router.push(`/chat/${conv._id}`);
      }
    } catch {
      toast.error('Could not open direct chat');
    }
  };

  const handleCopyProfile = (name: string, phone?: string) => {
    const text = `${name} (${phone || 'No phone'})`;
    navigator.clipboard.writeText(text);
    toast.success(`Copied "${name}" details to clipboard`);
    setProfilePopup(null);
  };

  const handleCopyLink = (id: string, text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/i;
    const match = text.match(urlRegex);
    let targetCopy = text;
    if (match) {
      let url = match[0];
      const matchTrailing = url.match(/[.,!?;:]+$/);
      if (matchTrailing) {
        url = url.slice(0, -matchTrailing[0].length);
      }
      targetCopy = url.startsWith('www.') ? `https://${url}` : url;
    }

    navigator.clipboard.writeText(targetCopy);
    setCopiedId(id);
    toast.success('Link copied to clipboard');
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Check if user is near bottom
  const checkIfAtBottom = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return true;
    const { scrollTop, scrollHeight, clientHeight } = container;
    const threshold = 180;
    const atBottom = scrollHeight - scrollTop - clientHeight <= threshold;
    setIsAtBottom(atBottom);
    if (atBottom) {
      setShowScrollDownPill(false);
    }
    return atBottom;
  }, []);

  const handleScroll = () => {
    if (profilePopup) {
      setProfilePopup(null);
    }

    const container = scrollContainerRef.current;
    if (!container) return;

    checkIfAtBottom();

    // Trigger reverse pagination fetch when near top
    if (container.scrollTop < 80 && hasNextPage && !isFetchingNextPage) {
      prevScrollHeightRef.current = container.scrollHeight;
      fetchNextPage();
    }
  };

  // Preserve scroll position when older messages are prepended
  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (container && prevScrollHeightRef.current > 0) {
      const newScrollHeight = container.scrollHeight;
      const diff = newScrollHeight - prevScrollHeightRef.current;
      if (diff > 0) {
        container.scrollTop += diff;
      }
      prevScrollHeightRef.current = 0;
    }
  }, [messages]);

  // Handle auto-scroll on new message arrivals
  useEffect(() => {
    const isNewMessageAdded = messages.length > prevMessagesCountRef.current;
    prevMessagesCountRef.current = messages.length;

    if (!isNewMessageAdded) return;

    const latestMessage = messages[messages.length - 1];
    const isSenderSelf =
      latestMessage &&
      (typeof latestMessage.sender === 'object'
        ? latestMessage.sender._id === currentUser?._id
        : latestMessage.sender === currentUser?._id);

    const timer = setTimeout(() => {
      const container = scrollContainerRef.current;
      if (!container) return;
      const distanceFromBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight;

      // If sent by self or close to bottom, smooth scroll to bottom
      if (isSenderSelf || isAtBottom || distanceFromBottom <= 250) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        setShowScrollDownPill(false);
      } else {
        setShowScrollDownPill(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [messages, isAtBottom, currentUser?._id]);

  // Initial scroll to bottom on load
  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
    }
  }, [isLoading, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowScrollDownPill(false);
  };

  const formatMessageTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="relative flex-1 flex flex-col min-h-0 bg-background/50">
      {/* Scrollable message container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar p-4 space-y-1"
      >
        {/* Loading older messages indicator */}
        {isFetchingNextPage && (
          <div className="flex justify-center py-2 animate-pulse">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-muted text-slate-500 dark:text-slate-400 text-xs font-medium border border-slate-200/60 dark:border-border/50 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-purple-500 animate-ping" />
              <span>Fetching earlier history...</span>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="space-y-4 py-4 animate-pulse">
            {/* Incoming message skeleton with avatar */}
            <div className="flex items-start gap-2.5 max-w-[80%]">
              <div className="h-9 w-9 rounded-xl bg-slate-200 dark:bg-muted/70 shrink-0" />
              <div className="space-y-1.5 w-64 sm:w-80">
                <div className="h-3 w-20 rounded bg-slate-200 dark:bg-muted/70" />
                <div className="p-3.5 rounded-2xl rounded-bl-xs bg-slate-100 dark:bg-muted/50 border border-slate-200/50 dark:border-border/40 space-y-2">
                  <div className="h-3.5 w-full rounded bg-slate-200 dark:bg-muted/70" />
                  <div className="h-3.5 w-3/4 rounded bg-slate-200 dark:bg-muted/70" />
                  <div className="h-2.5 w-12 rounded bg-slate-200 dark:bg-muted/60 ml-auto mt-1" />
                </div>
              </div>
            </div>

            {/* Outgoing message skeleton */}
            <div className="flex flex-col items-end gap-1 ml-auto max-w-[75%] sm:max-w-[65%]">
              <div className="p-3.5 rounded-2xl rounded-br-xs bg-purple-100/70 dark:bg-purple-950/40 border border-purple-200/50 dark:border-purple-900/40 space-y-2 w-56 sm:w-72">
                <div className="h-3.5 w-full rounded bg-purple-200/80 dark:bg-purple-900/60" />
                <div className="h-3.5 w-1/2 rounded bg-purple-200/80 dark:bg-purple-900/60" />
                <div className="h-2.5 w-14 rounded bg-purple-200/60 dark:bg-purple-900/40 ml-auto mt-1" />
              </div>
            </div>
          </div>
        ) : isSearchActive && displayedMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-16 text-center space-y-2">
            <div className="h-10 w-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 flex items-center justify-center mb-1">
              <Search className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">No matching messages</h4>
            <p className="text-xs text-muted-foreground max-w-xs">
              No messages matching &quot;{searchQuery}&quot; were found in this chat.
            </p>
            {onClearSearch && (
              <button
                onClick={onClearSearch}
                className="mt-2 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
              >
                Clear search
              </button>
            )}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-16 text-center space-y-2">
            <span className="text-4xl">👋</span>
            <h4 className="text-base font-semibold">No messages yet</h4>
            <p className="text-xs text-muted-foreground max-w-xs">
              Say hi and start the conversation!
            </p>
          </div>
        ) : (
          <>
            {isSearchActive && (
              <div className="sticky top-0 z-20 flex items-center justify-between px-3 py-1.5 rounded-xl bg-purple-50/95 dark:bg-purple-950/90 border border-purple-200/80 dark:border-purple-800/60 shadow-xs mb-2 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-700 dark:text-purple-300">
                  <Search className="h-3.5 w-3.5" />
                  <span>
                    {displayedMessages.length} match{displayedMessages.length === 1 ? '' : 'es'} for &quot;{searchQuery}&quot;
                  </span>
                </div>
                {onClearSearch && (
                  <button
                    onClick={onClearSearch}
                    className="text-[11px] font-bold text-purple-600 hover:text-purple-800 dark:text-purple-400 hover:underline cursor-pointer"
                  >
                    Clear filter
                  </button>
                )}
              </div>
            )}

            {displayedMessages.map((message, idx) => {
              const senderObj =
                typeof message.sender === 'object' ? message.sender : null;
              const senderId = senderObj ? senderObj._id : message.sender;

              // Robust active user detection from store or localStorage
              let activeUser = currentUser;
              if (!activeUser && typeof window !== 'undefined') {
                try {
                  const stored = localStorage.getItem('chatflow_user');
                  if (stored) activeUser = JSON.parse(stored);
                } catch {
                  // ignore
                }
              }

              const currentId = activeUser?._id || (activeUser as unknown as { id?: string })?.id;
              const currentName = activeUser?.name?.toLowerCase().trim();
              const currentPhone = activeUser?.phone?.trim();

              const selfParticipant = participants?.find(
                (p) =>
                  (currentId && p._id === currentId) ||
                  (currentPhone && p.phone?.trim() === currentPhone) ||
                  (currentName && p.name?.toLowerCase().trim() === currentName)
              );

              const resolvedMyId = selfParticipant?._id || currentId;
              const resolvedMyName = selfParticipant?.name?.toLowerCase().trim() || currentName;
              const resolvedMyPhone = selfParticipant?.phone?.trim() || currentPhone;

              const participantMatch = participants?.find(
                (p) =>
                  (senderId && p._id === senderId) ||
                  (senderObj?.phone && p.phone?.trim() === senderObj.phone.trim()) ||
                  (senderObj?.name && p.name?.toLowerCase().trim() === senderObj.name.toLowerCase().trim()) ||
                  (typeof message.sender === 'string' && p.name?.toLowerCase().trim() === message.sender.toLowerCase().trim())
              );

              const senderName =
                senderObj?.name ||
                participantMatch?.name ||
                (typeof message.sender === 'string' && message.sender.length < 30 ? message.sender : 'Teammate');

              const senderPhone = senderObj?.phone || participantMatch?.phone;

              const isSenderNameMatch = Boolean(
                (resolvedMyName && senderName.toLowerCase().trim() === resolvedMyName) ||
                (currentName && senderName.toLowerCase().trim() === currentName) ||
                (typeof message.sender === 'string' && resolvedMyName && message.sender.toLowerCase().trim() === resolvedMyName) ||
                (typeof message.sender === 'string' && currentName && message.sender.toLowerCase().trim() === currentName)
              );

              const isSenderIdMatch = Boolean(
                (resolvedMyId && (senderId === resolvedMyId || participantMatch?._id === resolvedMyId || senderObj?._id === resolvedMyId)) ||
                (currentId && (senderId === currentId || participantMatch?._id === currentId || senderObj?._id === currentId))
              );

              const isSenderPhoneMatch = Boolean(
                (resolvedMyPhone && (senderObj?.phone?.trim() === resolvedMyPhone || participantMatch?.phone?.trim() === resolvedMyPhone)) ||
                (currentPhone && (senderObj?.phone?.trim() === currentPhone || participantMatch?.phone?.trim() === currentPhone))
              );

              // Comprehensive self check
              const isSelf =
                message.sender === 'me' ||
                message.status === 'sending' ||
                isSenderIdMatch ||
                isSenderNameMatch ||
                isSenderPhoneMatch;

              // Message Grouping Calculation (consecutive messages from same sender)
              const prevMsg = idx > 0 ? displayedMessages[idx - 1] : null;
              const nextMsg = idx < displayedMessages.length - 1 ? displayedMessages[idx + 1] : null;

              const prevSenderKey = prevMsg ? (typeof prevMsg.sender === 'object' ? prevMsg.sender?._id : prevMsg.sender) : null;
              const currSenderKey = typeof message.sender === 'object' ? message.sender?._id : message.sender;
              const nextSenderKey = nextMsg ? (typeof nextMsg.sender === 'object' ? nextMsg.sender?._id : nextMsg.sender) : null;

              const isSameSenderAsPrev = Boolean(prevSenderKey && prevSenderKey === currSenderKey);
              const isSameSenderAsNext = Boolean(nextSenderKey && nextSenderKey === currSenderKey);

              const isFirstInGroup = !isSameSenderAsPrev;
              const isLastInGroup = !isSameSenderAsNext;
              const isSingle = isFirstInGroup && isLastInGroup;

              let bubbleCorners = '';
              if (isSelf) {
                if (isSingle) {
                  bubbleCorners = 'rounded-2xl rounded-br-xs';
                } else if (isFirstInGroup) {
                  bubbleCorners = 'rounded-2xl rounded-br-md';
                } else if (isLastInGroup) {
                  bubbleCorners = 'rounded-2xl rounded-tr-md rounded-br-xs';
                } else {
                  bubbleCorners = 'rounded-2xl rounded-r-md';
                }
              } else {
                if (isSingle) {
                  bubbleCorners = 'rounded-2xl rounded-bl-xs';
                } else if (isFirstInGroup) {
                  bubbleCorners = 'rounded-2xl rounded-bl-md';
                } else if (isLastInGroup) {
                  bubbleCorners = 'rounded-2xl rounded-tl-md rounded-bl-xs';
                } else {
                  bubbleCorners = 'rounded-2xl rounded-l-md';
                }
              }

              const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/i;
              const hasLink = urlRegex.test(message.text);
              const senderIdStr = typeof senderId === 'string' ? senderId : senderObj?._id || '';

              return (
                <div
                  key={message._id || message.tempId}
                  className={`flex items-end gap-2 sm:gap-2.5 ${
                    isSelf ? 'justify-end' : 'justify-start'
                  } ${isFirstInGroup ? 'mt-2.5' : 'mt-0.5'} group/row relative z-10 hover:z-30`}
                >
                  {/* Left Profile Avatar for Incoming Messages (Rendered on last message in consecutive group) */}
                  {!isSelf && (
                    isLastInGroup ? (
                      <CoolTooltip content={senderName} side="top" align="start">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const rect = e.currentTarget.getBoundingClientRect();
                            setProfilePopup({
                              id: senderIdStr,
                              name: senderName,
                              phone: senderPhone,
                              x: Math.min(rect.right + 8, window.innerWidth - 240),
                              y: Math.max(16, Math.min(rect.top - 20, window.innerHeight - 280)),
                              initial: (senderName || 'U').charAt(0).toUpperCase(),
                              avatarColor: getAvatarColor(
                                senderName || senderIdStr || 'user'
                              ),
                            });
                          }}
                          className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs shrink-0 cursor-pointer select-none transition-all hover:scale-110 active:scale-95 ring-2 ring-white dark:ring-card ${getAvatarColor(
                            senderName || senderIdStr || 'user'
                          )}`}
                          title={`Click for options • ${senderName}`}
                        >
                          {(senderName || 'U').charAt(0).toUpperCase()}
                        </button>
                      </CoolTooltip>
                    ) : (
                      <div className="w-8 shrink-0 select-none" />
                    )
                  )}

                  {/* Message Bubble Column */}
                  <div
                    className={`flex flex-col ${
                      isSelf ? 'items-end' : 'items-start'
                    } max-w-[85%] sm:max-w-[75%]`}
                  >
                    {/* Message Bubble with rounded grouping */}
                    <div
                      className={`group relative w-full ${bubbleCorners} px-4 py-2.5 shadow-xs transition-all ${
                        isSelf
                          ? 'bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 text-white shadow-md shadow-purple-500/15'
                          : 'bg-white dark:bg-card text-card-foreground border border-border/80'
                      }`}
                    >
                      {/* Copy Link Button - ONLY shown on hover for messages containing a link */}
                      {hasLink && (
                        <button
                          type="button"
                          onClick={(e) =>
                            handleCopyLink(
                              message._id || message.tempId || '',
                              message.text,
                              e
                            )
                          }
                          className={`absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all p-1 rounded-lg cursor-pointer ${
                            isSelf
                              ? 'hover:bg-white/20 text-white/80 hover:text-white bg-black/10'
                              : 'hover:bg-slate-100 dark:hover:bg-muted text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-white/80 dark:bg-card/80 border border-slate-200/50 dark:border-border/50 shadow-2xs'
                          }`}
                          title="Copy link"
                        >
                          {copiedId === (message._id || message.tempId) ? (
                            <Check className="h-3 w-3 text-emerald-300" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      )}

                      {/* Message Text with URL linkifier & search highlighter */}
                      <div
                        className={`whitespace-pre-wrap break-words leading-relaxed text-sm sm:text-[15px] font-medium select-text cursor-text ${
                          hasLink ? 'pr-4' : 'pr-0'
                        }`}
                      >
                        {renderMessageContent(message.text, isSelf, searchQuery)}
                      </div>

                      {/* Message Meta: Timestamp, Status, & Quick Action */}
                      <div
                        className={`flex items-center justify-end gap-1.5 mt-1.5 text-[11px] font-medium select-none ${
                          isSelf ? 'text-white/85' : 'text-muted-foreground'
                        }`}
                      >
                        <span>{formatMessageTime(message.createdAt)}</span>

                        {/* Status icons for own messages */}
                        {isSelf && (
                          <span className="inline-flex items-center">
                            {message.status === 'sending' ? (
                              <Clock className="h-3 w-3 animate-pulse" />
                            ) : message.status === 'failed' ? (
                              <button
                                onClick={() =>
                                  onRetryMessage(
                                    message.tempId || message._id,
                                    message.text
                                  )
                                }
                                className="inline-flex items-center gap-0.5 text-rose-200 font-bold underline"
                                title="Failed to send. Click to retry"
                              >
                                <RotateCcw className="h-3 w-3" />
                                Retry
                              </button>
                            ) : (
                              <Check className="h-3 w-3" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Failed message banner */}
                    {isSelf && message.status === 'failed' && (
                      <div className="flex items-center gap-1 mt-1 text-[11px] text-destructive mr-1 font-medium">
                        <AlertCircle className="h-3 w-3" />
                        <span>Failed to deliver message</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Floating Profile Action Menu on Avatar Click */}
      {profilePopup && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            left: `${profilePopup.x}px`,
            top: `${profilePopup.y}px`,
          }}
          className="z-50 w-56 rounded-2xl bg-white dark:bg-[#1C1C1F] border border-slate-200 dark:border-zinc-800 shadow-2xl shadow-black/30 p-2 space-y-1 animate-in fade-in zoom-in-95 duration-150 select-none text-slate-800 dark:text-zinc-100"
        >
          {/* Header Info */}
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-100 dark:border-zinc-800/60 mb-1">
            <div
              className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-xs ring-2 ring-white dark:ring-zinc-800 ${profilePopup.avatarColor}`}
            >
              {profilePopup.initial}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-xs sm:text-sm truncate leading-tight">
                {profilePopup.name}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 truncate font-medium">
                {profilePopup.phone || 'Teammate'}
              </p>
            </div>
          </div>

          {/* Action: Send Direct Message */}
          <button
            type="button"
            onClick={() => handleStartDirectChat(profilePopup.id)}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors cursor-pointer text-left"
          >
            <MessageSquare className="h-4 w-4 shrink-0" />
            <span>Send direct message</span>
          </button>

          {/* Action: Copy Details */}
          <button
            type="button"
            onClick={() => handleCopyProfile(profilePopup.name, profilePopup.phone)}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-left"
          >
            <Copy className="h-4 w-4 text-slate-400 shrink-0" />
            <span>Copy profile info</span>
          </button>
        </div>
      )}

      {/* Floating "↓ New message" Pill Button */}
      {showScrollDownPill && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 px-5 py-2.5 text-xs font-bold text-white shadow-xl shadow-purple-500/30 hover:opacity-95 active:scale-95 transition-all z-20 animate-bounce cursor-pointer"
        >
          <ArrowDown className="h-3.5 w-3.5" />
          <span>New message</span>
        </button>
      )}
    </div>
  );
}
