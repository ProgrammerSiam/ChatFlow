'use client';

import { KeyRound, UserSearch, MessageSquare } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: KeyRound,
    title: 'Instant Sign In',
    description:
      'Enter your phone number and name. First-time users are automatically registered without passwords or setup friction.',
  },
  {
    step: '02',
    icon: UserSearch,
    title: 'Find or Create Groups',
    description:
      'Search users with 300ms debouncing or spin up collaborative group chats with multiple participants in a few taps.',
  },
  {
    step: '03',
    icon: MessageSquare,
    title: 'Real-Time Flow',
    description:
      'Send messages with optimistic updates, stay informed with live unread badges, and enjoy smooth reverse message scrolling.',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-muted/20 border-t">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            How ChatFlow Works
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Get up and running in seconds with a seamless three-step journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative rounded-3xl border bg-card p-8 shadow-sm flex flex-col justify-between space-y-6 text-card-foreground"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-3xl font-black text-muted-foreground/30">
                    {step.step}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold tracking-tight">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
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
