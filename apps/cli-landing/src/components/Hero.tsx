'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Copy, Check, ChevronRight } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import Terminal from './Terminal';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install -g @masst/cli');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Set initial states
      gsap.set(contentRef.current, { opacity: 0, y: 30 });
      gsap.set(terminalRef.current, { opacity: 0, y: 40, scale: 0.98 });
      gsap.set(gridRef.current, { opacity: 0 });
      gsap.set(glowRef.current, { opacity: 0, scale: 0.8 });

      // Master timeline
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.to(gridRef.current, { opacity: 0.5, duration: 1 }, 0)
        .to(glowRef.current, { opacity: 1, scale: 1, duration: 1.5 }, 0.2)
        .to(contentRef.current, { opacity: 1, y: 0, duration: 1 }, 0.3)
        .to(terminalRef.current, { opacity: 1, y: 0, scale: 1, duration: 1.2 }, 0.6);

      // Floating glow
      gsap.to(glowRef.current, {
        y: -20,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Parallax on scroll
      gsap.to(headingRef.current, {
        y: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-24 pb-12"
    >
      {/* Terminal grid background */}
      <div
        ref={gridRef}
        className="absolute inset-0 terminal-grid opacity-50"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }}
      />

      {/* Premium ambient glow */}
      <div
        ref={glowRef}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1200px] h-[900px] will-animate gpu-accelerate"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at center, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.06) 35%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Secondary accent glow */}
      <div
        className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Single column layout - centered */}
        <div className="flex flex-col items-center">
          {/* Header content */}
          <div ref={contentRef} className="text-center max-w-3xl mb-10">
            {/* Terminal-style badge - premium */}
            <div className="relative inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full bg-gradient-to-r from-white/[0.03] to-white/[0.01] backdrop-blur-xl border border-white/[0.08] font-mono text-xs shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/10 via-transparent to-cyan-500/10 opacity-50" />
              <span className="relative term-green">$</span>
              <span className="relative text-white/50">npx @masst/cli init</span>
              <ChevronRight className="relative w-3 h-3 text-white/30" />
              <span className="relative term-cyan">shipping SaaS faster</span>
            </div>

            {/* Heading */}
            <div ref={headingRef} className="will-animate">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[1.05] mb-8">
                <span className="text-white">Build SaaS</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                  with one command
                </span>
              </h1>
            </div>

            {/* Subtitle - premium style */}
            <div className="mb-10">
              <p className="text-lg text-white/50 leading-relaxed max-w-xl mx-auto">
                The CLI that scaffolds production-ready monorepos with{' '}
                <span className="text-white/70">Next.js</span>,{' '}
                <span className="text-white/70">NestJS</span>,{' '}
                <span className="text-white/70">Prisma</span>, and{' '}
                <span className="text-white/70">Docker</span>.
              </p>
            </div>

            {/* Install command - premium style */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="relative group/cmd">
                {/* Glow */}
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-emerald-500/20 opacity-0 group-hover/cmd:opacity-100 transition-opacity duration-500" />

                <div className="relative flex items-center gap-3 px-6 py-4 rounded-xl bg-[#0a0f14] border border-white/[0.06] font-mono text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                  <span className="term-green font-bold">$</span>
                  <span className="text-white/80">npm install -g @masst/cli</span>
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg hover:bg-white/[0.05] transition-all duration-200 ml-2 group/btn"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 term-green" />
                    ) : (
                      <Copy className="w-4 h-4 text-white/30 group-hover/btn:text-white/60 transition-colors" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* CTA Buttons - premium style */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a
                href="#quickstart"
                className="group relative px-7 py-4 rounded-xl font-mono text-sm font-medium overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                {/* Button glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-500 opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-b from-white/10 to-transparent" />
                <div className="absolute inset-0 shadow-[0_0_30px_rgba(16,185,129,0.4)]" />

                <span className="relative flex items-center justify-center gap-2 text-white font-semibold drop-shadow-sm">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <a
                href="https://github.com/masst/masst"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-7 py-4 rounded-xl font-mono text-sm font-medium overflow-hidden transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Border gradient */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 via-white/5 to-white/10" />
                <div className="absolute inset-[1px] rounded-[10px] bg-[#0a0f14]" />

                <span className="relative flex items-center justify-center gap-2.5 text-white/60 group-hover:text-white/90 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  View on GitHub
                </span>
              </a>
            </div>

            {/* Stats - premium style */}
            <div className="flex flex-wrap justify-center gap-6 font-mono text-sm">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="text-cyan-400 font-semibold">12</span>
                <span className="text-white/40">commands</span>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-amber-400 font-semibold">60s</span>
                <span className="text-white/40">to launch</span>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                <span className="text-violet-400 font-semibold">MIT</span>
                <span className="text-white/40">license</span>
              </div>
            </div>
          </div>

          {/* Terminal - full width below content */}
          <div ref={terminalRef} className="will-animate w-full max-w-4xl">
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  );
}
