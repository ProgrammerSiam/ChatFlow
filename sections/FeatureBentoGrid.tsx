'use client';

import { ArrowUpRight, Sparkles, Layers, Cpu, ShieldCheck } from 'lucide-react';

export default function FeatureBentoGrid() {
  return (
    <section id="features" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 max-w-6xl space-y-16">
        {/* Split Header (Matches Screenshot 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column Title & Pill Action */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              <span className="text-muted-foreground/45 font-bold">ChatFlow:</span> beyond the chat
            </h2>

            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-full bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/40 px-5 py-2.5 text-xs font-semibold text-purple-700 dark:text-purple-300 shadow-xs hover:bg-purple-200 dark:hover:bg-purple-900/60 transition-colors"
            >
              <span>Explore Functions</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Right Column Editorial Description */}
          <div className="lg:col-span-6 flex items-center">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              ChatFlow is your unified real-time workspace, built to remember, organize, and amplify every conversation. It’s an all-in-one platform where advanced WebSockets meet powerful TanStack caching for ultimate workflow efficiency.
            </p>
          </div>
        </div>

        {/* 3-Column Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Full Memory & History (With Floating Visual Pills) */}
          <div className="group relative rounded-3xl border border-border/80 bg-gradient-to-b from-purple-50/50 via-card to-card dark:from-purple-950/10 dark:via-card dark:to-card p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
            {/* Visual Top Preview with Floating Tags */}
            <div className="relative h-44 w-full rounded-2xl bg-gradient-to-tr from-purple-100 via-pink-50 to-indigo-100 dark:from-purple-950/40 dark:via-indigo-950/30 dark:to-purple-900/20 flex items-center justify-center overflow-hidden border border-border/40 mb-6">
              {/* Organic 3D Abstract Glow */}
              <div className="absolute h-28 w-28 rounded-full bg-gradient-to-tr from-purple-400 via-pink-400 to-indigo-400 blur-xl opacity-60 group-hover:scale-125 transition-transform duration-500" />

              {/* Floating Pill 1 */}
              <div className="absolute top-4 left-6 z-10 flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-card/90 border border-border px-3 py-1 text-[10px] font-bold text-foreground shadow-xs backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                <span>Total archive</span>
              </div>

              {/* Floating Pill 2 */}
              <div className="absolute bottom-5 right-6 z-10 flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-card/90 border border-border px-3 py-1 text-[10px] font-bold text-foreground shadow-xs backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                <span>Cross-Search</span>
              </div>

              <div className="relative z-0 h-16 w-16 rounded-full bg-white/30 dark:bg-white/10 backdrop-blur-md flex items-center justify-center text-purple-600 dark:text-purple-300 shadow-inner">
                <Layers className="h-8 w-8" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-foreground tracking-tight">
                Full Memory & History
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Access a complete history of all direct and group chats, active participants, and messages, ensuring you never lose context or valuable output.
              </p>
            </div>
          </div>

          {/* Card 2: Real-Time Engine & Vault */}
          <div className="group relative rounded-3xl border border-border/80 bg-gradient-to-b from-blue-50/40 via-card to-card dark:from-blue-950/10 dark:via-card dark:to-card p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
            {/* Visual Header */}
            <div className="relative h-44 w-full rounded-2xl bg-gradient-to-tr from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-blue-900/20 flex flex-col items-center justify-center p-6 border border-border/40 mb-6 text-center">
              <div className="h-14 w-14 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 shadow-inner">
                <Cpu className="h-7 w-7" />
              </div>
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                0ms Optimistic Latency
              </span>
              <span className="text-[10px] text-muted-foreground mt-0.5">
                Socket.io Handshake + Zustand Sync
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-foreground tracking-tight">
                Real-Time Engine & Vault
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Access zero-latency Socket.io communication and securely persist your session and chat states with persistent client-side store hydration.
              </p>
            </div>
          </div>

          {/* Card 3: Personal Chat Curator */}
          <div className="group relative rounded-3xl border border-border/80 bg-gradient-to-b from-purple-50/40 via-card to-card dark:from-purple-950/10 dark:via-card dark:to-card p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
            {/* Visual Header */}
            <div className="relative h-44 w-full rounded-2xl bg-gradient-to-tr from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-950/40 dark:via-pink-950/30 dark:to-purple-900/20 flex flex-col items-center justify-center p-6 border border-border/40 mb-6 text-center">
              <div className="h-14 w-14 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 shadow-inner">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400">
                Smart Auto-Curation
              </span>
              <span className="text-[10px] text-muted-foreground mt-0.5">
                Role Gating & Live Sorting
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-foreground tracking-tight">
                Personal Chat Curator
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                ChatFlow organizes conversations, active participant lists, unread counters, and live group admin roles automatically.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Metrics & Architecture Strip (Matches Screenshot 2) */}
        <div className="pt-10 border-t border-border/70 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Large Metric */}
          <div className="space-y-1 text-center lg:text-left">
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              3,572,401,988
            </div>
            <p className="text-xs text-muted-foreground max-w-sm">
              Real-time socket packets processed with sub-10ms delivery across connected clients
            </p>
          </div>

          {/* Right Clean Tech Ecosystem Logos */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-bold text-muted-foreground/80">
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <span className="h-2 w-2 rounded-full bg-purple-500" />
              <span>Socket.IO v4</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span>TanStack Query v5</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span>Zustand</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <span className="h-2 w-2 rounded-full bg-slate-800 dark:bg-slate-200" />
              <span>Next.js 16</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <span className="h-2 w-2 rounded-full bg-cyan-500" />
              <span>React 19</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <span className="h-2 w-2 rounded-full bg-teal-500" />
              <span>Tailwind v4</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
