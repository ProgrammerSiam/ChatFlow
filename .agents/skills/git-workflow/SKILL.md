---
name: git-workflow
description: 'Commit message format, branch strategy, and pre-commit requirements for ChatFlow'
---

# Git Workflow — ChatFlow

---

## 🌿 Branch Strategy

Single-branch model for this take-home (24hr deadline) — direct commits to `main` are fine,
but keep commits atomic and well-labeled for reviewer readability.

| Branch pattern             | Purpose                                        |
| :------------------------- | :--------------------------------------------- |
| `main`                     | Working branch — all commits                   |
| `feat/<short-description>` | Optional, if you want visible phase separation |

---

## 💬 Commit Message Format (Conventional Commits)

<type>: <short imperative description>

| Type     | Used for                                                          |
| :------- | :---------------------------------------------------------------- |
| `feat:`  | New features/components (login, message list, socket integration) |
| `fix:`   | Bug fixes                                                         |
| `docs:`  | README, API_DOCUMENTATION, AGENTS.md changes                      |
| `chore:` | Config, deps, tooling                                             |
| `style:` | Landing page visual/animation work                                |

**Example phase-wise history:**

feat: implement login and auth store
feat: add conversation list with react-query
feat: integrate socket.io for real-time messages
feat: build landing page hero and demo preview
docs: add API documentation and README write-up

---

## ✅ Pre-Commit Requirements

1. **Verification pipeline** passes — `.agents/skills/verification/SKILL.md`.
2. No `console.log`/`debugger` left in changed files.
3. No `@ts-ignore` or unexplained `any`.
4. `git diff --stat` reviewed — only intended files staged.

---

## 🔧 Formatting Before Commit

```bash
npx prettier --write .
```
