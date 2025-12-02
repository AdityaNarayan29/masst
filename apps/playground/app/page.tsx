'use client';
import { Button } from '@masst/ui';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to MastUI 🚀</h1>

      <p className="max-w-xl text-center mb-10 text-lg leading-relaxed">
        A modern React UI component library built with ShadCN and Magic UI. Build beautiful,
        accessible, and customizable interfaces quickly.
      </p>

      <Button onClick={() => alert('MastUI Button clicked!')}>Try MastUI Button</Button>

      <div className="space-x-4">
        <Button onClick={() => alert('Clicked!')}>Default Button</Button>
        <Button variant="destructive">Delete</Button>
        <Button variant="ghost" size="sm">
          Ghost Small
        </Button>
        <Button color="red" size="sm">
          Ghost Small
        </Button>
      </div>

      <section className="mt-16 max-w-3xl text-center space-y-6">
        <h2 className="text-2xl font-semibold">Getting Started</h2>
        <p>
          Edit{' '}
          <code className="bg-gray-200 dark:bg-gray-700 rounded px-1 py-0.5 font-mono">
            apps/landing/app/page.tsx
          </code>{' '}
          and see your changes live.
        </p>
        <p>
          Check out the{' '}
          <a href="/docs" className="text-blue-600 hover:underline">
            documentation
          </a>{' '}
          and{' '}
          <a href="/storybook" className="text-blue-600 hover:underline">
            Storybook
          </a>{' '}
          for examples.
        </p>
      </section>
    </div>
  );
}
