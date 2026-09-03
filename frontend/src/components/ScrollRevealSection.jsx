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
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once revealed, keep it visible or let it stay revealed
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
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
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 -translate-x-12';
      case 'fade-right':
        return isVisible 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 translate-x-12';
      case 'scale-up':
        return isVisible 
          ? 'opacity-100 scale-100' 
          : 'opacity-0 scale-90';
      case 'fade-up':
      default:
        return isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-14';
    }
  };

  return (
    <div
      ref={sectionRef}
      id={id}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${getVariantStyles()} ${className}`}
    >
      {children}
    </div>
  );
};
