'use client';

import { useEffect, useRef, useState } from 'react';
import { Github, Menu, X, Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/animations';

interface NavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Navigation({
  mobileMenuOpen,
  setMobileMenuOpen,
  darkMode,
  setDarkMode,
}: NavigationProps) {
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
        {
          opacity: 0,
          y: -20,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: 'expo.out',
        }
      );

      // Stagger menu items
      const menuItems = mobileMenuRef.current.querySelectorAll('a');
      gsap.fromTo(
        menuItems,
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'expo.out',
          delay: 0.1,
        }
      );
    }
  }, [mobileMenuOpen]);

  // Magnetic effect for nav items
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  // Logo hover animation
  const handleLogoHover = (isHovering: boolean) => {
    if (logoRef.current) {
      const logo = logoRef.current.querySelector('img');
      const text = logoRef.current.querySelector('span');

      if (isHovering) {
        gsap.to(logo, {
          scale: 1.1,
          rotate: 5,
          duration: 0.4,
          ease: 'back.out(2)',
        });
        gsap.to(text, {
          x: 3,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(logo, {
          scale: 1,
          rotate: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
        gsap.to(text, {
          x: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    }
  };

  // Theme toggle animation
  const handleThemeToggle = () => {
    const icon = document.querySelector('.theme-icon');
    if (icon) {
      gsap.to(icon, {
        scale: 0,
        rotate: 180,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setDarkMode(!darkMode);
          gsap.to(icon, {
            scale: 1,
            rotate: 0,
            duration: 0.4,
            ease: 'back.out(2)',
          });
        },
      });
    } else {
      setDarkMode(!darkMode);
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-2' : 'py-0'
      }`}
    >
      {/* Glassmorphism background with enhanced blur */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-2xl shadow-lg shadow-black/5'
            : 'bg-background/60 backdrop-blur-xl'
        } border-b border-white/10`}
      />

      {/* Animated gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent animate-gradient" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            ref={logoRef}
            href="#home"
            className="flex items-center gap-2.5 group"
            onMouseEnter={() => handleLogoHover(true)}
            onMouseLeave={() => handleLogoHover(false)}
          >
            <Image
              src="/logo.png"
              alt="Masst"
              width={32}
              height={32}
              className="w-8 h-8 transition-all duration-300"
            />
            <span className="text-xl font-bold text-foreground transition-all duration-300">
              Masst
            </span>
          </a>

          {/* Desktop Navigation */}
          <div ref={navLinksRef} className="hidden md:flex items-center gap-1">
            {[
              { label: 'Home', href: '#home' },
              { label: 'Tools', href: '#tools' },
              { label: 'Docs', href: 'https://docs.masst.dev' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group"
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-xl opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300" />
              </a>
            ))}

            <a
              href="https://github.com/AdityaNarayan29/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2 group"
            >
              <Github className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">GitHub</span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-xl opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300" />
            </a>
          </div>

          {/* Actions */}
          <div ref={actionsRef} className="hidden md:flex items-center gap-3">
            <div className="w-px h-6 bg-white/10" />

            {/* Dark Mode Toggle */}
            <button
              onClick={handleThemeToggle}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative p-2.5 rounded-xl overflow-hidden group transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Toggle dark mode"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 border border-white/10 rounded-xl group-hover:border-white/20 transition-colors duration-300" />
              <div className="relative theme-icon">
                {darkMode ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-violet-500" />
                )}
              </div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-violet-500" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-300"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${
                    mobileMenuOpen
                      ? 'opacity-0 rotate-90 scale-50'
                      : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <X
                  className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${
                    mobileMenuOpen
                      ? 'opacity-100 rotate-0 scale-100'
                      : 'opacity-0 -rotate-90 scale-50'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden absolute top-full left-0 right-0 transition-all duration-300 ${
          mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="bg-background/95 backdrop-blur-2xl border-b border-white/10 px-4 py-4 space-y-1 shadow-lg shadow-black/10">
          {[
            { label: 'Home', href: '#home' },
            { label: 'Tools', href: '#tools' },
            { label: 'Docs', href: 'https://docs.masst.dev' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl transition-all duration-300"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://github.com/AdityaNarayan29/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
