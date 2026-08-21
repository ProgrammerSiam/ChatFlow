'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import BrandLogo from '@/shared/BrandLogo';

export default function Navbar() {
  const { isAuthenticated } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full pt-4 pb-2 px-4">
      <div className="container mx-auto flex items-center justify-between max-w-6xl">
        {/* Brand Logo (Matches UI Design System) */}
        <Link href="/" className="inline-flex">
          <BrandLogo prefix="Chat" suffix="Flow" />
        </Link>

        {/* Centered Segmented Pill Menu */}
        <nav className="hidden md:flex items-center gap-1.5 rounded-full  px-2 py-1.5 backdrop-blur-md">
          <Link
            href="/"
            className="rounded-full px-4 py-1.5 text-sm font-semibold text-slate-900 dark:text-white transition-all"
          >
            Home
          </Link>
          <a
            href="#features"
            className="rounded-full px-4 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#demo"
            className="rounded-full px-4 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Sandbox
          </a>
          <a
            href="#how-it-works"
            className="rounded-full px-4 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Process
          </a>
          <a
            href="#faq"
            className="rounded-full px-4 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/login"
            className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
          >
            Log In
          </Link>

          <Link
            href={isAuthenticated ? '/chat' : '/login'}
            className="inline-flex items-center justify-center rounded-full transition-all cursor-pointer duration-200 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 px-5 py-2 text-xs sm:text-sm font-medium shadow-md shadow-slate-900/10 dark:shadow-white/5 active:scale-98"
          >
            <span>{isAuthenticated ? 'Open App' : 'Try Free'}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
