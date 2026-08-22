# ChatFlow — API & WebSocket Specifications

Complete reference documentation for the ChatFlow backend REST API and real-time Socket.io communication protocol.

- **Base URL (REST)**: `https://frontend-task-chatapp.onrender.com/api` (Configured via `NEXT_PUBLIC_API_URL`)
- **WebSocket Server Origin**: `https://frontend-task-chatapp.onrender.com` (Configured via `NEXT_PUBLIC_SOCKET_URL`)
- **Interactive Swagger Docs**: `https://frontend-task-chatapp.onrender.com/docs`

---

## 1. Authentication & Security

All protected endpoints require a stateless Bearer token in the `Authorization` request header:

```http
Authorization: Bearer <jwt_token>
```

### Response Status Codes
- `200 OK` / `201 Created`: Request succeeded.
- `400 Bad Request`: Validation failure or missing required fields.
- `401 Unauthorized`: Missing, malformed, or expired JWT token.
- `403 Forbidden`: Insufficient permissions (e.g. non-admin performing admin actions).
- `404 Not Found`: Resource (conversation, message, user) does not exist.
- `500 Internal Server Error`: Backend runtime exception.

---

## 2. REST Endpoints

### 2.1 Authentication

#### `POST /auth/login`
Logs in an existing user or automatically registers a new user if the phone number does not exist.

- **Request Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "phone": "01700000001",
    "name": "Siam"
  }
  ```
- **Response Shape (`200 OK`)**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "_id": "6a88cb57e5d6aac9752576f3",
      "name": "Siam",
      "phone": "01700000001",
      "createdAt": "2026-08-20T10:15:30.000Z"
    }
  }
  ```

#### `GET /auth/me`
Restores session and validates the current JWT token.

- **Request Headers**: `Authorization: Bearer <token>`
- **Response Shape (`200 OK`)**:
  ```json
  {
    "_id": "6a88cb57e5d6aac9752576f3",
    "name": "Siam",
    "phone": "01700000001",
    "createdAt": "2026-08-20T10:15:30.000Z"
  }
  ```
  *(Note: Response returns the user object directly at root).*

---

### 2.2 Users & Search

#### `GET /users/search`
Performs debounced fuzzy search for teammates by name or phone number. Excludes current authenticated user from results.

- **Request Headers**: `Authorization: Bearer <token>`
- **Query Parameters**:
  - `q` *(string, required)*: Search term (e.g., `?q=alex`)
- **Response Shape (`200 OK`)**:
  ```json
  [
    {
      "_id": "6a887ba1e5d6aac975233dd6",
      "name": "Alex Johnson",
      "phone": "01700000002"
    }
  ]
  ```

---

### 2.3 Conversations

#### `GET /conversations`
Retrieves all direct chats and group channels for the authenticated user, sorted chronologically with `lastMessage`.

- **Request Headers**: `Authorization: Bearer <token>`
- **Response Shape (`200 OK`)**:
  ```json
  {
    "data": [
      {
        "_id": "6a88cb57e5d6aac9752576f3",
        "type": "direct",
        "participant": {
          "_id": "6a887ba1e5d6aac975233dd6",
          "name": "Alex Johnson",
          "phone": "01700000002"
        },
        "lastMessage": {
          "_id": "6a88cb88e5d6aac975257701",
          "text": "Hey! Did the new socket listener land?",
          "sender": "6a887ba1e5d6aac975233dd6",
          "createdAt": "2026-08-22T14:30:00.000Z"
        },
        "unreadCount": 0,
        "updatedAt": "2026-08-22T14:30:00.000Z"
      }
    ]
  }
  ```

#### `POST /conversations`
Initiates a 1-to-1 direct conversation with another user.

- **Request Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "userId": "6a887ba1e5d6aac975233dd6"
  }
  ```
- **Response Shape (`201 Created`)**:
  ```json
  {
    "_id": "6a88cb57e5d6aac9752576f3",
    "type": "direct",
    "participant": {
      "_id": "6a887ba1e5d6aac975233dd6",
      "name": "Alex Johnson",
      "phone": "01700000002"
    },
    "updatedAt": "2026-08-22T14:32:00.000Z"
  }
  ```

#### `POST /conversations/group`
Creates a multi-member group conversation.

- **Request Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Frontend Engineering",
    "participantIds": [
      "6a887ba1e5d6aac975233dd6",
      "6a896144e5d6aac97529842b"
    ]
  }
  ```
