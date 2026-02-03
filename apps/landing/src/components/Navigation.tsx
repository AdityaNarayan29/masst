'use client';

import { useEffect, useRef, useState } from 'react';
import { Github, Menu, X, Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import { gsap } from '@/lib/animations';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#tools' },
  { label: 'About', href: '#about' },
];

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleThemeToggle = () => {
    const icon = document.querySelector('.theme-icon');
    if (icon) {
      gsap.to(icon, {
        scale: 0,
        rotate: 180,
        duration: 0.15,
        onComplete: () => {
          toggleTheme();
          gsap.to(icon, {
            scale: 1,
            rotate: 0,
            duration: 0.3,
            ease: 'back.out(2)',
          });
        },
      });
    } else {
      toggleTheme();
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            isScrolled
              ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/[0.05] dark:border-white/[0.05]'
              : 'bg-transparent'
          }`}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2.5 group">
              <Image
                src="/logo.png"
                alt="Masst"
                width={28}
                height={28}
                className="rounded-lg transition-transform duration-200 group-hover:scale-110"
              />
              <span className="text-lg font-bold text-black dark:text-white">Masst</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://dub.sh/aditya29-github"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-medium text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors duration-200 flex items-center gap-1.5"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={handleThemeToggle}
                className="p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] hover:bg-black/[0.06] dark:hover:bg-white/[0.06] border border-black/[0.05] dark:border-white/[0.05] transition-all duration-200"
                aria-label="Toggle theme"
              >
                <div className="theme-icon">
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-amber-500" />
                  ) : (
                    <Moon className="w-4 h-4 text-violet-600" />
                  )}
                </div>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] hover:bg-black/[0.06] dark:hover:bg-white/[0.06] border border-black/[0.05] dark:border-white/[0.05] transition-all duration-200"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-4 h-4 text-black dark:text-white" />
                ) : (
                  <Menu className="w-4 h-4 text-black dark:text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu */}
        <div
          className={`absolute top-[72px] left-4 right-4 bg-white dark:bg-[#111] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl shadow-2xl transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <div className="p-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.03] rounded-xl transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://dub.sh/aditya29-github"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-base font-medium text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.03] rounded-xl transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
