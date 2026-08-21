# ChatFlow — Product Requirements, API Specs & Architecture

Base URL (REST): `https://frontend-task-chatapp.onrender.com/api`  
Socket URL: `https://frontend-task-chatapp.onrender.com` (root origin, JWT in handshake `auth: { token }`)  
API Docs Reference: `https://frontend-task-chatapp.onrender.com/docs`

---

## 1. Technical Stack & State Architecture
- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Lucide React + Framer Motion
- **Global Client State**: Zustand (auth session, active chat, socket connection state, UI modals)
- **Server State & Caching**: TanStack Query v5 (conversations list, messages pagination, user search, gap-filling)
- **Real-Time Communication**: Socket.io Client v4 (events: `message:new`, `conversation:updated`, connect/disconnect lifecycle)

---

## 2. API Endpoints & Contract Mapping

| Endpoint | Method | Purpose | Request Body / Query | Expected Response Shape |
|---|---|---|---|---|
| `/auth/login` | POST | Login / Auto-registration | `{ phone: string, name: string }` | `{ token: string, user: { _id, name, phone, createdAt } }` |
| `/auth/me` | GET | Token Verification / Session Restore | Headers: `Authorization: Bearer <token>` | `{ user: { _id, name, phone, createdAt } }` |
| `/users/search` | GET | Fuzzy User Search | `?q=query` | `[{ _id: string, name: string, phone: string }]` |
| `/conversations` | GET | Fetch User Conversations | Headers: `Authorization` | `{ data: [ Conversation ] }` |
| `/conversations` | POST | Create Direct Conversation | `{ userId: string }` | `Conversation` |
| `/conversations/group` | POST | Create Group Conversation | `{ name: string, participantIds: string[] }` | `Conversation` |
| `/conversations/{id}/messages` | GET | Fetch Paginated Messages | `?limit=20&before=<cursor>` | `{ messages: [ Message ], hasMore: boolean }` |
| `/messages` | POST | Send Message (REST Send Path) | `{ conversationId: string, text: string }` | `Message` |
| `/conversations/{id}` | PATCH | Rename Group (Admin only) | `{ name: string }` | `Conversation` |
| `/conversations/{id}/participants` | POST | Add Members (Admin only) | `{ userIds: string[] }` | `Conversation` |
| `/conversations/{id}/participants/{userId}` | DELETE | Remove Member / Leave Group | - | `{ success: boolean }` |
| `/conversations/{id}/admins` | POST | Promote Member to Admin | `{ userId: string }` | `Conversation` |
| `/health` | GET | Backend Health Check | - | `{ status: "ok" }` |

---

## 3. Core Feature Flows & Edge Cases

### 1. Authentication & Session Management
- **Login / Register**: Enter phone and name. Single endpoint `POST /auth/login`. Automatically registers new users.
- **Persistence**: Save `{ token, user }` in Zustand with `localStorage` sync.
- **App Load**: If token exists in storage, call `GET /auth/me`. If valid (200), establish Socket connection and navigate to `/chat`. If 401/expired, clear storage and show `/login`.
- **Global 401 Handling**: Centralized HTTP client interceptor. If any request returns 401:
  - Disconnect Socket.
  - Clear Zustand Auth Store + localStorage.
  - Clear TanStack Query cache (`queryClient.clear()`).
  - Toast: *"Session expired. Please log in again."*
  - Redirect to `/login`.
- **Logout Flow**:
  - Explicit logout action in UI.
  - Disconnect Socket.
  - Clear all caches and stores.
  - Redirect to `/login`.

### 2. Sidebar & Conversation List
- **Data Fetch**: `GET /conversations` via TanStack Query.
- **Visuals**:
  - Direct chat: displays other `participant.name`, phone, and `lastMessage?.text`.
  - Group chat: displays `name`, participant count badge, and `lastMessage?.text`.
  - Safe optional-chaining: `lastMessage?.text` (handles empty groups gracefully).
  - Unread badge counter & live sorting (latest `updatedAt` on top).
- **States**: Skeleton list on loading, "No conversations yet" empty state, error state with retry.

### 3. Start New Direct Conversation
- Click "New Chat" -> Search Modal with 300ms debounce calling `GET /users/search?q=`.
- Exclude authenticated user (`currentUser._id`) from search results client-side.
- Show phone number alongside name to disambiguate identical names.
- **Cache Optimization**: Check local sidebar conversations before making `POST /conversations`. If direct conversation already exists, navigate directly to `/chat/[id]` without extra network call.
- Handle `400 UNKNOWN_USER` error gracefully with a toast.

### 4. Create Group Conversation
- Click "New Group" -> Group Creation Modal.
- Input Group Name + Multi-select search for participants (excluding self & already selected).
- Client validation: name required, at least 2 participants selected (total ≥ 3 including creator).
- Submit clean single JSON object `{ name, participantIds }` to `POST /conversations/group`.
- On success: prepend to sidebar and open `/chat/[newGroupId]`.

### 5. Chat Panel, Message Rendering & Auto-Scroll
- **Data Fetch**: `GET /conversations/{id}/messages?limit=20`.
- **Reverse Pagination**: When scrolling near top and `hasMore === true`, fetch next page with `&before=<oldestMessageId>`. Preserve scroll height without viewport jumping (`isFetchingOlder` guard).
- **Visual Distinction**:
  - **Own Messages**: Right-aligned, primary theme bubble color, sender label omitted.
  - **Incoming Messages**: Left-aligned, secondary/muted bubble color, sender name shown in groups.
  - **Timestamps**: Clear formatted time (e.g. `10:42 AM`) on every message bubble.
- **Message Sending**:
  - Disable send button when input is empty / whitespace-only.
  - Optimistic UI: Append `{ tempId, text, status: "sending", createdAt: new Date() }`.
  - Send via `POST /messages`.
  - Success -> update message status to `"sent"` and replace `tempId` with server `_id`.
  - Failure -> mark status as `"failed"` with one-click tap-to-retry.
  - Always auto-scroll to bottom when sending a message.
- **Smart Auto-Scroll for Incoming Messages**:
  - If user is already near bottom: automatically scroll down to show new message.
  - If user has scrolled up to read history: do not force scroll; display floating `"↓ New message"` pill button.

### 6. Real-Time Socket.io Lifecycle
- Connect to root origin with `auth: { token }`.
- **`message:new` Listener**:
  - For active conversation: append message with deduplication check (ignore if matching server `_id` already exists from optimistic REST response).
  - For background conversation: bump to top of sidebar list, update `lastMessage`, increment unread count.
- **`conversation:updated` Listener**:
  - Live patch conversation details (name changes, participant additions/removals) in sidebar and active header.
- **Connection Health**:
  - Display non-intrusive banner on `"disconnect"`: *"Reconnecting..."*.
  - On `"connect"` (reconnect): trigger automatic gap-fill query invalidation (`GET /conversations/{id}/messages` and `GET /conversations`).

### 7. Group Management (Admin UI Gating)
- Group info drawer/panel.
- Admin check: `conversation.admins?.includes(currentUser._id)`.
- Gating: Hide/disable rename, add members, remove member, and promote admin buttons for non-admin participants.
- Leave group available to all participants.

### 8. Creative Landing Page (Part 2)
- High-converting, modern, premium UI/UX:
  - Hero section with interactive real-time simulated chat preview.
  - Interactive feature bento grid (Zustand state, TanStack caching, Socket.io real-time, smart auto-scroll).
  - "How it Works" 3-step animated guide.
  - Interactive live typing demo sandbox.
  - Modern typography, dark/light theme fidelity, smooth micro-interactions.
  - Prominent CTA to `/login`.
