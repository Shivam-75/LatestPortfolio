import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { usePortfolio } from '../../../context/PortfolioContext';
import { AdminInput, AdminTextarea, SaveButton, SectionHeader, SuccessToast, useToast } from '../AdminComponents';

const ServicesEditor = () => {
  const { authFetch } = useAuth();
  const { portfolio, fetchPortfolio } = usePortfolio();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast, showToast } = useToast();

  useEffect(() => {
    if (portfolio?.services) setServices([...portfolio.services]);
  }, [portfolio]);

  const updateService = (i, field, val) => {
    const s = [...services];
    s[i] = { ...s[i], [field]: val };
    setServices(s);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/portfolio/services', { method: 'PUT', body: JSON.stringify(services) });
      const data = await res.json();
      if (data.success) { showToast('Services saved!'); fetchPortfolio(); }
    } catch { showToast('Save failed.'); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <SectionHeader title="Services" subtitle="Service cards edit karo" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>} />

      <div className="space-y-5">
        {services.map((service, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-900 dark:text-white font-semibold text-sm">Service {i + 1}</h3>
              <button onClick={() => setServices(services.filter((_, idx) => idx !== i))} className="w-7 h-7 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-all cursor-pointer text-sm">×</button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <AdminInput label="Title" value={service.title} onChange={(v) => updateService(i, 'title', v)} />
              <AdminInput label="Gradient Color" value={service.color} onChange={(v) => updateService(i, 'color', v)} placeholder="from-blue-500 to-cyan-400" />
            </div>
            <AdminTextarea label="Description" value={service.description} onChange={(v) => updateService(i, 'description', v)} rows={2} />
            <AdminTextarea
              label="Features (one per line)"
              value={service.features?.join('\n') || ''}
              onChange={(v) => updateService(i, 'features', v.split('\n').filter(Boolean))}
              rows={4}
            />
            <div className="flex justify-end pt-2">
              <SaveButton onClick={handleSave} loading={loading} label="Save Service" />
            </div>
          </div>
        ))}
        <button
          onClick={() => setServices([...services, { title: '', description: '', features: [], color: 'from-blue-500 to-cyan-400', bgColor: 'from-blue-500/10 to-cyan-500/10', borderHover: 'hover:border-blue-500/30' }])}
          className="w-full py-3.5 rounded-xl border border-dashed border-gray-300 dark:border-white/[0.1] text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-gray-900 dark:text-white hover:border-blue-500/30 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Add Service
        </button>
      </div>

      <div className="flex justify-end mt-6">
        <SaveButton onClick={handleSave} loading={loading} />
      </div>
      {toast && <SuccessToast message={toast} onClose={() => {}} />}
    </div>
  );
};

export default ServicesEditor;
