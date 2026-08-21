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
import BadgePill from '@/shared/BadgePill';

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
              className="w-full h-9.5 rounded-2xl border border-slate-200/90 dark:border-border/80 bg-slate-50/80 hover:bg-white dark:bg-muted/40 dark:hover:bg-muted/70 pl-9.5 pr-14 text-xs sm:text-[13px] text-slate-900 dark:text-white placeholder:text-slate-400 group-hover:border-purple-300 dark:group-hover:border-purple-700/60 group-hover:shadow-xs cursor-pointer transition-all focus:outline-none"
            />
            <div className="absolute right-2.5 flex items-center pointer-events-none">
              <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-white dark:bg-card border border-slate-200/90 dark:border-border text-slate-500 dark:text-slate-400 shadow-2xs">
                <span className="text-[11px] leading-none font-sans">⌘</span>
                <span className="text-[10px] font-bold font-mono leading-none">K</span>
              </kbd>
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
      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-4xl xl:max-w-5xl space-y-7 flex flex-col items-center">
          
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

            {/* Main Pillar Badge with Dynamic Time Greeting & User Name */}
            <div className="space-y-3 flex flex-col items-center">
              <BadgePill label={`${greeting.text}, ${displayName}!`} className="shadow-2xs" />
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white pt-0.5">
                Your Real-Time Workspace
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Connect instantly with zero latency. Select a conversation from the sidebar or start a new direct or group workspace below.
              </p>
            </div>
          </div>

          {/* 3-Column Feature Cards (With Expanded Middle Card Width) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full text-left pt-2">
            {/* Card 1: Direct Message (3 cols) */}
            <div
              onClick={() => setNewChatOpen(true)}
              className="lg:col-span-3 rounded-[24px] bg-white dark:bg-card group/feature relative overflow-hidden p-6 border border-slate-200/60 dark:border-border/60 transition-all duration-300 shadow-xs hover:shadow-md hover:border-purple-200/80 dark:hover:border-purple-800/60 flex flex-col justify-between cursor-pointer min-h-[210px]"
            >
              {/* Glowing Ambient Gradient Orb in Top-Right */}
              <div
                className="absolute -top-12 -right-12 h-44 w-44 rounded-full blur-2xl transition-opacity duration-300 pointer-events-none opacity-25 group-hover/feature:opacity-50"
                style={{
                  background: 'linear-gradient(169deg, #C9C1FF 29.61%, #725CFF 93.52%)',
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center mb-4 sm:mb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-100/90 via-indigo-50/70 to-purple-50/50 dark:from-purple-950/60 dark:to-indigo-950/40 text-purple-600 dark:text-purple-300 border border-slate-200/60 dark:border-border/60 shadow-xs group-hover/feature:scale-110 group-hover/feature:shadow-md transition-all duration-300">
                    <MessageSquarePlus className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-medium tracking-tight text-slate-900 dark:text-white leading-tight">
                  Direct Message
                </h3>
                <p className="mt-2 text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  Search teammates by phone or name to start an instant{' '}
                  <span className="font-medium text-slate-900 dark:text-white underline decoration-purple-400/60 dark:decoration-purple-400/80 decoration-[1.5px] underline-offset-4">
                    1-on-1 private chat
                  </span>{' '}
                  with real-time socket delivery.
                </p>
              </div>
            </div>

            {/* Card 2: Team Channel (Expanded Middle Card: 6 cols) */}
            <div
              onClick={() => setNewGroupOpen(true)}
              className="lg:col-span-6 rounded-[24px] bg-white dark:bg-card group/feature relative overflow-hidden p-6 sm:p-7 border border-slate-200/60 dark:border-border/60 transition-all duration-300 shadow-xs hover:shadow-md hover:border-purple-200/80 dark:hover:border-purple-800/60 flex flex-col justify-between cursor-pointer min-h-[210px]"
            >
              {/* Glowing Ambient Gradient Orb in Top-Right */}
              <div
                className="absolute -top-12 -right-12 h-52 w-52 rounded-full blur-2xl transition-opacity duration-300 pointer-events-none opacity-20 group-hover/feature:opacity-45"
                style={{
                  background: 'linear-gradient(169deg, #B5E0FF 29.61%, #5C8AFF 93.52%)',
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center mb-4 sm:mb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-100/90 via-blue-50/70 to-indigo-50/50 dark:from-indigo-950/60 dark:to-blue-950/40 text-indigo-600 dark:text-indigo-300 border border-slate-200/60 dark:border-border/60 shadow-xs group-hover/feature:scale-110 group-hover/feature:shadow-md transition-all duration-300">
                    <Users className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="text-base sm:text-xl font-medium tracking-tight text-slate-900 dark:text-white leading-tight">
                  Team Channel
                </h3>
                <p className="mt-2 text-xs sm:text-[13px] sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  Create collaborative multi-member group channels with{' '}
                  <span className="font-medium text-slate-900 dark:text-white underline decoration-indigo-400/60 dark:decoration-indigo-400/80 decoration-[1.5px] underline-offset-4">
                    member invitations
                  </span>, role promotions, and{' '}
                  <span className="font-medium text-slate-900 dark:text-white underline decoration-indigo-400/60 dark:decoration-indigo-400/80 decoration-[1.5px] underline-offset-4">
                    co-admin governance
                  </span>.
                </p>
              </div>
            </div>

            {/* Card 3: Account & Settings (3 cols) */}
            <div
              onClick={() => setProfileOpen(true)}
              className="lg:col-span-3 rounded-[24px] bg-white dark:bg-card group/feature relative overflow-hidden p-6 border border-slate-200/60 dark:border-border/60 transition-all duration-300 shadow-xs hover:shadow-md hover:border-purple-200/80 dark:hover:border-purple-800/60 flex flex-col justify-between cursor-pointer min-h-[210px]"
            >
              {/* Glowing Ambient Gradient Orb in Top-Right */}
              <div
                className="absolute -top-12 -right-12 h-44 w-44 rounded-full blur-2xl transition-opacity duration-300 pointer-events-none opacity-25 group-hover/feature:opacity-50"
                style={{
                  background: 'linear-gradient(169deg, #E6C1FF 29.61%, #A85CFF 93.52%)',
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center mb-4 sm:mb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-100/90 via-fuchsia-50/70 to-purple-50/50 dark:from-purple-950/60 dark:to-fuchsia-950/40 text-purple-600 dark:text-purple-300 border border-slate-200/60 dark:border-border/60 shadow-xs group-hover/feature:scale-110 group-hover/feature:shadow-md transition-all duration-300">
                    <UserIcon className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-medium tracking-tight text-slate-900 dark:text-white leading-tight">
                  Account & Settings
                </h3>
                <p className="mt-2 text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  View and manage verified credentials,{' '}
                  <span className="font-medium text-slate-900 dark:text-white underline decoration-purple-400/60 dark:decoration-purple-400/80 decoration-[1.5px] underline-offset-4">
                    unique user ID
                  </span>, and real-time socket health.
                </p>
              </div>
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
