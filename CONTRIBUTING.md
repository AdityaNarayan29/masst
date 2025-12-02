# 🛠 Contributing Guidelines & Code Standards for MastUI

Welcome, contributor! Whether you're working on `mastui` (the npm package), `landing`, or `docs`, this document outlines our coding and commit conventions to ensure consistency across the monorepo.

---

## ✏️ Commit Message Format

We follow **Conventional Commits** with scoped packages.

```

<type>(<scope>): <short description>

```

### 🔧 Types

| Type     | Description                                     |
| -------- | ----------------------------------------------- |
| feat     | ✨ New feature                                  |
| fix      | 🐛 Bug fix                                      |
| chore    | 🔧 Build or tooling update (no src changes)     |
| docs     | 📝 Documentation only changes                   |
| refactor | ♻️ Code restructuring without behavior change   |
| style    | 💄 Code style (formatting, missing semi-colons) |
| test     | ✅ Adding or updating tests                     |
| perf     | 🚀 Performance improvements                     |
| ci       | 🤖 CI/CD-related changes                        |

### 📁 Scopes (Project Targets)

| Scope   | Target Project                      |
| ------- | ----------------------------------- |
| mastui  | The component library (npm package) |
| landing | The marketing site                  |
| docs    | The documentation site              |
| config  | Shared ESLint / TS configs          |
| setup   | Project tooling / Turborepo configs |

> 💡 Example:  
> `feat(mastui): add animated Accordion component`  
> `fix(docs): broken link to Button example`  
> `chore(config): update ESLint rules`

---

## 🌳 Branch Naming Convention

Use consistent and descriptive branch names:

```

<type>/<scope>-<short-description>

```

Examples:

- `feat/mastui-animated-button`
- `fix/docs-typo-links`
- `chore/config-vercel-update`

---

## 💅 Code Style & Tooling

- All packages use **Prettier**, **ESLint**, and **TypeScript**
- Run `pnpm lint` and `pnpm format` before committing
- Commit only **typed**, **clean**, and **formatted** code
- Use **`tailwind-merge`** to avoid class duplication
- Prefer **utility-first** CSS from Tailwind over custom styles

---

## 📦 Monorepo Structure (For Reference)

```

.
├── apps/
│   ├── landing/      → Landing page (Next.js)
│   └── docs/         → Documentation (Nextra)
├── packages/
│   ├── mastui/       → Component library
│   ├── eslint-config → Shared lint rules
│   └── tsconfig      → Shared TS config

```

---

## ✅ Before Opening a PR

- ✅ Ensure commits follow the proper format
- ✅ PR title matches the main commit
- ✅ Update docs if needed (`/apps/docs`)
- ✅ Link issue (if any) in the PR
- ✅ Keep PRs small and focused

---

Thanks for helping us build MastUI — your contributions make it better! 🧡  
_— Aditya & MastUI Team_
