'use client';

import { useEffect, useRef, useState } from 'react';
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
  Copy,
  Check,
} from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/animations';

const commands = [
  {
    command: 'mst init',
    title: 'Initialize Project',
    description:
      'Scaffold a production-ready SaaS monorepo with Next.js, NestJS, Prisma, and Docker.',
    icon: Rocket,
    color: 'term-magenta',
  },
  {
    command: 'mst dev',
    title: 'Development Server',
    description: 'Start Docker, sync database, seed demo data, and launch all services.',
    icon: Terminal,
    color: 'term-green',
  },
  {
    command: 'mst db',
    title: 'Database Management',
    description: 'Prisma Studio, migrations, reset, push, and seed commands.',
    icon: Database,
    color: 'term-cyan',
  },
  {
    command: 'mst add stripe',
    title: 'Add Stripe Billing',
    description: 'Install Stripe SDK, billing types, and webhook setup.',
    icon: CreditCard,
    color: 'term-blue',
  },
  {
    command: 'mst add emails',
    title: 'Add Email Support',
    description: 'Set up Resend with React Email components.',
    icon: Mail,
    color: 'term-red',
  },
  {
    command: 'mst add analytics',
    title: 'Add Analytics',
    description: 'Integrate PostHog with tracking provider.',
    icon: BarChart3,
    color: 'term-yellow',
  },
  {
    command: 'mst build',
    title: 'Production Build',
    description: 'Build all applications for production deployment.',
    icon: Package,
    color: 'term-cyan',
  },
  {
    command: 'mst deploy',
    title: 'Deploy Anywhere',
    description: 'Deploy to Railway, Fly.io, Render, or Docker.',
    icon: CloudUpload,
    color: 'term-blue',
  },
  {
    command: 'mst logs',
    title: 'View Logs',
    description: 'Stream Docker container logs with filtering.',
    icon: ScrollText,
    color: 'term-green',
  },
  {
    command: 'mst upgrade',
    title: 'Upgrade Packages',
    description: 'Check and upgrade all @masst packages.',
    icon: RefreshCw,
    color: 'term-magenta',
  },
  {
    command: 'mst i',
    title: 'Install Packages',
    description: 'Smart package installer with auto scope prefixing.',
    icon: Download,
    color: 'term-yellow',
  },
  {
    command: 'mst stop',
    title: 'Stop Services',
    description: 'Gracefully stop all Docker containers.',
    icon: Square,
    color: 'term-red',
  },
];

export default function CLIFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const handleCopy = (command: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Animate header on scroll
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Card hover animation
  const handleCardHover = (e: React.MouseEvent, isEntering: boolean) => {
    const card = e.currentTarget;

    if (isEntering) {
      gsap.to(card, {
        y: -4,
        duration: 0.2,
        ease: 'power2.out',
      });
    } else {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section ref={sectionRef} id="commands" className="relative py-24 overflow-hidden">
      {/* Terminal grid background */}
      <div
        className="absolute inset-0 terminal-grid opacity-30"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
        }}
      />

      {/* Subtle glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, hsl(142 70% 45% / 0.03) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header - terminal style */}
        <div ref={headerRef} className="mb-12">
          <div className="terminal-window max-w-2xl">
            <div className="terminal-header">
              <div className="flex gap-2">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
              </div>
              <span className="text-xs text-muted-foreground font-mono ml-4">
                ~/masst --help
              </span>
            </div>
            <div className="terminal-body space-y-2">
              <div className="font-mono text-sm">
                <span className="term-green">$</span>{' '}
                <span className="text-foreground">mst --help</span>
              </div>
              <div className="font-mono text-xs text-muted-foreground mt-3">
                <p className="term-cyan mb-2">Masst CLI - SaaS Starter Kit Generator</p>
                <p className="text-muted-foreground">
                  Build production-ready SaaS applications with one command.
                </p>
              </div>
              <div className="font-mono text-xs mt-4">
                <p className="term-yellow mb-1">COMMANDS:</p>
              </div>
            </div>
          </div>
        </div>

        {/* Commands grid - terminal cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
        >
          {commands.map((cmd) => {
            const IconComponent = cmd.icon;
            return (
              <div
                key={cmd.command}
                className="command-card group terminal-card p-4 cursor-pointer"
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
              >
                {/* Command header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className={`${cmd.color}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-medium text-foreground font-mono">{cmd.title}</h3>
                </div>

                {/* Command line with copy button */}
                <div className="flex items-center gap-2 mb-3 font-mono text-xs bg-background/50 rounded px-2 py-1.5 border border-border/50">
                  <span className="term-green">$</span>
                  <span className="text-foreground flex-1">{cmd.command}</span>
                  <button
                    onClick={(e) => handleCopy(cmd.command, e)}
                    className="p-1 rounded hover:bg-muted transition-colors"
                    title="Copy command"
                  >
                    {copiedCommand === cmd.command ? (
                      <Check className="w-3 h-3 term-green" />
                    ) : (
                      <Copy className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                    )}
                  </button>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-xs leading-relaxed">{cmd.description}</p>
              </div>
            );
          })}
        </div>

        {/* Footer hint */}
        <div className="mt-8 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            <span className="term-green">$</span> mst {'<command>'} --help{' '}
            <span className="text-muted-foreground/50">for more info</span>
          </p>
        </div>
      </div>

      {/* Terminal divider */}
      <div className="absolute bottom-0 left-0 right-0 terminal-divider" />
    </section>
  );
}
