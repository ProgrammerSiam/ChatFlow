'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, RotateCcw, CheckCheck, Sparkles } from 'lucide-react';
import SectionHeader from '@/shared/SectionHeader';

interface DemoMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

const INITIAL_DEMO_MESSAGES: DemoMessage[] = [
  {
    id: '1',
    sender: 'bot',
    text: 'Hello! I am the ChatFlow demo bot. Try sending me a message to test our optimistic updates & auto-scroll!',
    time: '12:00 PM',
  },
];

export default function LiveDemoSection() {
  const [messages, setMessages] = useState<DemoMessage[]>(INITIAL_DEMO_MESSAGES);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMsg: DemoMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsBotTyping(true);

    setTimeout(() => {
      setIsBotTyping(false);
      const botReplies = [
        '🚀 Instant optimistic delivery simulated with 0ms perceived latency!',
        '⚡ WebSocket socket:new event received and cached into TanStack Query.',
        '🔒 Bearer token verified. Your message stream remains strictly encrypted.',
        '✨ Smart auto-scroll triggered: Viewport smoothly transitioned to bottom.',
      ];
      const randomReply = botReplies[Math.floor(Math.random() * botReplies.length)];

      const botMsg: DemoMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const handleReset = () => {
    setMessages(INITIAL_DEMO_MESSAGES);
  };

  return (
    <section id="demo" className="py-20 md:py-28 bg-white dark:bg-background">
      <div className="container mx-auto px-4 max-w-4xl space-y-12">
        {/* Reusable Section Header */}
        <SectionHeader
          badge="Sandbox"
          title="Try the Real-Time Chat Engine"
          description="Type anything into the sandbox below to feel the instant optimistic delivery and automated feedback."
        />

        <div className="rounded-[32px] border border-border/80 bg-white/90 dark:bg-card/90 shadow-2xl backdrop-blur-xl overflow-hidden text-card-foreground">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-card/60 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold leading-tight">ChatFlow Demo Bot</h4>
                <p className="text-[11px] text-emerald-600 font-medium">Online • Instant response</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-muted"
              title="Reset Sandbox"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 sm:h-72 overflow-y-auto p-4 space-y-3 bg-background/50">
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-xs shadow-xs ${
                      isUser
                        ? 'bg-primary text-primary-foreground rounded-br-xs'
                        : 'bg-card text-card-foreground border rounded-bl-xs'
                    }`}
                  >
                    <p className="leading-relaxed">{m.text}</p>
                    <div
                      className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${
                        isUser ? 'text-primary-foreground/75' : 'text-muted-foreground'
                      }`}
                    >
                      <span>{m.time}</span>
                      {isUser && <CheckCheck className="h-3 w-3" />}
                    </div>
                  </div>
                  {isUser && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {isBotTyping && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground pl-9">
                <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                <span>Bot is formulating reply...</span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input form */}
          <form onSubmit={handleSend} className="p-3 border-t bg-card flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a test message (e.g. 'Hello ChatFlow')..."
              className="flex-1 rounded-xl border border-input bg-background px-4 py-2.5 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow hover:opacity-90 active:scale-95 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
