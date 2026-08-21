'use client';

import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react';
import {
  Loader2,
  AlertCircle,
  ArrowDown,
  Check,
  Clock,
  RotateCcw,
} from 'lucide-react';
import { Message, GroupParticipant } from '@/types';
import { useAuthStore } from '@/store/useAuthStore';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  participants?: GroupParticipant[];
  isGroup?: boolean;
  fetchNextPage: () => void;
  onRetryMessage: (tempId: string, text: string) => void;
}

export default function MessageList({
  messages,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  participants,
  isGroup,
  fetchNextPage,
  onRetryMessage,
}: MessageListProps) {
  const { user: currentUser } = useAuthStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollDownPill, setShowScrollDownPill] = useState(false);
  const prevMessagesCountRef = useRef(messages.length);
  const prevScrollHeightRef = useRef<number>(0);

  // Check if user is near bottom
  const checkIfAtBottom = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return true;
    const { scrollTop, scrollHeight, clientHeight } = container;
    const threshold = 150;
    const atBottom = scrollHeight - scrollTop - clientHeight <= threshold;
    setIsAtBottom(atBottom);
    if (atBottom) {
      setShowScrollDownPill(false);
    }
    return atBottom;
  }, []);

  const handleScroll = () => {
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

    // If current user sent the message, always scroll to bottom
    if (isSenderSelf) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // For incoming messages: if at bottom -> scroll, otherwise show pill
    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      requestAnimationFrame(() => {
        setShowScrollDownPill(true);
      });
    }
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
        className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar p-4 space-y-3"
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

            {/* Incoming short message skeleton */}
            <div className="flex items-start gap-2.5 max-w-[80%]">
              <div className="h-9 w-9 rounded-xl bg-slate-200 dark:bg-muted/70 shrink-0" />
              <div className="space-y-1.5 w-48 sm:w-60">
                <div className="h-3 w-16 rounded bg-slate-200 dark:bg-muted/70" />
                <div className="p-3.5 rounded-2xl rounded-bl-xs bg-slate-100 dark:bg-muted/50 border border-slate-200/50 dark:border-border/40 space-y-2">
                  <div className="h-3.5 w-full rounded bg-slate-200 dark:bg-muted/70" />
                  <div className="h-2.5 w-12 rounded bg-slate-200 dark:bg-muted/60 ml-auto mt-1" />
                </div>
              </div>
            </div>

            {/* Outgoing short message skeleton */}
            <div className="flex flex-col items-end gap-1 ml-auto max-w-[75%] sm:max-w-[65%]">
              <div className="p-3.5 rounded-2xl rounded-br-xs bg-purple-100/70 dark:bg-purple-950/40 border border-purple-200/50 dark:border-purple-900/40 space-y-2 w-44 sm:w-52">
                <div className="h-3.5 w-full rounded bg-purple-200/80 dark:bg-purple-900/60" />
                <div className="h-2.5 w-14 rounded bg-purple-200/60 dark:bg-purple-900/40 ml-auto mt-1" />
              </div>
            </div>
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
          messages.map((message) => {
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

            return (
              <div
                key={message._id || message.tempId}
                className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'}`}
              >
                {/* Sender Name in group chats for other participants */}
                {!isSelf && isGroup && (
                  <span className="text-[11px] font-semibold text-primary/85 ml-2 mb-1">
                    {senderName}
                  </span>
                )}

                {/* Message Bubble */}
                <div
                  className={`group relative max-w-[82%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 shadow-xs transition-all ${
                    isSelf
                      ? 'bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 text-white rounded-br-xs shadow-md shadow-purple-500/15'
                      : 'bg-white dark:bg-card text-card-foreground border border-border/80 rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words leading-relaxed text-sm sm:text-[15px] font-medium">
                    {message.text}
                  </p>

                  {/* Message Meta: Timestamp & Status */}
                  <div
                    className={`flex items-center justify-end gap-1.5 mt-1 text-[11px] font-medium ${
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
            );
          })
        )}

        <div ref={messagesEndRef} />
      </div>

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
