'use client';

import { useEffect, useRef } from 'react';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/animations';

const social = [
  { name: 'GitHub', href: 'https://dub.sh/aditya29-github', icon: Github },
  { name: 'LinkedIn', href: 'https://dub.sh/aditya29-linkedin', icon: Linkedin },
  { name: 'Twitter', href: 'https://dub.sh/aditya29-twitter', icon: Twitter },
  { name: 'Email', href: 'mailto:adityanarayan29j@gmail.com', icon: Mail },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative border-t border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-black"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: Brand + Copyright */}
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-black dark:text-white">Masst</span>
            <span className="text-black/20 dark:text-white/20">·</span>
            <span className="text-sm text-black/40 dark:text-white/40">
              © {new Date().getFullYear()}
            </span>
            <span className="text-black/20 dark:text-white/20">·</span>
            <a
              href="https://adityanarayan.co.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-violet-500 dark:text-violet-400 hover:text-violet-600 dark:hover:text-violet-300 font-medium transition-colors"
            >
              Founder
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          {/* Right: Social icons */}
          <div className="flex items-center gap-2">
            {social.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] flex items-center justify-center hover:bg-black/[0.06] dark:hover:bg-white/[0.06] hover:border-black/[0.1] dark:hover:border-white/[0.1] transition-all duration-200"
                  aria-label={item.name}
                >
                  <Icon className="w-4 h-4 text-black/50 dark:text-white/50" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
