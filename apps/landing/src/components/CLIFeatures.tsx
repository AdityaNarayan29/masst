'use client';

import { useEffect, useRef } from 'react';
import {
  Terminal,
  Rocket,
  Database,
  CreditCard,
  Mail,
  BarChart3,
  Package,
  CloudUpload,
  ScrollText,
  RefreshCw,
  Square,
  Download,
  Sparkles,
} from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/animations';

const commands = [
  {
    command: 'mst init',
    title: 'Initialize Project',
    description:
      'Scaffold a production-ready SaaS monorepo with Next.js, NestJS, Prisma, and Docker in seconds.',
    icon: Rocket,
    gradient: 'from-violet-500 to-purple-600',
    glowColor: 'rgba(139, 92, 246, 0.5)',
  },
  {
    command: 'mst dev',
    title: 'Development Server',
    description:
      'Start Docker, sync database, seed demo data, and launch all services with one command.',
    icon: Terminal,
    gradient: 'from-emerald-500 to-green-600',
    glowColor: 'rgba(16, 185, 129, 0.5)',
  },
  {
    command: 'mst db',
    title: 'Database Management',
    description: 'Prisma Studio, migrations, reset, push, and seed commands all in one place.',
    icon: Database,
    gradient: 'from-cyan-500 to-blue-600',
    glowColor: 'rgba(6, 182, 212, 0.5)',
  },
  {
    command: 'mst add stripe',
    title: 'Add Stripe Billing',
    description: 'Install Stripe SDK, billing types, and webhook setup with a single command.',
    icon: CreditCard,
    gradient: 'from-indigo-500 to-violet-600',
    glowColor: 'rgba(99, 102, 241, 0.5)',
  },
  {
    command: 'mst add emails',
    title: 'Add Email Support',
    description: 'Set up Resend with React Email components for beautiful transactional emails.',
    icon: Mail,
    gradient: 'from-rose-500 to-pink-600',
    glowColor: 'rgba(244, 63, 94, 0.5)',
  },
  {
    command: 'mst add analytics',
    title: 'Add Analytics',
    description: 'Integrate PostHog with tracking provider for powerful product analytics.',
    icon: BarChart3,
    gradient: 'from-amber-500 to-orange-600',
    glowColor: 'rgba(245, 158, 11, 0.5)',
  },
  {
    command: 'mst build',
    title: 'Production Build',
    description: 'Build all applications for production with optimized bundles and assets.',
    icon: Package,
    gradient: 'from-slate-500 to-gray-600',
    glowColor: 'rgba(100, 116, 139, 0.5)',
  },
  {
    command: 'mst deploy',
    title: 'Deploy Anywhere',
    description: 'Deploy to Railway, Fly.io, Render, or build Docker images for custom hosting.',
    icon: CloudUpload,
    gradient: 'from-sky-500 to-cyan-600',
    glowColor: 'rgba(14, 165, 233, 0.5)',
  },
  {
    command: 'mst logs',
    title: 'View Logs',
    description: 'Stream Docker container logs with filtering and follow mode for debugging.',
    icon: ScrollText,
    gradient: 'from-teal-500 to-emerald-600',
    glowColor: 'rgba(20, 184, 166, 0.5)',
  },
  {
    command: 'mst upgrade',
    title: 'Upgrade Packages',
    description: 'Check and upgrade all @masst packages to their latest versions.',
    icon: RefreshCw,
    gradient: 'from-fuchsia-500 to-pink-600',
    glowColor: 'rgba(217, 70, 239, 0.5)',
  },
  {
    command: 'mst i',
    title: 'Install Packages',
    description: 'Smart package installer with automatic @masst/ scope prefixing.',
    icon: Download,
    gradient: 'from-lime-500 to-green-600',
    glowColor: 'rgba(132, 204, 22, 0.5)',
  },
  {
    command: 'mst stop',
    title: 'Stop Services',
    description: 'Gracefully stop all Docker containers and free up system resources.',
    icon: Square,
    gradient: 'from-red-500 to-rose-600',
    glowColor: 'rgba(239, 68, 68, 0.5)',
  },
];

