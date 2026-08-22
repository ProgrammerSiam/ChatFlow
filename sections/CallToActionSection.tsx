'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import BadgePill from '@/shared/BadgePill';
import { Sparkles } from 'lucide-react';

export default function CallToActionSection() {
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="relative overflow-hidden py-12 sm:py-20 sm:pt-25">
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5">
          {/* Top Tag Pill */}
          <BadgePill icon={<Sparkles className="size-3 text-purple-600 dark:text-purple-400" />} label="Ready to Explore?" />

          {/* Heading & Subtitle */}
          <div className="space-y-4">
            <h2 className="text-slate-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] font-medium tracking-[-0.02em] text-balance whitespace-pre-wrap">
              Work Smarter With{' '}
              <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-xl bg-gradient-to-r from-[#8E7CFF] to-[#725CFF] text-white shadow-xs align-middle leading-tight">
                Real-Time ChatFlow
              </span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mx-auto max-w-xl text-sm sm:text-base leading-[1.6] text-pretty">
              Instant Socket.io synchronization, TanStack Query client caching, and role-gated group workspaces built for high-velocity teams and creators.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex w-full flex-col items-center justify-center gap-2.5 sm:w-auto sm:flex-row">
          <a
            href="#demo"
            className="gap-2 inline-flex items-center justify-center rounded-full transition-all cursor-pointer duration-200 border border-slate-200/90 dark:border-border text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 bg-white dark:bg-card h-12 w-full px-6 text-sm sm:text-base font-medium sm:w-auto shadow-xs"
          >
            View Plans
          </a>
          <Link
            href={isAuthenticated ? '/chat' : '/login'}
            className="gap-2 inline-flex items-center justify-center rounded-full transition-all cursor-pointer duration-200 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 h-12 w-full px-6 text-sm sm:text-base font-medium sm:w-auto shadow-md shadow-slate-900/10 dark:shadow-white/5 active:scale-98"
          >
            {isAuthenticated ? 'Open App' : 'Try Free'}
          </Link>
        </div>
      </div>

      {/* Decorative Masked Left & Right Gradient Graphics */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden select-none"
        style={{
          maskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
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
            unoptimized
          />
          <Image
            alt="Left graphic dark"
            width={584}
            height={874}
            className="max-w-72 sm:max-w-84 md:max-w-96 hidden dark:block"
            src="/assets/gradient-glow-dark-left.png"
            priority={false}
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
            priority={false}
            unoptimized
          />
          <Image
            alt="Right graphic dark"
            width={584}
            height={874}
            className="max-w-72 sm:max-w-84 md:max-w-96 hidden dark:block"
            src="/assets/gradient-glow-dark-right.png"
            priority={false}
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
