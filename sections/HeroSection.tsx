'use client';

import Image from 'next/image';
import Link from 'next/link';
import BadgePill from '@/shared/BadgePill';
import { Mic, Languages, Play, ChevronUp } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function HeroSection() {
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-28 bg-[#FAFAFA] dark:bg-background">
      {/* Background ethereal cloud aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[650px] w-full max-w-7xl bg-gradient-to-b from-purple-200/30 via-indigo-100/20 to-transparent dark:from-purple-900/15 dark:via-indigo-950/10 dark:to-transparent blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Top Tag Pill (Overlapping User Avatars + 10K+ users worldwide) */}
        <div className="flex justify-center mb-6">
          <BadgePill showAvatars label="10K+ users worldwide" />
        </div>

        {/* Main Headline & Subtitle */}
        <div className="flex flex-col items-center gap-4 text-center max-w-4xl mx-auto">
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-2px] text-foreground max-w-3xl leading-[1.18]"
          >
            All-in-One{' '}
            <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-xl bg-gradient-to-r from-[#8E7CFF] to-[#725CFF] text-white shadow-xs align-middle leading-tight transition-transform">
              Real-Time
            </span>{' '}
            Chat Platform for Modern Teams
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Instant bi-directional WebSocket communication, TanStack Query
            caching, and role-gated group channels — all in a private, secure
            workspace built for high-performance team collaboration.
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

        {/* Desktop Workspace Showcase Frame with Floating Glass Addons */}
        <div className="relative mt-12 sm:mt-16 mx-auto max-w-5xl flex flex-col items-center justify-center">
          {/* Atmospheric Underlay Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-72 sm:h-96 w-full max-w-4xl rounded-full bg-gradient-to-r from-purple-500/25 via-indigo-500/20 to-purple-500/25 blur-[120px] pointer-events-none" />

          {/* Floating Mini Addon 1 (Top Left - Voice Answers) */}
          <div className="hidden lg:flex absolute -left-6 top-12 z-30 items-center gap-3 rounded-2xl border border-white/90 dark:border-white/20 bg-white/60 dark:bg-zinc-900/60 p-3.5 shadow-[0_12px_36px_-6px_rgba(114,92,255,0.18)] dark:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl backdrop-saturate-150 ring-1 ring-white/70 dark:ring-white/10 animate-in fade-in slide-in-from-left duration-700">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100/80 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 shadow-inner">
              <Mic className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold leading-tight text-foreground">
                Answers on the go.
              </p>
              <p className="text-[11px] text-muted-foreground">
                Just speak up.
              </p>
            </div>
          </div>

          {/* Floating Mini Addon 2 (Bottom Left - Languages Translation) */}
          <div className="hidden lg:flex absolute -left-5 bottom-12 z-30 items-center gap-3 rounded-2xl border border-white/90 dark:border-white/20 bg-white/60 dark:bg-zinc-900/60 px-4 py-3 shadow-[0_12px_36px_-6px_rgba(114,92,255,0.18)] dark:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl backdrop-saturate-150 ring-1 ring-white/70 dark:ring-white/10 animate-in fade-in slide-in-from-left duration-700">
            <Languages className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <div className="h-2 w-24 rounded-full bg-slate-200/80 dark:bg-slate-700/80 overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full" />
            </div>
          </div>

          {/* Floating Mini Addon 3 (Top Right - Voice Waveform Audio Player) */}
          <div className="hidden lg:flex absolute -right-6 top-14 z-30 items-center gap-3 rounded-2xl border border-white/90 dark:border-purple-800/40 bg-white/60 dark:bg-zinc-900/60 px-4 py-3.5 shadow-[0_12px_36px_-6px_rgba(114,92,255,0.2)] dark:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl backdrop-saturate-150 ring-1 ring-white/70 dark:ring-white/10 animate-in fade-in slide-in-from-right duration-700">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm">
              <Play className="h-3.5 w-3.5 ml-0.5 fill-white" />
            </div>
            <div className="flex items-center gap-0.5">
              {[
                4, 8, 14, 18, 10, 16, 22, 12, 6, 18, 24, 14, 8, 12, 16, 10, 5,
              ].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}px` }}
                  className={`w-0.5 rounded-full ${
                    i < 8
                      ? 'bg-purple-600 dark:bg-purple-400'
                      : 'bg-purple-300 dark:bg-purple-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Floating Mini Addon 4 (Bottom Right - High-Speed Badge) */}
          <div className="hidden lg:flex absolute -right-5 bottom-10 z-30 flex-col items-center justify-center rounded-2xl border border-white/90 dark:border-white/20 bg-white/60 dark:bg-zinc-900/60 p-3.5 shadow-[0_12px_36px_-6px_rgba(114,92,255,0.18)] dark:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl backdrop-saturate-150 text-center w-32 ring-1 ring-white/70 dark:ring-white/10 animate-in fade-in slide-in-from-right duration-700">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100/80 dark:bg-purple-950/80 text-purple-600 mb-1 shadow-inner">
              <ChevronUp className="h-4 w-4" />
            </div>
            <p className="text-[11px] font-bold text-foreground leading-tight">
              High-speed
            </p>
            <p className="text-[10px] text-muted-foreground">processing</p>
          </div>

          {/* Browser / App Window Container */}
          <div className="relative z-10 w-full rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 shadow-[0_25px_70px_-15px_rgba(114,92,255,0.2)] dark:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden text-card-foreground ring-1 ring-black/5 dark:ring-white/10">
            {/* Window Top Bar */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-200/70 dark:border-zinc-800/80 bg-slate-50/80 dark:bg-zinc-900/80 backdrop-blur-md">
              {/* Traffic Light Window Controls */}
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 inline-block" />
                <span className="size-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 inline-block" />
                <span className="size-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 inline-block" />
              </div>

              {/* URL / Workspace Status Bar */}
              <div className="flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3.5 py-1 text-[11px] sm:text-xs font-mono text-slate-500 dark:text-slate-400 shadow-2xs">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>chatflow.io/workspace</span>
              </div>

              {/* Status Tag */}
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                <span>0ms WebSocket Sync</span>
              </div>
            </div>

            {/* Real Workspace Hero Image */}
            <div className="relative w-full overflow-hidden bg-slate-100 dark:bg-zinc-900">
              <Image
                src="/assets/heroimg.png"
                alt="ChatFlow Real-Time Workspace"
                width={2400}
                height={1480}
                className="w-full h-auto object-cover select-none"
                priority
              />
            </div>
          </div>

          {/* Smooth Bottom Fade Transition */}
          <div className="absolute -bottom-6 left-0 right-0 h-28 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/70 to-transparent dark:from-background dark:via-background/70 pointer-events-none z-20" />
        </div>
      </div>

      {/* Decorative Masked Left & Right Gradient Graphics */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden select-none"
        style={{
          maskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to top, black 40%, transparent 100%)',
        }}
      >
        {/* Left Graphic */}
        <div className="absolute bottom-0 left-0">
          <Image
            alt="Left graphic light"
            width={583}
            height={866}
            className="max-w-72 sm:max-w-84 md:max-w-96 dark:hidden"
            src="/assets/gradient-glow-light-left.png"
            priority={false}
          />
          <Image
            alt="Left graphic dark"
            width={584}
            height={874}
            className="max-w-72 sm:max-w-84 md:max-w-96 hidden dark:block"
            src="/assets/gradient-glow-dark-left.png"
            priority={false}
          />
        </div>

        {/* Right Graphic */}
        <div className="absolute right-0 bottom-0">
          <Image
            alt="Right graphic light"
            width={582}
            height={866}
            className="max-w-72 sm:max-w-84 md:max-w-96 dark:hidden"
            src="/assets/gradient-glow-light-right.png"
            priority={false}
          />
          <Image
            alt="Right graphic dark"
            width={584}
            height={874}
            className="max-w-72 sm:max-w-84 md:max-w-96 hidden dark:block"
            src="/assets/gradient-glow-dark-right.png"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
