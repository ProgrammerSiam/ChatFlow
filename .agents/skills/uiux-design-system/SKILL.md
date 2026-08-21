---
name: uiux-design-system
description: Design System tokens, color palettes, typography, components, and UI/UX guidelines for ChatFlow and all app routes.
---

# ChatFlow UI/UX Design System Specification

This skill documents the design tokens, component anatomy, spacing, typography, and styling patterns used across ChatFlow.

---

## 1. Design Tokens (CSS Variables)

```css
:root {
  /* --- Primary Palette (Electric Violet / Purple) --- */
  --color-primary-50: #f4f1fe;
  --color-primary-100: #e8e3fc;
  --color-primary-200: #cabef9;
  --color-primary-300: #a08afa;
  --color-primary-400: #7a5af8;
  --color-primary-500: #390af5;
  --color-primary-600: #3009cd;
  --color-primary-700: #2707a6;
  --color-primary-800: #1e057f;
  --color-primary-900: #1b0b5b;
  --color-primary-950: #12073b;

  /* --- Secondary Palette (Emerald Mint / Green) --- */
  --color-secondary-50: #f4fbf4;
  --color-secondary-100: #e9f7e8;
  --color-secondary-200: #cdedca;
  --color-secondary-300: #a6e3a0;
  --color-secondary-400: #6fd666;
  --color-secondary-500: #45c639;
  --color-secondary-600: #38a22f;
  --color-secondary-700: #2f8627;
  --color-secondary-800: #24671e;
  --color-secondary-900: #1f4b1b;
  --color-secondary-950: #143112;

  /* --- Accent Palette (Lime Neon / Cyber Accent) --- */
  --color-accent-50: #f7fef0;
  --color-accent-100: #ecffda;
  --color-accent-200: #dafbbb;
  --color-accent-300: #c0ff85;
  --color-accent-400: #9bff3d;
  --color-accent-500: #7bff00;
  --color-accent-600: #68d600;
  --color-accent-700: #54ad00;
  --color-accent-800: #408500;
  --color-accent-900: #325e08;
  --color-accent-950: #203d05;

  /* --- Neutral Palette (Monochrome Grays) --- */
  --color-neutral-50: #f7f7f7;
  --color-neutral-100: #f0f0f0;
  --color-neutral-200: #dbdbdb;
  --color-neutral-300: #c2c2c2;
  --color-neutral-400: #9e9e9e;
  --color-neutral-500: #808080;
  --color-neutral-600: #6b6b6b;
  --color-neutral-700: #575757;
  --color-neutral-800: #424242;
  --color-neutral-900: #333333;
  --color-neutral-950: #000000;

  /* --- Status Colors --- */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;

  /* --- Typography --- */
  --font-family-sans: 'Google Sans Flex', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-display: 'Google Sans Flex', sans-serif;

  --font-size-xs: 0.75rem;     /* 12px */
  --font-size-sm: 0.875rem;    /* 14px */
  --font-size-base: 1.125rem;  /* 18px */
  --font-size-lg: 1.25rem;     /* 20px */
  --font-size-xl: 1.5rem;      /* 24px */
  --font-size-2xl: 2.125rem;   /* 34px */
  --font-size-3xl: 3rem;       /* 48px */
  --font-size-4xl: 3.5rem;     /* 56px */

  /* --- Spacing --- */
  --spacing-0: 0;
  --spacing-1: 0.25rem;  /* 4px */
  --spacing-2: 0.5rem;   /* 8px */
  --spacing-3: 0.75rem;  /* 12px */
  --spacing-4: 1rem;     /* 16px */
  --spacing-5: 1.25rem;  /* 20px */
  --spacing-6: 1.5rem;   /* 24px */
  --spacing-7: 1.75rem;  /* 28px */
  --spacing-8: 2rem;     /* 32px */

  /* --- Border Radius --- */
  --radius-none: 0;
  --radius-sm: 0.375rem;  /* 6px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 1rem;      /* 16px */
  --radius-xl: 1.25rem;   /* 20px */
  --radius-2xl: 1.5rem;   /* 24px */
  --radius-full: 9999px;

  /* --- Shadows --- */
  --shadow-sm: 0 1px 2px 0 rgba(10, 13, 20, 0.03), 0 3px 10px 0 rgba(0, 0, 0, 0.01);
  --shadow-md: 0 1px 2px 0 rgba(10, 13, 20, 0.03);
  --shadow-lg: 0 1px 1px 0 rgba(10, 13, 20, 0.03);
  --shadow-xl: 0 2px 8px 0 rgba(10, 13, 20, 0.06);

  /* --- Brand Gradients --- */
  --gradient-brand-1: linear-gradient(347deg, rgb(114, 92, 255) 1.7%, rgb(201, 193, 255) 46.45%, rgb(248, 247, 255) 90.62%);
  --gradient-brand-2: linear-gradient(169deg, rgb(201, 193, 255) 29.61%, rgb(114, 92, 255) 93.52%);
  --gradient-brand-3: linear-gradient(rgb(247, 255, 239) 0%, rgb(255, 255, 255) 100%);
  --gradient-brand-4: linear-gradient(rgb(255, 244, 239) 0%, rgb(255, 255, 255) 100%);
  --gradient-brand-5: linear-gradient(rgb(229, 223, 255) 0%, rgb(255, 255, 255) 100%);
}
```

---

## 2. Component Guidelines

### Buttons
- **Primary**: Background `--color-primary-500` (`#390af5`) or `--color-primary-400` (`#7a5af8`), white text, rounded pill (`--radius-full`), subtle hover scale.
- **Secondary**: Background `--color-neutral-100` (`#f0f0f0`), text `--color-neutral-900`, rounded pill or `--radius-lg`.
- **Outline**: Border `1px solid var(--color-primary-400)`, text `--color-primary-500`, transparent background.
- **Ghost**: Transparent background, text `--color-neutral-700`, hover background `--color-neutral-100`.

### Badges
- **Default**: Background `--color-neutral-100`, text `--color-neutral-700`.
- **Primary**: Background `--color-primary-100`, text `--color-primary-600`.
- **Accent**: Background `--color-accent-100`, text `--color-accent-800`.
- **Secondary**: Background `--color-secondary-100`, text `--color-secondary-700`.

### Cards & Surfaces
- Clean white or frosted surface with `border: 1px solid var(--color-neutral-200)`, `border-radius: var(--radius-xl)` or `var(--radius-2xl)`, and `box-shadow: var(--shadow-sm)` to `var(--shadow-xl)`.

### Inputs
- Border `1px solid var(--color-neutral-200)`, focus ring `var(--color-primary-400)`, border radius `var(--radius-lg)` or pill `var(--radius-full)`.
