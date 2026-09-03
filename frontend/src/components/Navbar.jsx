import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';
import { generatePdfResume } from '../utils/pdfGenerator';
import { 
  Sun, Moon, Menu, X, FileText, Settings, Code
} from 'lucide-react';

export const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { isCmsOpen, setIsCmsOpen, adminUser } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Calculate horizontal reading scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'education', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id, e) => {
    if (e) e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Education', id: 'education' },
    { name: 'Resume', id: 'resume' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 dark:bg-accent-darkBg/90 backdrop-blur-md shadow-md py-3 border-b border-gray-200 dark:border-gray-800' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={(e) => scrollToSection('home', e)} 
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform duration-200">
            RK
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 dark:text-white text-lg tracking-tight group-hover:text-teal-500 transition-colors">
              R. KANNAN
            </span>
            <span className="text-xs font-medium text-teal-600 dark:text-teal-400 flex items-center gap-1">
              <Code className="w-3 h-3" /> MERN Developer
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-gray-100/80 dark:bg-gray-800/80 p-1.5 rounded-full border border-gray-200/80 dark:border-gray-700/80 backdrop-blur-sm">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={(e) => scrollToSection(link.id, e)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeSection === link.id
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400'
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          
          {/* Dark / Light Toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle theme mode"
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Quick PDF Resume Download */}
          <button
            onClick={() => generatePdfResume('ats-resume-container')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold text-xs shadow-lg hover:shadow-teal-500/25 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Download Resume</span>
          </button>

          {/* CMS Admin Button */}
          <button
            onClick={() => setIsCmsOpen(true)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              adminUser 
                ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-teal-500'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{adminUser ? 'CMS (Active)' : 'Admin CMS'}</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 pt-3 pb-6 space-y-2 mt-2 shadow-xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={(e) => {
                setMobileMenuOpen(false);
                scrollToSection(link.id, e);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer ${
                activeSection === link.id
                  ? 'bg-teal-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {link.name}
            </button>
          ))}

          <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                generatePdfResume('ats-resume-container');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 text-white text-sm font-bold shadow-md cursor-pointer"
            >
              <FileText className="w-4 h-4" /> Download Resume PDF
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCmsOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-semibold cursor-pointer"
            >
              <Settings className="w-4 h-4" /> Admin CMS Login
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
