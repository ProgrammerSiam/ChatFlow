'use client';

import { useState } from 'react';
import {
  Sparkles,
  Search,
  Users,
  Zap,
  Rocket,
} from 'lucide-react';

interface ProcessStep {
  step: string;
  icon: typeof Sparkles;
  title: string;
  description: string;
  side: 'left' | 'right';
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    icon: Sparkles,
    title: 'Discovery & Auto-Registration',
    description:
      'Enter phone and name. Instant session restoration and token verification via GET /auth/me with zero onboarding friction.',
    side: 'right', // content on right, icon on left
  },
  {
    step: '02',
    icon: Search,
    title: 'Fuzzy User Discovery',
    description:
      'Search teammates with 300ms debouncing, client-side self-exclusion, and instant sidebar cache short-circuiting.',
    side: 'left', // content on left, icon on right
  },
  {
    step: '03',
    icon: Users,
    title: 'Collaborative Group Architecture',
    description:
      'Multi-select team participants and spin up role-gated group channels with admin promotion and member management.',
    side: 'right',
  },
  {
    step: '04',
    icon: Zap,
    title: 'Optimistic UI Dispatch & Retry',
    description:
      'Zero perceived latency with immediate message append, real-time status transitions (sending ➔ sent), and tap-to-retry on network drop.',
    side: 'left',
  },
  {
    step: '05',
    icon: Rocket,
    title: 'Full-Duplex Socket.IO Sync & Auto-Scroll',
    description:
      'Real-time bi-directional streaming, reconnect gap-fill query invalidation, and smart reading position auto-scroll.',
    side: 'right',
  },
];

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState('01');

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-white dark:bg-background overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl space-y-16">
        {/* Top Header (Matches Reference Screenshot) */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-border bg-slate-50 dark:bg-card px-3.5 py-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 shadow-xs">
            <span>004</span>
            <span className="h-1.5 w-1.5 rounded-full bg-slate-900 dark:bg-white" />
            <span className="tracking-widest uppercase">PROCESS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            How We Work
          </h2>

          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
            A proven process designed to transform complex workflows into scalable real-time systems — efficiently and strategically.
          </p>
        </div>

        {/* Vertical Timeline Stepped Process (Matches Reference Screenshot) */}
        <div className="relative pt-6">
          {/* Central Vertical Spine Line */}
          <div className="absolute left-1/2 top-8 bottom-8 -translate-x-1/2 w-0.5 bg-slate-200 dark:bg-slate-800 z-0 hidden md:block" />

          {/* Active Gradient Beam on Top Spine */}
          <div className="absolute left-1/2 top-8 h-32 -translate-x-1/2 w-0.5 bg-gradient-to-b from-purple-500 via-indigo-500 to-transparent z-0 hidden md:block" />

          <div className="space-y-8 md:space-y-12">
            {PROCESS_STEPS.map((item) => {
              const Icon = item.icon;
              const isSelected = activeStep === item.step;
              const isStepOne = item.step === '01';

              return (
                <div
                  key={item.step}
                  onClick={() => setActiveStep(item.step)}
                  className={`relative z-10 transition-all duration-300 cursor-pointer rounded-3xl md:rounded-full ${
                    isStepOne || isSelected
                      ? 'bg-slate-100/90 dark:bg-card/90 shadow-sm border border-slate-200/80 dark:border-border/60 py-4 px-6 md:py-6 md:px-10'
                      : 'hover:bg-slate-50/70 dark:hover:bg-card/40 p-4 md:p-6'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6">
                    {/* Left Column Area */}
                    <div
                      className={`md:col-span-5 flex ${
                        item.side === 'left'
                          ? 'flex-col items-start md:items-end text-left md:text-right'
                          : 'flex-row items-center justify-start md:justify-end gap-3'
                      }`}
                    >
                      {item.side === 'left' ? (
                        <>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm leading-relaxed">
                            {item.description}
                          </p>
                        </>
                      ) : (
                        <div className="flex items-center gap-3">
                          {/* Icon Tile */}
                          <div
                            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-sm transition-transform group-hover:scale-105 ${
                              isStepOne
                                ? 'bg-slate-900 text-white shadow-md'
                                : 'bg-white dark:bg-muted text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-border'
                            }`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          {/* Step Number Badge */}
                          <span className="text-xs font-bold text-slate-400 font-mono">
                            {item.step}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Center Timeline Node */}
                    <div className="hidden md:flex md:col-span-2 items-center justify-center relative">
                      {isStepOne ? (
                        /* Glowing Iridescent Focal Node for Step 1 */
                        <div className="relative flex h-8 w-8 items-center justify-center">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-400 via-pink-400 to-indigo-400 blur-sm opacity-80 animate-pulse" />
                          <div className="relative h-6 w-6 rounded-full bg-slate-900 border-2 border-purple-300 dark:border-purple-600 flex items-center justify-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          </div>
                        </div>
                      ) : (
                        /* Standard Node */
                        <div
                          className={`h-5 w-5 rounded-full border-2 transition-colors ${
                            isSelected
                              ? 'bg-purple-600 border-white dark:border-card shadow-sm'
                              : 'bg-white dark:bg-card border-slate-300 dark:border-slate-700'
                          }`}
                        />
                      )}
                    </div>

                    {/* Right Column Area */}
                    <div
                      className={`md:col-span-5 flex ${
                        item.side === 'right'
                          ? 'flex-col items-start text-left'
                          : 'flex-row items-center justify-start gap-3'
                      }`}
                    >
                      {item.side === 'right' ? (
                        <>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm leading-relaxed">
                            {item.description}
                          </p>
                        </>
                      ) : (
                        <div className="flex items-center gap-3">
                          {/* Step Number Badge */}
                          <span className="text-xs font-bold text-slate-400 font-mono">
                            {item.step}
                          </span>
                          {/* Icon Tile */}
                          <div
                            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-sm transition-transform group-hover:scale-105 ${
                              isSelected
                                ? 'bg-slate-900 text-white shadow-md'
                                : 'bg-white dark:bg-muted text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-border'
                            }`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
