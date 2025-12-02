# Masst UI — Build Beautiful Interfaces, Effortlessly

> A modern, **motion-first** UI component library built with **ShadCN UI**, **Magic UI (Framer Motion)**, and **Tailwind CSS**.
> Masst UI empowers developers to craft elegant, fast, and accessible React applications — one component at a time.

![npm](https://img.shields.io/npm/v/@masst/ui?style=flat-square)
![license](https://img.shields.io/github/license/AdityaNarayan29/mast?style=flat-square)
![types](https://img.shields.io/npm/types/@masst/ui?style=flat-square)
![build](https://img.shields.io/github/actions/workflow/status/AdityaNarayan29/mast/ci.yml?style=flat-square)

---

## Monorepo Structure

```
root/
├── apps/
│   ├── docs/                 # Documentation site
│   ├── landing/              # Masst UI landing page
│   └── playground/           # Component testing environment
├── packages/
│   ├── eslint-config/        # Shared ESLint config
│   ├── mast-ui/              # Component library (@masst/ui)
│   ├── tailwind-config/      # Shared Tailwind config
│   └── typescript-config/    # Shared TypeScript config
```

---

## Highlights

* **Variants & Sizes** powered by [`cva`](https://github.com/joe-bell/cva)
* **Fluid Animations** with Magic UI (Framer Motion)
* **Tree-shakable**: Import only what you need
* **Dark Mode & Theming** built on Tailwind CSS
* **Accessibility** ensured via Radix UI Primitives
* **Composable & Extendable** components
* **Modern DX** with TypeScript, Tailwind, and React

---

## Installation

```bash
npm install @masst/ui
```

Also install peer dependencies:

```bash
npm install tailwindcss class-variance-authority tailwind-merge
```

---

## Quick Usage

```tsx
import { Button } from "@masst/ui";

export default function App() {
  return (
    <div className="p-4">
      <Button variant="default" size="default">
        Click Me
      </Button>
    </div>
  );
}
```

## Local Development

```bash
pnpm install
pnpm dev
```

Build all packages:

```bash
pnpm build
```

Run tests:

```bash
pnpm test
```

Run Storybook:

```bash
cd packages/mast-ui && pnpm storybook
```

---

## Docs & Playground

* Documentation — `/apps/docs`
* Landing page — `/apps/landing`
* Component playground — `/apps/playground`

---

## License

MIT License © Made with love by [Aditya Narayan](https://github.com/adityanarayan29)

---

## Useful Links

* [Turborepo Documentation](https://turborepo.com/docs)
* [ShadCN UI](https://ui.shadcn.com)
* [Magic UI](https://magicui.design)
* [Framer Motion](https://www.framer.com/motion/)
* [Tailwind CSS](https://tailwindcss.com)
* [Radix UI Primitives](https://www.radix-ui.com/)
