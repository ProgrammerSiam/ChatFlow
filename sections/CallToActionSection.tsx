'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';

export default function CallToActionSection() {
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="relative overflow-hidden py-12 sm:py-20 sm:pt-25">
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5">
          {/* Top Tag Pill */}
          <div className="border-slate-200/80 dark:border-border/60 bg-white dark:bg-card relative z-10 inline-flex items-center gap-2.5 overflow-hidden rounded-xl border-[0.5px] p-1 pe-3.5 shadow-2xs">
            <div className="border-slate-100 dark:border-border bg-white/80 dark:bg-card/80 flex size-5.5 items-center justify-center rounded-md border-[0.5px]">
              <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.12058 1L2 9.54014H6.87942V15L13 6.45986H8.12058V1Z"
                  fill="url(#paint0_linear_cta)"
                  stroke="url(#paint1_linear_cta)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="paint0_linear_cta" x1="9.5634" y1="15.7486" x2="5.81146" y2="0.704719" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#725CFF" />
                    <stop offset="0.5" stopColor="#C9C1FF" />
                    <stop offset="1" stopColor="#F8F7FF" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_cta" x1="9.5634" y1="15.7486" x2="5.81146" y2="0.704719" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#725CFF" />
                    <stop offset="0.5" stopColor="#C9C1FF" />
                    <stop offset="1" stopColor="#F8F7FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-xs font-medium">Ready to Explore?</p>
            <div
              className="absolute -bottom-4 -left-5 -z-10 size-9.5 -rotate-12 rounded-2xl blur-[10px]"
              style={{
                background: 'linear-gradient(347deg, #725CFF 1.7%, #C9C1FF 46.45%, #F8F7FF 90.62%)',
              }}
            />
          </div>

          {/* Heading & Subtitle */}
          <div className="space-y-4">
            <h2 className="text-slate-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] font-medium tracking-[-0.02em] text-balance whitespace-pre-wrap">
              Work Smarter With Real-Time ChatFlow
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
