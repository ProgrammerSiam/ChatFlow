'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BadgePill from '@/shared/BadgePill';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Circle,
  FileText,
  MessageSquare,
  Users,
  Bot,
  Send,
  CheckCheck,
  Zap,
  Shield,
  Search,
  History,
  Crown,
  Smile,
  Pin,
  Image as ImageIcon,
  PartyPopper,
  X,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { triggerCelebration, triggerMilestoneCelebration } from '@/lib/confetti';

interface DirectMessage {
  id: string;
  sender: 'user' | 'peer';
  text: string;
  time: string;
  status: 'sending' | 'sent' | 'read';
  reactions?: string[];
}

interface GroupMessage {
  id: string;
  senderName: string;
  senderRole?: string;
  avatarBg: string;
  text: string;
  time: string;
  reactions?: string[];
}

interface ExpressiveMessage {
  id: string;
  sender: 'user' | 'peer';
  senderName: string;
  avatarBg: string;
  text?: string;
  gifUrl?: string;
  gifLabel?: string;
  time: string;
  isPinned?: boolean;
  reactions: { emoji: string; count: number }[];
}

export default function LiveDemoSection() {
  const { isAuthenticated } = useAuthStore();

  // ==========================================
  // CARD 1: 1-ON-1 DIRECT REAL-TIME MESSAGING
  // ==========================================
  const [directMessages, setDirectMessages] = useState<DirectMessage[]>([
    {
      id: 'd0',
      sender: 'peer',
      text: 'Hey Siam! Did the new optimistic message queue land on the backend?',
      time: '12:44 PM',
      status: 'read',
      reactions: ['⚡ 2'],
    },
    {
      id: 'd1',
      sender: 'user',
      text: 'Yes! Instant delivery with 0ms UI latency and automatic rollback on network failure.',
      time: '12:45 PM',
      status: 'read',
      reactions: ['🚀 3', '🔥 1'],
    },
    {
      id: 'd2',
      sender: 'peer',
      text: 'Awesome. What about the reverse infinite pagination cursor?',
      time: '12:46 PM',
      status: 'read',
    },
  ]);
  const [directInput, setDirectInput] = useState('');
  const [isDirectTyping, setIsDirectTyping] = useState(false);
  const [cursorLoaded, setCursorLoaded] = useState(false);

  const handleDirectSend = (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const text = customText || directInput.trim();
    if (!text) return;

    triggerCelebration();
    const tempId = `d-${Date.now()}`;
    const newMsg: DirectMessage = {
      id: tempId,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sending',
    };

    setDirectMessages((prev) => [...prev, newMsg]);
    if (!customText) setDirectInput('');

    setTimeout(() => {
      setDirectMessages((prev) =>
        prev.map((m) => (m.id === tempId ? { ...m, status: 'read' } : m))
      );
    }, 120);

    setIsDirectTyping(true);
    setTimeout(() => {
      setIsDirectTyping(false);
      const peerMsg: DirectMessage = {
        id: `peer-${Date.now()}`,
        sender: 'peer',
        text: '⚡ Instant WebSocket broadcast confirmed! Message state synced to cache.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read',
        reactions: ['👍 2'],
      };
      setDirectMessages((prev) => [...prev, peerMsg]);
    }, 600);
  };

  const handleAddOlderMessages = () => {
    if (cursorLoaded) return;
    triggerCelebration();
    setCursorLoaded(true);
    const older: DirectMessage = {
      id: 'd-old-1',
      sender: 'peer',
      text: 'Hey Siam! Catching up on the new feature designs before our team sync.',
      time: '12:30 PM',
      status: 'read',
    };
    setDirectMessages((prev) => [older, ...prev]);
  };

  // ==========================================
  // CARD 2: GROUP WORKSPACES & RBAC GOVERNANCE
  // ==========================================
  const [groupMessages, setGroupMessages] = useState<GroupMessage[]>([
    {
      id: 'g1',
      senderName: 'Sarah Jenkins',
      senderRole: 'Lead',
      avatarBg: 'bg-purple-600 text-white',
      text: 'Team, v1.0 real-time deployment is officially live! Great work everyone 🎉',
      time: '12:40 PM',
      reactions: ['🎉 5', '❤️ 4'],
    },
    {
      id: 'g2',
      senderName: 'Emerson Sterling',
      avatarBg: 'bg-indigo-600 text-white',
      text: 'Socket handshake verified across all active client nodes. Latency is rock solid under 20ms.',
      time: '12:42 PM',
      reactions: ['⚡ 3'],
    },
  ]);
  const [groupInput, setGroupInput] = useState('');
  const [isGroupTyping, setIsGroupTyping] = useState(false);

  const handleGroupSend = (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const text = customText || groupInput.trim();
    if (!text) return;

    if (
      text.toLowerCase().includes('celebrate') ||
      text.toLowerCase().includes('launch') ||
      text.toLowerCase().includes('confetti')
    ) {
      triggerMilestoneCelebration();
    } else {
      triggerCelebration();
    }

    const newMsg: GroupMessage = {
      id: `g-${Date.now()}`,
      senderName: 'Siam (You)',
      senderRole: 'Admin',
      avatarBg: 'bg-emerald-600 text-white',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setGroupMessages((prev) => [...prev, newMsg]);
    if (!customText) setGroupInput('');
    setIsGroupTyping(true);

    setTimeout(() => {
      setIsGroupTyping(false);
      const peerMsg: GroupMessage = {
        id: `g-reply-${Date.now()}`,
        senderName: 'Alex Rivers',
        avatarBg: 'bg-amber-600 text-white',
        text: '🚀 Group broadcast received across all connected channel participants!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reactions: ['🙌 3'],
      };
      setGroupMessages((prev) => [...prev, peerMsg]);
    }, 650);
  };

  // ==========================================
  // CARD 3: RICH EXPRESSIVE CHAT (GIFS, EMOJIS, PINNED)
  // ==========================================
  const [isPinnedVisible, setIsPinnedVisible] = useState(true);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [expressiveInput, setExpressiveInput] = useState('');
  const [expressiveMessages, setExpressiveMessages] = useState<ExpressiveMessage[]>([
    {
      id: 'e1',
      sender: 'peer',
      senderName: 'Sarah Jenkins',
      avatarBg: 'bg-purple-600 text-white',
      text: '🚀 Release Candidate v1.0 passes TanStack Query benchmarks. Check the pinned guide below!',
      time: '12:50 PM',
      isPinned: true,
      reactions: [
        { emoji: '🔥', count: 8 },
        { emoji: '🚀', count: 6 },
        { emoji: '❤️', count: 4 },
      ],
    },
    {
      id: 'e2',
      sender: 'user',
      senderName: 'Siam (You)',
      avatarBg: 'bg-emerald-600 text-white',
      text: 'Super excited! Sending celebratory GIF for the entire team 🥳',
      gifUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80',
      gifLabel: '🎉 Launch Celebration GIF',
      time: '12:52 PM',
      reactions: [
        { emoji: '🎉', count: 12 },
        { emoji: '💯', count: 7 },
      ],
    },
  ]);

  const handleToggleReaction = (msgId: string, emoji: string) => {
    triggerCelebration();
    setExpressiveMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== msgId) return msg;
        const exists = msg.reactions.find((r) => r.emoji === emoji);
        if (exists) {
          return {
            ...msg,
            reactions: msg.reactions.map((r) =>
              r.emoji === emoji ? { ...r, count: r.count + 1 } : r
            ),
          };
        } else {
          return {
            ...msg,
            reactions: [...msg.reactions, { emoji, count: 1 }],
          };
        }
      })
    );
  };

  const handleSendGif = (label: string, imgUrl: string) => {
    triggerMilestoneCelebration();
    setShowGifPicker(false);
    const newMsg: ExpressiveMessage = {
      id: `e-${Date.now()}`,
      sender: 'user',
      senderName: 'Siam (You)',
      avatarBg: 'bg-emerald-600 text-white',
      gifUrl: imgUrl,
      gifLabel: label,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: [{ emoji: '🔥', count: 1 }],
    };
    setExpressiveMessages((prev) => [...prev, newMsg]);
  };

  const handleExpressiveSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = expressiveInput.trim();
    if (!text) return;
    triggerCelebration();
    const newMsg: ExpressiveMessage = {
      id: `e-${Date.now()}`,
      sender: 'user',
      senderName: 'Siam (You)',
      avatarBg: 'bg-emerald-600 text-white',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: [{ emoji: '❤️', count: 1 }],
    };
    setExpressiveMessages((prev) => [...prev, newMsg]);
    setExpressiveInput('');
  };

  return (
    <section id="demo" className="relative py-20 md:py-28 bg-[#FAFAFA] dark:bg-background overflow-hidden">
      {/* Ambient background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[800px] w-full max-w-7xl bg-gradient-to-r from-purple-200/40 via-indigo-100/30 to-purple-200/40 dark:from-purple-950/20 dark:via-indigo-950/15 dark:to-purple-950/20 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl space-y-12 sm:space-y-16 lg:space-y-20">
        {/* ========================================================== */}
        {/* CARD 1: 1-ON-1 DIRECT REAL-TIME MESSAGING */}
        {/* ========================================================== */}
        <div className="relative rounded-[32px] border border-slate-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 shadow-[0_25px_70px_-15px_rgba(114,92,255,0.12)] dark:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl p-5 sm:p-7 lg:p-8 overflow-hidden">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-purple-500/10 dark:bg-purple-600/10 blur-[90px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content (Reduced, punchy, compact) */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-start text-left space-y-5">
              <BadgePill label="Direct Messaging" />

              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-1.5px] text-slate-900 dark:text-white leading-[1.2]">
                Direct chats with <br />
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-xl bg-gradient-to-r from-[#8E7CFF] to-[#725CFF] text-white shadow-xs align-middle leading-tight">
                  zero latency
                </span>
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                Fast 1-on-1 private messaging with instant <br className="hidden sm:inline" />
                message delivery and live read receipts.
              </p>

              {/* Compact Feature Bullets */}
              <div className="space-y-3.5 pt-1 w-full">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-purple-50 dark:bg-purple-950/60 text-[#725CFF] dark:text-purple-400 border border-purple-200 dark:border-purple-800/60 shadow-xs">
                    <Zap className="size-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block text-xs sm:text-sm">Instant Send</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">0ms optimistic dispatch</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-purple-50 dark:bg-purple-950/60 text-[#725CFF] dark:text-purple-400 border border-purple-200 dark:border-purple-800/60 shadow-xs">
                    <Search className="size-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block text-xs sm:text-sm">User Discovery</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Debounced member search</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-purple-50 dark:bg-purple-950/60 text-[#725CFF] dark:text-purple-400 border border-purple-200 dark:border-purple-800/60 shadow-xs">
                    <CheckCheck className="size-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block text-xs sm:text-sm">Read Receipts</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Real-time seen indicators</span>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <Link
                  href={isAuthenticated ? '/chat' : '/login'}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 group transition-all"
                >
                  <span>Start Direct Chat</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Live Preview Window (Taller & more spacious) */}
            <div className="lg:col-span-7 xl:col-span-8 w-full">
              <div className="relative p-2 sm:p-3 rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-purple-500/15 via-indigo-500/8 to-purple-500/15 border border-purple-500/25 shadow-[0_15px_40px_-10px_rgba(114,92,255,0.2)]">
                <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-zinc-800 bg-slate-950 text-slate-100 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] overflow-hidden font-sans">
                  {/* Top Window Bar */}
                  <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2.5 rounded-full bg-[#FF5F56]" />
                      <span className="size-2.5 rounded-full bg-[#FFBD2E]" />
                      <span className="size-2.5 rounded-full bg-[#27C93F]" />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-800 text-white text-[11px] font-medium">
                      <MessageSquare className="size-3 text-purple-400" />
                      <span>direct-chat.tsx</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                      <span className="size-2 rounded-full bg-emerald-500" />
                      <span>Encrypted Chat</span>
                    </div>
                  </div>

                  {/* Expanded Height Direct Conversation Stream */}
                  <div className="p-5 sm:p-7 bg-zinc-950 flex flex-col justify-between min-h-[500px] sm:min-h-[530px] space-y-4">
                    {/* Chat Header */}
                    <div className="flex items-center justify-between pb-3.5 border-b border-zinc-800/80">
                      <div className="flex items-center gap-3">
                        <div className="relative size-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                          ES
                          <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-white">Emerson Sterling</h4>
                            <span className="text-[10px] px-2 py-0.2 rounded-full bg-purple-950/60 border border-purple-800/50 text-purple-300 font-mono">
                              +1 (555) 019-2834
                            </span>
                          </div>
                          <p className="text-[10px] text-emerald-400">Online • Active now</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleAddOlderMessages}
                          disabled={cursorLoaded}
                          className="flex items-center gap-1.5 text-[11px] text-purple-300 hover:text-purple-200 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg disabled:opacity-50 transition-colors cursor-pointer"
                        >
                          <History className="size-3.5" />
                          <span>{cursorLoaded ? 'History Loaded' : 'Load History'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Expanded Message Bubbles Feed */}
                    <div className="space-y-3.5 overflow-y-auto max-h-[340px] pr-1 no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {directMessages.map((m) => (
                        <div
                          key={m.id}
                          className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                        >
                          <div
                            className={`rounded-2xl px-4 py-2.5 max-w-[80%] text-xs leading-relaxed ${
                              m.sender === 'user'
                                ? 'bg-purple-600 text-white rounded-tr-xs shadow-sm'
                                : 'bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-tl-xs'
                            }`}
                          >
                            <p className="text-[12px]">{m.text}</p>
                            <div
                              className={`mt-1 flex items-center justify-end gap-1.5 text-[9px] ${
                                m.sender === 'user' ? 'text-purple-200' : 'text-zinc-500'
                              }`}
                            >
                              <span>{m.time}</span>
                              {m.sender === 'user' && (
                                <CheckCheck className="size-3 text-purple-200" />
                              )}
                            </div>
                          </div>

                          {/* Reactions */}
                          {m.reactions && (
                            <div className="flex items-center gap-1 mt-1">
                              {m.reactions.map((r, idx) => (
                                <span
                                  key={idx}
                                  className="text-[9px] px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300"
                                >
                                  {r}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}

                      {isDirectTyping && (
                        <div className="flex items-center gap-1.5 bg-zinc-900 text-zinc-400 border border-zinc-800 px-3 py-1.5 rounded-full w-fit text-[11px]">
                          <span className="size-1.5 rounded-full bg-purple-500 animate-bounce" />
                          <span className="size-1.5 rounded-full bg-purple-500 animate-bounce [animation-delay:150ms]" />
                          <span className="size-1.5 rounded-full bg-purple-500 animate-bounce [animation-delay:300ms]" />
                          <span className="ml-1 text-[10px]">Emerson is typing...</span>
                        </div>
                      )}
                    </div>

                    {/* Suggestion Chips */}
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
                      <button
                        type="button"
                        onClick={() => handleDirectSend(undefined, '🚀 The new workspace updates look fantastic!')}
                        className="text-[10px] px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 shrink-0 cursor-pointer transition-colors"
                      >
                        🚀 Quick reply
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDirectSend(undefined, '👍 Ready for the design walkthrough.')}
                        className="text-[10px] px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 shrink-0 cursor-pointer transition-colors"
                      >
                        👍 Sounds great
                      </button>
                    </div>

                    {/* Direct Input */}
                    <form onSubmit={(e) => handleDirectSend(e)} className="relative">
                      <input
                        type="text"
                        value={directInput}
                        onChange={(e) => setDirectInput(e.target.value)}
                        placeholder="Type an instant message..."
                        className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 pr-10 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-purple-500"
                      />
                      <button
                        type="submit"
                        disabled={!directInput.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 size-7.5 rounded-lg bg-purple-600 text-white flex items-center justify-center disabled:opacity-30 cursor-pointer"
                      >
                        <Send className="size-3.5" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* CARD 2: GROUP WORKSPACES & RBAC GOVERNANCE (REVERSED) */}
        {/* ========================================================== */}
        <div className="relative rounded-[32px] border border-slate-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 shadow-[0_25px_70px_-15px_rgba(114,92,255,0.12)] dark:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl p-5 sm:p-7 lg:p-8 overflow-hidden">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-emerald-500/10 dark:bg-emerald-600/10 blur-[90px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content (Order-2 on desktop, reduced & compact) */}
            <div className="lg:col-span-5 xl:col-span-4 lg:order-2 flex flex-col items-start text-left space-y-5">
              <BadgePill label="Team Channels" />

              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-1.5px] text-slate-900 dark:text-white leading-[1.2]">
                Team channels with <br />
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-xl bg-gradient-to-r from-[#8E7CFF] to-[#725CFF] text-white shadow-xs align-middle leading-tight">
                  admin controls
                </span>
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                Role-gated channels with real-time <br className="hidden sm:inline" />
                broadcasts and milestone celebrations.
              </p>

              {/* Compact Feature Bullets */}
              <div className="space-y-3.5 pt-1 w-full">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-purple-50 dark:bg-purple-950/60 text-[#725CFF] dark:text-purple-400 border border-purple-200 dark:border-purple-800/60 shadow-xs">
                    <Users className="size-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block text-xs sm:text-sm">Team Channels</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Multi-member broadcasts</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-purple-50 dark:bg-purple-950/60 text-[#725CFF] dark:text-purple-400 border border-purple-200 dark:border-purple-800/60 shadow-xs">
                    <Shield className="size-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block text-xs sm:text-sm">Admin Controls</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Role-gated governance</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-purple-50 dark:bg-purple-950/60 text-[#725CFF] dark:text-purple-400 border border-purple-200 dark:border-purple-800/60 shadow-xs">
                    <PartyPopper className="size-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block text-xs sm:text-sm">Milestones</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Team launch celebrations</span>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <Link
                  href={isAuthenticated ? '/chat' : '/login'}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 group transition-all"
                >
                  <span>Explore Group Channels</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Live Preview Window (Order-1 on desktop, expanded height) */}
            <div className="lg:col-span-7 xl:col-span-8 lg:order-1 w-full">
              <div className="relative p-2 sm:p-3 rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-emerald-500/15 via-teal-500/8 to-emerald-500/15 border border-emerald-500/25 shadow-[0_15px_40px_-10px_rgba(16,185,129,0.2)]">
                <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-zinc-800 bg-slate-950 text-slate-100 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] overflow-hidden font-sans">
                  {/* Top Window Bar */}
                  <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2.5 rounded-full bg-[#FF5F56]" />
                      <span className="size-2.5 rounded-full bg-[#FFBD2E]" />
                      <span className="size-2.5 rounded-full bg-[#27C93F]" />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-800 text-white text-[11px] font-medium">
                      <Users className="size-3 text-purple-400" />
                      <span>group-workspace.tsx</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                      <span className="size-2 rounded-full bg-purple-500" />
                      <span>4 Active Members</span>
                    </div>
                  </div>

                  {/* Expanded Height Group Channel Stream */}
                  <div className="p-5 sm:p-7 bg-zinc-950 flex flex-col justify-between min-h-[500px] sm:min-h-[530px] space-y-4">
                    {/* Group Header */}
                    <div className="flex items-center justify-between pb-3.5 border-b border-zinc-800/80">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                          <Users className="size-4.5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-white">#engineering-general</h4>
                            <Crown className="size-3.5 text-amber-400" />
                          </div>
                          <p className="text-[10px] text-zinc-400">4 active members • Role-gated broadcast</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => triggerMilestoneCelebration()}
                        className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-[11px] font-semibold transition-all shadow-sm cursor-pointer"
                      >
                        🎉 Launch Milestone
                      </button>
                    </div>

                    {/* Group Feed */}
                    <div className="space-y-3.5 overflow-y-auto max-h-[340px] pr-1 no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {groupMessages.map((m) => (
                        <div key={m.id} className="flex items-start gap-3">
                          <div
                            className={`size-7.5 shrink-0 rounded-xl font-bold flex items-center justify-center text-[10px] shadow-xs ${m.avatarBg}`}
                          >
                            {m.senderName.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="flex flex-col gap-1 max-w-[85%]">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-semibold text-zinc-200">{m.senderName}</span>
                              {m.senderRole && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-purple-950/60 border border-purple-800/50 text-purple-300 font-mono">
                                  {m.senderRole}
                                </span>
                              )}
                              <span className="text-[9px] text-zinc-500">{m.time}</span>
                            </div>
                            <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl rounded-tl-xs px-4 py-2.5 text-zinc-300 text-xs leading-relaxed">
                              {m.text}
                            </div>

                            {/* Reactions */}
                            {m.reactions && (
                              <div className="flex items-center gap-1 mt-1">
                                {m.reactions.map((r, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[9px] px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300"
                                  >
                                    {r}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {isGroupTyping && (
                        <div className="flex items-center gap-1.5 bg-zinc-900 text-zinc-400 border border-zinc-800 px-3 py-1.5 rounded-full w-fit text-[11px]">
                          <span className="size-1.5 rounded-full bg-purple-500 animate-bounce" />
                          <span className="size-1.5 rounded-full bg-purple-500 animate-bounce [animation-delay:150ms]" />
                          <span className="size-1.5 rounded-full bg-purple-500 animate-bounce [animation-delay:300ms]" />
                          <span className="ml-1 text-[10px]">Alex is typing...</span>
                        </div>
                      )}
                    </div>

                    {/* Suggestion Chips */}
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
                      <button
                        type="button"
                        onClick={() => handleGroupSend(undefined, '🚀 Staging deployment is running smoothly!')}
                        className="text-[10px] px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 shrink-0 cursor-pointer transition-colors"
                      >
                        🚀 Announce update
                      </button>
                      <button
                        type="button"
                        onClick={() => handleGroupSend(undefined, '🙌 Kudos everyone on a flawless release!')}
                        className="text-[10px] px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 shrink-0 cursor-pointer transition-colors"
                      >
                        🙌 Celebrate team
                      </button>
                    </div>

                    {/* Group Message Input */}
                    <form onSubmit={(e) => handleGroupSend(e)} className="relative">
                      <input
                        type="text"
                        value={groupInput}
                        onChange={(e) => setGroupInput(e.target.value)}
                        placeholder="Broadcast to #engineering-general..."
                        className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 pr-10 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-purple-500"
                      />
                      <button
                        type="submit"
                        disabled={!groupInput.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 size-7.5 rounded-lg bg-purple-600 text-white flex items-center justify-center disabled:opacity-30 cursor-pointer"
                      >
                        <Send className="size-3.5" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* CARD 3: RICH EXPRESSIVE CHAT (GIFS, EMOJIS, PINNED) */}
        {/* ========================================================== */}
        <div className="relative rounded-[32px] border border-slate-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 shadow-[0_25px_70px_-15px_rgba(114,92,255,0.12)] dark:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl p-5 sm:p-7 lg:p-8 overflow-hidden">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-purple-500/10 dark:bg-purple-600/10 blur-[90px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content (Reduced & compact) */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-start text-left space-y-5">
              <BadgePill label="Expressive Chat" />

              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-1.5px] text-slate-900 dark:text-white leading-[1.2]">
                Express ideas with <br />
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-xl bg-gradient-to-r from-[#8E7CFF] to-[#725CFF] text-white shadow-xs align-middle leading-tight">
                  GIFs & emojis
                </span>
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                Bring discussions to life with Tenor <br className="hidden sm:inline" />
                GIFs, emoji reactions, and pinned posts.
              </p>

              {/* Compact Feature Bullets */}
              <div className="space-y-3.5 pt-1 w-full">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-purple-50 dark:bg-purple-950/60 text-[#725CFF] dark:text-purple-400 border border-purple-200 dark:border-purple-800/60 shadow-xs">
                    <ImageIcon className="size-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block text-xs sm:text-sm">Tenor GIFs</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">High-FPS animated reactions</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-purple-50 dark:bg-purple-950/60 text-[#725CFF] dark:text-purple-400 border border-purple-200 dark:border-purple-800/60 shadow-xs">
                    <Smile className="size-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block text-xs sm:text-sm">Emoji Reactions</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">1-tap inline counters</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-purple-50 dark:bg-purple-950/60 text-[#725CFF] dark:text-purple-400 border border-purple-200 dark:border-purple-800/60 shadow-xs">
                    <Pin className="size-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block text-xs sm:text-sm">Pinned Posts</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Key channel announcements</span>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <Link
                  href={isAuthenticated ? '/chat' : '/login'}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 group transition-all"
                >
                  <span>Try Expressive Chat</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Live Preview Window (Taller & more spacious) */}
            <div className="lg:col-span-7 xl:col-span-8 w-full">
              <div className="relative p-2 sm:p-3 rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-purple-500/15 via-pink-500/8 to-purple-500/15 border border-purple-500/25 shadow-[0_15px_40px_-10px_rgba(168,85,247,0.2)]">
                <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-zinc-800 bg-slate-950 text-slate-100 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] overflow-hidden font-sans">
                  {/* Top Window Bar */}
                  <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2.5 rounded-full bg-[#FF5F56]" />
                      <span className="size-2.5 rounded-full bg-[#FFBD2E]" />
                      <span className="size-2.5 rounded-full bg-[#27C93F]" />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-800 text-white text-[11px] font-medium">
                      <PartyPopper className="size-3 text-purple-400" />
                      <span>expressive-chat.tsx</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                      <span className="size-2 rounded-full bg-pink-500" />
                      <span>Rich Reactions</span>
                    </div>
                  </div>

                  {/* Pinned Announcement Header */}
                  {isPinnedVisible && (
                    <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-purple-950/80 via-indigo-950/60 to-purple-950/80 border-b border-purple-800/40 text-[11px]">
                      <div className="flex items-center gap-2 text-purple-200">
                        <Pin className="size-3 text-purple-400 shrink-0 fill-purple-400" />
                        <span className="font-medium truncate">
                          <strong className="text-white">Pinned:</strong> Product roadmap & v1.0 release specifications
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsPinnedVisible(false)}
                        className="text-purple-400 hover:text-white p-0.5 cursor-pointer"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  )}

                  {/* Expanded Height Expressive Chat Feed */}
                  <div className="p-5 sm:p-7 bg-zinc-950 flex flex-col justify-between min-h-[500px] sm:min-h-[530px] space-y-4">
                    {/* Message stream */}
                    <div className="space-y-3.5 overflow-y-auto max-h-[340px] pr-1 no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {expressiveMessages.map((m) => (
                        <div key={m.id} className="flex items-start gap-3">
                          <div
                            className={`size-7.5 shrink-0 rounded-xl font-bold flex items-center justify-center text-[10px] shadow-xs ${m.avatarBg}`}
                          >
                            {m.senderName.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="flex flex-col gap-1.5 max-w-[85%]">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-semibold text-zinc-200">{m.senderName}</span>
                              {m.isPinned && (
                                <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.2 rounded-md bg-purple-950/60 border border-purple-800/50 text-purple-300 font-mono">
                                  <Pin className="size-2.5 fill-purple-300" /> Pinned
                                </span>
                              )}
                              <span className="text-[9px] text-zinc-500">{m.time}</span>
                            </div>

                            {/* Text content if any */}
                            {m.text && (
                              <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl rounded-tl-xs px-4 py-2.5 text-zinc-200 text-xs leading-relaxed">
                                {m.text}
                              </div>
                            )}

                            {/* Animated GIF Card if present */}
                            {m.gifUrl && (
                              <div className="rounded-2xl overflow-hidden border border-purple-500/30 bg-zinc-900 relative shadow-md group">
                                <div className="h-36 w-full bg-gradient-to-tr from-purple-900/60 via-indigo-900/50 to-pink-900/60 flex flex-col items-center justify-center p-3 relative overflow-hidden">
                                  <div className="absolute inset-0 bg-radial from-purple-500/20 to-transparent pointer-events-none animate-pulse" />
                                  <span className="text-3xl mb-1">🚀🎉✨</span>
                                  <span className="text-xs font-bold text-white tracking-wide drop-shadow-sm">
                                    {m.gifLabel}
                                  </span>
                                  <span className="text-[9px] text-purple-300 font-mono mt-0.5">
                                    Tenor Animated GIF • 60 FPS
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* Interactive Reaction Pills */}
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {m.reactions.map((r, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => handleToggleReaction(m.id, r.emoji)}
                                  className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 transition-transform active:scale-95 cursor-pointer"
                                >
                                  <span>{r.emoji}</span>
                                  <span className="font-mono text-purple-300 text-[9px] font-semibold">{r.count}</span>
                                </button>
                              ))}

                              {/* Quick Add Reaction Buttons */}
                              <button
                                type="button"
                                onClick={() => handleToggleReaction(m.id, '❤️')}
                                className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800/60 cursor-pointer"
                              >
                                + ❤️
                              </button>
                              <button
                                type="button"
                                onClick={() => handleToggleReaction(m.id, '🚀')}
                                className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800/60 cursor-pointer"
                              >
                                + 🚀
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Popover GIF Selector Bar */}
                    {showGifPicker && (
                      <div className="p-3 rounded-2xl bg-zinc-900 border border-purple-500/40 shadow-xl space-y-2 animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-300">
                          <span className="flex items-center gap-1.5">
                            <ImageIcon className="size-3.5 text-purple-400" />
                            <span>Select Tenor GIF</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => setShowGifPicker(false)}
                            className="text-zinc-400 hover:text-white cursor-pointer"
                          >
                            <X className="size-3" />
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5">
                          {[
                            { label: '🚀 Space Rocket Launch', url: '' },
                            { label: '🎉 Team Celebration', url: '' },
                            { label: '🔥 Code Shipped Live', url: '' },
                          ].map((gif, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleSendGif(gif.label, gif.url)}
                              className="p-2.5 rounded-xl bg-zinc-950 hover:bg-purple-950/60 border border-zinc-800 hover:border-purple-600/50 text-[10px] text-zinc-200 font-medium transition-all text-center cursor-pointer"
                            >
                              {gif.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Suggestion Chips */}
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
                      <button
                        type="button"
                        onClick={() => setShowGifPicker(!showGifPicker)}
                        className="text-[10px] px-3 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium shrink-0 flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <ImageIcon className="size-3" />
                        <span>Add GIF</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          triggerCelebration();
                          setIsPinnedVisible(true);
                        }}
                        className="text-[10px] px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 shrink-0 flex items-center gap-1 cursor-pointer"
                      >
                        <Pin className="size-3 text-purple-400" />
                        <span>Toggle Pin Banner</span>
                      </button>
                    </div>

                    {/* Message Input with Emoji & GIF Triggers */}
                    <form onSubmit={handleExpressiveSend} className="relative">
                      <input
                        type="text"
                        value={expressiveInput}
                        onChange={(e) => setExpressiveInput(e.target.value)}
                        placeholder="Type a message or react with emojis..."
                        className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 pr-20 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-purple-500"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setShowGifPicker(!showGifPicker)}
                          className="size-7.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-purple-300 flex items-center justify-center text-[10px] font-bold cursor-pointer"
                        >
                          GIF
                        </button>
                        <button
                          type="submit"
                          disabled={!expressiveInput.trim()}
                          className="size-7.5 rounded-lg bg-purple-600 text-white flex items-center justify-center disabled:opacity-30 cursor-pointer"
                        >
                          <Send className="size-3.5" />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
