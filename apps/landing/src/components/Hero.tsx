'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/animations';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingLine1Ref = useRef<HTMLSpanElement>(null);
  const headingLine2Ref = useRef<HTMLSpanElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Register ScrollTrigger
      gsap.registerPlugin(ScrollTrigger);

      // Set initial states
      gsap.set(
        [
          badgeRef.current,
          headingLine1Ref.current,
          headingLine2Ref.current,
          subtitleRef.current,
          ctaRef.current,
          statsRef.current,
        ],
        {
          opacity: 0,
          y: 60,
          filter: 'blur(10px)',
        }
      );

      gsap.set(scrollIndicatorRef.current, {
        opacity: 0,
        y: 20,
      });

      gsap.set([orb1Ref.current, orb2Ref.current, orb3Ref.current], {
        scale: 0.8,
        opacity: 0,
      });

      gsap.set(gridRef.current, {
        opacity: 0,
      });

      // Create master timeline for hero entrance
      const masterTL = gsap.timeline({
        defaults: {
          ease: 'expo.out',
        },
      });

      // Animate background elements first
      masterTL
        .to(
          gridRef.current,
          {
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out',
          },
          0
        )
        .to(
          orb1Ref.current,
          {
            scale: 1,
            opacity: 1,
            duration: 2,
            ease: 'power3.out',
          },
          0.2
        )
        .to(
          orb2Ref.current,
          {
            scale: 1,
            opacity: 1,
            duration: 2,
            ease: 'power3.out',
          },
          0.4
        )
        .to(
          orb3Ref.current,
          {
            scale: 1,
            opacity: 1,
            duration: 2,
            ease: 'power3.out',
          },
          0.6
        );

      // Animate content with staggered reveal
      const contentTL = gsap.timeline({
        defaults: {
          ease: 'expo.out',
          duration: 1.2,
        },
      });

      contentTL
        .to(
          badgeRef.current,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
          },
          0.3
        )
        .to(
          headingLine1Ref.current,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          },
          0.5
        )
        .to(
          headingLine2Ref.current,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          },
          0.7
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          },
          0.9
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          },
          1.1
        )
        .to(
          statsRef.current,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          },
          1.3
        )
        .to(
          scrollIndicatorRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          1.5
        );

      // Continuous floating animation for orbs
      gsap.to(orb1Ref.current, {
        y: -30,
        x: 15,
        duration: 6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(orb2Ref.current, {
        y: 25,
        x: -20,
        duration: 8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1,
      });

      gsap.to(orb3Ref.current, {
        y: -20,
        x: 10,
        duration: 7,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 2,
      });

      // Parallax effect on scroll
      gsap.to(headingRef.current, {
        y: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to([orb1Ref.current, orb2Ref.current, orb3Ref.current], {
        y: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      // Fade out on scroll
      gsap.to(sectionRef.current, {
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '60% top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Animated gradient orbs with enhanced visuals */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={orb1Ref}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full will-animate gpu-accelerate"
          style={{
            background:
              'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          ref={orb2Ref}
          className="absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full will-animate gpu-accelerate"
          style={{
            background:
              'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        <div
          ref={orb3Ref}
          className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] rounded-full will-animate gpu-accelerate"
          style={{
            background:
              'radial-gradient(circle, rgba(244, 63, 94, 0.15) 0%, rgba(249, 115, 22, 0.08) 40%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        ref={gridRef}
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none noise-overlay" />

      <div
        ref={headingRef}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-5 py-2.5 mb-10 rounded-full bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-violet-500/10 border border-violet-500/20 backdrop-blur-sm will-animate"
        >
          <Sparkles className="w-4 h-4 text-violet-400 animate-breathe" />
          <span className="text-sm font-medium bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Developer-first tools
          </span>
        </div>

        {/* Main heading with split animation */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 tracking-tight leading-[1.1]">
          <span ref={headingLine1Ref} className="block text-foreground will-animate">
            Dev tools you&apos;ll
          </span>
          <span
            ref={headingLine2Ref}
            className="block bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent will-animate gradient-text-animated"
          >
            actually love
          </span>
        </h1>

        {/* Subheading */}
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed will-animate"
        >
          A modern ecosystem of handcrafted developer tools — minimal, blazing fast, and growing
          with you.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center will-animate"
        >
          <button
            onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative px-8 py-4 rounded-2xl font-semibold text-lg overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 hover-glow"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 animate-gradient" />
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
            <span className="relative flex items-center gap-2 text-white">
              Explore Tools
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>

          <a
            href="https://github.com/AdityaNarayan29"
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group px-8 py-4 rounded-2xl font-semibold text-lg border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 active:scale-95"
          >
            <span className="flex items-center gap-2 text-foreground">
              View on GitHub
              <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </span>
          </a>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="mt-20 pt-8 border-t border-white/10 will-animate">
          <div className="flex flex-wrap justify-center gap-12 sm:gap-20 text-center">
            <div className="group">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                5+
              </div>
              <div className="text-sm text-muted-foreground mt-1">Dev Tools</div>
            </div>
            <div className="group">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                Open
              </div>
              <div className="text-sm text-muted-foreground mt-1">Source</div>
            </div>
            <div className="group">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                MIT
              </div>
              <div className="text-sm text-muted-foreground mt-1">Licensed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 will-animate"
      >
        <span className="text-xs text-muted-foreground/60 uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <ChevronDown className="w-4 h-4 text-muted-foreground/50 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
