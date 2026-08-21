'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import BrandLogo from '@/shared/BrandLogo';

export default function Navbar() {
  const { isAuthenticated } = useAuthStore();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // Track if user scrolled past initial threshold for glassmorphism styling
    if (latest > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Scrolling down past threshold -> hide navbar
    if (latest > previous && latest > 100) {
      setHidden(true);
    }
    // Scrolling up -> instantly reveal navbar with spring animation
    else if (latest < previous) {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 w-full px-4 transition-all duration-300 ${
        scrolled
          ? 'py-2.5 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800/70 shadow-sm'
          : 'pt-4 pb-2 bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between max-w-6xl">
        {/* Brand Logo (Matches UI Design System) */}
        <Link href="/" className="inline-flex">
          <BrandLogo prefix="Chat" suffix="Flow" />
        </Link>

        {/* Centered Segmented Pill Menu */}
        <nav className="hidden md:flex items-center gap-1 rounded-full px-1.5 py-1 backdrop-blur-md">
          <Link
            href="/"
            className="rounded-full px-3 py-1 text-[13px] font-semibold text-slate-900 dark:text-white transition-all"
          >
            Home
          </Link>
          <a
            href="#features"
            className="rounded-full px-3 py-1 text-[13px] font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#demo"
            className="rounded-full px-3 py-1 text-[13px] font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Sandbox
          </a>
          <a
            href="#how-it-works"
            className="rounded-full px-3 py-1 text-[13px] font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Process
          </a>
          <a
            href="#faq"
            className="rounded-full px-3 py-1 text-[13px] font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Action Button (Single Button) */}
        <div className="flex items-center">
          <Link
            href={isAuthenticated ? '/chat' : '/login'}
            className="inline-flex items-center justify-center rounded-full transition-all cursor-pointer duration-200 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 px-5 py-2 text-xs sm:text-sm font-medium shadow-md shadow-slate-900/10 dark:shadow-white/5 active:scale-98"
          >
            <span>{isAuthenticated ? 'Open App' : 'Try Free'}</span>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

