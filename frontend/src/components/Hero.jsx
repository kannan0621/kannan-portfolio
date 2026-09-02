import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { generatePdfResume } from '../utils/pdfGenerator';
import { 
  ArrowRight, Download, Mail, MapPin, Phone, ShieldCheck, Terminal
} from 'lucide-react';

export const Hero = () => {
  const { data } = usePortfolio();
  const hero = data?.hero || {};

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const techBadges = [
    { name: "MongoDB", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
    { name: "Express.js", color: "bg-gray-500/10 text-gray-700 dark:text-gray-300 border-gray-500/20" },
    { name: "React.js", color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20" },
    { name: "Node.js", color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" },
    { name: "RESTful API", color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20" },
    { name: "JWT Auth", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
    { name: "RBAC", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" }
  ];

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status & Availability Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/60 text-teal-700 dark:text-teal-300 text-xs font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>{hero.availability || 'Available for Full-time Roles & Projects'}</span>
            </div>

            {/* Headline & Title */}
            <div>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Hi, I'm <span className="text-gradient">{hero.name || 'R. KANNAN'}</span>
              </h1>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <span>{hero.title || 'MERN Stack Developer'}</span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-mono">
                  Full Stack & Front-End
                </span>
              </h2>
            </div>

            {/* Location & Contact Bar */}
            <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-teal-500" />
                <span>{hero.location || 'Coimbatore, Tamil Nadu, India'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-teal-500" />
                <span>{hero.phone || '+91 6369307080'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-teal-500" />
                <span>{hero.email || 'r.kannan0621@gmail.com'}</span>
              </div>
            </div>

            {/* Short Subtitle Summary */}
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
              {hero.subTitle || 'Motivated MERN Stack Developer with hands-on experience designing and building scalable, front-end and full-stack web applications using React.js, Express.js, Node.js, and MongoDB.'}
            </p>

            {/* Core Tech Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {techBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border ${badge.color}`}
                >
                  {badge.name}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-teal-500/20 hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => generatePdfResume('ats-resume-container')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold text-sm border border-gray-300 dark:border-gray-700 shadow-md hover:border-teal-500 transition-all duration-200 cursor-pointer"
              >
                <Download className="w-4 h-4 text-teal-500" />
                <span>Download Resume PDF</span>
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 font-bold text-sm border border-teal-200 dark:border-teal-800/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Key Metrics Strip */}
            <div className="pt-6 grid grid-cols-2 gap-4 border-t border-gray-200 dark:border-gray-800 max-w-md">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200/60 dark:border-gray-700/60 text-center">
                <div className="text-2xl font-extrabold text-teal-600 dark:text-teal-400">{hero.experienceYears || '3.2+ Yrs'}</div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">Work Experience</div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200/60 dark:border-gray-700/60 text-center">
                <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">{hero.projectsCount || '50+'}</div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">Projects Delivered</div>
              </div>
            </div>

          </div>

          {/* Right Column - IDE Code Window Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl bg-gray-900 text-gray-100 p-4 shadow-2xl border border-gray-800 relative overflow-hidden font-mono text-xs animate-float">
              
              {/* Window Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 text-xs font-sans">
                  <Terminal className="w-3.5 h-3.5 text-teal-400" />
                  <span>KannanController.js</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300">
                  MERN REST API
                </span>
              </div>

              {/* Code Snippet */}
              <div className="space-y-2 leading-relaxed text-gray-300">
                <p><span className="text-purple-400">const</span> <span className="text-yellow-300">developer</span> = &#123;</p>
                <p className="pl-4"><span className="text-cyan-400">name</span>: <span className="text-emerald-300">"R. KANNAN"</span>,</p>
                <p className="pl-4"><span className="text-cyan-400">role</span>: <span className="text-emerald-300">"MERN Stack Developer"</span>,</p>
                <p className="pl-4"><span className="text-cyan-400">location</span>: <span className="text-emerald-300">"Coimbatore, Tamil Nadu"</span>,</p>
                <p className="pl-4"><span className="text-cyan-400">stack</span>: [</p>
                <p className="pl-8"><span className="text-emerald-300">"MongoDB"</span>, <span className="text-emerald-300">"Express.js"</span>,</p>
                <p className="pl-8"><span className="text-emerald-300">"React.js"</span>, <span className="text-emerald-300">"Node.js"</span></p>
                <p className="pl-4">],</p>
                <p className="pl-4"><span className="text-cyan-400">capabilities</span>: [</p>
                <p className="pl-8"><span className="text-emerald-300">"RESTful API Development"</span>,</p>
                <p className="pl-8"><span className="text-emerald-300">"JWT Auth & RBAC Security"</span>,</p>
                <p className="pl-8"><span className="text-emerald-300">"Responsive UI & Redux"</span></p>
                <p className="pl-4">],</p>
                <p className="pl-4"><span className="text-purple-400">buildApp</span>: <span className="text-blue-400">async</span> () =&gt; &#123;</p>
                <p className="pl-8 text-teal-400">// Delivering end-to-end full-stack solutions</p>
                <p className="pl-8"><span className="text-purple-400">return</span> <span className="text-yellow-300">"High-Performance Web App Ready"</span>;</p>
                <p className="pl-4">&#125;</p>
                <p>&#125;;</p>
                <p><span className="text-blue-400">export default</span> developer;</p>
              </div>

              {/* Verified Badge Overlay */}
              <div className="mt-4 p-2.5 rounded-xl bg-teal-950/70 border border-teal-500/30 flex items-center justify-between text-teal-300 font-sans">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span className="text-xs font-semibold">RBAC & JWT Protected Route</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">STATUS: 200 OK</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
