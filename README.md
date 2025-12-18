# Masst

> A modern development ecosystem featuring UI components, CLI tools, and more.

[![license](https://img.shields.io/github/license/AdityaNarayan29/masst?style=flat-square)](LICENSE)
[![CI](https://img.shields.io/github/actions/workflow/status/AdityaNarayan29/masst/ci.yml?style=flat-square)](https://github.com/AdityaNarayan29/masst/actions)

---

## What's Inside

- **@masst/ui** - A modern UI component library with 50+ accessible components
- **@masst/cli** - CLI tool for project scaffolding and setup
- **Masst Landing** - Masst ecosystem marketing website
- **MasstUI Landing** - UI library showcase and demo
- **Playground** - Component testing environment

---

## Monorepo Structure

This is a Turborepo monorepo with the following structure:

```
masst/
├── apps/
│   ├── landing/          # Masst ecosystem marketing website
│   ├── masstui-landing/  # UI library showcase
│   └── playground/       # Component testing environment
├── packages/
│   ├── masst-ui/         # Core UI library (@masst/ui)
│   ├── masst-cli/        # CLI tool (@masst/cli)
│   ├── eslint-config/    # Shared ESLint configuration
│   ├── typescript-config/# Shared TypeScript configuration
│   └── tailwind-config/  # Shared Tailwind configuration
```

### Apps

| App                                      | Description                       | Port |
| ---------------------------------------- | --------------------------------- | ---- |
| [landing](apps/landing/)                 | Masst ecosystem marketing website | 3000 |
| [masstui-landing](apps/masstui-landing/) | UI library showcase and demo      | 3002 |
| [playground](apps/playground/)           | Component testing environment     | 3001 |

### Packages

| Package                                                | Description               | npm                                                                                                         |
| ------------------------------------------------------ | ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [@masst/ui](packages/masst-ui/)                        | Core UI component library | [![npm](https://img.shields.io/npm/v/@masst/ui?style=flat-square)](https://www.npmjs.com/package/@masst/ui) |
| [@masst/cli](packages/masst-cli/)                      | CLI tool for Masst        | -                                                                                                           |
| [@repo/eslint-config](packages/eslint-config/)         | Shared ESLint config      | -                                                                                                           |
| [@repo/typescript-config](packages/typescript-config/) | Shared TypeScript config  | -                                                                                                           |

---

## Development

### Prerequisites

- Node.js >= 18
- pnpm 9.x

### Setup

```bash
# Clone the repository
git clone https://github.com/AdityaNarayan29/masst.git
cd masst

# Install dependencies
pnpm install

# Start development servers
pnpm dev
```

### Commands

| Command               | Description                               |
| --------------------- | ----------------------------------------- |
| `pnpm dev`            | Start all apps in development mode        |
| `pnpm dev:landing`    | Start Masst landing only                  |
| `pnpm dev:ui-landing` | Start MasstUI landing only                |
| `pnpm dev:playground` | Start playground only                     |
| `pnpm build`          | Build all packages and apps               |
| `pnpm test`           | Run tests                                 |
| `pnpm lint`           | Run ESLint                                |
| `pnpm format`         | Format code with Prettier                 |
| `pnpm check-types`    | TypeScript type checking                  |
| `pnpm storybook`      | Start Storybook for component development |
| `pnpm clean`          | Clean all build artifacts                 |

### Releasing

This project uses [Changesets](https://github.com/changesets/changesets) for version management:

```bash
# Create a changeset
pnpm changeset

# Version packages
pnpm version-packages

# Publish to npm
pnpm release
```

---

## Tech Stack

- **Build System**: [Turborepo](https://turbo.build/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Framework**: [React 19](https://react.dev/) + [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) + [ShadCN UI](https://ui.shadcn.com/)
- **Variants**: [Class Variance Authority](https://cva.style/)
- **Testing**: [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)
- **Documentation**: [Storybook](https://storybook.js.org/)

---

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Made with love by [Aditya Narayan](https://github.com/adityanarayan29)
