import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { generatePdfResume } from '../utils/pdfGenerator';
import { FileText, Download, Eye, X, CheckCircle, ShieldCheck, Award, Briefcase, GraduationCap } from 'lucide-react';

export const AtsResumeView = () => {
  const { data } = usePortfolio();
  const hero = data?.hero || {};
  const about = data?.about || {};
  const skills = data?.skills || [];
  const experience = data?.experience || [];
  const projects = data?.projects || [];
  const education = data?.education || [];
  const certifications = data?.certifications || [];

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <section id="resume" className="py-20 bg-white dark:bg-accent-darkBg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5" />
            <span>Curriculum Vitae</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Professional <span className="text-gradient">Resume</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Quantified impact metrics and verified experience formatted for technical hiring managers.
          </p>
        </div>

        {/* Clean Resume Callout Card */}
        <div className="max-w-4xl mx-auto p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900 to-teal-950 text-white shadow-2xl border border-gray-800 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Verified Full-Stack MERN Resume</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {hero.name || 'R. KANNAN'} — {hero.title || 'MERN Stack Developer'}
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
                Single-page formatted resume featuring quantified engineering accomplishments, performance metrics (42% load time reduction, 50k+ daily transactions), RESTful API architecture, and MERN stack competencies.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-gray-300 font-medium pt-2">
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-teal-400" />
                  <span>1.5+ Years Experience</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-teal-400" />
                  <span>B.E. Mechanical Engineering</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-teal-400" />
                  <span>N-School Certified MERN Dev</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => generatePdfResume('ats-resume-container')}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold text-xs shadow-xl shadow-teal-500/25 hover:scale-105 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume PDF</span>
              </button>

              <button
                onClick={() => setIsPreviewOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 font-bold text-xs transition-colors"
              >
                <Eye className="w-4 h-4 text-teal-400" />
                <span>Preview Single-Page Resume</span>
              </button>
            </div>

          </div>

        </div>

        {/* Modal for Single Page Resume Preview */}
        {isPreviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
            <div className="bg-gray-100 dark:bg-gray-900 rounded-3xl max-w-4xl w-full p-4 sm:p-6 space-y-4 shadow-2xl border border-gray-700 relative max-h-[92vh] flex flex-col">
              
              <div className="flex items-center justify-between pb-3 border-b border-gray-300 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-500" />
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                    Resume Document Preview
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => generatePdfResume('ats-resume-container')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500 text-white text-xs font-bold shadow-md hover:bg-teal-600"
                  >
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </button>
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className="p-1.5 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Document Container inside Modal */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-200 dark:bg-gray-950 rounded-2xl flex justify-center">
                
                <div className="bg-white text-gray-900 p-8 sm:p-10 rounded-xl shadow-lg border border-gray-300 max-w-3xl w-full font-sans space-y-5 text-left">
                  
                  {/* Header */}
                  <div className="text-center border-b-2 border-gray-800 pb-4 space-y-1.5">
                    <h1 className="text-2xl font-extrabold tracking-wider uppercase text-gray-900">
                      {hero.name || 'R. KANNAN'}
                    </h1>
                    <p className="text-xs font-bold text-teal-700 tracking-wide uppercase">
                      {hero.title || 'MERN Stack Developer'}
                    </p>
                    <p className="text-[11px] text-gray-700 font-medium">
                      {hero.phone || '6369307080'} &nbsp;|&nbsp; {hero.email || 'r.kannan0621@gmail.com'} &nbsp;|&nbsp; {hero.location || 'Coimbatore, Tamil Nadu, India'}
                    </p>
                    <p className="text-[10px] text-gray-600 font-mono">
                      GitHub: {hero.github || 'https://github.com/rkannan0621'} &nbsp;|&nbsp; LinkedIn: {hero.linkedin || 'https://linkedin.com/in/rkannan0621'}
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="space-y-1">
                    <h2 className="text-[11px] font-bold tracking-widest text-gray-900 uppercase border-b border-gray-300 pb-0.5">
                      PROFESSIONAL SUMMARY
                    </h2>
                    <p className="text-[11px] text-gray-800 leading-relaxed">
                      {about.summary || 'Motivated MERN Stack Developer with 1.5+ years of hands-on experience designing and deploying scalable full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Specialized in engineering high-throughput RESTful APIs, JWT authentication, role-based access control (RBAC), and high-performance front-end UIs. Reduced page load times by 42% and supported 25,000+ active users across enterprise client applications.'}
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="space-y-1">
                    <h2 className="text-[11px] font-bold tracking-widest text-gray-900 uppercase border-b border-gray-300 pb-0.5">
                      CORE COMPETENCIES
                    </h2>
                    <p className="text-[11px] text-gray-800 leading-relaxed font-medium">
                      <strong>Frontend & UI:</strong> React.js, JavaScript (ES6+), Redux, Context API, HTML5, CSS3, Tailwind CSS, Material UI, Axios, Fetch API, Responsive Web Design.<br />
                      <strong>Backend & API:</strong> Node.js, Express.js, RESTful API Engineering, JWT Authentication, RBAC (Role-Based Access Control), MVC Architecture, Protected Routing.<br />
                      <strong>Database & Tools:</strong> MongoDB, Mongoose ORM, Database Design, Git & GitHub, Agile Workflows, Performance Optimization, Code-Splitting.
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="space-y-2.5">
                    <h2 className="text-[11px] font-bold tracking-widest text-gray-900 uppercase border-b border-gray-300 pb-0.5">
                      WORK EXPERIENCE
                    </h2>
                    {experience.map((exp, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="flex justify-between items-baseline text-[11px] font-bold text-gray-900">
                          <span>{exp.role} <span className="font-semibold text-teal-800">| {exp.company}, {exp.location}</span></span>
                          <span className="font-mono text-gray-700">{exp.period}</span>
                        </div>
                        <ul className="list-disc list-inside text-[10px] text-gray-800 space-y-0.5 pl-1 leading-normal">
                          {exp.points && exp.points.map((pt, pIdx) => (
                            <li key={pIdx}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Projects */}
                  <div className="space-y-2.5">
                    <h2 className="text-[11px] font-bold tracking-widest text-gray-900 uppercase border-b border-gray-300 pb-0.5">
                      PERSONAL PROJECTS
                    </h2>
                    {projects.slice(0, 2).map((proj, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="flex justify-between items-baseline text-[11px] font-bold text-gray-900">
                          <span>{proj.title} <span className="font-semibold text-gray-600">| {proj.tech ? proj.tech.join(', ') : ''}</span></span>
                        </div>
                        <p className="text-[10px] text-gray-800 leading-normal">{proj.description}</p>
                        <ul className="list-disc list-inside text-[10px] text-gray-800 space-y-0.5 pl-1">
                          {proj.highlights && proj.highlights.map((h, hIdx) => (
                            <li key={hIdx}>{h}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Education */}
                  <div className="space-y-1">
                    <h2 className="text-[11px] font-bold tracking-widest text-gray-900 uppercase border-b border-gray-300 pb-0.5">
                      EDUCATION
                    </h2>
                    {education.map((edu, idx) => (
                      <div key={idx} className="flex justify-between items-baseline text-[11px] text-gray-800 font-medium">
                        <span><strong>{edu.degree}</strong> &nbsp;—&nbsp; {edu.institution}</span>
                        <span className="font-mono text-gray-700">{edu.period}</span>
                      </div>
                    ))}
                  </div>

                  {/* Certifications */}
                  <div className="space-y-1">
                    <h2 className="text-[11px] font-bold tracking-widest text-gray-900 uppercase border-b border-gray-300 pb-0.5">
                      CERTIFICATIONS
                    </h2>
                    {certifications.map((cert, idx) => (
                      <div key={idx} className="text-[11px] text-gray-800 font-medium">
                        <strong>{cert.title}</strong> &nbsp;—&nbsp; {cert.issuer} ({cert.year})
                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

        {/* Hidden Printable Container for jsPDF Generation */}
        <div className="hidden">
          <div className="bg-white text-gray-900 p-8 sm:p-10 rounded-xl border border-gray-300 max-w-3xl w-full font-sans space-y-5 text-left" id="ats-resume-container">
            
            {/* Header */}
            <div className="text-center border-b-2 border-gray-800 pb-4 space-y-1.5">
              <h1 className="text-2xl font-extrabold tracking-wider uppercase text-gray-900">
                {hero.name || 'R. KANNAN'}
              </h1>
              <p className="text-xs font-bold text-teal-700 tracking-wide uppercase">
                {hero.title || 'MERN Stack Developer'}
              </p>
              <p className="text-[11px] text-gray-700 font-medium">
                {hero.phone || '6369307080'} &nbsp;|&nbsp; {hero.email || 'r.kannan0621@gmail.com'} &nbsp;|&nbsp; {hero.location || 'Coimbatore, Tamil Nadu, India'}
              </p>
              <p className="text-[10px] text-gray-600 font-mono">
                GitHub: {hero.github || 'https://github.com/rkannan0621'} &nbsp;|&nbsp; LinkedIn: {hero.linkedin || 'https://linkedin.com/in/rkannan0621'}
              </p>
            </div>

            {/* Professional Summary */}
            <div className="space-y-1">
              <h2 className="text-[11px] font-bold tracking-widest text-gray-900 uppercase border-b border-gray-300 pb-0.5">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-[11px] text-gray-800 leading-relaxed">
                {about.summary || 'Motivated MERN Stack Developer with 1.5+ years of hands-on experience designing and deploying scalable full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Specialized in engineering high-throughput RESTful APIs, JWT authentication, role-based access control (RBAC), and high-performance front-end UIs. Reduced page load times by 42% and supported 25,000+ active users across enterprise client applications.'}
              </p>
            </div>

            {/* Core Competencies */}
            <div className="space-y-1">
              <h2 className="text-[11px] font-bold tracking-widest text-gray-900 uppercase border-b border-gray-300 pb-0.5">
                CORE COMPETENCIES
              </h2>
              <p className="text-[11px] text-gray-800 leading-relaxed font-medium">
                <strong>Frontend & UI:</strong> React.js, JavaScript (ES6+), Redux, Context API, HTML5, CSS3, Tailwind CSS, Material UI, Axios, Fetch API, Responsive Web Design.<br />
                <strong>Backend & API:</strong> Node.js, Express.js, RESTful API Engineering, JWT Authentication, RBAC (Role-Based Access Control), MVC Architecture, Protected Routing.<br />
                <strong>Database & Tools:</strong> MongoDB, Mongoose ORM, Database Design, Git & GitHub, Agile Workflows, Performance Optimization, Code-Splitting.
              </p>
            </div>

            {/* Work Experience */}
            <div className="space-y-2.5">
              <h2 className="text-[11px] font-bold tracking-widest text-gray-900 uppercase border-b border-gray-300 pb-0.5">
                WORK EXPERIENCE
              </h2>
              {experience.map((exp, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between items-baseline text-[11px] font-bold text-gray-900">
                    <span>{exp.role} <span className="font-semibold text-teal-800">| {exp.company}, {exp.location}</span></span>
                    <span className="font-mono text-gray-700">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside text-[10px] text-gray-800 space-y-0.5 pl-1 leading-normal">
                    {exp.points && exp.points.map((pt, pIdx) => (
                      <li key={pIdx}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Personal Projects */}
            <div className="space-y-2.5">
              <h2 className="text-[11px] font-bold tracking-widest text-gray-900 uppercase border-b border-gray-300 pb-0.5">
                PERSONAL PROJECTS
              </h2>
              {projects.slice(0, 2).map((proj, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between items-baseline text-[11px] font-bold text-gray-900">
                    <span>{proj.title} <span className="font-semibold text-gray-600">| {proj.tech ? proj.tech.join(', ') : ''}</span></span>
                  </div>
                  <p className="text-[10px] text-gray-800 leading-normal">{proj.description}</p>
                  <ul className="list-disc list-inside text-[10px] text-gray-800 space-y-0.5 pl-1">
                    {proj.highlights && proj.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-1">
              <h2 className="text-[11px] font-bold tracking-widest text-gray-900 uppercase border-b border-gray-300 pb-0.5">
                EDUCATION
              </h2>
              {education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-baseline text-[11px] text-gray-800 font-medium">
                  <span><strong>{edu.degree}</strong> &nbsp;—&nbsp; {edu.institution}</span>
                  <span className="font-mono text-gray-700">{edu.period}</span>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="space-y-1">
              <h2 className="text-[11px] font-bold tracking-widest text-gray-900 uppercase border-b border-gray-300 pb-0.5">
                CERTIFICATIONS
              </h2>
              {certifications.map((cert, idx) => (
                <div key={idx} className="text-[11px] text-gray-800 font-medium">
                  <strong>{cert.title}</strong> &nbsp;—&nbsp; {cert.issuer} ({cert.year})
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
