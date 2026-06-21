import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(null);
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin | Login";
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'shortcut icon';
    link.href = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔑</text></svg>';
    document.getElementsByTagName('head')[0].appendChild(link);
  }, []);

  useEffect(() => {
    if (isLoggedIn) navigate('/admin/dashboard');
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setError(result.message || 'Invalid credentials. Please try again.');
      }
    } catch {
      setError('Server error. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#040810] via-[#070b14] to-[#0a0f1e] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[120px] animate-pulse-slow" style={{ background: 'radial-gradient(circle, #3b82f6, transparent)', top: '-10%', left: '-10%' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[100px] animate-pulse-slow" style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)', bottom: '-5%', right: '-5%', animationDelay: '1s' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full opacity-[0.04] blur-[80px]" style={{ background: 'radial-gradient(circle, #06b6d4, transparent)', top: '50%', left: '60%' }} />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 mb-5 shadow-[0_0_40px_rgba(59,130,246,0.15)]">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Admin Portal</h1>
          <p className="text-gray-500 text-sm">Shivam Pandey — Portfolio Control Center</p>
        </div>

        {/* Card */}
        <div className="relative p-8 rounded-3xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
          {/* Top gradient line */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent rounded-full" />

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-widest mb-2">Email Address</label>
              <div className={`relative flex items-center rounded-xl border transition-all duration-300 ${focused === 'email' ? 'border-blue-500/50 bg-blue-500/[0.04] shadow-[0_0_0_3px_rgba(59,130,246,0.1)]' : 'border-white/[0.08] bg-white/[0.03]'}`}>
                <div className="pl-4 text-gray-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="Enter admin email"
                  className="w-full px-4 py-3.5 bg-transparent text-gray-900 dark:text-white text-sm placeholder-gray-600 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-widest mb-2">Password</label>
              <div className={`relative flex items-center rounded-xl border transition-all duration-300 ${focused === 'password' ? 'border-blue-500/50 bg-blue-500/[0.04] shadow-[0_0_0_3px_rgba(59,130,246,0.1)]' : 'border-white/[0.08] bg-white/[0.03]'}`}>
                <div className="pl-4 text-gray-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3.5 bg-transparent text-gray-900 dark:text-white text-sm placeholder-gray-600 focus:outline-none"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="pr-4 text-gray-500 dark:text-gray-500 hover:text-gray-300 transition-colors">
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full py-4 rounded-xl text-gray-900 dark:text-white font-semibold text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-b from-white/15 to-transparent" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>
                    Sign in to Dashboard
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Bottom info */}
          <div className="mt-8 pt-6 border-t border-white/[0.05] text-center">
            <p className="text-gray-600 text-xs">Protected Admin Area • Shivam Pandey Portfolio</p>
          </div>
        </div>

        {/* Back to portfolio link */}
        <div className="text-center mt-6">
          <a href="/" className="text-gray-500 text-sm hover:text-gray-300 transition-colors duration-300 flex items-center justify-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5" /><polyline points="12 19 5 12 12 5" /></svg>
            Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
