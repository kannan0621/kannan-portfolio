import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { AtsResumeView } from './components/AtsResumeView';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminCMSModal } from './components/AdminCMSModal';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-accent-darkBg text-gray-900 dark:text-gray-100 font-sans selection:bg-teal-500 selection:text-white">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <AtsResumeView />
            <Contact />
          </main>
          <Footer />
          <AdminCMSModal />
          <ScrollToTop />
        </div>
      </PortfolioProvider>
    </ThemeProvider>
  );
}
