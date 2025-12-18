'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/animations';

interface TerminalProps {
  commands?: {
    input: string;
    output: string[];
    delay?: number;
  }[];
  className?: string;
  autoPlay?: boolean;
}

export default function Terminal({
  commands = defaultCommands,
  className = '',
  autoPlay = true,
}: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState<
    { type: 'input' | 'output'; content: string; color?: string }[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;

    const allLines: { type: 'input' | 'output'; content: string; delay: number; color?: string }[] =
      [];

    commands.forEach((cmd, cmdIndex) => {
      allLines.push({ type: 'input', content: cmd.input, delay: cmdIndex === 0 ? 500 : 1500 });
      cmd.output.forEach((line, lineIndex) => {
        const color = getOutputColor(line);
        allLines.push({ type: 'output', content: line, delay: lineIndex === 0 ? 300 : 50, color });
      });
    });

    let currentLine = 0;
    const typeNextLine = () => {
      if (currentLine >= allLines.length) {
        // Reset after all lines
        setTimeout(() => {
          setVisibleLines([]);
          currentLine = 0;
          typeNextLine();
        }, 4000);
        return;
      }

      const line = allLines[currentLine];

      if (line.type === 'input') {
        setIsTyping(true);
        // Type out input character by character
        let charIndex = 0;
        const typeChar = () => {
          if (charIndex <= line.content.length) {
            setVisibleLines((prev) => {
              const newLines = [...prev];
              const lastLine = newLines[newLines.length - 1];
              if (
                lastLine?.type === 'input' &&
                !lastLine.content.includes(line.content.slice(0, charIndex))
              ) {
                newLines[newLines.length - 1] = {
                  type: 'input',
                  content: line.content.slice(0, charIndex),
                };
              } else if (charIndex === 0) {
                newLines.push({ type: 'input', content: '' });
              } else {
                newLines[newLines.length - 1] = {
                  type: 'input',
                  content: line.content.slice(0, charIndex),
                };
              }
              return newLines;
            });
            charIndex++;
            setTimeout(typeChar, 30 + Math.random() * 40);
          } else {
            setIsTyping(false);
            currentLine++;
            setTimeout(typeNextLine, line.delay);
          }
        };
        setTimeout(typeChar, line.delay);
      } else {
        setVisibleLines((prev) => [
          ...prev,
          { type: 'output', content: line.content, color: line.color },
        ]);
        currentLine++;
        setTimeout(typeNextLine, line.delay);
      }
    };

    typeNextLine();

    return () => {
      // Cleanup
    };
  }, [autoPlay, commands]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <div className={`relative group ${className}`}>
      {/* Terminal window */}
      <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/50">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/10">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-white/40 font-mono">Terminal</span>
          </div>
          <div className="w-16" />
        </div>

        {/* Terminal content */}
        <div
          ref={terminalRef}
          className="p-4 font-mono text-sm h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
        >
          {visibleLines.map((line, index) => (
            <div key={index} className="leading-relaxed">
              {line.type === 'input' ? (
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">$</span>
                  <span className="text-white">{line.content}</span>
                  {index === visibleLines.length - 1 && isTyping && (
                    <span className="w-2 h-4 bg-white/80 animate-pulse" />
                  )}
                </div>
              ) : (
                <div className={`pl-4 ${line.color || 'text-white/70'}`}>{line.content}</div>
              )}
            </div>
          ))}
          {!isTyping && visibleLines.length > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-emerald-400">$</span>
              <span className="w-2 h-4 bg-white/80 animate-pulse" />
            </div>
          )}
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-violet-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
    </div>
  );
}

function getOutputColor(line: string): string {
  if (line.includes('MASST') || line.includes('$')) return 'text-violet-400';
  if (line.includes('http://') || line.includes('https://')) return 'text-cyan-400';
  if (line.includes('Demo:') || line.includes('demo@')) return 'text-amber-400';
  if (line.includes('Ready!') || line.includes('success') || line.includes('Started'))
    return 'text-emerald-400';
  if (line.includes('Create') || line.includes('Building')) return 'text-white/90';
  if (line.startsWith('  ')) return 'text-white/60';
  return 'text-white/70';
}

const defaultCommands = [
  {
    input: 'mst init my-saas-app',
    output: [
      '',
      '  ███╗   ███╗ █████╗ ███████╗███████╗████████╗',
      '  ████╗ ████║██╔══██╗██╔════╝██╔════╝╚══██╔══╝',
      '  ██╔████╔██║███████║███████╗███████╗   ██║',
      '  ██║╚██╔╝██║██╔══██║╚════██║╚════██║   ██║',
      '  ██║ ╚═╝ ██║██║  ██║███████║███████║   ██║',
      '  ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝',
      '',
      '',
      '  █         █ ',
      '  ███     ███ ',
      '  █████ █████ ',
      '  ███████ ███ ',
      '  █████████ █ ',
      '',
      '  Creating project structure...',
      '  Installing dependencies...',
      '  Initializing git repository...',
      '',
      '  Ready! Next steps:',
      '  $ cd my-saas-app',
      '  $ mst dev',
      '',
    ],
  },
  {
    input: 'mst dev',
    output: [
      '',
      '  Starting development environment...',
      '',
      '  Docker containers started',
      '  Database schema synced',
      '  Database seeded with demo data',
      '',
      '  Ready!',
      '',
      '  Web   → http://localhost:3000',
      '  API   → http://localhost:4000',
      '  Docs  → http://localhost:4000/api/docs',
      '',
      '  Demo: demo@example.com / demo123',
      '',
    ],
  },
];
