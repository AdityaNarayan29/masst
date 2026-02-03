'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight, MousePointer2 } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/animations';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Initial states
      gsap.set([badgeRef.current, titleRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 30,
      });

      gsap.set(glowRef.current, { opacity: 0, scale: 0.8 });

      // Entrance timeline
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(glowRef.current, {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'power2.out',
      })
        .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3)
        .to(titleRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0.5)
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.7)
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.9);

      // Parallax
      gsap.to(containerRef.current, {
        y: 150,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Glow follow mouse
      const handleMouseMove = (e: MouseEvent) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect || !glowRef.current) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(glowRef.current, {
          x: x - 400,
          y: y - 400,
          duration: 1.5,
          ease: 'power2.out',
        });
      };

      sectionRef.current?.addEventListener('mousemove', handleMouseMove);

      return () => {
        sectionRef.current?.removeEventListener('mousemove', handleMouseMove);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-[#0a0a0a]"
    >
      {/* Animated glow that follows cursor */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute w-[800px] h-[800px] rounded-full dark:opacity-100 opacity-50"
        style={{
          background:
            'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(124, 58, 237, 0.05) 25%, transparent 50%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />

      {/* Content */}
      <div ref={containerRef} className="relative z-10 w-full max-w-[1200px] mx-auto px-6">
        {/* Badge */}
        <div ref={badgeRef} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[13px] text-black/60 dark:text-white/60 font-medium">
              Free to Use
            </span>
            <span className="text-black/20 dark:text-white/20">·</span>
            <span className="text-[13px] text-black/40 dark:text-white/40">Now on NPM</span>
          </div>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-center font-bold tracking-[-0.04em] leading-[0.95]"
          style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}
        >
          <span className="block text-black dark:text-white">Dev tools you&apos;ll</span>
          <span className="block mt-2">
            <span className="text-black dark:text-white">actually </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #0ea5e9 100%)',
              }}
            >
              love
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-8 text-center text-lg sm:text-xl text-black/40 dark:text-white/40 max-w-[600px] mx-auto leading-relaxed font-light"
        >
          A modern ecosystem of{' '}
          <span className="text-black/60 dark:text-white/60">handcrafted developer tools</span> —{' '}
          <span className="text-black/60 dark:text-white/60">minimal</span>,{' '}
          <span className="text-black/60 dark:text-white/60">fast</span>, and growing with you.
        </p>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative h-12 px-8 rounded-full font-medium text-[15px] text-white overflow-hidden transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
              }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
              }}
            />
            <span className="relative flex items-center gap-2">
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </span>
          </button>

          <a
            href="https://github.com/AdityaNarayan29/masst"
            target="_blank"
            rel="noopener noreferrer"
            className="group h-12 px-8 rounded-full font-medium text-[15px] text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white border border-black/[0.08] dark:border-white/[0.08] hover:border-black/[0.15] dark:hover:border-white/[0.15] bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] flex items-center gap-2 transition-all duration-200"
          >
            Star on GitHub
            <span className="text-black/30 dark:text-white/30 group-hover:text-black/50 dark:group-hover:text-white/50 transition-colors">
              →
            </span>
          </a>
        </div>

        {/* Stats */}
        <div className="mt-24 flex items-center justify-center gap-12 sm:gap-20">
          {[
            { value: '50+', label: 'Components' },
            { value: '6', label: 'Products' },
            { value: '100%', label: 'Free' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-semibold text-black dark:text-white tracking-tight">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-black/30 dark:text-white/30">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-black/20 dark:text-white/20">
        <MousePointer2 className="w-4 h-4 animate-bounce" />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none" />
    </section>
  );
}
