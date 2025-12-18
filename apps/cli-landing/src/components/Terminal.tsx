'use client';

import { useEffect, useRef, useState } from 'react';

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
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;

    const allLines: {
      type: 'input' | 'output';
      content: string;
      delay: number;
      color?: string;
    }[] = [];

    commands.forEach((cmd, cmdIndex) => {
      allLines.push({
        type: 'input',
        content: cmd.input,
        delay: cmdIndex === 0 ? 500 : 1500,
      });
      cmd.output.forEach((line, lineIndex) => {
        const color = getOutputColor(line);
        allLines.push({
          type: 'output',
          content: line,
          delay: lineIndex === 0 ? 300 : 50,
          color,
        });
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
      {/* Outer glow - always visible */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-60"
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(16, 185, 129, 0.2) 100%)',
        }}
      />

      {/* Terminal window */}
      <div className="relative rounded-2xl overflow-hidden bg-[#080c10] shadow-[0_20px_70px_-10px_rgba(0,0,0,0.8)]">
        {/* Subtle inner border */}
        <div className="absolute inset-0 rounded-2xl border border-white/[0.05] pointer-events-none" />

        {/* Title bar */}
        <div className="relative flex items-center gap-3 px-5 py-4 bg-gradient-to-b from-[#0f1419] to-[#0a0f14] border-b border-white/[0.03]">
          {/* Traffic lights */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.4)]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.4)]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.4)]" />
          </div>

          {/* Title */}
          <div className="flex-1 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.03]">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-white/40 font-mono tracking-wide">masst-cli — zsh</span>
            </div>
          </div>

          <div className="w-[52px]" />
        </div>

        {/* Terminal content */}
        <div
          ref={terminalRef}
          className="relative px-6 py-5 font-mono text-[13px] h-[440px] overflow-y-auto terminal-scrollbar leading-[1.7]"
          style={{
            background: 'linear-gradient(180deg, #080c10 0%, #0a0e13 100%)',
          }}
        >
          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
            }}
          />

          {visibleLines.map((line, index) => (
            <div key={index} className="relative">
              {line.type === 'input' ? (
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-semibold">$</span>
                  <span className="text-white/90">{line.content}</span>
                  {index === visibleLines.length - 1 && isTyping && (
                    <span className="w-[10px] h-[18px] bg-emerald-400 animate-[blink_1s_step-end_infinite] rounded-[1px]" />
                  )}
                </div>
              ) : (
                <div className={`pl-6 ${line.color || 'text-white/60'}`}>{line.content}</div>
              )}
            </div>
          ))}
          {!isTyping && visibleLines.length > 0 && (
            <div className="flex items-center gap-2.5 mt-1">
              <span className="text-emerald-400 font-semibold">$</span>
              <span className="w-[10px] h-[18px] bg-emerald-400 animate-[blink_1s_step-end_infinite] rounded-[1px]" />
            </div>
          )}
        </div>

        {/* Bottom reflection */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-emerald-500/[0.02] to-transparent pointer-events-none" />
      </div>

      {/* Hover glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-cyan-500/10 to-emerald-500/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
    </div>
  );
}

function getOutputColor(line: string): string {
  if (line.includes('✓')) return 'text-emerald-400';
  if (line.includes('→')) return 'text-white/70';
  if (line.includes('http://') || line.includes('https://')) return 'text-cyan-400';
  if (line.includes('Demo:') || line.includes('demo@')) return 'text-amber-400';
  if (line.includes('Ready')) return 'text-emerald-400';
  if (line.includes('MASST') || line.includes('███')) return 'text-emerald-400';
  if (line.includes('Ship your')) return 'text-white/40';
  return 'text-white/60';
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
      '  Creating my-saas-app...',
      '',
      '  ✓ Project structure created',
      '  ✓ Dependencies installed',
      '  ✓ Git repository initialized',
      '  ✓ Environment configured',
      '',
      '  Ready! Run the following:',
      '',
      '    cd my-saas-app',
      '    mst dev',
      '',
    ],
  },
  {
    input: 'mst dev',
    output: [
      '',
      '  Starting development server...',
      '',
      '  ✓ Docker containers running',
      '  ✓ PostgreSQL ready',
      '  ✓ Redis ready',
      '  ✓ Database migrated',
      '  ✓ Seed data loaded',
      '',
      '  Ready!',
      '',
      '  → Web:   http://localhost:3000',
      '  → API:   http://localhost:4000',
      '  → Docs:  http://localhost:4000/api/docs',
      '',
      '  Demo: demo@example.com / demo123',
      '',
    ],
  },
];
