import { useState, useEffect } from 'react';
import heroAvatar from '../../assets/shivam-photo.jpg';
import { usePortfolio } from '../../context/PortfolioContext';

const Home = () => {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { portfolio } = usePortfolio();

  const hero = portfolio?.hero || {};
  const roles = hero.roles || [];
  const techStack = hero.techStack || [];
  const stats = hero.stats || [];
  const githubSvg = <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>;
  const linkedinSvg = <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
  const emailSvg = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>;
  const npmSvg = <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0v24h24V0H0zm19.2 19.2H4.8V4.8h14.4v14.4zM8 8v8h3.2v-6.4h1.6V16H16V8H8z" /></svg>;

  const iconMap = { GitHub: githubSvg, LinkedIn: linkedinSvg, Email: emailSvg, NPM: npmSvg };

  const finalSocialLinks = hero.socialLinks?.length
    ? hero.socialLinks.map(s => ({ ...s, icon: iconMap[s.name] || githubSvg }))
    : [];

  useEffect(() => {
    if (!roles || roles.length === 0) {
      setDisplayText('');
      return;
    }
    const currentRole = roles[roleIndex];
    if (!currentRole) {
      setRoleIndex(0);
      return;
    }
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText === currentRole) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, roles]);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);




  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Orbs */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[120px] transition-transform duration-[2000ms]"
          style={{
            background: 'radial-gradient(circle, #3b82f6, transparent)',
            top: '10%',
            left: '10%',
            transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[100px] transition-transform duration-[2000ms]"
          style={{
            background: 'radial-gradient(circle, #8b5cf6, transparent)',
            bottom: '10%',
            right: '10%',
            transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`,
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-[0.04] blur-[80px] transition-transform duration-[2000ms]"
          style={{
            background: 'radial-gradient(circle, #06b6d4, transparent)',
            top: '50%',
            left: '50%',
            transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`,
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            {/* Greeting Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] backdrop-blur-sm mb-6 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Available for freelance work</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-4 animate-fade-in-up animation-delay-100">
                  Hi, I'm{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {hero.name || ''}
                </span>
                {/* Underline decoration */}
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C30 3 70 2 100 5C130 8 170 9 198 4" stroke="url(#underline-grad)" strokeWidth="3" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="underline-grad" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#60A5FA" />
                      <stop offset="0.5" stopColor="#22D3EE" />
                      <stop offset="1" stopColor="#A78BFA" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Typewriter Role */}
            <div className="text-xl sm:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 font-light mb-6 h-10 animate-fade-in-up animation-delay-200">
              I'm a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold">
                {displayText}
              </span>
              <span className="inline-block w-[3px] h-7 bg-blue-400 ml-1 animate-blink align-middle" />
            </div>

            {/* Description */}
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in-up animation-delay-300">
              {hero.description || ''}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-10 animate-fade-in-up animation-delay-400">
              <a
                href="#project"
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-gray-900 dark:text-white font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-[1px] rounded-full bg-gradient-to-b from-white/20 to-transparent" />
                <span className="relative z-10">View My Work</span>
                <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>

              <a
                href={portfolio?.resume?.pdfUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-gray-900 dark:text-white font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="absolute inset-0 rounded-full border border-gray-300 dark:border-white/[0.15] group-hover:border-white/30 transition-colors duration-300" />
                <div className="absolute inset-0 rounded-full bg-gray-50 dark:bg-white/[0.03] group-hover:bg-white/[0.06] transition-colors duration-300" />
                <svg className="relative z-10 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="relative z-10">Download CV</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 justify-center lg:justify-start animate-fade-in-up animation-delay-500">
                          {finalSocialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href?.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/[0.08] hover:border-gray-400 dark:hover:border-white/[0.15] hover:scale-110 transition-all duration-300 cursor-pointer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Content - Avatar */}
          <div className="flex-shrink-0 order-1 lg:order-2 animate-fade-in-up animation-delay-200">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 blur-2xl animate-pulse-slow" />
              
              {/* Rotating border */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 opacity-30 animate-spin-slow" />

              {/* Avatar container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-white/10">
                <img
                  src={heroAvatar}
                  alt="Shivam - Developer"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/40 to-transparent" />
              </div>

              {/* Floating badge - Experience */}
              <div className="absolute -right-4 top-8 px-4 py-2.5 rounded-xl bg-[#0c1220]/90 backdrop-blur-xl border border-gray-300 dark:border-white/[0.1] shadow-xl animate-float animation-delay-500">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">1+ Year</p>
                    <p className="text-gray-400 text-[10px]">Experience</p>
                  </div>
                </div>
              </div>

              {/* Floating badge - Projects */}
              <div className="absolute -left-6 bottom-12 px-4 py-2.5 rounded-xl bg-[#0c1220]/90 backdrop-blur-xl border border-gray-300 dark:border-white/[0.1] shadow-xl animate-float animation-delay-1000">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">10+ Projects</p>
                    <p className="text-gray-400 text-[10px]">Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Bar */}
        <div className="mt-16 lg:mt-20 animate-fade-in-up animation-delay-600">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <span className="text-gray-500 text-sm font-medium uppercase tracking-widest whitespace-nowrap">Tech Stack</span>
            <div className="w-px h-6 bg-white/10 hidden sm:block" />
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] hover:bg-white/[0.06] hover:border-gray-300 dark:hover:border-white/[0.12] transition-all duration-300 cursor-default"
                >
                  <span
                    className="w-2 h-2 rounded-full transition-shadow duration-300"
                    style={{
                      backgroundColor: tech.color,
                      boxShadow: `0 0 0 0 ${tech.color}00`,
                    }}
                  />
                  <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors duration-300">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up animation-delay-700">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] hover:bg-gray-100 dark:hover:bg-white/[0.04] hover:border-gray-300 dark:hover:border-white/[0.1] transition-all duration-500 text-center cursor-default"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-blue-500/5 to-transparent" />
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-12 lg:mt-16 animate-fade-in-up animation-delay-800">
          <a href="#about" className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-500 hover:text-gray-300 transition-colors duration-300 cursor-pointer group">
            <span className="text-xs font-medium uppercase tracking-widest">Scroll Down</span>
            <div className="w-6 h-10 rounded-full border-2 border-white/10 group-hover:border-white/20 flex justify-center pt-2 transition-colors duration-300">
              <div className="w-1 h-2.5 rounded-full bg-white/30 animate-scroll-down" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
