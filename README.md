# ChatFlow — Real-time Chat App & Landing Page (Frontend Take-Home Assignment)

A real-time team messaging application (Part 1) and landing page (Part 2) built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, TanStack Query v5, Zustand v5, and Socket.io Client.

---

## 🔗 Live Links

- **Landing Page (Part 2)**: [https://chatflow-delta.vercel.app](https://chatflow-delta.vercel.app) *(or `http://localhost:3000`)*
- **Chat Application (Part 1)**: [https://chatflow-delta.vercel.app/chat](https://chatflow-delta.vercel.app/chat) *(or `http://localhost:3000/chat`)*
- **Login Screen**: [https://chatflow-delta.vercel.app/login](https://chatflow-delta.vercel.app/login) *(or `http://localhost:3000/login`)*
- 📄 **API Documentation**: see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## 🛠️ Tech Stack

| Package | Version | Purpose |
| :--- | :--- | :--- |
| `next` | `16.2.6` | React Framework (App Router, Turbopack, Server & Client Components) |
| `react` / `react-dom` | `19.2.4` | Core UI Library |
| `typescript` | `^5` | Static type safety and strict schema interfaces |
| `@tanstack/react-query` | `^5.101.4` | Server state management, infinite pagination, optimistic updates, cache invalidation |
| `zustand` | `^5.0.15` | Global client state (auth sessions, modal controls, active chat navigation) |
| `socket.io-client` | `^4.8.3` | Bi-directional WebSocket communication, real-time sync, event listeners |
| `tailwindcss` | `^4` | Utility-first CSS framework with CSS variables design tokens |
| `@tailwindcss/postcss` | `^4` | PostCSS integration for Tailwind CSS v4 |
| `framer-motion` | `^12.40.0` | UI animations, layout transitions, interactive drawer animations |
| `lucide-react` | `^1.17.0` | Iconography |
| `sonner` | `^2.0.7` | Toast notifications with action hooks |
| `canvas-confetti` | `^1.9.4` | Scoped celebration effects on positive milestone actions |
| `clsx` / `tailwind-merge` | `^2.1.1` / `^3.6.0` | Dynamic class merging (`cn()` utility) |

---

## 🚀 Setup & Run Instructions

### 1. Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher

### 2. Installation

```bash
# Clone the repository
git clone <repository-url>
cd ChatFlow

# Install dependencies
npm install
```

### 3. Environment Variables

Create `.env.local` in the project root:

```bash
cp .env.example .env.local
```

Ensure the following variables are configured:

```env
# Central Backend REST API Base URL
NEXT_PUBLIC_API_URL=https://frontend-task-chatapp.onrender.com/api

# WebSocket Server Origin (root origin without /api prefix)
NEXT_PUBLIC_SOCKET_URL=https://frontend-task-chatapp.onrender.com
```

### 4. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Verification & Build Pipeline

```bash
# Type check
npx tsc --noEmit

# Lint check
npm run lint

# Production build
npm run build
```

---

## 📁 Project Structure

```text
ChatFlow/
├── app/
│   ├── (auth)/
│   │   └── login/page.tsx               # Phone + Name login and auto-registration
│   ├── (routes)/
│   │   └── chat/
│   │       ├── [id]/page.tsx            # Active conversation panel (Direct & Group)
│   │       ├── layout.tsx               # Chat shell: Socket provider, auth guard, sidebar, modals
│   │       └── page.tsx                 # Workspace canvas and empty state
│   ├── globals.css                      # Tailwind v4 theme tokens, glassmorphism, scrollbars
│   ├── layout.tsx                       # Root layout with font and metadata
│   ├── loading.tsx                      # Root fallback loader
│   ├── not-found.tsx                    # Custom 404 page
│   └── providers.tsx                    # TanStack QueryClientProvider, AuthInitializer, Toaster
├── components/
│   └── chat/
│       ├── AddMembersModal.tsx          # Group member addition modal with debounced search
│       ├── ChatPanel.tsx                # Active conversation header, messages feed, input
│       ├── ConnectionBanner.tsx         # Reconnection status indicator
│       ├── ConversationDetailsPanel.tsx # Group drawer with member list, admin controls, actions
│       ├── EmojiPickerPopover.tsx       # Categorized emoji reaction popover
│       ├── GifPickerPopover.tsx         # Curated reaction GIF picker
│       ├── GlobalSearchModal.tsx        # Spotlight command palette (⌘K) for direct, group & users
│       ├── MemberProfileModal.tsx       # Participant inspection modal with copy & direct action
│       ├── MessageInput.tsx             # Expanding textarea, emoji trigger, optimistic submit
│       ├── MessageList.tsx              # Reverse infinite scroll, sender alignment, date dividers
│       ├── NewChatModal.tsx             # Direct 1-to-1 conversation starter with filter tabs
│       ├── NewGroupModal.tsx            # Multi-participant group creator with validation
│       ├── Sidebar.tsx                  # Conversation list, type badges, unread counts, filter tabs
│       └── UserProfileModal.tsx         # Profile drawer with copy action and logout trigger
├── hooks/
│   ├── useConversations.ts              # TanStack Query ['conversations'] & group/direct mutations
│   ├── useMessages.ts                   # TanStack Infinite Query ['messages', id] with reverse cursor
│   ├── useSendMessage.ts                # Optimistic dispatch with tempId, retry, and rollback
│   ├── useSocket.ts                     # Real-time WebSocket event listeners -> Query cache updates
│   └── useUserSearch.ts                 # 300ms debounced user search query
├── lib/
│   ├── api.ts                           # Axios-free HTTP client with Bearer auth & 401 interceptor
│   ├── confetti.ts                      # Scoped celebration trigger utility
│   ├── socket.ts                        # Socket.io client singleton with lifecycle management
│   └── utils.ts                         # Tailwind cn() class utility
├── sections/                            # Landing page sections (Hero, Bento, LiveDemo, FAQ, CTA)
├── shared/                              # Shared UI components (Navbar, Footer, BrandLogo, Badges)
├── store/
│   ├── useAuthStore.ts                  # Session storage, localStorage sync, 401 logout handler
│   └── useChatUIStore.ts                # Modals, active conversation ID, socket connection state
└── types/
    └── index.ts                         # Strict TypeScript domain interfaces
```

---

## 🧠 Part 3 — Thought Process Write-up

### 0. Groundwork & Preparatory Methodology (Before Coding)

Before writing production code, the following foundational groundwork was completed:

1. **API Brainstorming & Live Endpoint Verification**:
   - Manually tested every endpoint against the live backend (`https://frontend-task-chatapp.onrender.com/api`) using Swagger UI and curl to verify actual response payloads, status codes, and error shapes — feeding directly into [`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md).
2. **End-to-End User Flow Mapping**:
   - Mapped the entire application flow: phone login & auto-registration → debounced user search → starting 1-on-1 direct chats → optimistic messaging with retry → multi-member group creation & admin governance → WebSocket real-time sync and reconnection.
3. **UI/UX Research & Visual Direction**:
   - Researched design patterns and component micro-interactions across top design platforms (**Dribbble**, **Behance**, **Mobbin**, **Land-book**, **Awwwards**, **SiteInspire**, **Muzli**, **UI Movement**, **Refero.design**, **Screenlane**, **Collect UI**, **Pttrns**, and **UI8**).
   - Locked in the visual design system (clean layout, dark/light theme tokens, typography, glassmorphic card elevations, and scoped celebration triggers) before building components to avoid mid-implementation redesigns.
4. **System Architecture & State Boundaries**:
   - Formalized strict state management boundaries separating asynchronous server data (TanStack Query v5) from client UI toggles (Zustand v5) and establishing a resilient Socket.io lifecycle singleton.
5. **Continuous Documentation & Skill Maintenance**:
   - Maintained `AGENTS.md` and `.agents/skills/` as continuous sources of truth, updating rules and conventions whenever dependencies or integration patterns evolved.

### 1. Architecture & Approach (Part 1)

- **Separation of Concerns (Server vs. Client State)**:
  - Used **TanStack Query v5** exclusively for all asynchronous server state (`['conversations']`, `['messages', id]`, `['users', 'search']`). This provides out-of-the-box cache deduplication, background re-fetching, and declarative loading/error states.
  - Used **Zustand v5** strictly for client UI state (active conversation selection, modal open/closed states, socket connection flags, and auth session tokens). This prevents mixing remote network state with transient UI layout toggles.
- **Optimistic Message Mutations & Reversible Cache Rollback**:
  - In `useSendMessage.ts`, outgoing messages generate a client UUID (`tempId`) and are immediately appended to the infinite query cache with `status: 'sending'`.
  - When the server responds with the saved `Message` object, the cache reconciles the temporary message with the real server message (`status: 'sent'`).
  - If the network fails, the message is updated in place to `status: 'failed'` and provides a one-click tap-to-retry mechanism without wiping user input.
- **Reverse Infinite Message Pagination**:
  - Implemented in `useMessages.ts` using TanStack Query's `useInfiniteQuery`. The cursor uses the oldest message's `_id` (`&before=<cursor>`) to fetch prior pages.
  - In `MessageList.tsx`, viewport scroll offsets are preserved when prepending older pages so the user's reading position never jumps.
- **Socket.io Lifecycle & Reconnection Gap-Filling**:
  - Socket connection is maintained as a singleton in `lib/socket.ts` authenticated via JWT in the handshake payload (`auth: { token }`).
  - To prevent missed messages during brief network drops or laptop sleep cycles, a `connect` listener automatically invalidates both `['conversations']` and `['messages', activeId]`, filling any gap in real-time history.

### 2. Design Reasoning (Part 2)

- **Design Inspiration & R&D Platforms**:
  - Synthesized modern chat, command-palette, and workspace UI patterns inspired by research across **Dribbble**, **Behance**, **Mobbin**, **Land-book**, **Awwwards**, **SiteInspire**, **Muzli**, **UI Movement**, **Refero.design**, **Screenlane**, **Collect UI**, **Pttrns**, and **UI8**.
- **Aesthetic Direction**:
  - Implemented a clean SaaS design system with dark/light mode fidelity, subtle purple/indigo gradients (`#8E7CFF` to `#725CFF`), 1px translucent border rings, and glassmorphic card surfaces (`backdrop-blur-md`).
- **Interactive Demonstrations Over Static Mockups**:
  - Built interactive live components in `sections/LiveDemoSection.tsx` allowing visitors to test optimistic message dispatch, group messaging, and reaction emojis before logging in.
- **Micro-Interactions & Celebration Scoping**:
  - Added smooth transitions via `framer-motion` for drawer slide-overs and message entry animations.
  - Restricted confetti bursts strictly to positive milestone actions (copying profile data, adding members, and promoting admins) to maintain a refined feel without visual noise.

### 3. AI Tool Usage

- **Tools Used**:
  - Google DeepMind Antigravity IDE (Gemini 3.7 Flash agentic assistant).
- **Specific Tasks Handled by AI**:
  - Scaffolding repetitive boilerplate (TypeScript interface declarations in `types/index.ts`, initial CRUD API wrappers in `lib/api.ts`, and SVG icon integration).
  - Investigating API response structures and drafting initial TanStack Query infinite query parameters.
  - Assisting in debugging race conditions in WebSocket connection cleanup during Next.js hot module reloads.
- **What Was Changed, Rejected, or Written Manually**:
  - **Rejected AI's merged omni-search modal**: The AI initially combined direct teammate search, global chat search, and channel browsing into a single overloaded dialog. Manually rejected this and split it into two purpose-built tools: a focused `NewChatModal` (dedicated to starting 1-on-1 chats with "New Contacts" vs. "Already Messaged" filter tabs) and a dedicated Spotlight command palette `GlobalSearchModal` (`⌘K`).
  - **Rejected unconstrained confetti triggers**: The AI initially attached celebration confetti to every routine interaction (opening a chat, submitting a regular message, clicking share). Manually pruned these and restricted confetti strictly to meaningful administrative milestones.
  - **Rewrote WebSocket lifecycle listeners**: The initial AI-generated socket hook re-bound listeners whenever `activeConversationId` changed, causing dropped message events and duplicate handlers. Manually separated socket event binding from conversation room subscription using stable ref handlers and isolated `useEffect` blocks.

### 4. What I'd Improve With More Time

- **End-to-End Test Suite**: Add multi-client Playwright tests simulating two concurrent browser sessions exchanging real-time messages and verifying group admin privilege changes.
- **Rich Media & File Uploads**: Add support for uploading images, documents, and voice notes via pre-signed S3/Cloudinary URLs with client-side compression and progress bars.
- **Message Editing & Deletion**: Implement soft message deletion and edit history tracking over both REST endpoints and real-time socket events.
- **Web Push Notifications**: Integrate the browser Notification API and Service Workers to alert users of inbound mentions and direct messages when the tab is inactive.

### 5. API Issues Encountered

- **Response Shape Inconsistency on `GET /auth/me`**:
  - Unlike `POST /auth/login` (which returns `{ token, user: { _id, name, phone } }`), calling `GET /auth/me` returns the raw user object directly at the root `{ _id, name, phone, createdAt }` without the `{ user: ... }` wrapper.
  - *Fix*: Implemented defensive normalization in `lib/api.ts` `getMe()` (`const raw = res.data; return { user: raw?.user || raw?.data || raw }`) so user state is reliably populated on page reload without causing session hydration drops.
- **Socket Origin vs. API Base URL**:
  - REST endpoints are prefixed under `/api` (`https://frontend-task-chatapp.onrender.com/api`), but the Socket.io server listens on the root origin (`https://frontend-task-chatapp.onrender.com`).
  - *Fix*: Maintained separate environment variables (`NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SOCKET_URL`) to ensure handshakes connect to the root domain while REST calls target `/api`.

---

## 📄 Submission & Author Information

- **Project**: ChatFlow — Frontend Take-Home Assignment
- **Candidate**: Siam
- **Live Demo**: [https://chatflow-delta.vercel.app](https://chatflow-delta.vercel.app)
- **API Documentation**: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **License**: MIT

