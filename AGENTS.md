# ChatFlow — Product Requirements, API Specs & Architecture

Base URL (REST): `https://frontend-task-chatapp.onrender.com/api` (Configured via `NEXT_PUBLIC_API_URL`)  
Socket URL: `https://frontend-task-chatapp.onrender.com` (root origin, JWT in handshake `auth: { token }`, configured via `NEXT_PUBLIC_SOCKET_URL`)  
API Docs Reference: `https://frontend-task-chatapp.onrender.com/docs`

---

## 1. Technical Stack & State Architecture

- **Framework**: Next.js 16 (App Router with route groups `(auth)` & `(routes)`) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Lucide React + Framer Motion + Sonner Toasts
- **Global Client State**: Zustand (`store/useAuthStore.ts`, `store/useChatUIStore.ts`)
- **Server State & Caching**: TanStack Query v5 (`@tanstack/react-query`) with infinite queries & optimistic mutations
- **Real-Time Communication**: Socket.io Client v4 (`lib/socket.ts`, `hooks/useSocket.ts`)
- **Visuals & Polish**: Canvas Confetti for milestone celebrations, dark mode support, and layout-preserving skeletons

---

## 2. Directory & Component Architecture

```text
c:\Work_With_Company\Task\
├── app/
│   ├── layout.tsx                    # Root layout (Inter font, Providers, SEO metadata)
│   ├── page.tsx                      # Route: / → Creative Landing Page (Part 2)
│   ├── loading.tsx                   # Fallback loading
│   ├── not-found.tsx                 # 404 Not Found
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
├── store/
│   ├── useAuthStore.ts               # Auth session, token storage, login/logout, 401 interceptor wiring
│   └── useChatUIStore.ts             # Modal toggles, active conversation ID, socket connection state
├── hooks/
│   ├── useConversations.ts           # TanStack Query ['conversations'] + direct/group mutations
│   ├── useMessages.ts                # TanStack Infinite Query ['messages', id] + reverse pagination
│   ├── useSendMessage.ts             # Optimistic message sending with tempId, retry, and rollback
│   ├── useSocket.ts                  # Real-time WebSocket event listeners -> Query cache updates
│   └── useUserSearch.ts              # Debounced user search query
├── lib/
│   ├── api.ts                        # Central HTTP client, Bearer injection, 401 interceptor
│   ├── socket.ts                     # Socket.io instance, reconnect gap-filling invalidation
│   ├── confetti.ts                   # Milestone celebration confetti trigger
│   └── utils.ts                      # Tailwind cn() merge utility
└── types/
    └── index.ts                      # TypeScript interfaces (User, Conversation, Message, etc.)
```

---

## 3. API Endpoints & Contract Mapping

| Endpoint                                    | Method   | Purpose                              | Request Body / Query                         | Expected Response Shape                                    |
| ------------------------------------------- | -------- | ------------------------------------ | -------------------------------------------- | ---------------------------------------------------------- |
| `/auth/login`                               | `POST`   | Login / Auto-registration            | `{ phone: string, name: string }`            | `{ token: string, user: { _id, name, phone, createdAt } }` |
| `/auth/me`                                  | `GET`    | Token Verification / Session Restore | Headers: `Authorization: Bearer <token>`     | `{ user: { _id, name, phone, createdAt } }`                |
| `/users/search`                             | `GET`    | Fuzzy User Search                    | `?q=query`                                   | `[{ _id: string, name: string, phone: string }]`           |
| `/conversations`                            | `GET`    | Fetch User Conversations             | Headers: `Authorization`                     | `{ data: [ Conversation ] }`                               |
| `/conversations`                            | `POST`   | Create Direct Conversation           | `{ userId: string }`                         | `Conversation`                                             |
| `/conversations/group`                      | `POST`   | Create Group Conversation            | `{ name: string, participantIds: string[] }` | `Conversation`                                             |
| `/conversations/{id}/messages`              | `GET`    | Fetch Paginated Messages             | `?limit=20&before=<oldestMessageId>`         | `{ messages: [ Message ], hasMore: boolean }`              |
| `/messages`                                 | `POST`   | Send Message (REST Send Path)        | `{ conversationId: string, text: string }`   | `Message`                                                  |
| `/conversations/{id}`                       | `PATCH`  | Rename Group (Admin only)            | `{ name: string }`                           | `Conversation`                                             |
| `/conversations/{id}/participants`          | `POST`   | Add Members (Admin only)             | `{ userIds: string[] }`                      | `Conversation`                                             |
| `/conversations/{id}/participants/{userId}` | `DELETE` | Remove Member / Leave Group          | -                                            | `{ success: boolean }`                                     |
| `/conversations/{id}/admins`                | `POST`   | Promote Member to Admin              | `{ userId: string }`                         | `Conversation`                                             |
| `/health`                                   | `GET`    | Backend Health Check                 | -                                            | `{ status: "ok" }`                                         |

