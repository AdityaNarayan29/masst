'use client';

import { Button } from "@masst/ui";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 sm:px-20 py-10 bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] dark:from-[#1a1a1a] dark:to-[#0d0d0d]">
      {/* Header */}
      <header className="w-full flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Mast UI Logo"
            width={50}
            height={50}
          />
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Mast UI</h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => alert('Try the components!')}>
            Get Started
          </Button>
          <Button onClick={() => alert('Go to Docs')}>
            Docs
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center gap-6 sm:gap-10 mt-24 sm:mt-32 max-w-3xl">
        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-black to-neutral-500 dark:from-white dark:to-neutral-400">
          Build modern interfaces effortlessly
        </h2>
        <p className="text-lg sm:text-xl text-neutral-700 dark:text-neutral-300 max-w-xl">
          Mast UI is a beautifully designed, developer-first component library
          built for speed, clarity, and customization.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={() => alert('Component Demo')}>
            Explore Components
          </Button>
          <Button onClick={() => alert('Star on GitHub')}>
            Star on GitHub
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 text-xs text-neutral-500 dark:text-neutral-400">
        © {new Date().getFullYear()} Mast UI. Built with ♥ using Next.js.
      </footer>
    </div>
  );
}
