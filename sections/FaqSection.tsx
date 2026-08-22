'use client';

import { useState } from 'react';
import SectionHeader from '@/shared/SectionHeader';
import { HelpCircle } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'what-is-chatflow',
    question: 'What is ChatFlow?',
    answer:
      'ChatFlow is a real-time communication platform and collaborative workspace that connects teammates with zero-latency Socket.IO channels, TanStack Query caching, and role-gated group administration without tool switching or complicated setup.',
  },
  {
    id: 'how-socket-works',
    question: 'How does ChatFlow handle real-time communication?',
    answer:
      'ChatFlow connects directly to the root origin WebSocket server via Socket.IO using JWT authentication in the handshake ({ auth: { token } }). It listens to message:new and conversation:updated events in real-time, with automatic gap-filling queries executed whenever the connection recovers from a disconnect.',
  },
  {
    id: 'what-is-optimistic',
    question: 'What makes optimistic message delivery zero-latency?',
    answer:
      'ChatFlow is a modern, high-performance real-time communication platform designed for teams and creators. It delivers zero-latency bi-directional messaging, intelligent caching, group workspace administration, and rich media tools in a unified ecosystem.',
  },
  {
    id: 'how-fast-is-messaging',
    question: 'How fast is message delivery on ChatFlow?',
    answer:
      'Messages are delivered near-instantly with 0ms optimistic UI dispatch and sub-millisecond WebSocket fan-out, backed by automatic reconnect gap-filling so you never miss a message.',
  },
  {
    id: 'are-group-channels-supported',
    question: 'Can I create and manage group channels?',
    answer:
      'Yes! ChatFlow features full role-gated group administration. Admins can create channels, add/remove members, rename channels, and promote fellow teammates to admin with live sync.',
  },
  {
    id: 'is-chatflow-secure',
    question: 'How secure is my communication?',
    answer:
      'All WebSocket connections and REST endpoints require secure JWT authentication. Data is transmitted exclusively over encrypted TLS connections with strict role-based access control.',
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>('what-is-chatflow');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="bg-white dark:bg-background pt-12 pb-16 sm:pt-20 sm:pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Reusable Section Header */}
        <SectionHeader
          badge="FAQ"
          badgeIcon={<HelpCircle className="size-3 text-purple-600 dark:text-purple-400" />}
          title={
            <>
              Frequently Asked{' '}
              <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-xl bg-gradient-to-r from-[#8E7CFF] to-[#725CFF] text-white shadow-xs align-middle leading-tight">
                Questions
              </span>
            </>
          }
          description="Everything you need to know about ChatFlow, from real-time WebSockets and state architecture to collaboration and security."
        />

        {/* Minimalist Accordion List (Matches User HTML Spec) */}
        <div className="mx-auto mt-10 max-w-3xl sm:mt-14">
          <div className="flex flex-col gap-6">
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="flex flex-col gap-3 pb-6 border-b border-slate-200/80 dark:border-border/60 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between py-1 text-left group cursor-pointer"
                  >
                    <span className="text-slate-900 dark:text-white pr-6 text-base sm:text-lg leading-snug font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {faq.question}
                    </span>
                    <span className="shrink-0 text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`size-5 transform transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-purple-600 dark:text-purple-400' : ''
                        }`}
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>

                  <div
                    className="grid overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed pt-1">
                        {faq.answer}
                      </p>
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
