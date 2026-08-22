# 💬 ChatFlow — Next-Gen Real-Time Communication Platform

<div align="center">

![Next.js 16](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js)
![React 19](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=react-query)
![Zustand](https://img.shields.io/badge/Zustand-v5-brown?style=for-the-badge)
![Socket.io](https://img.shields.io/badge/Socket.io-v4-010101?style=for-the-badge&logo=socket.io)

**A lightning-fast, real-time messaging application and SaaS landing page built with modern frontend engineering.**

[🚀 Explore Live Demo](#-quick-start) • [📖 Architecture & State](#-architecture--state-management) • [🌐 API & Sockets](#-api--socket-contracts) • [🛡️ Quality Assurance](#-quality-assurance--verification)

</div>

---

## 🌟 Overview & Product Experience

ChatFlow delivers an ultra-smooth, low-latency communication suite consisting of two integrated experiences:

1. **Part 1 — Real-Time Chat Application (`/chat`)**:
   - **Direct & Group Messaging**: Seamless 1-on-1 conversations and multi-user group channels with real-time sync.
   - **Optimistic Message Mutations**: Instant UI dispatch with temporary IDs (`tempId`), status transitions (`sending` → `sent`), and tap-to-retry rollback on network error.
   - **Reverse Infinite Message Pagination**: Efficient cursor-based message loading (`before=<oldestId>`) that preserves scroll position.
   - **Smart Auto-Scroll**: Intelligent scroll locking that auto-scrolls when at the bottom, or displays a floating `"↓ New message"` badge when reading history.
   - **Real-Time WebSocket Synchronization**: Socket.io listener with automatic message deduplication, conversation reordering, unread badge counters, and reconnection gap-filling.
   - **Role-Based Group Administration**: Admin gating for group renaming, participant management, and member promotion.
   - **Debounced User Search**: 300ms debounced search with local sidebar conversation deduplication.
   - **Responsive Dual-Column Layout**: Adapts between a desktop split-pane and a mobile full-screen chat with back navigation.

2. **Part 2 — Creative Landing Page (`/`)**:
   - **Interactive Live Preview**: Interactive animated chat widget demonstrating real-time responses.
   - **Feature Bento Grid**: Highlighting state synchronization, TanStack Query caching, and resilient WebSockets.
   - **Interactive Typing Sandbox**: Live simulation allowing visitors to test messaging interactions.
   - **Modern Aesthetic**: Glassmorphism surfaces, dark/light theme fidelity, gradient glows, and celebratory milestone confetti.

---

## 🏗️ Architecture & State Management

ChatFlow uses a **hybrid state management pattern** separating client UI state from async server entities:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                              ChatFlow UI                               │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
        ┌───────────▼───────────┐        ┌───────────▼───────────┐
        │     Zustand Stores    │        │  TanStack Query v5    │
        ├───────────────────────┤        ├───────────────────────┤
        │ • useAuthStore        │        │ • ['conversations']   │
        │ • useChatUIStore      │        │ • ['messages', id]    │
        │ • Modals & UI Toggles │        │ • ['users', 'search'] │
        │ • Connection Status   │        │ • Optimistic Rollback │
        └───────────┬───────────┘        └───────────▲───────────┘
                    │                                │
                    │ Socket Events / Gap-Fill       │
                    └───────────►┌───────────────────┴───────────┐
                                 │      Socket.io Client v4      │
                                 │  • message:new                │
                                 │  • conversation:updated       │
                                 │  • Reconnection Gap-Filling   │
                                 └───────────────────────────────┘
```

- **Global Client State ([Zustand](file:///store))**:
  - [`store/useAuthStore.ts`](file:///store/useAuthStore.ts): Session state, JWT token persistence in `localStorage`, auto-registration login, token restoration (`initializeAuth`), and centralized 401 interceptor logout handling.
  - [`store/useChatUIStore.ts`](file:///store/useChatUIStore.ts): Active conversation ID, modal toggles (New Chat, New Group, Group Info, User Profile), socket connectivity, and sidebar collapse state.
- **Server State & Caching ([TanStack Query v5](file:///hooks))**:
  - [`hooks/useConversations.ts`](file:///hooks/useConversations.ts): Cached conversations list, instant sorting by latest activity, unread counter increments.
  - [`hooks/useMessages.ts`](file:///hooks/useMessages.ts): Reverse infinite pagination with `before` cursor and chronological message ordering.
  - [`hooks/useSendMessage.ts`](file:///hooks/useSendMessage.ts): Optimistic dispatch, temporary ID substitution, and failure recovery.
  - [`hooks/useUserSearch.ts`](file:///hooks/useUserSearch.ts): 300ms debounced search filtering out the current user.
- **Real-Time WebSockets ([Socket.io](file:///lib/socket.ts))**:
  - Handshake authentication with Bearer token.
  - Live query cache patching for inbound messages and group metadata updates.
  - Automatic cache invalidation on reconnection to prevent state drift during network interruptions.

---

## 📁 Project Directory Structure

```text
c:\Work_With_Company\Task\
├── app/
│   ├── layout.tsx                    # Root layout (Inter font, Providers, SEO metadata)
│   ├── page.tsx                      # Route: / → Creative Landing Page (Part 2)
│   ├── loading.tsx                   # Fallback loading component
│   ├── not-found.tsx                 # Custom 404 Not Found
│   ├── providers.tsx                 # QueryClientProvider, AuthInitializer, Sonner Toaster
│   ├── (auth)/
│   │   └── login/page.tsx            # Route: /login → Phone + name login / auto-registration
│   └── (routes)/
│       └── chat/
│           ├── layout.tsx            # Protected Chat shell (useSocket, Auth guard, Sidebar, Modals)
│           ├── page.tsx              # Route: /chat → Workspace canvas & empty state
│           └── [id]/page.tsx         # Route: /chat/[id] → Active conversation chat panel
├── components/
│   └── chat/
│       ├── Sidebar.tsx               # Conversations list, search filter, create actions, unread badges
│       ├── ChatPanel.tsx             # Active chat header, reverse infinite message list, message input
│       ├── MessageList.tsx           # Auto-scroll, date dividers, sender distinctions, status badges
│       ├── MessageInput.tsx          # Auto-expanding textarea, emoji picker, optimistic submission
│       ├── EmojiPickerPopover.tsx    # Category-filtered emoji popover
│       ├── NewChatModal.tsx          # Debounced user search (300ms), deduplication against sidebar
│       ├── NewGroupModal.tsx         # Multi-select search, participant validation, group creation
│       ├── ConversationDetailsPanel.tsx # Drawer for group info, member management & admin controls
│       └── UserProfileModal.tsx      # Current user profile drawer with logout trigger
├── sections/                         # Landing page sections (Hero, BentoGrid, LiveDemo, FAQ, CTA)
├── shared/                           # Shared UI components (Navbar, Footer, BrandLogo, CoolTooltip)
├── store/                            # Zustand stores (useAuthStore.ts, useChatUIStore.ts)
├── hooks/                            # Custom hooks (useConversations, useMessages, useSendMessage, etc.)
├── lib/                              # API client, Socket.io singleton, Confetti, and class utilities
└── types/
    └── index.ts                      # Strict TypeScript definitions
```

---

## 🌐 API & Socket Contracts

### REST Endpoints Reference

| Endpoint | Method | Purpose | Request Body / Query | Expected Response Shape |
|---|---|---|---|---|
| `/auth/login` | `POST` | Login / Auto-registration | `{ phone: string, name: string }` | `{ token: string, user: User }` |
| `/auth/me` | `GET` | Session Restore / Token Verify | Headers: `Authorization: Bearer <token>` | `{ user: User }` |
| `/users/search` | `GET` | Fuzzy User Search | `?q=query` | `SearchUser[]` |
| `/conversations` | `GET` | Fetch User Conversations | Headers: `Authorization` | `{ data: Conversation[] }` |
| `/conversations` | `POST` | Create Direct Chat | `{ userId: string }` | `Conversation` |
| `/conversations/group` | `POST` | Create Group Chat | `{ name: string, participantIds: string[] }` | `Conversation` |
| `/conversations/{id}/messages` | `GET` | Fetch Paginated Messages | `?limit=20&before=<oldestId>` | `{ messages: Message[], hasMore: boolean }` |
| `/messages` | `POST` | Send Message | `{ conversationId: string, text: string }` | `Message` |
| `/conversations/{id}` | `PATCH` | Rename Group (Admin only) | `{ name: string }` | `Conversation` |
| `/conversations/{id}/participants` | `POST` | Add Members (Admin only) | `{ userIds: string[] }` | `Conversation` |
| `/conversations/{id}/participants/{userId}` | `DELETE` | Remove Member / Leave Group | - | `{ success: boolean }` |
| `/conversations/{id}/admins` | `POST` | Promote Member to Admin | `{ userId: string }` | `Conversation` |
| `/health` | `GET` | Backend Health Check | - | `{ status: "ok" }` |

### Socket.io Real-Time Events

| Event | Direction | Payload | Description |
|---|---|---|---|
| `message:new` | Server → Client | `Message` | Inbound message dispatched to active/background conversations |
| `conversation:updated` | Server → Client | `Conversation` | Live updates for group rename, added/removed members, admin promotions |
| `connect` | Client | - | Handshake succeeded; triggers gap-fill query invalidation |
| `disconnect` | Client | `reason: string` | Socket disconnected; sets reconnecting UI badge |

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm` (v10+)

### 2. Installation
```bash
# Clone the repository
git clone <repository-url>
cd Task

# Install dependencies
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory (or copy from `.env.example`):
```bash
cp .env.example .env.local
```

Ensure the following variables are defined:
```env
NEXT_PUBLIC_API_URL=https://frontend-task-chatapp.onrender.com/api
NEXT_PUBLIC_SOCKET_URL=https://frontend-task-chatapp.onrender.com
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser:
- Landing Page: `http://localhost:3000/`
- Chat Application: `http://localhost:3000/chat`
- Login Screen: `http://localhost:3000/login`

---

## 🛡️ Quality Assurance & Verification

Before deployment, run the complete static verification pipeline:

```bash
# 1. Typecheck with TypeScript
npx tsc --noEmit

# 2. Linting with ESLint
npm run lint

# 3. Production Build
npm run build
```

---

<div align="center">
  <sub>Built with modern frontend standards for fast, fluid, and delightful communication.</sub>
</div>
