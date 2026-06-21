import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { portfolio } = usePortfolio();
  const [activeImage, setActiveImage] = useState(null);

  // Find project — check DB projects
  let project = null;
  if (portfolio?.projects?.length) {
    project = portfolio.projects.find(
      (p) => p._id === id || String(p._id) === id,
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#070b14] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Project not found.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all">
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const screenshots = project.screenshots || [];

  return (
    <div className="min-h-screen bg-[#070b14] text-white">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.05] blur-[120px]"
          style={{
            background: "radial-gradient(circle, #3b82f6, transparent)",
            top: "-10%",
            left: "-5%",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px]"
          style={{
            background: "radial-gradient(circle, #8b5cf6, transparent)",
            bottom: "10%",
            right: "5%",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200 mb-8 group cursor-pointer">
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Projects
        </button>

        {/* Top Header & Cover Image Grid */}
        <div className="grid md:grid-cols-12 gap-8 items-center mb-12">
          {/* Left: Cover Image Card (Smaller height/width, with decorative corners) */}
          {project.coverImage && (
            <div className="md:col-span-5 lg:col-span-4 relative max-w-[320px] mx-auto md:mx-0">
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.02] shadow-2xl h-44 sm:h-52">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative corners */}
              <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-blue-500/30 rounded-tr-2xl pointer-events-none" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-2xl pointer-events-none" />
            </div>
          )}

          {/* Right: Description & Title */}
          <div
            className={`md:col-span-7 ${project.coverImage ? "lg:col-span-8" : "lg:col-span-12"} space-y-4`}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/[0.05] border border-white/[0.08] text-gray-300">
                {project.category}
              </span>
              {project.period && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  {project.period}
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
              {project.title}
            </h1>
            <p className="text-white font-semibold text-base leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Long Description */}
          <div className="lg:col-span-2">
            {project.longDescription && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-400 to-cyan-400 inline-block" />
                  About This Project
                </h2>
                <div className="space-y-4">
                  {project.longDescription
                    .split("\n")
                    .filter(Boolean)
                    .map((para, i) => (
                      <p
                        key={i}
                        className="text-white font-semibold text-base leading-relaxed">
                        {para}
                      </p>
                    ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {(project.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] text-gray-300 text-sm border border-white/[0.06] font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar: Meta Info + Links */}
          <div className="space-y-4">
            {/* Location & Date */}
            {(project.location || project.date) && (
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                {project.location && (
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📍</span>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-widest mb-0.5">
                        Location
                      </p>
                      <p className="text-white text-sm font-medium">
                        {project.location}
                      </p>
                    </div>
                  </div>
                )}
                {project.date && (
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📅</span>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-widest mb-0.5">
                        Date
                      </p>
                      <p className="text-white text-sm font-medium">
                        {project.date}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Links */}
            <div className="space-y-3">
              {project.live && project.live !== "#" && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-300">
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
                  Live Demo
                </a>
              )}
              {project.github && project.github !== "#" && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-gray-300 font-semibold text-sm hover:bg-white/[0.08] hover:text-white transition-all duration-300">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Screenshots Gallery */}
        {screenshots.length > 0 && (
          <div className="border-t border-white/[0.06] pt-12">
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-400 to-pink-400 inline-block" />
              Screenshots
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {screenshots.map((shot, index) => {
                const url = typeof shot === "string" ? shot : shot?.url;
                const caption = typeof shot === "string" ? "" : shot?.caption;
                if (!url) return null;
                return (
                  <div key={index} className="relative w-full">
                    <div
                      onClick={() => setActiveImage({ url, caption })}
                      className="relative rounded-2xl overflow-hidden border border-white/[0.06] shadow-xl hover:border-white/[0.12] hover:scale-[1.02] transition-all duration-300 aspect-[16/9] cursor-pointer"
                    >
                      <img
                        src={url}
                        alt={caption || `Screenshot ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {caption && (
                      <p className="text-gray-400 text-xs mt-2 text-justify italic px-2">
                        {caption}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        {activeImage && (
          <div
            className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setActiveImage(null)}>
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer text-xl"
              onClick={() => setActiveImage(null)}>
              ✕
            </button>

            <div
              className="relative max-w-[90vw] max-h-[80vh] flex flex-col items-center select-none"
              onClick={(e) => e.stopPropagation()}>
              <img
                src={activeImage.url}
                alt={activeImage.caption || "Preview"}
                className="max-w-full max-h-[70vh] object-contain rounded-lg border border-white/10 shadow-2xl"
              />
              {activeImage.caption && (
                <p className="text-gray-300 text-sm mt-4 text-center max-w-2xl px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md italic">
                  {activeImage.caption}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Bottom Back Button */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-300 hover:text-white hover:bg-white/[0.08] text-sm font-medium transition-all duration-300 cursor-pointer group">
            <svg
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
