import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { usePortfolio } from '../../../context/PortfolioContext';
import { AdminInput, AdminTextarea, SaveButton, SectionHeader, SuccessToast, useToast } from '../AdminComponents';

const ContactEditor = () => {
  const { authFetch } = useAuth();
  const { portfolio, fetchPortfolio } = usePortfolio();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast, showToast } = useToast();

  useEffect(() => {
    if (portfolio?.contact) setForm({ ...portfolio.contact });
  }, [portfolio]);

  const set = (f, v) => setForm(p => ({ ...p, [f]: v }));

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/portfolio/contact', { method: 'PUT', body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) { showToast('Contact info saved!'); fetchPortfolio(); }
    } catch { showToast('Save failed.'); }
    finally { setLoading(false); }
  };

  if (!form) return <div className="text-gray-500 dark:text-gray-500 text-sm">Loading...</div>;

  return (
    <div>
      <SectionHeader title="Contact Information" subtitle="Contact page ka data edit karo" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>} />

      <div className="p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <AdminInput label="Email" value={form.email} onChange={(v) => set('email', v)} type="email" />
          <AdminInput label="Phone" value={form.phone} onChange={(v) => set('phone', v)} />
          <div className="sm:col-span-2">
            <AdminInput label="Location" value={form.location} onChange={(v) => set('location', v)} />
          </div>
        </div>
        <AdminTextarea label="Availability Message" value={form.availabilityText} onChange={(v) => set('availabilityText', v)} rows={3} />
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${form.available ? 'bg-emerald-500' : 'bg-white/10'}`} onClick={() => set('available', !form.available)}>
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${form.available ? 'left-7' : 'left-1'}`} />
            </div>
            <span className="text-gray-700 dark:text-gray-300 text-sm">{form.available ? '🟢 Currently Available' : '🔴 Not Available'}</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <SaveButton onClick={handleSave} loading={loading} />
      </div>
      {toast && <SuccessToast message={toast} onClose={() => {}} />}
    </div>
  );
};

export default ContactEditor;
