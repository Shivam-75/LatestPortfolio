import mongoose from "mongoose";

// ─── Project Sub-Schema ───────────────────────────────────────────────────────
const projectSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  longDescription: { type: String, default: "" },
  coverImage: { type: String, default: "" },
  location: { type: String, default: "" },
  date: { type: String, default: "" },
  screenshots: [{ url: { type: String, default: '' }, caption: { type: String, default: '' } }],
  tags: [{ type: String }],
  category: { type: String, default: "Full Stack" },
  color: { type: String, default: "from-blue-500/20 to-cyan-500/20" },
  accent: { type: String, default: "#60A5FA" },
  github: { type: String, default: "#" },
  live: { type: String, default: "#" },
  period: { type: String, default: "" },
});

// ─── Education Sub-Schema ────────────────────────────────────────────────────
const educationSchema = new mongoose.Schema({
  degree: { type: String, default: "" },
  field: { type: String, default: "" },
  institution: { type: String, default: "" },
  period: { type: String, default: "" },
  status: { type: String, default: "Completed" },
  grade: { type: String, default: "" },
  color: { type: String, default: "from-blue-500 to-cyan-400" },
  bgColor: { type: String, default: "from-blue-500/10 to-cyan-500/10" },
  icon: { type: String, default: "🎓" },
  highlights: [{ type: String }],
});

// ─── Certification Sub-Schema ────────────────────────────────────────────────
const certificationSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  issuer: { type: String, default: "" },
  year: { type: String, default: "" },
  icon: { type: String, default: "🏆" },
});

// ─── Skill Sub-Schema ────────────────────────────────────────────────────────
const skillSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  level: { type: Number, default: 80 },
  color: { type: String, default: "from-blue-500 to-cyan-400" },
});

// ─── Social Link Sub-Schema ──────────────────────────────────────────────────
const socialLinkSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  href: { type: String, default: "#" },
  icon: { type: String, default: "" }, // SVG string or icon name
});

// ─── Service Sub-Schema ──────────────────────────────────────────────────────
const serviceSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  features: [{ type: String }],
  color: { type: String, default: "from-blue-500 to-cyan-400" },
  bgColor: { type: String, default: "from-blue-500/10 to-cyan-500/10" },
  borderHover: { type: String, default: "hover:border-blue-500/30" },
});

// ─── Stat Sub-Schema ─────────────────────────────────────────────────────────
const statSchema = new mongoose.Schema({
  number: { type: String, default: "" },
  label: { type: String, default: "" },
});

// ─── Timeline Sub-Schema ─────────────────────────────────────────────────────
const timelineSchema = new mongoose.Schema({
  year: { type: String, default: "" },
  title: { type: String, default: "" },
  desc: { type: String, default: "" },
});

// ─── Tech Stack Sub-Schema ───────────────────────────────────────────────────
const techStackSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  color: { type: String, default: "#FFFFFF" },
});

// ─── Main Portfolio Schema ───────────────────────────────────────────────────
const portfolioSchema = new mongoose.Schema({
  // Hero / Home
  hero: {
    name: { type: String, default: "Shivam Pandey" },
    tagline: { type: String, default: "Full-Stack Developer | MERN Stack | NPM Open Source Contributor" },
    description: { type: String, default: "Full-Stack Developer with 1+ year of experience building production-grade MERN Stack apps." },
    profilePhoto: { type: String, default: "" }, // Cloudonix URL
    roles: [{ type: String }],
    stats: [statSchema],
    techStack: [techStackSchema],
    socialLinks: [socialLinkSchema],
    githubUrl: { type: String, default: "https://github.com/Shivam-75" },
    linkedinUrl: { type: String, default: "https://linkedin.com/in/shivam-75" },
    email: { type: String, default: "shivam6386000621@gmail.com" },
    phone: { type: String, default: "+91-6386000621" },
  },

  // About
  about: {
    bio: { type: String, default: "" },
    bio2: { type: String, default: "" },
    bio3: { type: String, default: "" },
    skills: [skillSchema],
    tools: [{
      name: { type: String },
      icon: { type: String },
      desc: { type: String },
    }],
    timeline: [timelineSchema],
    quickInfo: [{
      label: { type: String },
      value: { type: String },
      icon: { type: String },
    }],
  },

  // Projects
  projects: [projectSchema],

  // Education
  education: [educationSchema],
  certifications: [certificationSchema],
  codingStats: [statSchema],

  // Services
  services: [serviceSchema],

  // Contact
  contact: {
    email: { type: String, default: "shivam6386000621@gmail.com" },
    phone: { type: String, default: "+91-6386000621" },
    location: { type: String, default: "Gorakhpur, Uttar Pradesh, India" },
    available: { type: Boolean, default: true },
    availabilityText: { type: String, default: "I'm currently available for freelance work and full-time opportunities." },
  },

  // Navbar
  navbar: {
    brandName: { type: String, default: "Shivam" },
    links: [{ type: String }],
  },

  // Resume
  resume: {
    pdfUrl: { type: String, default: "" }, // Cloudonix URL
    lastUpdated: { type: Date, default: Date.now },
  },
}, { timestamps: true });

export default mongoose.model("Portfolio", portfolioSchema);