export default function CLIFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Animate header on scroll
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 80,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate cards with stagger
      const cards = cardsRef.current?.querySelectorAll('.command-card');
      if (cards) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Floating animation for orbs
      gsap.to(orb1Ref.current, {
        y: -40,
        x: 20,
        duration: 8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(orb2Ref.current, {
        y: 30,
        x: -25,
        duration: 10,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 2,
      });

      // Parallax for orbs on scroll
      gsap.to([orb1Ref.current, orb2Ref.current], {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Card hover animation
  const handleCardHover = (e: React.MouseEvent, isEntering: boolean) => {
    const card = e.currentTarget;
    const icon = card.querySelector('.command-icon');
    const glow = card.querySelector('.card-glow');
    const command = card.querySelector('.command-text');

    if (isEntering) {
      gsap.to(card, {
        y: -6,
        duration: 0.3,
        ease: 'power2.out',
      });
      if (icon) {
        gsap.to(icon, {
          scale: 1.1,
          rotate: 5,
          duration: 0.3,
          ease: 'back.out(2)',
        });
      }
      if (glow) {
        gsap.to(glow, {
          opacity: 0.4,
          scale: 1.05,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
      if (command) {
        gsap.to(command, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    } else {
      gsap.to(card, {
        y: 0,
        duration: 0.4,
        ease: 'elastic.out(1, 0.5)',
      });
      if (icon) {
        gsap.to(icon, {
          scale: 1,
          rotate: 0,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
        });
      }
      if (glow) {
        gsap.to(glow, {
          opacity: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
      if (command) {
        gsap.to(command, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    }
  };

  return (
    <section ref={sectionRef} id="commands" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

      {/* Gradient orbs */}
      <div
        ref={orb1Ref}
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full will-animate gpu-accelerate"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full will-animate gpu-accelerate"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-breathe" />
            <span className="text-sm font-medium bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Powerful Commands
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-foreground">Everything you need,</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 bg-clip-text text-transparent gradient-text-animated">
              one command away
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From project scaffolding to deployment, Masst CLI handles the entire SaaS development
            lifecycle.
          </p>
        </div>

        {/* Commands grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {commands.map((cmd) => {
            const IconComponent = cmd.icon;
            return (
              <div
                key={cmd.command}
                className="command-card group relative will-animate cursor-pointer"
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
              >
                {/* Card glow effect */}
                <div
                  className="card-glow absolute -inset-1 rounded-2xl opacity-0 will-animate"
                  style={{
                    background: `radial-gradient(400px circle at 50% 50%, ${cmd.glowColor}, transparent 50%)`,
                    filter: 'blur(15px)',
                  }}
                />

                {/* Gradient border on hover */}
                <div
                  className={`absolute -inset-[1px] bg-gradient-to-r ${cmd.gradient} rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                />

                {/* Card */}
                <div className="relative h-full bg-background/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 transition-all duration-500 group-hover:border-white/20 group-hover:bg-background/80">
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-3">
                    {/* Icon with gradient background */}
                    <div
                      className={`command-icon relative p-2.5 rounded-xl bg-gradient-to-br ${cmd.gradient} shadow-lg flex-shrink-0`}
                      style={{
                        boxShadow: `0 8px 30px -8px ${cmd.glowColor}`,
                      }}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-foreground truncate">
                        {cmd.title}
                      </h3>
                      <div className="command-text inline-flex items-center gap-1.5 px-2 py-0.5 mt-1 rounded-md bg-[#0d1117] border border-white/10 font-mono text-xs">
                        <span className="text-emerald-400">$</span>
                        <span className="text-white/90">{cmd.command}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                    {cmd.description}
                  </p>

                  {/* Decorative gradient corner */}
                  <div
                    className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${cmd.gradient} opacity-[0.03] rounded-tr-2xl rounded-bl-[60px] group-hover:opacity-[0.08] transition-opacity duration-500`}
                  />

                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
