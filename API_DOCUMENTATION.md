# ChatFlow API Specification & Documentation

Welcome to the **ChatFlow REST & Real-Time API Documentation**. This document describes the architecture, authentication, endpoints, data contracts, and WebSocket event lifecycle for the ChatFlow communication service.

- **Base REST URL**: `https://frontend-task-chatapp.onrender.com/api`
- **WebSocket URL**: `https://frontend-task-chatapp.onrender.com`
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
  transports: ['websocket', 'polling']
});
```

---

## 2. REST Endpoints

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
  - `200 OK`
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
  - `200 OK`
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
  - `q` (string, required): Search query term
- **Headers**: `Authorization: Bearer <token>`
- **Responses**:
  - `200 OK`
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
Retrieves all conversations for the authenticated user, sorted by most recent activity (`updatedAt` descending).

- **Headers**: `Authorization: Bearer <token>`
- **Responses**:
  - `200 OK`
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
        },
        {
          "_id": "665f1a2b3c4d5e6f7a8b9c0f",
          "name": "Sarah Jenkins",
          "phone": "+1122334455"
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
  "participantIds": [
    "665f1a2b3c4d5e6f7a8b9c0e",
    "665f1a2b3c4d5e6f7a8b9c0f"
  ]
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
  - `200 OK`
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
  - `201 Created`
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
Rename group conversation.

- **Request Body**: `{ "name": "New Team Name" }`

#### `POST /conversations/{id}/participants`
Add new participants to an existing group.

- **Request Body**: `{ "userIds": ["665f1a2b3c4d5e6f7a8b9c0f"] }`

#### `DELETE /conversations/{id}/participants/{userId}`
Remove a participant from the group or leave the group.

#### `POST /conversations/{id}/admins`
Promote an existing participant to admin status.

- **Request Body**: `{ "userId": "665f1a2b3c4d5e6f7a8b9c0e" }`

---

## 3. Real-Time Socket.IO Events

### Client Listeners

| Event | Payload | Trigger Condition |
|---|---|---|
| `message:new` | `Message` object | Inbound message dispatched to any conversation the user belongs to |
| `conversation:updated` | `Conversation` object | Group renamed, member added/removed, admin status updated |
| `connect` | void | Socket handshake succeeded |
| `disconnect` | `reason: string` | Socket disconnected / network dropped |

---

## 4. Error Handling Standards

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