---

## 4. Core Feature Flows & Edge Cases

### 1. Authentication & Session Management

- **Single Auth Flow**: `POST /auth/login` automatically creates new accounts or logs in existing ones based on phone number.
- **Client Persistence**: Session saved to `localStorage` (`chatflow_token`, `chatflow_user`).
- **Session Hydration**: On initial load, `<AuthInitializer>` in `app/providers.tsx` calls `initializeAuth()`, restoring local session and validating against `GET /auth/me`.
- **Global 401 Interceptor**: If any request fails with `401 Unauthorized`:
  - `unauthorizedHandler()` invokes `logout()`.
  - Disconnects Socket.io.
  - Clears `localStorage` and resets Zustand Auth Store.
  - Displays toast notification: _"Session expired. Please log in again."_
  - Redirects user to `/login`.

### 2. Sidebar & Conversation Navigation

- **Data Query**: `GET /conversations` cached under query key `['conversations']`.
- **Display Details**:
  - Direct chat: renders other participant's name, phone, and `lastMessage`.
  - Group chat: renders group name, member count badge, and `lastMessage`.
  - Unread badge counter with real-time incrementing for background messages.
  - Sorted chronologically with latest activity on top.
- **Adaptive Mobile Layout**: On viewports `< 768px`, selecting a conversation hides the sidebar and renders the full-screen chat panel with a back button to return to the list.

### 3. Direct Conversation Creation

- Search modal with 300ms debounce calling `GET /users/search?q=`.
- Excludes current authenticated user from search results.
- **Cache Optimization**: Checks local sidebar conversations before making `POST /conversations`. If direct conversation already exists, navigates directly to `/chat/[id]` without redundant network calls.

### 4. Group Conversation Creation

- Input group name and multi-select members.
- Validation: Name required, minimum 2 selected participants (total ≥ 3 with creator).
- Calls `POST /conversations/group` with `{ name, participantIds }`.
- On success: prepends new group to sidebar query cache, triggers celebratory confetti, and opens `/chat/[newGroupId]`.

### 5. Chat Panel, Reverse Infinite Pagination & Smart Auto-Scroll

- **Data Query**: `GET /conversations/{id}/messages?limit=20` under `['messages', conversationId]`.
- **Reverse Pagination**: As user scrolls near the top and `hasMore === true`, fetches next page using oldest message `_id` as cursor (`&before=<cursor>`) without jumping viewport.
- **Optimistic Message Sending**:
  - Appends `{ tempId, text, status: 'sending', createdAt, sender }` immediately to cache.
  - Replaces optimistic message with real server message on success (`status: 'sent'`).
  - Marks message as `status: 'failed'` on error with a one-click tap-to-retry action.
- **Smart Auto-Scroll**:
  - Automatically scrolls down if user is near bottom when new messages arrive.
  - If scrolled up reading history, shows floating `"↓ New message"` badge.

### 6. Real-Time Socket.io Lifecycle

- Root origin connection with JWT handshake: `io(SOCKET_URL, { auth: { token } })`.
- **`message:new` Listener**:
  - Active Chat: Appends message to `['messages', activeId]` cache with deduplication.
  - Background Chat: Bumps conversation to top of `['conversations']` cache and increments `unreadCount`.
- **`conversation:updated` Listener**:
  - Live patches group metadata changes across sidebar and header.
- **Reconnection Gap-Filling**:
  - When connection is restored after a disconnect or sleep, automatically invalidates `['conversations']` and `['messages', activeId]` to sync any missed messages.

### 7. Group Administration & RBAC

- Admin check: `conversation.admins?.includes(currentUser._id)`.
- UI gating: Rename, add members, remove member, and promote admin actions are only shown to group admins.
- Leave group action is accessible to all members.

### 8. Landing Page (Part 2)

- High-converting modern SaaS landing page at root `/`:
  - Hero section with live animated simulated chat preview.
  - Interactive feature bento grid.
  - Interactive live typing demo Demo.
  - Step-by-step "How it Works" guide, FAQ accordion, and CTA.

---

## 5. Verification & Quality Assurance Pipeline

Always run the static verification pipeline before completing tasks:

1. **TypeScript Typecheck**:
   ```bash
   npx tsc --noEmit
   ```
2. **ESLint**:
   ```bash
   npm run lint
   ```
3. **Production Build**:
   ```bash
   npm run build
   ```
