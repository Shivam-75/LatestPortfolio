import { usePortfolio } from '../../context/PortfolioContext';

const Education = () => {
  const { portfolio } = usePortfolio();

  const education = portfolio?.education || [];
  const certifications = portfolio?.certifications || [];
  const codingStats = portfolio?.codingStats || [];


  return (
    <section id="education" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px]" style={{ background: 'radial-gradient(circle, #3b82f6, transparent)', top: '15%', left: '5%' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full opacity-[0.03] blur-[80px]" style={{ background: 'radial-gradient(circle, #a855f7, transparent)', bottom: '20%', right: '10%' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Academic Background
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Education</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My academic journey and professional certifications that have shaped my skills.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left - Education Timeline */}
          <div className="lg:w-7/12">
            <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
                </svg>
              </span>
              Education
            </h3>

            <div className="space-y-5">
              {education.map((edu, index) => (
                <div key={edu.degree} className="group relative flex gap-5">
                  {/* Timeline */}
                  <div className="flex flex-col items-center pt-1">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${edu.color} shadow-lg group-hover:scale-125 transition-transform duration-300 shrink-0`} />
                    {index < education.length - 1 && <div className="w-px flex-1 bg-gray-200 dark:bg-white/[0.08] mt-2" />}
                  </div>

                  {/* Card */}
                  <div className="flex-1 pb-5">
                    <div className={`p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] hover:bg-gray-100 dark:hover:bg-white/[0.04] hover:border-gray-300 dark:hover:border-white/[0.1] transition-all duration-300 overflow-hidden relative`}>
                      {/* Hover glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${edu.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{edu.icon}</span>
                            <div>
                              <h4 className="text-white font-semibold text-sm">{edu.degree}</h4>
                              <p className="text-gray-400 text-xs mt-0.5">{edu.field}</p>
                            </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${edu.status === 'Pursuing' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/[0.04] text-gray-600 dark:text-gray-400 border border-white/[0.06]'}`}>
                            {edu.status}
                          </span>
                        </div>

                        {/* Info */}
                        <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                            {edu.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                            {edu.grade}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                            {edu.institution}
                          </span>
                        </div>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-1.5">
                          {edu.highlights.map((item) => (
                            <span key={item} className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-white/[0.04] text-gray-600 dark:text-gray-400 text-xs border border-white/[0.06]">{item}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Certifications */}
          <div className="lg:w-5/12">
            <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              </span>
              Certifications
            </h3>

            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.name} className="group p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] hover:bg-gray-100 dark:hover:bg-white/[0.04] hover:border-gray-300 dark:hover:border-white/[0.1] transition-all duration-300 flex items-center gap-4">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{cert.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm font-semibold truncate">{cert.name}</h4>
                    <p className="text-gray-400 text-xs mt-0.5">{cert.issuer}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/[0.04] text-gray-600 dark:text-gray-400 text-xs border border-gray-200 dark:border-white/[0.06] font-medium shrink-0">{cert.year}</span>
                </div>
              ))}
            </div>

            {/* Fun Stats */}
            <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-blue-500/[0.06] to-purple-500/[0.06] border border-white/[0.06]">
              <h4 className="text-white font-semibold text-sm mb-4">Coding Stats</h4>
              <div className="grid grid-cols-2 gap-3">
                {codingStats.map((stat) => (
                  <div key={stat.label} className="text-center p-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-white/[0.05]">
                    <span className="text-lg">{stat.icon}</span>
                    <p className="text-white text-lg font-bold mt-1">{stat.value || stat.number}</p>
                    <p className="text-gray-500 text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
