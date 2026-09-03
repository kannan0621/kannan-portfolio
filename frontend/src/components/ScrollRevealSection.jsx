import React, { useEffect, useRef, useState } from 'react';

export const ScrollRevealSection = ({ 
  children, 
  variant = 'fade-up', 
  delay = 0, 
  className = '',
  id = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Active highlight state on scroll
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getVariantStyles = () => {
    switch (variant) {
      case 'fade-left':
        return isVisible 
          ? 'opacity-100 translate-x-0 scale-100' 
          : 'opacity-30 -translate-x-8 scale-[0.98]';
      case 'fade-right':
        return isVisible 
          ? 'opacity-100 translate-x-0 scale-100' 
          : 'opacity-30 translate-x-8 scale-[0.98]';
      case 'scale-up':
        return isVisible 
          ? 'opacity-100 scale-100' 
          : 'opacity-30 scale-95';
      case 'fade-up':
      default:
        return isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-30 translate-y-10 scale-[0.98]';
    }
  };

  return (
    <div
      ref={sectionRef}
      id={id}
      style={{ transitionDelay: `${delay}ms` }}
      className={`relative rounded-3xl transition-all duration-700 ease-out will-change-transform ${
        isVisible
          ? 'border-2 border-teal-500/60 dark:border-teal-400/60 shadow-[0_0_30px_rgba(20,184,166,0.18)] bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm ring-1 ring-teal-500/20'
          : 'border border-gray-200/50 dark:border-gray-800/50 shadow-none bg-transparent'
      } ${getVariantStyles()} ${className}`}
    >
      {/* Active Section Neon Indicator Bar */}
      <div
        className={`absolute -top-1 left-1/2 -translate-x-1/2 h-1 rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 transition-all duration-500 ${
          isVisible ? 'w-24 opacity-100 shadow-md shadow-teal-500/50' : 'w-0 opacity-0'
        }`}
      />

      <div className="p-2 sm:p-4 md:p-6">
        {children}
      </div>
    </div>
  );
};
