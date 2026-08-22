'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Users,
  User as UserIcon,
  Search,
  X,
} from 'lucide-react';
import { useConversations } from '@/hooks/useConversations';
import { useMessages } from '@/hooks/useMessages';
import { useSendMessage } from '@/hooks/useSendMessage';
import { useChatUIStore } from '@/store/useChatUIStore';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ConversationDetailsPanel from './ConversationDetailsPanel';
import CoolTooltip from '@/shared/CoolTooltip';

export default function ChatPanel({ conversationId }: { conversationId: string }) {
  const { conversations } = useConversations();
  const { messages, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useMessages(conversationId);
  const { sendMessage, retryMessage, isPending } = useSendMessage(conversationId);
  const { setActiveConversationId } = useChatUIStore();

  // Show right details panel initially by default on desktop
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setActiveConversationId(conversationId);
    return () => {
      setActiveConversationId(null);
    };
  }, [conversationId, setActiveConversationId]);

  const conversation = conversations.find((c) => c._id === conversationId);

  const isGroup = conversation?.type === 'group';
  const title = isGroup
    ? conversation?.name || 'Group Chat'
    : conversation?.participant?.name || 'User';
  const subtitle = isGroup
    ? `${conversation?.participants?.length || 0} participants`
    : conversation?.participant?.phone || '';

  return (
    <div className="flex-1 flex h-full gap-2 sm:gap-3 overflow-hidden">
      
      {/* Middle Main Chat Panel (Reduced width, side-by-side) */}
      <div className="flex-1 flex flex-col h-full rounded-[24px] bg-white dark:bg-card border border-slate-200/80 dark:border-border/70 shadow-xs overflow-hidden min-w-0">
        {/* Top Header */}
        <header className="h-14 border-b border-slate-100 dark:border-border/50 px-4 flex items-center justify-between bg-white/80 dark:bg-card/80 backdrop-blur-sm text-card-foreground z-10 shrink-0 gap-2">
          <div className="flex items-center gap-3 min-w-0">
            {/* Back button for mobile */}
            <Link
              href="/chat"
              className="md:hidden p-2 -ml-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>

            <button
              onClick={() => setShowRightPanel(!showRightPanel)}
              className="flex items-center gap-3 min-w-0 text-left hover:opacity-85 transition-opacity cursor-pointer"
            >
              {/* Header Avatar Squircle */}
              <div className="relative shrink-0">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-[14px] font-bold text-xs shadow-2xs ${
                    isGroup
                      ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300'
                      : 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                  }`}
                >
                  {isGroup ? <Users className="h-4.5 w-4.5" /> : title.charAt(0).toUpperCase()}
                </div>
                {!isGroup && (
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-card" />
                )}
              </div>

              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-bold tracking-tight truncate leading-tight text-slate-900 dark:text-white">
                  {title}
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 truncate mt-0.5 font-medium">{subtitle}</p>
              </div>
            </button>
          </div>

          {/* Top Right Header Actions: Chat Search & Info Panel */}
          <div className="flex items-center gap-2 shrink-0">
            {/* In-Chat Message Searchbar */}
            {isSearching ? (
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-muted/80 border border-slate-200 dark:border-border rounded-xl px-2.5 py-1.5 animate-in fade-in zoom-in-95 duration-150">
                <Search className="h-4 w-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search in chat..."
                  autoFocus
                  className="w-32 sm:w-52 md:w-60 bg-transparent text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 cursor-pointer"
                    title="Clear search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsSearching(false);
                    setSearchQuery('');
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-semibold px-1.5 py-0.5 rounded hover:bg-slate-200/60 dark:hover:bg-muted cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <CoolTooltip content="Search in this conversation" side="left">
                <button
                  onClick={() => setIsSearching(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 dark:border-border text-slate-500 dark:text-slate-300 hover:text-purple-600 hover:border-purple-300 dark:hover:text-purple-400 hover:bg-white dark:hover:bg-muted shadow-2xs transition-all cursor-pointer hover:scale-105 active:scale-95"
                  aria-label="Search messages"
                >
                  <Search className="h-4 w-4" />
                </button>
              </CoolTooltip>
            )}

            {/* Right Panel Toggle Button */}
            <CoolTooltip
              content={
                showRightPanel
                  ? isGroup
                    ? 'Hide Group Info'
                    : 'Hide Profile'
                  : isGroup
                  ? 'Show Group Info'
                  : 'Show Contact Info'
              }
              side="left"
            >
              <button
                onClick={() => setShowRightPanel(!showRightPanel)}
                className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all cursor-pointer shadow-2xs ${
                  showRightPanel
                    ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-muted border-slate-200/80 dark:border-border'
                }`}
              >
                {isGroup ? (
                  <Users className="h-4.5 w-4.5" />
                ) : (
                  <UserIcon className="h-4.5 w-4.5" />
                )}
              </button>
            </CoolTooltip>
          </div>
        </header>

        {/* Messages Viewport */}
        <MessageList
          messages={messages}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          participants={conversation?.participants}
          isGroup={isGroup}
          searchQuery={searchQuery}
          onClearSearch={() => {
            setSearchQuery('');
            setIsSearching(false);
          }}
          fetchNextPage={fetchNextPage}
          onRetryMessage={retryMessage}
        />

        {/* Message Input Bar */}
        <MessageInput
          onSendMessage={sendMessage}
          disabled={isPending || isLoading}
        />
      </div>

      {/* Right Side Info & Profile Panel (Rendered initially on desktop) */}
      {showRightPanel && conversation && (
        <div className="hidden lg:flex w-72 xl:w-80 h-full shrink-0 animate-in fade-in slide-in-from-right-4 duration-200">
          <ConversationDetailsPanel
            conversation={conversation}
            onClose={() => setShowRightPanel(false)}
          />
        </div>
      )}

      {/* Mobile / Tablet Overlay Drawer */}
      {showRightPanel && conversation && (
        <div className="lg:hidden">
          <div
            onClick={() => setShowRightPanel(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm p-3 flex flex-col">
            <ConversationDetailsPanel
              conversation={conversation}
              onClose={() => setShowRightPanel(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
}
