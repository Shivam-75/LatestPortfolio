import { useRef } from 'react';

const ResumeViewer = ({ isOpen, onClose, pdfUrl }) => {
  const resumeRef = useRef(null);

  const handleDownload = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
      return;
    }
    const printContent = resumeRef.current;
    if (!printContent) return;
    const win = window.open('', '_blank');
    win.document.write(`
      <html>
        <head>
          <title>Shivam - Resume</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Inter', sans-serif; background: #fff; color: #1a1a2e; padding: 40px; }
            .resume-container { max-width: 800px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #3b82f6; }
            .header h1 { font-size: 28px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
            .header .role { font-size: 14px; color: #3b82f6; font-weight: 500; margin-bottom: 10px; }
            .header .contact-row { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; font-size: 12px; color: #64748b; }
            .header .contact-row span { display: flex; align-items: center; gap: 4px; }
            .section { margin-bottom: 22px; }
            .section-title { font-size: 14px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 1.5px; padding-bottom: 6px; border-bottom: 1.5px solid #e2e8f0; margin-bottom: 12px; }
            .section-content { font-size: 13px; line-height: 1.7; color: #334155; }
            .exp-item { margin-bottom: 14px; }
            .exp-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px; }
            .exp-title { font-weight: 600; color: #0f172a; font-size: 14px; }
            .exp-date { font-size: 12px; color: #64748b; font-weight: 500; }
            .exp-sub { font-size: 13px; color: #3b82f6; font-weight: 500; margin-bottom: 4px; }
            ul { padding-left: 18px; }
            ul li { margin-bottom: 3px; font-size: 13px; color: #475569; }
            .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
            .skill-cat { font-size: 13px; }
            .skill-cat strong { color: #0f172a; }
            .projects-grid { display: grid; gap: 10px; }
            .project-item { padding: 8px 0; }
            .project-name { font-weight: 600; color: #0f172a; font-size: 13px; }
            .project-desc { font-size: 12px; color: #64748b; margin-top: 2px; }
            .project-tech { font-size: 11px; color: #3b82f6; margin-top: 3px; }
            @media print {
              body { padding: 20px; }
              @page { margin: 0.5in; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    win.document.close();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl mx-4 flex flex-col rounded-2xl overflow-hidden border border-gray-300 dark:border-white/[0.1] shadow-2xl" style={{ height: '85vh' }}>
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-[#0c1220] border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Resume</h3>
              <p className="text-gray-400 text-xs">Shivam — Full Stack Developer</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-gray-900 dark:text-white text-xs font-semibold hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {pdfUrl ? 'Open PDF' : 'Download PDF'}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.08] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/[0.1] transition-all duration-300 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-hidden relative bg-[#0a0f18] flex items-center justify-center p-6">
          {pdfUrl ? (
            <div className="text-center p-8 rounded-2xl bg-white dark:bg-white/[0.02] border border-white/[0.05]">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4 text-blue-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Resume is Ready</h3>
              <p className="text-gray-400 text-sm max-w-md mb-6">Your resume has been uploaded successfully. Click the button below or in the top right to view it.</p>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-gray-900 dark:text-white text-sm font-semibold hover:bg-blue-500 transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]"
              >
                Open PDF
              </button>
            </div>
          ) : (
            <div className="text-center p-8 rounded-2xl bg-white dark:bg-white/[0.02] border border-white/[0.05]">
              <div className="w-16 h-16 rounded-full bg-white dark:bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mx-auto mb-4 text-gray-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Resume Not Found</h3>
              <p className="text-gray-400 text-sm max-w-md">The resume PDF has not been uploaded yet. Please check back later or contact directly.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;
