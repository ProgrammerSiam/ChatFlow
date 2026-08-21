'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Search,
  Paperclip,
  Mic,
  ArrowUp,
  SlidersHorizontal,
  Share2,
  Download,
  MoreHorizontal,
  ChevronDown,
  Globe2,
  HelpCircle,
  Clock,
  Lightbulb,
  ShieldCheck,
  FolderOpen,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatUIStore } from '@/store/useChatUIStore';
import { toast } from 'sonner';

import CoolTooltip from '@/shared/CoolTooltip';

export default function ChatIndexPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { setNewChatOpen, setNewGroupOpen } = useChatUIStore();
  const [promptText, setPromptText] = useState('');

  const firstName = user?.name ? user.name.split(' ')[0] : 'Jackson';

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim()) {
      setNewChatOpen(true);
      return;
    }
    setNewChatOpen(true);
  };

  const starterCards = [
    {
      icon: Clock,
      title: 'Synthesize Data',
      description: 'Turn meeting notes and sprint updates into synchronized channel messages.',
      action: () => setNewChatOpen(true),
    },
    {
      icon: Lightbulb,
      title: 'Creative Brainstorm',
      description: 'Launch an instant group channel with admin governance for collaboration.',
      action: () => setNewGroupOpen(true),
    },
    {
      icon: ShieldCheck,
      title: 'Check Facts',
      description: 'Sub-10ms WebSocket zero-latency delivery and JWT Bearer security.',
      action: () => {
        toast.info('WebSocket connection active with 0ms delivery latency.');
      },
    },
  ];

  return (
    <div className="flex-1 h-full rounded-[24px] bg-white dark:bg-card border border-slate-200/80 dark:border-border/70 shadow-xs flex flex-col justify-between overflow-hidden relative select-none">
      
      {/* Top Header Bar */}
      <header className="h-14 px-5 border-b border-slate-100 dark:border-border/50 flex items-center justify-between shrink-0 bg-white/80 dark:bg-card/80 backdrop-blur-sm z-10">
        {/* Left Dropdown Pill */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-border bg-slate-50/80 dark:bg-muted text-slate-800 dark:text-slate-200 text-xs font-medium cursor-pointer hover:bg-slate-100 dark:hover:bg-muted/80 transition-colors">
            <div className="flex h-4 w-4 items-center justify-center rounded-md bg-purple-600 text-white font-bold text-[9px]">
              ⚡
            </div>
            <span>ChatFlow</span>
            <ChevronDown className="h-3 w-3 opacity-60 ml-0.5" />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <CoolTooltip content="More Options" side="bottom">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200/70 dark:border-border/70 text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-muted transition-colors cursor-pointer"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </CoolTooltip>

          <CoolTooltip content="Share Channel Link" side="bottom">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200/70 dark:border-border/70 text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-muted transition-colors cursor-pointer"
            >
              <Share2 className="h-3.5 w-3.5" />
            </button>
          </CoolTooltip>

          <CoolTooltip content="Export conversation transcript" side="bottom">
            <button
              onClick={() => {
                toast.success('Chat transcript ready for export');
              }}
              className="hidden sm:inline-flex items-center gap-1.5 h-8 px-3 rounded-xl border border-slate-200/70 dark:border-border/70 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-muted text-xs font-medium transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export chat</span>
            </button>
          </CoolTooltip>

          <CoolTooltip content="Start a new direct chat" side="bottom" shortcut="⌘N">
            <button
              onClick={() => setNewChatOpen(true)}
              className="h-8 px-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium shadow-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-all cursor-pointer"
            >
              New Chat
            </button>
          </CoolTooltip>
        </div>
      </header>

      {/* Main Center Body */}
      <div className="flex-1 overflow-y-auto px-4 py-8 sm:py-10 flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-2xl space-y-6 flex flex-col items-center">
          
          {/* Ethereal Floating Violet 3D Sphere */}
          <div className="relative flex items-center justify-center">
            {/* Ambient Violet Glow underlay */}
            <div className="absolute w-36 h-36 rounded-full bg-purple-400/25 blur-3xl pointer-events-none" />
            
            {/* Sphere container */}
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-gradient-to-tr from-[#8E7CFF] via-[#B8ABFF] to-[#F1EEFF] shadow-xl shadow-purple-500/20 flex items-center justify-center">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gradient-to-br from-white/70 via-purple-100/40 to-transparent blur-[1px]" />
            </div>
          </div>

          {/* Welcome Headline */}
          <div className="space-y-1.5">
            <h3 className="text-lg sm:text-xl font-normal text-purple-600 dark:text-purple-400 tracking-tight">
              Hello, {firstName}
            </h3>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-tight">
              How can I assist you today?
            </h1>
          </div>

          {/* Central Floating Composer Box */}
          <form
            onSubmit={handlePromptSubmit}
            className="w-full rounded-2xl bg-white dark:bg-card border border-slate-200/90 dark:border-border p-4 shadow-sm space-y-3.5 text-left"
          >
            {/* Text Input */}
            <input
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Ask me anything or search teammates..."
              className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none"
            />

            {/* Action Row */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-purple-200/80 dark:border-purple-800/60 bg-purple-50/80 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs font-medium">
                  <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                  <span>Deeper Research</span>
                </div>
                <button
                  type="button"
                  onClick={() => setNewGroupOpen(true)}
                  title="Group Workspace"
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <FolderOpen className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setNewChatOpen(true)}
                  title="Search User"
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  title="Voice Input"
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <Mic className="h-4 w-4" />
                </button>
                <button
                  type="submit"
                  title="Send"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-600 text-white shadow-xs hover:bg-purple-700 transition-colors"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Sub-actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-border/50 text-[11px] text-slate-500">
              <button
                type="button"
                onClick={() => setNewChatOpen(true)}
                className="inline-flex items-center gap-1 hover:text-purple-600 transition-colors cursor-pointer"
              >
                <Sparkles className="h-3 w-3 text-purple-500" />
                <span>Saved prompts</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  toast.info('Attach files in active direct or group conversations.');
                }}
                className="inline-flex items-center gap-1 hover:text-purple-600 transition-colors cursor-pointer"
              >
                <Paperclip className="h-3 w-3" />
                <span>Attach file</span>
              </button>
            </div>
          </form>

          {/* 3 Starter Action Cards */}
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3 w-full text-left">
            {starterCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  onClick={card.action}
                  className="p-3.5 rounded-2xl bg-white dark:bg-card border border-slate-200/70 dark:border-border/60 hover:border-purple-300 dark:hover:border-purple-800 shadow-2xs hover:shadow-sm transition-all cursor-pointer group"
                >
                  <Icon className="h-4 w-4 text-slate-500 dark:text-slate-400 group-hover:text-purple-600 transition-colors mb-2.5" />
                  <h4 className="text-xs font-medium text-slate-900 dark:text-white mb-1">
                    {card.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Bottom Footer Note */}
      <footer className="px-5 py-3 border-t border-slate-100 dark:border-border/50 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
        <p className="mx-auto text-center">
          Join the ChatFlow community for real-time updates.{' '}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
          >
            Join Discord
          </a>
        </p>
        <div className="flex items-center gap-2">
          <button className="hover:text-slate-600 dark:hover:text-slate-300">
            <Globe2 className="h-3.5 w-3.5" />
          </button>
          <button className="hover:text-slate-600 dark:hover:text-slate-300">
            <HelpCircle className="h-3.5 w-3.5" />
          </button>
        </div>
      </footer>

    </div>
  );
}
