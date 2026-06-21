import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { usePortfolio } from '../../../context/PortfolioContext';
import { AdminInput, AdminTextarea, SaveButton, SectionHeader, SuccessToast, useToast } from '../AdminComponents';

const AboutEditor = () => {
  const { authFetch } = useAuth();
  const { portfolio, fetchPortfolio } = usePortfolio();
  const [form, setForm] = useState(null);
  const { toast, showToast } = useToast();
  const [loadingStates, setLoadingStates] = useState({
    bio: false,
    skills: false,
    tools: false,
    timeline: false,
    quickInfo: false,
  });

  useEffect(() => {
    if (portfolio?.about) setForm({ ...portfolio.about });
  }, [portfolio]);

  const updateField = (f, v) => setForm(p => ({ ...p, [f]: v }));

  const updateSkills = (val) => {
    const parsed = val.split('\n').map(line => {
      const [name, level, color] = line.split('|').map(s => s.trim());
      return { name: name || '', level: parseInt(level) || 80, color: color || 'from-blue-500 to-cyan-400' };
    }).filter(s => s.name);
    setForm(p => ({ ...p, skills: parsed }));
  };

  const updateTools = (val) => {
    const parsed = val.split('\n').map(line => {
      const [name, icon, desc] = line.split('|').map(s => s.trim());
      return { name, icon: icon || '🔧', desc: desc || '' };
    }).filter(t => t.name);
    setForm(p => ({ ...p, tools: parsed }));
  };

  const updateTimeline = (val) => {
    const parsed = val.split('\n\n').map(block => {
      const lines = block.split('\n');
      return { year: lines[0] || '', title: lines[1] || '', desc: lines[2] || '' };
    }).filter(t => t.year);
    setForm(p => ({ ...p, timeline: parsed }));
  };

  const updateQuickInfo = (val) => {
    const parsed = val.split('\n').map(line => {
      const [label, value, icon] = line.split('|').map(s => s.trim());
      return { label, value: value || '', icon: icon || '•' };
    }).filter(q => q.label);
    setForm(p => ({ ...p, quickInfo: parsed }));
  };

  const handleSaveField = async (fieldsPayload, successMsg, key) => {
    setLoadingStates(prev => ({ ...prev, [key]: true }));
    try {
      const res = await authFetch('/api/portfolio/about', {
        method: 'PUT',
        body: JSON.stringify(fieldsPayload),
      });
      const data = await res.json();
      if (data.success) {
        showToast(successMsg);
        fetchPortfolio();
      } else {
        showToast(data.message || 'Save failed.');
      }
    } catch {
      showToast('Save failed.');
    } finally {
      setLoadingStates(prev => ({ ...prev, [key]: false }));
    }
  };

  if (!form) return <div className="text-gray-500 dark:text-gray-500 text-sm">Loading...</div>;

  return (
    <div>
      <SectionHeader title="About Section" subtitle="Bio, skills, tools, timeline edit karo" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>} />

      <div className="space-y-6">
        {/* Bio Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between items-start gap-3">
            <h3 className="text-gray-900 dark:text-white font-semibold text-sm">Biography</h3>
            <SaveButton 
              onClick={() => handleSaveField({ bio: form.bio, bio2: form.bio2, bio3: form.bio3 }, 'Biography saved!', 'bio')} 
              loading={loadingStates.bio} 
              label="Save Biography"
            />
          </div>
          <AdminTextarea label="Bio Paragraph 1" value={form.bio} onChange={(v) => updateField('bio', v)} rows={3} />
          <AdminTextarea label="Bio Paragraph 2" value={form.bio2} onChange={(v) => updateField('bio2', v)} rows={3} />
          <AdminTextarea label="Bio Paragraph 3" value={form.bio3} onChange={(v) => updateField('bio3', v)} rows={3} />
        </div>

        {/* Skills Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between items-start gap-3">
            <h3 className="text-gray-900 dark:text-white font-semibold text-sm">Skills</h3>
            <SaveButton 
              onClick={() => handleSaveField({ skills: form.skills }, 'Skills saved!', 'skills')} 
              loading={loadingStates.skills} 
              label="Save Skills"
            />
          </div>
          <AdminTextarea
            label="Skills — format: name|level(0-100)|gradient-color (one per line)"
            value={form.skills?.map(s => `${s.name}|${s.level}|${s.color}`).join('\n') || ''}
            onChange={updateSkills}
            rows={7}
            placeholder={'React / Next.js|90|from-blue-500 to-cyan-400\nNode.js / Express|88|from-green-400 to-emerald-500'}
          />
        </div>

        {/* Tools Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between items-start gap-3">
            <h3 className="text-gray-900 dark:text-white font-semibold text-sm">Tools</h3>
            <SaveButton 
              onClick={() => handleSaveField({ tools: form.tools }, 'Tools saved!', 'tools')} 
              loading={loadingStates.tools} 
              label="Save Tools"
            />
          </div>
          <AdminTextarea
            label="Tools — format: name|emoji|description (one per line)"
            value={form.tools?.map(t => `${t.name}|${t.icon}|${t.desc}`).join('\n') || ''}
            onChange={updateTools}
            rows={6}
            placeholder={'VS Code|💻|Primary IDE\nDocker|🐳|Containerization'}
          />
        </div>

        {/* Timeline Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between items-start gap-3">
            <h3 className="text-gray-900 dark:text-white font-semibold text-sm">Journey Timeline</h3>
            <SaveButton 
              onClick={() => handleSaveField({ timeline: form.timeline }, 'Journey timeline saved!', 'timeline')} 
              loading={loadingStates.timeline} 
              label="Save Timeline"
            />
          </div>
          <AdminTextarea
            label="Journey Timeline — format: year (line1), title (line2), desc (line3), then blank line between entries"
            value={form.timeline?.map(t => `${t.year}\n${t.title}\n${t.desc}`).join('\n\n') || ''}
            onChange={updateTimeline}
            rows={10}
            placeholder={'Jan 2026\nERP Operations Assistant\nAdministered academic ERP...'}
          />
        </div>

        {/* Quick Info Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between items-start gap-3">
            <h3 className="text-gray-900 dark:text-white font-semibold text-sm">Quick Info Cards</h3>
            <SaveButton 
              onClick={() => handleSaveField({ quickInfo: form.quickInfo }, 'Quick info saved!', 'quickInfo')} 
              loading={loadingStates.quickInfo} 
              label="Save Quick Info"
            />
          </div>
          <AdminTextarea
            label="Quick Info Cards — format: label|value|emoji (one per line)"
            value={form.quickInfo?.map(q => `${q.label}|${q.value}|${q.icon}`).join('\n') || ''}
            onChange={updateQuickInfo}
            rows={7}
            placeholder={'Name|Shivam Pandey|👤\nLocation|Gorakhpur, India|📍\nExperience|1+ Year|💼'}
          />
        </div>
      </div>

      {toast && <SuccessToast message={toast} onClose={() => {}} />}
    </div>
  );
};

export default AboutEditor;
