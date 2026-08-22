'use client';

import React from 'react';
import {
  MessageSquare,
  Users,
  Pin,
  Search,
  ShieldCheck,
  Zap,
  ArrowUpRight,
} from 'lucide-react';
import BadgePill from '@/shared/BadgePill';

export default function FeatureBentoGrid() {
  return (
    <section id="features" className="py-20 md:py-28 bg-[#FAFAFA] dark:bg-background overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl space-y-16">
        {/* Split Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-5">
            <BadgePill
              icon={<Zap className="size-3 text-purple-600 dark:text-purple-400" />}
              label="Real-Time Architecture"
            />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-1.5px] text-foreground leading-[1.15]">
              Engineered for{' '}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-xl bg-gradient-to-r from-[#8E7CFF] to-[#725CFF] text-white shadow-xs align-middle leading-tight">
                Instant Speed
              </span>{' '}
              and Team Scale
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between items-start pt-2 space-y-4">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              ChatFlow combines low-latency Socket.io v4 event transport with TanStack Query caching and role-gated group administration — ensuring messages sync in real time without lag.
            </p>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 text-xs font-semibold shadow-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-all cursor-pointer"
            >
              <span>Explore Interactive Demo</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* 3-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Direct 1-on-1 */}
          <div className="group relative rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white/90 dark:bg-card/90 p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="relative h-44 w-full rounded-2xl bg-gradient-to-tr from-purple-100/90 via-pink-50/70 to-indigo-100/90 dark:from-purple-950/40 dark:via-indigo-950/30 dark:to-purple-900/20 flex flex-col items-center justify-center p-6 border border-purple-200/50 dark:border-purple-900/30 mb-6 text-center overflow-hidden">
              <div className="h-13 w-13 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-[#725CFF] flex items-center justify-center mb-2 shadow-inner group-hover:scale-110 transition-transform">
                <MessageSquare className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                1-on-1 Direct Messaging
              </span>
              <span className="text-[11px] text-muted-foreground mt-0.5">
                0ms optimistic dispatch + read receipts
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-foreground tracking-tight">
                Instant Direct Messaging
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Send direct private messages with sub-millisecond delivery, auto-scroll positioning, and real-time read receipt indicators.
              </p>
            </div>
          </div>

          {/* Card 2: Group Channels & Admin Access */}
          <div className="group relative rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white/90 dark:bg-card/90 p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="relative h-44 w-full rounded-2xl bg-gradient-to-tr from-indigo-100/90 via-purple-50/70 to-blue-100/90 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-indigo-900/20 flex flex-col items-center justify-center p-6 border border-indigo-200/50 dark:border-indigo-900/30 mb-6 text-center overflow-hidden">
              <div className="h-13 w-13 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2 shadow-inner group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Group Channels & Admin Access
              </span>
              <span className="text-[11px] text-muted-foreground mt-0.5">
                Creator auto-admin + member management
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-foreground tracking-tight">
                Role-Gated Team Channels
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Multi-participant collaborative rooms. Group admins can invite teammates, remove members, and promote co-admins in real time.
              </p>
            </div>
          </div>

          {/* Card 3: Tenor GIFs & Live Reactions */}
          <div className="group relative rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white/90 dark:bg-card/90 p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="relative h-44 w-full rounded-2xl bg-gradient-to-tr from-pink-100/90 via-purple-50/70 to-indigo-100/90 dark:from-pink-950/40 dark:via-purple-950/30 dark:to-pink-900/20 flex flex-col items-center justify-center p-6 border border-pink-200/50 dark:border-pink-900/30 mb-6 text-center overflow-hidden">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-white dark:bg-card text-xs font-bold border border-slate-200 shadow-2xs">🔥 14</span>
                <span className="px-2.5 py-1 rounded-full bg-white dark:bg-card text-xs font-bold border border-slate-200 shadow-2xs">🚀 9</span>
                <span className="px-2.5 py-1 rounded-full bg-white dark:bg-card text-xs font-bold border border-slate-200 shadow-2xs">🎉 6</span>
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                GIFs, Emojis & Pinned Posts
              </span>
              <span className="text-[11px] text-muted-foreground mt-0.5">
                Animated reactions + confetti celebrations
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-foreground tracking-tight">
                Rich Expressive Addons
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Send Tenor animated GIFs, react with 1-tap emoji counter pills with particle bursts, and pin key channel announcements.
              </p>
            </div>
          </div>
        </div>

        {/* Second Row: 3 More Rich Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 4: Pinned Announcements */}
          <div className="group relative rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white/90 dark:bg-card/90 p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="relative h-44 w-full rounded-2xl bg-gradient-to-tr from-amber-100/80 via-orange-50/60 to-purple-100/80 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-purple-900/20 flex flex-col items-center justify-center p-6 border border-amber-200/50 dark:border-amber-900/30 mb-6 text-center overflow-hidden">
              <div className="h-13 w-13 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2 shadow-inner group-hover:scale-110 transition-transform">
                <Pin className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Channel Announcements
              </span>
              <span className="text-[11px] text-muted-foreground mt-0.5">
                Persistent pinned messages for teams
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-foreground tracking-tight">
                Pinned Message Banners
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Pin key updates, links, and meeting notes to the top of any channel so team members never lose critical context.
              </p>
            </div>
          </div>

          {/* Card 5: Global Search & Discovery */}
          <div className="group relative rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white/90 dark:bg-card/90 p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="relative h-44 w-full rounded-2xl bg-gradient-to-tr from-emerald-100/80 via-teal-50/60 to-purple-100/80 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-purple-900/20 flex flex-col items-center justify-center p-6 border border-emerald-200/50 dark:border-emerald-900/30 mb-6 text-center overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-card border border-slate-200 dark:border-border text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs mb-2">
                <Search className="size-3.5 text-emerald-600" />
                <span>Global Search</span>
                <kbd className="text-[10px] font-mono bg-slate-100 dark:bg-muted px-1.5 py-0.5 rounded border border-slate-200 dark:border-border">⌘K</kbd>
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Teammates & Channels Discovery
              </span>
              <span className="text-[11px] text-muted-foreground mt-0.5">
                300ms debounced fuzzy lookups
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-foreground tracking-tight">
                Global Search & ⌘K Palette
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Quickly locate any teammate by phone or name, jump directly into existing conversations, or filter channels with keyboard shortcuts.
              </p>
            </div>
          </div>

          {/* Card 6: Enterprise Security & Session Vault */}
          <div className="group relative rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white/90 dark:bg-card/90 p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="relative h-44 w-full rounded-2xl bg-gradient-to-tr from-purple-100/90 via-fuchsia-50/70 to-purple-100/90 dark:from-purple-950/40 dark:via-fuchsia-950/30 dark:to-purple-900/20 flex flex-col items-center justify-center p-6 border border-purple-200/50 dark:border-purple-900/30 mb-6 text-center overflow-hidden">
              <div className="h-13 w-13 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2 shadow-inner group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Stateless JWT Security
              </span>
              <span className="text-[11px] text-muted-foreground mt-0.5">
                Auto-registration & 401 Interceptor
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-foreground tracking-tight">
                Encrypted Session Vault
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Zero-password phone authentication verified via JWT handshake. Centralized 401 interceptor purges expired sessions and protects user data.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Tech Ecosystem Strip */}
        <div className="pt-10 border-t border-slate-200/70 dark:border-border/70 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-1 text-center lg:text-left">
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              Real-Time WebSocket Sync
            </div>
            <p className="text-xs text-muted-foreground max-w-sm">
              Bi-directional message transmission and TanStack Query state engine built for modern team velocity.
            </p>
          </div>

          {/* Tech Ecosystem Tags */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-semibold text-muted-foreground">
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <span className="h-2 w-2 rounded-full bg-purple-500" />
              <span>Socket.IO v4</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              <span>TanStack Query v5</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span>Zustand State</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <span className="h-2 w-2 rounded-full bg-slate-900 dark:bg-white" />
              <span>Next.js 16</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <span className="h-2 w-2 rounded-full bg-cyan-500" />
              <span>React 19</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <span className="h-2 w-2 rounded-full bg-teal-500" />
              <span>Tailwind v4</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
