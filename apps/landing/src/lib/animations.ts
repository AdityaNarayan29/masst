'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Premium easing curves for smooth, Apple-like animations
export const easings = {
  // Smooth deceleration - great for reveals
  smooth: 'power2.out',
  // Elegant ease for hero elements
  elegant: 'power3.out',
  // Bouncy feel for buttons and interactive elements
  bounce: 'back.out(1.2)',
  // Ultra smooth for premium feel
  premium: 'expo.out',
  // Cinematic slow reveal
  cinematic: 'power4.out',
  // Elastic for playful elements
  elastic: 'elastic.out(1, 0.5)',
  // Linear for continuous animations
  linear: 'none',
  // Smooth in-out for looping animations
  smoothInOut: 'power2.inOut',
};

// Animation presets for consistent, premium feel
export const animations = {
  // Fade in from below - signature reveal animation
  fadeInUp: {
    from: { opacity: 0, y: 60, filter: 'blur(10px)' },
    to: { opacity: 1, y: 0, filter: 'blur(0px)' },
    duration: 1,
    ease: easings.premium,
  },

  // Fade in from above
  fadeInDown: {
    from: { opacity: 0, y: -40 },
    to: { opacity: 1, y: 0 },
    duration: 0.8,
    ease: easings.smooth,
  },

  // Fade in from left
  fadeInLeft: {
    from: { opacity: 0, x: -60, filter: 'blur(8px)' },
    to: { opacity: 1, x: 0, filter: 'blur(0px)' },
    duration: 1,
    ease: easings.premium,
  },

  // Fade in from right
  fadeInRight: {
    from: { opacity: 0, x: 60, filter: 'blur(8px)' },
    to: { opacity: 1, x: 0, filter: 'blur(0px)' },
    duration: 1,
    ease: easings.premium,
  },

  // Scale in - for icons and badges
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    duration: 0.6,
    ease: easings.bounce,
  },

  // Reveal with blur - premium text reveal
  blurReveal: {
    from: { opacity: 0, filter: 'blur(20px)', y: 30 },
    to: { opacity: 1, filter: 'blur(0px)', y: 0 },
    duration: 1.2,
    ease: easings.cinematic,
  },

  // Stagger reveal for lists/grids
  staggerReveal: {
    from: { opacity: 0, y: 40, scale: 0.95 },
    to: { opacity: 1, y: 0, scale: 1 },
    duration: 0.8,
    ease: easings.premium,
    stagger: 0.1,
  },

  // Magnetic hover effect values
  magneticHover: {
    strength: 0.3,
    duration: 0.4,
    ease: easings.smooth,
  },

  // Parallax effect
  parallax: {
    speed: 0.5,
    ease: easings.linear,
  },

  // Text split animation
  textReveal: {
    from: { opacity: 0, y: '100%', rotateX: -90 },
    to: { opacity: 1, y: '0%', rotateX: 0 },
    duration: 0.8,
    ease: easings.premium,
    stagger: 0.02,
  },

  // Counter animation
  counter: {
    duration: 2,
    ease: easings.premium,
  },

  // Floating animation
  float: {
    y: -15,
    duration: 3,
    ease: easings.smoothInOut,
    repeat: -1,
    yoyo: true,
  },

  // Glow pulse
  glowPulse: {
    opacity: [0.3, 0.6, 0.3],
    scale: [1, 1.05, 1],
    duration: 3,
    ease: easings.smoothInOut,
    repeat: -1,
  },

  // Gradient shift
  gradientShift: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    duration: 8,
    ease: easings.linear,
    repeat: -1,
  },
};

// Utility function to create scroll-triggered animations
export const createScrollAnimation = (
  element: string | Element | Element[] | null,
  animation: typeof animations.fadeInUp,
  triggerOptions?: ScrollTrigger.Vars
) => {
  if (!element) return null;

  return gsap.fromTo(element, animation.from, {
    ...animation.to,
    duration: animation.duration,
    ease: animation.ease,
    scrollTrigger: {
      trigger: element as Element,
      start: 'top 85%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      ...triggerOptions,
    },
  });
};

