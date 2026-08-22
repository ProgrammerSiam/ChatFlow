'use client';

import Image from 'next/image';
import Link from 'next/link';
import BrandLogo from '@/shared/BrandLogo';

export default function Footer() {
  return (
    <footer className="relative bg-[#FAFAFA] dark:bg-[#0E0E11] pt-16 pb-6 px-4 sm:px-6 lg:px-8 text-card-foreground overflow-hidden">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 relative z-10">
        {/* Top Split Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Brand & Mission Column */}
          <div className="max-w-md space-y-4">
            <Link
              href="/"
              className="inline-flex hover:opacity-90 transition-opacity"
            >
              <BrandLogo size="lg" prefix="Chat" suffix="Flow" />
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              All-in-one real-time chat and team collaboration workspace with
              instant Socket.io synchronization, TanStack Query caching, and
              role-gated group channels.
            </p>

            {/* GitHub Repository Link Button */}
            <div className="pt-2">
              <a
                aria-label="GitHub Repository"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com"
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-300 dark:hover:border-purple-800 shadow-2xs font-semibold text-xs transition-all hover:scale-105 active:scale-95"
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
                <span className="ml-1 text-[10px] bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 px-1.5 py-0.5 rounded-md font-bold">
                  v1.0
                </span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            {/* Column 1: Product */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                Product
              </h4>
              <ul className="space-y-2 text-slate-500 dark:text-slate-400">
                <li>
                  <a
                    href="#features"
                    className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#demo"
                    className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Live Demo
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    How it Works
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Platform */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                Platform
              </h4>
              <ul className="space-y-2 text-slate-500 dark:text-slate-400">
                <li>
                  <Link
                    href="/chat"
                    className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Web App
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Minimal Credits & Copyright Bar */}
        <div className="border-t border-slate-200/60 dark:border-zinc-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 ChatFlow Platform. All rights reserved.</p>
          <p>
            Crafted with Next.js 16, React 19, Socket.io &amp; TanStack Query
          </p>
        </div>

        {/* Below Footer Image Watermark (Clean edge-to-edge ambient integration) */}
        <div
          className="w-full select-none pointer-events-none flex justify-center -mb-4 pt-4 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, black 30%, transparent 95%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black 30%, transparent 95%)',
          }}
        >
          <Image
            src="/assets/footer-watermark-logo.png"
            alt="ChatFlow Watermark"
            width={1400}
            height={350}
            className="w-full max-w-5xl h-auto object-contain max-h-32 sm:max-h-44 invert opacity-20 dark:invert-0 dark:opacity-10 transition-opacity"
            priority={false}
          />
        </div>
      </div>
    </footer>
  );
}
