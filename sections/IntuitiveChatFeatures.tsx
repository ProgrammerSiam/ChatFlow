'use client';

import SectionHeader from '@/shared/SectionHeader';
import {
  MessageSquare,
  FileText,
  Zap,
  Users,
  Search,
  Key,
  Sparkles,
} from 'lucide-react';

interface FeatureCard {
  title: string;
  description: string;
  icon: typeof MessageSquare;
  colSpan: string;
  accent: string;
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    title: 'Multi-Model & Socket Access',
    description:
      'Access persistent WebSocket channels, direct messages, and group channels — all in one unified workspace without tab fatigue.',
    icon: MessageSquare,
    colSpan: 'lg:col-span-7',
    accent: 'from-purple-500/15 via-indigo-500/10 to-transparent',
  },
  {
    title: 'Analyze Any File Instantly',
    description:
      'Upload PDFs, Docs, Sheets, or code and get accurate, context-aware answers and summaries in seconds.',
    icon: FileText,
    colSpan: 'lg:col-span-5',
    accent: 'from-indigo-500/15 via-blue-500/10 to-transparent',
  },
  {
    title: 'Compare Model & Speed',
    description:
      'Experience zero-latency optimistic delivery with sub-10ms network dispatch and instant status transitions.',
    icon: Zap,
    colSpan: 'lg:col-span-5',
    accent: 'from-amber-500/15 via-purple-500/10 to-transparent',
  },
  {
    title: 'Built-In Team Collaboration',
    description:
      'Share chats, assign admin roles, and work together in real time — collaboration is included at no extra cost.',
    icon: Users,
    colSpan: 'lg:col-span-7',
    accent: 'from-emerald-500/15 via-teal-500/10 to-transparent',
  },
  {
    title: 'Live User & Message Search',
    description:
      'Real-time 300ms debounced search built in. Instant sidebar cache lookup with client-side self-exclusion.',
    icon: Search,
    colSpan: 'lg:col-span-6',
    accent: 'from-pink-500/15 via-purple-500/10 to-transparent',
  },
  {
    title: 'Bring Your Own Token & API',
    description:
      'JWT Bearer tokens authenticated on every REST request and WebSocket handshake with automated session recovery.',
    icon: Key,
    colSpan: 'lg:col-span-6',
    accent: 'from-purple-500/15 via-indigo-500/10 to-transparent',
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
                  {/* Glowing Hover Gradient Orb */}
                  <div
                    className="invisible absolute -top-12 -right-12 h-36 w-36 rounded-full opacity-0 blur-2xl transition-all duration-300 group-hover/feature:visible group-hover/feature:opacity-30 pointer-events-none"
                    style={{
                      background: 'linear-gradient(169deg, #C9C1FF 29.61%, #725CFF 93.52%)',
                    }}
                  />

                  {/* Header & Icon */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100/80 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 shadow-inner group-hover/feature:scale-105 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Sparkles className="h-4 w-4 text-purple-400/40 group-hover/feature:text-purple-500 transition-colors" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                      {card.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>

                  {/* Subtle Bottom Accent Indicator */}
                  <div className="relative z-10 pt-4 mt-auto flex items-center gap-1.5 text-[11px] font-semibold text-purple-600 dark:text-purple-400 opacity-80 group-hover/feature:opacity-100 transition-opacity">
                    <span>Learn capability</span>
                    <span>→</span>
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
