import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { usePortfolio } from "../../../context/PortfolioContext";
import {
  AdminInput,
  AdminTextarea,
  SaveButton,
  SectionHeader,
  SuccessToast,
  useToast,
} from "../AdminComponents";

const emptyProject = {
  title: "",
  description: "",
  longDescription: "",
  coverImage: "",
  location: "",
  date: "",
  screenshots: [],
  tags: [],
  category: "Full Stack",
  color: "from-blue-500/20 to-cyan-500/20",
  accent: "#60A5FA",
  github: "#",
  live: "#",
  period: "",
};

// ─── Image Manager Component ────────────────────────────────────────────────────
const ImageManager = ({ screenshots = [], onChange }) => {
  const [uploading, setUploading] = useState(null); // index of uploading image
  const [bulkUploading, setBulkUploading] = useState(false);
  const [bulkProgress, setBulkProgress] = useState({ current: 0, total: 0 });

  const addImage = () => {
    onChange([...screenshots, { url: "", caption: "" }]);
  };

  const removeImage = (index) => {
    const updated = screenshots.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateImage = (index, field, value) => {
    const updated = screenshots.map((s, i) =>
      i === index ? { ...s, [field]: value } : s,
    );
    onChange(updated);
  };

  const handleUpload = async (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed!");
      return;
    }
    setUploading(index);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(
        `${API_URL}/api/portfolio/upload?type=screenshot`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        },
      );
      const data = await res.json();
      if (data.success && data.url) {
        updateImage(index, "url", data.url);
      } else {
        alert(data.message || "Upload failed. Check Cloudonix API key.");
      }
    } catch {
      alert("Upload error.");
    } finally {
      setUploading(null);
    }
  };

  const handleBulkUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Check file types
    const invalidFile = files.find((f) => !f.type.startsWith("image/"));
    if (invalidFile) {
      alert("Only image files are allowed!");
      return;
    }

    setBulkUploading(true);
    setBulkProgress({ current: 0, total: files.length });

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const uploadedImages = [];

    // Process files sequentially to avoid Render free tier timeouts and failures
    for (let i = 0; i < files.length; i++) {
      setBulkProgress({ current: i + 1, total: files.length });
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch(
          `${API_URL}/api/portfolio/upload?type=screenshot`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
          },
        );
        const data = await res.json();
        if (data.success && data.url) {
          const baseName =
            file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
          uploadedImages.push({ url: data.url, caption: baseName });
        } else {
          console.error(`Failed to upload ${file.name}:`, data.message);
        }
      } catch (err) {
        console.error(`Error uploading ${file.name}:`, err);
      }
    }

    if (uploadedImages.length > 0) {
      onChange([...screenshots, ...uploadedImages]);
    }

    setBulkUploading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between items-start gap-2 mb-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
          Screenshots with Captions
        </p>
        <div className="flex items-center gap-2">
          <label
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/80 text-white text-xs font-medium hover:bg-cyan-500 hover:shadow-[0_0_15px_rgba(8,145,178,0.2)] transition-all cursor-pointer ${bulkUploading ? "opacity-50 cursor-not-allowed" : ""}`}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            {bulkUploading
              ? `Uploading ${bulkProgress.current}/${bulkProgress.total}...`
              : "Upload Multiple"}
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleBulkUpload}
              disabled={bulkUploading}
            />
          </label>
          <button
            type="button"
            onClick={addImage}
            disabled={bulkUploading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/80 text-white text-xs font-medium hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Image
          </button>
        </div>
      </div>

      {screenshots.length === 0 && (
        <p className="text-gray-600 text-xs italic py-3 text-center border border-dashed border-white/[0.08] rounded-xl">
          No screenshots added yet. Click "Add Image" or "Upload Multiple" to
          start.
        </p>
      )}

      {screenshots.map((shot, index) => (
        <div
          key={index}
          className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">
              Image #{index + 1}
            </span>
            <button
              type="button"
              disabled={bulkUploading || uploading !== null}
              onClick={() => removeImage(index)}
              className="w-6 h-6 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 flex items-center justify-center transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Image Preview */}
          {shot.url && (
            <div className="rounded-lg overflow-hidden border border-white/[0.06] max-h-40">
              <img
                src={shot.url}
                alt={`Screenshot ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            <label
              className={`relative flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border cursor-pointer transition-all whitespace-nowrap ${uploading === index ? "bg-white/[0.02] border-white/[0.06] text-gray-500 opacity-60" : "bg-blue-600/70 border-blue-500/30 text-white hover:bg-blue-500/80"}`}>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              {uploading === index ? "Uploading..." : "Upload"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleUpload(index, e)}
                disabled={uploading !== null || bulkUploading}
              />
            </label>
            <input
              type="url"
              value={shot.url || ""}
              disabled={bulkUploading}
              onChange={(e) => updateImage(index, "url", e.target.value)}
              placeholder="Or paste image URL..."
              className="flex-1 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white text-xs placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-all min-w-0 disabled:opacity-50"
            />
          </div>

          {/* Caption / Description 2 */}
          <textarea
            value={shot.caption || ""}
            disabled={bulkUploading}
            onChange={(e) => updateImage(index, "caption", e.target.value)}
            placeholder="Caption / Description 2 — yeh text image ke neeche dikhega..."
            rows={2}
            className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white text-xs placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-all resize-none disabled:opacity-50"
          />
        </div>
      ))}
    </div>
  );
};

