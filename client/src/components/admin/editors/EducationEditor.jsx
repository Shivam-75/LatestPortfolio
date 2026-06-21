import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { usePortfolio } from '../../../context/PortfolioContext';
import { AdminInput, AdminTextarea, SaveButton, SectionHeader, SuccessToast, useToast } from '../AdminComponents';

const emptyEdu = { degree: '', field: '', institution: '', period: '', status: 'Completed', grade: '', color: 'from-blue-500 to-cyan-400', bgColor: 'from-blue-500/10 to-cyan-500/10', icon: '🎓', highlights: [] };

const EducationEditor = () => {
  const { authFetch } = useAuth();
  const { portfolio, fetchPortfolio } = usePortfolio();
  const [education, setEducation] = useState([]);
  const [certs, setCerts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [addForm, setAddForm] = useState(emptyEdu);
  const [loading, setLoading] = useState(false);
  const { toast, showToast } = useToast();

  useEffect(() => {
    if (portfolio?.education) setEducation(portfolio.education);
    if (portfolio?.certifications) setCerts(portfolio.certifications);
  }, [portfolio]);

  const handleAdd = async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/portfolio/education', { method: 'POST', body: JSON.stringify(addForm) });
      const data = await res.json();
      if (data.success) { showToast('Education added!'); setAdding(false); setAddForm(emptyEdu); fetchPortfolio(); }
    } catch { showToast('Error.'); }
    finally { setLoading(false); }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await authFetch(`/api/portfolio/education/${editingId}`, { method: 'PUT', body: JSON.stringify(editForm) });
      const data = await res.json();
      if (data.success) { showToast('Education updated!'); setEditingId(null); fetchPortfolio(); }
    } catch { showToast('Error.'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this education entry?')) return;
    setLoading(true);
    try {
      const res = await authFetch(`/api/portfolio/education/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) { showToast('Deleted!'); fetchPortfolio(); }
    } catch { showToast('Error.'); }
    finally { setLoading(false); }
  };

  const saveCerts = async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/portfolio/certifications', { method: 'PUT', body: JSON.stringify(certs) });
      const data = await res.json();
      if (data.success) { showToast('Certifications saved!'); fetchPortfolio(); }
    } catch { showToast('Error.'); }
    finally { setLoading(false); }
  };

  const EduForm = ({ form, setForm, onSave, onCancel }) => (
    <div className="p-5 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-blue-500/20 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <AdminInput label="Degree" value={form.degree} onChange={(v) => setForm(p => ({ ...p, degree: v }))} />
        <AdminInput label="Field" value={form.field} onChange={(v) => setForm(p => ({ ...p, field: v }))} />
        <AdminInput label="Institution" value={form.institution} onChange={(v) => setForm(p => ({ ...p, institution: v }))} />
        <AdminInput label="Period" value={form.period} onChange={(v) => setForm(p => ({ ...p, period: v }))} placeholder="Aug 2023 – Jun 2026" />
        <AdminInput label="Grade/CGPA" value={form.grade} onChange={(v) => setForm(p => ({ ...p, grade: v }))} />
        <AdminInput label="Status" value={form.status} onChange={(v) => setForm(p => ({ ...p, status: v }))} />
        <AdminInput label="Icon (emoji)" value={form.icon} onChange={(v) => setForm(p => ({ ...p, icon: v }))} />
      </div>
      <AdminTextarea
        label="Highlights (one per line)"
        value={form.highlights?.join('\n') || ''}
        onChange={(v) => setForm(p => ({ ...p, highlights: v.split('\n').filter(Boolean) }))}
        rows={4}
      />
      <div className="flex gap-3 justify-end">
        <button onClick={onCancel} className="px-4 py-2 rounded-xl text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] hover:bg-white/[0.06] text-sm transition-all cursor-pointer">Cancel</button>
        <SaveButton onClick={onSave} loading={loading} label="Save" />
      </div>
    </div>
  );

  return (
    <div>
      <SectionHeader title="Education" subtitle="Education aur certifications manage karo" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" /></svg>} />

      {/* Education entries */}
      <div className="space-y-4 mb-8">
        {education.map((edu) => (
          <div key={edu._id}>
            {editingId === edu._id ? (
              <EduForm form={editForm} setForm={setEditForm} onSave={handleUpdate} onCancel={() => setEditingId(null)} />
            ) : (
              <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] hover:border-gray-300 dark:hover:border-gray-300 dark:border-white/[0.1] transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{edu.icon}</span>
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-semibold text-sm">{edu.degree}</h4>
                    <p className="text-gray-500 dark:text-gray-500 text-xs">{edu.institution} • {edu.period} • {edu.grade}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingId(edu._id); setEditForm({ ...edu }); }} className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 hover:bg-blue-500/20 transition-all cursor-pointer">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                  </button>
                  <button onClick={() => handleDelete(edu._id)} className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all cursor-pointer">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {adding ? (
          <EduForm form={addForm} setForm={setAddForm} onSave={handleAdd} onCancel={() => setAdding(false)} />
        ) : (
          <button onClick={() => setAdding(true)} className="w-full py-3.5 rounded-xl border border-dashed border-gray-300 dark:border-white/[0.1] text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-gray-900 dark:text-white hover:border-blue-500/30 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Add Education Entry
          </button>
        )}
      </div>

      {/* Certifications */}
      <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between items-start gap-3 mb-4">
          <h3 className="text-gray-900 dark:text-white font-semibold text-sm">Certifications & Recognition</h3>
          <SaveButton onClick={saveCerts} loading={loading} label="Save Certs" />
        </div>
        <div className="space-y-3">
          {certs.map((cert, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[60px_1.5fr_1fr_auto] gap-2 sm:gap-3 items-center p-4 sm:p-0 rounded-xl bg-gray-50/50 dark:bg-white/[0.01] sm:bg-transparent border border-gray-200/50 dark:border-white/[0.03] sm:border-0">
              <div className="flex sm:block items-center gap-2">
                <span className="text-[10px] text-gray-500 font-semibold uppercase sm:hidden">Icon:</span>
                <input value={cert.icon || ''} onChange={(e) => { const c = [...certs]; c[i] = { ...c[i], icon: e.target.value }; setCerts(c); }} className="w-full sm:w-auto px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-900 dark:text-white text-sm focus:outline-none text-center" placeholder="🏆" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 font-semibold uppercase sm:hidden">Name:</span>
                <input value={cert.name || ''} onChange={(e) => { const c = [...certs]; c[i] = { ...c[i], name: e.target.value }; setCerts(c); }} className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-900 dark:text-white text-sm focus:outline-none" placeholder="Cert name" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 font-semibold uppercase sm:hidden">Issuer:</span>
                <input value={cert.issuer || ''} onChange={(e) => { const c = [...certs]; c[i] = { ...c[i], issuer: e.target.value }; setCerts(c); }} className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-900 dark:text-white text-sm focus:outline-none" placeholder="Issuer" />
              </div>
              <div className="flex justify-end pt-2 sm:pt-0">
                <button onClick={() => setCerts(certs.filter((_, idx) => idx !== i))} className="w-full sm:w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-all cursor-pointer py-1.5 sm:py-0">
                  <span className="sm:hidden text-xs font-semibold mr-1">Remove Entry</span>✕
                </button>
              </div>
            </div>
          ))}
          <button onClick={() => setCerts([...certs, { name: '', issuer: '', year: new Date().getFullYear().toString(), icon: '🏆' }])} className="w-full py-2 rounded-xl border border-dashed border-gray-200 dark:border-white/[0.08] text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-gray-900 dark:text-white text-sm transition-all cursor-pointer">+ Add Certification</button>
        </div>
      </div>

      {toast && <SuccessToast message={toast} onClose={() => {}} />}
    </div>
  );
};

export default EducationEditor;
