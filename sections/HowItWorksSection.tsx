'use client';

import React from 'react';
import SectionHeader from '@/shared/SectionHeader';
import { Paperclip, Image, FileText, Send, Sparkles, ChevronDown } from 'lucide-react';

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="font-medium text-slate-900 dark:text-white underline decoration-purple-400/60 dark:decoration-purple-400/80 decoration-[1.5px] underline-offset-4 transition-colors">
    {children}
  </span>
);

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Reusable Section Header */}
        <SectionHeader
          badge="How it works"
          title="How ChatFlow Works"
          description="From idea to result in seconds — choose direct or group channels, ask or upload anything, and collaborate with your team in a private, secure Workspace."
        />

        {/* Outer Bento Grid Wrapper (Matches Features Card Section View) */}
        <div className="bg-slate-50/90 dark:bg-card/50 mx-auto w-full max-w-6xl rounded-[32px] p-2 sm:p-3.5 border border-slate-200/80 dark:border-border/60 shadow-xs">
          <div className="grid gap-3 lg:grid-cols-3">
            
            {/* Card 1: Isometric Stacked Channels */}
            <div className="rounded-[24px] bg-white dark:bg-card group/step relative overflow-hidden p-6 sm:p-7 border border-slate-200/60 dark:border-border/60 transition-all duration-300 shadow-xs hover:shadow-sm hover:border-purple-200/80 dark:hover:border-purple-800/60 flex flex-col justify-between">
              {/* Corner Ambient Gradient Orb */}
              <div
                className="absolute -top-12 -right-12 h-44 w-44 rounded-full blur-2xl transition-opacity duration-300 pointer-events-none opacity-25 group-hover/step:opacity-50"
                style={{
                  background: 'linear-gradient(169deg, #C9C1FF 29.61%, #725CFF 93.52%)',
                }}
              />

              {/* Visual Mockup Container */}
              <div className="relative z-10 mb-6 overflow-hidden rounded-[20px] bg-gradient-to-b from-slate-50 to-purple-50/30 dark:from-card/80 dark:to-purple-950/20 border border-slate-200/50 dark:border-border/50 h-[210px] flex items-center justify-center p-4">
                {/* Purple Cloud Aura (Emanating from Left) */}
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-purple-400/30 blur-3xl pointer-events-none" />

                {/* Isometric Stacked Cards */}
                <div className="relative w-full max-w-[220px] flex flex-col items-center justify-center -space-y-3.5">
                  {/* Layer 1 */}
                  <div className="w-[85%] rounded-2xl bg-white/90 dark:bg-card/90 border border-slate-200/80 dark:border-border p-2.5 shadow-md backdrop-blur-md transform -rotate-6 -translate-y-1 group-hover/step:-translate-y-2 transition-transform duration-300">
                    <div className="flex items-center gap-2">
                      <div className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold text-[9px]">
                        AI
                      </div>
                      <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">Socket.IO Engine</span>
                    </div>
                  </div>

                  {/* Layer 2 (Active) */}
                  <div className="w-[95%] rounded-2xl bg-white dark:bg-card border border-purple-300/80 dark:border-purple-800/80 p-3 shadow-lg shadow-purple-500/10 backdrop-blur-md transform rotate-1 z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-600 text-white font-bold text-[11px] shadow-xs">
                          ⚡
                        </div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">Direct Messaging</span>
                      </div>
                      <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                  </div>

                  {/* Layer 3 */}
                  <div className="w-[88%] rounded-2xl bg-white/80 dark:bg-card/80 border border-slate-200/80 dark:border-border p-2.5 shadow-md backdrop-blur-md transform rotate-6 translate-y-1">
                    <div className="flex items-center gap-2">
                      <div className="flex h-5 w-5 items-center justify-center rounded-md bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 font-bold text-[9px]">
                        👥
                      </div>
                      <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">Group Channels</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & Description with Fancy Highlights */}
              <div className="relative z-10 space-y-2">
                <h3 className="text-lg sm:text-xl font-medium tracking-tight text-slate-900 dark:text-white leading-tight">
                  Pick Your Real-Time Channel
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  Select <Highlight>direct teammate chats</Highlight> or group workspaces with live <Highlight>300ms debounced user search</Highlight>, all in one unified platform.
                </p>
              </div>
            </div>

            {/* Card 2: Floating Chat Composer */}
            <div className="rounded-[24px] bg-white dark:bg-card group/step relative overflow-hidden p-6 sm:p-7 border border-slate-200/60 dark:border-border/60 transition-all duration-300 shadow-xs hover:shadow-sm hover:border-purple-200/80 dark:hover:border-purple-800/60 flex flex-col justify-between">
              {/* Corner Ambient Gradient Orb */}
              <div
                className="absolute -top-12 -right-12 h-44 w-44 rounded-full blur-2xl transition-opacity duration-300 pointer-events-none opacity-25 group-hover/step:opacity-50"
                style={{
                  background: 'linear-gradient(169deg, #C9C1FF 29.61%, #725CFF 93.52%)',
                }}
              />

              {/* Visual Mockup Container */}
              <div className="relative z-10 mb-6 overflow-hidden rounded-[20px] bg-gradient-to-b from-slate-50 to-purple-50/30 dark:from-card/80 dark:to-purple-950/20 border border-slate-200/50 dark:border-border/50 h-[210px] flex flex-col justify-center p-4">
                {/* Purple Cloud Aura (Emanating from Left) */}
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-purple-400/30 blur-3xl pointer-events-none" />

                {/* Composer Card */}
                <div className="relative z-10 w-full rounded-2xl bg-white dark:bg-card border border-slate-200/90 dark:border-border/80 p-3 shadow-md space-y-2.5">
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">
                    Type a message or command...
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-border/50">
                    <div className="flex items-center gap-1.5">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md border border-slate-200/70 text-slate-400">
                        <Paperclip className="h-3 w-3" />
                      </div>
                      
                      {/* Socket Pill */}
                      <div className="inline-flex items-center gap-1 rounded-full border border-purple-200/80 dark:border-purple-800/60 bg-purple-50/80 dark:bg-purple-950/40 px-2 py-0.5 text-[10px] font-semibold text-purple-700 dark:text-purple-300">
                        <Sparkles className="h-2.5 w-2.5 text-purple-600" />
                        <span>Socket 4.8</span>
                        <ChevronDown className="h-2.5 w-2.5 opacity-60" />
                      </div>
                    </div>

                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xs">
                      <Send className="h-3 w-3" />
                    </div>
                  </div>
                </div>

                {/* Action Chips */}
                <div className="relative z-10 flex items-center gap-1.5 pt-2 overflow-x-auto">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/90 dark:bg-card/90 border border-slate-200/80 dark:border-border/80 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap shadow-2xs">
                    <Image className="h-2.5 w-2.5 text-purple-500" />
                    <span>Upload Assets</span>
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/90 dark:bg-card/90 border border-slate-200/80 dark:border-border/80 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap shadow-2xs">
                    <FileText className="h-2.5 w-2.5 text-indigo-500" />
                    <span>Share Docs</span>
                  </span>
                </div>
              </div>

              {/* Title & Description with Fancy Highlights */}
              <div className="relative z-10 space-y-2">
                <h3 className="text-lg sm:text-xl font-medium tracking-tight text-slate-900 dark:text-white leading-tight">
                  Ask or Send Anything
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  Type messages, share updates, or drop files in any channel. ChatFlow delivers <Highlight>instant optimistic rendering</Highlight> with 0ms lag.
                </p>
              </div>
            </div>

            {/* Card 3: Chat Bubble & Result */}
            <div className="rounded-[24px] bg-white dark:bg-card group/step relative overflow-hidden p-6 sm:p-7 border border-slate-200/60 dark:border-border/60 transition-all duration-300 shadow-xs hover:shadow-sm hover:border-purple-200/80 dark:hover:border-purple-800/60 flex flex-col justify-between">
              {/* Corner Ambient Gradient Orb */}
              <div
                className="absolute -top-12 -right-12 h-44 w-44 rounded-full blur-2xl transition-opacity duration-300 pointer-events-none opacity-25 group-hover/step:opacity-50"
                style={{
                  background: 'linear-gradient(169deg, #C9C1FF 29.61%, #725CFF 93.52%)',
                }}
              />

              {/* Visual Mockup Container */}
              <div className="relative z-10 mb-6 overflow-hidden rounded-[20px] bg-gradient-to-b from-slate-50 to-purple-50/30 dark:from-card/80 dark:to-purple-950/20 border border-slate-200/50 dark:border-border/50 h-[210px] flex flex-col justify-center gap-2 p-4">
                {/* Purple Cloud Aura (Emanating from Left) */}
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-purple-400/30 blur-3xl pointer-events-none" />

                {/* Prompt Bubble */}
                <div className="relative z-10 self-end max-w-[90%] rounded-2xl bg-white dark:bg-card border border-purple-200/80 dark:border-purple-800/80 px-3 py-1.5 text-[11px] font-medium text-slate-800 dark:text-slate-200 shadow-xs">
                  Synchronize this channel for team sprint.
                </div>

                {/* Sync Card */}
                <div className="relative z-10 w-full rounded-2xl bg-white/95 dark:bg-card/95 border border-slate-200/90 dark:border-border/80 p-2.5 shadow-md space-y-1">
                  <div className="flex items-center gap-1.5">
                    <div className="flex h-4.5 w-4.5 items-center justify-center rounded-md bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold text-[9px]">
                      ⚡
                    </div>
                    <span className="text-[10px] font-bold text-slate-900 dark:text-white">ChatFlow Sync Engine</span>
                  </div>

                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">
                    Channel synchronized with 0ms optimistic delivery and active WebSocket connections.
                  </p>

                  <div className="flex items-center justify-between pt-0.5 text-[9px] text-slate-400">
                    <span>Active • 0ms</span>
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">✓✓ Delivered</span>
                  </div>
                </div>
              </div>

              {/* Title & Description with Fancy Highlights */}
              <div className="relative z-10 space-y-2">
                <h3 className="text-lg sm:text-xl font-medium tracking-tight text-slate-900 dark:text-white leading-tight">
                  Collaborate and Share Results
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  Get instant synchronization in a <Highlight>private, secure Workspace</Highlight>. Manage roles, assign admins, and collaborate seamlessly.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
