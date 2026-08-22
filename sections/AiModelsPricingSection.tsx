'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BadgePill from '@/shared/BadgePill';
import { Cpu, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function AiModelsPricingSection() {
  const { isAuthenticated } = useAuthStore();

  return (
    <section
      id="tech-stack"
      className="relative px-4 py-16 sm:py-20 md:py-28 overflow-hidden bg-white dark:bg-background"
      aria-labelledby="tech-stack-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-slate-50/70 dark:bg-zinc-950/60 p-6 sm:p-12 lg:p-16 backdrop-blur-xl ">
          {/* Top Pill & Headline */}
          <div className="relative z-10 mx-auto mb-10 flex max-w-2xl flex-col items-center gap-4 text-center sm:mb-14">
            <BadgePill
              icon={
                <Cpu className="size-3 text-purple-600 dark:text-purple-400" />
              }
              label="Modern Tech Stack"
            />

            <h2
              id="tech-stack-heading"
              className="text-slate-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-medium tracking-[-1.5px] leading-[1.12] max-w-3xl mx-auto"
            >
              Engineered with High-Performance{' '}
              <span className="inline-flex items-center px-3 sm:px-4 py-0.5 sm:py-1 rounded-2xl bg-gradient-to-r from-[#8E7CFF] to-[#725CFF] text-white shadow-sm align-middle leading-tight">
                Tech Stack
              </span>
            </h2>

            <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed">
              Built with Next.js 16, Socket.IO v4, TanStack Query v5, and Tailwind CSS v4 for 0ms optimistic delivery, instant synchronization, and stateless security.
            </p>

            <div className="pt-2">
              <Link
                href={isAuthenticated ? '/chat' : '/login'}
                className="inline-flex items-center justify-center font-medium transition-all duration-200 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 h-11 rounded-full px-6 text-sm shadow-md hover:scale-105 active:scale-95"
              >
                {isAuthenticated ? 'Open App' : 'Try Free'}
              </Link>
            </div>
          </div>

          {/* Tech Stack Grid & Circuit Connector */}
          <div className="relative z-10 flex flex-col items-center gap-0">
            {/* Grid of 8 Core Technologies */}
            <div className="grid w-full max-w-4xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {/* 1. Next.js 16 */}
              <div className="bg-white dark:bg-zinc-900/90 border border-slate-200/80 dark:border-zinc-800 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xs transition-all duration-300 hover:scale-105 group">
                <div className="flex size-8 shrink-0 items-center justify-center text-slate-900 dark:text-white">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 180 180"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="90" cy="90" r="90" fill="black" />
                    <path
                      d="M149.508 157.438L69.1555 54H54V125.962H66.6026V69.9674L139.734 164.673C143.149 162.457 146.417 160.038 149.508 157.438Z"
                      fill="white"
                    />
                    <rect x="115" y="54" width="12" height="72" fill="white" />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-slate-900 dark:text-white text-sm font-semibold truncate">
                    Next.js 16
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs truncate">
                    App Router
                  </span>
                </div>
              </div>

              {/* 2. Socket.IO v4 */}
              <div className="bg-white dark:bg-zinc-900/90 border border-slate-200/80 dark:border-zinc-800 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xs transition-all duration-300 hover:scale-105 group">
                <div className="flex size-8 shrink-0 items-center justify-center text-slate-900 dark:text-white">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-600 dark:text-purple-400"
                  >
                    <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                    <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                    <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-slate-900 dark:text-white text-sm font-semibold truncate">
                    Socket.IO v4
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs truncate">
                    Real-Time Sync
                  </span>
                </div>
              </div>

              {/* 3. TanStack Query v5 */}
              <div className="bg-white dark:bg-zinc-900/90 border border-slate-200/80 dark:border-zinc-800 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xs transition-all duration-300 hover:scale-105 group">
                <div className="flex size-8 shrink-0 items-center justify-center">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="#FF4154"
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                    />
                    <circle cx="12" cy="12" r="4" fill="#FF4154" />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-slate-900 dark:text-white text-sm font-semibold truncate">
                    TanStack Query
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs truncate">
                    Cache & State
                  </span>
                </div>
              </div>

              {/* 4. Tailwind CSS v4 */}
              <div className="bg-white dark:bg-zinc-900/90 border border-slate-200/80 dark:border-zinc-800 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xs transition-all duration-300 hover:scale-105 group">
                <div className="flex size-8 shrink-0 items-center justify-center">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z"
                      fill="#38BDF8"
                    />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-slate-900 dark:text-white text-sm font-semibold truncate">
                    Tailwind CSS v4
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs truncate">
                    Design Tokens
                  </span>
                </div>
              </div>

              {/* 5. Zustand */}
              <div className="bg-white dark:bg-zinc-900/90 border border-slate-200/80 dark:border-zinc-800 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xs transition-all duration-300 hover:scale-105 group">
                <div className="flex size-8 shrink-0 items-center justify-center text-amber-600 dark:text-amber-400">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.29 7 12 12 20.71 7" />
                    <line x1="12" y1="22" x2="12" y2="12" />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-slate-900 dark:text-white text-sm font-semibold truncate">
                    Zustand
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs truncate">
                    Client Store
                  </span>
                </div>
              </div>

              {/* 6. TypeScript 5 */}
              <div className="bg-white dark:bg-zinc-900/90 border border-slate-200/80 dark:border-zinc-800 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xs transition-all duration-300 hover:scale-105 group">
                <div className="flex size-8 shrink-0 items-center justify-center">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="24" height="24" rx="4" fill="#3178C6" />
                    <path
                      d="M11.5 8H6V9.5H8V16H9.5V9.5H11.5V8ZM17.5 9.5C17.5 8.7 16.8 8 16 8H13V16H14.5V13.5H16C16.8 13.5 17.5 12.8 17.5 12V9.5ZM16 12H14.5V9.5H16V12Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-slate-900 dark:text-white text-sm font-semibold truncate">
                    TypeScript 5
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs truncate">
                    Strict Safety
                  </span>
                </div>
              </div>

              {/* 7. Framer Motion */}
              <div className="bg-white dark:bg-zinc-900/90 border border-slate-200/80 dark:border-zinc-800 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xs transition-all duration-300 hover:scale-105 group">
                <div className="flex size-8 shrink-0 items-center justify-center">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"
                      fill="#0055FF"
                    />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-slate-900 dark:text-white text-sm font-semibold truncate">
                    Framer Motion
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs truncate">
                    Fluid Physics
                  </span>
                </div>
              </div>

              {/* 8. Stateless JWT Security */}
              <div className="bg-white dark:bg-zinc-900/90 border border-slate-200/80 dark:border-zinc-800 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xs transition-all duration-300 hover:scale-105 group">
                <div className="flex size-8 shrink-0 items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-slate-900 dark:text-white text-sm font-semibold truncate">
                    Stateless JWT
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs truncate">
                    Auto 401 Recovery
                  </span>
                </div>
              </div>
            </div>

            {/* Connecting Circuit Flow SVG with Infinite Flow Stream Animation */}
            <div className="relative z-30 w-full max-w-[520px] flex justify-center mb-0.5 pt-0 select-none pointer-events-none drop-shadow-[0_2px_12px_rgba(142,124,255,0.25)]">
              <svg
                width="520"
                height="106"
                viewBox="0 0 520 106"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto overflow-visible"
              >
                <defs>
                  {/* Infinite Traveling Flow Pulse */}
                  <linearGradient id="flow-pulse-y" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
                    <stop offset="45%" stopColor="#A293FF" stopOpacity="1" />
                    <stop offset="55%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="65%" stopColor="#8E7CFF" stopOpacity="1" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4" />
                    <animateTransform
                      attributeName="gradientTransform"
                      type="translate"
                      values="0 -1.5; 0 1.5"
                      dur="2.2s"
                      repeatCount="indefinite"
                    />
                  </linearGradient>
                </defs>

                {/* Base Track (Pure White Line Foundation) */}
                <g className="text-white/50">
                  <path
                    d="M259.619 105.909L263.949 98.4087H255.289L259.619 105.909ZM0.75 0H0V49.7207H0.75H1.5V0H0.75ZM21.75 70.7207V71.4707H238.619V70.7207V69.9707H21.75V70.7207ZM259.619 91.7207H258.869V99.1587H259.619H260.369V91.7207H259.619ZM238.619 70.7207V71.4707C249.803 71.4707 258.869 80.5369 258.869 91.7207H259.619H260.369C260.369 79.7085 250.631 69.9707 238.619 69.9707V70.7207ZM0.75 49.7207H0C0 61.7329 9.73781 71.4707 21.75 71.4707V70.7207V69.9707C10.5662 69.9707 1.5 60.9045 1.5 49.7207H0.75Z"
                    fill="currentColor"
                  />
                  <path
                    d="M259.619 105.909L255.289 98.4087H263.949L259.619 105.909ZM518.488 0H519.238V49.7207H518.488H517.738V0H518.488ZM497.488 70.7207V71.4707H280.619V70.7207V69.9707H497.488V70.7207ZM259.619 91.7207H260.369V99.1587H259.619H258.869V91.7207H259.619ZM280.619 70.7207V71.4707C269.435 71.4707 260.369 80.5369 260.369 91.7207H259.619H258.869C258.869 79.7085 268.607 69.9707 280.619 69.9707V70.7207ZM518.488 49.7207H519.238C519.238 61.7329 509.5 71.4707 497.488 71.4707V70.7207V69.9707C508.671 69.9707 517.738 60.9045 517.738 49.7207H518.488Z"
                    fill="currentColor"
                  />
                  <path
                    d="M259.619 105.908L263.949 98.4085H255.289L259.619 105.908ZM169.149 0.654297H168.399V49.5805H169.149H169.899V0.654297H169.149ZM190.149 70.5805V71.3305H238.619V70.5805V69.8305H190.149V70.5805ZM259.619 91.5805H258.869V99.1585H259.619H260.369V91.5805H259.619ZM238.619 70.5805V71.3305C249.803 71.3305 258.869 80.3968 258.869 91.5805H259.619H260.369C260.369 79.5683 250.631 69.8305 238.619 69.8305V70.5805ZM169.149 49.5805H168.399C168.399 61.5927 178.137 71.3305 190.149 71.3305V70.5805V69.8305C178.965 69.8305 169.899 60.7643 169.899 49.5805H169.149Z"
                    fill="currentColor"
                  />
                  <path
                    d="M259.619 105.908L255.289 98.4085H263.949L259.619 105.908ZM350.089 0.654297H350.839V49.5805H350.089H349.339V0.654297H350.089ZM329.089 70.5805V71.3305H280.619V70.5805V69.8305H329.089V70.5805ZM259.619 91.5805H260.369V99.1585H259.619H258.869V91.5805H259.619ZM280.619 70.5805V71.3305C269.435 71.3305 260.369 80.3968 260.369 91.5805H259.619H258.869C258.869 79.5683 268.607 69.8305 280.619 69.8305V70.5805ZM350.089 49.5805H350.839C350.839 61.5927 341.101 71.3305 329.089 71.3305V70.5805V69.8305C340.272 69.8305 349.339 60.7643 349.339 49.5805H350.089Z"
                    fill="currentColor"
                  />
                </g>

                {/* Infinite Glowing Animated Stream Layer */}
                <g fill="url(#flow-pulse-y)">
                  <path
                    d="M259.619 105.909L263.949 98.4087H255.289L259.619 105.909ZM0.75 0H0V49.7207H0.75H1.5V0H0.75ZM21.75 70.7207V71.4707H238.619V70.7207V69.9707H21.75V70.7207ZM259.619 91.7207H258.869V99.1587H259.619H260.369V91.7207H259.619ZM238.619 70.7207V71.4707C249.803 71.4707 258.869 80.5369 258.869 91.7207H259.619H260.369C260.369 79.7085 250.631 69.9707 238.619 69.9707V70.7207ZM0.75 49.7207H0C0 61.7329 9.73781 71.4707 21.75 71.4707V70.7207V69.9707C10.5662 69.9707 1.5 60.9045 1.5 49.7207H0.75Z"
                  />
                  <path
                    d="M259.619 105.909L255.289 98.4087H263.949L259.619 105.909ZM518.488 0H519.238V49.7207H518.488H517.738V0H518.488ZM497.488 70.7207V71.4707H280.619V70.7207V69.9707H497.488V70.7207ZM259.619 91.7207H260.369V99.1587H259.619H258.869V91.7207H259.619ZM280.619 70.7207V71.4707C269.435 71.4707 260.369 80.5369 260.369 91.7207H259.619H258.869C258.869 79.7085 268.607 69.9707 280.619 69.9707V70.7207ZM518.488 49.7207H519.238C519.238 61.7329 509.5 71.4707 497.488 71.4707V70.7207V69.9707C508.671 69.9707 517.738 60.9045 517.738 49.7207H518.488Z"
                  />
                  <path
                    d="M259.619 105.908L263.949 98.4085H255.289L259.619 105.908ZM169.149 0.654297H168.399V49.5805H169.149H169.899V0.654297H169.149ZM190.149 70.5805V71.3305H238.619V70.5805V69.8305H190.149V70.5805ZM259.619 91.5805H258.869V99.1585H259.619H260.369V91.5805H259.619ZM238.619 70.5805V71.3305C249.803 71.3305 258.869 80.3968 258.869 91.5805H259.619H260.369C260.369 79.5683 250.631 69.8305 238.619 69.8305V70.5805ZM169.149 49.5805H168.399C168.399 61.5927 178.137 71.3305 190.149 71.3305V70.5805V69.8305C178.965 69.8305 169.899 60.7643 169.899 49.5805H169.149Z"
                  />
                  <path
                    d="M259.619 105.908L255.289 98.4085H263.949L259.619 105.908ZM350.089 0.654297H350.839V49.5805H350.089H349.339V0.654297H350.089ZM329.089 70.5805V71.3305H280.619V70.5805V69.8305H329.089V70.5805ZM259.619 91.5805H260.369V99.1585H259.619H258.869V91.5805H259.619ZM280.619 70.5805V71.3305C269.435 71.3305 260.369 80.3968 260.369 91.5805H259.619H258.869C258.869 79.5683 268.607 69.8305 280.619 69.8305V70.5805ZM350.089 49.5805H350.839C350.839 61.5927 341.101 71.3305 329.089 71.3305V70.5805V69.8305C340.272 69.8305 349.339 60.7643 349.339 49.5805H350.089Z"
                  />
                </g>
              </svg>
            </div>

            {/* Central Unified ChatFlow Core Platform Hub (Column View: Logo + Title) */}
            <div className="relative z-20">
              <div className="border border-slate-200/80 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 rounded-[24px] flex flex-col items-center justify-center text-center gap-3 border-2 px-8 py-5 shadow-[0px_20px_50px_rgba(114,92,255,0.15)] dark:shadow-[0px_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                {/* ChatFlow Official Brand Logo with Enhanced Infinite Rotating Border Animation */}
                <div className="relative size-20 sm:size-24 shrink-0 rounded-[26px] p-[3.5px] overflow-hidden shadow-2xl shadow-purple-500/30 flex items-center justify-center">
                  {/* Infinite Rotating Conic Gradient Beam */}
                  <div
                    className="absolute -inset-[150%] animate-[spin_3s_linear_infinite]"
                    style={{
                      background:
                        'conic-gradient(from 0deg, transparent 0 250deg, #8E7CFF 300deg, #D5CCFF 360deg)',
                    }}
                  />
                  <div
                    className="absolute -inset-[150%] animate-[spin_3s_linear_infinite]"
                    style={{
                      background:
                        'conic-gradient(from 180deg, transparent 0 250deg, #725CFF 300deg, #F472B6 360deg)',
                    }}
                  />

                  {/* Inner Surface & Brand Icon */}
                  <div className="relative h-full w-full rounded-[22px] bg-white dark:bg-zinc-950 flex items-center justify-center p-2 z-10">
                    <div className="h-full w-full rounded-[16px] bg-gradient-to-tr from-[#8E7CFF] via-[#A293FF] to-[#D5CCFF] flex items-center justify-center text-white shadow-sm overflow-hidden">
                      <svg
                        width="38"
                        height="38"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="translate-x-[0.5px] translate-y-[0.5px]"
                      >
                        {/* Large Chat Speech Bubble */}
                        <path
                          d="M3 11.5C3 6.8 6.8 3 11.5 3C16.2 3 20 6.8 20 11.5C20 16.2 16.2 20 11.5 20C9.9 20 8.4 19.5 7.1 18.7L3 20L4.3 16.2C3.5 14.8 3 13.2 3 11.5Z"
                          fill="white"
                        />
                        {/* 3 Chat Conversation Dots */}
                        <circle cx="8" cy="11.5" r="1.3" fill="#8E7CFF" />
                        <circle cx="11.5" cy="11.5" r="1.3" fill="#8E7CFF" />
                        <circle cx="15" cy="11.5" r="1.3" fill="#8E7CFF" />
                        {/* Top-Right Sparkle Diamond */}
                        <path
                          d="M19.5 1L20.2 3.2L22.4 3.9L20.2 4.6L19.5 6.8L18.8 4.6L16.6 3.9L18.8 3.2L19.5 1Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Platform Label */}
                <p className="text-slate-900 dark:text-white leading-none font-bold text-lg sm:text-xl tracking-tight">
                  ChatFlow Core Platform
                </p>
              </div>
            </div>
          </div>

          {/* Top Right Ambient Glow Effect */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-80 -rotate-40 rounded-full blur-[50px] opacity-75 dark:opacity-40"
            style={{
              background:
                'linear-gradient(169deg, #C9C1FF 29.61%, #725CFF 93.52%)',
            }}
          />

          {/* Bottom Ambient Radial Glow Graphic */}
          <div className="absolute inset-x-0 bottom-0 pointer-events-none select-none flex justify-center overflow-hidden">
            <Image
              src="/assets/hero-radial-glow.png"
              alt="Hero Radial Glow"
              width={2400}
              height={1000}
              className="w-full h-auto object-cover opacity-85 dark:opacity-60"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
