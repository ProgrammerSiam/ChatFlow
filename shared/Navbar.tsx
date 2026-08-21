'use client';

import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function Navbar() {
  const { isAuthenticated } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-6xl">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <MessageCircle className="h-5 w-5" />
          </div>
          <span>ChatFlow</span>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#demo" className="hover:text-foreground transition-colors">
            Live Demo
          </a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">
            How It Works
          </a>
        </nav>

        {/* Action button */}
        <div className="flex items-center gap-3">
          <Link
            href={isAuthenticated ? '/chat' : '/login'}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow transition hover:opacity-90 active:scale-95"
          >
            <span>{isAuthenticated ? 'Open Chat' : 'Sign In'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
