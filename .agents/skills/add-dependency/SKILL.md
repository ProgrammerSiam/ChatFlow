---
name: add-dependency
description: "Safely add, update, or audit npm packages in ChatFlow — use before running any npm install command"
---

# Add Dependency Skill — ChatFlow

---

## 📋 Current Installed Dependencies

Based on [`package.json`](file:///package.json):

| Package | Version | Category | Purpose |
| :--- | :--- | :--- | :--- |
| `next` | `16.2.6` | Core Framework | Next.js App Router framework |
| `react` / `react-dom` | `19.2.4` | Core UI | React 19 core library |
| `typescript` | `^5` | Development | Strict type system |
| `@tanstack/react-query` | `^5.101.4` | State & Cache | Server state, infinite pagination, query caching |
| `zustand` | `^5.0.15` | State | Global client state (auth session, UI modals) |
| `socket.io-client` | `^4.8.3` | Real-time | Real-time WebSocket connection |
| `tailwindcss` | `^4` | Styling | Utility-first CSS v4 engine |
| `@tailwindcss/postcss` | `^4` | Styling | PostCSS Tailwind integration |
| `framer-motion` | `^12.40.0` | Animations | Interactive spring animations and transitions |
| `lucide-react` | `^1.17.0` | Icons | Feather-style SVG icon system |
| `sonner` | `^2.0.7` | UI / Feedback | Toast notification manager |
| `clsx` | `^2.1.1` | Utility | Conditional class utility |
| `tailwind-merge` | `^3.6.0` | Utility | Conflict-free class merging |
| `tw-animate-css` | `^1.4.0` | Styling | Micro-animations CSS support |
| `canvas-confetti` | `^1.9.4` | Polish | Delight milestone confetti effects |
| `class-variance-authority`| `^0.7.1` | Utility | Component variant helper |

---

## ➕ Adding a New Package

Always verify package requirements with `npm`:
```bash
# Check if package is installed
npm list <package-name>

# Install runtime dependency
npm install <package-name>

# Install dev-only dependency
npm install -D <package-name>
```

---

## ⚠️ Package Constraints

- **Package Manager**: Use `npm` exclusively (never yarn/pnpm/bun in this repo).
- **React 19 & Next.js 16 Compatibility**: Ensure any third-party UI package supports React 19 peer dependencies without breaking the build.
- **No Heavy Bundles**: Prefer lightweight icons (`lucide-react`) and standard date APIs (`Date` / `Intl`) over heavy packages like `moment`.
- **No Redux / MobX**: The architecture uses Zustand and TanStack Query exclusively.

---

## 🧹 Verification After Package Changes

After adding or updating any package:
1. Run `npx tsc --noEmit` to verify type definitions.
2. Run `npm run build` to verify tree-shaking and production bundle compilation.
3. Run `npm audit --audit-level=high` to check for security vulnerabilities.

---

## ✅ Add Dependency Checklist

- [ ] Package is not already provided by existing utilities.
- [ ] Installed with `npm install`.
- [ ] `npx tsc --noEmit` and `npm run build` pass cleanly.
