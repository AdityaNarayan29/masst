# Masst UI Playground

Interactive testing environment for @masst/ui components.

## Purpose

This app serves as a development playground for testing and demonstrating components from the Masst UI library before they're documented.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: @masst/ui (workspace dependency)
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React

## Development

```bash
# From monorepo root
pnpm dev:playground

# Or from this directory
pnpm dev
```

The app runs on [http://localhost:3001](http://localhost:3001).

## Usage

Use this app to:

1. Test new components during development
2. Verify component integration
3. Debug styling issues
4. Demo components before documentation

## Adding Components

Import components directly from `@masst/ui`:

```tsx
import { Button, Card, Input } from "@masst/ui";

export default function Page() {
  return (
    <Card>
      <Input placeholder="Enter text..." />
      <Button>Submit</Button>
    </Card>
  );
}
```
