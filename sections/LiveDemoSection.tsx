'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  RotateCcw,
  CheckCheck,
  Sparkles,
  Users,
  Smile,
  Zap,
  Activity,
  ThumbsUp,
  Flame,
  Heart,
  Paperclip,
} from 'lucide-react';
import SectionHeader from '@/shared/SectionHeader';
import { triggerCelebration, triggerMilestoneCelebration } from '@/lib/confetti';

interface DemoMessage {
  id: string;
  sender: 'user' | 'bot' | 'teammate';
  senderName?: string;
  avatarBg?: string;
  text: string;
  time: string;
  reactions?: string[];
}

const INITIAL_DEMO_MESSAGES: DemoMessage[] = [
  {
    id: '1',
    sender: 'bot',
    senderName: 'ChatFlow Assistant',
    avatarBg: 'bg-purple-600 text-white',
    text: '👋 Welcome to the interactive ChatFlow Sandbox! Type any message below or click a quick prompt to experience 0ms optimistic updates, WebSocket broadcast, and real-time reaction flows.',
    time: '12:00 PM',
    reactions: ['⚡ 3', '🚀 5'],
  },
];

const SUGGESTIONS = [
  { label: '🚀 Test 0ms Optimistic Send', prompt: 'Simulate instant optimistic delivery!' },
  { label: '🎉 Celebrate Milestone', prompt: 'Celebrate team launch with confetti!' },
  { label: '⚡ Broadcast WebSocket', prompt: 'Broadcast socket event to all active clients' },
  { label: '👥 Team Collaboration', prompt: 'How does group chat sync work?' },
];

