---
name: coding-standards
description: "Naming conventions, import ordering, folder placement, path aliases, and utility usage for ChatFlow"
---

# Coding Standards — ChatFlow

---

## 📁 File & Folder Naming

| Type | Convention | Example |
| :--- | :--- | :--- |
| Component files | **PascalCase** `.tsx` | `ChatPanel.tsx`, `Sidebar.tsx`, `NewGroupModal.tsx` |
| Route directories | **kebab-case** / **group brackets** | `app/(auth)/login/`, `app/(routes)/chat/[id]/` |
| Utility files | **camelCase** `.ts` | `utils.ts`, `socket.ts`, `api.ts`, `confetti.ts` |
| Hook files | **camelCase**, `use` prefix | `useMessages.ts`, `useSocket.ts`, `useSendMessage.ts` |
| Store files | **camelCase**, `use*Store` prefix/suffix | `useAuthStore.ts`, `useChatUIStore.ts` |
| Type definitions | **camelCase** `.ts` / `index.ts` | `types/index.ts` |

---

## 🧩 Component Patterns & Exports

- **Default export** for route pages and primary feature sections:
  ```tsx
  export default function ChatIndexPage() { ... }
  ```
- **Named export** for utility components, hooks, helpers, and types:
  ```tsx
  export function useMessages(conversationId: string | null) { ... }
  export interface User { ... }
  ```

---

## 📋 `interface` vs `type`

| Pattern | Used for |
| :--- | :--- |
| `interface` | Component props, data models (`Message`, `Conversation`, `User`, `AuthState`) |
| `type` | Unions, primitives, and utility types (`type FilterMode = 'all' \| 'shared'`) |

---

## 📥 Import Order

```tsx
// 1. React & React ecosystem
import { useState, useEffect, useMemo, use } from 'react';

// 2. Next.js built-ins
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

// 3. Third-party UI & Animation libraries
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Users, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// 4. Stores & Global state
import { useAuthStore } from '@/store/useAuthStore';
import { useChatUIStore } from '@/store/useChatUIStore';

// 5. Custom Hooks & Query hooks
import { useConversations } from '@/hooks/useConversations';
import { useMessages } from '@/hooks/useMessages';

// 6. Utilities & API
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';

// 7. Types
import type { Message, Conversation, User } from '@/types';

// 8. Shared / Local Components
import BrandLogo from '@/shared/BrandLogo';
import CoolTooltip from '@/shared/CoolTooltip';
```

---

## 🗺️ Path Aliases

In [`tsconfig.json`](file:///tsconfig.json), the alias `@/*` maps directly to the root directory `./*`:

| Alias | Resolves To |
| :--- | :--- |
| `@/app/*` | `./app/*` |
| `@/components/*` | `./components/*` |
| `@/hooks/*` | `./hooks/*` |
| `@/store/*` | `./store/*` |
| `@/lib/*` | `./lib/*` |
| `@/shared/*` | `./shared/*` |
| `@/sections/*` | `./sections/*` |
| `@/types/*` | `./types/*` |

---

## 🎨 Class Merging — `cn()`

Always use the `cn()` helper from [`lib/utils.ts`](file:///lib/utils.ts) when combining conditional Tailwind classes or passing external `className` props:

```ts
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```tsx
<div className={cn("p-4 rounded-2xl transition-all", isActive && "bg-primary/10 border-primary", className)}>
```

---

## ✅ Coding Standards Checklist

- [ ] Components use PascalCase, hooks and stores use camelCase (`use*`).
- [ ] Root path alias `@/*` used for all internal imports.
- [ ] Correct import ordering maintained.
- [ ] `cn()` used for class composition.
- [ ] Clean type annotations without `any` or `@ts-ignore`.
