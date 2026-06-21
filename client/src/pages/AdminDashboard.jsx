import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../context/PortfolioContext';
import HeroEditor from '../components/admin/editors/HeroEditor';
import AboutEditor from '../components/admin/editors/AboutEditor';
import ProjectsEditor from '../components/admin/editors/ProjectsEditor';
import EducationEditor from '../components/admin/editors/EducationEditor';
import ServicesEditor from '../components/admin/editors/ServicesEditor';
import ContactEditor from '../components/admin/editors/ContactEditor';
import NavbarEditor from '../components/admin/editors/NavbarEditor';
import ResumeEditor from '../components/admin/editors/ResumeEditor';
import MessagesEditor from '../components/admin/editors/MessagesEditor';

const MENU = [
  { id: 'dashboard', label: 'Dashboard', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg> },
  { id: 'messages', label: 'Messages', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg> },
  { id: 'hero', label: 'Hero / Home', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg> },
  { id: 'about', label: 'About', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg> },
  { id: 'projects', label: 'Projects', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg> },
  { id: 'education', label: 'Education', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /></svg> },
  { id: 'services', label: 'Services', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /></svg> },
  { id: 'contact', label: 'Contact', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07" /></svg> },
  { id: 'navbar', label: 'Navbar', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg> },
  { id: 'resume', label: 'Resume Upload', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /></svg> },
];

const DashboardHome = ({ portfolio }) => {
  const stats = [
    { label: 'Projects', value: portfolio?.projects?.length || 0, icon: '📁', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/20' },
    { label: 'Education', value: portfolio?.education?.length || 0, icon: '🎓', color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/20' },
    { label: 'Services', value: portfolio?.services?.length || 0, icon: '⚙️', color: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/20' },
    { label: 'Certifications', value: portfolio?.certifications?.length || 0, icon: '🏆', color: 'from-orange-500/20 to-yellow-500/20', border: 'border-orange-500/20' },
  ];

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Welcome back, Admin! 👋</h2>
        <p className="text-gray-500 text-sm">Sidebar se koi bhi section select karo aur portfolio ka data change karo.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className={`p-5 rounded-2xl bg-gradient-to-br ${stat.color} border ${stat.border} text-center`}>
            <span className="text-3xl mb-3 block">{stat.icon}</span>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
            <p className="text-gray-400 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-white/[0.06]">
          <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Admin Credentials
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1.5 py-1 border-b border-white/[0.02] last:border-0">
              <span className="text-gray-500">Email:</span>
              <span className="text-white font-mono break-all">admin@shivam.dev</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1.5 py-1 border-b border-white/[0.02] last:border-0">
              <span className="text-gray-500">Password:</span>
              <span className="text-white font-mono break-all">Shivam@Admin2026</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1.5 py-1 last:border-0">
              <span className="text-gray-500">Login URL:</span>
              <span className="text-blue-400 break-all">/shivam/admin</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-white/[0.06]">
          <h3 className="text-white font-semibold text-sm mb-3">📤 File Upload (Cloudonix)</h3>
          <p className="text-gray-500 text-xs leading-relaxed">
            Profile photo aur resume PDF Cloudonix SDK se upload honge. <br/>
            <code className="text-gray-400">.env</code> mein <code className="text-blue-400">CLOUDONIX_API_KEY</code> set karo.
          </p>
          <div className={`mt-3 flex items-center gap-2 text-xs ${portfolio?.hero?.profilePhoto ? 'text-emerald-400' : 'text-gray-500'}`}>
            <span className={`w-2 h-2 rounded-full ${portfolio?.hero?.profilePhoto ? 'bg-emerald-400' : 'bg-gray-600'}`} />
            {portfolio?.hero?.profilePhoto ? 'Profile photo uploaded' : 'No profile photo yet'}
          </div>
          <div className={`mt-1 flex items-center gap-2 text-xs ${portfolio?.resume?.pdfUrl ? 'text-emerald-400' : 'text-gray-500'}`}>
            <span className={`w-2 h-2 rounded-full ${portfolio?.resume?.pdfUrl ? 'bg-emerald-400' : 'bg-gray-600'}`} />
            {portfolio?.resume?.pdfUrl ? 'Resume PDF uploaded' : 'No resume PDF yet'}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-blue-500/[0.06] to-purple-500/[0.06] border border-blue-500/[0.1]">
        <h3 className="text-white font-semibold text-sm mb-3">🔗 Quick Links</h3>
        <div className="flex flex-wrap gap-3">
          <a href="/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 text-xs hover:text-blue-600 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/[0.08] transition-all">🌐 View Portfolio</a>
          <a href="https://github.com/Shivam-75" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 text-xs hover:text-blue-600 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/[0.08] transition-all">🐙 GitHub</a>
          <a href="https://www.npmjs.com/~shivam-75" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 text-xs hover:text-blue-600 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/[0.08] transition-all">📦 NPM</a>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, isLoggedIn, checking } = useAuth();
  const { portfolio, loading } = usePortfolio();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin | Dashboard";
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'shortcut icon';
    link.href = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛠️</text></svg>';
    document.getElementsByTagName('head')[0].appendChild(link);
  }, []);

  useEffect(() => {
    if (!checking && !isLoggedIn) navigate('/shivam/admin');
  }, [checking, isLoggedIn]);

  if (checking || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#070b14] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
          <p className="text-gray-400 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'messages': return <MessagesEditor />;
      case 'hero': return <HeroEditor />;
      case 'about': return <AboutEditor />;
      case 'projects': return <ProjectsEditor />;
      case 'education': return <EducationEditor />;
      case 'services': return <ServicesEditor />;
      case 'contact': return <ContactEditor />;
      case 'navbar': return <NavbarEditor />;
      case 'resume': return <ResumeEditor />;
      default: return <DashboardHome portfolio={portfolio} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#070b14] flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0f1e]/95 backdrop-blur-xl border-r border-gray-200 dark:border-white/[0.06] flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border border-blue-500/30 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm">Admin Panel</p>
              <p className="text-gray-500 text-[10px]">Portfolio Control</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            {MENU.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer text-left ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-blue-600/30 to-cyan-600/20 text-gray-900 dark:text-white border border-blue-500/20'
                    : 'text-gray-400 hover:text-blue-600 dark:hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span className={activeSection === item.id ? 'text-blue-400' : 'text-gray-500'}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/[0.06]">
          <div className="px-4 py-2 mb-3">
            <p className="text-white text-xs font-semibold">admin@shivam.dev</p>
            <p className="text-gray-500 text-[10px]">Administrator</p>
          </div>
          <div className="flex gap-2">
            <a href="/" className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white text-xs transition-all">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
              Portfolio
            </a>
            <button onClick={() => { logout(); navigate('/shivam/admin'); }} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs transition-all cursor-pointer">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 min-h-screen flex flex-col min-w-0 overflow-x-hidden">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center gap-4 px-6 py-4 bg-[#070b14]/90 backdrop-blur-xl border-b border-white/[0.06]">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-all cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Admin</span>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium capitalize">{MENU.find(m => m.id === activeSection)?.label}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-400 text-xs font-medium">Live</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-8 w-full">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
