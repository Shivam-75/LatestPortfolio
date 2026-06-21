import heroAvatar from "../../assets/shivam-photo.jpg";
import { usePortfolio } from "../../context/PortfolioContext";

const About = () => {
  const { portfolio } = usePortfolio();
  const about = portfolio?.about;

  const skills = about?.skills || [];
  const tools = about?.tools || [];
  const timeline = about?.timeline || [];
  const quickInfo = about?.quickInfo || [];
  const bio = about?.bio || "";
  const bio2 = about?.bio2 || "";
  const bio3 = about?.bio3 || "";

  const profilePhoto = portfolio?.hero?.profilePhoto;
  const techStack = portfolio?.hero?.techStack || [];

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px]"
          style={{
            background: "radial-gradient(circle, #8b5cf6, transparent)",
            top: "20%",
            right: "5%",
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-[0.03] blur-[80px]"
          style={{
            background: "radial-gradient(circle, #3b82f6, transparent)",
            bottom: "10%",
            left: "10%",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Get To Know Me
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A passionate developer who loves turning ideas into reality through
            clean code and creative design.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left - Image & Timeline */}
          <div className="lg:w-5/12">
            {/* Image Card */}
            <div className="relative mb-10">
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/[0.08] bg-white/[0.02]">
                <img
                  src={profilePhoto || heroAvatar}
                  alt="Shivam"
                  className="w-full aspect-square object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent" />

                {/* Overlay info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-bold mb-1">
                    Shivam Pandey
                  </h3>
                  <p className="text-gray-300 text-sm">Full Stack Developer</p>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-blue-500/30 rounded-tr-2xl" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-2xl" />
            </div>

            {/* Journey Timeline */}
            <div className="space-y-1">
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#60A5FA"
                    strokeWidth="2.5"
                    strokeLinecap="round">
                    <path d="M12 8v4l3 3" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </span>
                My Journey
              </h3>
              {timeline.map((item, i) => (
                <div key={item.year} className="flex gap-4 group">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_10px_rgba(59,130,246,0.4)] group-hover:scale-125 transition-transform duration-300" />
                    {i < timeline.length - 1 && (
                      <div className="w-px flex-1 bg-gray-200 dark:bg-white/[0.08] my-1" />
                    )}
                  </div>
                  <div className="pb-6">
                    <span className="text-blue-400 text-xs font-semibold">
                      {item.year}
                    </span>
                    <h4 className="text-white text-sm font-semibold mt-0.5">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - About, Skills & Tools Stack */}
          <div className="lg:w-7/12 space-y-10">
            {/* About Section */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-white/[0.06]">
                <p className="text-gray-300 leading-relaxed mb-4">{bio}</p>
                <p className="text-gray-400 leading-relaxed mb-4">{bio2}</p>
                <p className="text-gray-400 leading-relaxed">{bio3}</p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickInfo.map((info) => (
                  <div
                    key={info.label}
                    className="p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] hover:bg-gray-100 dark:hover:bg-white/[0.04] hover:border-gray-300 dark:hover:border-white/[0.1] transition-all duration-300 group">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{info.icon}</span>
                      <div>
                        <p className="text-gray-500 text-xs">{info.label}</p>
                        <p className="text-white text-sm font-medium">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            {techStack.length > 0 && (
              <div className="space-y-5 pt-8 border-t border-gray-200 dark:border-white/[0.08]">
                <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F472B6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </span>
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-3">
                  {techStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] hover:bg-white/[0.06] hover:border-gray-300 dark:hover:border-white/[0.12] transition-all duration-300 cursor-default">
                      <span
                        className="w-2 h-2 rounded-full transition-shadow duration-300"
                        style={{
                          backgroundColor: tech.color,
                          boxShadow: `0 0 0 0 ${tech.color}00`,
                        }}
                      />
                      <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors duration-300">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tools Section */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
