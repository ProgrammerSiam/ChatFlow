'use client';

import Image from 'next/image';
import Link from 'next/link';
import BadgePill from '@/shared/BadgePill';
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
              <span>View Demo</span>
            </a>

            <Link
              href={isAuthenticated ? '/chat' : '/login'}
              className="inline-flex items-center justify-center rounded-full transition-all cursor-pointer duration-200 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 h-12 w-full px-6 text-sm sm:text-base font-medium sm:w-auto shadow-md shadow-slate-900/10 dark:shadow-white/5 active:scale-98"
            >
              <span>{isAuthenticated ? 'Open App' : 'Try Free'}</span>
            </Link>
          </div>
        </div>

        {/* Desktop Workspace Showcase Frame */}
        <div className="relative mt-12 sm:mt-16 mx-auto max-w-5xl flex flex-col items-center justify-center">
          {/* Atmospheric Underlay Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-72 sm:h-96 w-full max-w-4xl rounded-full bg-gradient-to-r from-purple-500/25 via-indigo-500/20 to-purple-500/25 blur-[120px] pointer-events-none" />

          {/* Browser / App Window Container */}
          <div className="relative z-10 w-full rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-[0_25px_70px_-15px_rgba(114,92,255,0.2)] dark:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.8)] overflow-hidden text-card-foreground ring-1 ring-black/5 dark:ring-white/10">
            {/* Real Workspace Hero Image */}
            <div className="relative w-full overflow-hidden bg-slate-100 dark:bg-zinc-900">
              <Image
                src="/assets/heroimg.png"
                alt="ChatFlow Real-Time Workspace"
                width={1200}
                height={740}
                className="w-full h-auto object-cover select-none"
                priority
                unoptimized
              />
            </div>
          </div>
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
            loading="eager"
            unoptimized
          />
          <Image
            alt="Left graphic dark"
            width={584}
            height={874}
            className="max-w-72 sm:max-w-84 md:max-w-96 hidden dark:block"
            src="/assets/gradient-glow-dark-left.png"
            loading="eager"
            unoptimized
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
            loading="eager"
            unoptimized
          />
          <Image
            alt="Right graphic dark"
            width={584}
            height={874}
            className="max-w-72 sm:max-w-84 md:max-w-96 hidden dark:block"
            src="/assets/gradient-glow-dark-right.png"
            loading="eager"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
