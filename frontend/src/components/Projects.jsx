import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Folder, ExternalLink, Github, Layers, Star, CheckCircle, X, Sparkles } from 'lucide-react';

export const Projects = () => {
  const { data } = usePortfolio();
  const projects = data?.projects || [];
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = ['All', 'Full Stack', 'Backend'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section id="projects" className="py-20 bg-white dark:bg-accent-darkBg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 text-xs font-semibold">
            <Folder className="w-3.5 h-3.5" />
            <span>Featured Portfolio Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Personal & Production <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Architected full-stack MERN platforms, RESTful API backends, and responsive React applications.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-2 mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-teal-500 to-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id || idx}
              className="rounded-2xl bg-gray-50 dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="p-6 space-y-4">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                    {project.badge || project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-teal-500 transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-teal-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
                    {project.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Highlights Summary */}
                <div className="space-y-1.5 pt-2">
                  {project.highlights && project.highlights.slice(0, 2).map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-[11px] text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-500 mt-0.5 shrink-0" />
                      <span className="line-clamp-2">{h}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Card Footer Tech Stack */}
              <div className="px-6 py-4 bg-gray-100/70 dark:bg-gray-900/60 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech && project.tech.slice(0, 4).map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech && project.tech.length > 4 && (
                    <span className="text-[10px] text-gray-500 self-center">+More</span>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline shrink-0 ml-2"
                >
                  Details
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Modal for Project Details */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-200 dark:border-gray-800 relative max-h-[90vh] overflow-y-auto">
              
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {selectedProject.subtitle}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Project Overview</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Key Features & Architecture</h4>
                <div className="space-y-2">
                  {selectedProject.highlights && selectedProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech && selectedProject.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg text-xs font-mono bg-gray-100 dark:bg-gray-800 text-teal-600 dark:text-teal-400 border border-gray-200 dark:border-gray-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-end gap-3">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-bold hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <Github className="w-4 h-4" /> Code Repo
                </a>
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-teal-500 text-white text-xs font-bold hover:bg-teal-600 shadow-md"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
