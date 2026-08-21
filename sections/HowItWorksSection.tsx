'use client';

import SectionHeader from '@/shared/SectionHeader';
import { Paperclip, SlidersHorizontal, Image, FileText, Send, CheckCheck, Sparkles, ChevronDown } from 'lucide-react';

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-background border-t border-slate-200/60 dark:border-border/40">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Reusable Section Header */}
        <SectionHeader
          badge="How it works"
          title="How ChatFlow Works"
          description="From idea to result in seconds — choose direct or group channels, ask or upload anything, and collaborate with your team in a private, secure Workspace."
        />

        {/* 3-Card Grid (Matches User Screenshot) */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10 sm:mt-14">
          
          {/* Card 1: Isometric Stacked Channels */}
          <div className="flex flex-col justify-between group">
            {/* Visual Container */}
            <div className="relative z-10 mb-6 overflow-hidden rounded-[28px] p-2 bg-slate-50 dark:bg-card/50 border border-slate-200/80 dark:border-border/60 shadow-xs transition-all duration-300 group-hover:shadow-xl group-hover:border-purple-300/80">
              <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-b from-slate-50 to-purple-50/40 dark:from-card dark:to-purple-950/20 h-[220px] flex items-center justify-center p-6">
                
                {/* Purple Cloud Aura (Emanating from Left) */}
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-purple-400/35 blur-3xl pointer-events-none" />

                {/* Isometric Stacked Cards */}
                <div className="relative w-full max-w-[240px] flex flex-col items-center justify-center -space-y-4">
                  {/* Layer 1 (Top) */}
                  <div className="w-[85%] rounded-2xl bg-white/90 dark:bg-card/90 border border-slate-200/80 dark:border-border p-3 shadow-md backdrop-blur-md transform -rotate-6 -translate-y-2 hover:-translate-y-3 transition-transform">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold text-[10px]">
                        AI
                      </div>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Socket.IO Engine</span>
                    </div>
                  </div>

                  {/* Layer 2 (Middle - Active Highlight) */}
                  <div className="w-[95%] rounded-2xl bg-white dark:bg-card border border-purple-300/80 dark:border-purple-800/80 p-3.5 shadow-xl shadow-purple-500/10 backdrop-blur-md transform rotate-1 z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-600 text-white font-bold text-xs shadow-sm">
                          ⚡
                        </div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">Direct Messaging</span>
                      </div>
                      <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                  </div>

                  {/* Layer 3 (Bottom) */}
                  <div className="w-[88%] rounded-2xl bg-white/80 dark:bg-card/80 border border-slate-200/80 dark:border-border p-3 shadow-md backdrop-blur-md transform 6 rotate-6 translate-y-2">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 font-bold text-[10px]">
                        👥
                      </div>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Group Channels</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-slate-900 dark:text-white text-lg sm:text-xl font-medium tracking-[-0.2px] leading-tight">
                Pick Your Real-Time Channel
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-normal">
                Select direct teammate chats or group workspaces with live 300ms debounced user search, all in one unified platform.
              </p>
            </div>
          </div>

          {/* Card 2: Floating Chat Composer */}
          <div className="flex flex-col justify-between group">
            {/* Visual Container */}
            <div className="relative z-10 mb-6 overflow-hidden rounded-[28px] p-2 bg-slate-50 dark:bg-card/50 border border-slate-200/80 dark:border-border/60 shadow-xs transition-all duration-300 group-hover:shadow-xl group-hover:border-purple-300/80">
              <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-b from-slate-50 to-purple-50/40 dark:from-card dark:to-purple-950/20 h-[220px] flex flex-col justify-center p-4">
                
                {/* Purple Cloud Aura (Emanating from Left) */}
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-purple-400/35 blur-3xl pointer-events-none" />

                {/* Chat Composer Box */}
                <div className="relative z-10 w-full rounded-2xl bg-white dark:bg-card border border-slate-200/90 dark:border-border/80 p-3.5 shadow-lg shadow-purple-500/5 space-y-3">
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-normal">
                    Type a message or command...
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-border/50">
                    <div className="flex items-center gap-1.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg border text-slate-400 hover:text-slate-600 dark:text-slate-500">
                        <Paperclip className="h-3.5 w-3.5" />
                      </div>
                      
                      {/* Channel Pill Selector */}
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-200/80 dark:border-purple-800/60 bg-purple-50/80 dark:bg-purple-950/40 px-2.5 py-1 text-[11px] font-semibold text-purple-700 dark:text-purple-300">
                        <Sparkles className="h-3 w-3 text-purple-600" />
                        <span>Socket 4.8</span>
                        <ChevronDown className="h-3 w-3 opacity-60" />
                      </div>
                    </div>

                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs">
                      <Send className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>

                {/* Bottom Quick Action Chips */}
                <div className="relative z-10 flex items-center gap-1.5 pt-2.5 overflow-x-auto">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/80 dark:bg-card/80 border border-slate-200/80 dark:border-border/80 px-2.5 py-1 text-[10px] font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap shadow-2xs">
                    <Image className="h-3 w-3 text-purple-500" />
                    <span>Upload Assets</span>
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/80 dark:bg-card/80 border border-slate-200/80 dark:border-border/80 px-2.5 py-1 text-[10px] font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap shadow-2xs">
                    <FileText className="h-3 w-3 text-indigo-500" />
                    <span>Share Docs</span>
                  </span>
                </div>

              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-slate-900 dark:text-white text-lg sm:text-xl font-medium tracking-[-0.2px] leading-tight">
                Ask or Send Anything
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-normal">
                Type messages, share updates, or drop files in any channel. ChatFlow delivers instant optimistic rendering with 0ms lag.
              </p>
            </div>
          </div>

          {/* Card 3: Chat Bubble & Summary Result */}
          <div className="flex flex-col justify-between group">
            {/* Visual Container */}
            <div className="relative z-10 mb-6 overflow-hidden rounded-[28px] p-2 bg-slate-50 dark:bg-card/50 border border-slate-200/80 dark:border-border/60 shadow-xs transition-all duration-300 group-hover:shadow-xl group-hover:border-purple-300/80">
              <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-b from-slate-50 to-purple-50/40 dark:from-card dark:to-purple-950/20 h-[220px] flex flex-col justify-center gap-2.5 p-4">
                
                {/* Purple Cloud Aura (Emanating from Left) */}
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-purple-400/35 blur-3xl pointer-events-none" />

                {/* Outgoing Prompt Bubble */}
                <div className="relative z-10 self-end max-w-[88%] rounded-2xl bg-white dark:bg-card border border-purple-200/80 dark:border-purple-800/80 px-3.5 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 shadow-sm">
                  Synchronize this channel for team sprint.
                </div>

                {/* Response / Delivery Card */}
                <div className="relative z-10 w-full rounded-2xl bg-white/95 dark:bg-card/95 border border-slate-200/90 dark:border-border/80 p-3 shadow-lg shadow-purple-500/5 space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="flex h-5 w-5 items-center justify-center rounded-md bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold text-[9px]">
                      ⚡
                    </div>
                    <span className="text-[11px] font-bold text-slate-900 dark:text-white">ChatFlow Sync Engine</span>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Channel synchronized with 0ms optimistic delivery and active WebSocket connections across all clients.
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400 dark:text-slate-500">
                    <span>Active • 0ms</span>
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">✓✓ Delivered</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-slate-900 dark:text-white text-lg sm:text-xl font-medium tracking-[-0.2px] leading-tight">
                Collaborate and Share Results
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-normal">
                Get instant synchronization in a private, secure Workspace. Manage roles, assign admins, and collaborate seamlessly.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
