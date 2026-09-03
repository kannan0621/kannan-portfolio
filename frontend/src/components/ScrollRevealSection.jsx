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
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.25, // Triggers single section animation cleanly when 25%+ in view
        rootMargin: '0px'
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
          ? 'opacity-100 translate-x-0 scale-100 blur-0' 
          : 'opacity-0 -translate-x-16 scale-95 blur-sm';
      case 'fade-right':
        return isVisible 
          ? 'opacity-100 translate-x-0 scale-100 blur-0' 
          : 'opacity-0 translate-x-16 scale-95 blur-sm';
      case 'scale-up':
        return isVisible 
          ? 'opacity-100 scale-100 blur-0' 
          : 'opacity-0 scale-90 blur-sm';
      case 'fade-up':
      default:
        return isVisible 
          ? 'opacity-100 translate-y-0 scale-100 blur-0' 
          : 'opacity-0 translate-y-16 scale-95 blur-sm';
    }
  };

  return (
    <div
      ref={sectionRef}
      id={id}
      style={{ transitionDelay: `${delay}ms` }}
      className={`snap-start snap-always min-h-screen flex flex-col justify-center items-center py-12 transition-all duration-700 ease-out will-change-transform ${getVariantStyles()} ${className}`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        {children}
      </div>
    </div>
  );
};
