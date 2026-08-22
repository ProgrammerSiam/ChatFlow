---
name: api-integration
description: "Add, modify, or debug REST API endpoints and Socket.io real-time communication in ChatFlow — covers TanStack Query v5 queries/mutations, optimistic updates, and WebSocket events."
---

# API & Real-Time Integration Skill — ChatFlow

ChatFlow uses a unified client architecture:
- **REST API Client**: [`lib/api.ts`](file:///lib/api.ts) with Bearer token injection and global 401 interceptor.
- **Server State & Caching**: **TanStack Query v5** (`@tanstack/react-query`) via custom hooks in [`hooks/`](file:///hooks).
- **Real-Time WebSockets**: **Socket.io Client v4** via [`lib/socket.ts`](file:///lib/socket.ts) and [`hooks/useSocket.ts`](file:///hooks/useSocket.ts).

---

## 🌐 Endpoints & API Contract Map

Base URL (REST): `https://frontend-task-chatapp.onrender.com/api` (Configured via `NEXT_PUBLIC_API_URL`)  
Socket URL: `https://frontend-task-chatapp.onrender.com` (Configured via `NEXT_PUBLIC_SOCKET_URL`)

| Endpoint | Method | Function in `lib/api.ts` | Request Body / Query | Expected Response Shape |
|---|---|---|---|---|
| `/auth/login` | `POST` | `api.login(phone, name)` | `{ phone: string, name: string }` | `{ token: string, user: User }` |
| `/auth/me` | `GET` | `api.getMe()` | Headers: `Authorization: Bearer <token>` | `{ user: User }` |
| `/users/search` | `GET` | `api.searchUsers(query)` | `?q=query` | `SearchUser[]` |
| `/conversations` | `GET` | `api.getConversations()` | - | `{ data: Conversation[] }` |
| `/conversations` | `POST` | `api.createDirectConversation(userId)` | `{ userId: string }` | `Conversation` |
| `/conversations/group` | `POST` | `api.createGroupConversation(name, participantIds)` | `{ name: string, participantIds: string[] }` | `Conversation` |
| `/conversations/{id}/messages` | `GET` | `api.getMessages(id, limit, before)` | `?limit=20&before=<oldestId>` | `MessagesResponse` (`{ messages: Message[], hasMore: boolean }`) |
| `/messages` | `POST` | `api.sendMessage(conversationId, text)` | `{ conversationId: string, text: string }` | `Message` |
| `/conversations/{id}` | `PATCH` | `api.renameGroup(id, name)` | `{ name: string }` | `Conversation` |
| `/conversations/{id}/participants` | `POST` | `api.addGroupParticipants(id, userIds)` | `{ userIds: string[] }` | `Conversation` |
| `/conversations/{id}/participants/{userId}` | `DELETE` | `api.removeGroupParticipant(id, userId)` | - | `{ success: boolean }` |
| `/conversations/{id}/admins` | `POST` | `api.promoteGroupAdmin(id, userId)` | `{ userId: string }` | `Conversation` |
| `/health` | `GET` | `api.getHealth()` | - | `{ status: string }` |

---

## 🪝 TanStack Query Hooks Pattern

### 1. Conversations List (`hooks/useConversations.ts`)
```ts
// Query Key: ['conversations']
const query = useQuery({
  queryKey: ['conversations'],
  queryFn: async () => {
    const res = await api.getConversations();
    return res.data || [];
  },
  enabled: isAuthenticated,
  staleTime: 30 * 1000,
});
```

### 2. Reverse Paginated Messages (`hooks/useMessages.ts`)
```ts
// Query Key: ['messages', conversationId]
const query = useInfiniteQuery({
  queryKey: ['messages', conversationId],
  queryFn: async ({ pageParam }: { pageParam?: string }) => {
    if (!conversationId) return { messages: [], hasMore: false };
    return api.getMessages(conversationId, 20, pageParam);
  },
  initialPageParam: undefined as string | undefined,
  getNextPageParam: (lastPage: MessagesResponse) => {
    if (!lastPage.hasMore || !lastPage.messages?.length) return undefined;
    // Oldest message ID is used as cursor for the `before` parameter
    const oldest = lastPage.messages.reduce((prev, curr) => 
      new Date(curr.createdAt).getTime() < new Date(prev.createdAt).getTime() ? curr : prev
    );
    return oldest?._id;
  },
  enabled: !!conversationId && isAuthenticated,
  staleTime: 10 * 1000,
});
```

### 3. Optimistic Message Sending (`hooks/useSendMessage.ts`)
Optimistic updates ensure instant feedback, temp ID replacement, and automatic rollback on error:
- **`onMutate`**:
  - Cancel outgoing `['messages', conversationId]` queries.
  - Append `{ tempId, text, status: 'sending', createdAt, sender }` to the message cache.
  - Optimistically update the sidebar conversation's `lastMessage` and bump it to top.
- **`onSuccess`**:
  - Replace temporary optimistic message in cache with real server message (`status: 'sent'`).
  - Invalidate `['conversations']` to sync server timestamp.
- **`onError`**:
  - Mark message status as `'failed'` in cache to render one-click retry action.

---

## ⚡ Socket.io Real-Time Lifecycle (`hooks/useSocket.ts`)

- **Connection Handshake**: Initialized with root origin URL and `auth: { token }`.
- **`message:new` Listener**:
  - Active Conversation: Updates `['messages', activeId]` cache with deduplication.
  - Inactive/Background Conversation: Updates sidebar `['conversations']` list (bumps to top, updates `lastMessage`, increments `unreadCount`).
- **`conversation:updated` Listener**:
  - Live patches conversation metadata (name, member additions, promotions) in `['conversations']` cache.
- **Reconnection Gap-Filling**:
  - On `'connect'` (after reconnecting from disconnect), automatically invalidates `['conversations']` and `['messages', activeId]` to catch up on any missed activity.

---

## 🛡️ Global 401 Unauthorized Interceptor (`lib/api.ts`)

If any request returns `401 Unauthorized`:
1. `setUnauthorizedHandler()` triggers `useAuthStore.getState().logout()`.
2. Socket connection is disconnected (`disconnectSocket()`).
3. Local storage credentials are wiped.
4. User receives an intuitive toast: *"Session expired. Please log in again."*
5. Client redirects to `/login`.

---

## ✅ API Integration Checklist

- [ ] All network requests go through [`lib/api.ts`](file:///lib/api.ts).
- [ ] Query keys follow standard hierarchy (`['conversations']`, `['messages', id]`, `['users', 'search', query]`).
- [ ] Optimistic mutations handle `onMutate`, `onSuccess`, and `onError` rollback.
- [ ] Socket handlers safely deduplicate incoming messages against optimistic temporary IDs.
- [ ] Reconnect triggers automatic query cache invalidation.
