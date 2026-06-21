import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { usePortfolio } from '../../../context/PortfolioContext';
import { AdminInput, SaveButton, SectionHeader, SuccessToast, useToast } from '../AdminComponents';

const NavbarEditor = () => {
  const { authFetch } = useAuth();
  const { portfolio, fetchPortfolio } = usePortfolio();
  const [brandName, setBrandName] = useState('');
  const [links, setLinks] = useState([]);
  const [loadingBrand, setLoadingBrand] = useState(false);
  const [loadingLinks, setLoadingLinks] = useState(false);
  const { toast, showToast } = useToast();

  useEffect(() => {
    if (portfolio?.navbar) {
      setBrandName(portfolio.navbar.brandName || '');
      setLinks(portfolio.navbar.links || []);
    }
  }, [portfolio]);

  const handleSaveBrand = async () => {
    setLoadingBrand(true);
    try {
      const res = await authFetch('/api/portfolio/navbar', {
        method: 'PUT',
        body: JSON.stringify({ brandName }),
      });
      const data = await res.json();
      if (data.success) { showToast('Brand Name updated!'); fetchPortfolio(); }
    } catch { showToast('Save failed.'); }
    finally { setLoadingBrand(false); }
  };

  const handleSaveLinks = async () => {
    setLoadingLinks(true);
    try {
      const res = await authFetch('/api/portfolio/navbar', {
        method: 'PUT',
        body: JSON.stringify({ links }),
      });
      const data = await res.json();
      if (data.success) { showToast('Navigation Links updated!'); fetchPortfolio(); }
    } catch { showToast('Save failed.'); }
    finally { setLoadingLinks(false); }
  };

  return (
    <div>
      <SectionHeader title="Navbar Editor" subtitle="Brand name aur navigation links change karo" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>} />

      <div className="space-y-6">
        {/* Brand Name */}
        <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between items-start gap-3">
            <h3 className="text-gray-900 dark:text-white font-semibold text-sm">Brand Logo</h3>
            <SaveButton onClick={handleSaveBrand} loading={loadingBrand} label="Save Brand Name" />
          </div>
          <AdminInput label="Brand Name (Logo Text)" value={brandName} onChange={setBrandName} placeholder="Shivam" />
        </div>

        {/* Nav Links */}
        <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between items-start gap-3 mb-4">
            <h3 className="text-gray-900 dark:text-white font-semibold text-sm">Navigation Links</h3>
            <SaveButton onClick={handleSaveLinks} loading={loadingLinks} label="Save Links" />
          </div>
          <div className="space-y-2 mb-4">
            {links.map((link, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-100 dark:bg-white/[0.04] text-gray-500 dark:text-gray-500 text-xs shrink-0">{i + 1}</span>
                <input
                  value={link}
                  onChange={(e) => { const l = [...links]; l[i] = e.target.value; setLinks(l); }}
                  className="flex-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500/30 transition-all"
                  placeholder="Home"
                />
                <button onClick={() => setLinks(links.filter((_, idx) => idx !== i))} className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-all cursor-pointer shrink-0">×</button>
                {/* Up/Down */}
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button onClick={() => { if (i === 0) return; const l = [...links]; [l[i-1], l[i]] = [l[i], l[i-1]]; setLinks(l); }} className="text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-gray-900 dark:text-white transition-colors cursor-pointer leading-none text-xs">▲</button>
                  <button onClick={() => { if (i === links.length-1) return; const l = [...links]; [l[i], l[i+1]] = [l[i+1], l[i]]; setLinks(l); }} className="text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-gray-900 dark:text-white transition-colors cursor-pointer leading-none text-xs">▼</button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setLinks([...links, ''])} className="w-full py-2.5 rounded-xl border border-dashed border-gray-200 dark:border-white/[0.08] text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-gray-900 dark:text-white text-sm transition-all cursor-pointer flex items-center justify-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Add Link
          </button>
          <p className="text-gray-600 text-xs mt-3">ℹ️ Link name lowercase karke section ID se match hona chahiye (e.g. "About" → #about)</p>
        </div>
      </div>

      {toast && <SuccessToast message={toast} onClose={() => {}} />}
    </div>
  );
};

export default NavbarEditor;