export default function LiveDemoSection() {
  const [messages, setMessages] = useState<DemoMessage[]>(INITIAL_DEMO_MESSAGES);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<'bot' | 'team' | 'ai'>('bot');
  const [latency] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const el = containerRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isBotTyping]);

  const handleSendText = (textToSend: string) => {
    const text = textToSend.trim();
    if (!text) return;

    if (text.toLowerCase().includes('confetti') || text.toLowerCase().includes('celebrate')) {
      triggerMilestoneCelebration();
    } else {
      triggerCelebration();
    }

    const userMsg: DemoMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsBotTyping(true);

    setTimeout(() => {
      setIsBotTyping(false);
      let replyText = '⚡ Socket event synchronized. TanStack Query cache updated seamlessly across all connected devices!';
      let senderName = 'ChatFlow Bot';
      let senderType: 'bot' | 'teammate' = 'bot';

      if (text.toLowerCase().includes('confetti') || text.toLowerCase().includes('celebrate')) {
        replyText = '🎉 Woohoo! Celebratory confetti triggered! Groups celebrate creation milestones with canvas fireworks.';
      } else if (text.toLowerCase().includes('group') || text.toLowerCase().includes('team') || activeTab === 'team') {
        senderType = 'teammate';
        senderName = 'Sarah (Product Lead)';
        replyText = '🙌 I received your message in real-time on my device! Role-gated participant channels are active.';
      } else if (text.toLowerCase().includes('optimistic')) {
        replyText = '🚀 Optimistic state updated in 0ms! Server confirmed payload in 12ms with background reconciliation.';
      }

      const botMsg: DemoMessage = {
        id: `bot-${Date.now()}`,
        sender: senderType,
        senderName,
        avatarBg: senderType === 'teammate' ? 'bg-emerald-600 text-white' : 'bg-purple-600 text-white',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reactions: ['👍 2', '🔥 1'],
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 550);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendText(input);
  };

  const handleReset = () => {
    setMessages(INITIAL_DEMO_MESSAGES);
    triggerCelebration();
  };

  const addReaction = (messageId: string, emoji: string) => {
    triggerCelebration();
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== messageId) return msg;
        const current = msg.reactions || [];
        const existingIdx = current.findIndex((r) => r.startsWith(emoji));
        if (existingIdx >= 0) {
          const count = parseInt(current[existingIdx].split(' ')[1] || '1', 10) + 1;
          const updated = [...current];
          updated[existingIdx] = `${emoji} ${count}`;
          return { ...msg, reactions: updated };
        }
        return { ...msg, reactions: [...current, `${emoji} 1`] };
      })
    );
  };

  return (
    <section id="demo" className="relative py-20 md:py-28 bg-[#FAFAFA] dark:bg-background overflow-hidden">
      {/* Background soft ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-96 w-full max-w-4xl bg-purple-500/10 dark:bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl space-y-10 relative z-10">
        {/* Section Header with Pill */}
        <SectionHeader
          badge="Sandbox"
          title="Try the Real-Time Chat Engine"
          description="Test optimistic mutations, simulated WebSocket broadcasts, and micro-interactions in a zero-latency interactive environment."
        />

        {/* Main Interactive Sandbox Window */}
        <div className="rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/90 shadow-[0_20px_60px_-15px_rgba(114,92,255,0.12)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-2xl overflow-hidden text-card-foreground">
          {/* Header Bar with Telemetry & Mode Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-slate-200/70 dark:border-zinc-800/80 bg-slate-50/70 dark:bg-zinc-900/60 backdrop-blur-md">
            {/* Left Bot / Channel Info */}
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20">
                <Bot className="h-5 w-5" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-zinc-900 bg-emerald-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    ChatFlow Engine Demo
                  </h4>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {latency}ms Latency
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  TanStack Query Cache • Socket.io Handshake Active
                </p>
              </div>
            </div>

            {/* Right Tabs & Reset Action */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center bg-slate-200/60 dark:bg-zinc-800/60 p-1 rounded-xl text-xs font-medium">
                <button
                  onClick={() => setActiveTab('bot')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    activeTab === 'bot'
                      ? 'bg-white dark:bg-zinc-900 text-purple-600 dark:text-purple-300 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-foreground'
                  }`}
                >
                  🤖 Bot
                </button>
                <button
                  onClick={() => setActiveTab('team')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    activeTab === 'team'
                      ? 'bg-white dark:bg-zinc-900 text-purple-600 dark:text-purple-300 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-foreground'
                  }`}
                >
                  👥 Team
                </button>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all active:scale-95"
                title="Reset Conversation"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="font-medium">Reset</span>
              </button>
            </div>
          </div>

          {/* Quick Prompt Suggestion Chips */}
          <div className="flex items-center gap-2 overflow-x-auto px-4 py-2.5 border-b border-slate-100 dark:border-zinc-800/60 bg-slate-50/40 dark:bg-zinc-950/40 no-scrollbar">
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Sparkles className="size-3 text-purple-500" /> Prompts:
            </span>
            {SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSendText(s.prompt)}
                className="shrink-0 text-xs px-3 py-1 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/70 dark:border-zinc-800 hover:border-purple-300 dark:hover:border-purple-700 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300 shadow-2xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div
            ref={containerRef}
            className="h-72 sm:h-80 overflow-y-auto p-4 sm:p-5 space-y-4 bg-gradient-to-b from-transparent via-slate-50/30 to-slate-100/20 dark:from-transparent dark:via-zinc-950/30 dark:to-zinc-900/10"
          >
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                    isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {!isUser && (
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl shadow-xs text-xs font-bold ${
                        m.avatarBg || 'bg-purple-600 text-white'
                      }`}
                    >
                      {m.sender === 'bot' ? <Bot className="h-4 w-4" /> : <Users className="h-4 w-4" />}
                    </div>
                  )}

                  <div className={`flex flex-col gap-1 max-w-[82%] sm:max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
                    {!isUser && m.senderName && (
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 pl-1">
                        {m.senderName}
                      </span>
                    )}

                    <div
                      className={`relative group rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm transition-all ${
                        isUser
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-xs'
                          : 'bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 border border-slate-200/80 dark:border-zinc-800 rounded-tl-xs'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{m.text}</p>

                      {/* Time & Delivery Check */}
                      <div
                        className={`mt-1.5 flex items-center justify-end gap-1.5 text-[10px] ${
                          isUser ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        <span>{m.time}</span>
                        {isUser && <CheckCheck className="h-3 w-3 text-white" />}
                      </div>

                      {/* Quick React Button on Hover */}
                      <button
                        onClick={() => addReaction(m.id, '❤️')}
                        className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 shadow-md rounded-full size-6 flex items-center justify-center text-[10px] hover:scale-110"
                        title="Add reaction"
                      >
                        ❤️
                      </button>
                    </div>

                    {/* Reactions Pill Badges */}
                    {m.reactions && m.reactions.length > 0 && (
                      <div className="flex items-center gap-1.5 pl-1 pt-0.5">
                        {m.reactions.map((r, i) => (
                          <button
                            key={i}
                            onClick={() => addReaction(m.id, r.split(' ')[0])}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200/60 dark:border-zinc-700/60 text-[10px] font-medium text-slate-700 dark:text-slate-300 hover:scale-105 active:scale-95 transition-all shadow-2xs"
                          >
                            <span>{r}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-900 dark:bg-zinc-100 text-white dark:text-slate-900 shadow-xs text-xs font-bold">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Realistic Typing Wave Indicator */}
            {isBotTyping && (
              <div className="flex items-center gap-3 pl-1 animate-in fade-in duration-200">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-600/15 text-purple-600 text-xs">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl px-3.5 py-2.5 shadow-2xs">
                  <span className="size-1.5 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="size-1.5 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="size-1.5 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Polished Chat Input Form */}
          <form
            onSubmit={handleSend}
            className="p-3.5 border-t border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center gap-2.5"
          >
            {/* Quick Emoji Reaction Buttons */}
            <div className="hidden sm:flex items-center gap-1 text-slate-400">
              <button
                type="button"
                onClick={() => setInput((prev) => `${prev} 👍`)}
                className="p-1.5 hover:text-purple-600 hover:bg-slate-100 dark:hover:bg-zinc-900 rounded-lg text-sm transition-all hover:scale-110"
                title="Thumbs up"
              >
                👍
              </button>
              <button
                type="button"
                onClick={() => setInput((prev) => `${prev} 🔥`)}
                className="p-1.5 hover:text-purple-600 hover:bg-slate-100 dark:hover:bg-zinc-900 rounded-lg text-sm transition-all hover:scale-110"
                title="Fire"
              >
                🔥
              </button>
              <button
                type="button"
                onClick={() => setInput((prev) => `${prev} 🚀`)}
                className="p-1.5 hover:text-purple-600 hover:bg-slate-100 dark:hover:bg-zinc-900 rounded-lg text-sm transition-all hover:scale-110"
                title="Rocket"
              >
                🚀
              </button>
            </div>

            {/* Input Box */}
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a real-time message (e.g. 'Hello ChatFlow!')..."
                className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-900/90 px-4 py-2.5 text-xs text-foreground placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all shadow-inner"
              />
              <span className="hidden md:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 dark:text-zinc-500 bg-white dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-zinc-700">
                ↵ Enter
              </span>
            </div>

            {/* Glowing Send Button */}
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25 hover:from-purple-700 hover:to-indigo-700 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
              title="Send Message"
            >
              <Send className="h-4 w-4 ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

