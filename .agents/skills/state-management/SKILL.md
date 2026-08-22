---
name: state-management
description: 'Add, modify, or debug client-side state in ChatFlow — covers Zustand stores and SSR-safe patterns. For API/server data, see the api-integration skill instead.'
---

# State Management Skill — ChatFlow

ChatFlow uses **Zustand** for client-side state (auth session, active conversation, optimistic
message state, UI toggles). Server/API data is a separate concern — see **api-integration** for
TanStack Query.

> No Redux/RTK in this project — Zustand only.

---

## 🗂️ Store Structure

src/store/
authStore.ts # token, current user, login/logout actions
chatStore.ts # active conversationId, optimistic pending messages, unread counts

---

## 🔐 Auth Store

```ts
// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    { name: 'chatflow-auth' } // localStorage key
  )
);
```

---

## 💬 Chat Store

```ts
// src/store/chatStore.ts
import { create } from 'zustand';

interface ChatState {
  activeConversationId: string | null;
  pendingMessages: Record<string, PendingMessage[]>; // keyed by conversationId
  setActiveConversation: (id: string | null) => void;
  addPendingMessage: (conversationId: string, msg: PendingMessage) => void;
  resolvePendingMessage: (
    conversationId: string,
    tempId: string,
    real: Message
  ) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  activeConversationId: null,
  pendingMessages: {},
  setActiveConversation: (id) => set({ activeConversationId: id }),
  addPendingMessage: (conversationId, msg) =>
    set((s) => ({
      pendingMessages: {
        ...s.pendingMessages,
        [conversationId]: [...(s.pendingMessages[conversationId] ?? []), msg],
      },
    })),
  resolvePendingMessage: (conversationId, tempId, real) =>
    set((s) => ({
      pendingMessages: {
        ...s.pendingMessages,
        [conversationId]: (s.pendingMessages[conversationId] ?? []).filter(
          (m) => m.tempId !== tempId
        ),
      },
    })),
}));
```

---

## ➕ Adding a New Slice/Store

- One file per concern under `src/store/`.
- Use `persist` middleware only where localStorage durability is needed (auth token) — not for
  ephemeral UI/chat state.
- Never put server-fetched data (conversations, messages) in a Zustand store — that belongs to
  TanStack Query cache (see api-integration skill).

---

## 🔒 Local Component State

- `useState` for simple UI toggles (modal open, input value).
- `useReducer` for local multi-field state not shared app-wide.
- Never call `setState` synchronously inside a `useEffect` body without a guard.

```tsx
// ✅ Correct
const [text, setText] = useState('');

// ❌ Wrong
useEffect(() => {
  setText(initialText); // triggers react-hooks/set-state-in-effect
}, [initialText]);
```

---

## 🌊 SSR & Hydration Safety

- Zustand stores here are simple module-level singletons (client-only usage, no SSR-critical
  state) — this is safe because auth/chat UI state is never rendered server-side.
- `persist` middleware reads `localStorage` only on client mount — Zustand's `persist` handles
  hydration timing automatically; wrap any conditional render with a `hasHydrated` check if
  flicker occurs:

```ts
const hasHydrated = useAuthStore.persist?.hasHydrated();
```

---

## ✅ State Management Checklist

- [ ] Client state lives in `src/store/*.ts` — one file per concern.
- [ ] `persist` used only for auth token, not ephemeral chat/UI state.
- [ ] Server/API data is NOT in a Zustand store — see api-integration skill.
- [ ] No `setState`/store update called synchronously in `useEffect` without guard.
