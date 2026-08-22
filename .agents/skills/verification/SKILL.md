---
name: verification
description: "Static-analysis-only verification workflow with lint error fix recipes — required before marking any task complete. Do NOT use browser, localhost, or dev server."
---

# Verification Skill — ChatFlow

**Run after every code change, before marking a task complete.**

---

## 🚫 Hard Constraints

- **FORBIDDEN**: browser subagent, opening `localhost`, visual debugging tools.
- **FORBIDDEN**: `npm run dev`/`next dev` if a server is already active.
- **FORBIDDEN**: `@ts-ignore`, `@ts-expect-error`, `any` casts to force a pass.

---

## 🔄 Verification Pipeline

### Step 1 — TypeScript
```bash
npx tsc --noEmit
```
Required: 0 errors.

### Step 2 — ESLint
```bash
npm run lint
```
`eslint-config-next/core-web-vitals` + `typescript`. Required: 0 errors, warnings listed.

### Step 3 — Production Build
```bash
npm run build
```
Required: all routes compile, including `/`, `/login`, `/chat`, `/chat/[conversationId]`.

### Step 4 — Dependency Audit
```bash
npm audit --audit-level=high
```
Required: no high/critical vulnerabilities.

---

## ✅ Definition of Done

- [ ] Production-grade code quality (modular, strict types, clean composition).
- [ ] No `console.log`/`debugger` left.
- [ ] No `@ts-ignore`/`any` introduced.
- [ ] `cn()` used for all class merging.
- [ ] `git diff` scope reviewed — only intended files changed.
- [ ] Loading/empty/error states present for any new data-fetching UI.
- [ ] Auto-scroll behavior not broken by the change (if touching chat panel).

---

## 📊 Required Report Format
🛡️ Verification Report
[x/❌] tsc: <N errors>
[x/❌] lint: <N errors>, <N warnings>
[x/❌] build: <succeeded/failed>
[x/❌] audit: <0 high/critical>

Production Best Practices:

[x/❌] No console.log leftovers
[x/❌] No @ts-ignore / any casts introduced
[x/❌] Chat panel loading/empty/error/auto-scroll intact
[x/❌] git diff scope is correct

---

## 🩺 Lint Error Fix Recipes

### `react-hooks/set-state-in-effect`
```tsx
// ✅ Initialize from prop directly
const [text, setText] = useState(initialText);
```

### `@typescript-eslint/no-explicit-any`
```tsx
function handleData(data: unknown) {
  if (typeof data === 'object' && data !== null && 'id' in data) { ... }
}
```

### `react/no-unescaped-entities`
```tsx
<p>{"Don't send empty messages"}</p>
```

### `@next/next/no-img-element`
```tsx
import Image from 'next/image';
<Image src={user.avatar} alt="Avatar" width={40} height={40} className="rounded-full" />
```

### `@typescript-eslint/no-unused-vars`
```tsx
const [, setActiveId] = useState<string | null>(null);
```

---

## ✅ Lint Fix Checklist

- [ ] No synchronous `setState` in `useEffect` body.
- [ ] No `any` — specific types/`unknown`.
- [ ] No raw `'`/`"` in JSX text.
- [ ] No raw `<img>` tags.
- [ ] No unused imports/variables.
- [ ] `npm run lint` rerun → 0 errors.