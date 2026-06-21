import { useState } from 'react';
import ResumeViewer from '../common/ResumeViewer';
import { usePortfolio } from '../../context/PortfolioContext';
import { SuccessToast, useToast } from '../admin/AdminComponents';

const Resume = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [focusedField, setFocusedField] = useState(null);
  const [showResume, setShowResume] = useState(false);
  const [loading, setLoading] = useState(false);
  const { portfolio } = usePortfolio();
  const { toast, showToast } = useToast();

  const contact = portfolio?.contact;
  const hero = portfolio?.hero;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        showToast('Message sent! Thank you for reaching out.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert(data.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Error sending message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      label: 'Email',
      value: contact?.email || hero?.email || '',
      href: contact?.email || hero?.email ? `mailto:${contact.email || hero.email}` : '',
      icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>),
      color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      label: 'Phone',
      value: contact?.phone || hero?.phone || '',
      href: contact?.phone || hero?.phone ? `tel:${(contact.phone || hero.phone).replace(/\s/g, '')}` : '',
      icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
      color: 'from-emerald-500/20 to-teal-500/20',
    },
    {
      label: 'Location',
      value: contact?.location || '',
      href: '#',
      icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>),
      color: 'from-purple-500/20 to-pink-500/20',
    },
  ];

  const isAvailable = contact?.available !== undefined ? contact.available : false;
  const availabilityText = contact?.availabilityText || "";

  const socialLinks = hero?.socialLinks?.length ? hero.socialLinks.map((s) => ({
    name: s.name,
    href: s.href,
    icon: s.name === 'GitHub' ? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
    ) : s.name === 'LinkedIn' ? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
    ) : s.name === 'NPM' ? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0v24h24V0H0zm19.2 19.2H4.8V4.8h14.4v14.4zM8 8v8h3.2v-6.4h1.6V16H16V8H8z" /></svg>
    ) : (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
    ),
  })) : [];


  return (
    <section id="resume" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px]" style={{ background: 'radial-gradient(circle, #3b82f6, transparent)', bottom: '10%', left: '10%' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full opacity-[0.03] blur-[80px]" style={{ background: 'radial-gradient(circle, #a855f7, transparent)', top: '20%', right: '5%' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Contact{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </div>

        {/* Resume Viewer Modal */}
        <ResumeViewer 
          isOpen={showResume} 
          onClose={() => setShowResume(false)} 
          pdfUrl={portfolio?.resume?.pdfUrl}
        />


        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left - Contact Info */}
          <div className="lg:w-5/12">
            <h3 className="text-white font-semibold text-lg mb-6">Contact Information</h3>

            <div className="space-y-4 mb-8">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] hover:bg-gray-100 dark:hover:bg-white/[0.04] hover:border-gray-300 dark:hover:border-white/[0.1] transition-all duration-300 cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center text-gray-700 dark:text-gray-300 group-hover:text-white group-hover:scale-110 transition-all duration-300`}>
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">{info.label}</p>
                    <p className="text-white text-sm font-medium">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <h3 className="text-white font-semibold text-lg mb-4">Follow Me</h3>
            <div className="flex gap-3">
              {[
                { name: 'GitHub', href: 'https://github.com/Shivam-75', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg> },
                { name: 'LinkedIn', href: 'https://www.linkedin.com/in/shivam-75github', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
                { name: 'NPM', href: 'https://www.npmjs.com/~shivam-75', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0v24h24V0H0zm19.2 19.2H4.8V4.8h14.4v14.4zM8 8v8h3.2v-6.4h1.6V16H16V8H8z" /></svg> },
                { name: 'Email', href: 'mailto:shivam6386000621@gmail.com', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg> },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/[0.08] hover:border-gray-400 dark:hover:border-white/[0.15] hover:scale-110 transition-all duration-300 cursor-pointer"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Availability Card */}
            <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-emerald-500/[0.06] to-teal-500/[0.06] border border-emerald-500/[0.12]">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <h4 className="text-white font-semibold text-sm">Currently Available</h4>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                I'm currently available for freelance work and full-time opportunities. Let's build something amazing together!
              </p>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="lg:w-7/12">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold text-lg mb-6">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="relative">
                    <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'name' || formData.name ? 'top-1.5 text-[10px] text-blue-400' : 'top-3.5 text-sm text-gray-500'}`}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 pt-5 pb-2 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all duration-300"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'email' || formData.email ? 'top-1.5 text-[10px] text-blue-400' : 'top-3.5 text-sm text-gray-500'}`}>
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 pt-5 pb-2 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="relative">
                  <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'subject' || formData.subject ? 'top-1.5 text-[10px] text-blue-400' : 'top-3.5 text-sm text-gray-500'}`}>
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 pt-5 pb-2 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all duration-300"
                    required
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'message' || formData.message ? 'top-1.5 text-[10px] text-blue-400' : 'top-3.5 text-sm text-gray-500'}`}>
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows="5"
                    className="w-full px-4 pt-5 pb-2 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all duration-300 resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-gray-900 dark:text-white font-semibold text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-b from-white/15 to-transparent" />
                  {loading ? (
                    <svg className="animate-spin relative z-10 w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <svg className="relative z-10 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  )}
                  <span className="relative z-10">{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
 
        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </div>
              <span className="text-white font-bold text-sm tracking-wide uppercase">Shivam</span>
            </div>
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Shivam. All rights reserved. Built with ❤️ using React
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/[0.08] transition-all duration-300 cursor-pointer"
              aria-label="Back to top"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {toast && <SuccessToast message={toast} onClose={() => {}} />}
    </section>
  );
};

export default Resume;
