import { useState } from 'react';

// Reusable input component for admin editors
export const AdminInput = ({ label, value, onChange, type = 'text', placeholder = '' }) => (
  <div>
    <label className="block text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-widest mb-1.5">{label}</label>
    <input
      type={type}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/[0.03] transition-all duration-300"
    />
  </div>
);

export const AdminTextarea = ({ label, value, onChange, rows = 4, placeholder = '' }) => (
  <div>
    <label className="block text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-widest mb-1.5">{label}</label>
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/[0.03] transition-all duration-300 resize-none"
    />
  </div>
);

export const SaveButton = ({ onClick, loading, label = 'Save Changes' }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-gray-900 dark:text-white font-semibold text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:scale-105 disabled:opacity-60 disabled:hover:scale-100 cursor-pointer"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl" />
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <span className="relative z-10 flex items-center gap-2">
      {loading ? (
        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
      )}
      {loading ? 'Saving...' : label}
    </span>
  </button>
);

export const SectionHeader = ({ title, subtitle, icon }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center text-blue-400">
        {icon}
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
    </div>
    {subtitle && <p className="text-gray-500 dark:text-gray-500 text-sm ml-13">{subtitle}</p>}
  </div>
);

export const SuccessToast = ({ message, onClose }) => (
  <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 shadow-[0_10px_40px_rgba(16,185,129,0.2)] animate-fade-in-up">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
    <p className="text-emerald-400 text-sm font-medium">{message}</p>
    <button onClick={onClose} className="text-emerald-600 hover:text-emerald-400 transition-colors cursor-pointer ml-2">✕</button>
  </div>
);

export const useToast = () => {
  const [toast, setToast] = useState(null);
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };
  return { toast, showToast };
};
