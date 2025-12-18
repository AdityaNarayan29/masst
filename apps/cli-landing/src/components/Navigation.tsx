'use client';

import { useEffect, useRef, useState } from 'react';
import { Github, Menu, X, Terminal } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/animations';

interface NavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Navigation({ mobileMenuOpen, setMobileMenuOpen }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Initial animation for nav elements
      gsap.set([logoRef.current, navLinksRef.current, actionsRef.current], {
        opacity: 0,
        y: -20,
      });

      // Staggered reveal animation
      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
      })
        .to(
          navLinksRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'expo.out',
          },
          '-=0.6'
        )
        .to(
          actionsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'expo.out',
          },
          '-=0.6'
        );
    }, navRef);

    // Scroll detection for nav background change
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (mobileMenuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'expo.out' }
      );

      // Stagger menu items
      const menuItems = mobileMenuRef.current.querySelectorAll('a');
      gsap.fromTo(
        menuItems,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'expo.out', delay: 0.1 }
      );
    }
  }, [mobileMenuOpen]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-0'
      }`}
    >
      {/* Background */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/90 backdrop-blur-xl border-b border-border'
            : 'bg-background/60 backdrop-blur-md border-b border-transparent'
        }`}
      />

      {/* Green accent line at top */}
      <div
        className={`absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(142 70% 45% / 0.5), transparent)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo - terminal style */}
          <a ref={logoRef} href="#home" className="flex items-center gap-2 font-mono text-sm group">
            <Terminal className="w-5 h-5 term-green" />
            <span className="text-foreground font-bold">masst</span>
            <span className="text-muted-foreground hidden sm:inline">cli</span>
          </a>

          {/* Desktop Navigation - terminal style */}
          <div ref={navLinksRef} className="hidden md:flex items-center gap-1 font-mono text-xs">
            {[
              { label: 'home', href: '#home' },
              { label: 'commands', href: '#commands' },
              { label: 'quickstart', href: '#quickstart' },
              { label: 'docs', href: 'https://docs.masst.dev' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
              >
                <span className="term-green opacity-0 group-hover:opacity-100 transition-opacity">
                  ./
                </span>
                <span>{item.label}</span>
              </a>
            ))}

            <div className="w-px h-4 bg-border mx-2" />

            <a
              href="https://github.com/AdityaNarayan29/masst"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Github className="w-3.5 h-3.5" />
              <span>github</span>
            </a>
          </div>

          {/* Actions - terminal style */}
          <div ref={actionsRef} className="hidden md:flex items-center gap-2">
            <a
              href="#quickstart"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md font-mono text-xs border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-400 transition-all duration-200"
            >
              <span>$</span>
              <span>get-started</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            >
              <div className="relative w-5 h-5">
                <Menu
                  className={`w-5 h-5 absolute inset-0 transition-all duration-200 ${
                    mobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                  }`}
                />
                <X
                  className={`w-5 h-5 absolute inset-0 transition-all duration-200 ${
                    mobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - terminal style */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden absolute top-full left-0 right-0 transition-all duration-200 ${
          mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="bg-background/95 backdrop-blur-xl border-b border-border px-4 py-3 space-y-1 font-mono text-sm">
          {[
            { label: 'home', href: '#home' },
            { label: 'commands', href: '#commands' },
            { label: 'quickstart', href: '#quickstart' },
            { label: 'docs', href: 'https://docs.masst.dev' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all duration-200"
            >
              <span className="term-green mr-2">$</span>
              <span>cd {item.label}</span>
            </a>
          ))}
          <a
            href="https://github.com/AdityaNarayan29/masst"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all duration-200"
          >
            <Github className="w-4 h-4" />
            <span>github.com/AdityaNarayan29/masst</span>
          </a>
          <div className="pt-2 mt-2 border-t border-border">
            <a
              href="#quickstart"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md border border-emerald-500/50 bg-emerald-500/10 term-green text-center"
            >
              $ ./get-started.sh
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
