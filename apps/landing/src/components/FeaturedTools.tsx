'use client';

import { useEffect, useRef } from 'react';
import {
  ExternalLink,
  Github,
  Zap,
  Terminal,
  FileText,
  Eye,
  Layers,
  Flame,
  Globe,
  Globe2,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/animations';

const tools = [
  {
    name: 'Masst Docs',
    subtitle: 'System Design',
    description: 'AI-powered, minimal documentation viewer with blazing fast search.',
    icon: FileText,
    gradient: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    links: [
      { label: 'Project', url: 'https://docs.masst.dev/', icon: Globe2 },
      { label: 'GitHub', url: 'https://github.com/AdityaNarayan29/masstDocs', icon: Github },
    ],
    status: 'available',
  },
  {
    name: 'LeetDaily',
    subtitle: 'Chrome Extension',
    description:
      'Track your LeetCode streak. Chrome extension that glows red if you forget to solve.',
    icon: Flame,
    gradient: 'from-orange-500 to-red-500',
    glowColor: 'rgba(249, 115, 22, 0.5)',
    links: [
      {
        label: 'Chrome Store',
        url: 'https://chromewebstore.google.com/detail/leetdaily-%E2%80%94-daily-leetcod/kpmmlpoonleloofchbbfnmicchmhehcf',
        icon: ExternalLink,
      },
      { label: 'Landing', url: 'https://leetdaily.masst.dev/', icon: Globe },
      { label: 'GitHub', url: 'https://github.com/AdityaNarayan29/leetDaily', icon: Github },
    ],
    status: 'available',
  },
  {
    name: 'Masst Events',
    subtitle: 'Event Bus',
    description: 'A reliable event bus for structured, reactive flows.',
    icon: Zap,
    gradient: 'from-yellow-500 to-amber-500',
    glowColor: 'rgba(234, 179, 8, 0.5)',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/AdityaNarayan29/event-planner-monorepo',
        icon: Github,
      },
      { label: 'Website', url: 'https://mast-events.framer.website/', icon: Globe },
    ],
    status: 'available',
  },
  {
    name: 'Masst UI',
    subtitle: 'Component Library',
    description: 'Lightweight component library, built for speed and clarity.',
    icon: Layers,
    gradient: 'from-violet-500 to-purple-500',
    glowColor: 'rgba(139, 92, 246, 0.5)',
    links: [
      { label: 'Docs', url: '#', icon: FileText },
      { label: 'GitHub', url: '#', icon: Github },
    ],
    status: 'available',
  },
  {
    name: 'Masst CLI',
    subtitle: 'Developer Tool',
    description: 'CLI for scaffolding and automation, plug-and-play simplicity.',
    icon: Terminal,
    gradient: 'from-emerald-500 to-green-500',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    links: [{ label: 'GitHub', url: '#', icon: Github }],
    status: 'available',
  },
  {
    name: 'Glass UI',
    subtitle: 'Design System',
    description: "Next-gen glassmorphism UI system inspired by Apple's design system.",
    icon: Eye,
    gradient: 'from-pink-500 to-rose-500',
    glowColor: 'rgba(236, 72, 153, 0.5)',
    links: [],
    status: 'coming-soon',
  },
];

export default function FeaturedTools() {
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
      const cards = cardsRef.current?.querySelectorAll('.tool-card');
      if (cards) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 100,
            scale: 0.9,
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1,
            stagger: 0.15,
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
  const handleCardHover = (index: number, isEntering: boolean) => {
    const card = cardsRef.current?.querySelectorAll('.tool-card')[index];
    if (!card) return;

    const icon = card.querySelector('.tool-icon');
    const glow = card.querySelector('.card-glow');

    if (isEntering) {
      gsap.to(card, {
        y: -8,
        duration: 0.4,
        ease: 'power2.out',
      });
      if (icon) {
        gsap.to(icon, {
          scale: 1.1,
          rotate: 5,
          duration: 0.4,
          ease: 'back.out(2)',
        });
      }
      if (glow) {
        gsap.to(glow, {
          opacity: 0.4,
          scale: 1.1,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    } else {
      gsap.to(card, {
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
      if (icon) {
        gsap.to(icon, {
          scale: 1,
          rotate: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
      }
      if (glow) {
        gsap.to(glow, {
          opacity: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    }
  };

  // Link hover animation
  const handleLinkHover = (e: React.MouseEvent, isEntering: boolean) => {
    const link = e.currentTarget;
    const arrow = link.querySelector('.link-arrow');

    if (isEntering) {
      gsap.to(link, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(arrow, {
        x: 3,
        y: -3,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(link, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(arrow, {
        x: 0,
        y: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section ref={sectionRef} id="tools" className="relative py-32 overflow-hidden">
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
          background: 'radial-gradient(circle, rgba(217, 70, 239, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 rounded-full bg-violet-500/10 border border-violet-500/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-violet-400 animate-breathe" />
            <span className="text-sm font-medium bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Our Ecosystem
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-foreground">Crafted with</span>
            <br />
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent gradient-text-animated">
              obsessive purpose
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Each tool in the Masst ecosystem is built with obsessive attention to detail, developer
            experience, and performance.
          </p>
        </div>

        {/* Tools grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <div
                key={tool.name}
                className="tool-card group relative will-animate"
                onMouseEnter={() => handleCardHover(index, true)}
                onMouseLeave={() => handleCardHover(index, false)}
              >
                {/* Card glow effect */}
                <div
                  className="card-glow absolute -inset-1 rounded-3xl opacity-0 will-animate"
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${tool.glowColor}, transparent 40%)`,
                    filter: 'blur(20px)',
                  }}
                />

                {/* Gradient border on hover */}
                <div
                  className={`absolute -inset-[1px] bg-gradient-to-r ${tool.gradient} rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                />

                {/* Card */}
                <div className="relative h-full bg-background/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 transition-all duration-500 group-hover:border-white/20 group-hover:bg-background/80">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      {/* Icon with gradient background */}
                      <div
                        className={`tool-icon relative p-3.5 rounded-2xl bg-gradient-to-br ${tool.gradient} shadow-lg`}
                        style={{
                          boxShadow: `0 10px 40px -10px ${tool.glowColor}`,
                        }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{tool.name}</h3>
                        <p className="text-xs text-muted-foreground">{tool.subtitle}</p>
                      </div>
                    </div>

                    {tool.status === 'coming-soon' && (
                      <span className="px-3 py-1.5 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 text-violet-400 rounded-full text-xs font-medium animate-border-glow">
                        Soon
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                    {tool.description}
                  </p>

                  {/* Links */}
                  <div className="flex gap-2 flex-wrap">
                    {tool.links.map((link) => {
                      const LinkIcon = link.icon;
                      return (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={(e) => handleLinkHover(e, true)}
                          onMouseLeave={(e) => handleLinkHover(e, false)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground transition-all duration-300"
                        >
                          <LinkIcon className="w-3.5 h-3.5" />
                          {link.label}
                          <ArrowUpRight className="link-arrow w-3 h-3 opacity-0 -translate-x-1" />
                        </a>
                      );
                    })}
                  </div>

                  {/* Decorative gradient corner */}
                  <div
                    className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${tool.gradient} opacity-[0.03] rounded-tr-3xl rounded-bl-[100px] group-hover:opacity-[0.08] transition-opacity duration-500`}
                  />

                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
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
