'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';

const techStack = {
  Languages: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL'],
  Frontend: ['React', 'Next.js', 'Tailwind CSS', 'Zustand', 'React Query'],
  Backend: ['Node.js', 'NestJS', 'FastAPI', 'GraphQL', 'WebSockets'],
  Database: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'Supabase'],
  Cloud: ['AWS', 'Docker', 'Kubernetes', 'Vercel', 'GitHub Actions'],
  'AI/ML': ['LangChain', 'Pinecone', 'OpenAI', 'Vector DBs'],
};

const features = [
  {
    title: 'Production Ready',
    description:
      'Battle-tested components and tools used in real-world applications serving millions of users.',
    highlights: ['Type-safe', 'Well documented', 'Actively maintained'],
  },
  {
    title: 'Developer First',
    description:
      'Built by developers, for developers. Every tool is designed with DX as the top priority.',
    highlights: ['Intuitive APIs', 'Great defaults', 'Extensible'],
  },
  {
    title: 'Free Forever',
    description:
      'All Masst tools are free to use. No hidden costs, no premium tiers, just great tools.',
    highlights: ['Pro bono', 'No paywalls', 'Full access'],
  },
];

export default function FutureVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const techItems = techRef.current?.querySelectorAll('.tech-item');
      if (techItems) {
        gsap.fromTo(
          techItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: techRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      const expItems = expRef.current?.querySelectorAll('.exp-item');
      if (expItems) {
        gsap.fromTo(
          expItems,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: expRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-[#0a0a0a]"
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-20">
          <span className="text-sm font-medium text-violet-500 dark:text-violet-400 tracking-wider uppercase">
            About
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-black dark:text-white tracking-tight">
            Built with Modern Tech
          </h2>
          <p className="mt-4 text-lg text-black/40 dark:text-white/40 max-w-2xl">
            Every Masst product is crafted with the latest technologies and best practices for
            performance, accessibility, and developer experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Tech Stack */}
          <div ref={techRef}>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-8">Technologies</h3>
            <div className="space-y-6">
              {Object.entries(techStack).map(([category, items]) => (
                <div key={category} className="tech-item">
                  <div className="text-sm text-black/30 dark:text-white/30 mb-2.5">{category}</div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 text-[13px] text-black/60 dark:text-white/60 bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.06] rounded-lg transition-colors duration-200 cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div ref={expRef}>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-8">Why Masst?</h3>
            <div className="space-y-8">
              {features.map((feature) => (
                <div key={feature.title} className="exp-item relative pl-6">
                  {/* Timeline line */}
                  <div className="absolute left-0 top-2 bottom-0 w-px bg-gradient-to-b from-violet-500/50 to-transparent" />

                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-2 h-2 -translate-x-[3px] rounded-full bg-violet-500" />

                  <h4 className="text-lg font-medium text-black dark:text-white">
                    {feature.title}
                  </h4>

                  <p className="mt-3 text-black/50 dark:text-white/50 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {feature.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="px-2 py-1 text-[11px] text-black/40 dark:text-white/40 bg-black/[0.03] dark:bg-white/[0.03] rounded"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
