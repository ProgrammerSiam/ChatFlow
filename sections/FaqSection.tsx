'use client';

import { useState } from 'react';
import { Plus, Minus, Sparkles, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How does authentication & user auto-registration work?',
    answer:
      'Logging in requires only your phone number and name via POST /auth/login. If your phone number is new, ChatFlow automatically registers your account on the fly with no passwords or verification delays. On app reload, sessions are seamlessly restored via GET /auth/me.',
  },
  {
    question: 'How does real-time communication work under the hood?',
    answer:
      'ChatFlow connects directly to the root origin WebSocket server via Socket.IO using JWT authentication in the handshake ({ auth: { token } }). It listens to message:new and conversation:updated events in real-time, with automatic gap-filling queries executed whenever the connection recovers from a disconnect.',
  },
  {
    question: 'What makes optimistic message delivery zero-latency?',
    answer:
      "When you send a message, it is instantly appended to the UI in <1ms with a 'sending' status while POST /messages runs in the background. On success, it seamlessly switches to 'sent' and replaces the temporary ID. If the request fails, it transitions to 'failed' with a one-tap retry button.",
  },
  {
    question: 'How do group permissions and admin roles work?',
    answer:
      'When you create a group (POST /conversations/group), you are automatically made an admin. Group admins can rename the group, add new members, remove participants, and promote other members to admins. Non-admin participants can view group details and leave the group at any time.',
  },
  {
    question: 'How does reverse pagination and smart auto-scroll work?',
    answer:
      'Chat history is fetched in 20-message chunks using GET /conversations/{id}/messages?limit=20&before=<cursor>. When you scroll to the top, older messages are prepended while preserving exact scroll height without jumping. When new messages arrive, the viewport auto-scrolls if you are at the bottom, or displays a floating "↓ New message" pill if you have scrolled up.',
  },
  {
    question: 'What happens if a token expires or returns a 401 error?',
    answer:
      "ChatFlow's global HTTP interceptor catches 401 Unauthorized responses, cleanly disconnects the Socket.IO client, clears the Zustand store and TanStack Query cache, displays a 'Session expired' toast notification, and redirects you safely to /login.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-white dark:bg-background border-t">
      <div className="container mx-auto px-4 max-w-4xl space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200/70 dark:border-purple-800/50 bg-purple-50/70 dark:bg-purple-950/40 px-3.5 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300 shadow-xs">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Got questions? We’ve got answers.
          </h2>

          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-normal">
            Everything you need to know about ChatFlow’s real-time WebSockets, state architecture, and group permissions.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-purple-300/80 dark:border-purple-800/60 bg-purple-50/30 dark:bg-purple-950/20 shadow-sm'
                    : 'border-slate-200/80 dark:border-border/60 bg-slate-50/50 dark:bg-card/50 hover:bg-slate-50 dark:hover:bg-card'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 sm:p-7 flex items-center justify-between text-left gap-4"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-200/70 dark:bg-muted text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0 text-sm text-slate-600 dark:text-slate-400 leading-relaxed animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
