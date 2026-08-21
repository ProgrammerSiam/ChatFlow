'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Plus,
  Users,
  Search,
  MessageSquare,
  LogOut,
  Sparkles,
  User as UserIcon,
  Shield,
  Home,
  MessageSquarePlus,
} from 'lucide-react';
import BrandLogo from '@/shared/BrandLogo';
import { useConversations } from '@/hooks/useConversations';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatUIStore } from '@/store/useChatUIStore';
import { Conversation } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type FilterTab = 'all' | 'direct' | 'groups' | 'unread';

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
  } = useChatUIStore();

  const [filterQuery, setFilterQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  const handleLogout = () => {
    logout();
    queryClient.clear();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  // Filter conversations by query and tab
  const filteredConversations = useMemo(() => {
    return conversations.filter((c) => {
      // Tab filter
      if (activeFilter === 'direct' && c.type !== 'direct') return false;
      if (activeFilter === 'groups' && c.type !== 'group') return false;
      if (activeFilter === 'unread' && (!c.unreadCount || c.unreadCount === 0)) return false;

      // Text filter
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
  }, [conversations, filterQuery, activeFilter]);

  const counts = useMemo(() => {
    const direct = conversations.filter((c) => c.type === 'direct').length;
    const groups = conversations.filter((c) => c.type === 'group').length;
    const unread = conversations.filter((c) => (c.unreadCount || 0) > 0).length;
    return { all: conversations.length, direct, groups, unread };
  }, [conversations]);

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
    <aside className="w-full md:w-72 lg:w-80 h-full rounded-[24px] bg-white dark:bg-card border border-slate-200/80 dark:border-border/70 p-3 sm:p-3.5 flex flex-col justify-between shadow-xs select-none shrink-0 overflow-hidden">
      
      {/* Top Section */}
      <div className="flex flex-col gap-3">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-1">
          <Link href="/" title="ChatFlow Home">
            <BrandLogo size="sm" prefix="Chat" suffix="Flow" />
          </Link>

          <Link
            href="/"
            title="Return to Home"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200/60 dark:border-border/60 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-muted transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Action Buttons: New Direct Chat & New Group Chat */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setNewChatOpen(true)}
            className="h-9.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-xs flex items-center justify-center gap-1.5 shadow-xs hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-[0.99] transition-all cursor-pointer"
          >
            <MessageSquarePlus className="h-3.5 w-3.5" />
            <span>New chat</span>
          </button>

          <button
            onClick={() => setNewGroupOpen(true)}
            className="h-9.5 rounded-xl border border-slate-200/80 dark:border-border/80 bg-slate-50/80 dark:bg-muted/40 hover:bg-slate-100 dark:hover:bg-muted text-slate-800 dark:text-slate-200 font-medium text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Users className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
            <span>New group</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full h-8.5 rounded-xl bg-slate-100/70 dark:bg-muted/50 border border-slate-200/50 dark:border-border/50 pl-8.5 pr-4 text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer shrink-0 ${
              activeFilter === 'all'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-muted'
            }`}
          >
            All ({counts.all})
          </button>

          <button
            onClick={() => setActiveFilter('direct')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer shrink-0 ${
              activeFilter === 'direct'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-muted'
            }`}
          >
            Direct ({counts.direct})
          </button>

          <button
            onClick={() => setActiveFilter('groups')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer shrink-0 ${
              activeFilter === 'groups'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-muted'
            }`}
          >
            Groups ({counts.groups})
          </button>

          {counts.unread > 0 && (
            <button
              onClick={() => setActiveFilter('unread')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer shrink-0 ${
                activeFilter === 'unread'
                  ? 'bg-purple-600 text-white'
                  : 'text-purple-600 bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100'
              }`}
            >
              Unread ({counts.unread})
            </button>
          )}
        </div>
      </div>

      {/* Real Conversations List */}
      <div className="flex-1 overflow-y-auto my-2 pr-1 -mr-1 space-y-1">
        {isLoading ? (
          <div className="space-y-2 py-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-2.5 p-2 rounded-xl animate-pulse">
                <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-muted shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 w-3/4 rounded bg-slate-100 dark:bg-muted" />
                  <div className="h-2.5 w-1/2 rounded bg-slate-100 dark:bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="py-6 text-center text-xs text-rose-500 space-y-1.5">
            <p>Failed to load conversations</p>
            <button
              onClick={() => refetch()}
              className="text-[11px] font-semibold text-purple-600 underline"
            >
              Retry
            </button>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="py-10 px-2 text-center space-y-3">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                {filterQuery ? 'No matching chats found' : 'No conversations yet'}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {filterQuery ? 'Try another search query' : 'Start your first direct or group chat'}
              </p>
            </div>
            {!filterQuery && (
              <div className="flex justify-center gap-2 pt-1">
                <button
                  onClick={() => setNewChatOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-medium hover:bg-purple-700 transition-colors"
                >
                  Start Chat
                </button>
              </div>
            )}
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const isGroup = conv.type === 'group';
            const isActive = activeId === conv._id;
            const title = isGroup
              ? conv.name || 'Group Chat'
              : conv.participant?.name || 'User';
            const subtitle = conv.lastMessage?.text || (isGroup ? `${conv.participants?.length || 0} participants` : conv.participant?.phone || 'No messages yet');
            const time = formatConversationTime(conv.lastMessage?.createdAt || conv.updatedAt || conv.createdAt);

            return (
              <Link
                key={conv._id}
                href={`/chat/${conv._id}`}
                className={`group flex items-center gap-2.5 p-2 rounded-xl transition-all ${
                  isActive
                    ? 'bg-slate-100 dark:bg-muted text-slate-900 dark:text-white shadow-2xs'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-muted/40'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold text-xs shadow-2xs ${
                    isGroup
                      ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
                      : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                  }`}
                >
                  {isGroup ? (
                    <Users className="h-4 w-4" />
                  ) : (
                    title.charAt(0).toUpperCase()
                  )}
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-medium text-slate-900 dark:text-white truncate">
                      {title}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0">{time}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate leading-snug">
                    {subtitle}
                  </p>
                </div>

                {/* Unread Counter Badge */}
                {conv.unreadCount && conv.unreadCount > 0 ? (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-purple-600 text-white text-[9px] font-bold px-1 shrink-0">
                    {conv.unreadCount}
                  </span>
                ) : null}
              </Link>
            );
          })
        )}
      </div>

      {/* User Profile Card (GET /auth/me Modal Trigger) */}
      <div className="pt-2 border-t border-slate-100 dark:border-border/50">
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/80 dark:bg-muted/40 border border-slate-200/50 dark:border-border/50">
          <button
            onClick={() => setProfileOpen(true)}
            className="flex items-center gap-2.5 min-w-0 text-left cursor-pointer hover:opacity-85 transition-opacity flex-1"
          >
            <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 text-white font-semibold text-[11px] shadow-xs">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'ME'}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-slate-900 dark:text-white truncate leading-tight">
                {user?.name || 'Account'}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {user?.phone || 'Connected'}
              </p>
            </div>
          </button>

          {/* Action Log Out */}
          <button
            onClick={handleLogout}
            title="Log Out"
            className="flex h-6.5 w-6.5 items-center justify-center rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer shrink-0 ml-1"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

    </aside>
  );
}
