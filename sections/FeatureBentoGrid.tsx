'use client';

import {
  Activity,
  Zap,
  Layers,
  ArrowDownCircle,
  Users,
  Search,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Activity,
    title: 'Real-Time WebSocket Engine',
    description:
      'Socket.io client handles bi-directional messaging with automated gap-fill invalidations on reconnection.',
    badge: 'Socket.IO v4',
    span: 'md:col-span-2 lg:col-span-8',
    gradient: 'from-blue-500/10 to-indigo-500/5',
  },
  {
    icon: Zap,
    title: 'Optimistic UI Dispatch',
    description:
      'Zero perceived latency with immediate message append, real-time status transitions, and one-tap retry on failure.',
    badge: '0ms Perceived Latency',
    span: 'md:col-span-1 lg:col-span-4',
    gradient: 'from-amber-500/10 to-orange-500/5',
  },
  {
    icon: ArrowDownCircle,
    title: 'Smart Auto-Scroll Logic',
    description:
      'Auto-scrolls when you are at the bottom, but preserves your reading position when scrolling history with a floating "↓ New message" pill.',
    badge: 'UX Polish',
    span: 'md:col-span-1 lg:col-span-4',
    gradient: 'from-emerald-500/10 to-teal-500/5',
  },
  {
    icon: Layers,
    title: 'TanStack Server Caching',
    description:
      'Reverse infinite queries with cursor pagination, background refetching, and deduped message stream consolidation.',
    badge: 'TanStack Query v5',
    span: 'md:col-span-2 lg:col-span-8',
    gradient: 'from-purple-500/10 to-pink-500/5',
  },
  {
    icon: Users,
    title: 'Group Admin Management',
    description:
      'Permission-gated group administration: rename groups, add or remove members, and promote co-admins securely.',
    badge: 'Admin Gated',
    span: 'md:col-span-1 lg:col-span-6',
    gradient: 'from-cyan-500/10 to-blue-500/5',
  },
  {
    icon: Search,
    title: 'Fuzzy Discovery & Debounce',
    description:
      'Debounced user search with client-side self-exclusion and direct sidebar cache short-circuiting to prevent duplicate network calls.',
    badge: '300ms Debounced',
    span: 'md:col-span-1 lg:col-span-6',
    gradient: 'from-rose-500/10 to-red-500/5',
  },
];

export default function FeatureBentoGrid() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Engineered for High-Performance Chat
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Every layer from client-side state caching to real-time socket events has been built with production-grade precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className={`${feat.span} group relative rounded-3xl border border-border bg-gradient-to-br ${feat.gradient} p-8 shadow-sm transition-all hover:shadow-xl hover:border-primary/30 flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-card border text-primary shadow-xs group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-background/80 border px-3 py-1 text-[11px] font-semibold text-muted-foreground backdrop-blur">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
