'use client';

import Link from 'next/link';
import {
  ArrowUpRight,
  Sparkles,
  Play,
  Languages,
  Mic,
  ChevronUp,
  Wifi,
  Battery,
  MoreVertical,
  LayoutGrid,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function HeroSection() {
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-28 bg-gradient-to-b from-purple-50/70 via-indigo-50/30 to-background dark:from-purple-950/20 dark:via-background dark:to-background">
      {/* Background ethereal cloud aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[650px] w-full max-w-7xl bg-gradient-to-b from-purple-200/40 via-indigo-100/30 to-transparent dark:from-purple-900/15 dark:via-indigo-950/10 dark:to-transparent blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl">
        {/* Top Tag Pill (Matches Design System Spec) */}
        <div className="flex justify-center mb-6">
          <div className="relative z-10 inline-flex items-center gap-2.5 overflow-hidden rounded-xl border border-slate-200/80 dark:border-border/80 bg-white/90 dark:bg-card/90 p-1 pe-3.5 shadow-sm backdrop-blur-md">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg border border-purple-200/60 dark:border-purple-800/40 bg-white dark:bg-muted shadow-xs">
              <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.12058 1L2 9.54014H6.87942V15L13 6.45986H8.12058V1Z"
                  fill="url(#hero_bolt_grad)"
                  stroke="url(#hero_bolt_grad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="hero_bolt_grad" x1="9.5634" y1="15.7486" x2="5.81146" y2="0.704719" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#725CFF" />
                    <stop offset="0.5" stopColor="#C9C1FF" />
                    <stop offset="1" stopColor="#F8F7FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">With Powerful Team Features</p>
            <div
              className="absolute -bottom-4 -left-5 -z-10 h-10 w-10 -rotate-12 rounded-2xl blur-[10px]"
              style={{ background: 'linear-gradient(347deg, #725CFF 1.7%, #C9C1FF 46.45%, #F8F7FF 90.62%)' }}
            />
          </div>
        </div>

        {/* Main Headline & Subtitle */}
        <div className="flex flex-col items-center gap-4 text-center max-w-4xl mx-auto">
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-2px] text-foreground max-w-3xl leading-[1.12]"
          >
            All-in-One Real-Time Chat Platform for Modern Teams
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Instant bi-directional WebSocket communication, TanStack Query caching, and role-gated group channels — all in a private, secure workspace built for high-performance team collaboration.
          </p>

          {/* Base CTA Buttons (Matches User Spec) */}
          <div className="flex w-full flex-col items-center justify-center gap-2.5 sm:w-auto sm:flex-row pt-3">
            <a
              href="#demo"
              className="inline-flex items-center justify-center rounded-full transition-all cursor-pointer duration-200 border border-slate-200/90 dark:border-border text-slate-900 dark:text-white bg-white dark:bg-card h-12 w-full px-6 text-sm sm:text-base font-medium hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 sm:w-auto shadow-xs"
            >
              <span>View Sandbox</span>
            </a>

            <Link
              href={isAuthenticated ? '/chat' : '/login'}
              className="inline-flex items-center justify-center rounded-full transition-all cursor-pointer duration-200 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 h-12 w-full px-6 text-sm sm:text-base font-medium sm:w-auto shadow-md shadow-slate-900/10 dark:shadow-white/5 active:scale-98"
            >
              <span>{isAuthenticated ? 'Open App' : 'Try Free'}</span>
            </Link>
          </div>
        </div>

        {/* Realistic Mobile Device Showcase with Floating Glass Widgets */}
        <div className="relative mt-14 sm:mt-20 mx-auto max-w-4xl flex items-center justify-center">
          {/* Subtle back glowing orb behind devices */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-purple-400/20 blur-[100px] pointer-events-none" />

          {/* Floating Widget 1 (Top Left) */}
          <div className="hidden lg:flex absolute -left-6 top-16 z-20 items-center gap-3 rounded-2xl border border-white/80 dark:border-white/10 bg-white/75 dark:bg-card/75 p-3.5 shadow-xl shadow-purple-500/5 backdrop-blur-xl animate-in fade-in slide-in-from-left duration-700">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300">
              <Mic className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold leading-tight text-foreground">Answers on the go.</p>
              <p className="text-[11px] text-muted-foreground">Just speak up.</p>
            </div>
          </div>

          {/* Floating Widget 2 (Bottom Left) */}
          <div className="hidden lg:flex absolute -left-4 bottom-16 z-20 items-center gap-3 rounded-2xl border border-white/80 dark:border-white/10 bg-white/75 dark:bg-card/75 px-4 py-2.5 shadow-xl shadow-purple-500/5 backdrop-blur-xl animate-in fade-in slide-in-from-left duration-700">
            <Languages className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <div className="h-2 w-24 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden">
              <div className="h-full w-2/3 bg-purple-500 rounded-full" />
            </div>
          </div>

          {/* Floating Widget 3 (Top Right - Voice Waveform Player) */}
          <div className="hidden lg:flex absolute -right-6 top-20 z-20 items-center gap-3 rounded-2xl border border-purple-200/60 dark:border-purple-800/40 bg-gradient-to-r from-purple-100/90 via-indigo-50/90 to-purple-100/90 dark:from-purple-950/80 dark:via-indigo-950/80 dark:to-purple-950/80 px-4 py-3 shadow-xl shadow-purple-500/10 backdrop-blur-xl animate-in fade-in slide-in-from-right duration-700">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm">
              <Play className="h-3.5 w-3.5 ml-0.5 fill-white" />
            </div>
            <div className="flex items-center gap-0.5">
              {[4, 8, 14, 18, 10, 16, 22, 12, 6, 18, 24, 14, 8, 12, 16, 10, 5].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}px` }}
                  className={`w-0.5 rounded-full ${
                    i < 8 ? 'bg-purple-600 dark:bg-purple-400' : 'bg-purple-300 dark:bg-purple-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Floating Widget 4 (Bottom Right - High-Speed Badge) */}
          <div className="hidden lg:flex absolute -right-4 bottom-14 z-20 flex-col items-center justify-center rounded-2xl border border-white/80 dark:border-white/10 bg-white/75 dark:bg-card/75 p-3.5 shadow-xl shadow-purple-500/5 backdrop-blur-xl text-center w-32 animate-in fade-in slide-in-from-right duration-700">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 mb-1">
              <ChevronUp className="h-4 w-4" />
            </div>
            <p className="text-[11px] font-bold text-foreground leading-tight">High-speed</p>
            <p className="text-[10px] text-muted-foreground">processing</p>
          </div>

          {/* Dual Phone Showcase Container */}
          <div className="relative flex items-end justify-center gap-4 sm:gap-6 w-full pt-4">
            {/* Soft Ambient Ground Glow */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-xl h-24 bg-purple-500/10 dark:bg-purple-500/5 blur-3xl rounded-full pointer-events-none" />

            {/* Phone 1 (Main Interactive Frame) */}
            <div className="relative z-10 w-[280px] sm:w-[320px] rounded-[44px] border-[6px] border-slate-900/90 dark:border-slate-800 bg-white dark:bg-card shadow-[0_25px_60px_-15px_rgba(79,70,229,0.12)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden text-card-foreground">
              {/* Dynamic Island & Status Bar */}
              <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-bold">
                <span>9:41</span>
                {/* Dynamic Island Pill */}
                <div className="h-4 w-20 rounded-full bg-slate-900" />
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Wifi className="h-3 w-3" />
                  <Battery className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* Chat Header in Phone */}
              <div className="px-4 py-3 border-b flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-700 font-bold text-xs">
                    ES
                  </div>
                  <div>
                    <h4 className="text-xs font-bold leading-tight">Emerson Sterling</h4>
                    <p className="text-[10px] text-muted-foreground">sterling@chatflow.io</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MoreVertical className="h-3.5 w-3.5" />
                  <LayoutGrid className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* 3D Iridescent Orb & Greeting */}
              <div className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="relative flex h-24 w-24 items-center justify-center">
                  {/* Glowing Animated Orb */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-400 via-pink-400 to-indigo-300 blur-md opacity-70 animate-pulse" />
                  <div className="relative h-20 w-20 rounded-full bg-gradient-to-tr from-purple-400 via-indigo-200 to-pink-300 shadow-inner flex items-center justify-center">
                    <div className="h-14 w-14 rounded-full bg-white/40 backdrop-blur-sm shadow-sm" />
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                    Hello, Siam
                  </p>
                  <h3 className="text-sm font-bold text-foreground">
                    How can I assist you today?
                  </h3>
                </div>

                {/* Micro conversation bubble */}
                <div className="w-full text-left rounded-2xl bg-muted/60 p-3 text-[11px] text-muted-foreground border">
                  ⚡ Socket connected: 0ms latency with TanStack Query cache.
                </div>
              </div>
            </div>

            {/* Phone 2 (Secondary Overlapping Frame) */}
            <div className="relative z-10 hidden sm:block w-[260px] rounded-[40px] border-[6px] border-slate-900/90 dark:border-slate-800 bg-white dark:bg-card shadow-[0_25px_60px_-15px_rgba(79,70,229,0.1)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden opacity-95">
              {/* Dynamic Island & Status Bar */}
              <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-bold">
                <span>9:41</span>
                <div className="h-4 w-18 rounded-full bg-slate-900" />
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Wifi className="h-3 w-3" />
                  <Battery className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* Message Feed Preview */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-1.5 text-purple-600 text-[10px] font-semibold">
                  <Sparkles className="h-3 w-3" />
                  <span>Real-Time Voice Stream</span>
                </div>

                <div className="rounded-2xl bg-purple-50 dark:bg-purple-950/40 p-3 text-[11px] text-foreground leading-relaxed border border-purple-200/50 dark:border-purple-800/40">
                  Make sure the team flow is motivating and action-oriented. I am heading to the office now, so send this in the next five minutes, please...
                </div>

                <div className="rounded-2xl bg-muted/70 p-2.5 text-[10px] text-muted-foreground">
                  ✓ Synchronized across all connected clients.
                </div>
              </div>
            </div>
          </div>

          {/* Smooth, Gradual Bottom Fade Transition */}
          <div className="absolute -bottom-4 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none z-20" />
        </div>
      </div>
    </section>
  );
}
