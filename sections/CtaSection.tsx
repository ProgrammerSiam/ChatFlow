'use client';

import Link from 'next/link';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="relative rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-700 p-8 sm:p-12 md:p-16 text-center text-white shadow-2xl overflow-hidden">
          {/* Subtle light orb decoration */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ready for seamless communication?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Start chatting on ChatFlow today.
            </h2>

            <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
              No long registrations or password hassle. Sign in with your phone and name to immediately connect with teammates.
            </p>

            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-2.5 rounded-2xl bg-white px-8 py-3.5 text-sm font-bold text-blue-600 shadow-xl hover:bg-blue-50 active:scale-95 transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Get Started Now</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
