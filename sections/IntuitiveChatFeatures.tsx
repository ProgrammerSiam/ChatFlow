'use client';

import React from 'react';
import SectionHeader from '@/shared/SectionHeader';
import {
  MessageSquare,
  FileText,
  Zap,
  Users,
  Search,
  Key,
} from 'lucide-react';

interface FeatureCard {
  title: string;
  description: React.ReactNode;
  icon: typeof MessageSquare;
  colSpan: string;
  iconBg: string;
  iconColor: string;
  initialGlow?: boolean;
}

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="font-medium text-slate-900 dark:text-white underline decoration-purple-400/60 dark:decoration-purple-400/80 decoration-[1.5px] underline-offset-4 transition-colors">
    {children}
  </span>
);

const FEATURE_CARDS: FeatureCard[] = [
  /* Row 1: 3 cards (Card 1 expanded to 6 cols, Card 2 & 3 are 3 cols each) */
  {
    title: 'Multi-Model & Socket Access',
    description: (
      <>
        Access persistent <Highlight>WebSocket channels</Highlight>, direct messages, and group channels — all in one unified workspace without tab fatigue.
      </>
    ),
    icon: MessageSquare,
    colSpan: 'lg:col-span-6',
    iconBg: 'from-purple-100/90 via-indigo-50/70 to-purple-50/50 dark:from-purple-950/60 dark:to-indigo-950/40',
    iconColor: 'text-purple-600 dark:text-purple-300',
    initialGlow: true,
  },
  {
    title: 'Analyze Any File Instantly',
    description: (
      <>
        Upload PDFs, Docs, Sheets, or code and get <Highlight>accurate, context-aware answers</Highlight> and summaries in seconds.
      </>
    ),
    icon: FileText,
    colSpan: 'lg:col-span-3',
    iconBg: 'from-indigo-100/90 via-blue-50/70 to-indigo-50/50 dark:from-indigo-950/60 dark:to-blue-950/40',
    iconColor: 'text-indigo-600 dark:text-indigo-300',
    initialGlow: false,
  },
  {
    title: 'Compare Model & Speed',
    description: (
      <>
        Experience <Highlight>zero-latency optimistic delivery</Highlight> with sub-10ms network dispatch and instant status transitions.
      </>
    ),
    icon: Zap,
    colSpan: 'lg:col-span-3',
    iconBg: 'from-amber-100/90 via-orange-50/70 to-amber-50/50 dark:from-amber-950/60 dark:to-orange-950/40',
    iconColor: 'text-amber-600 dark:text-amber-300',
    initialGlow: true,
  },

  /* Row 2: 3 cards (4 cols each) */
  {
    title: 'Built-In Team Collaboration',
    description: (
      <>
        Share chats, <Highlight>assign admin roles</Highlight>, and work together in real time — collaboration is included at no extra cost.
      </>
    ),
    icon: Users,
    colSpan: 'lg:col-span-4',
    iconBg: 'from-emerald-100/90 via-teal-50/70 to-emerald-50/50 dark:from-emerald-950/60 dark:to-teal-950/40',
    iconColor: 'text-emerald-600 dark:text-emerald-300',
    initialGlow: true,
  },
  {
    title: 'Live User & Message Search',
    description: (
      <>
        Real-time <Highlight>300ms debounced search</Highlight> built in. Instant sidebar cache lookup with client-side self-exclusion.
      </>
    ),
    icon: Search,
    colSpan: 'lg:col-span-4',
    iconBg: 'from-pink-100/90 via-rose-50/70 to-pink-50/50 dark:from-pink-950/60 dark:to-rose-950/40',
    iconColor: 'text-pink-600 dark:text-pink-300',
    initialGlow: false,
  },
  {
    title: 'Bring Your Own Token & API',
    description: (
      <>
        <Highlight>JWT Bearer tokens</Highlight> authenticated on every REST request and WebSocket handshake with automated session recovery.
      </>
    ),
    icon: Key,
    colSpan: 'lg:col-span-4',
    iconBg: 'from-purple-100/90 via-fuchsia-50/70 to-purple-50/50 dark:from-purple-950/60 dark:to-fuchsia-950/40',
    iconColor: 'text-purple-600 dark:text-purple-300',
    initialGlow: false,
  },
];

export default function IntuitiveChatFeatures() {
  return (
    <section id="features" className="bg-white dark:bg-background pt-12 pb-16 sm:pt-20 sm:pb-28">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Reusable Section Header */}
        <SectionHeader
          badge="Features"
          title="Powerful Features for Teams and Creators"
          description="The all-in-one communication platform for work, study, research, and creation. Access multiple channels, collaborate in real time, and share instantly — at no extra cost."
        />

        {/* Bento Grid Container (Matches User Spec) */}
        <div className="bg-slate-50/90 dark:bg-card/50 mx-auto w-full max-w-6xl rounded-[32px] p-2 sm:p-3.5 border border-slate-200/80 dark:border-border/60 shadow-xs">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
            {FEATURE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className={`rounded-[24px] bg-white dark:bg-card group/feature relative overflow-hidden p-6 sm:p-8 border border-slate-200/60 dark:border-border/60 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] ${card.colSpan} flex flex-col justify-between min-h-[220px]`}
                >
                  {/* Glowing Ambient Gradient Orb (Active by default on select cards, enhanced on hover) */}
                  <div
                    className={`absolute -top-12 -right-12 h-40 w-40 rounded-full blur-2xl transition-all duration-300 pointer-events-none ${
                      card.initialGlow
                        ? 'opacity-25 group-hover/feature:opacity-45'
                        : 'opacity-0 group-hover/feature:opacity-30'
                    }`}
                    style={{
                      background: 'linear-gradient(169deg, #C9C1FF 29.61%, #725CFF 93.52%)',
                    }}
                  />

                  {/* Header & Modern Icon */}
                  <div className="relative z-10">
                    <div className="flex items-center mb-5">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr ${card.iconBg} ${card.iconColor} border border-slate-200/60 dark:border-border/60 shadow-xs group-hover/feature:scale-110 group-hover/feature:shadow-md transition-all duration-300`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-medium tracking-tight text-slate-900 dark:text-white leading-tight">
                      {card.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
