import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { User, Target, BookOpen, Award, CheckCircle2, Layers, Lock, Cpu, Rocket } from 'lucide-react';

export const About = () => {
  const { data } = usePortfolio();
  const about = data?.about || {};

  const pillars = [
    {
      icon: <Layers className="w-6 h-6 text-teal-500" />,
      title: "MERN Stack Expertise",
      description: "Proficient in MongoDB, Express.js, React.js, and Node.js for end-to-end web applications."
    },
    {
      icon: <Lock className="w-6 h-6 text-indigo-500" />,
      title: "Security & Access Control",
      description: "Hands-on experience implementing JWT token authentication & Role-Based Access Control (RBAC)."
    },
    {
      icon: <Cpu className="w-6 h-6 text-cyan-500" />,
      title: "RESTful API Engineering",
      description: "Designing modular, clean, and well-documented REST APIs with Mongoose schema ORM."
    },
    {
      icon: <Rocket className="w-6 h-6 text-purple-500" />,
      title: "Performance & Responsive UI",
      description: "Building light/dark mode, mobile-first layouts with React Hooks, Tailwind CSS, and state optimization."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50/50 dark:bg-gray-900/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 text-xs font-semibold">
            <User className="w-3.5 h-3.5" />
            <span>Professional Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            About <span className="text-gradient">R. KANNAN</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Full-stack MERN Developer delivering high-performance, secure, and recruiter-focused web solutions.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Bio Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 space-y-6">
              
              <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-4">
                <div className="p-3 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Who I Am</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">MERN Stack Developer & Front-End Specialist</p>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                {about.summary || 'Motivated MERN Stack Developer with hands-on experience designing and building scalable, full-stack web applications using MongoDB, Express.js, React.js, and Node.js.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                <div className="p-4 rounded-xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200/60 dark:border-teal-800/40 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-teal-700 dark:text-teal-300 text-sm">
                    <BookOpen className="w-4 h-4 text-teal-500" />
                    <span>What I'm Learning</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-normal">
                    {about.learningGoals || 'Continuously expanding expertise in Next.js 14, WebSockets, cloud deployments (Vercel/AWS), and microservices.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/40 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-indigo-700 dark:text-indigo-300 text-sm">
                    <Target className="w-4 h-4 text-indigo-500" />
                    <span>Career Goals</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-normal">
                    {about.careerGoals || 'Aiming to contribute to impactful tech teams by building resilient, user-centric, and high-performance digital products.'}
                  </p>
                </div>

              </div>

              {/* Highlights Bullet List */}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-800 space-y-2 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5 text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                  <span>Integrated REST APIs with Axios/Fetch API and secure Bearer token handling.</span>
                </div>
                <div className="flex items-start gap-2.5 text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                  <span>Implemented Role-Based Access Control (RBAC) across Admin, Instructor & Student roles.</span>
                </div>
                <div className="flex items-start gap-2.5 text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                  <span>Optimized front-end rendering performance using code-splitting, lazy loading, and Redux state management.</span>
                </div>
              </div>

            </div>
          </div>

          {/* Core Pillars Column */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700/60 shrink-0">
                  {pillar.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">{pillar.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
