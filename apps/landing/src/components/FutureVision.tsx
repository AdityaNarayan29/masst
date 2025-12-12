'use client';

import { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowRight, Rocket, Zap, Puzzle, Mail, Check } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/animations';

const features = [
  {
    icon: Puzzle,
    title: 'Unified Workspace',
    description: 'All your dev tools in one beautiful interface',
    gradient: 'from-violet-500 to-purple-500',
    glowColor: 'rgba(139, 92, 246, 0.4)',
  },
  {
    icon: Zap,
    title: 'Smart Automation',
    description: 'AI-powered workflows that adapt to your style',
    gradient: 'from-amber-500 to-orange-500',
    glowColor: 'rgba(245, 158, 11, 0.4)',
  },
  {
    icon: Rocket,
    title: 'Seamless Integration',
    description: 'Connect with your existing development stack',
    gradient: 'from-cyan-500 to-blue-500',
    glowColor: 'rgba(6, 182, 212, 0.4)',
  },
];

export default function FutureVision() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

      // Animate feature cards with stagger
      const featureCards = featuresRef.current?.querySelectorAll('.feature-card');
      if (featureCards) {
        gsap.fromTo(
          featureCards,
          {
            opacity: 0,
            y: 80,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate CTA card
      gsap.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating orbs
      gsap.to(orb1Ref.current, {
        y: -50,
        x: 30,
        duration: 10,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(orb2Ref.current, {
        y: 40,
        x: -25,
        duration: 12,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 3,
      });

      // Parallax for orbs
      gsap.to([orb1Ref.current, orb2Ref.current], {
        y: -120,
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

  // Feature card hover animation
  const handleFeatureHover = (e: React.MouseEvent, isEntering: boolean) => {
    const card = e.currentTarget;
    const icon = card.querySelector('.feature-icon');
    const glow = card.querySelector('.feature-glow');

    if (isEntering) {
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        duration: 0.4,
        ease: 'power2.out',
      });
      gsap.to(icon, {
        scale: 1.15,
        rotate: 10,
        duration: 0.4,
        ease: 'back.out(2)',
      });
      gsap.to(glow, {
        opacity: 0.5,
        scale: 1.2,
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
      gsap.to(icon, {
        scale: 1,
        rotate: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
      gsap.to(glow, {
        opacity: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  // Input focus animation
  const handleInputFocus = (isFocused: boolean) => {
    if (inputRef.current) {
      gsap.to(inputRef.current, {
        scale: isFocused ? 1.02 : 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  // Button magnetic effect
  const handleButtonMouseMove = (e: React.MouseEvent) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(buttonRef.current, {
        x: x * 0.15,
        y: y * 0.15,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleButtonMouseLeave = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    }
  };

  // Submit animation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);

    // Animate button
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Success animation
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0.9 },
        { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' }
      );
    }

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background" />

      {/* Animated gradient orbs */}
      <div
        ref={orb1Ref}
        className="absolute top-1/4 -right-40 w-[700px] h-[700px] rounded-full will-animate gpu-accelerate"
        style={{
          background:
            'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(217, 70, 239, 0.1) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-1/4 -left-40 w-[700px] h-[700px] rounded-full will-animate gpu-accelerate"
        style={{
          background:
            'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-violet-400 animate-breathe" />
            <span className="text-sm font-medium bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              The Future
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-foreground">From tools to an</span>
            <br />
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent gradient-text-animated">
              ecosystem
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Masst is growing into a full SaaS experience for developers — think{' '}
            <span className="text-foreground font-medium">Notion × Vercel</span> for dev workflows.
          </p>
        </div>

        {/* Features */}
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="feature-card group relative will-animate"
                onMouseEnter={(e) => handleFeatureHover(e, true)}
                onMouseLeave={(e) => handleFeatureHover(e, false)}
              >
                {/* Glow effect */}
                <div
                  className="feature-glow absolute -inset-2 rounded-3xl opacity-0 will-animate"
                  style={{
                    background: `radial-gradient(400px circle at 50% 50%, ${feature.glowColor}, transparent 60%)`,
                    filter: 'blur(25px)',
                  }}
                />

                {/* Gradient border */}
                <div
                  className={`absolute -inset-[1px] bg-gradient-to-r ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-500`}
                />

                <div className="relative h-full p-8 bg-background/50 backdrop-blur-xl border border-white/10 rounded-3xl group-hover:border-white/20 transition-all duration-500 text-center">
                  {/* Icon */}
                  <div
                    className={`feature-icon inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg`}
                    style={{
                      boxShadow: `0 15px 50px -15px ${feature.glowColor}`,
                    }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="font-semibold text-xl text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative corner */}
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${feature.gradient} opacity-[0.03] rounded-tr-3xl rounded-bl-[80px] group-hover:opacity-[0.08] transition-opacity duration-500`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Card */}
        <div ref={ctaRef} className="relative group">
          {/* Animated border gradient */}
          <div className="absolute -inset-[2px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 rounded-[2rem] opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-gradient" />

          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 rounded-[3rem] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700" />

          <div className="relative bg-background/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-10 sm:p-12 overflow-hidden group-hover:border-white/20 transition-all duration-500">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-violet-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-fuchsia-500/10 to-transparent rounded-full blur-3xl" />

            <div className="relative text-center">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 mb-6 animate-breathe">
                <Mail className="w-8 h-8 text-violet-400" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Be the first to experience the future
              </h3>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Join our waitlist to get early access to the Masst SaaS platform when it launches.
              </p>

              {/* Email form */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => handleInputFocus(true)}
                    onBlur={() => handleInputFocus(false)}
                    placeholder="Enter your email"
                    disabled={isSubmitting || isSubmitted}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 text-foreground placeholder-muted-foreground transition-all duration-300 disabled:opacity-50"
                  />
                </div>
                <button
                  ref={buttonRef}
                  type="submit"
                  disabled={isSubmitting || isSubmitted || !email}
                  onMouseMove={handleButtonMouseMove}
                  onMouseLeave={handleButtonMouseLeave}
                  className="group/btn relative px-8 py-4 rounded-2xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {/* Button gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-[length:200%_100%] animate-gradient" />
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 opacity-0 group-hover/btn:opacity-100 blur-xl transition-opacity duration-500" />
                  <span className="relative flex items-center justify-center gap-2 text-white min-w-[120px]">
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : isSubmitted ? (
                      <>
                        <Check className="w-5 h-5" />
                        Joined!
                      </>
                    ) : (
                      <>
                        Join Waitlist
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </span>
                </button>
              </form>

              <p className="text-xs text-muted-foreground mt-4">
                No spam, ever. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