// ─── Image Upload Input (for single image fields like Cover Image) ────────────
const ImageUploadInput = ({ label, value, onChange }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed!");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/portfolio/upload?type=cover`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        onChange(data.url);
      } else {
        alert(data.message || "Upload failed. Check Cloudonix API key.");
      }
    } catch {
      alert("Upload error.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
        {label}
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <label
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border cursor-pointer transition-all whitespace-nowrap shrink-0 ${
            uploading
              ? "bg-white/[0.02] border-white/[0.06] text-gray-500 opacity-60"
              : "bg-blue-600/70 border-blue-500/30 text-white hover:bg-blue-500/80"
          }`}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          {uploading ? "Uploading..." : "Upload Image"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
        <input
          type="url"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ya URL paste karo..."
          className="flex-1 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white text-xs placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-all min-w-0"
        />
      </div>
      {value && (
        <div className="rounded-lg overflow-hidden border border-white/[0.06] max-h-32">
          <img
            src={value}
            alt="Cover preview"
            className="w-full h-full object-cover"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>
      )}
    </div>
  );
};

// ─── Project Form ───────────────────────────────────────────────────────────────
const ProjectForm = ({ project, onSave, onCancel, loading }) => {
  const [form, setForm] = useState({
    ...project,
    screenshots: (project.screenshots || []).map((s) =>
      typeof s === "string" ? { url: s, caption: "" } : s,
    ),
    // Store tags as raw text for free editing
    _tagsRaw: project.tags?.join(", ") || "",
  });
  const set = (f, v) => setForm((p) => ({ ...p, [f]: v }));

  const handleTagsChange = (val) => {
    // Store raw input as-is so commas can be typed freely
    set("_tagsRaw", val);
    // Parse tags by comma, trim whitespace, keep non-empty ones
    const parsed = val.split(",").map((t) => t.trim()).filter(Boolean);
    set("tags", parsed);
  };

  const handleSaveForm = () => {
    // Final parse before save — strip trailing empty
    const finalTags = (form._tagsRaw || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    onSave({ ...form, tags: finalTags });
  };

  return (
    <div className="p-5 rounded-2xl bg-white/[0.03] border border-blue-500/20 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <AdminInput
          label="Title"
          value={form.title}
          onChange={(v) => set("title", v)}
        />
        <div className="flex flex-col">
          <label className="block text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-widest mb-1.5">Category</label>
          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/[0.03] transition-all duration-300"
          >
            <option value="Full Stack" className="bg-[#070b14] text-white">Full Stack</option>
            <option value="Frontend" className="bg-[#070b14] text-white">Frontend</option>
            <option value="Backend" className="bg-[#070b14] text-white">Backend</option>
            <option value="Android" className="bg-[#070b14] text-white">Android</option>
          </select>
        </div>
        <AdminInput
          label="Period"
          value={form.period}
          onChange={(v) => set("period", v)}
          placeholder="May – Jun 2026"
        />
        <AdminInput
          label="Accent Color"
          value={form.accent}
          onChange={(v) => set("accent", v)}
          placeholder="#60A5FA"
        />
        <AdminInput
          label="GitHub URL"
          value={form.github}
          onChange={(v) => set("github", v)}
        />
        <AdminInput
          label="Live URL"
          value={form.live}
          onChange={(v) => set("live", v)}
        />
      </div>

      <AdminTextarea
        label="Description (Short)"
        value={form.description}
        onChange={(v) => set("description", v)}
        rows={3}
      />
      <AdminTextarea
        label="Long Description (Detail page mein dikhega)"
        value={form.longDescription}
        onChange={(v) => set("longDescription", v)}
        rows={5}
        placeholder="Poora project ka description yahan daalo..."
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <ImageUploadInput
          label="Cover Image"
          value={form.coverImage}
          onChange={(v) => set("coverImage", v)}
        />
        <AdminInput
          label="Location"
          value={form.location}
          onChange={(v) => set("location", v)}
          placeholder="Gorakhpur, UP"
        />
        <AdminInput
          label="Date"
          value={form.date}
          onChange={(v) => set("date", v)}
          placeholder="15 / 10 / 2025"
        />
        <AdminInput
          label="Card Gradient"
          value={form.color}
          onChange={(v) => set("color", v)}
          placeholder="from-blue-500/20 to-cyan-500/20"
        />
      </div>

      {/* Dynamic Image Manager */}
      <ImageManager
        screenshots={form.screenshots}
        onChange={(shots) => set("screenshots", shots)}
      />

      <AdminTextarea
        label="Tags (comma separated)"
        value={form._tagsRaw ?? ""}
        onChange={handleTagsChange}
        rows={2}
        placeholder="React.js, Node.js, MongoDB, JWT, Android Studio"
      />

      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-xl text-gray-400 hover:text-white bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] text-sm transition-all cursor-pointer">
          Cancel
        </button>
        <SaveButton
          onClick={handleSaveForm}
          loading={loading}
          label="Save Project"
        />
      </div>
    </div>
  );
};

// ─── Main ProjectsEditor ────────────────────────────────────────────────────────
const ProjectsEditor = () => {
  const { authFetch } = useAuth();
  const { portfolio, fetchPortfolio } = usePortfolio();
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast, showToast } = useToast();

  useEffect(() => {
    if (portfolio?.projects) setProjects(portfolio.projects);
  }, [portfolio]);

  const handleAdd = async (form) => {
    setLoading(true);
    try {
      const res = await authFetch("/api/portfolio/projects", {
        method: "POST",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Project added!");
        setAdding(false);
        fetchPortfolio();
      }
    } catch {
      showToast("Error adding project.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, form) => {
    setLoading(true);
    try {
      const res = await authFetch(`/api/portfolio/projects/${id}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Project updated!");
        setEditingId(null);
        fetchPortfolio();
      }
    } catch {
      showToast("Error updating.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    setLoading(true);
    try {
      const res = await authFetch(`/api/portfolio/projects/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showToast("Project deleted!");
        fetchPortfolio();
      }
    } catch {
      showToast("Delete failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SectionHeader
        title="Projects"
        subtitle="Projects add, edit ya delete karo"
        icon={
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        }
      />

      <div className="space-y-5">
        {/* Add New */}
        {adding ? (
          <ProjectForm
            project={emptyProject}
            onSave={handleAdd}
            onCancel={() => setAdding(false)}
            loading={loading}
          />
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="w-full py-3 rounded-2xl border-2 border-dashed border-white/[0.08] text-gray-500 hover:border-blue-500/40 hover:text-blue-400 transition-all text-sm font-medium flex items-center justify-center gap-2 cursor-pointer">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add New Project
          </button>
        )}

        {/* Existing Projects */}
        {projects.map((proj) =>
          editingId === proj._id ? (
            <ProjectForm
              key={proj._id}
              project={proj}
              onSave={(form) => handleUpdate(proj._id, form)}
              onCancel={() => setEditingId(null)}
              loading={loading}
            />
          ) : (
            <div
              key={proj._id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] transition-all">
              <div className="min-w-0 w-full sm:w-auto">
                <p className="text-white font-semibold text-sm truncate">
                  {proj.title}
                </p>
                <p className="text-gray-500 text-xs mt-0.5 truncate">
                  {proj.category} · {proj.period}
                </p>
                {proj.screenshots?.length > 0 && (
                  <p className="text-blue-400 text-xs mt-1">
                    {proj.screenshots.length} screenshot
                    {proj.screenshots.length > 1 ? "s" : ""}
                  </p>
                )}
              </div>
              <div className="flex gap-2 shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                <button
                  onClick={() => setEditingId(proj._id)}
                  className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white text-xs transition-all cursor-pointer">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(proj._id)}
                  className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs transition-all cursor-pointer">
                  Delete
                </button>
              </div>
            </div>
          ),
        )}

        {projects.length === 0 && !adding && (
          <p className="text-center text-gray-600 text-sm py-6">
            Koi projects nahi hain. Upar "Add New Project" pe click karo.
          </p>
        )}
      </div>

      {toast && <SuccessToast message={toast} onClose={() => {}} />}
    </div>
  );
};

export default ProjectsEditor;
