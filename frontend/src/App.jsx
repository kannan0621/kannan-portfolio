import React, { useState, lazy, Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { DeveloperBackground } from './components/DeveloperBackground';
import { ScrollRevealSection } from './components/ScrollRevealSection';
import { DeveloperSplashScreen } from './components/DeveloperSplashScreen';

// Lazy load heavy components for >95 Mobile Performance & Core Web Vitals optimization
const AtsResumeView = lazy(() => import('./components/AtsResumeView').then(m => ({ default: m.AtsResumeView })));
const AdminCMSModal = lazy(() => import('./components/AdminCMSModal').then(m => ({ default: m.AdminCMSModal })));

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ThemeProvider>
      <PortfolioProvider>
        {/* High-Tech Developer Splash Screen */}
        {showSplash && (
          <DeveloperSplashScreen onComplete={() => setShowSplash(false)} />
        )}

        <div className="relative min-h-screen bg-gray-50 dark:bg-accent-darkBg text-gray-900 dark:text-gray-100 font-sans selection:bg-teal-500 selection:text-white overflow-x-hidden">
          
          {/* Interactive Developer Background & Slow Web Click Effects */}
          <DeveloperBackground />

          {/* Top Navbar */}
          <Navbar />

          {/* Main Portfolio Sections - Single Section Format Presentation */}
          <main className="relative z-10">
            
            <ScrollRevealSection id="hero" variant="fade-up" delay={0}>
              <Hero />
            </ScrollRevealSection>

            <ScrollRevealSection id="about" variant="fade-right" delay={50}>
              <About />
            </ScrollRevealSection>

            <ScrollRevealSection id="skills" variant="scale-up" delay={50}>
              <Skills />
            </ScrollRevealSection>

            <ScrollRevealSection id="experience" variant="fade-left" delay={50}>
              <Experience />
            </ScrollRevealSection>

            <ScrollRevealSection id="projects" variant="fade-up" delay={50}>
              <Projects />
            </ScrollRevealSection>

            <ScrollRevealSection id="education" variant="scale-up" delay={50}>
              <Education />
            </ScrollRevealSection>

            <Suspense fallback={<div className="py-8 text-center text-xs text-gray-400 font-mono">Loading ATS Resume Engine...</div>}>
              <ScrollRevealSection id="ats-resume" variant="fade-right" delay={50}>
                <AtsResumeView />
              </ScrollRevealSection>
            </Suspense>

            <ScrollRevealSection id="contact" variant="fade-up" delay={50}>
              <Contact />
            </ScrollRevealSection>

          </main>

          <Footer />

          <Suspense fallback={null}>
            <AdminCMSModal />
          </Suspense>

          <ScrollToTop />
        </div>
      </PortfolioProvider>
    </ThemeProvider>
  );
}
