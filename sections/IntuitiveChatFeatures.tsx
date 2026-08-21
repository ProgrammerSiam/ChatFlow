'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Activity,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  Paperclip,
  Mic,
  LayoutGrid,
  MoreHorizontal,
  Wifi,
  Battery,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

const FEATURES_LIST = [
  {
    id: 'socket',
    icon: MessageSquare,
    title: 'Full-Duplex Socket Engine',
    description:
      'Socket.io client establishes persistent bidirectional channels with automatic gap-fill query invalidation on reconnection.',
  },
  {
    id: 'optimistic',
    icon: Activity,
    title: 'Zero-Latency Optimistic Delivery',
    description:
      'Instant message append with status sending -> sent -> retry failed, providing 0ms perceived response times.',
  },
  {
    id: 'security',
    icon: ShieldCheck,
    title: 'Secure Data & Session Handling',
    description:
      'JWT Bearer tokens authenticated on every REST request and WebSocket handshake, with automatic global 401 recovery.',
  },
];

export default function IntuitiveChatFeatures() {
  const [activeTab, setActiveTab] = useState('socket');
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background via-purple-50/20 to-background dark:via-purple-950/10">
      <div className="container mx-auto px-4 max-w-6xl space-y-16">
        {/* Centered Headline with Sparkle (Matches Screenshot 3) */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.2]">
            The smartest,{' '}
            <span className="text-muted-foreground/45 font-bold">most intuitive</span>
            <br />
            chat{' '}
            <span className="inline-flex items-center align-middle mx-1 text-purple-500">
              <Sparkles className="h-7 w-7 sm:h-8 sm:w-8 fill-purple-400 text-purple-500 inline" />
            </span>{' '}
            platform,{' '}
            <span className="text-muted-foreground/45 font-bold">designed for</span> everyone.
          </h2>
        </div>

        {/* Two-Column Feature Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Feature List */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              {FEATURES_LIST.map((feat) => {
                const Icon = feat.icon;
                const isActive = activeTab === feat.id;
                return (
                  <div
                    key={feat.id}
                    onClick={() => setActiveTab(feat.id)}
                    className={`cursor-pointer transition-all duration-200 pl-5 border-l-2 ${
                      isActive
                        ? 'border-purple-500 dark:border-purple-400 opacity-100'
                        : 'border-transparent opacity-60 hover:opacity-90'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-1.5">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-xl transition-colors ${
                          isActive
                            ? 'bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-300'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="text-base font-bold tracking-tight text-foreground">
                        {feat.title}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-11">
                      {feat.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* View All Pill Button */}
            <div className="pt-2 pl-5">
              <Link
                href={isAuthenticated ? '/chat' : '/login'}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white/90 dark:bg-card/90 px-6 py-2.5 text-xs font-semibold text-foreground shadow-xs hover:bg-muted transition-colors backdrop-blur-md"
              >
                <span>View all</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>
            </div>
          </div>

          {/* Right Column: Realistic Chat Window Card with Overlapping Phone Frame */}
          <div className="lg:col-span-7 relative">
            {/* Desktop Mockup Card */}
            <div className="relative rounded-3xl border border-border/80 bg-white/90 dark:bg-card/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl max-w-xl mx-auto lg:ml-auto">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-5 border-b">
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    ✦
                  </div>
                  <span className="text-sm font-bold text-foreground">ChatFlow Live</span>
                </div>
                <div className="text-muted-foreground p-1 rounded-lg hover:bg-muted">
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              </div>

              {/* Chat Content Body */}
              <div className="py-6 space-y-4">
                {/* Outgoing Message (Purple bubble) */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-purple-100/90 dark:bg-purple-950/70 text-purple-950 dark:text-purple-100 p-4 text-xs leading-relaxed border border-purple-200/60 dark:border-purple-800/40 shadow-xs">
                    I need the full API documentation for the custom socket sync module. Can you locate and summarize key endpoints?
                  </div>
                </div>

                {/* Incoming Message (With Bot Icon) */}
                <div className="flex items-start gap-3 justify-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white text-xs font-extrabold shadow-sm mt-0.5">
                    ✦
                  </div>
                  <div className="max-w-[85%] rounded-2xl rounded-tl-xs bg-muted/50 dark:bg-muted/30 p-4 text-xs text-foreground leading-relaxed border border-border/60 shadow-xs">
                    Certainly. Verified 12 endpoints including <span className="font-mono text-[11px] font-semibold text-purple-600 dark:text-purple-300">GET /conversations</span>, reverse message pagination, and group admin gating with 0ms optimistic delivery.
                  </div>
                </div>
              </div>

              {/* Chat Input Footer */}
              <div className="pt-2">
                <div className="flex items-center justify-between rounded-2xl border bg-background px-4 py-3 text-xs text-muted-foreground shadow-xs">
                  <span>Ask anything or type a message...</span>
                  <div className="flex items-center gap-2.5 text-muted-foreground">
                    <Paperclip className="h-4 w-4 cursor-pointer hover:text-foreground transition-colors" />
                    <LayoutGrid className="h-4 w-4 cursor-pointer hover:text-foreground transition-colors" />
                    <Mic className="h-4 w-4 cursor-pointer hover:text-foreground transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            {/* Overlapping Phone Frame (Matches Screenshot 3 bottom right) */}
            <div className="hidden sm:block absolute -bottom-10 -right-6 z-20 w-44 rounded-[32px] border-[5px] border-slate-900/90 dark:border-slate-800 bg-white dark:bg-card shadow-2xl p-3 overflow-hidden">
              <div className="pt-1 px-2 pb-1.5 flex items-center justify-between text-[8px] font-bold">
                <span>9:41</span>
                <div className="h-2.5 w-10 rounded-full bg-slate-900" />
                <div className="flex items-center gap-1">
                  <Wifi className="h-2 w-2" />
                  <Battery className="h-2 w-2" />
                </div>
              </div>

              <div className="pt-3 pb-2 text-center space-y-1">
                <p className="text-[9px] font-extrabold text-foreground leading-tight">
                  The smartest, most intuitive chat
                </p>
                <div className="h-1 w-8 bg-purple-500 rounded-full mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
