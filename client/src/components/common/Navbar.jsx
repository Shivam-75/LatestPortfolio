import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('Home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { portfolio } = usePortfolio();

  const navLinks = portfolio?.navbar?.links || ['Home', 'About', 'Project', 'Service', 'Education', 'Resume'];
  const brandName = portfolio?.navbar?.brandName || 'Shivam';


  return (
    <nav className="w-full flex items-center justify-between py-2.5 px-6 md:px-10 fixed top-0 left-0 z-50 bg-[#070b14]/95 backdrop-blur-md md:bg-gradient-to-b md:from-[#070b14]/90 md:to-transparent md:backdrop-blur-none">
      
      {/* Logo */}
      <a href="#" className="flex items-center gap-2 cursor-pointer shrink-0">
        {/* Logo Icon */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </div>
        <span className="text-white font-bold text-lg tracking-wide uppercase">{brandName}</span>
      </a>

      {/* Center Nav Links - Pill Container */}
      <div className="hidden md:flex items-center bg-[#0c1220]/80 backdrop-blur-xl border border-white/[0.08] rounded-full px-2 py-1.5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        {navLinks.map((link) => {
          const isResume = link.toLowerCase() === 'resume';
          const hrefValue = isResume 
            ? (portfolio?.resume?.pdfUrl || '#') 
            : `#${link.toLowerCase().replace(/\s+/g, '-')}`;
          return (
            <a
              key={link}
              href={hrefValue}
              target={isResume ? "_blank" : undefined}
              rel={isResume ? "noopener noreferrer" : undefined}
              onClick={() => {
                if (!isResume) {
                  setActiveLink(link);
                }
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap
                ${activeLink === link
                  ? 'text-white font-semibold'
                  : 'text-gray-400 hover:text-gray-200'
                }`}
            >
              {link}
            </a>
          );
        })}
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span className={`w-5 h-0.5 bg-white rounded transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`w-5 h-0.5 bg-white rounded transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}></span>
        <span className={`w-5 h-0.5 bg-white rounded transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden absolute top-[52px] left-4 right-4 bg-[#0c1220]/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4 flex flex-col gap-1 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          {navLinks.map((link) => {
            const isResume = link.toLowerCase() === 'resume';
            const hrefValue = isResume 
              ? (portfolio?.resume?.pdfUrl || '#') 
              : `#${link.toLowerCase().replace(/\s+/g, '-')}`;
            return (
              <a
                key={link}
                href={hrefValue}
                target={isResume ? "_blank" : undefined}
                rel={isResume ? "noopener noreferrer" : undefined}
                onClick={() => {
                  if (!isResume) {
                    setActiveLink(link);
                  }
                  setMobileOpen(false);
                }}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer
                  ${activeLink === link
                    ? 'text-white bg-white/[0.05] font-semibold'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]'
                  }`}
              >
                {link}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
