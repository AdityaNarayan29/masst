'use client';

import { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import CLIFeatures from '@/components/CLIFeatures';
import Quickstart from '@/components/Quickstart';
import Footer from '@/components/Footer';
import { gsap } from '@/lib/animations';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Always dark mode for terminal theme
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Close mobile menu when resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Page load animation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Initial page load animation
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
        },
      });

      // Animate loader out
      tl.to(loaderRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        delay: 0.8,
      });

      // Reveal main content
      tl.fromTo(
        mainRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' },
        '-=0.2'
      );
    });

    return () => ctx.revert();
  }, []);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.hash && target.hash.startsWith('#')) {
        const element = document.querySelector(target.hash);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <>
      {/* Terminal-style loading screen */}
      <div
        ref={loaderRef}
        className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-all duration-300 ${
          isLoading ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="relative flex flex-col items-center gap-4">
          {/* Terminal icon with glow */}
          <div className="relative">
            <Terminal className="w-12 h-12 term-green" />
            <div
              className="absolute inset-0 blur-xl opacity-50 -z-10 scale-150"
              style={{ background: 'hsl(142 70% 45% / 0.3)' }}
            />
          </div>

          {/* Loading text */}
          <div className="font-mono text-sm text-muted-foreground">
            <span className="term-green">$</span> initializing masst-cli
            <span className="terminal-cursor" />
          </div>

          {/* Progress dots */}
          <div className="flex gap-1">
            <div
              className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce"
              style={{ animationDelay: '0ms' }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce"
              style={{ animationDelay: '100ms' }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce"
              style={{ animationDelay: '200ms' }}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div ref={mainRef} className="min-h-screen bg-background">
        <Navigation
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          darkMode={true}
          setDarkMode={() => {}}
        />
        <main>
          <Hero />
          <CLIFeatures />
          <Quickstart />
        </main>
        <Footer />
      </div>
    </>
  );
}
