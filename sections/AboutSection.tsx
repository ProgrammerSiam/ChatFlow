'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function AboutSection() {
  const { isAuthenticated } = useAuthStore();

  return (
    <section id="about" className="py-20 md:py-28 bg-white dark:bg-background">
      <div className="container mx-auto px-4 max-w-6xl space-y-14">
        {/* Top Two-Column Split Header (Matches Reference Screenshot) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Title & Pill Action */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.12]">
              <span className="text-slate-400 dark:text-slate-500 font-medium">ChatFlow:</span>{' '}
              <span className="text-slate-900 dark:text-white">beyond the chat</span>
            </h2>

            <div>
              <Link
                href={isAuthenticated ? '/chat' : '/login'}
                className="inline-flex items-center gap-2 rounded-full bg-purple-100 dark:bg-purple-950/70 border border-purple-200/70 dark:border-purple-800/50 px-5 py-2.5 text-xs font-semibold text-purple-700 dark:text-purple-300 shadow-xs hover:bg-purple-200 dark:hover:bg-purple-900/80 transition-colors"
              >
                <span>Explore Functions</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Editorial Paragraph */}
          <div className="lg:col-span-6 flex items-center">
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              ChatFlow is your unified real-time workspace, built to remember, organize, and amplify every conversation. It’s an all-in-one platform where advanced WebSockets meet powerful client-side state caching for ultimate workflow efficiency.
            </p>
          </div>
        </div>

        {/* 3-Column Card Layout (Matches Reference Screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: Full Memory & History (Wide card with 3D abstract visual and floating tags) */}
          <div className="md:col-span-12 lg:col-span-5 rounded-[32px] bg-gradient-to-br from-purple-50/70 via-slate-50 to-purple-50/40 dark:from-purple-950/20 dark:via-card dark:to-purple-950/10 border border-slate-200/70 dark:border-border/60 p-7 shadow-xs flex flex-col justify-between relative overflow-hidden group">
            {/* Top Area: Title & Interactive 3D Coral/Plush Mockup with Floating Pins */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Full Memory & History
              </h3>

              {/* 3D Plush/Texture Art Graphic with Floating Annotation Tags */}
              <div className="relative mt-4 h-48 w-full flex items-center justify-center">
                {/* Organic Textured Background Shapes */}
                <div className="absolute right-2 top-2 h-32 w-32 rounded-full bg-gradient-to-tr from-purple-400/30 via-pink-400/20 to-indigo-400/30 blur-2xl pointer-events-none" />

                {/* Simulated 3D Plush sculpture */}
                <div className="relative flex flex-col items-center">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-purple-300 via-pink-200 to-indigo-300 shadow-md border-4 border-white/60 dark:border-white/10 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                    <div className="h-12 w-12 rounded-full bg-white/40 backdrop-blur-sm" />
                  </div>
                  <div className="h-14 w-12 rounded-2xl bg-gradient-to-b from-indigo-300 to-purple-400 shadow-sm -mt-2 -rotate-12" />
                </div>

                {/* Floating Tag 1: Total Archive */}
                <div className="absolute top-8 left-4 z-10 flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-card/90 border border-slate-200/80 dark:border-border px-3 py-1 text-[10px] font-bold text-slate-800 dark:text-slate-200 shadow-sm backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-900 dark:bg-white" />
                  <span>Total archive</span>
                </div>

                {/* Floating Tag 2: Cross-Search */}
                <div className="absolute bottom-6 right-6 z-10 flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-card/90 border border-slate-200/80 dark:border-border px-3 py-1 text-[10px] font-bold text-slate-800 dark:text-slate-200 shadow-sm backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-900 dark:bg-white" />
                  <span>Cross-Search</span>
                </div>
              </div>
            </div>

            {/* Bottom Card Description */}
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-3">
              Access a complete history of all chats, shared media, and files, ensuring you never lose context or valuable output.
            </p>
          </div>

          {/* Card 2: AI Library & Vault (Clean Minimalist Card) */}
          <div className="md:col-span-6 lg:col-span-3.5 rounded-[32px] bg-slate-50/80 dark:bg-card/80 border border-slate-200/70 dark:border-border/60 p-7 shadow-xs flex flex-col justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Real-Time Library & Vault
            </h3>

            <div className="py-12 flex items-center justify-center">
              <div className="h-16 w-16 rounded-2xl bg-purple-100/80 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 flex items-center justify-center font-mono text-xs font-bold shadow-inner">
                &lt;/&gt;
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Access specialized real-time channels and securely synchronize your conversation caches and session tokens.
            </p>
          </div>

          {/* Card 3: Personal AI Curator (Clean Minimalist Card) */}
          <div className="md:col-span-6 lg:col-span-3.5 rounded-[32px] bg-slate-50/80 dark:bg-card/80 border border-slate-200/70 dark:border-border/60 p-7 shadow-xs flex flex-col justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Personal Conversation Curator
            </h3>

            <div className="py-12 flex items-center justify-center">
              <div className="h-16 w-16 rounded-2xl bg-indigo-100/80 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold text-base shadow-inner">
                ✦
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              ChatFlow organizes conversations, projects, group member permissions, and assets automatically.
            </p>
          </div>
        </div>

        {/* Bottom Metric & Partner / Ecosystem Strip (Matches Reference Screenshot) */}
        <div className="pt-10 border-t border-slate-200/80 dark:border-border/60 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Side Metric */}
          <div className="space-y-1 text-center lg:text-left">
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              3,572,401,988
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
              Data points analyzed from industry reports and real-time feeds
            </p>
          </div>

          {/* Right Side Partner / Technology Logos */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10 text-sm font-bold text-slate-400 dark:text-slate-500 tracking-tight">
            <div className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors cursor-default">
              <span className="font-extrabold text-base">◉</span>
              <span>Operate</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors cursor-default">
              <span className="font-extrabold text-base">▲</span>
              <span>Hyperaide</span>
            </div>
            <div className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors cursor-default">
              <span className="font-bold text-base">birk</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors cursor-default">
              <span className="font-mono text-sm font-bold">⊞</span>
              <span>Default</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors cursor-default">
              <span className="font-mono text-xs font-black tracking-widest">H</span>
              <span className="text-xs uppercase tracking-wider font-extrabold">BETTER-AUTH</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
