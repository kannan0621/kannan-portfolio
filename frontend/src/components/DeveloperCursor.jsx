import React, { useEffect, useState, useRef } from 'react';

const SECTION_CONFIGS = {
  hero: { label: '</>', color: 'border-teal-400 text-teal-400 bg-teal-500/10 shadow-teal-500/30' },
  about: { label: 'BIO', color: 'border-cyan-400 text-cyan-400 bg-cyan-500/10 shadow-cyan-500/30' },
  skills: { label: '{ }', color: 'border-purple-400 text-purple-400 bg-purple-500/10 shadow-purple-500/30' },
  experience: { label: 'DEV', color: 'border-indigo-400 text-indigo-400 bg-indigo-500/10 shadow-indigo-500/30' },
  projects: { label: 'DEMO', color: 'border-emerald-400 text-emerald-400 bg-emerald-500/10 shadow-emerald-500/30' },
  education: { label: 'GRAD', color: 'border-amber-400 text-amber-400 bg-amber-500/10 shadow-amber-500/30' },
  ats: { label: 'CV', color: 'border-blue-400 text-blue-400 bg-blue-500/10 shadow-blue-500/30' },
  contact: { label: 'PING', color: 'border-rose-400 text-rose-400 bg-rose-500/10 shadow-rose-500/30' },
  default: { label: 'DEV', color: 'border-teal-400 text-teal-400 bg-teal-500/10 shadow-teal-500/30' }
};

export const DeveloperCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [activeSection, setActiveSection] = useState('hero');
  const [hoverType, setHoverType] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const requestRef = useRef();

  const mouseRef = useRef({ x: -100, y: -100 });
  const trailingRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Disable custom cursor on touch devices for mobile accessibility & performance
    const isTouchDevice = matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isClickable = target.closest('button, a, input, textarea, select, [role="button"], .clickable, .cursor-pointer');
      const isCard = target.closest('.glass-card, article, .interactive-card');
      const isInput = target.closest('input, textarea');

      if (isClickable) {
        setHoverType('clickable');
      } else if (isInput) {
        setHoverType('text');
      } else if (isCard) {
        setHoverType('card');
      } else {
        setHoverType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  // Smooth lerp loop for outer trailing ring
  useEffect(() => {
    let active = true;
    const animate = () => {
      if (!active) return;
      trailingRef.current.x += (mouseRef.current.x - trailingRef.current.x) * 0.2;
      trailingRef.current.y += (mouseRef.current.y - trailingRef.current.y) * 0.2;
      setTrailingPos({ x: trailingRef.current.x, y: trailingRef.current.y });
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      active = false;
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Section Observer
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.15) {
            const id = entry.target.getAttribute('id');
            if (id) {
              if (id.includes('hero') || id.includes('home')) setActiveSection('hero');
              else if (id.includes('about')) setActiveSection('about');
              else if (id.includes('skill')) setActiveSection('skills');
              else if (id.includes('exp')) setActiveSection('experience');
              else if (id.includes('proj')) setActiveSection('projects');
              else if (id.includes('edu')) setActiveSection('education');
              else if (id.includes('ats') || id.includes('resume')) setActiveSection('ats');
              else if (id.includes('contact')) setActiveSection('contact');
            }
          }
        });
      },
      { threshold: [0.15, 0.4] }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  if (!isVisible) return null;

  const sectionConfig = SECTION_CONFIGS[activeSection] || SECTION_CONFIGS.default;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden no-print">
      {/* Dynamic Developer Code Pointer Tip */}
      <div
        className="fixed top-0 left-0 z-50 flex items-center gap-1 transition-transform duration-75 ease-out select-none"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
        }}
      >
        {/* Pointer Core Dot & Developer Crosshair */}
        <div className="relative flex items-center justify-center -translate-x-2 -translate-y-2">
          {/* Laser Sight Ring */}
          <div className={`rounded-full border border-teal-400/80 animate-ping absolute ${
            hoverType === 'clickable' ? 'w-6 h-6 border-emerald-400' : 'w-4 h-4'
          }`} />

          {/* Developer Symbol Cursor Icon */}
          <div className={`px-1.5 py-0.5 rounded font-mono text-[10px] font-black flex items-center justify-center shadow-lg transition-all ${
            hoverType === 'clickable'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white scale-110 shadow-emerald-500/50 ring-2 ring-white'
              : hoverType === 'text'
              ? 'bg-cyan-500 text-white shadow-cyan-500/50'
              : 'bg-gray-900 dark:bg-black text-teal-400 border border-teal-500/60 shadow-teal-500/40'
          }`}>
            {hoverType === 'clickable' ? '>_ RUN' : hoverType === 'text' ? '| CMD' : hoverType === 'card' ? '[ ]' : '</>'}
          </div>
        </div>
      </div>

      {/* Trailing Outer Ring with Dynamic Developer Section Badge */}
      <div
        className={`fixed top-0 left-0 rounded-full border flex items-center justify-center transition-all duration-300 ease-out backdrop-blur-[1px] ${
          sectionConfig.color
        } ${
          hoverType === 'clickable'
            ? 'w-14 h-14 -translate-x-7 -translate-y-7 scale-125 border-2 bg-emerald-500/20 shadow-xl shadow-emerald-500/30'
            : hoverType === 'card'
            ? 'w-16 h-16 -translate-x-8 -translate-y-8 border-dashed border-2 animate-spin-slow'
            : 'w-10 h-10 -translate-x-5 -translate-y-5 shadow-lg'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`
        }}
      >
        {/* Developer Badge Text */}
        <span className="font-mono text-[9px] font-extrabold tracking-wider uppercase select-none opacity-90 transition-all">
          {hoverType === 'clickable' ? 'CLICK' : sectionConfig.label}
        </span>
      </div>
    </div>
  );
};
