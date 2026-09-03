import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';

export const Experience = () => {
  const { data } = usePortfolio();
  const experiences = data?.experience || [];
  const timelineRef = useRef(null);
  const [timelineProgress, setTimelineProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Fill timeline as user scrolls through the experience section
      const totalHeight = rect.height;
      const startPoint = windowHeight * 0.7; // Start progress when top of timeline enters bottom 70% of screen
      const currentScroll = startPoint - rect.top;

      const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      setTimelineProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="experience" className="py-20 bg-gray-50/50 dark:bg-gray-900/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Professional <span className="text-gradient">Work Experience</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Proven record building full-stack web applications and production-ready React.js UIs.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative ml-4 sm:ml-8 space-y-12">
          
          {/* Base Background Track Line */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-800 rounded-full" />

          {/* Active Vertical Scroll Progress Bar Fill Line */}
          <div
            className="absolute left-0 top-0 w-1 bg-gradient-to-b from-teal-400 via-cyan-400 to-indigo-500 rounded-full transition-all duration-150 shadow-md shadow-teal-500/50"
            style={{ height: `${timelineProgress}%` }}
          />

          {experiences.map((exp, idx) => (
            <div key={exp.id || idx} className="relative pl-6 sm:pl-10 group">
              
              {/* Timeline Dot with Glow Pulse */}
              <div
                className={`absolute -left-[6px] top-2.5 w-4 h-4 rounded-full border-4 border-white dark:border-accent-darkBg transition-all duration-300 ${
                  timelineProgress > (idx / experiences.length) * 100
                    ? 'bg-teal-500 scale-125 shadow-lg shadow-teal-500/60'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
              />

              {/* Card Container */}
              <div className="glass-card p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300">
                
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <span>{exp.role}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 font-medium">
                        {exp.type || 'Full-Time'}
                      </span>
                    </h3>
                    <h4 className="text-base font-semibold text-teal-600 dark:text-teal-400 mt-1">
                      {exp.company}
                    </h4>
                  </div>

                  <div className="space-y-1 text-right text-xs font-medium text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1.5 justify-end text-gray-700 dark:text-gray-300 font-bold">
                      <Calendar className="w-3.5 h-3.5 text-teal-500" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-end">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Key Points Bullet List */}
                <div className="space-y-3 mb-6">
                  {exp.points && exp.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <ChevronRight className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                      <p className="leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-gray-800">
                  {exp.skills && exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
