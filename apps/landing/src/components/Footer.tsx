'use client';

import { useEffect, useRef } from 'react';
import { Github, BookOpen, Twitter, Mail, Package, Heart, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/animations';

const footerLinks = {
  tools: [
    { label: 'LeetDaily', href: 'https://leetdaily.masst.dev/' },
    { label: 'Masst UI', href: 'https://www.npmjs.com/package/masst' },
    { label: 'Masst CLI', href: 'https://www.npmjs.com/package/masst' },
    { label: 'Masst Events', href: 'https://mast-events.framer.website/' },
    { label: 'Masst Docs', href: 'https://docs.masst.dev' },
  ],
  resources: [
    { label: 'Documentation', href: 'https://docs.masst.dev', icon: BookOpen },
    { label: 'GitHub', href: 'https://github.com/AdityaNarayan29', icon: Github },
    { label: 'NPM', href: 'https://www.npmjs.com/package/masst', icon: Package },
  ],
};

const socialLinks = [
  { icon: Github, href: 'https://github.com/AdityaNarayan29/', label: 'GitHub' },
  { icon: Twitter, href: 'https://x.com/masstdev', label: 'Twitter' },
  { icon: Mail, href: 'mailto:adityanarayan29j@gmail.com', label: 'Email' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Animate content sections
      gsap.fromTo(
        brandRef.current,
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
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
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
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
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: bottomRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating orb animation
      gsap.to(orbRef.current, {
        y: -30,
        x: 20,
        duration: 8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  // Link hover animation
  const handleLinkHover = (e: React.MouseEvent, isEntering: boolean) => {
    const link = e.currentTarget;
    const arrow = link.querySelector('.link-arrow');

    if (isEntering) {
      gsap.to(link, {
        x: 5,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(arrow, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(link, {
        x: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(arrow, {
        x: -5,
        y: 5,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  // Social icon hover animation
  const handleSocialHover = (e: React.MouseEvent, isEntering: boolean) => {
    const icon = e.currentTarget;
    const svg = icon.querySelector('svg');

    if (isEntering) {
      gsap.to(icon, {
        scale: 1.1,
        y: -3,
        duration: 0.3,
        ease: 'back.out(2)',
      });
      gsap.to(svg, {
        rotate: 10,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(icon, {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'elastic.out(1, 0.5)',
      });
      gsap.to(svg, {
        rotate: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  // Logo hover animation
  const handleLogoHover = (e: React.MouseEvent, isEntering: boolean) => {
    const logo = e.currentTarget;
    const img = logo.querySelector('img');
    const text = logo.querySelector('span');

    if (isEntering) {
      gsap.to(img, {
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
      gsap.to(img, {
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
  };

  return (
    <footer ref={footerRef} className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-background" />

      {/* Gradient orb */}
      <div
        ref={orbRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full will-animate gpu-accelerate"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, rgba(217, 70, 239, 0.08) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div ref={contentRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand section */}
          <div ref={brandRef} className="lg:col-span-5">
            {/* Logo */}
            <div
              className="flex items-center gap-2.5 mb-6 cursor-pointer w-fit"
              onMouseEnter={(e) => handleLogoHover(e, true)}
              onMouseLeave={(e) => handleLogoHover(e, false)}
            >
              <Image src="/logo.png" alt="Masst" width={36} height={36} className="w-9 h-9" />
              <span className="text-2xl font-bold text-foreground">Masst</span>
            </div>

            <p className="text-muted-foreground max-w-sm leading-relaxed mb-8">
              Building the future of developer tools — one craft at a time. Minimal, fast, and built
              with taste.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={(e) => handleSocialHover(e, true)}
                    onMouseLeave={(e) => handleSocialHover(e, false)}
                    className="group relative p-3 rounded-xl overflow-hidden transition-all duration-300"
                    aria-label={social.label}
                  >
                    <div className="absolute inset-0 bg-white/5 group-hover:bg-gradient-to-r group-hover:from-violet-500/20 group-hover:to-fuchsia-500/20 transition-all duration-300" />
                    <div className="absolute inset-0 border border-white/10 group-hover:border-white/20 rounded-xl transition-colors duration-300" />
                    <IconComponent className="relative w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links sections */}
          <div ref={linksRef} className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Tools */}
            <div className="link-column">
              <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                Tools
              </h3>
              <ul className="space-y-3">
                {footerLinks.tools.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={(e) => handleLinkHover(e, true)}
                      onMouseLeave={(e) => handleLinkHover(e, false)}
                      className="group inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {link.label}
                      <ArrowUpRight className="link-arrow w-3 h-3 opacity-0 -translate-x-1 translate-y-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="link-column">
              <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                Resources
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={(e) => handleLinkHover(e, true)}
                        onMouseLeave={(e) => handleLinkHover(e, false)}
                        className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                      >
                        <IconComponent className="w-4 h-4" />
                        {link.label}
                        <ArrowUpRight className="link-arrow w-3 h-3 opacity-0 -translate-x-1 translate-y-1" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Legal */}
            <div className="link-column">
              <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                Legal
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    onMouseEnter={(e) => handleLinkHover(e, true)}
                    onMouseLeave={(e) => handleLinkHover(e, false)}
                    className="group inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    Privacy
                    <ArrowUpRight className="link-arrow w-3 h-3 opacity-0 -translate-x-1 translate-y-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onMouseEnter={(e) => handleLinkHover(e, true)}
                    onMouseLeave={(e) => handleLinkHover(e, false)}
                    className="group inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    Terms
                    <ArrowUpRight className="link-arrow w-3 h-3 opacity-0 -translate-x-1 translate-y-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:adityanarayan29j@gmail.com"
                    onMouseEnter={(e) => handleLinkHover(e, true)}
                    onMouseLeave={(e) => handleLinkHover(e, false)}
                    className="group inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    Contact
                    <ArrowUpRight className="link-arrow w-3 h-3 opacity-0 -translate-x-1 translate-y-1" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div ref={bottomRef} className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Masst. Crafted with care for developers everywhere.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              Made with <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" /> in
              India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
