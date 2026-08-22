---
name: env-variables
description: "Environment variable rules for ChatFlow — API base URL and socket URL configuration"
---

# Environment Variables — ChatFlow

---

## 📋 Required Variables

| Variable | Prefix | Required | Purpose | Default Value |
| :--- | :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | `NEXT_PUBLIC_` | ✅ Yes | Backend REST API base URL (ends with `/api`) | `https://frontend-task-chatapp.onrender.com/api` |
| `NEXT_PUBLIC_SOCKET_URL` | `NEXT_PUBLIC_` | ✅ Yes | Socket.io server root origin (without `/api`) | `https://frontend-task-chatapp.onrender.com` |

---

## ⚙️ Configuration Files

### 1. `.env.example`
The project includes a committed [`.env.example`](file:///c:/Work_With_Company/Task/.env.example):
```bash
# ChatFlow Environment Configuration
NEXT_PUBLIC_API_URL=https://frontend-task-chatapp.onrender.com/api
NEXT_PUBLIC_SOCKET_URL=https://frontend-task-chatapp.onrender.com
```

### 2. Local Setup
Copy the example file to `.env.local` (which is gitignored):
```bash
cp .env.example .env.local
```

---

## 📐 Usage in Code

Environment variables are accessed with fallback defaults to prevent build or runtime breakage:

```ts
// lib/api.ts
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://frontend-task-chatapp.onrender.com/api';

// lib/socket.ts
const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || 'https://frontend-task-chatapp.onrender.com';
```

---

## 🔒 Security & Best Practices

1. **Public by Design**: Both backend URLs are public API endpoints and correctly prefixed with `NEXT_PUBLIC_`.
2. **No Secrets in Frontend**: Authentication uses ephemeral JWTs issued dynamically at runtime via `/auth/login` and stored in client `localStorage` — no hardcoded backend secrets exist in the frontend repository.
3. **Vercel / Production Deployment**: Ensure both `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SOCKET_URL` are configured in your production environment settings.

---

## ✅ Env Variables Checklist

- [ ] `.env.example` matches code variable names (`NEXT_PUBLIC_API_URL` & `NEXT_PUBLIC_SOCKET_URL`).
- [ ] `.env.local` is ignored by git.
- [ ] Code provides fallback defaults to ensure zero build errors.
