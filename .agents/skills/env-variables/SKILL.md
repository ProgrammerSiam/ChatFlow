---
name: env-variables
description: 'Environment variable rules for ChatFlow — API base URL and socket URL configuration'
---

# Environment Variables — ChatFlow

---

## 📋 Required Variables

| Variable                   | Prefix         | Required | Purpose                                                                           |
| :------------------------- | :------------- | :------- | :-------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | `NEXT_PUBLIC_` | ✅ Yes   | REST API base — `https://frontend-task-chatapp.onrender.com/api`                  |
| `NEXT_PUBLIC_SOCKET_URL`   | `NEXT_PUBLIC_` | ✅ Yes   | Socket.io root origin — `https://frontend-task-chatapp.onrender.com` (NOT `/api`) |

```bash
# .env.example
NEXT_PUBLIC_API_BASE_URL=https://frontend-task-chatapp.onrender.com/api
NEXT_PUBLIC_SOCKET_URL=https://frontend-task-chatapp.onrender.com
```

---

## 📐 Rules

### Rule 1 — `NEXT_PUBLIC_` is for non-secret values only

Both variables here are public API endpoints (no secret), so `NEXT_PUBLIC_` is correct. No
secret keys exist in this project — the JWT is issued at runtime by the API, not a build-time secret.

### Rule 2 — Every variable needs a `.env.example` entry

Never commit `.env.local` with real values (already gitignored). `.env.example` is committed
with placeholder-safe (here, actually public) values.

### Rule 3 — Access in code

```tsx
// Client-side (fine — these are NEXT_PUBLIC_)
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
```

---

## 🚀 Setup Checklist

- [ ] `.env.example` committed with both variables.
- [ ] Each developer copies to `.env.local` (gitignored).
- [ ] `lib/api/client.ts` and `lib/socket.ts` reference `process.env.NEXT_PUBLIC_*` — never hardcoded strings.
- [ ] Vercel deployment has both env vars set under Project Settings → Environment Variables.
