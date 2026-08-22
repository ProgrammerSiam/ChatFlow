# ChatFlow AI Agent Execution Rules

Mandatory rules and constraints for AI agents operating within the **ChatFlow** repository
(Next.js frontend take-home assignment — Part 1: real-time chat app, Part 2: landing page,
single repo dual-route).

---

## 🏗️ 1. Project Context & Tech Stack

- **Framework**: Next.js 16.2.6 (App Router) — pinned exact version
- **UI & React**: React 19.2.4 / react-dom 19.2.4 — pinned exact version
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`), Shadcn UI, `lucide-react`, `tw-animate-css`
- **Animations**: Framer Motion v12
- **Client state**: Zustand (auth, active conversation, optimistic message state)
- **Server/API state**: TanStack Query (React Query) — conversations, messages, search, pagination
- **Real-time**: `socket.io-client` — connects to API root origin, NOT `/api` base
- **Utilities**: `clsx` + `tailwind-merge` via `cn()`, `class-variance-authority`
- **Path Aliases**: `@/*` → `./src/*`
- **Package Manager**: `npm` exclusively — never yarn/pnpm/bun

---

## ⚡ 2. Process & Execution Constraints

- Do NOT launch redundant `npm run dev` if a dev server is already active.
- Do NOT use browser subagents or open `localhost` unless explicitly requested — rely on
  `tsc`, `lint`, `build` for static verification.
- Never introduce `yarn`, `pnpm`, or `bun`.

---

## 🧱 3. Architecture & Next.js 16 Rules

- **Server Component First**: all files in `app/`, `components/` default to Server Components.
- **Client Component Scoping**: `'use client'` only at the top of small, leaf components needing
  `useState`/`useEffect`/socket listeners/Zustand hooks/Framer Motion client interactivity.
- **Async APIs**: `params`/`searchParams` are Promises — always `await` them.
- **Single repo, dual route**: root `/` = Part 2 landing page, `/chat` (+ `/login`, `/chat/[id]`)
  = Part 1 chat app. Never split into separate repos without explicit instruction.

---

## 🎨 4. Styling & Component Design Rules

- Always merge classes with `cn()` from `@/lib/utils`.
- Standardize spacing/typography via Tailwind v4 theme tokens in `globals.css` — no arbitrary
  hardcoded hex unless a token doesn't exist yet.
- Icons: `lucide-react`, tree-shakeable named imports only.
- Motion: `framer-motion` for chat transitions, message reveal, landing page scroll reveals.
- _(Design system/color palette pending — do not invent brand colors until
  `uiux-design-system` skill is added.)_

---

## 🧹 5. Code Hygiene & Verification

- Never use `@ts-ignore`, `@ts-expect-error`, or `any` casts to force a pass.
- Remove all `console.log`/`debugger` before marking a task complete.
- Every code change must pass `.agents/skills/verification/SKILL.md` pipeline.

---

## 📝 6. Continuous Documentation Maintenance

### File Ownership Map

| File                        | Purpose                                           | Update When...                            |
| :-------------------------- | :------------------------------------------------ | :---------------------------------------- |
| `DEVELOPMENT.md`            | Local setup, scripts, tech stack, troubleshooting | Package added/removed, env var changes    |
| `AGENTS.md`                 | Agent guidelines, skills index                    | Architecture changes, new skills added    |
| `.agents/rules.md`          | Execution directives                              | Build/server policy, verification changes |
| `.agents/skills/*/SKILL.md` | Targeted workflow skills                          | New patterns emerge                       |
| `API_DOCUMENTATION.md`      | Part 1 required deliverable                       | API shape discovered/changed              |
| `README.md`                 | High-level summary, live links, Part 3 write-up   | Milestones, submission-ready              |

### Post-Task Checklist

- [ ] Dependencies changed? → update `DEVELOPMENT.md` + `add-dependency` skill table.
- [ ] Directory structure changed? → update `DEVELOPMENT.md` tree + `AGENTS.md` file map.
- [ ] New socket event / API endpoint used? → update `api-integration` skill + `API_DOCUMENTATION.md`.
- [ ] Coding conventions changed? → update `AGENTS.md` + `.agents/rules.md`.
