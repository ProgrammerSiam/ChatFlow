'use client';

import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function Navbar() {
  const { isAuthenticated } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full pt-4 pb-2 px-4">
      <div className="container mx-auto flex items-center justify-between max-w-6xl">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-extrabold text-xl tracking-tight text-foreground">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <span>ChatFlow</span>
        </Link>

        {/* Centered Segmented Pill Menu */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-purple-200/50 dark:border-purple-800/40 bg-white/70 dark:bg-card/70 px-2 py-1.5 shadow-sm backdrop-blur-xl">
          <Link
            href="/"
            className="rounded-full bg-white dark:bg-muted px-4 py-1.5 text-xs font-semibold text-foreground shadow-xs transition"
          >
            Home
          </Link>
          <a
            href="#about"
            className="rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </a>
          <a
            href="#features"
            className="rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#demo"
            className="rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Sandbox
          </a>
          <a
            href="#how-it-works"
            className="rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            How it Works
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden sm:inline-block text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Log In
          </Link>

          <Link
            href={isAuthenticated ? '/chat' : '/login'}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 px-5 py-2 text-xs font-semibold text-white shadow-md shadow-purple-500/25 transition-all hover:opacity-95 hover:shadow-purple-500/35 active:scale-95"
          >
            <span>{isAuthenticated ? 'Open Chat' : 'Try for Free'}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
