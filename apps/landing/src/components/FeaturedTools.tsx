'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Play, Pause } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/animations';

const projects = [
  {
    id: 'leetdaily',
    name: 'LeetDaily',
    description:
      'Chrome extension for tracking your LeetCode streak with analytics and study plans.',
    video: '/leetdaily.mp4',
    url: 'https://leetdaily.masst.dev/',
    github: 'https://github.com/AdityaNarayan29/leetDaily',
    tags: ['Chrome Extension', 'React', 'Analytics'],
    featured: true,
  },
  {
    id: 'docs',
    name: 'Masst Docs',
    description: '35+ system design roadmaps powered by AI with semantic search.',
    video: '/docs.mp4',
    url: 'https://docs.masst.dev/',
    github: 'https://github.com/AdityaNarayan29/masstDocs',
    tags: ['LangChain', 'Pinecone', 'Next.js'],
    featured: true,
  },
  {
    id: 'ui',
    name: 'Masst UI',
    description: '50+ accessible React components with A11y support.',
    video: '/ui.mp4',
    url: 'https://ui.masst.dev/',
    github: 'https://github.com/AdityaNarayan29/masst',
    tags: ['React', 'Tailwind', 'A11y'],
    featured: false,
  },
  {
    id: 'cli',
    name: 'Masst CLI',
    description: 'SaaS monorepo scaffolding in 60 seconds.',
    video: '/cli.mp4',
    url: 'https://cli.masst.dev/',
    github: 'https://github.com/AdityaNarayan29/masst',
    tags: ['Node.js', 'CLI', 'Docker'],
    featured: false,
  },
  {
    id: 'db',
    name: 'Masst DB',
    description: 'Multi-database backup CLI with AWS S3 integration.',
    video: '/db.mp4',
    url: 'https://db.masst.dev/',
    github: 'https://github.com/AdityaNarayan29/masstDB',
    tags: ['Go', 'AWS', 'Backup'],
    featured: false,
  },
  {
    id: 'campus',
    name: 'Masst Campus',
    description: 'Student management system with role-based access control.',
    video: '/campus.mp4',
    github: 'https://github.com/AdityaNarayan29/masstCampus',
    tags: ['Next.js', 'PostgreSQL', 'RBAC'],
    featured: false,
  },
];

function BrowserMockup({ project }: { project: (typeof projects)[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    } else if (!isHovered && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isHovered]);

  return (
    <div
      className="group project-card relative rounded-2xl overflow-hidden transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card background with gradient border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative h-full bg-[#1a1a1a] border border-white/[0.08] rounded-2xl overflow-hidden group-hover:border-white/[0.15] transition-all duration-500">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#0d0d0d] border-b border-white/[0.06]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-white/20" />
            <div className="w-3 h-3 rounded-full bg-white/20" />
            <div className="w-3 h-3 rounded-full bg-white/20" />
          </div>
          <div className="flex-1 mx-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.05] rounded-md max-w-[200px]">
              <div className="w-3 h-3 rounded-full border border-white/20" />
              <span className="text-[11px] text-white/50 truncate">
                {project.url || 'github.com'}
              </span>
            </div>
          </div>
        </div>

        {/* Video container */}
        <div className="relative aspect-video">
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Play/Pause overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
              isPlaying ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-1" />
              )}
            </button>
          </div>

          {/* Gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#141414] to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5 bg-[#141414]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-white text-lg">{project.name}</h3>
              <p className="mt-1.5 text-white/50 leading-relaxed text-sm">{project.description}</p>
            </div>

            <a
              href={project.url || project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-200"
            >
              <ArrowUpRight className="w-4 h-4 text-white/70" />
            </a>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[11px] font-medium text-white/50 bg-white/[0.05] rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedTools() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Header animation
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

      // Cards stagger
      const cards = gridRef.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
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
      id="tools"
      className="relative py-32 bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0a0a] dark:to-black"
    >
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <span className="text-sm font-medium text-violet-500 dark:text-violet-400 tracking-wider uppercase">
            Projects
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-black dark:text-white tracking-tight">
            Featured Work
          </h2>
          <p className="mt-4 text-lg text-black/40 dark:text-white/40 max-w-xl">
            Developer tools and products built with obsessive attention to detail.
          </p>
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* All projects - uniform sizing */}
          {projects.map((project) => (
            <BrowserMockup key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
