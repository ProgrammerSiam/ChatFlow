'use client';

import React from 'react';
import Image from 'next/image';
import SectionHeader from '@/shared/SectionHeader';
import {
  Layers,
  Sparkles,
  CheckCheck,
  ShieldCheck,
} from 'lucide-react';

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="font-semibold text-slate-900 dark:text-white transition-colors">
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
          badgeIcon={<Layers className="size-3 text-purple-600 dark:text-purple-400" />}
          title={
            <>
              How{' '}
              <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-xl bg-gradient-to-r from-[#8E7CFF] to-[#725CFF] text-white shadow-xs align-middle leading-tight">
                ChatFlow Works
              </span>
            </>
          }
          description="From instant phone login to real-time collaboration in seconds — pick direct or group channels, send expressive messages with GIFs & emoji reactions, and manage channels with admin controls."
        />

        {/* Outer Bento Grid Wrapper (Matches Features Card Section View) */}
        <div className="bg-slate-50/90 dark:bg-card/50 mx-auto w-full max-w-6xl rounded-[32px] p-2 sm:p-3.5 border border-slate-200/80 dark:border-border/60 shadow-xs">
          <div className="grid gap-3 lg:grid-cols-3">
            
            {/* Step 1: Instant Zero-Password Phone Login */}
            <div className="rounded-[24px] bg-white dark:bg-card group/step relative overflow-hidden p-6 sm:p-7 border border-slate-200/60 dark:border-border/60 transition-all duration-300 shadow-xs hover:shadow-sm hover:border-purple-200/80 dark:hover:border-purple-800/60 flex flex-col">
              {/* Corner Ambient Gradient Orb */}
              <div
                className="absolute -top-12 -right-12 h-44 w-44 rounded-full blur-2xl transition-opacity duration-300 pointer-events-none opacity-25 group-hover/step:opacity-50"
                style={{
                  background: 'linear-gradient(169deg, #C9C1FF 29.61%, #725CFF 93.52%)',
                }}
              />

              {/* Step Badge */}
              <div className="relative z-10 flex items-center mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-slate-200/90 dark:border-border/80 shadow-2xs backdrop-blur-md">
                  <span className="flex size-4.5 items-center justify-center rounded-full bg-gradient-to-r from-[#8E7CFF] to-[#725CFF] text-white font-mono text-[10px] font-bold shadow-2xs">
                    1
                  </span>
                  <span className="text-[11px] font-mono font-bold tracking-wider text-slate-800 dark:text-slate-200 uppercase">
                    Step 01
                  </span>
                </div>
              </div>

              {/* Step 1 Real Image Preview */}
              <div className="relative z-10 mb-5 overflow-hidden rounded-[20px] bg-slate-100 dark:bg-zinc-900 border border-slate-200/70 dark:border-border/70 h-[200px] w-full flex items-center justify-center p-1.5 shadow-inner group-hover/step:scale-[1.02] transition-transform duration-300">
                <div className="relative w-full h-full rounded-[14px] overflow-hidden">
                  <Image
                    src="/assets/loginflow.png"
                    alt="ChatFlow Instant Phone Login Screen"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top select-none rounded-[14px]"
                  />
                </div>
              </div>

              {/* Title & Description (Strict 1-Line Title & 3-Line Description) */}
              <div className="relative z-10 flex flex-col flex-1">
                <h3 className="text-lg sm:text-xl font-medium tracking-tight text-slate-900 dark:text-white leading-tight truncate">
                  Instant Phone Authentication
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal mt-2 line-clamp-3">
                  Enter your phone and name to log in. Accounts are <Highlight>auto-registered on first visit</Highlight> and secured with stateless JWT tokens — no password required.
                </p>
              </div>
            </div>

            {/* Step 2: Global Teammate Discovery */}
            <div className="rounded-[24px] bg-white dark:bg-card group/step relative overflow-hidden p-6 sm:p-7 border border-slate-200/60 dark:border-border/60 transition-all duration-300 shadow-xs hover:shadow-sm hover:border-purple-200/80 dark:hover:border-purple-800/60 flex flex-col">
              {/* Corner Ambient Gradient Orb */}
              <div
                className="absolute -top-12 -right-12 h-44 w-44 rounded-full blur-2xl transition-opacity duration-300 pointer-events-none opacity-25 group-hover/step:opacity-50"
                style={{
                  background: 'linear-gradient(169deg, #C9C1FF 29.61%, #725CFF 93.52%)',
                }}
              />

              {/* Step Badge */}
              <div className="relative z-10 flex items-center mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-slate-200/90 dark:border-border/80 shadow-2xs backdrop-blur-md">
                  <span className="flex size-4.5 items-center justify-center rounded-full bg-gradient-to-r from-[#8E7CFF] to-[#725CFF] text-white font-mono text-[10px] font-bold shadow-2xs">
                    2
                  </span>
                  <span className="text-[11px] font-mono font-bold tracking-wider text-slate-800 dark:text-slate-200 uppercase">
                    Step 02
                  </span>
                </div>
              </div>

              {/* Step 2 Real Image Preview */}
              <div className="relative z-10 mb-5 overflow-hidden rounded-[20px] bg-slate-100 dark:bg-zinc-900 border border-slate-200/70 dark:border-border/70 h-[200px] w-full flex items-center justify-center p-1.5 shadow-inner group-hover/step:scale-[1.02] transition-transform duration-300">
                <div className="relative w-full h-full rounded-[14px] overflow-hidden">
                  <Image
                    src="/assets/newchat.png"
                    alt="ChatFlow Channel and Teammate Discovery"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top select-none rounded-[14px]"
                  />
                </div>
              </div>

              {/* Title & Description (Strict 1-Line Title & 3-Line Description) */}
              <div className="relative z-10 flex flex-col flex-1">
                <h3 className="text-lg sm:text-xl font-medium tracking-tight text-slate-900 dark:text-white leading-tight truncate">
                  Global Teammate Discovery
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal mt-2 line-clamp-3">
                  Find teammates by phone or name with <Highlight>300ms debounced search</Highlight> and open existing direct or <Highlight>group channels</Highlight> instantly.
                </p>
              </div>
            </div>

            {/* Step 3: Multi-Member Group Creation */}
            <div className="rounded-[24px] bg-white dark:bg-card group/step relative overflow-hidden p-6 sm:p-7 border border-slate-200/60 dark:border-border/60 transition-all duration-300 shadow-xs hover:shadow-sm hover:border-purple-200/80 dark:hover:border-purple-800/60 flex flex-col">
              {/* Corner Ambient Gradient Orb */}
              <div
                className="absolute -top-12 -right-12 h-44 w-44 rounded-full blur-2xl transition-opacity duration-300 pointer-events-none opacity-25 group-hover/step:opacity-50"
                style={{
                  background: 'linear-gradient(169deg, #C9C1FF 29.61%, #725CFF 93.52%)',
                }}
              />

              {/* Step Badge */}
              <div className="relative z-10 flex items-center mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-slate-200/90 dark:border-border/80 shadow-2xs backdrop-blur-md">
                  <span className="flex size-4.5 items-center justify-center rounded-full bg-gradient-to-r from-[#8E7CFF] to-[#725CFF] text-white font-mono text-[10px] font-bold shadow-2xs">
                    3
                  </span>
                  <span className="text-[11px] font-mono font-bold tracking-wider text-slate-800 dark:text-slate-200 uppercase">
                    Step 03
                  </span>
                </div>
              </div>

              {/* Step 3 Real Image Preview */}
              <div className="relative z-10 mb-5 overflow-hidden rounded-[20px] bg-slate-100 dark:bg-zinc-900 border border-slate-200/70 dark:border-border/70 h-[200px] w-full flex items-center justify-center p-1.5 shadow-inner group-hover/step:scale-[1.02] transition-transform duration-300">
                <div className="relative w-full h-full rounded-[14px] overflow-hidden">
                  <Image
                    src="/assets/grpflow.png"
                    alt="ChatFlow Group Creation and Member Multi-Select"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top select-none rounded-[14px]"
                  />
                </div>
              </div>

              {/* Title & Description (Strict 1-Line Title & 3-Line Description) */}
              <div className="relative z-10 flex flex-col flex-1">
                <h3 className="text-lg sm:text-xl font-medium tracking-tight text-slate-900 dark:text-white leading-tight truncate">
                  Multi-Member Group Creation
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal mt-2 line-clamp-3">
                  Name your group, pick teammates, and launch a <Highlight>collaborative workspace</Highlight> with full <Highlight>admin controls</Highlight> in seconds.
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Large Card: Step 04 Continuous Sync & Workspace Navigation */}
          <div className="mt-3 rounded-[24px] bg-white dark:bg-card group/step relative overflow-hidden p-6 sm:p-8 border border-slate-200/60 dark:border-border/60 transition-all duration-300 shadow-xs hover:shadow-sm hover:border-purple-200/80 dark:hover:border-purple-800/60">
            {/* Corner Ambient Gradient Orb */}
            <div
              className="absolute -top-16 -right-16 h-56 w-56 rounded-full blur-3xl transition-opacity duration-300 pointer-events-none opacity-25 group-hover/step:opacity-50"
              style={{
                background: 'linear-gradient(169deg, #C9C1FF 29.61%, #725CFF 93.52%)',
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Editorial Content */}
              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center mb-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-slate-200/90 dark:border-border/80 shadow-2xs backdrop-blur-md">
                    <span className="flex size-4.5 items-center justify-center rounded-full bg-gradient-to-r from-[#8E7CFF] to-[#725CFF] text-white font-mono text-[10px] font-bold shadow-2xs">
                      4
                    </span>
                    <span className="text-[11px] font-mono font-bold tracking-wider text-slate-800 dark:text-slate-200 uppercase">
                      Step 04 • Continuous Sync
                    </span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-slate-900 dark:text-white leading-tight truncate">
                  Always Synchronized Workspace
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  Stay in sync with <Highlight>real-time unread badges</Highlight>, instant message delivery, and <Highlight>auto-reconnection</Highlight> across every browser and device.
                </p>
              </div>

              {/* Right Visual Image Container for Step 04 */}
              <div className="lg:col-span-6 w-full">
                <div className="relative overflow-hidden rounded-[20px] bg-slate-100 dark:bg-zinc-900 border border-slate-200/70 dark:border-border/70 h-[240px] sm:h-[260px] flex items-center justify-center p-2 shadow-inner group-hover/step:scale-[1.01] transition-transform duration-300">
                  <div className="relative w-full h-full rounded-[14px] overflow-hidden">
                    <Image
                      src="/assets/chatflow.png"
                      alt="ChatFlow Real-Time Workspace and Channels"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-top select-none rounded-[14px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
