import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Github, Linkedin, Mail, Phone, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const { data } = usePortfolio();
  const hero = data?.hero || {};

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white font-bold text-sm">
                RK
              </div>
              <span className="text-xl font-bold text-white tracking-tight">R. KANNAN</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-md">
              Motivated MERN Stack Developer specializing in React.js, Express.js, Node.js, and MongoDB.
              Building high-performance, responsive web applications with JWT authentication and RBAC security.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-1.5 text-xs">
              <li><button onClick={() => scrollToSection('home')} className="hover:text-teal-400 transition-colors text-left cursor-pointer">Home</button></li>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-teal-400 transition-colors text-left cursor-pointer">About Me</button></li>
              <li><button onClick={() => scrollToSection('skills')} className="hover:text-teal-400 transition-colors text-left cursor-pointer">Skills</button></li>
              <li><button onClick={() => scrollToSection('experience')} className="hover:text-teal-400 transition-colors text-left cursor-pointer">Experience</button></li>
              <li><button onClick={() => scrollToSection('projects')} className="hover:text-teal-400 transition-colors text-left cursor-pointer">Projects</button></li>
              <li><button onClick={() => scrollToSection('resume')} className="hover:text-teal-400 transition-colors text-left cursor-pointer">ATS Resume</button></li>
            </ul>
          </div>

          {/* Connect & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider">Connect</h4>
            <div className="flex items-center gap-3">
              <a
                href={hero.github || 'https://github.com/rkannan0621'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-gray-800 text-gray-300 hover:text-teal-400 hover:bg-gray-700 transition-colors"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={hero.linkedin || 'https://linkedin.com/in/rkannan0621'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-gray-800 text-gray-300 hover:text-teal-400 hover:bg-gray-700 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${hero.email || 'r.kannan0621@gmail.com'}`}
                className="p-2 rounded-xl bg-gray-800 text-gray-300 hover:text-teal-400 hover:bg-gray-700 transition-colors"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href={`tel:${hero.phone || '6369307080'}`}
                className="p-2 rounded-xl bg-gray-800 text-gray-300 hover:text-teal-400 hover:bg-gray-700 transition-colors"
                title="Phone"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
            <p className="text-[11px] text-gray-500 font-mono">
              Coimbatore, Tamil Nadu, India
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} R. KANNAN. Built with React.js, Tailwind CSS, Node.js & MongoDB.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-teal-400 font-bold hover:underline cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
