'use client';

import SectionHeader from '@/shared/SectionHeader';
import { MessageSquareQuote } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-slate-50/60 dark:bg-card/20 px-5 pt-20 pb-24 md:px-10 xl:px-20 border-t border-slate-200/60 dark:border-border/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        {/* Reusable Section Header */}
        <SectionHeader
          badge="Testimonial"
          badgeIcon={<MessageSquareQuote className="size-3 text-purple-600 dark:text-purple-400" />}
          title="Trusted by creators, founders & teams"
          description="See how fast-moving teams use ChatFlow to synchronize communications, scale channels, and build collaborative workflows."
        />

        {/* 3-Column Masonry Grid */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            {/* Review 1 */}
            <div className="bg-white dark:bg-card flex flex-col justify-between gap-8 rounded-3xl p-7 border border-slate-200/80 dark:border-border/60 shadow-sm transition-all hover:shadow-md">
              <p className="text-slate-800 dark:text-slate-100 text-base sm:text-lg leading-relaxed font-normal">
                &ldquo;The zero-latency optimistic delivery and persistent WebSockets are game-changing. Messages appear instantly and sync flawlessly across all our team members.&rdquo; 🚀
              </p>
              <div className="flex items-end justify-between gap-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold text-sm shadow-inner">
                    JF
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-slate-900 dark:text-white font-bold text-sm">Joshua Ford</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">Head of Growth at Preview 3D</p>
                  </div>
                </div>
                {/* Quote Icon */}
                <svg className="size-6 shrink-0 opacity-40" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.46962 14.3207H4.8033C5.3978 14.3207 5.81419 14.9078 5.61758 15.4688L2.14101 25.3896C1.9444 25.9506 2.36079 26.5377 2.95529 26.5377H6.35507C6.69177 26.5377 6.99771 26.3419 7.13866 26.0361L12.989 13.3439C13.0412 13.2306 13.0682 13.1074 13.0682 12.9827V6.91225C13.0682 5.00614 11.523 3.46094 9.6169 3.46094H5.92093C4.01482 3.46094 2.46962 5.00615 2.46962 6.91225V14.3207Z" fill="currentColor" />
                  <path d="M17.6626 14.3207H19.9963C20.5908 14.3207 21.0072 14.9078 20.8106 15.4688L17.334 25.3896C17.1374 25.9506 17.5538 26.5377 18.1483 26.5377H21.5481C21.8848 26.5377 22.1907 26.3419 22.3317 26.0361L28.182 13.3439C28.2342 13.2306 28.2612 13.1074 28.2612 12.9827V6.91225C28.2612 5.00614 26.716 3.46094 24.8099 3.46094H21.114C19.2078 3.46094 17.6626 5.00615 17.6626 6.91225V14.3207Z" fill="currentColor" />
                </svg>
              </div>
            </div>

            {/* Stat Card 1 */}
            <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-3xl p-7 border border-purple-200/80 dark:border-purple-800/40 bg-gradient-to-br from-purple-100/70 via-indigo-50/50 to-white dark:from-purple-950/40 dark:via-card dark:to-card shadow-sm">
              <div className="relative z-10 flex flex-col gap-2">
                <span className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">15k+</span>
                <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">Happy users from 90+ Countries</p>
              </div>
              <div className="relative z-10 flex flex-col gap-3 pt-8">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white font-bold text-xs shadow-sm">
                    PH
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-900 dark:text-white text-sm font-bold">#5 Product of the Day</span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs">Product Hunt Community</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white font-bold text-xs shadow-sm">
                    ⚡
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-900 dark:text-white text-sm font-bold">0ms Perceived Latency</span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs">TanStack Optimistic Engine</span>
                  </div>
                </div>
              </div>
              {/* Background ambient glow */}
              <div className="pointer-events-none absolute -right-16 -bottom-16 size-48 rounded-full bg-purple-400/20 blur-2xl" />
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6">
            {/* Review 2 */}
            <div className="bg-white dark:bg-card flex flex-col justify-between gap-8 rounded-3xl p-7 border border-slate-200/80 dark:border-border/60 shadow-sm transition-all hover:shadow-md">
              <p className="text-slate-800 dark:text-slate-100 text-base sm:text-lg leading-relaxed font-normal">
                &ldquo;One unified platform for team chats, admin role management, and instant member search removes all the friction of fragmented messaging apps.&rdquo;
              </p>
              <div className="flex items-end justify-between gap-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-sm shadow-inner">
                    MR
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-slate-900 dark:text-white font-bold text-sm">Marcia Riner</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">CEO Of Profit Booster®</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white dark:bg-card flex flex-col justify-between gap-8 rounded-3xl p-7 border border-slate-200/80 dark:border-border/60 shadow-sm transition-all hover:shadow-md">
              <p className="text-slate-800 dark:text-slate-100 text-base sm:text-lg leading-relaxed font-normal">
                &ldquo;I think this becomes especially useful for remote teams once everyone starts collaborating on different channels. Having socket auto-reconnect with cache gap-filling is brilliant.&rdquo;
              </p>
              <div className="flex items-end justify-between gap-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold text-sm shadow-inner">
                    EG
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-slate-900 dark:text-white font-bold text-sm">Etienne Garcia</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">Founder of Stealth Tech Startup</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Review 4 */}
            <div className="bg-white dark:bg-card flex flex-col justify-between gap-8 rounded-3xl p-7 border border-slate-200/80 dark:border-border/60 shadow-sm transition-all hover:shadow-md">
              <p className="text-slate-800 dark:text-slate-100 text-base sm:text-lg leading-relaxed font-normal">
                &ldquo;The smart auto-scroll feature that lets you read backlog messages without jumping around makes our daily workflows so much cleaner.&rdquo;
              </p>
              <div className="flex items-end justify-between gap-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 font-bold text-sm shadow-inner">
                    JB
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-slate-900 dark:text-white font-bold text-sm">James Brunetto</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">Co-founder Synqro</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6">
            {/* Purple Spotlight Card */}
            <div className="relative flex flex-col justify-between gap-10 overflow-hidden rounded-3xl p-7 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-xl shadow-purple-500/20">
              <div className="relative z-10 flex flex-col gap-2">
                <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white">5.0/5</span>
                <p className="text-purple-100 text-sm leading-relaxed">
                  Loved by modern teams for making real-time communication, channel management, and instant search effortless.
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-3 pt-4 border-t border-white/20">
                <div className="flex -space-x-2.5 overflow-hidden">
                  <span className="flex size-8 items-center justify-center rounded-full bg-amber-400 text-slate-950 font-bold text-[10px] border-2 border-purple-700">
                    🧑‍💼
                  </span>
                  <span className="flex size-8 items-center justify-center rounded-full bg-emerald-400 text-slate-950 font-bold text-[10px] border-2 border-purple-700">
                    👩‍💻
                  </span>
                  <span className="flex size-8 items-center justify-center rounded-full bg-pink-400 text-slate-950 font-bold text-[10px] border-2 border-purple-700">
                    🧑‍🎨
                  </span>
                  <span className="flex size-8 items-center justify-center rounded-full bg-indigo-900 text-white font-bold text-[10px] border-2 border-purple-700">
                    1+
                  </span>
                </div>
                <p className="text-xs font-semibold text-purple-100">
                  Trusted by 15K+ professionals
                </p>
              </div>

              {/* Ambient Background Aura */}
              <div className="pointer-events-none absolute -right-16 -bottom-16 size-48 rounded-full bg-white/20 blur-2xl" />
            </div>

            {/* Review 5 */}
            <div className="bg-white dark:bg-card flex flex-col justify-between gap-8 rounded-3xl p-7 border border-slate-200/80 dark:border-border/60 shadow-sm transition-all hover:shadow-md">
              <p className="text-slate-800 dark:text-slate-100 text-base sm:text-lg leading-relaxed font-normal">
                &ldquo;Reverse pagination with smooth height preservation is something so few apps get right. ChatFlow nails it completely.&rdquo;
              </p>
              <div className="flex items-end justify-between gap-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold text-sm shadow-inner">
                    OG
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-slate-900 dark:text-white font-bold text-sm">Olivia Grant</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">Founder of BH&amp;P</p>
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
