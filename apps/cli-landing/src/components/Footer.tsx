'use client';

import { useEffect, useRef } from 'react';
import { Github, BookOpen, Twitter, Mail, Package, Heart, Terminal } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/animations';

const footerLinks = {
  commands: [
    { label: 'mst init', href: '#commands' },
    { label: 'mst dev', href: '#commands' },
    { label: 'mst build', href: '#commands' },
    { label: 'mst deploy', href: '#commands' },
    { label: 'mst db', href: '#commands' },
  ],
  resources: [
    { label: 'Documentation', href: 'https://docs.masst.dev', icon: BookOpen },
    { label: 'GitHub', href: 'https://github.com/masst/masst', icon: Github },
    { label: 'NPM', href: 'https://www.npmjs.com/package/@masst/cli', icon: Package },
  ],
};

const socialLinks = [
  { icon: Github, href: 'https://github.com/masst/masst', label: 'GitHub' },
  { icon: Twitter, href: 'https://x.com/masstdev', label: 'Twitter' },
  { icon: Mail, href: 'mailto:adityanarayan29j@gmail.com', label: 'Email' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Animate content sections
      gsap.fromTo(
        brandRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate link columns with stagger
      const linkColumns = linksRef.current?.querySelectorAll('.link-column');
      if (linkColumns) {
        gsap.fromTo(
          linkColumns,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: linksRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate bottom bar
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: bottomRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden border-t border-border">
      {/* Terminal grid background */}
      <div
        className="absolute inset-0 terminal-grid opacity-10"
        style={{
          maskImage: 'linear-gradient(to bottom, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
        }}
      />

      {/* Subtle glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, hsl(142 70% 45% / 0.03) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      <div ref={contentRef} className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          {/* Brand section */}
          <div ref={brandRef} className="lg:col-span-5">
            {/* Logo - terminal style */}
            <div className="flex items-center gap-2 mb-4 font-mono">
              <Terminal className="w-5 h-5 term-green" />
              <span className="text-lg font-bold text-foreground">masst</span>
              <span className="text-muted-foreground">cli</span>
            </div>

            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-6 font-mono">
              <span className="term-green"># </span>
              Build production-ready SaaS apps with one command. Minimal, fast, and built with
              taste.
            </p>

            {/* Social links - terminal style */}
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terminal-card p-2.5 transition-all duration-200"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links sections */}
          <div ref={linksRef} className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Commands */}
            <div className="link-column">
              <h3 className="font-mono text-xs term-yellow mb-3 uppercase tracking-wider">
                Commands
              </h3>
              <ul className="space-y-2">
                {footerLinks.commands.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5"
                    >
                      <span className="term-green">$</span>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="link-column">
              <h3 className="font-mono text-xs term-yellow mb-3 uppercase tracking-wider">
                Resources
              </h3>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5"
                      >
                        <IconComponent className="w-3 h-3" />
                        <span>{link.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Legal */}
            <div className="link-column">
              <h3 className="font-mono text-xs term-yellow mb-3 uppercase tracking-wider">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:adityanarayan29j@gmail.com"
                    className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar - terminal style */}
        <div ref={bottomRef} className="pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="font-mono text-xs text-muted-foreground">
              <span className="term-green">$</span> echo &quot;© {new Date().getFullYear()} Masst.
              All rights reserved.&quot;
            </p>
            <p className="font-mono text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="term-green">#</span> Made with
              <Heart className="w-3 h-3 term-red" />
              in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
