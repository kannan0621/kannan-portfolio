import React, { useState, useEffect, useRef } from 'react';

export const DeveloperCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [activeSectionTag, setActiveSectionTag] = useState('</>');

  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const targetPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  useEffect(() => {
    // Enable custom cursor only on desktop devices with fine pointer support
    const isDesktop = matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isDesktop) return;

    setIsVisible(true);

    const handleMouseMove = (e) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Section awareness & interactive element detection
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer');
      setIsHovered(!!isInteractive);

      // Section tag awareness
      const section = target.closest('section');
      if (section) {
        const id = section.id || section.getAttribute('id');
        if (id?.includes('about')) setActiveSectionTag('{ BIO }');
        else if (id?.includes('skill')) setActiveSectionTag('const { Skill }');
        else if (id?.includes('exp')) setActiveSectionTag('git log');
        else if (id?.includes('project')) setActiveSectionTag('npm start');
        else if (id?.includes('edu')) setActiveSectionTag('[ GRAD ]');
        else if (id?.includes('ats') || id?.includes('resume')) setActiveSectionTag('<PDF />');
        else if (id?.includes('contact')) setActiveSectionTag('ping -t');
        else setActiveSectionTag('</>');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    // Smooth LERP render loop for 120fps hardware acceleration
    const render = () => {
      pos.current.x += (targetPos.current.x - pos.current.x) * 0.35;
      pos.current.y += (targetPos.current.y - pos.current.y) * 0.35;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${targetPos.current.x}px, ${targetPos.current.y}px, 0)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden no-print">
      {/* Primary Developer Pointer Badge & Crosshair Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform flex items-center gap-1.5"
      >
        {/* Core Laser Pointer Dot */}
        <div
          className={`rounded-full transition-all duration-150 ${
            isClicking
              ? 'w-4 h-4 bg-purple-400 shadow-lg shadow-purple-500/80 scale-125'
              : isHovered
              ? 'w-3 h-3 bg-emerald-400 shadow-lg shadow-emerald-500/80'
              : 'w-2.5 h-2.5 bg-teal-400 shadow-md shadow-teal-500/60'
          }`}
        />

        {/* Dynamic Section-Aware Developer Code Badge */}
        <div
          className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-extrabold tracking-wider border shadow-xl backdrop-blur-md transition-all duration-200 ${
            isHovered
              ? 'bg-emerald-950/90 text-emerald-300 border-emerald-400/60 scale-110'
              : 'bg-gray-950/90 text-teal-300 border-teal-500/40'
          }`}
        >
          {isHovered ? 'EXECUTE()' : activeSectionTag}
        </div>
      </div>

      {/* Trailing Laser Ring Target Sight */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed transition-all duration-200 will-change-transform ${
          isClicking
            ? 'w-10 h-10 border-purple-400 bg-purple-500/10 scale-90'
            : isHovered
            ? 'w-12 h-12 border-emerald-400/80 bg-emerald-500/10 animate-spin-slow scale-110'
            : 'w-8 h-8 border-teal-500/50 bg-teal-500/5'
        }`}
      />
    </div>
  );
};
