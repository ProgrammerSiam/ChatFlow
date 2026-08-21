'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Sparkles,
  Globe,
  MessageCircle,
} from 'lucide-react';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success('Thank you for subscribing to ChatFlow updates!');
    setEmail('');
  };

  return (
    <footer className="w-full px-2 sm:px-4 pb-4 pt-12">
      <div className="container mx-auto max-w-6xl rounded-[40px] sm:rounded-[48px] bg-slate-950 text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
        {/* Subtle Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 -z-0 h-64 w-64 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />

        {/* Top Section */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12">
          {/* Left Column: Brand, Stay Updated, & Newsletter Input */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white border border-white/15 backdrop-blur shadow-sm">
                <Sparkles className="h-5 w-5 text-purple-400" />
              </div>
            </Link>

            <div className="space-y-4">
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Stay updated
              </h3>

              {/* Email Pill Input with Arrow Button */}
              <form
                onSubmit={handleSubscribe}
                className="flex items-center rounded-full border border-white/20 bg-white/5 p-1.5 focus-within:border-purple-400 max-w-sm transition-colors backdrop-blur-md"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full bg-transparent px-4 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  title="Subscribe"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-300 hover:bg-purple-200 text-slate-950 font-bold transition-transform active:scale-95 shadow-sm"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: 3 Link Categorized Lists */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            {/* Features Links */}
            <div className="space-y-3.5">
              <p className="font-bold text-slate-300 text-sm tracking-tight">Features</p>
              <ul className="space-y-2.5 text-slate-400">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Total knowledge recall
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    Full-duplex socket sync
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Reverse scroll pagination
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    Certified data security
                  </a>
                </li>
                <li>
                  <a href="#demo" className="hover:text-white transition-colors">
                    Interactive sandbox
                  </a>
                </li>
                <li className="pt-1">
                  <a
                    href="#features"
                    className="inline-flex items-center gap-1 font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <span>View all</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div className="space-y-3.5">
              <p className="font-bold text-slate-300 text-sm tracking-tight">Company</p>
              <ul className="space-y-2.5 text-slate-400">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Architecture
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-white transition-colors">
                    Workflow
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="https://frontend-task-chatapp.onrender.com/docs"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    API Docs
                  </a>
                </li>
                <li>
                  <a href="#demo" className="hover:text-white transition-colors">
                    Live Demo
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div className="space-y-3.5 col-span-2 sm:col-span-1">
              <p className="font-bold text-slate-300 text-sm tracking-tight">Resources</p>
              <ul className="space-y-2.5 text-slate-400">
                <li>
                  <a
                    href="https://frontend-task-chatapp.onrender.com/docs"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Security & Login
                  </Link>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-white transition-colors">
                    Tutorial
                  </a>
                </li>
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Terms & Health
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Middle Row: Social Icons & Copyright */}
        <div className="relative z-10 pt-6 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          {/* Social Icons */}
          <div className="flex items-center gap-5">
            {/* X / Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* Discord */}
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Discord"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
            </a>

            {/* Web */}
            <a
              href="https://frontend-task-chatapp.onrender.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Website"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Globe className="h-4 w-4" />
            </a>
          </div>

          {/* Copyright Tag */}
          <div className="text-xs text-slate-500 font-medium">
            © ChatFlow 2026
          </div>
        </div>

        {/* Gigantic Outlined Watermark Typography (Matches Cortex Reference) */}
        <div className="relative -mb-10 sm:-mb-14 lg:-mb-20 pt-6 select-none pointer-events-none overflow-hidden text-center">
          <span className="block font-black text-transparent text-[80px] sm:text-[140px] md:text-[180px] lg:text-[230px] tracking-tight leading-none opacity-25 [-webkit-text-stroke:1.5px_rgba(255,255,255,0.25)]">
            ChatFlow
          </span>
        </div>
      </div>
    </footer>
  );
}
