---
name: git-workflow
description: "Commit message format, branch strategy, and pre-commit verification requirements for ChatFlow"
---

# Git Workflow — ChatFlow

---

## 🌿 Branch Strategy

- **`main`**: Production-ready branch containing all tested and verified features.
- **`feat/<feature-name>`** or **`fix/<bug-name>`**: Dedicated branches for scoped development.

---

## 💬 Commit Message Convention (Conventional Commits)

Format: `<type>(<scope>): <short imperative description>`

| Type | Description | Example |
| :--- | :--- | :--- |
| `feat` | New user-facing feature | `feat(chat): add real-time message deduplication` |
| `fix` | Bug fix | `fix(auth): handle expired token with 401 interceptor` |
| `refactor` | Code change that neither fixes a bug nor adds a feature | `refactor(store): modularize chat UI state actions` |
| `style` | Formatting, CSS, animations, visual design | `style(landing): polish hero bento grid hover states` |
| `docs` | Documentation updates | `docs: update API documentation and AGENTS.md` |
| `chore` | Dependency updates, tooling, config changes | `chore: update tailwind and eslint config` |

---

## 🛡️ Pre-Commit Verification Pipeline

Before committing any changes, run the verification pipeline:

1. **TypeScript Typecheck**:
   ```bash
   npx tsc --noEmit
   ```
2. **ESLint**:
   ```bash
   npm run lint
   ```
3. **Format Check**:
   ```bash
   npx prettier --check .
   ```
4. **Git Diff Review**:
   ```bash
   git status
   git diff --stat
   ```
   Confirm only intended files are staged (no accidental temp files or test leftovers).

---

## ✅ Git Workflow Checklist

- [ ] Clear, conventional commit messages.
- [ ] No leftover `console.log`, `debugger`, or temporary test data.
- [ ] `npx tsc --noEmit` returns 0 errors.
- [ ] `npm run lint` returns 0 errors.
- [ ] Clean atomic commit diffs.
