'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import FeaturedTools from '@/components/FeaturedTools';
import FutureVision from '@/components/FutureVision';
import Footer from '@/components/Footer';
import { gsap } from '@/lib/animations';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Apply dark mode class to document
  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const saved = localStorage.getItem('darkMode');
    const initialDarkMode = saved ? JSON.parse(saved) : true;
    setDarkMode(initialDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

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
        scale: 0.95,
        duration: 0.5,
        ease: 'power2.inOut',
        delay: 0.3,
      });

      // Reveal main content
      tl.fromTo(
        mainRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
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
      {/* Premium loading screen */}
      <div
        ref={loaderRef}
        className={`fixed inset-0 z-[100] bg-[#09090b] dark:bg-[#09090b] flex items-center justify-center transition-all duration-500 ${
          isLoading ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="relative">
          {/* Animated gradient background */}
          <div className="absolute -inset-20 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />

          {/* Logo animation */}
          <div className="relative flex flex-col items-center gap-4">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="Masst"
                width={64}
                height={64}
                className="w-16 h-16 animate-pulse"
                priority
              />
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl blur-xl opacity-50 -z-10 scale-150" />
            </div>
            <div className="flex gap-1">
              <div
                className="w-2 h-2 rounded-full bg-violet-500 animate-bounce"
                style={{ animationDelay: '0ms' }}
              />
              <div
                className="w-2 h-2 rounded-full bg-fuchsia-500 animate-bounce"
                style={{ animationDelay: '150ms' }}
              />
              <div
                className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce"
                style={{ animationDelay: '300ms' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div ref={mainRef} className="min-h-screen bg-background">
        <Navigation
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <main>
          <Hero />
          <FeaturedTools />
          <FutureVision />
        </main>
        <Footer />
      </div>
    </>
  );
}
