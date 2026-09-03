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
          
          {/* Interactive Developer Background & Web Click Effects */}
          <DeveloperBackground />

          {/* Top Navbar */}
          <Navbar />

          {/* Main Portfolio Sections with Section-by-Section Scroll Reveal Animations */}
          <main className="relative z-10 space-y-4">
            
            <ScrollRevealSection id="hero-reveal" variant="fade-up">
              <Hero />
            </ScrollRevealSection>

            <ScrollRevealSection id="about-reveal" variant="fade-right">
              <About />
            </ScrollRevealSection>

            <ScrollRevealSection id="skills-reveal" variant="scale-up">
              <Skills />
            </ScrollRevealSection>

            <ScrollRevealSection id="experience-reveal" variant="fade-left">
              <Experience />
            </ScrollRevealSection>

            <ScrollRevealSection id="projects-reveal" variant="fade-up">
              <Projects />
            </ScrollRevealSection>

            <ScrollRevealSection id="education-reveal" variant="scale-up">
              <Education />
            </ScrollRevealSection>

            <Suspense fallback={<div className="py-8 text-center text-xs text-gray-400 font-mono">Loading ATS Resume Engine...</div>}>
              <ScrollRevealSection id="ats-reveal" variant="fade-up">
                <AtsResumeView />
              </ScrollRevealSection>
            </Suspense>

            <ScrollRevealSection id="contact-reveal" variant="fade-right">
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
