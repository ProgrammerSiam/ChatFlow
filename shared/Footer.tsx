'use client';

import Image from 'next/image';
import Link from 'next/link';
import BrandLogo from '@/shared/BrandLogo';

export default function Footer() {
  return (
    <footer className="relative bg-slate-50/90 dark:bg-card/40 pt-12 pb-6 px-4 sm:px-6 xl:px-8 text-card-foreground overflow-hidden">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 items-center text-center relative z-10">
        {/* Brand Logo & Tagline */}
        <div className="flex flex-col items-center gap-3">
          <Link href="/" className="inline-flex hover:opacity-90 transition-opacity">
            <BrandLogo size="lg" prefix="Chat" suffix="Flow" />
          </Link>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md">
            All-in-one real-time chat and team collaboration platform with zero-latency WebSocket communication.
          </p>
        </div>

        {/* Action: GitHub Link */}
        <div className="flex items-center gap-3">
          <a
            aria-label="GitHub Repository"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-muted border border-slate-200/80 dark:border-border text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-300 dark:hover:border-purple-800 shadow-2xs font-semibold text-xs transition-all hover:scale-105 active:scale-95"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span>GitHub Repository</span>
          </a>
        </div>

        {/* Minimal Credits & Copyright */}
        <div className="border-t border-slate-200/60 dark:border-border/50 pt-6 w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 ChatFlow Platform. All rights reserved.</p>
          <p>
            Crafted with Next.js 16, React 19, Socket.io &amp; TanStack Query
          </p>
        </div>

        {/* Below Footer Image Watermark */}
        <div className="w-full max-w-5xl pt-8 pb-2 select-none pointer-events-none flex justify-center">
          <Image
            src="/assets/footer-watermark-logo.png"
            alt="ChatFlow Watermark"
            width={1200}
            height={300}
            className="w-full h-auto object-contain max-h-36 sm:max-h-52 invert opacity-40 dark:invert-0 dark:opacity-25 transition-opacity"
            priority={false}
          />
        </div>
      </div>
    </footer>
  );
}
