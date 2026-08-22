---
name: coding-standards
description: 'Naming conventions, import ordering, folder placement, and utility usage for ChatFlow'
---

# Coding Standards — ChatFlow

---

## 📁 File & Folder Naming

| Type              | Convention                    | Example                                     |
| :---------------- | :---------------------------- | :------------------------------------------ |
| Component files   | **PascalCase** `.tsx`         | `MessageBubble.tsx`, `ConversationList.tsx` |
| Route directories | **kebab-case**                | `chat/`, `login/`                           |
| Utility files     | **camelCase** `.ts`           | `utils.ts`, `socket.ts`                     |
| Hook files        | **camelCase**, `use` prefix   | `useAutoScroll.ts`, `useSocket.ts`          |
| Store files       | **camelCase**, `Store` suffix | `authStore.ts`, `chatStore.ts`              |

---

## 🧩 Component Naming

- **Default export** for page-level and top-level feature components:

```tsx
  export default function ChatPage() { ... }
```

- **Named export** for shared/reusable components, hooks, and types:

```tsx
  export function MessageBubble(...) { ... }
  export function useAutoScroll(...) { ... }
  export interface Message { ... }
```

---

## 📋 `interface` vs `type`

| Pattern     | Used for                                                                    |
| :---------- | :-------------------------------------------------------------------------- |
| `interface` | Component props, exportable data models (`Message`, `Conversation`, `User`) |
| `type`      | Union/literal types (`type ConversationType = 'direct' \| 'group'`)         |

---

## 📥 Import Order

```tsx
// 1. React
import { useState } from 'react';

// 2. Next.js built-ins
import { useRouter } from 'next/navigation';

// 3. Internal — project aliases
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { useConversations } from '@/hooks/useConversations';

// 4. Types
import type { Conversation } from '@/types/conversation';

// 5. Local/relative
import { ConversationListItem } from './ConversationListItem';
```

---

## 🗺️ Path Aliases

| Alias            | Resolves To          |
| :--------------- | :------------------- |
| `@/*`            | `./src/*`            |
| `@/components/*` | `./src/components/*` |
| `@/lib/*`        | `./src/lib/*`        |
| `@/store/*`      | `./src/store/*`      |
| `@/hooks/*`      | `./src/hooks/*`      |
| `@/types/*`      | `./src/types/*`      |

---

## 🎨 Class Merging — `cn()`

```ts
// src/lib/utils.ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Always use `cn()` when merging 2+ class strings or accepting an external `className` prop.

---

## 🔤 Section Comments

```tsx
/* ── Message List ── */
{
  /* ── Sidebar ── */
}
```

---

## ✅ Coding Standards Checklist

- [ ] PascalCase components, camelCase utils/hooks/stores.
- [ ] `interface` for props/models, `type` for unions.
- [ ] Import order followed.
- [ ] `@/*` aliases used, no deep relative paths.
- [ ] `cn()` used for all class merging.
