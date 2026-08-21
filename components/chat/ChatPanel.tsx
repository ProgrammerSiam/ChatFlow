'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Info, Users, User as UserIcon } from 'lucide-react';
import { useConversations } from '@/hooks/useConversations';
import { useMessages } from '@/hooks/useMessages';
import { useSendMessage } from '@/hooks/useSendMessage';
import { useChatUIStore } from '@/store/useChatUIStore';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import GroupInfoDrawer from './GroupInfoDrawer';

export default function ChatPanel({ conversationId }: { conversationId: string }) {
  const { conversations } = useConversations();
  const { messages, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useMessages(conversationId);
  const { sendMessage, retryMessage, isPending } = useSendMessage(conversationId);
  const { isGroupInfoOpen, setGroupInfoOpen, setActiveConversationId } = useChatUIStore();

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
    <div className="relative flex-1 flex flex-col h-full bg-background overflow-hidden">
      {/* Top Header */}
      <header className="h-16 border-b px-4 flex items-center justify-between bg-card text-card-foreground shadow-xs z-10">
        <div className="flex items-center gap-3 min-w-0">
          {/* Back button for mobile */}
          <Link
            href="/chat"
            className="md:hidden p-2 -ml-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div
            onClick={() => isGroup && setGroupInfoOpen(!isGroupInfoOpen)}
            className={`flex items-center gap-3 min-w-0 ${
              isGroup ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
            }`}
            title={isGroup ? 'Click to view group details and manage members' : undefined}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary font-bold text-sm shadow-inner">
              {isGroup ? (
                <Users className="h-5 w-5" />
              ) : title ? (
                title.charAt(0).toUpperCase()
              ) : (
                <UserIcon className="h-4 w-4" />
              )}
            </div>

            <div className="min-w-0">
              <h2 className="text-sm font-semibold truncate leading-tight">{title}</h2>
              <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
            </div>
          </div>
        </div>

        {/* Group Details Toggle */}
        {isGroup && (
          <button
            onClick={() => setGroupInfoOpen(!isGroupInfoOpen)}
            className={`p-2 rounded-xl border transition-colors ${
              isGroupInfoOpen
                ? 'bg-primary text-primary-foreground border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted border-border'
            }`}
            title="Group Info"
          >
            <Info className="h-5 w-5" />
          </button>
        )}
      </header>

      {/* Messages Viewport */}
      <MessageList
        messages={messages}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        participants={conversation?.participants}
        isGroup={isGroup}
        fetchNextPage={fetchNextPage}
        onRetryMessage={retryMessage}
      />

      {/* Message Input Bar */}
      <MessageInput
        onSendMessage={sendMessage}
        disabled={isPending || isLoading}
      />

      {/* Group Info Drawer */}
      {conversation && <GroupInfoDrawer conversation={conversation} />}
    </div>
  );
}
