---
name: api-integration
description: "Comprehensive REST API contracts, request/response schemas, TanStack Query v5 state integration, optimistic mutations, and Socket.io real-time WebSocket event lifecycle for ChatFlow."
---

# API & Real-Time Integration Skill — ChatFlow

This skill serves as the comprehensive integration reference for ChatFlow's **REST API**, **TanStack Query v5 Server State Management**, and **Socket.IO v4 Real-Time WebSockets**.

- **Base REST URL**: `https://frontend-task-chatapp.onrender.com/api` (Configured via `NEXT_PUBLIC_API_URL`)
- **WebSocket URL**: `https://frontend-task-chatapp.onrender.com` (Configured via `NEXT_PUBLIC_SOCKET_URL`)
- **Protocol**: HTTPS / WSS
- **Format**: JSON (`Content-Type: application/json`)

---

## 1. Authentication & Security

All protected REST endpoints require a Bearer token in the HTTP Authorization header:

```http
Authorization: Bearer <JWT_TOKEN>
```

For WebSocket connections, the JWT must be supplied in the Socket.IO handshake `auth` object:

```javascript
const socket = io('https://frontend-task-chatapp.onrender.com', {
  auth: { token: '<JWT_TOKEN>' },
  transports: ['websocket', 'polling'],
});
```

---

## 2. REST Endpoints Specification

### 2.1 Auth Service

#### `POST /auth/login`
Logs in an existing user or automatically registers a new user if the phone number is not found.

