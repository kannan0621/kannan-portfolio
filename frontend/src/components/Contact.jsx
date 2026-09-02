import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare, RefreshCw, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Contact = () => {
  const { data, sendContactMessage } = usePortfolio();
  const hero = data?.hero || {};

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', captchaInput: '' });
  const [errors, setErrors] = useState({});
  const [captcha, setCaptcha] = useState({ num1: 5, num2: 3, answer: 8 });
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState(null); // 'thankyou' | 'sorry' | null
  const [sorryReason, setSorryReason] = useState('');

  // Generate new random math captcha
  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 9) + 1;
    const n2 = Math.floor(Math.random() * 9) + 1;
    setCaptcha({ num1: n1, num2: n2, answer: n1 + n2 });
    setForm(prev => ({ ...prev, captchaInput: '' }));
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Per-field validation logic
  const validate = () => {
    const errs = {};

    // Name Validation
    if (!form.name.trim()) {
      errs.name = 'Full name is required.';
    } else if (form.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters long.';
    } else if (!/^[a-zA-Z\s\.]+$/.test(form.name.trim())) {
      errs.name = 'Name should only contain alphabetic letters.';
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(form.email.trim())) {
      errs.email = 'Please enter a valid email address (e.g. name@company.com).';
    }

    // Subject Validation
    if (!form.subject.trim()) {
      errs.subject = 'Subject is required.';
    } else if (form.subject.trim().length < 3) {
      errs.subject = 'Subject must be at least 3 characters long.';
    }

    // Message Validation
    if (!form.message.trim()) {
      errs.message = 'Message content is required.';
    } else if (form.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }

    // Math Captcha Validation
    if (!form.captchaInput.trim()) {
      errs.captchaInput = 'Math answer is required.';
    } else if (parseInt(form.captchaInput.trim(), 10) !== captcha.answer) {
      errs.captchaInput = `Incorrect math answer! What is ${captcha.num1} + ${captcha.num2}?`;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      setSorryReason('Please correct the validation errors in the form before submitting.');
      setModalState('sorry');
      return;
    }

    setLoading(true);
    const res = await sendContactMessage({
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim()
    });
    setLoading(false);

    if (res.success) {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 } });
      setModalState('thankyou');
      setForm({ name: '', email: '', subject: '', message: '', captchaInput: '' });
      setErrors({});
      generateCaptcha();
    } else {
      setSorryReason(res.message || 'Server connection error. Please try again.');
      setModalState('sorry');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50/50 dark:bg-gray-900/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Contact <span className="text-gradient">R. KANNAN</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Interested in hiring me for MERN Stack / Front-End roles or discussing project opportunities? Send a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4 hover:border-teal-500 transition-colors">
              <div className="p-3.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Phone / Mobile</h4>
                <a href={`tel:${hero.phone || '6369307080'}`} className="text-base font-bold text-gray-900 dark:text-white hover:text-teal-500">
                  {hero.phone || '+91 6369307080'}
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4 hover:border-teal-500 transition-colors">
              <div className="p-3.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Direct Admin Email</h4>
                <a href="mailto:r.kannan0621@gmail.com" className="text-base font-bold text-gray-900 dark:text-white hover:text-teal-500">
                  r.kannan0621@gmail.com
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4 hover:border-teal-500 transition-colors">
              <div className="p-3.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</h4>
                <p className="text-base font-bold text-gray-900 dark:text-white">
                  {hero.location || 'Coimbatore, Tamil Nadu, India'}
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-teal-900/10 border border-teal-500/20 text-xs text-teal-700 dark:text-teal-300 leading-relaxed">
              📩 <strong>Direct Mail Dispatch:</strong> Submitting this form sends an email notification directly to Admin (<code className="font-mono">r.kannan0621@gmail.com</code>) and dispatches a confirmation copy to your inbox.
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl space-y-6">
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Send a Direct Message
              </h3>

              <form onSubmit={handleSubmit} noValidate className="space-y-4" id="contact-form">
                
                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="contact-name" className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: null });
                    }}
                    className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none transition-all ${
                      errors.name ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-teal-500'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-rose-500 font-semibold">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor="contact-email" className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="name@company.com"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: null });
                    }}
                    className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none transition-all ${
                      errors.email ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-teal-500'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-rose-500 font-semibold">{errors.email}</p>}
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label htmlFor="contact-subject" className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Subject / Opportunity <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="e.g. MERN Stack Developer Hiring Opportunity"
                    value={form.subject}
                    onChange={(e) => {
                      setForm({ ...form, subject: e.target.value });
                      if (errors.subject) setErrors({ ...errors, subject: null });
                    }}
                    className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none transition-all ${
                      errors.subject ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-teal-500'
                    }`}
                  />
                  {errors.subject && <p className="text-xs text-rose-500 font-semibold">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="contact-message" className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Hello Kannan, I reviewed your MERN portfolio and would like to discuss..."
                    value={form.message}
                    onChange={(e) => {
                      setForm({ ...form, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: null });
                    }}
                    className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none transition-all ${
                      errors.message ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-teal-500'
                    }`}
                  />
                  {errors.message && <p className="text-xs text-rose-500 font-semibold">{errors.message}</p>}
                </div>

                {/* Random Math Captcha Calculator */}
                <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="contact-captcha" className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                      <span>🧮 Security Captcha:</span>
                      <span className="px-2 py-0.5 rounded bg-teal-500 text-white font-mono text-sm">
                        {captcha.num1} + {captcha.num2} = ?
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                      aria-label="Refresh captcha"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Refresh
                    </button>
                  </div>

                  <input
                    id="contact-captcha"
                    type="number"
                    placeholder="Enter total sum"
                    value={form.captchaInput}
                    onChange={(e) => {
                      setForm({ ...form, captchaInput: e.target.value });
                      if (errors.captchaInput) setErrors({ ...errors, captchaInput: null });
                    }}
                    className={`w-full px-4 py-2 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm outline-none ${
                      errors.captchaInput ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-teal-500'
                    }`}
                  />
                  {errors.captchaInput && <p className="text-xs text-rose-500 font-semibold">{errors.captchaInput}</p>}
                </div>

                {/* Submit Button */}
                <button
                  id="contact-submit"
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-teal-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Message</span>
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>

      {/* THANK YOU MODAL PAGE (Confirmation Summary Removed) */}
      {modalState === 'thankyou' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-lg w-full p-8 text-center space-y-6 shadow-2xl border border-teal-500/30 relative">
            
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                SUBMISSION SUCCESSFUL
              </span>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                Thank You For Your Message!
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Your message has been sent successfully. An email notification has been dispatched directly to R. KANNAN (<code className="text-teal-500 font-mono">r.kannan0621@gmail.com</code>) and a confirmation email has been sent to your email inbox.
              </p>
            </div>

            <button
              onClick={() => setModalState(null)}
              className="w-full py-3.5 rounded-xl bg-teal-500 text-white font-bold text-sm shadow-lg hover:bg-teal-600 transition-colors"
            >
              Close & Return to Portfolio
            </button>

          </div>
        </div>
      )}

      {/* SORRY / ERROR MODAL PAGE */}
      {modalState === 'sorry' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-lg w-full p-8 text-center space-y-6 shadow-2xl border border-rose-500/30 relative">
            
            <div className="w-20 h-20 rounded-full bg-rose-500/10 border-2 border-rose-500 text-rose-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
                Submission Warning
              </span>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                Form Submission Incomplete
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {sorryReason || 'We encountered an issue validating your input details or math captcha answer.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-left text-xs text-rose-700 dark:text-rose-300 space-y-1">
              <p className="font-bold">Suggested Actions:</p>
              <p>1. Check all required input fields for accurate details.</p>
              <p>2. Ensure the Math Captcha answer equals the sum of the numbers.</p>
              <p>3. Or email R. KANNAN directly at <strong>r.kannan0621@gmail.com</strong>.</p>
            </div>

            <button
              onClick={() => setModalState(null)}
              className="w-full py-3 rounded-xl bg-rose-600 text-white font-bold text-sm shadow-lg hover:bg-rose-700 transition-colors"
            >
              Try Again & Fix Errors
            </button>

          </div>
        </div>
      )}

    </section>
  );
};
