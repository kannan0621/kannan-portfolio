import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Cpu, Sparkles } from 'lucide-react';

export const Skills = () => {
  const { data } = usePortfolio();
  const skills = data?.skills || [];
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef(null);

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section ref={sectionRef} id="skills" className="py-20 bg-white dark:bg-accent-darkBg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Proficiency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Core <span className="text-gradient">Competencies & Skills</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Detailed breakdown of full-stack engineering technologies, frameworks, and methodologies.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-teal-500 to-indigo-600 text-white shadow-lg shadow-teal-500/20 scale-105'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700/80 shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
                    {skill.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-teal-500 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {skill.category}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-teal-600 dark:text-teal-400 font-mono">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar (Animates width after section displays on screen) */}
              <div className="w-full h-2.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-teal-500 via-cyan-400 to-indigo-600 transition-all duration-1000 ease-out shadow-sm shadow-teal-500/50"
                  style={{ width: isLoaded ? `${skill.level}%` : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Extra Competencies Chips */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-teal-900/10 via-indigo-900/10 to-purple-900/10 border border-teal-500/20 text-center space-y-3">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-500" />
            <span>Additional Expertise & Practices</span>
          </h4>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            {[
              "Protected Routing", "JSON Web Tokens (JWT)", "Role-Based Access Control (RBAC)",
              "Axios Interceptors", "Mongoose ORM Schemas", "Git Branching & PR Workflow",
              "Responsive UI Development", "Context API & Custom Hooks", "Code Splitting & Lazy Loading",
              "REST API Endpoint Authorization", "Agile Development Workflow", "Database Indexing & Normalization"
            ].map((chip, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-2xs font-medium"
              >
                ✓ {chip}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
