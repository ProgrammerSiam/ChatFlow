---
name: add-dependency
description: 'Safely add, update, or audit npm packages in ChatFlow — use before running any npm install command'
---

# Add Dependency Skill — ChatFlow

---

## 📋 Current Key Dependencies

| Package                    | Version  | Purpose                                                    |
| :------------------------- | :------- | :--------------------------------------------------------- |
| `next`                     | `16.2.6` | App framework — **pin this exact version**                 |
| `react` / `react-dom`      | `19.2.4` | UI runtime — **pin this exact version**                    |
| `typescript`               | `^5`     | Static typing                                              |
| `tailwindcss`              | `^4`     | Styling                                                    |
| `@tailwindcss/postcss`     | `^4`     | Tailwind PostCSS integration                               |
| `framer-motion`            | `^12`    | Animations                                                 |
| `lucide-react`             | `^1`     | Icon library                                               |
| `shadcn`                   | `^4`     | Component CLI                                              |
| `clsx`                     | `^2`     | Class name utility                                         |
| `tailwind-merge`           | `^3`     | Tailwind class conflict resolver                           |
| `embla-carousel-react`     | `^8`     | Carousel (landing page, if needed)                         |
| `class-variance-authority` | `^0.7`   | Component variant helper                                   |
| `tw-animate-css`           | `^1.4`   | Animation CSS utilities                                    |
| `zustand`                  | `^5`     | Client state (auth, active conversation, optimistic msgs)  |
| `@tanstack/react-query`    | `^5`     | Server state — conversations, messages, search, pagination |
| `socket.io-client`         | `^4`     | Real-time WebSocket connection                             |
| `react-hook-form`          | `^7`     | Login/group-create form handling                           |
| `zod`                      | `^3`     | Form + payload validation                                  |

---

## ➕ Adding a New Package

```bash
npm list <package-name>        # check if exists
npm install <package-name>      # runtime dep
npm install -D <package-name>   # dev-only dep
```

---

## ⚠️ Package Constraints

- **Package Manager**: `npm` exclusively — never yarn/pnpm/bun.
- **Do not upgrade `next` or `react`** without explicit approval.
- Avoid libraries needing `'use client'` globally.
- Prefer lightweight alternatives (`date-fns` over `moment`, `lucide-react` over `react-icons`).
- **No Redux/RTK** — this project uses Zustand + TanStack Query, not Redux Toolkit.

---

## 🔍 Checking Outdated Packages

```bash
npm outdated
```

---

## 🧹 After Adding a Package

1. Confirm `package.json` lists it.
2. Run `npm run build`.
3. Update `DEVELOPMENT.md` Tech Stack section if significant.
4. Update `AGENTS.md` Technology Stack section if it changes workflow.

---

## ✅ Add Dependency Checklist

- [ ] Not already present in `package.json`.
- [ ] Installed via `npm`.
- [ ] `npm run build` passes.
- [ ] Docs updated if significant addition.
