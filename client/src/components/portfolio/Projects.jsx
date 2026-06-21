import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePortfolio } from "../../context/PortfolioContext";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);
  const navigate = useNavigate();
  const { portfolio } = usePortfolio();

  const filters = ["All", "Full Stack", "Frontend", "Backend"];

  // Default icon for projects from DB (no icon stored)
  const defaultIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );

  const projects = portfolio?.projects?.length
    ? portfolio.projects.map((p, i) => ({
        ...p,
        id: p._id || i,
        icon: defaultIcon,
      }))
    : [];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="project"
      className="relative pt-10 pb-24 lg:pt-12 lg:pb-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[120px]"
          style={{
            background: "radial-gradient(circle, #3b82f6, transparent)",
            top: "30%",
            left: "-5%",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.03] blur-[100px]"
          style={{
            background: "radial-gradient(circle, #8b5cf6, transparent)",
            bottom: "20%",
            right: "5%",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of projects that showcase my skills in full-stack
            development, design, and problem-solving.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-10 px-4">
          <div className="flex flex-wrap justify-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-blue-600/80 to-cyan-600/80 text-white shadow-lg shadow-blue-500/20"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                }`}>
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden hover:border-white/[0.12] transition-all duration-500 hover:-translate-y-1"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}>
              {/* Card Top Gradient / Cover Image */}
              <div
                className={`h-44 relative flex items-center justify-center bg-cover bg-center overflow-hidden`}
                style={{
                  backgroundImage: project.coverImage
                    ? `url(${project.coverImage})`
                    : "none",
                }}>
                {/* Fallback gradient if no cover image */}
                {!project.coverImage && (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color}`}
                  />
                )}

                {/* Dark overlay for cover image readability */}
                {project.coverImage && (
                  <div className="absolute inset-0 bg-[#070b14]/50 backdrop-blur-[0.5px] transition-all duration-300 group-hover:bg-[#070b14]/30" />
                )}

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl bg-white/[0.08] backdrop-blur-sm border border-white/[0.1] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 relative z-10"
                  style={{ color: project.accent }}>
                  {project.icon}
                </div>

                {/* Category badge */}
                <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] font-medium border border-white/[0.08] z-10">
                  {project.category}
                </span>

                {/* Hover overlay links */}
                <div
                  className={`absolute inset-0 bg-black/60 backdrop-blur-sm hidden md:flex items-center justify-center gap-3 transition-opacity duration-300 z-20 ${hoveredId === project.id ? "opacity-100" : "opacity-0"}`}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200 cursor-pointer"
                    title="GitHub">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200 cursor-pointer"
                    title="Live Demo">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                  <button
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-blue-500/40 hover:border-blue-400/50 transition-all duration-200 cursor-pointer"
                    title="More Details">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 pt-2">
                <h3 className="text-white text-lg font-semibold mb-1 group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-2 line-clamp-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] text-gray-400 text-xs border border-white/[0.06] font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Mobile action buttons (visible on mobile/tablet, hidden on desktop) */}
                <div className="flex md:hidden items-center gap-2 mt-4 pt-4 border-t border-white/[0.06]">
                  {project.github && project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-gray-300 text-xs font-semibold hover:bg-white/[0.08] transition-colors duration-200">
                      GitHub
                    </a>
                  )}
                  {project.live && project.live !== "#" && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold shadow-md">
                      Live
                    </a>
                  )}
                  <button
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/[0.08] border border-white/[0.1] text-white text-xs font-semibold">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
