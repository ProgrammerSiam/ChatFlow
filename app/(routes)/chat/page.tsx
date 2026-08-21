'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MessageSquarePlus,
  Users,
  User as UserIcon,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sun,
  Moon,
  Sunset,
  Sunrise,
  Clock,
  Sparkles,
  Search,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatUIStore } from '@/store/useChatUIStore';
import { useConversations } from '@/hooks/useConversations';
import CoolTooltip from '@/shared/CoolTooltip';

export default function ChatIndexPage() {
  const { user } = useAuthStore();
  const { setNewChatOpen, setNewGroupOpen, setProfileOpen, isSocketConnected } = useChatUIStore();
  const { conversations, isLoading } = useConversations();

  // Dynamic Time-of-Day Greeting
  const [greeting, setGreeting] = useState<{ text: string; icon: typeof Sun; timeStr: string }>({
    text: 'Good day',
    icon: Sun,
    timeStr: '',
  });

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      const hour = now.getHours();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (hour >= 5 && hour < 12) {
        setGreeting({ text: 'Good morning', icon: Sunrise, timeStr });
      } else if (hour >= 12 && hour < 17) {
        setGreeting({ text: 'Good afternoon', icon: Sun, timeStr });
      } else if (hour >= 17 && hour < 21) {
        setGreeting({ text: 'Good evening', icon: Sunset, timeStr });
      } else {
        setGreeting({ text: 'Good night', icon: Moon, timeStr });
      }
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 10000);
    return () => clearInterval(interval);
  }, []);

  // Fallback user resolution
  let activeUser = user;
  if (!activeUser && typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('chatflow_user');
      if (stored) activeUser = JSON.parse(stored);
    } catch {
      // ignore
    }
  }

  const displayName = activeUser?.name ? activeUser.name.split(' ')[0] : 'Teammate';
  const fullName = activeUser?.name || 'User Profile';
  const phone = activeUser?.phone || '';
  const initial = displayName.charAt(0).toUpperCase();

  const GreetingIcon = greeting.icon;

  const recentConversations = (conversations || []).slice(0, 3);

  return (
    <div className="flex-1 h-full rounded-[24px] bg-white dark:bg-card border border-slate-200/80 dark:border-border/70 shadow-xs flex flex-col justify-between overflow-hidden relative select-none">
      
      {/* Top Header Bar */}
      <header className="h-14 px-5 border-b border-slate-100 dark:border-border/50 flex items-center justify-between shrink-0 bg-white/80 dark:bg-card/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-900 dark:text-white">Workspace</span>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2.5">
          <div
            onClick={() => setNewChatOpen(true)}
            className="relative flex items-center w-52 sm:w-64 md:w-72 cursor-pointer group"
          >
            <Search className="absolute left-3.5 h-4 w-4 text-slate-400 group-hover:text-purple-600 transition-colors pointer-events-none" />
            <input
              type="text"
              readOnly
              onClick={() => setNewChatOpen(true)}
              placeholder="Search teammates..."
              className="w-full h-9.5 rounded-2xl border border-slate-200/90 dark:border-border/80 bg-slate-50/80 hover:bg-white dark:bg-muted/40 dark:hover:bg-muted/70 pl-9.5 pr-11 text-xs sm:text-[13px] text-slate-900 dark:text-white placeholder:text-slate-400 group-hover:border-purple-300 dark:group-hover:border-purple-700/60 group-hover:shadow-xs cursor-pointer transition-all focus:outline-none"
            />
            <div className="absolute right-2.5 flex items-center gap-0.5 pointer-events-none">
              <span className="flex items-center justify-center h-5 px-1.5 rounded-md bg-white dark:bg-card border border-slate-200/80 dark:border-border text-[10px] font-semibold text-slate-400 dark:text-slate-400 shadow-2xs">
                ⌘K
              </span>
            </div>
          </div>

          <CoolTooltip content="Start a new direct chat" side="bottom">
            <button
              onClick={() => setNewChatOpen(true)}
              className="h-10 px-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs sm:text-[13px] font-semibold shadow-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-all cursor-pointer flex items-center gap-2 shrink-0"
            >
              <MessageSquarePlus className="h-4 w-4" />
              <span>New Chat</span>
            </button>
          </CoolTooltip>
        </div>
      </header>

      {/* Main Center Content View */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar px-4 py-8 sm:py-12 flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-2xl space-y-7 flex flex-col items-center">
          
          {/* Hero Avatar & Dynamic Status Card */}
          <div className="flex flex-col items-center space-y-3.5">
            <div className="relative group cursor-pointer" onClick={() => setProfileOpen(true)}>
              <div className="relative flex h-20 w-20 sm:h-22 sm:w-22 items-center justify-center rounded-full bg-gradient-to-tr from-[#8E7CFF] via-[#A293FF] to-[#D5CCFF] text-white font-extrabold text-3xl sm:text-4xl shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
                {initial}
              </div>
              <span
                className={`absolute bottom-0.5 right-0.5 h-5 w-5 rounded-full border-3 border-white dark:border-card ${
                  isSocketConnected ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                title={isSocketConnected ? 'Socket Connected' : 'Connecting'}
              />
            </div>

            {/* Dynamic Greeting & User Name */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-semibold">
                <GreetingIcon className="h-3.5 w-3.5" />
                <span>{greeting.text}, {displayName}!</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white pt-1">
                Your Real-Time Workspace
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Connect instantly with zero latency. Select a conversation from the sidebar or start a new direct or group workspace below.
              </p>
            </div>
          </div>

          {/* Meaningful Quick Action Cards */}
          <div className="grid gap-3.5 grid-cols-1 sm:grid-cols-3 w-full text-left pt-1">
            {/* Action 1: Direct Chat */}
            <div
              onClick={() => setNewChatOpen(true)}
              className="p-4 rounded-2xl bg-white dark:bg-card border border-slate-200/70 dark:border-border/60 hover:border-purple-300 dark:hover:border-purple-800 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 group-hover:scale-110 transition-transform mb-3">
                <MessageSquarePlus className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-purple-600 transition-colors">
                Direct Message
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Search teammates by phone or name to start an instant 1-on-1 private chat.
              </p>
            </div>

            {/* Action 2: Group Workspace */}
            <div
              onClick={() => setNewGroupOpen(true)}
              className="p-4 rounded-2xl bg-white dark:bg-card border border-slate-200/70 dark:border-border/60 hover:border-purple-300 dark:hover:border-purple-800 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 group-hover:scale-110 transition-transform mb-3">
                <Users className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-purple-600 transition-colors">
                Team Channel
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Create a group channel with member invitations and co-admin governance.
              </p>
            </div>

            {/* Action 3: User Profile */}
            <div
              onClick={() => setProfileOpen(true)}
              className="p-4 rounded-2xl bg-white dark:bg-card border border-slate-200/70 dark:border-border/60 hover:border-purple-300 dark:hover:border-purple-800 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-muted text-slate-700 dark:text-slate-300 group-hover:scale-110 transition-transform mb-3">
                <UserIcon className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-purple-600 transition-colors">
                Account & Settings
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                View your verified phone credentials, user ID, and active socket health.
              </p>
            </div>
          </div>

          {/* Quick Jump to Recent Conversations (if available) */}
          {recentConversations.length > 0 && (
            <div className="w-full space-y-2.5 pt-2 text-left">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Recent Conversations
                </span>
                <span className="text-xs text-slate-400">
                  {(conversations || []).length} total
                </span>
              </div>

              <div className="grid gap-2 grid-cols-1 sm:grid-cols-3">
                {recentConversations.map((conv) => {
                  const isGroup = conv.type === 'group';
                  const title = isGroup ? conv.name || 'Group' : conv.participant?.name || 'User';
                  const lastText = conv.lastMessage?.text || 'No messages yet';

                  return (
                    <Link
                      key={conv._id}
                      href={`/chat/${conv._id}`}
                      className="p-3 rounded-2xl bg-slate-50/70 dark:bg-muted/30 border border-slate-200/60 dark:border-border/50 hover:bg-purple-50/50 hover:border-purple-200 transition-all flex items-center justify-between gap-2 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-xl font-bold text-xs ${
                            isGroup
                              ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300'
                              : 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                          }`}
                        >
                          {isGroup ? <Users className="h-4 w-4" /> : title.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                            {title}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">
                            {lastText}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
