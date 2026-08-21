'use client';

import Link from 'next/link';
import BrandLogo from '@/shared/BrandLogo';

export default function Footer() {
  return (
    <footer className="bg-slate-50/90 dark:bg-card/40 border-t border-slate-200/80 dark:border-border/60 px-4 pt-16 pb-10 sm:px-6 xl:px-4 text-card-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-14">
        {/* Top Split Section */}
        <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
          {/* Brand & Mission Column */}
          <div className="xl:w-1/3">
            <div className="xl:w-86 xl:shrink-0 space-y-5">
              <Link href="/" className="inline-flex">
                <BrandLogo name="ChatFlow" suffix=".AI" />
              </Link>

              <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                All-in-One Real-Time Chat & Collaboration Platform for Teams and
                Individuals – Centralize conversations, group channels, and
                instant search with zero-latency Socket.io sync.
              </p>

              {/* Social Link Buttons */}
              <div className="flex items-center gap-2.5 pt-2">
                {/* Discord Icon */}
                <a
                  aria-label="Discord"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-xl border border-slate-200/80 dark:border-border/60 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-300 dark:hover:border-purple-700/60 transition-colors cursor-pointer"
                  href="https://discord.com"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.3445 2.96094C15.1125 3.37293 14.9041 3.79914 14.7147 4.23481C12.9152 3.96489 11.0825 3.96489 9.27823 4.23481C9.09355 3.79914 8.88043 3.37293 8.6484 2.96094C6.95779 3.24982 5.3098 3.75652 3.74706 4.47159C0.64997 9.06039 -0.18823 13.5308 0.228508 17.9396C2.04223 19.2798 4.07381 20.3027 6.23798 20.9562C6.72574 20.3027 7.15669 19.6065 7.52606 18.882C6.82519 18.6216 6.148 18.2948 5.49923 17.916C5.6697 17.7928 5.83545 17.665 5.99646 17.5418C9.79915 19.3319 14.2033 19.3319 18.0107 17.5418C18.1717 17.6744 18.3374 17.8023 18.5079 17.916C17.8591 18.2995 17.1819 18.6216 16.4763 18.8868C16.8457 19.6113 17.2766 20.3074 17.7644 20.9609C19.9285 20.3074 21.9601 19.2893 23.774 17.9491C24.2663 12.8346 22.931 8.40213 20.2458 4.47633C18.6879 3.76126 17.0399 3.25454 15.3493 2.97041L15.3445 2.96094ZM8.05645 15.2261C6.88676 15.2261 5.91596 14.1654 5.91596 12.8536C5.91596 11.5419 6.84887 10.4763 8.05172 10.4763C9.25457 10.4763 10.2111 11.5466 10.1922 12.8536C10.1733 14.1606 9.24983 15.2261 8.05645 15.2261ZM15.946 15.2261C14.7715 15.2261 13.8102 14.1654 13.8102 12.8536C13.8102 11.5419 14.7431 10.4763 15.946 10.4763C17.1488 10.4763 18.1007 11.5466 18.0817 12.8536C18.0628 14.1606 17.1393 15.2261 15.946 15.2261Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>

                {/* X (Twitter) Icon */}
                <a
                  aria-label="X (Twitter)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-xl border border-slate-200/80 dark:border-border/60 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-300 dark:hover:border-purple-700/60 transition-colors cursor-pointer"
                  href="https://twitter.com"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.2889 19.1663L8.66435 12.5748L2.87503 19.1663H0.425781L7.57772 11.0256L0.425781 0.833008H6.71407L11.0726 7.04552L16.5337 0.833008H18.9829L12.1629 8.59674L19.5772 19.1663H13.2889ZM16.0164 17.308H14.3674L3.93274 2.69134H5.5819L9.76107 8.54398L10.4838 9.55956L16.0164 17.308Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>

                {/* GitHub Icon */}
                <a
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-xl border border-slate-200/80 dark:border-border/60 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-300 dark:hover:border-purple-700/60 transition-colors cursor-pointer"
                  href="https://github.com"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* 4 Categorized Columns */}
          <div className="grid flex-1 grid-cols-2 gap-x-10 gap-y-10 lg:grid-cols-4 xl:gap-x-16">
            {/* Column 1: Resources */}
            <div>
              <h3 className="text-slate-900 dark:text-white text-base font-bold">
                Resources
              </h3>
              <ul className="mt-5 space-y-3">
                <li>
                  <Link
                    className="text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors"
                    href="/login"
                  >
                    Get Started
                  </Link>
                </li>
                <li>
                  <a
                    className="text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors"
                    href="#faq"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    className="text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors"
                    href="https://frontend-task-chatapp.onrender.com/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    REST API Reference
                  </a>
                </li>
                <li>
                  <a
                    className="text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors"
                    href="#demo"
                  >
                    Live Sandbox
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Useful Links */}
            <div>
              <h3 className="text-slate-900 dark:text-white text-base font-bold">
                Useful Links
              </h3>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    className="text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors"
                    href="#how-it-works"
                  >
                    Process Flow
                  </a>
                </li>
                <li>
                  <a
                    className="text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors"
                    href="#features"
                  >
                    Features Grid
                  </a>
                </li>
                <li>
                  <a
                    className="text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors"
                    href="#testimonials"
                  >
                    Community Reviews
                  </a>
                </li>
                <li>
                  <Link
                    className="text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors"
                    href="/chat"
                  >
                    Web App
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Explore */}
            <div>
              <h3 className="text-slate-900 dark:text-white text-base font-bold">
                Explore
              </h3>
              <ul className="mt-5 space-y-3">
                <li>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">
                    Direct Messaging
                  </span>
                </li>
                <li>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">
                    Group Channels
                  </span>
                </li>
                <li>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">
                    Admin Role Gating
                  </span>
                </li>
                <li>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">
                    Reverse Pagination
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 4: Capabilities */}
            <div>
              <h3 className="text-slate-900 dark:text-white text-base font-bold">
                Capabilities
              </h3>
              <ul className="mt-5 space-y-3">
                <li>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">
                    Optimistic Delivery
                  </span>
                </li>
                <li>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">
                    Socket.io Handshake
                  </span>
                </li>
                <li>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">
                    Gap-Fill Invalidation
                  </span>
                </li>
                <li>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">
                    Bearer Authentication
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Middle Row: Real-Time API Endpoints */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 pt-6 border-t border-slate-200/80 dark:border-border/60">
          <div>
            <h3 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider">
              REST Endpoints Contract
            </h3>
            <ul className="mt-4 space-y-2.5 grid md:grid-cols-2 md:gap-x-4 text-xs font-mono text-slate-500 dark:text-slate-400">
              <li>POST /auth/login</li>
              <li>GET /auth/me</li>
              <li>GET /users/search</li>
              <li>GET /conversations</li>
              <li>POST /conversations/group</li>
              <li>GET /conversations/:id/messages</li>
              <li>POST /messages</li>
              <li>PATCH /conversations/:id</li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider">
              Real-Time Event Handlers
            </h3>
            <ul className="mt-4 space-y-2.5 grid md:grid-cols-2 md:gap-x-4 text-xs font-mono text-slate-500 dark:text-slate-400">
              <li>socket.on(&apos;connect&apos;)</li>
              <li>socket.on(&apos;disconnect&apos;)</li>
              <li>socket.on(&apos;message:new&apos;)</li>
              <li>socket.on(&apos;conversation:updated&apos;)</li>
              <li>queryClient.invalidateQueries()</li>
              <li>useAuthStore.getState().logout()</li>
            </ul>
          </div>
        </div>

        {/* Large Outlined Brand Watermark */}
        <div className="pt-8 text-center select-none pointer-events-none opacity-10 dark:opacity-5">
          <span className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tighter uppercase text-stroke">
            CHATFLOW
          </span>
        </div>

        {/* Bottom Legal & Attribution Bar */}
        <div className="border-t border-slate-200/80 dark:border-border/60 pt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <p>ChatFlow Platform • All rights reserved © 2026</p>
          <div className="flex items-center gap-2">
            <span>
              Built with Next.js 16, React 19, Socket.IO &amp; TanStack Query
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
