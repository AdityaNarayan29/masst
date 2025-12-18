'use client';

import { useEffect, useRef, useState } from 'react';
import { Copy, Check, Sparkles, ArrowRight, Folder, Zap, Globe } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/animations';

const steps = [
  {
    step: 1,
    title: 'Install the CLI',
    command: 'npm install -g @masst/cli',
    description: 'Install Masst CLI globally to access it from anywhere.',
    icon: Zap,
  },
  {
    step: 2,
    title: 'Create your project',
    command: 'mst init my-saas-app',
    description: 'Scaffold a complete SaaS monorepo with all the essentials.',
    icon: Folder,
  },
  {
    step: 3,
    title: 'Start developing',
    command: 'cd my-saas-app && mst dev',
    description: 'Launch Docker, database, and dev servers in one command.',
    icon: Globe,
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

      // Animate steps with stagger
      const stepCards = stepsRef.current?.querySelectorAll('.step-card');
      if (stepCards) {
        gsap.fromTo(
          stepCards,
          {
            opacity: 0,
            x: -50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
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
        {
          opacity: 0,
          x: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
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

  // Step card hover animation
  const handleStepHover = (e: React.MouseEvent, isEntering: boolean) => {
    const card = e.currentTarget;
    const icon = card.querySelector('.step-icon');

    if (isEntering) {
      gsap.to(card, {
        x: 8,
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
    } else {
      gsap.to(card, {
        x: 0,
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
    }
  };

  return (
    <section ref={sectionRef} id="quickstart" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-breathe" />
            <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Quick Start
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-foreground">Up and running in</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent gradient-text-animated">
              under a minute
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Three commands. That's all it takes to go from zero to a fully-functional SaaS
            application.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Steps */}
          <div ref={stepsRef} className="space-y-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.step}
                  className="step-card group relative"
                  onMouseEnter={(e) => handleStepHover(e, true)}
                  onMouseLeave={(e) => handleStepHover(e, false)}
                >
                  <div className="relative bg-background/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-300 group-hover:border-white/20 group-hover:bg-background/80">
                    {/* Step number and icon */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="step-icon relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/25">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-violet-400">
                            Step {step.step}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                      </div>
                    </div>

                    {/* Command */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0d1117] border border-white/10 font-mono text-sm">
                        <span className="text-emerald-400">$</span>
                        <span className="text-white/90 flex-1">{step.command}</span>
                        <button
                          onClick={() => handleCopy(step.command, index)}
                          className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
                        >
                          {copiedIndex === index ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-white/40 hover:text-white/70" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground">{step.description}</p>

                    {/* Arrow connector (except last) */}
                    {index < steps.length - 1 && (
                      <div className="absolute -bottom-6 left-6 w-px h-6 bg-gradient-to-b from-violet-500/50 to-transparent" />
                    )}
                  </div>
                </div>
              );
            })}

            {/* CTA after steps */}
            <div className="pt-4">
              <a
                href="https://github.com/masst/masst"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <span className="text-foreground">View full documentation</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Project structure */}
          <div ref={structureRef} className="relative group hidden lg:block">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700" />

            <div className="relative bg-background/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group-hover:border-white/20 transition-all duration-300">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-white/40 font-mono">Project Structure</span>
                </div>
                <div className="w-16" />
              </div>

              {/* Code content */}
              <div className="p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-white/80 leading-relaxed">
                  {projectStructure.split('\n').map((line, i) => (
                    <div key={i} className="hover:bg-white/5 px-2 -mx-2 rounded transition-colors">
                      {line.includes('apps/') ||
                      line.includes('packages/') ||
                      line.includes('docker') ||
                      line.includes('turbo') ? (
                        <span className="text-violet-400">{line}</span>
                      ) : line.includes('# ') ? (
                        <>
                          <span className="text-white/60">{line.split('# ')[0]}</span>
                          <span className="text-emerald-400/60"># {line.split('# ')[1]}</span>
                        </>
                      ) : (
                        <span className="text-white/60">{line}</span>
                      )}
                    </div>
                  ))}
                </pre>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full text-xs font-medium text-white shadow-lg shadow-violet-500/25">
              Production Ready
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
