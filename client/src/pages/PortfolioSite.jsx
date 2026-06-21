import { useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Home from '../components/portfolio/Home';
import About from '../components/portfolio/About';
import Projects from '../components/portfolio/Projects';
import Services from '../components/portfolio/Services';
import Education from '../components/portfolio/Education';
import Resume from '../components/portfolio/Resume';
import { usePortfolio } from '../context/PortfolioContext';

const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-b from-[#070b14] via-[#0c1525] to-[#0a1020] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center">
        <svg className="animate-spin w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
      <p className="text-gray-400 text-sm animate-pulse">Loading portfolio...</p>
    </div>
  </div>
);

const PortfolioSite = () => {
  const { loading } = usePortfolio();

  useEffect(() => {
    document.title = "Shivam Pandey | Portfolio";
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'shortcut icon';
    link.href = '/favicon.svg';
    document.getElementsByTagName('head')[0].appendChild(link);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#070b14] via-[#0c1525] to-[#0a1020] relative">
      <Navbar />
      <Home />
      <About />
      <Projects />
      <Services />
      <Education />
      <Resume />
    </div>
  );
};

export default PortfolioSite;
