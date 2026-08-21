'use client';

import { use } from 'react';
import ChatPanel from '@/components/chat/ChatPanel';

export default function ChatConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return <ChatPanel conversationId={id} />;
}
