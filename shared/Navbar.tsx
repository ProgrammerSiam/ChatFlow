'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import BrandLogo from '@/shared/BrandLogo';

export default function Navbar() {
  const { isAuthenticated } = useAuthStore();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const delta = latest - previous;

    // Track if user scrolled past initial threshold
    if (latest > 40) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Scrolling down past threshold with a smooth delta threshold to avoid jitter
    if (delta > 8 && latest > 120) {
      setHidden(true);
    }
    // Scrolling up with intentional upward gesture -> reveal smoothly
    else if (delta < -8) {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1, scale: 1 },
        hidden: { y: -80, opacity: 0, scale: 0.96 },
      }}
      initial="visible"
      animate={hidden ? 'hidden' : 'visible'}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 30,
        mass: 0.7,
      }}
      className="fixed top-0 left-0 right-0 z-50 w-full px-4 pointer-events-none flex justify-center"
    >
      <motion.div
        layout
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 32,
        }}
        className={`pointer-events-auto flex items-center justify-between transition-all duration-400 ease-out ${
          scrolled
            ? 'w-full max-w-2xl sm:max-w-3xl mt-3 px-4 py-2 rounded-full bg-white/85 dark:bg-slate-950/85 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-lg shadow-purple-500/8 dark:shadow-black/40 ring-1 ring-black/5 dark:ring-white/10'
            : 'w-full max-w-6xl pt-4 pb-2 px-2 bg-transparent'
        }`}
      >
        {/* Brand Logo (Matches UI Design System) */}
        <Link href="/" className="inline-flex shrink-0">
          <BrandLogo prefix="Chat" suffix="Flow" size={scrolled ? 'sm' : 'md'} />
        </Link>

        {/* Centered Segmented Pill Menu */}
        <nav className="hidden md:flex items-center gap-1 rounded-full px-1.5 py-0.5 backdrop-blur-md">
          <Link
            href="/"
            className="rounded-full px-3 py-1 text-[13px] font-semibold text-slate-900 dark:text-white transition-all hover:text-purple-600"
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

        {/* Action Button (Black Base) */}
        <div className="flex items-center shrink-0">
          <Link
            href={isAuthenticated ? '/chat' : '/login'}
            className="inline-flex items-center justify-center rounded-full transition-all cursor-pointer duration-200 bg-slate-950 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 border border-slate-900 dark:border-white px-4.5 py-1.5 text-xs sm:text-[13px] font-semibold shadow-md shadow-slate-950/15 active:scale-95"
          >
            <span>{isAuthenticated ? 'Open App' : 'Try Free'}</span>
          </Link>
        </div>
      </motion.div>
    </motion.header>
  );
}


