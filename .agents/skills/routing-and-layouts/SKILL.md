---
name: routing-and-layouts
description: "Next.js 16 App Router routing patterns, layout shells, dynamic route params, responsive viewport adaptation, and auth guards for ChatFlow."
---

# Routing and Layouts Skill — ChatFlow

ChatFlow uses **Next.js 16 App Router** with route groups, React 19 `use(params)` resolution, responsive layout shells, and client-side authentication guards.

---

## 📁 Route Tree & Architecture (`app/`)

```text
app/
├── layout.tsx                     # Root layout (Inter font, Providers, SEO metadata)
├── page.tsx                       # Route: /  → Landing Page (Hero, Bento Grid, Live Demo, CTA)
├── globals.css                    # Tailwind CSS v4 & theme variables
├── loading.tsx                    # Root loading fallback
├── not-found.tsx                  # Global 404 Not Found page
├── providers.tsx                  # TanStack QueryClientProvider, AuthInitializer, Toaster
│
├── (auth)/
│   └── login/
│       └── page.tsx               # Route: /login → Phone + name login / auto-registration
│
└── (routes)/
    └── chat/
        ├── layout.tsx             # Protected Shell: useSocket mount, Auth guard, Sidebar + Modals
        ├── page.tsx               # Route: /chat → Workspace canvas & empty state
        └── [id]/
            └── page.tsx           # Route: /chat/[id] → Active conversation chat panel
```

> 💡 **Public URL Mapping**: Route groups `(auth)` and `(routes)` do not add prefixes to URLs:
> - Root URL `/` → Landing Page
> - `/login` → Login Page
> - `/chat` → Chat workspace index
> - `/chat/[id]` → Active direct or group conversation

---

## 🛡️ Authentication Guards & Route Protection

Protected routes under `/chat/*` are guarded inside [`app/(routes)/chat/layout.tsx`](file:///app/%28routes%29/chat/layout.tsx):

```tsx
// app/(routes)/chat/layout.tsx
'use client';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  // 1. Mount socket lifecycle for all chat routes
  useSocket();

  // 2. Redirect unauthenticated users
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // 3. Render skeleton during initial session restoration
  if (isLoading) {
    return <ChatLayoutSkeleton />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden ...">
      {/* Shell with Sidebar + Main Canvas + Global Modals */}
      {children}
    </div>
  );
}
```

Similarly, [`app/(auth)/login/page.tsx`](file:///app/%28auth%29/login/page.tsx) automatically redirects already authenticated users to `/chat`.

---

## ⚡ Dynamic Route Parameters in Next.js 16 / React 19

In Next.js 16, dynamic `params` are asynchronous `Promise` objects. In Client Components, resolve them using React 19's `use()` hook:

```tsx
// app/(routes)/chat/[id]/page.tsx
'use client';

import { use } from 'react';
import ChatPanel from '@/components/chat/ChatPanel';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ChatConversationPage({ params }: PageProps) {
  const { id } = use(params);
  return <ChatPanel conversationId={id} />;
}
```

---

## 📱 Responsive Layout Adaptation (Mobile vs Desktop)

The chat shell dynamically adapts between mobile viewports and desktop multi-column layouts using pathname detection:

```tsx
// app/(routes)/chat/layout.tsx
const pathname = usePathname();
const isDetailView = pathname !== '/chat' && pathname.startsWith('/chat/');

return (
  <div className="flex flex-1 overflow-hidden gap-2 sm:gap-3">
    {/* Sidebar: Full width on mobile when on /chat; hidden on mobile when viewing /chat/[id] */}
    <div className={`h-full ${isDetailView ? 'hidden md:flex' : 'flex w-full md:w-auto'}`}>
      <Sidebar />
    </div>

    {/* Main Chat Canvas: Full width on mobile when viewing /chat/[id]; hidden on mobile on /chat */}
    <main className={`flex-1 h-full overflow-hidden ${isDetailView ? 'flex' : 'hidden md:flex'}`}>
      {children}
    </main>
  </div>
);
```

- **On Mobile (< 768px)**:
  - Route `/chat`: Shows conversation list ([`Sidebar`](file:///components/chat/Sidebar.tsx)).
  - Route `/chat/[id]`: Shows conversation messages ([`ChatPanel`](file:///components/chat/ChatPanel.tsx)) with a back button returning to `/chat`.
- **On Desktop (≥ 768px)**:
  - Both [`Sidebar`](file:///components/chat/Sidebar.tsx) and [`ChatPanel`](file:///components/chat/ChatPanel.tsx) are visible simultaneously in a modern side-by-side layout.

---

## 🏷️ Metadata & SEO Configuration

Set application-wide and page-level metadata in Server Components or layouts:

```tsx
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChatFlow - Real-time Communication Platform',
  description: 'Fast, secure, and modern real-time chat application.',
};
```

---

## 🔗 Internal Navigation Links

Always use `next/link` for client-side navigation:

```tsx
import Link from 'next/link';

// Navigating to landing page
<Link href="/">Home</Link>

// Navigating to login
<Link href="/login">Log In</Link>

// Opening a conversation
<Link href={`/chat/${conversation._id}`}>Open Chat</Link>
```

---

## ✅ Routing & Layout Checklist

- [ ] Root `/` is the landing page; chat lives at `/chat` and `/chat/[id]`.
- [ ] Route groups `(auth)` and `(routes)` used for organizational cleanliness without URL pollution.
- [ ] Next.js 16 dynamic route params unwrapped via `use(params)` (or `await params` in Server Components).
- [ ] Route `/chat/*` protected by auth check in [`app/(routes)/chat/layout.tsx`](file:///app/%28routes%29/chat/layout.tsx).
- [ ] Route `/login` redirects to `/chat` if session is already active.
- [ ] Responsive layout hides sidebar on mobile when an active chat is open (`isDetailView`).
- [ ] Global modals (`NewChatModal`, `NewGroupModal`, `UserProfileModal`) mounted in chat layout.
