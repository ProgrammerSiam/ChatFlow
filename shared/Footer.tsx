'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Sparkles,
  Twitter,
  Instagram,
  Youtube,
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
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Discord"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
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
