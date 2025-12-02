"use client";

import { Button } from '@masst/ui';

export default function Home() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Masst UI Documentation</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg overflow-x-auto">
          <code>npm install @masst/ui</code>
        </pre>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Button</h2>
        <p className="text-zinc-600 mb-4">
          A versatile button component with multiple variants and sizes.
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Variants</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Sizes</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Usage</h3>
          <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg overflow-x-auto">
            <code>{`import { Button } from '@masst/ui';

<Button variant="default" size="default">
  Click me
</Button>`}</code>
          </pre>
        </div>
      </section>
    </main>
  );
}
