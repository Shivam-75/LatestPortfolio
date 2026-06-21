import React, { useState } from "react";

const ProjectDetailsModal = ({ project, isOpen, onClose }) => {
  const [activeImage, setActiveImage] = useState(null);
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-6xl max-h-[90vh] bg-white dark:bg-[#0c1220] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-white/[0.08]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/[0.08]">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
            {project.title}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/[0.05] flex items-center justify-center text-gray-500 dark:text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/[0.1] hover:text-gray-900 dark:hover:text-white transition-all">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="flex flex-col lg:flex-row gap-8 mb-10">
            {/* Left: Cover Image */}
            <div className="lg:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-white/[0.05]">
                {project.coverImage ? (
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <div className="w-full aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 flex items-center justify-center">
                    <span className="text-blue-500 dark:text-blue-400 font-semibold text-lg">
                      No Cover Image
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Description & Meta */}
            <div className="lg:w-1/2 space-y-6">
              <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                {project.longDescription ? (
                  project.longDescription.split("\n").map((paragraph, idx) => (
                    <p key={idx} className="mb-4">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p>{project.description}</p>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-white/[0.08]">
                {project.location && (
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-red-500">📍</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Location:
                    </span>{" "}
                    {project.location}
                  </div>
                )}
                {project.date && (
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-blue-500">📅</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Date:
                    </span>{" "}
                    {project.date}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                {project.live && project.live !== "#" && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 text-gray-900 dark:text-white font-medium hover:bg-blue-700 hover:shadow-lg transition-all">
                    Live Demo
                  </a>
                )}
                {project.github && project.github !== "#" && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-xl bg-gray-200 dark:bg-white/[0.05] text-gray-800 dark:text-white font-medium border border-gray-300 dark:border-white/[0.1] hover:bg-gray-300 dark:hover:bg-white/[0.1] transition-all flex items-center gap-2">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Source Code
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Screenshots Grid */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="border-t border-gray-200 dark:border-white/[0.08] pt-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Screenshots
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.screenshots.map((shot, index) => {
                  const url = typeof shot === "string" ? shot : shot?.url;
                  const caption = typeof shot === "string" ? "" : shot?.caption;
                  if (!url) return null;
                  return (
                    <div key={index} className="relative">
                      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-white/[0.05] shadow-sm hover:shadow-md transition-shadow group">
                        <img
                          src={url}
                          alt={caption || `Screenshot ${index + 1}`}
                          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      {caption && (
                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 text-justify italic px-2">
                          {caption}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 cursor-zoom-out"
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
    </div>
  );
};

export default ProjectDetailsModal;
