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
  MessageSquarePlus,
} from 'lucide-react';
import BrandLogo from '@/shared/BrandLogo';
import CoolTooltip from '@/shared/CoolTooltip';
import { useConversations } from '@/hooks/useConversations';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatUIStore } from '@/store/useChatUIStore';
import { Conversation } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import ConfirmModal from '@/shared/ConfirmModal';

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
    isSidebarCollapsed,
    toggleSidebarCollapsed,
  } = useChatUIStore();

  const [filterQuery, setFilterQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  const handleLogout = () => {
    setIsLogoutConfirmOpen(false);
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

  // Collapsed Sidebar View (Expanded Comfortable Dock Mode)
  if (isSidebarCollapsed) {
    return (
      <aside className="w-18 sm:w-20 h-full rounded-[24px] bg-[#FAFAFA] dark:bg-card border border-slate-200/80 dark:border-border/70 p-3 flex flex-col justify-between items-center shadow-xs select-none shrink-0 transition-all duration-300 relative z-20">
        {/* Top: Expand Toggle & Quick Action Icons */}
        <div className="flex flex-col items-center gap-3 w-full">
          <button
            onClick={toggleSidebarCollapsed}
            title="Expand sidebar (⌘[)"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-muted border border-slate-200/80 dark:border-border text-slate-600 dark:text-slate-300 hover:text-purple-600 hover:border-purple-300 shadow-2xs transition-all cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="4" />
              <path d="M9 3v18" />
              <path d="m11 9 3 3-3 3" />
            </svg>
          </button>

          {/* New Chat & New Group Compact Icons */}
          <div className="flex flex-col gap-2 pt-0.5">
            <button
              onClick={() => setNewChatOpen(true)}
              title="New Direct Chat"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              <MessageSquarePlus className="h-4.5 w-4.5" />
            </button>

            <button
              onClick={() => setNewGroupOpen(true)}
              title="New Group Workspace"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 dark:border-border bg-white dark:bg-muted text-purple-600 dark:text-purple-400 hover:bg-purple-50 shadow-2xs transition-colors cursor-pointer"
            >
              <Users className="h-4.5 w-4.5" />
            </button>
          </div>

          <div className="w-8 border-t border-slate-200/60 dark:border-border/60 my-0.5" />

          {/* Conversations Avatars Feed with Top & Bottom Shadow Vignettes */}
          <div className="relative flex-1 w-full min-h-0 flex flex-col my-1">
            {/* Top Fade Vignette */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-[#FAFAFA] dark:from-card to-transparent z-10" />

            <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar space-y-2.5 w-full flex flex-col items-center py-1 max-h-[calc(100vh-250px)]">
              {filteredConversations.map((conv) => {
                const isGroup = conv.type === 'group';
                const isActive = activeId === conv._id;
                const title = isGroup ? conv.name || 'Group' : conv.participant?.name || 'User';

                return (
                  <Link
                    key={conv._id}
                    href={`/chat/${conv._id}`}
                    title={title}
                    className={`relative flex h-10 w-10 items-center justify-center rounded-xl font-bold text-xs shadow-2xs transition-all cursor-pointer ${
                      isActive
                        ? 'ring-2 ring-purple-600 bg-gradient-to-tr from-[#8E7CFF] to-[#B6A8FF] text-white scale-105 shadow-xs'
                        : isGroup
                        ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:scale-105'
                        : 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:scale-105'
                    }`}
                  >
                    {isGroup ? <Users className="h-4.5 w-4.5" /> : title.charAt(0).toUpperCase()}
                    {conv.unreadCount && conv.unreadCount > 0 ? (
                      <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-purple-600 text-white text-[9px] font-bold ring-2 ring-white">
                        {conv.unreadCount}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>

            {/* Bottom Fade Vignette */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#FAFAFA] dark:from-card to-transparent z-10" />
          </div>
        </div>

        {/* Bottom Profile Mini Circle */}
        <div className="pt-2 border-t border-slate-200/50 dark:border-border/50 flex flex-col items-center">
          <button
            onClick={() => setProfileOpen(true)}
            title="My Profile & Settings"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#8E7CFF] via-[#A293FF] to-[#D5CCFF] text-white font-semibold text-xs shadow-xs hover:opacity-90 transition-opacity cursor-pointer"
          >
            {user?.name ? user.name.slice(0, 2).toUpperCase() : 'ME'}
          </button>
        </div>
      </aside>
    );
  }

  // Expanded Sidebar View (Full Layout)
  return (
    <aside className="w-full md:w-80 lg:w-84 h-full rounded-[24px] bg-[#FAFAFA] dark:bg-card border border-slate-200/80 dark:border-border/70 p-3.5 sm:p-4 flex flex-col justify-between shadow-xs select-none shrink-0 transition-all duration-300 relative z-20">
      
      {/* Top Section */}
      <div className="flex flex-col gap-3.5">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-1">
          <CoolTooltip content="ChatFlow Home" side="bottom">
            <Link href="/">
              <BrandLogo size="md" prefix="Chat" suffix="Flow" />
            </Link>
          </CoolTooltip>

          {/* Larger Collapse Toggle Button */}
          <CoolTooltip content="Collapse sidebar" side="bottom" align="end" shortcut="⌘[">
            <button
              onClick={toggleSidebarCollapsed}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 dark:border-border/70 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-muted transition-all cursor-pointer shadow-2xs"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="4" />
                <path d="M9 3v18" />
                <path d="m14 9-3 3 3 3" />
              </svg>
            </button>
          </CoolTooltip>
        </div>

        {/* Action Buttons: New Direct Chat & New Group Chat */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => setNewChatOpen(true)}
            className="h-10.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-[13px] sm:text-sm flex items-center justify-center gap-2 shadow-xs hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-[0.99] transition-all cursor-pointer group"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-white/15 dark:bg-slate-900/15 group-hover:scale-105 transition-transform">
              <MessageSquarePlus className="h-3.5 w-3.5" />
            </div>
            <span>New chat</span>
          </button>

          <button
            onClick={() => setNewGroupOpen(true)}
            className="h-10.5 rounded-xl border border-slate-200/80 dark:border-border/80 bg-white dark:bg-muted/40 hover:bg-slate-50 dark:hover:bg-muted text-slate-800 dark:text-slate-200 font-medium text-[13px] sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs group"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 group-hover:scale-105 transition-transform">
              <Users className="h-3.5 w-3.5" />
            </div>
            <span>New group</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full h-10 rounded-xl bg-white dark:bg-muted/50 border border-slate-200/70 dark:border-border/50 pl-10 pr-10 text-xs sm:text-[13px] text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-400 shadow-2xs"
          />
          {/* Right Command Key Icon */}
          <div className="absolute right-3 flex items-center justify-center text-purple-600/80 dark:text-purple-400/80 pointer-events-none">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-[13px] font-medium transition-colors cursor-pointer shrink-0 ${
              activeFilter === 'all'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-muted'
            }`}
          >
            All ({counts.all})
          </button>

          <button
            onClick={() => setActiveFilter('direct')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-[13px] font-medium transition-colors cursor-pointer shrink-0 ${
              activeFilter === 'direct'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-muted'
            }`}
          >
            Direct ({counts.direct})
          </button>

          <button
            onClick={() => setActiveFilter('groups')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-[13px] font-medium transition-colors cursor-pointer shrink-0 ${
              activeFilter === 'groups'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-muted'
            }`}
          >
            Groups ({counts.groups})
          </button>

          {counts.unread > 0 && (
            <button
              onClick={() => setActiveFilter('unread')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-[13px] font-medium transition-colors cursor-pointer shrink-0 ${
                activeFilter === 'unread'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-purple-600 bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100'
              }`}
            >
              Unread ({counts.unread})
            </button>
          )}
        </div>
      </div>

      {/* Real Conversations List Container with Top & Bottom Shadow Fades */}
      <div className="relative flex-1 min-h-0 flex flex-col my-1">
        {/* Top Fade Vignette */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-[#FAFAFA] dark:from-card to-transparent z-10 rounded-t-xl" />

        {/* Scrollable Feed */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar py-1 pr-1 -mr-1 space-y-1.5">
          {isLoading ? (
            <div className="space-y-2 py-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl animate-pulse">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-muted shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 rounded bg-slate-100 dark:bg-muted" />
                    <div className="h-3 w-1/2 rounded bg-slate-100 dark:bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="py-6 text-center text-xs text-rose-500 space-y-1.5">
              <p>Failed to load conversations</p>
              <button
                onClick={() => refetch()}
                className="text-xs font-semibold text-purple-600 underline"
              >
                Retry
              </button>
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="py-10 px-2 text-center space-y-3">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {filterQuery ? 'No matching chats found' : 'No conversations yet'}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {filterQuery ? 'Try another search query' : 'Start your first direct or group chat'}
                </p>
              </div>
              {!filterQuery && (
                <div className="flex justify-center gap-2 pt-1">
                  <button
                    onClick={() => setNewChatOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-purple-600 text-white text-xs font-medium hover:bg-purple-700 transition-colors shadow-xs"
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
              const subtitle =
                conv.lastMessage?.text ||
                (isGroup
                  ? `${conv.participants?.length || 0} participants`
                  : conv.participant?.phone || 'No messages yet');
              const time = formatConversationTime(
                conv.lastMessage?.createdAt || conv.updatedAt || conv.createdAt
              );

              return (
                <Link
                  key={conv._id}
                  href={`/chat/${conv._id}`}
                  className={`group flex items-center gap-3 p-2.5 rounded-2xl transition-all ${
                    isActive
                      ? 'bg-slate-100 dark:bg-muted text-slate-900 dark:text-white shadow-2xs font-medium'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-muted/40'
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold text-xs shadow-2xs group-hover:scale-105 transition-transform ${
                        isActive
                          ? 'bg-gradient-to-tr from-[#8E7CFF] via-[#725CFF] to-[#6366F1] text-white shadow-xs'
                          : isGroup
                          ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300'
                          : 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                      }`}
                    >
                      {isGroup ? (
                        <Users className="h-4.5 w-4.5" />
                      ) : (
                        title.charAt(0).toUpperCase()
                      )}
                    </div>
                    
                    {/* Online Indicator Badge for Direct Chats */}
                    {!isGroup && (
                      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-card" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-sm font-medium text-slate-900 dark:text-white truncate">
                        {title}
                      </span>
                      <span className="text-xs text-slate-400 shrink-0">{time}</span>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 truncate leading-snug mt-0.5">
                      {subtitle}
                    </p>
                  </div>

                  {/* Unread Counter Badge */}
                  {conv.unreadCount && conv.unreadCount > 0 ? (
                    <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-purple-600 text-white text-[10px] font-bold px-1.5 shrink-0 shadow-xs">
                      {conv.unreadCount}
                    </span>
                  ) : null}
                </Link>
              );
            })
          )}
        </div>

        {/* Bottom Fade Vignette */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-[#FAFAFA] dark:from-card to-transparent z-10 rounded-b-xl" />
      </div>

      {/* User Profile Card (GET /auth/me Modal Trigger) */}
      <div className="pt-1.5">
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white dark:bg-card border border-slate-200/70 dark:border-border/60 shadow-xs">
          <CoolTooltip content="View Account Profile" side="top">
            <button
              onClick={() => setProfileOpen(true)}
              className="flex items-center gap-3 min-w-0 text-left cursor-pointer hover:opacity-85 transition-opacity flex-1"
            >
              {/* Profile Avatar */}
              <div className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#8E7CFF] via-[#A293FF] to-[#D5CCFF] text-white font-semibold text-xs shadow-xs">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : 'ME'}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate leading-tight">
                  {user?.name || 'Account'}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">
                  {user?.phone || 'Connected'}
                </p>
              </div>
            </button>
          </CoolTooltip>

          {/* Action Log Out Button */}
          <CoolTooltip content="Log Out" side="top">
            <button
              onClick={() => setIsLogoutConfirmOpen(true)}
              className="flex h-8.5 w-8.5 items-center justify-center rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer shrink-0 ml-1"
            >
              <LogOut className="h-4.5 w-4.5" />
            </button>
          </CoolTooltip>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <ConfirmModal
        isOpen={isLogoutConfirmOpen}
        onClose={() => setIsLogoutConfirmOpen(false)}
        onConfirm={handleLogout}
        title="Log out of ChatFlow?"
        description="You will be disconnected from the real-time server. You'll need to enter your phone number to log back in."
        confirmText="Log Out"
        variant="danger"
        icon="logout"
      />

    </aside>
  );
}
