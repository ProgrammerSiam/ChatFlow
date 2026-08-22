---
name: uiux-design-system
description: "Design System tokens, color palettes, typography, components, and UI/UX guidelines for ChatFlow and all app routes."
---

# ChatFlow UI/UX Design System Specification

This skill documents the design system, color tokens, typography, component patterns, and micro-interactions used across ChatFlow.

---

## 🎨 1. Design Tokens & Theme Palettes ([`app/globals.css`](file:///app/globals.css))

ChatFlow uses a curated theme with electric violet/purple primaries, dark mode support via Tailwind CSS v4, smooth ambient glows, and crisp borders:

```css
:root {
  /* --- Primary Palette (Electric Violet) --- */
  --color-primary-50: #f4f1fe;
  --color-primary-100: #e8e3fc;
  --color-primary-200: #cabef9;
  --color-primary-300: #a08afa;
  --color-primary-400: #7a5af8;
  --color-primary-500: #390af5;
  --color-primary-600: #3009cd;

  /* --- Neutral & Surface Palette --- */
  --background: #fafafa;
  --foreground: #09090b;
  --card: #ffffff;
  --card-foreground: #09090b;
  --border: #e2e8f0;
  --muted: #f1f5f9;
  --muted-foreground: #64748b;
  --ring: #7a5af8;

  /* --- Status Colors --- */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;

  /* --- Radius & Shadows --- */
  --radius-lg: 1rem;       /* 16px */
  --radius-xl: 1.25rem;    /* 20px */
  --radius-2xl: 1.5rem;    /* 24px */
  --radius-full: 9999px;
}
```

---

## 🧩 2. Core UI Components & Shared Building Blocks

### 1. Avatars & Presence Indicators
- **Initials Fallback**: Vibrant gradient backgrounds (e.g. `bg-gradient-to-tr from-[#8E7CFF] to-[#D5CCFF]`).
- **Active Status Dot**: Emerald green pulsing ring (`bg-emerald-500 ring-2 ring-white dark:ring-card`) representing real-time WebSocket connectivity.

### 2. Message Bubbles
- **Own Messages**: Right-aligned, primary theme gradient or slate background (`bg-slate-900 text-white dark:bg-white dark:text-slate-950`), rounded corners (`rounded-2xl rounded-tr-sm`).
- **Incoming Messages**: Left-aligned, light slate or muted card background (`bg-slate-100 text-slate-800 dark:bg-muted dark:text-slate-100`), rounded corners (`rounded-2xl rounded-tl-sm`).
- **Sending / Failed Indicators**:
  - `sending`: subtle pulsing clock/spinner icon.
  - `failed`: red alert icon with a one-click tap-to-retry trigger.

### 3. Glassmorphism & Surface Elevation
- **Modals & Drawers**: `backdrop-blur-xl bg-white/95 dark:bg-card/95 border border-slate-200/80 dark:border-border/80 shadow-2xl rounded-[28px]`.
- **Sidebars**: `rounded-[24px] bg-[#FAFAFA] dark:bg-card border border-slate-200/80 dark:border-border/70 p-3.5 shadow-xs`.

---

## ✨ 3. Animations & Micro-Interactions

- **Framer Motion**: Smooth page and modal entry animations (`initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}`).
- **Interactive Hover & Press**: `active:scale-[0.98] transition-all duration-200 cursor-pointer`.
- **Milestone Delights**: Celebratory confetti effects triggered via [`lib/confetti.ts`](file:///lib/confetti.ts) on key milestones (e.g. creating a group or connecting for the first time).

---

## ✅ Design System Checklist

- [ ] Tailwind CSS v4 variables utilized throughout.
- [ ] Light & Dark mode contrast checked and readable.
- [ ] Consistent rounded corners (`rounded-2xl`, `rounded-[24px]`, `rounded-full`).
- [ ] Loading skeletons mirror the exact anatomy of loaded components.
- [ ] Micro-interactions, hover states, and tooltips present on interactive triggers.