// Utility function for staggered scroll animations
export const createStaggeredScrollAnimation = (
  elements: string | Element | Element[] | null,
  animation: typeof animations.staggerReveal,
  triggerElement?: Element,
  triggerOptions?: ScrollTrigger.Vars
) => {
  if (!elements) return null;

  return gsap.fromTo(elements, animation.from, {
    ...animation.to,
    duration: animation.duration,
    ease: animation.ease,
    stagger: animation.stagger,
    scrollTrigger: {
      trigger: triggerElement || (elements as Element),
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      ...triggerOptions,
    },
  });
};

// Magnetic button effect
export const createMagneticEffect = (element: Element, strength = 0.3) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.4,
      ease: easings.smooth,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: easings.bounce,
    });
  };

  element.addEventListener('mousemove', handleMouseMove as EventListener);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove as EventListener);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Smooth cursor follower
export const createCursorFollower = () => {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  const handleMouseMove = (e: MouseEvent) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.5,
      ease: easings.smooth,
    });
  };

  document.addEventListener('mousemove', handleMouseMove);

  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    cursor.remove();
  };
};

// Parallax on mouse move
export const createMouseParallax = (element: Element, intensity = 0.05) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * intensity;
    const deltaY = (e.clientY - centerY) * intensity;

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 1,
      ease: easings.smooth,
    });
  };

  window.addEventListener('mousemove', handleMouseMove);

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
};

// Split text into spans for character animation
export const splitTextToChars = (element: Element) => {
  const text = element.textContent || '';
  element.innerHTML = text
    .split('')
    .map(
      (char) =>
        `<span class="char" style="display: inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
    )
    .join('');
  return element.querySelectorAll('.char');
};

// Split text into words for word animation
export const splitTextToWords = (element: Element) => {
  const text = element.textContent || '';
  element.innerHTML = text
    .split(' ')
    .map((word) => `<span class="word" style="display: inline-block">${word}&nbsp;</span>`)
    .join('');
  return element.querySelectorAll('.word');
};

// Create smooth number counter
export const animateCounter = (
  element: Element,
  endValue: number,
  duration = 2,
  prefix = '',
  suffix = ''
) => {
  const obj = { value: 0 };
  gsap.to(obj, {
    value: endValue,
    duration,
    ease: easings.premium,
    onUpdate: () => {
      element.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
    },
  });
};

// Create line drawing animation for SVG paths
export const animateSVGPath = (path: SVGPathElement, duration = 2) => {
  const length = path.getTotalLength();
  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });

  return gsap.to(path, {
    strokeDashoffset: 0,
    duration,
    ease: easings.premium,
  });
};

// Smooth scroll to element
export const smoothScrollTo = (target: string | Element, duration = 1.2) => {
  gsap.to(window, {
    scrollTo: target,
    duration,
    ease: easings.premium,
  });
};

// Create a timeline for complex sequences
export const createTimeline = (options?: gsap.TimelineVars) => {
  return gsap.timeline(options);
};

// Batch animation for performance
export const batchAnimate = (
  selector: string,
  animation: Partial<typeof animations.fadeInUp>,
  batchOptions?: ScrollTrigger.BatchVars
) => {
  ScrollTrigger.batch(selector, {
    onEnter: (elements) => {
      gsap.fromTo(elements, animation.from || {}, {
        ...(animation.to || {}),
        duration: animation.duration || 0.8,
        ease: animation.ease || easings.premium,
        stagger: 0.1,
      });
    },
    onLeave: (elements) => {
      gsap.to(elements, { opacity: 0, duration: 0.3 });
    },
    onEnterBack: (elements) => {
      gsap.to(elements, { ...(animation.to || {}), duration: 0.5 });
    },
    onLeaveBack: (elements) => {
      gsap.to(elements, { opacity: 0, duration: 0.3 });
    },
    ...batchOptions,
  });
};

export { gsap, ScrollTrigger };