- **Request Body**:
```json
{
  "phone": "+1234567890",
  "name": "Alex Mercer"
}
```
- **Responses**:
  - `200 OK`:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "665f1a2b3c4d5e6f7a8b9c0d",
      "name": "Alex Mercer",
      "phone": "+1234567890",
      "createdAt": "2026-08-21T12:00:00.000Z"
    }
  }
  ```
  - `400 Bad Request`: Missing `phone` or `name`.

---

#### `GET /auth/me`
Fetches the currently authenticated user's profile and validates session validity.

- **Headers**: `Authorization: Bearer <token>`
- **Responses**:
  - `200 OK`:
  ```json
  {
    "user": {
      "_id": "665f1a2b3c4d5e6f7a8b9c0d",
      "name": "Alex Mercer",
      "phone": "+1234567890",
      "createdAt": "2026-08-21T12:00:00.000Z"
    }
  }
  ```
  - `401 Unauthorized`: Missing or invalid/expired token.

---

### 2.2 Users Service

#### `GET /users/search`
Fuzzy searches users by name or phone number.

- **Query Parameters**:
  - `q` (string, required): Search query term (e.g. `?q=alex`)
- **Headers**: `Authorization: Bearer <token>`
- **Responses**:
  - `200 OK`:
  ```json
  [
    {
      "_id": "665f1a2b3c4d5e6f7a8b9c0e",
      "name": "Sarah Connor",
      "phone": "+1987654321"
    },
    {
      "_id": "665f1a2b3c4d5e6f7a8b9c0f",
      "name": "Sarah Jenkins",
      "phone": "+1122334455"
    }
  ]
  ```

---

### 2.3 Conversations Service

#### `GET /conversations`
Retrieves all conversations for the authenticated user, sorted chronologically by most recent activity (`updatedAt` descending).

- **Headers**: `Authorization: Bearer <token>`
- **Responses**:
  - `200 OK`:
  ```json
  {
    "data": [
      {
        "_id": "665f2a1b3c4d5e6f7a8b9c10",
        "type": "direct",
        "participant": {
          "_id": "665f1a2b3c4d5e6f7a8b9c0e",
          "name": "Sarah Connor",
          "phone": "+1987654321"
        },
        "lastMessage": {
          "_id": "665f3a1b3c4d5e6f7a8b9c20",
          "text": "See you tomorrow at 10!",
          "sender": "665f1a2b3c4d5e6f7a8b9c0e",
          "createdAt": "2026-08-21T15:30:00.000Z"
        },
        "unreadCount": 1,
        "updatedAt": "2026-08-21T15:30:00.000Z"
      },
      {
        "_id": "665f2a1b3c4d5e6f7a8b9c11",
        "type": "group",
        "name": "Frontend Engineering",
        "admins": ["665f1a2b3c4d5e6f7a8b9c0d"],
        "participants": [
          {
            "_id": "665f1a2b3c4d5e6f7a8b9c0d",
            "name": "Alex Mercer",
            "phone": "+1234567890"
          },
          {
            "_id": "665f1a2b3c4d5e6f7a8b9c0e",
            "name": "Sarah Connor",
            "phone": "+1987654321"
          }
        ],
        "lastMessage": null,
        "unreadCount": 0,
        "updatedAt": "2026-08-21T14:00:00.000Z"
      }
    ]
  }
  ```

---

#### `POST /conversations`
Creates a new 1-on-1 direct conversation with a target user.

- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
```json
{
  "userId": "665f1a2b3c4d5e6f7a8b9c0e"
}
```
- **Responses**:
  - `201 Created` / `200 OK`: Returns Conversation object.
  - `400 Bad Request`:
  ```json
  {
    "error": {
      "message": "One or more users do not exist",
      "code": "UNKNOWN_USER"
    }
  }
  ```

---

#### `POST /conversations/group`
Creates a new group conversation with a designated name and participant user IDs.

- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
```json
{
  "name": "Product Launch 2026",
  "participantIds": ["665f1a2b3c4d5e6f7a8b9c0e", "665f1a2b3c4d5e6f7a8b9c0f"]
}
```
- **Responses**:
  - `201 Created`: Returns newly created group Conversation object.
  - `400 Bad Request`: Invalid participant list or missing name.

---

#### `GET /conversations/{id}/messages`
Fetches a paginated slice of message history for a conversation.

- **Parameters**:
  - `id` (path, required): Conversation ID
  - `limit` (query, optional, default: 20): Number of messages per page
  - `before` (query, optional): Cursor (`_id` or timestamp) to fetch messages older than
- **Headers**: `Authorization: Bearer <token>`
- **Responses**:
  - `200 OK`:
  ```json
  {
    "messages": [
      {
        "_id": "665f3a1b3c4d5e6f7a8b9c20",
        "conversation": "665f2a1b3c4d5e6f7a8b9c10",
        "sender": {
          "_id": "665f1a2b3c4d5e6f7a8b9c0e",
          "name": "Sarah Connor"
        },
        "text": "See you tomorrow at 10!",
        "createdAt": "2026-08-21T15:30:00.000Z"
      }
    ],
    "hasMore": true
  }
  ```

---

#### `POST /messages`
Sends a new message to an active conversation (REST path with optimistic UI).

- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
```json
{
  "conversationId": "665f2a1b3c4d5e6f7a8b9c10",
  "text": "Sounds good, looking forward to it!"
}
```
- **Responses**:
  - `201 Created`:
  ```json
  {
    "_id": "665f3a1b3c4d5e6f7a8b9c21",
    "conversation": "665f2a1b3c4d5e6f7a8b9c10",
    "sender": {
      "_id": "665f1a2b3c4d5e6f7a8b9c0d",
      "name": "Alex Mercer"
    },
    "text": "Sounds good, looking forward to it!",
    "createdAt": "2026-08-21T15:31:00.000Z"
  }
  ```

---

### 2.4 Group Management Endpoints (Admin Controlled)

#### `PATCH /conversations/{id}`
Renames a group conversation.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**: `{ "name": "New Team Name" }`
- **Response**: Updated `Conversation` object.

#### `POST /conversations/{id}/participants`
Adds new members to an existing group.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**: `{ "userIds": ["665f1a2b3c4d5e6f7a8b9c0f"] }`
- **Response**: Updated `Conversation` object.

#### `DELETE /conversations/{id}/participants/{userId}`
Removes a participant from a group or allows a member to leave the group.
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ "success": true }`

#### `POST /conversations/{id}/admins`
Promotes an existing member to admin status.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**: `{ "userId": "665f1a2b3c4d5e6f7a8b9c0e" }`
- **Response**: Updated `Conversation` object.

#### `GET /health`
Backend health check.
- **Response**: `{ "status": "ok" }`

---

## 3. Real-Time Socket.IO Events

### Client Listeners

| Event | Payload | Trigger Condition |
|---|---|---|
| `message:new` | `Message` object | Inbound message dispatched to any conversation the user belongs to |
| `conversation:updated` | `Conversation` object | Group renamed, member added/removed, admin status updated |
| `connect` | void | Socket handshake succeeded |
| `disconnect` | `reason: string` | Socket disconnected / network dropped |
| `connect_error` | `error: Error` | Connection error / authentication failed |

---

## 4. TanStack Query v5 Hooks Architecture

### 4.1 Query Keys Hierarchy

