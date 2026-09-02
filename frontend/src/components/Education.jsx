import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap, Award, Calendar, BookOpen, CheckCircle } from 'lucide-react';

export const Education = () => {
  const { data } = usePortfolio();
  const education = data?.education || [];
  const certifications = data?.certifications || [];

  return (
    <section id="education" className="py-20 bg-gray-50/50 dark:bg-gray-900/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic & Professional Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Education & <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Formal engineering foundation combined with specialized full-stack MERN stack certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Education Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Education History</h3>
            </div>

            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div
                  key={edu.id || idx}
                  className="glass-card p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-3 hover:border-teal-500/50 transition-colors"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">
                      {edu.degree}
                    </h4>
                    <span className="flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-md">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.period}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                    {edu.institution}
                  </p>

                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Professional Certifications</h3>
            </div>

            <div className="space-y-6">
              {certifications.map((cert, idx) => (
                <div
                  key={cert.id || idx}
                  className="glass-card p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4 hover:border-indigo-500/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-base font-bold text-gray-900 dark:text-white">
                        {cert.title}
                      </h4>
                      <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                        {cert.issuer}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-md">
                      {cert.year}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Certified Competencies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.topics && cert.topics.map((topic, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50"
                        >
                          ✓ {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
