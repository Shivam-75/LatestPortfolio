import { usePortfolio } from '../../context/PortfolioContext';

const defaultIcon = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);

const Services = () => {
  const { portfolio } = usePortfolio();

  // Map DB services — add default icon/colors if missing
  const colorPalettes = [
    { color: 'from-blue-500 to-cyan-400', bgColor: 'from-blue-500/10 to-cyan-500/10', borderHover: 'hover:border-blue-500/30' },
    { color: 'from-purple-500 to-pink-400', bgColor: 'from-purple-500/10 to-pink-500/10', borderHover: 'hover:border-purple-500/30' },
    { color: 'from-emerald-500 to-teal-400', bgColor: 'from-emerald-500/10 to-teal-500/10', borderHover: 'hover:border-emerald-500/30' },
    { color: 'from-orange-500 to-yellow-400', bgColor: 'from-orange-500/10 to-yellow-500/10', borderHover: 'hover:border-orange-500/30' },
  ];

  const services = portfolio?.services?.length
    ? portfolio.services.map((s, i) => ({
        ...s,
        icon: defaultIcon,
        color: s.color || colorPalettes[i % colorPalettes.length].color,
        bgColor: s.bgColor || colorPalettes[i % colorPalettes.length].bgColor,
        borderHover: s.borderHover || colorPalettes[i % colorPalettes.length].borderHover,
      }))
    : [];



  const process = [
    { step: '01', title: 'Discovery', desc: 'Understanding your requirements, goals, and target audience', icon: '🔍' },
    { step: '02', title: 'Planning', desc: 'Creating wireframes, tech stack decisions, and project roadmap', icon: '📋' },
    { step: '03', title: 'Development', desc: 'Building the application with clean, maintainable code', icon: '⚡' },
    { step: '04', title: 'Delivery', desc: 'Testing, optimization, deployment, and ongoing support', icon: '🚀' },
  ];

  return (
    <section id="service" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px]" style={{ background: 'radial-gradient(circle, #06b6d4, transparent)', top: '10%', right: '10%' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-[0.03] blur-[100px]" style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)', bottom: '15%', left: '5%' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">
            What I Do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I offer comprehensive web development services to help bring your ideas to life with modern technologies.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 gap-5 mb-20">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] ${service.borderHover} transition-all duration-500 hover:-translate-y-1 overflow-hidden`}
            >
              {/* Hover glow background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.bgColor} border border-gray-200 dark:border-white/[0.08] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <span className={`bg-gradient-to-r ${service.color} bg-clip-text`} style={{ color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                    <span style={{ color: 'inherit' }}>{service.icon}</span>
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-white text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{service.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span key={feature} className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] text-gray-700 dark:text-gray-300 text-xs font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Corner decoration */}
              <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br ${service.bgColor} opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-2xl`} />
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              My Work{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Process</span>
            </h3>
            <p className="text-gray-400 text-sm max-w-lg mx-auto">How I approach every project from concept to completion</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {process.map((item, index) => (
              <div key={item.step} className="group relative text-center p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] hover:bg-gray-100 dark:hover:bg-white/[0.04] hover:border-gray-300 dark:hover:border-white/[0.1] transition-all duration-300">
                {/* Step number */}
                <span className="absolute top-4 right-4 text-4xl font-black text-white/[0.03] group-hover:text-white/[0.06] transition-colors duration-300">
                  {item.step}
                </span>

                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h4 className="text-white text-sm font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>

                {/* Connector line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 border-t border-dashed border-white/[0.1]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
