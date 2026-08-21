'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import BadgePill from '@/shared/BadgePill';

export default function CallToActionSection() {
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 sm:pt-28 bg-gradient-to-b from-background via-purple-50/20 to-background dark:via-purple-950/10 border-t border-slate-200/60 dark:border-border/40">
      {/* Background ethereal ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-full max-w-5xl bg-gradient-to-tr from-purple-400/15 via-indigo-300/10 to-pink-300/10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5">
          {/* Top Tag Pill */}
          <BadgePill label="Ready to Explore?" />

          {/* Heading & Subtitle */}
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.12] font-medium tracking-[-2px] text-foreground text-balance">
              Work Smarter With Real-Time ChatFlow
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mx-auto max-w-xl text-sm sm:text-base leading-relaxed">
              Instant Socket.io synchronization, TanStack Query client caching, and role-gated group workspaces built for high-velocity teams and creators.
            </p>
          </div>
        </div>

        {/* Base CTA Buttons (Matches User Spec) */}
        <div className="flex w-full flex-col items-center justify-center gap-2.5 sm:w-auto sm:flex-row pt-2">
          <a
            href="#demo"
            className="inline-flex items-center justify-center rounded-full transition-all cursor-pointer duration-200 border border-slate-200/90 dark:border-border text-slate-900 dark:text-white bg-white dark:bg-card h-12 w-full px-6 text-sm sm:text-base font-medium hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 sm:w-auto shadow-xs"
          >
            <span>View Plans</span>
          </a>

          <Link
            href={isAuthenticated ? '/chat' : '/login'}
            className="inline-flex items-center justify-center rounded-full transition-all cursor-pointer duration-200 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 h-12 w-full px-6 text-sm sm:text-base font-medium sm:w-auto shadow-md shadow-slate-900/10 dark:shadow-white/5 active:scale-98"
          >
            <span>{isAuthenticated ? 'Open App' : 'Try Free'}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