- **Response Shape (`201 Created`)**:
  ```json
  {
    "_id": "6a895e87e5d6aac9752966c0",
    "type": "group",
    "name": "Frontend Engineering",
    "participants": [
      { "_id": "6a88cb57e5d6aac9752576f3", "name": "Siam", "phone": "01700000001" },
      { "_id": "6a887ba1e5d6aac975233dd6", "name": "Alex Johnson", "phone": "01700000002" },
      { "_id": "6a896144e5d6aac97529842b", "name": "Elena Rostova", "phone": "01700000003" }
    ],
    "admins": ["6a88cb57e5d6aac9752576f3"],
    "updatedAt": "2026-08-22T14:35:00.000Z"
  }
  ```

---

### 2.4 Messages & Pagination

#### `GET /conversations/{id}/messages`
Fetches paginated message history for a conversation using reverse cursor pagination.

- **Request Headers**: `Authorization: Bearer <token>`
- **Path Parameters**: `id` *(string, required)* — Conversation ID.
- **Query Parameters**:
  - `limit` *(number, optional, default: 20)*: Page size.
  - `before` *(string, optional)*: Oldest message ID cursor for previous history page.
- **Response Shape (`200 OK`)**:
  ```json
  {
    "messages": [
      {
        "_id": "6a88cb88e5d6aac975257701",
        "conversation": "6a88cb57e5d6aac9752576f3",
        "sender": {
          "_id": "6a887ba1e5d6aac975233dd6",
          "name": "Alex Johnson",
          "phone": "01700000002"
        },
        "text": "Hey! Socket sync verified.",
        "createdAt": "2026-08-22T14:30:00.000Z"
      }
    ],
    "hasMore": false
  }
  ```

#### `POST /messages`
Sends a new message in a conversation.

- **Request Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "conversationId": "6a88cb57e5d6aac9752576f3",
    "text": "Confirmed. Working smoothly!"
  }
  ```
- **Response Shape (`201 Created`)**:
  ```json
  {
    "_id": "6a88cb99e5d6aac975257705",
    "conversation": "6a88cb57e5d6aac9752576f3",
    "sender": "6a88cb57e5d6aac9752576f3",
    "text": "Confirmed. Working smoothly!",
    "createdAt": "2026-08-22T14:36:00.000Z"
  }
  ```

---

### 2.5 Group Administration

| Method | Endpoint | Description | Gated By |
| :--- | :--- | :--- | :--- |
| `PATCH` | `/conversations/{id}` | Rename group (`{ "name": string }`) | Admin only |
| `POST` | `/conversations/{id}/participants` | Add members (`{ "userIds": string[] }`) | Admin only |
| `DELETE` | `/conversations/{id}/participants/{userId}` | Remove member or leave group | Admin or Self |
| `POST` | `/conversations/{id}/admins` | Promote member to admin (`{ "userId": string }`) | Admin only |

---

## 3. Real-Time WebSocket (Socket.io)

- **Connection Endpoint**: `https://frontend-task-chatapp.onrender.com` (Root origin)
- **Handshake Authentication**: `io(SOCKET_URL, { auth: { token } })`

### WebSocket Events Specification

| Event | Origin | Payload Shape | Action in Application |
| :--- | :--- | :--- | :--- |
| `message:new` | Server → Client | `Message` object | If viewing active conversation, appends to message feed with deduplication. If background, bumps conversation to top and increments unread badge. |
| `conversation:updated` | Server → Client | `Conversation` object | Updates group title, participant counts, and admin privileges across the sidebar and header. |
| `connect` | Client Lifecycle | None | Triggers reconnection gap-filling by invalidating `['conversations']` and `['messages', activeId]`. |
| `disconnect` | Client Lifecycle | `reason: string` | Renders the reconnecting banner without tearing down active socket listeners. |

---

## 4. Health Check

#### `GET /health`
Returns backend service availability status.

- **Response (`200 OK`)**: `{ "status": "ok" }`
