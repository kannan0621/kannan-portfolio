import React, { useState, useEffect } from 'react';
import { Terminal, Code, Cpu, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

const BOOT_LOGS = [
  { text: "Initializing Kannan.dev MERN Stack Engine...", icon: <Terminal className="w-3.5 h-3.5 text-teal-400" /> },
  { text: "Connecting MongoDB database schemas & ORM models...", icon: <Cpu className="w-3.5 h-3.5 text-cyan-400" /> },
  { text: "Loading Express.js REST API routes & middleware...", icon: <Code className="w-3.5 h-3.5 text-indigo-400" /> },
  { text: "Compiling React 18 UI components & hooks...", icon: <Code className="w-3.5 h-3.5 text-purple-400" /> },
  { text: "Enabling JWT Auth & Role-Based Access Control (RBAC)...", icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> },
  { text: "System 100% Ready! Welcome to R. KANNAN Portfolio", icon: <CheckCircle2 className="w-3.5 h-3.5 text-teal-300" /> }
];

export const DeveloperSplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [activeLogIdx, setActiveLogIdx] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Progress counter loop (0% -> 100%)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const next = prev + 15;
        return next > 100 ? 100 : next;
      });
    }, 120);

    // Terminal log line timer
    const logInterval = setInterval(() => {
      setActiveLogIdx((prev) => {
        if (prev >= BOOT_LOGS.length - 1) {
          clearInterval(logInterval);
          return BOOT_LOGS.length - 1;
        }
        return prev + 1;
      });
    }, 200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, []);

  // Handle completion exit when progress reaches 100%
  useEffect(() => {
    if (progress === 100) {
      const exitTimer = setTimeout(() => {
        handleEnter();
      }, 500);
      return () => clearTimeout(exitTimer);
    }
  }, [progress]);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 500);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-950 text-white font-mono p-4 transition-all duration-500 ease-in-out ${
        isExiting ? 'opacity-0 scale-105 backdrop-blur-none pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.15)_0,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-500 animate-pulse" />

      {/* Main Terminal Window Card */}
      <div className="max-w-xl w-full rounded-3xl bg-gray-900/95 border border-teal-500/40 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl relative overflow-hidden space-y-6">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          </div>
          <div className="flex items-center gap-2 text-xs text-teal-400 font-bold">
            <Terminal className="w-4 h-4 animate-spin-slow" />
            <span>KannanDev.engine --boot</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/40">
            v2.4 MERN
          </span>
        </div>

        {/* Brand Title */}
        <div className="space-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <span className="text-teal-400">&lt;</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400">
              R. KANNAN
            </span>
            <span className="text-teal-400">/&gt;</span>
          </div>
          <p className="text-xs text-gray-400 font-sans">
            MERN Stack Developer & Full Stack Engineering Portfolio
          </p>
        </div>

        {/* Animated Terminal Log Output Stream */}
        <div className="bg-black/70 rounded-2xl p-4 border border-gray-800 space-y-2.5 min-h-[140px] text-xs">
          {BOOT_LOGS.slice(0, activeLogIdx + 1).map((log, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2.5 transition-all duration-200 ${
                idx === activeLogIdx ? 'text-teal-300 font-bold translate-x-1' : 'text-gray-400 opacity-80'
              }`}
            >
              {log.icon}
              <span className="font-mono text-[11px]">[0{idx + 1}] {log.text}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar & Percentage Counter */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-teal-400">LOADING CORE ENGINE</span>
            <span className="text-indigo-400">{progress}%</span>
          </div>

          <div className="h-2.5 w-full bg-gray-800 rounded-full overflow-hidden p-0.5 border border-gray-700">
            <div
              className="h-full bg-gradient-to-r from-teal-500 via-cyan-400 to-indigo-500 rounded-full transition-all duration-150 shadow-lg shadow-teal-500/50"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-[10px] text-gray-500 font-sans">
            Auto-starting once compilation completes...
          </span>

          <button
            onClick={handleEnter}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            <span>{progress === 100 ? 'Enter Portfolio' : 'Skip Intro'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