| Hook | Query Key | Description |
|---|---|---|
| [`useConversations()`](file:///hooks/useConversations.ts) | `['conversations']` | User conversations list with lastMessage & unread count |
| [`useMessages(id)`](file:///hooks/useMessages.ts) | `['messages', id]` | Infinite query slice of conversation messages |
| [`useUserSearch(q)`](file:///hooks/useUserSearch.ts) | `['users', 'search', q]` | Debounced fuzzy user search results |

### 4.2 Reverse Pagination with Oldest Cursor
```ts
// hooks/useMessages.ts
const query = useInfiniteQuery({
  queryKey: ['messages', conversationId],
  queryFn: async ({ pageParam }: { pageParam?: string }) => {
    if (!conversationId) return { messages: [], hasMore: false };
    return api.getMessages(conversationId, 20, pageParam);
  },
  initialPageParam: undefined as string | undefined,
  getNextPageParam: (lastPage: MessagesResponse) => {
    if (!lastPage.hasMore || !lastPage.messages?.length) return undefined;
    // Find oldest message ID for reverse cursor
    const oldest = lastPage.messages.reduce((prev, curr) => 
      new Date(curr.createdAt).getTime() < new Date(prev.createdAt).getTime() ? curr : prev
    );
    return oldest?._id;
  },
  enabled: !!conversationId && isAuthenticated,
  staleTime: 10 * 1000,
});
```

### 4.3 Optimistic Message Sending & Rollback ([`hooks/useSendMessage.ts`](file:///hooks/useSendMessage.ts))
1. **`onMutate`**:
   - Create unique `tempId` (`temp-<timestamp>-<rand>`).
   - Cancel outgoing message queries to avoid race overwrites.
   - Optimistically append `{ tempId, text, status: 'sending', createdAt, sender }` to the `['messages', conversationId]` cache.
   - Optimistically bump conversation to top of sidebar with `lastMessage` updated.
2. **`onSuccess`**:
   - Replace temporary optimistic message in cache with the real server message (`status: 'sent'`).
   - Invalidate `['conversations']` to ensure sidebar state matches database timestamps.
3. **`onError`**:
   - Update message status to `'failed'` in cache to show one-click retry button.

---

## 5. Real-Time Socket Lifecycle & Cache Synchronization

The bridge between WebSocket events and client state lives in [`hooks/useSocket.ts`](file:///hooks/useSocket.ts) and [`lib/socket.ts`](file:///lib/socket.ts):

1. **`message:new` Event**:
   - **Active Chat**: Mutates `['messages', activeId]` cache with deduplication (replaces pending optimistic message if found, otherwise appends).
   - **Background Chat**: Updates sidebar `['conversations']` (bumps to top, updates `lastMessage`, increments `unreadCount`).
2. **`conversation:updated` Event**:
   - Direct cache patch of conversation metadata (name, participants, admin list).
3. **Reconnection & Gap Filling**:
   - When socket transitions from `disconnect` to `connect`, `initializeSocket` automatically invalidates `['conversations']` and `['messages', activeId]` to fetch missed messages during downtime.

---

## 6. Global 401 Unauthorized Handling

If any request returns `401 Unauthorized`:
1. `setUnauthorizedHandler()` triggers `useAuthStore.getState().logout()`.
2. Socket connection is disconnected (`disconnectSocket()`).
3. Local storage credentials are wiped.
4. User receives an intuitive toast: *"Session expired. Please log in again."*
5. Client redirects to `/login`.

---

## 7. Error Handling Standards

All HTTP error responses adhere to standard format:

```json
{
  "error": {
    "message": "Human readable explanation",
    "code": "ERROR_CODE_STRING"
  }
}
```

Standard status codes:
- `400`: Bad Request (Validation, Unknown User, Malformed Payload)
- `401`: Unauthorized (Expired token, missing credentials)
- `403`: Forbidden (Non-admin attempting admin actions)
- `404`: Resource Not Found
- `500`: Internal Server Error

---

## ✅ API Integration Checklist

- [ ] All network requests go through [`lib/api.ts`](file:///lib/api.ts).
- [ ] Query keys follow standard hierarchy (`['conversations']`, `['messages', id]`, `['users', 'search', query]`).
- [ ] Optimistic mutations handle `onMutate`, `onSuccess`, and `onError` rollback.
- [ ] Socket handlers safely deduplicate incoming messages against optimistic temporary IDs.
- [ ] Reconnect triggers automatic query cache invalidation.
