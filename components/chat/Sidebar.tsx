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
  Sparkles,
  Home,
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
    <aside className="w-full md:w-80 lg:w-96 flex flex-col h-full bg-white dark:bg-card border-r border-border text-card-foreground select-none">
      {/* Sidebar Header */}
      <div className="p-4 border-b space-y-3 bg-white/50 dark:bg-card/50 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            title="Go to Homepage"
            className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight group hover:opacity-85 transition-opacity"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/20">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="flex items-center gap-1.5">
              <span>ChatFlow</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/40">
                Home
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <Link
              href="/"
              title="Return to Landing Page"
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Home className="h-4 w-4" />
            </Link>
            <button
              onClick={() => setNewChatOpen(true)}
              title="New Direct Message"
              className="p-2 rounded-xl text-muted-foreground hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/50 transition-colors cursor-pointer"
            >
              <MessageSquarePlus className="h-4 w-4" />
            </button>
            <button
              onClick={() => setNewGroupOpen(true)}
              title="New Group Chat"
              className="p-2 rounded-xl text-muted-foreground hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/50 transition-colors cursor-pointer"
            >
              <Users className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setProfileOpen(true);
              }}
              title="My Account Profile (GET /auth/me)"
              className="p-2 rounded-xl text-muted-foreground hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/50 transition-colors cursor-pointer"
            >
              <UserIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Filter Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search chats..."
            className="w-full rounded-2xl border border-input bg-background pl-10 pr-4 py-2.5 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 shadow-xs"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {isLoading ? (
          <div className="p-2 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-2xl animate-pulse">
                <div className="h-12 w-12 rounded-2xl bg-muted shrink-0" />
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
              className="rounded-full bg-muted px-4 py-2 text-xs font-semibold hover:bg-muted/80"
            >
              Retry
            </button>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="py-12 px-4 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 shadow-inner">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold">No conversations yet</p>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
                {filterQuery ? 'No results match your search.' : 'Start chatting with a teammate or create a group.'}
              </p>
            </div>
            {!filterQuery && (
              <div className="flex justify-center gap-2 pt-2">
                <button
                  onClick={() => setNewChatOpen(true)}
                  className="rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-purple-500/20 hover:opacity-95 transition-opacity"
                >
                  New Chat
                </button>
                <button
                  onClick={() => setNewGroupOpen(true)}
                  className="rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold hover:bg-muted"
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
                    ? 'bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 text-white shadow-md shadow-purple-500/20'
                    : 'hover:bg-purple-50/50 dark:hover:bg-muted/60 text-card-foreground'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-bold text-sm shadow-inner ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : isGroup
                        ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300'
                        : 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
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
                      <p className="font-bold text-xs sm:text-sm truncate leading-tight">
                        {title}
                      </p>
                    </div>
                    <p
                      className={`text-xs truncate mt-0.5 ${
                        isActive ? 'text-white/80' : 'text-muted-foreground'
                      }`}
                    >
                      {subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span
                    className={`text-[10px] font-semibold ${
                      isActive ? 'text-white/70' : 'text-muted-foreground'
                    }`}
                  >
                    {time}
                  </span>
                  {unread > 0 && (
                    <span
                      className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-extrabold ${
                        isActive
                          ? 'bg-white text-purple-700'
                          : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-xs'
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
      <div className="p-3 border-t bg-slate-50/80 dark:bg-card/80 flex items-center justify-between gap-3 shrink-0">
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
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold text-sm shadow-inner">
            {user?.name ? user.name.charAt(0).toUpperCase() : <UserIcon className="h-4 w-4" />}
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
          className="inline-flex items-center gap-1.5 rounded-full border border-destructive/20 bg-destructive/10 px-3.5 py-2 text-xs font-semibold text-destructive hover:bg-destructive hover:text-white transition-all shadow-xs shrink-0 cursor-pointer"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
