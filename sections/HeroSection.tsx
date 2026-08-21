'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  MessageCircle,
  Zap,
  CheckCheck,
  Shield,
} from 'lucide-react';

interface SimulatedMessage {
  id: string;
  sender: 'alex' | 'sarah';
  name: string;
  text: string;
  time: string;
}

const INITIAL_SIMULATED_MESSAGES: SimulatedMessage[] = [
  {
    id: '1',
    sender: 'sarah',
    name: 'Sarah Connor',
    text: 'Hey Alex! Did you see the new real-time WebSocket architecture in ChatFlow?',
    time: '10:42 AM',
  },
  {
    id: '2',
    sender: 'alex',
    name: 'You',
    text: 'Yes! Optimistic UI delivery with reverse pagination feels lightning fast ⚡',
    time: '10:43 AM',
  },
  {
    id: '3',
    sender: 'sarah',
    name: 'Sarah Connor',
    text: 'Plus the smart auto-scroll keeps your position when reading earlier messages! 🔥',
    time: '10:43 AM',
  },
];

export default function HeroSection() {
  const [messages, setMessages] = useState<SimulatedMessage[]>(INITIAL_SIMULATED_MESSAGES);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => {
          if (prev.length > 5) {
            return INITIAL_SIMULATED_MESSAGES;
          }
          const isSarah = prev[prev.length - 1].sender === 'alex';
          return [
            ...prev,
            {
              id: Date.now().toString(),
              sender: isSarah ? 'sarah' : 'alex',
              name: isSarah ? 'Sarah Connor' : 'You',
              text: isSarah
                ? 'Automatic gap-filling on reconnection keeps everything in sync seamlessly!'
                : 'Zero redundant fetches and instant search debounce too! 🚀',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ];
        });
      }, 1600);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background radial gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[650px] rounded-full bg-primary/10 blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary shadow-xs">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Real-Time WebSocket & Optimistic Chat Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
              Instant messaging with <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">zero friction</span>.
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience ultra-responsive direct & group conversations powered by Socket.io, TanStack Query caching, Zustand state management, and smart auto-scroll.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg hover:opacity-95 active:scale-95 transition-all"
              >
                <span>Launch ChatFlow</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="#demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-input bg-card/80 px-6 py-3.5 text-sm font-semibold text-card-foreground shadow-xs hover:bg-muted transition-colors backdrop-blur"
              >
                <Zap className="h-4 w-4 text-amber-500" />
                <span>Try Live Sandbox</span>
              </a>
            </div>

            {/* Micro value badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCheck className="h-4 w-4 text-emerald-500" />
                <span>Instant Optimistic Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>JWT Handshake Auth</span>
              </div>
            </div>
          </div>

          {/* Right Column: Simulated Live Chat Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md rounded-3xl border border-border/80 bg-card/90 p-4 shadow-2xl backdrop-blur text-card-foreground">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-sm shadow">
                    SC
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold leading-tight">Sarah Connor</h3>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                      Active Now • Real-Time Socket
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
              </div>

              {/* Chat bubbles viewport */}
              <div className="h-72 overflow-y-auto space-y-3 py-3 pr-1">
                {messages.map((m) => {
                  const isSelf = m.sender === 'alex';
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs shadow-xs ${
                          isSelf
                            ? 'bg-primary text-primary-foreground rounded-br-xs'
                            : 'bg-muted text-card-foreground rounded-bl-xs border border-border/60'
                        }`}
                      >
                        <p className="leading-relaxed">{m.text}</p>
                        <div
                          className={`mt-1 text-[9px] text-right ${
                            isSelf ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}
                        >
                          {m.time}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {typing && (
                  <div className="flex items-center gap-1.5 bg-muted/80 w-16 px-3 py-2 rounded-full text-xs text-muted-foreground animate-pulse">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
              </div>

              {/* Mock input footer */}
              <div className="pt-2 border-t flex items-center gap-2">
                <div className="flex-1 rounded-xl bg-background border px-3 py-2 text-xs text-muted-foreground">
                  Simulated active stream...
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground text-xs shadow">
                  <MessageCircle className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
