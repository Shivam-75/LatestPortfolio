import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { usePortfolio } from '../../../context/PortfolioContext';
import { SectionHeader, SuccessToast, useToast } from '../AdminComponents';

const ResumeEditor = () => {
  const { portfolio, fetchPortfolio } = usePortfolio();
  const [pdfUrl, setPdfUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const { toast, showToast } = useToast();

  useEffect(() => {
    if (portfolio?.resume) setPdfUrl(portfolio.resume.pdfUrl || '');
  }, [portfolio]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Fix Windows registry issue where file.type can be empty for PDFs
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      showToast('Only PDF files allowed!');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/portfolio/upload?type=resume`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setPdfUrl(data.url);
        showToast('Resume uploaded via Cloudonix successfully!');
        fetchPortfolio();
      } else {
        showToast(data.message || 'Upload issue. Check CLOUDONIX_API_KEY in server .env');
      }
    } catch (err) {
      console.error(err);
      showToast('Upload error. Check connection.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <SectionHeader
        title="Resume Upload"
        subtitle="Upload your PDF resume to host it securely via Cloudonix."
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        }
      />

      <div className="space-y-6">
        {/* Cloudonix Upload */}
        <div className="p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06]">
          <h3 className="text-gray-900 dark:text-white font-semibold text-sm mb-4">📤 Upload PDF Resume</h3>
          <div className="flex items-center gap-4">
            <label className={`relative inline-flex items-center gap-3 px-6 py-3 rounded-xl text-gray-900 dark:text-white font-medium text-sm border cursor-pointer transition-all duration-300 ${uploading ? 'bg-gray-50 dark:bg-white/[0.03] border-gray-200 dark:border-white/[0.06] opacity-60' : 'bg-gradient-to-r from-blue-600/80 to-cyan-600/80 border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]'}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              {uploading ? 'Uploading to Cloudonix...' : 'Upload PDF Resume'}
              <input type="file" accept=".pdf" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
            {pdfUrl && (
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 text-sm hover:bg-white/[0.06] transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Preview
              </a>
            )}
          </div>
          <p className="text-gray-600 text-xs mt-3">⚠️ Cloudonix API key is configured on the backend server `.env`.</p>
        </div>

        {/* Current Status */}
        <div className="p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06]">
          <p className="text-gray-500 dark:text-gray-500 text-xs mb-1">Current Resume PDF:</p>
          {pdfUrl ? (
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:text-blue-300 transition-colors break-all">{pdfUrl}</a>
          ) : (
            <p className="text-gray-600 text-sm italic">No resume uploaded yet</p>
          )}
          {portfolio?.resume?.lastUpdated && (
            <p className="text-gray-600 text-xs mt-2">Last updated: {new Date(portfolio.resume.lastUpdated).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
          )}
        </div>
      </div>

      {toast && <SuccessToast message={toast} onClose={() => {}} />}
    </div>
  );
};

export default ResumeEditor;
