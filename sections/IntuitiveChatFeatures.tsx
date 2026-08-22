'use client';

import React from 'react';
import SectionHeader from '@/shared/SectionHeader';
import {
  MessageSquare,
  Users,
  Smile,
  Pin,
  Search,
  ShieldCheck,
  Sparkles,
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
    title: '1-on-1 Direct Messaging',
    description: (
      <>
        Send instant private messages with <Highlight>0ms optimistic dispatch</Highlight>, real-time read receipts, and sub-millisecond WebSocket delivery.
      </>
    ),
    icon: MessageSquare,
    colSpan: 'lg:col-span-6',
    iconBg: 'from-purple-100/90 via-indigo-50/70 to-purple-50/50 dark:from-purple-950/60 dark:to-indigo-950/40',
    iconColor: 'text-purple-600 dark:text-purple-300',
    initialGlow: true,
  },
  {
    title: 'Group Channels & Admin Access',
    description: (
      <>
        Create multi-member workspaces with <Highlight>role-gated admin controls</Highlight>, member invitations, and co-admin promotions.
      </>
    ),
    icon: Users,
    colSpan: 'lg:col-span-3',
    iconBg: 'from-indigo-100/90 via-blue-50/70 to-indigo-50/50 dark:from-indigo-950/60 dark:to-blue-950/40',
    iconColor: 'text-indigo-600 dark:text-indigo-300',
    initialGlow: false,
  },
  {
    title: 'Tenor GIFs & Emoji Reactions',
    description: (
      <>
        Express ideas with <Highlight>animated Tenor GIFs</Highlight>, 1-tap emoji reaction counters, and particle confetti celebrations.
      </>
    ),
    icon: Smile,
    colSpan: 'lg:col-span-3',
    iconBg: 'from-pink-100/90 via-purple-50/70 to-pink-50/50 dark:from-pink-950/60 dark:to-purple-950/40',
    iconColor: 'text-pink-600 dark:text-pink-300',
    initialGlow: true,
  },

  /* Row 2: 3 cards (4 cols each) */
  {
    title: 'Pinned Channel Announcements',
    description: (
      <>
        Pin important roadmaps and specifications to the <Highlight>top of any channel</Highlight> for high visibility across your team.
      </>
    ),
    icon: Pin,
    colSpan: 'lg:col-span-4',
    iconBg: 'from-amber-100/90 via-orange-50/70 to-amber-50/50 dark:from-amber-950/60 dark:to-orange-950/40',
    iconColor: 'text-amber-600 dark:text-amber-300',
    initialGlow: true,
  },
  {
    title: 'Global Search & User Discovery',
    description: (
      <>
        Fuzzy search teammates and channels with <Highlight>300ms debouncing</Highlight> and 1-click room creation via ⌘K command palette.
      </>
    ),
    icon: Search,
    colSpan: 'lg:col-span-4',
    iconBg: 'from-emerald-100/90 via-teal-50/70 to-emerald-50/50 dark:from-emerald-950/60 dark:to-teal-950/40',
    iconColor: 'text-emerald-600 dark:text-emerald-300',
    initialGlow: false,
  },
  {
    title: 'Stateless JWT & Gap-Filling Sync',
    description: (
      <>
        Zero-password phone login secured with <Highlight>JWT Bearer tokens</Highlight>, automatic reconnect gap-filling, and 401 cache purges.
      </>
    ),
    icon: ShieldCheck,
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
          badgeIcon={<Sparkles className="size-3 text-purple-600 dark:text-purple-400" />}
          title={
            <>
              Powerful Features for{' '}
              <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-xl bg-gradient-to-r from-[#8E7CFF] to-[#725CFF] text-white shadow-xs align-middle leading-tight">
                Teams and Creators
              </span>
            </>
          }
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
                  className={`rounded-[24px] bg-white dark:bg-card group/feature relative overflow-hidden p-6 sm:p-8 border border-slate-200/60 dark:border-border/60 transition-all duration-300 shadow-xs hover:shadow-sm hover:border-purple-200/80 dark:hover:border-purple-800/60 ${card.colSpan} flex flex-col justify-between min-h-[220px]`}
                >
                  {/* Glowing Ambient Gradient Orb (Active by default on select cards, glowing on hover) */}
                  <div
                    className={`absolute -top-12 -right-12 h-44 w-44 rounded-full blur-2xl transition-opacity duration-300 pointer-events-none ${
                      card.initialGlow
                        ? 'opacity-25 group-hover/feature:opacity-50'
                        : 'opacity-0 group-hover/feature:opacity-40'
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
