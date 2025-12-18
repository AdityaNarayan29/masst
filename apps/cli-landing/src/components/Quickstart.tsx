'use client';

import { useEffect, useRef, useState } from 'react';
import { Copy, Check, ArrowRight } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/animations';

const steps = [
  {
    step: 1,
    title: 'Install the CLI',
    command: 'npm install -g @masst/cli',
    description: 'Install Masst CLI globally',
  },
  {
    step: 2,
    title: 'Create your project',
    command: 'mst init my-saas-app',
    description: 'Scaffold a complete SaaS monorepo',
  },
  {
    step: 3,
    title: 'Start developing',
    command: 'cd my-saas-app && mst dev',
    description: 'Launch everything with one command',
  },
];

const projectStructure = `my-saas-app/
├── apps/
│   ├── web/              # Next.js 15 + @masst/ui
│   │   ├── app/
│   │   │   ├── (auth)/   # Login & Signup
│   │   │   └── dashboard/# Protected dashboard
│   │   └── components/
│   └── api/              # NestJS Backend
│       └── src/
│           ├── auth/     # JWT authentication
│           ├── users/    # User management
│           └── tenants/  # Multi-tenant support
├── packages/
│   └── database/         # Prisma + PostgreSQL
├── docker-compose.yml    # PostgreSQL + Redis
└── turbo.json            # Turborepo config`;

export default function Quickstart() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const structureRef = useRef<HTMLDivElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (command: string, index: number) => {
    navigator.clipboard.writeText(command);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Animate header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
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

      // Animate steps with stagger
      const stepCards = stepsRef.current?.querySelectorAll('.step-card');
      if (stepCards) {
        gsap.fromTo(
          stepCards,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate structure
      gsap.fromTo(
        structureRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: structureRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="quickstart" className="relative py-24 overflow-hidden">
      {/* Terminal grid background */}
      <div
        className="absolute inset-0 terminal-grid opacity-20"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header - terminal style */}
        <div ref={headerRef} className="mb-12">
          <div className="terminal-window max-w-xl">
            <div className="terminal-header">
              <div className="flex gap-2">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
              </div>
              <span className="text-xs text-muted-foreground font-mono ml-4">quickstart.sh</span>
            </div>
            <div className="terminal-body">
              <div className="font-mono text-sm">
                <span className="term-yellow">#!/bin/bash</span>
              </div>
              <div className="font-mono text-sm mt-2">
                <span className="term-green"># </span>
                <span className="text-muted-foreground">
                  Get up and running in under 60 seconds
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Steps */}
          <div ref={stepsRef} className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.step} className="step-card group">
                <div className="terminal-card p-4 transition-all duration-300 group-hover:border-emerald-500/30">
                  {/* Step header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded bg-emerald-500/20 border border-emerald-500/30">
                      <span className="term-green font-mono text-xs font-bold">{step.step}</span>
                    </div>
                    <h3 className="text-sm font-medium text-foreground font-mono">{step.title}</h3>
                  </div>

                  {/* Command */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded bg-background border border-border font-mono text-xs">
                      <span className="term-green">$</span>
                      <span className="text-foreground flex-1">{step.command}</span>
                      <button
                        onClick={() => handleCopy(step.command, index)}
                        className="p-1 rounded hover:bg-muted transition-colors"
                      >
                        {copiedIndex === index ? (
                          <Check className="w-3.5 h-3.5 term-green" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground font-mono">
                    <span className="term-green"># </span>
                    {step.description}
                  </p>
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="flex justify-start ml-7 my-1">
                    <div className="w-px h-4 bg-border" />
                  </div>
                )}
              </div>
            ))}

            {/* CTA after steps */}
            <div className="pt-4">
              <a
                href="https://docs.masst.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs border border-border hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300"
              >
                <span className="term-green">$</span>
                <span className="text-foreground">cat docs/README.md</span>
                <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:translate-x-1 group-hover:term-green transition-all" />
              </a>
            </div>
          </div>

          {/* Project structure - terminal window */}
          <div ref={structureRef} className="relative hidden lg:block">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="flex gap-2">
                  <div className="terminal-dot terminal-dot-red" />
                  <div className="terminal-dot terminal-dot-yellow" />
                  <div className="terminal-dot terminal-dot-green" />
                </div>
                <span className="text-xs text-muted-foreground font-mono ml-4">
                  tree my-saas-app
                </span>
              </div>

              {/* Code content */}
              <div className="p-4 font-mono text-xs overflow-x-auto max-h-[400px] overflow-y-auto">
                <div className="mb-2">
                  <span className="term-green">$</span>{' '}
                  <span className="text-foreground">tree my-saas-app -L 4</span>
                </div>
                <pre className="text-muted-foreground leading-relaxed">
                  {projectStructure.split('\n').map((line, i) => {
                    const isDirectory =
                      line.includes('apps/') ||
                      line.includes('packages/') ||
                      line.includes('web/') ||
                      line.includes('api/') ||
                      line.includes('src/') ||
                      line.includes('app/');
                    const isConfig =
                      line.includes('docker') || line.includes('turbo') || line.includes('.yml');
                    const hasComment = line.includes('# ');

                    if (hasComment) {
                      const [path, comment] = line.split('# ');
                      return (
                        <div
                          key={i}
                          className="hover:bg-white/5 px-2 -mx-2 rounded transition-colors"
                        >
                          <span className={isDirectory ? 'term-cyan' : 'text-muted-foreground'}>
                            {path}
                          </span>
                          <span className="term-green opacity-60"># {comment}</span>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={i}
                        className="hover:bg-white/5 px-2 -mx-2 rounded transition-colors"
                      >
                        <span
                          className={
                            isDirectory
                              ? 'term-cyan'
                              : isConfig
                                ? 'term-yellow'
                                : 'text-muted-foreground'
                          }
                        >
                          {line}
                        </span>
                      </div>
                    );
                  })}
                </pre>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-2 -right-2 px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded text-xs font-mono term-green">
              production-ready
            </div>
          </div>
        </div>
      </div>

      {/* Terminal divider */}
      <div className="absolute bottom-0 left-0 right-0 terminal-divider" />
    </section>
  );
}
