'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  MessageSquarePlus,
  Users,
  Search,
  LogOut,
  User as UserIcon,
  MessageCircle,
} from 'lucide-react';
import { useConversations } from '@/hooks/useConversations';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatUIStore } from '@/store/useChatUIStore';
import { Conversation } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function Sidebar() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const activeId = (params?.id as string) || null;

  const { conversations, isLoading, error, refetch } = useConversations();
  const { user, logout } = useAuthStore();
  const {
    setNewChatOpen,
    setNewGroupOpen,
    setProfileOpen,
    setActiveConversationId,
  } = useChatUIStore();

  const [filterQuery, setFilterQuery] = useState('');

  const handleLogout = () => {
    logout();
    queryClient.clear();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  const filteredConversations = conversations.filter((c) => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase();
    if (c.type === 'direct') {
      return (
        c.participant?.name?.toLowerCase().includes(q) ||
        c.participant?.phone?.includes(q) ||
        c.lastMessage?.text?.toLowerCase().includes(q)
      );
    } else {
      return (
        c.name?.toLowerCase().includes(q) ||
        c.lastMessage?.text?.toLowerCase().includes(q)
      );
    }
  });

  const formatConversationTime = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

      if (isToday) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch {
      return '';
    }
  };

  return (
    <aside className="w-full md:w-80 lg:w-96 flex flex-col h-full bg-card border-r border-border text-card-foreground select-none">
      {/* Sidebar Header */}
      <div className="p-4 border-b space-y-3">
        <div className="flex items-center justify-between">
          <Link href="/chat" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow">
              <MessageCircle className="h-5 w-5" />
            </div>
            <span>ChatFlow</span>
          </Link>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setNewChatOpen(true)}
              title="New Direct Message"
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <MessageSquarePlus className="h-5 w-5" />
            </button>
            <button
              onClick={() => setNewGroupOpen(true)}
              title="New Group Chat"
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Users className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setProfileOpen(true);
              }}
              title="My Account Profile (GET /auth/me)"
              className="p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <UserIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Filter Input */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search chats..."
            className="w-full rounded-xl border border-input bg-background pl-9 pr-4 py-2 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {isLoading ? (
          <div className="p-2 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-xl animate-pulse">
                <div className="h-12 w-12 rounded-full bg-muted shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-muted" />
                  <div className="h-3 w-1/2 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-6 text-center space-y-3">
            <p className="text-xs text-destructive">Failed to load conversations</p>
            <button
              onClick={() => refetch()}
              className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium hover:bg-muted/80"
            >
              Retry
            </button>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="py-12 px-4 text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium">No conversations yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                {filterQuery ? 'No results match your search.' : 'Start chatting with a teammate or create a group.'}
              </p>
            </div>
            {!filterQuery && (
              <div className="flex justify-center gap-2 pt-2">
                <button
                  onClick={() => setNewChatOpen(true)}
                  className="rounded-lg bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground shadow hover:opacity-90 transition-opacity"
                >
                  New Chat
                </button>
                <button
                  onClick={() => setNewGroupOpen(true)}
                  className="rounded-lg border border-input bg-background px-3.5 py-1.5 text-xs font-medium hover:bg-accent"
                >
                  New Group
                </button>
              </div>
            )}
          </div>
        ) : (
          filteredConversations.map((conv: Conversation) => {
            const isActive = activeId === conv._id;
            const isGroup = conv.type === 'group';
            const title = isGroup
              ? conv.name || 'Group Chat'
              : conv.participant?.name || 'User';
            const subtitle = conv.lastMessage?.text
              ? conv.lastMessage.text
              : isGroup
              ? `${conv.participants?.length || 0} members`
              : conv.participant?.phone || 'Direct message';
            const time = formatConversationTime(conv.updatedAt);
            const unread = conv.unreadCount || 0;

            return (
              <Link
                key={conv._id}
                href={`/chat/${conv._id}`}
                onClick={() => setActiveConversationId(conv._id)}
                className={`flex items-center justify-between gap-3 p-3 rounded-2xl transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'hover:bg-muted/70 text-card-foreground'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-bold text-sm shadow-inner ${
                      isActive
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : isGroup
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {isGroup ? (
                      <Users className="h-5 w-5" />
                    ) : (
                      title.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className="font-semibold text-sm truncate leading-tight">
                        {title}
                      </p>
                    </div>
                    <p
                      className={`text-xs truncate mt-0.5 ${
                        isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                      }`}
                    >
                      {subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span
                    className={`text-[10px] font-medium ${
                      isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}
                  >
                    {time}
                  </span>
                  {unread > 0 && (
                    <span
                      className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                        isActive
                          ? 'bg-white text-primary'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      {unread > 99 ? '99+' : unread}
                    </span>
                  )}
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* User Profile & Logout Footer */}
      <div className="p-3 border-t bg-muted/40 flex items-center justify-between gap-3 shrink-0">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setProfileOpen(true);
          }}
          title="View Account Profile (GET /auth/me)"
          className="flex items-center gap-2.5 min-w-0 text-left hover:opacity-80 transition-opacity flex-1 cursor-pointer"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary font-bold text-sm shadow-inner">
            {user?.name ? user.name.charAt(0).toUpperCase() : <UserIcon className="h-5 w-5" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold leading-tight truncate text-foreground flex items-center gap-1">
              <span>{user?.name || 'Authenticated User'}</span>
            </p>
            <p className="text-[11px] text-muted-foreground truncate font-mono">
              {user?.phone || 'Connected'}
            </p>
          </div>
        </button>

        <button
          onClick={handleLogout}
          title="Sign Out of ChatFlow"
          className="inline-flex items-center gap-1.5 rounded-xl border border-destructive/20 bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all shadow-xs shrink-0"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
