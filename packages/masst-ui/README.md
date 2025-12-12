# @masst/ui

> A modern, accessible UI component library built with Radix Primitives and Tailwind CSS.

[![npm version](https://img.shields.io/npm/v/@masst/ui?style=flat-square)](https://www.npmjs.com/package/@masst/ui)
[![license](https://img.shields.io/github/license/AdityaNarayan29/masst?style=flat-square)](../../LICENSE)
[![TypeScript](https://img.shields.io/npm/types/@masst/ui?style=flat-square)](https://www.typescriptlang.org/)

## Installation

```bash
npm install @masst/ui
# or
pnpm add @masst/ui
# or
yarn add @masst/ui
```

### Peer Dependencies

```bash
npm install react react-dom tailwindcss class-variance-authority tailwind-merge
```

## Usage

```tsx
import { Button, Card, Input } from "@masst/ui";

export default function App() {
  return (
    <Card className="p-6">
      <Input placeholder="Enter your name" />
      <Button variant="default" size="default">
        Submit
      </Button>
    </Card>
  );
}
```

## Components

This library includes 50+ components:

**Layout**: Card, Separator, AspectRatio, ScrollArea, ResizablePanels

**Forms**: Button, Input, Textarea, Checkbox, Radio, Select, Switch, Slider, Form

**Feedback**: Alert, AlertDialog, Dialog, Drawer, Popover, Tooltip, Sonner (Toast)

**Data Display**: Accordion, Avatar, Badge, Calendar, Carousel, Chart, Progress, Table, Tabs

**Navigation**: Breadcrumb, Command, ContextMenu, DropdownMenu, Menubar, NavigationMenu, Pagination

**Overlay**: Dialog, Drawer, HoverCard, Popover, Sheet, Tooltip

## Features

- **Accessible** - Built on Radix UI primitives with full ARIA support
- **Customizable** - Style with Tailwind CSS classes
- **Tree-shakable** - Import only what you need
- **TypeScript** - Full type definitions included
- **Dark Mode** - Built-in theme support via `next-themes`

## Development

```bash
# Build
pnpm build

# Run tests
pnpm test

# Watch tests
pnpm test:watch

# Run Storybook
pnpm storybook
```

## License

MIT License - see [LICENSE](../../LICENSE) for details.
