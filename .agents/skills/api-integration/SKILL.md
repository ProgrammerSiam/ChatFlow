---
name: api-integration
description: 'Add, modify, or debug REST/WebSocket data fetching in ChatFlow — covers TanStack Query and socket.io-client. For client-only state (auth, active conversation), see the state-management skill instead.'
---

# API Integration Skill — ChatFlow

ChatFlow uses **TanStack Query** for all server/REST data (conversations, messages, user search)
and **socket.io-client** for real-time events. Client-only state is a separate concern — see the
**state-management** skill for Zustand.

> All REST calls go through TanStack Query hooks. No ad-hoc `fetch` inside components.

---

## 🗂️ File Structure

src/lib/
api/
client.ts # base fetch wrapper — auth header injection, base URL
auth.ts # login, /auth/me
conversations.ts # list, start direct, get messages, create group, participants, admins, rename
messages.ts # send message
users.ts # search
socket.ts # socket.io-client singleton, connect/disconnect lifecycle

---

## 📡 Base API Client

`src/lib/api/client.ts`:

```ts
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = useAuthStore.getState().token;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message ?? 'Request failed');
  }
  return res.json();
}
```

---

## 🔌 Socket Setup

`src/lib/socket.ts`:

```ts
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function connectSocket(token: string): Socket {
  if (socket?.connected) return socket;
  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, { auth: { token } });
  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}

export function getSocket(): Socket | null {
  return socket;
}
```

> ⚠️ **Socket connects to the root origin, NOT `/api`.** Do not append `/api` to `NEXT_PUBLIC_SOCKET_URL`.

**Events:**
| Direction | Event | Payload |
| :--- | :--- | :--- |
| client → server | `message:send` | `{ conversationId, text }` (optional ack) |
| server → client | `message:new` | new message object |
| server → client | `conversation:updated` | group changed (renamed/members/admins) |

---

## 🧩 Using TanStack Query in Components

```tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { getConversations } from '@/lib/api/conversations';

export function ConversationList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['conversations'],
    queryFn: getConversations,
  });

  if (isLoading) return <Skeleton />;
  if (isError) return <ErrorState />;
  if (!data?.length) return <EmptyState />;
  return (
    <>
      {data.map((c) => (
        <ConversationListItem key={c._id} conversation={c} />
      ))}
    </>
  );
}
```

### Query vs Mutation

|            | `useQuery`                         | `useMutation`                                   |
| :--------- | :--------------------------------- | :---------------------------------------------- |
| Use for    | GET-style reads (list, history)    | POST/PATCH/DELETE writes (send, create, rename) |
| Cache role | `queryKey` — cached under this key | `invalidateQueries` / `setQueryData` on success |

### Common Options

- `enabled: !!conversationId` — skip until required arg is ready.
- `staleTime` — tune per-resource freshness (conversations list can be short-lived).
- Infinite query (`useInfiniteQuery`) for message pagination — `before` cursor + `hasMore`.

---

## 🔄 Syncing Socket Events with Query Cache

On `message:new`, push into the relevant query cache directly instead of refetching:

```ts
socket.on('message:new', (message) => {
  queryClient.setQueryData(['messages', message.conversationId], (old) =>
    old ? { ...old, messages: [...old.messages, message] } : old
  );
  queryClient.invalidateQueries({ queryKey: ['conversations'] }); // reorder sidebar
});
```

---

## 🌊 Next.js App Router Notes

- TanStack Query hooks are client-only (`'use client'` required).
- Wrap the app once with `<QueryClientProvider>` in `app/providers.tsx`.
- Never call query hooks conditionally or outside a component/hook body.

---

## ✅ API Integration Checklist

- [ ] No ad-hoc `fetch` in components — everything routes through `lib/api/*` + TanStack Query.
- [ ] Socket connects to root origin, not `/api`.
- [ ] `message:new` updates query cache directly (no unnecessary refetch of message history).
- [ ] `conversation:updated` invalidates/updates the conversations list.
- [ ] Mutations that change server state invalidate the matching query key.
- [ ] Queries needing an argument that may be `undefined` use `enabled`.
