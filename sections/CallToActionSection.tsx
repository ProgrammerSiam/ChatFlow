'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function CallToActionSection() {
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 sm:pt-28 bg-gradient-to-b from-background via-purple-50/20 to-background dark:via-purple-950/10 border-t border-slate-200/60 dark:border-border/40">
      {/* Background ethereal ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-full max-w-5xl bg-gradient-to-tr from-purple-400/15 via-indigo-300/10 to-pink-300/10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5">
          {/* Top Tag Pill */}
          <div className="relative z-10 inline-flex items-center gap-2.5 overflow-hidden rounded-xl border border-slate-200/80 dark:border-border/80 bg-white/90 dark:bg-card/90 p-1 pe-3.5 shadow-sm backdrop-blur-md">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg border border-purple-200/60 dark:border-purple-800/40 bg-white dark:bg-muted shadow-xs">
              <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.12058 1L2 9.54014H6.87942V15L13 6.45986H8.12058V1Z"
                  fill="url(#cta_bolt_grad)"
                  stroke="url(#cta_bolt_grad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="cta_bolt_grad" x1="9.5634" y1="15.7486" x2="5.81146" y2="0.704719" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#725CFF" />
                    <stop offset="0.5" stopColor="#C9C1FF" />
                    <stop offset="1" stopColor="#F8F7FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">Ready to Explore?</p>
            <div
              className="absolute -bottom-4 -left-5 -z-10 h-10 w-10 -rotate-12 rounded-2xl blur-[10px]"
              style={{ background: 'linear-gradient(347deg, #725CFF 1.7%, #C9C1FF 46.45%, #F8F7FF 90.62%)' }}
            />
          </div>

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

        {/* CTA Actions */}
        <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row pt-2">
          <Link
            href={isAuthenticated ? '/chat' : '/login'}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 h-12 w-full px-8 text-sm sm:text-base font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:opacity-95 hover:shadow-purple-500/40 active:scale-95 sm:w-auto cursor-pointer"
          >
            <span>{isAuthenticated ? 'Open App' : 'Try Free'}</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <a
            href="#demo"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 dark:border-border bg-white/80 dark:bg-card/80 h-12 w-full px-8 text-sm sm:text-base font-semibold text-foreground shadow-xs hover:bg-slate-50 dark:hover:bg-muted transition-colors backdrop-blur-md sm:w-auto cursor-pointer"
          >
            <span>Test Sandbox</span>
          </a>
        </div>
      </div>
    </section>
  );
}
