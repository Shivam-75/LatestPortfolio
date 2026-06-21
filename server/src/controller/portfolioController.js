import Portfolio from "../models/Portfolio.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Cloudonix from "cloudonix";

// Initialize Cloudonix SDK lazily
let cloudonixUploader = null;
const getUploader = () => {
  if (!cloudonixUploader) {
    cloudonixUploader = new Cloudonix({
      api_key: process.env.CLOUDONIX_API_KEY || "dummy_key"
    });
  }
  return cloudonixUploader;
};

// ─── Disk Storage — files saved to /uploads, deleted after Cloudonix upload ───
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, "../../uploads");
// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    const ext = path.extname(file.originalname);
    cb(null, `upload-${unique}${ext}`);
  },
});

export const upload = multer({ storage: diskStorage });

// ─── Helper: get or create portfolio ─────────────────────────────────────────
const getPortfolio = async () => {
  let portfolio = await Portfolio.findOne();
  if (!portfolio) portfolio = await Portfolio.create({});
  return portfolio;
};

// ─── GET full portfolio data (public) ────────────────────────────────────────
export const getPortfolioData = async (req, res) => {
  try {
    const portfolio = await getPortfolio();
    res.json({ success: true, data: portfolio });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── PUT hero section ─────────────────────────────────────────────────────────
export const updateHero = async (req, res) => {
  try {
    const portfolio = await getPortfolio();
    Object.assign(portfolio.hero, req.body);
    portfolio.markModified("hero");
    await portfolio.save();
    res.json({ success: true, data: portfolio.hero, message: "Hero updated." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── PUT about section ────────────────────────────────────────────────────────
export const updateAbout = async (req, res) => {
  try {
    const portfolio = await getPortfolio();
    Object.assign(portfolio.about, req.body);
    portfolio.markModified("about");
    await portfolio.save();
    res.json({ success: true, data: portfolio.about, message: "About updated." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Projects CRUD ────────────────────────────────────────────────────────────
export const getProjects = async (req, res) => {
  const portfolio = await getPortfolio();
  res.json({ success: true, data: portfolio.projects });
};

export const addProject = async (req, res) => {
  try {
    const portfolio = await getPortfolio();
    portfolio.projects.push(req.body);
    await portfolio.save();
    res.json({ success: true, data: portfolio.projects, message: "Project added." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const portfolio = await getPortfolio();
    const project = portfolio.projects.id(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found." });
    Object.assign(project, req.body);
    await portfolio.save();
    res.json({ success: true, data: portfolio.projects, message: "Project updated." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const portfolio = await getPortfolio();
    portfolio.projects = portfolio.projects.filter(p => p._id.toString() !== req.params.id);
    await portfolio.save();
    res.json({ success: true, message: "Project deleted." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Education CRUD ───────────────────────────────────────────────────────────
export const addEducation = async (req, res) => {
  try {
    const portfolio = await getPortfolio();
    portfolio.education.push(req.body);
    await portfolio.save();
    res.json({ success: true, data: portfolio.education, message: "Education added." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const portfolio = await getPortfolio();
    const edu = portfolio.education.id(req.params.id);
    if (!edu) return res.status(404).json({ success: false, message: "Education not found." });
    Object.assign(edu, req.body);
    await portfolio.save();
    res.json({ success: true, data: portfolio.education, message: "Education updated." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const portfolio = await getPortfolio();
    portfolio.education = portfolio.education.filter(e => e._id.toString() !== req.params.id);
    await portfolio.save();
    res.json({ success: true, message: "Education deleted." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Certifications CRUD ─────────────────────────────────────────────────────
export const updateCertifications = async (req, res) => {
  try {
    const portfolio = await getPortfolio();
    portfolio.certifications = req.body;
    portfolio.markModified("certifications");
    await portfolio.save();
    res.json({ success: true, data: portfolio.certifications, message: "Certifications updated." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Services ────────────────────────────────────────────────────────────────
export const updateServices = async (req, res) => {
  try {
    const portfolio = await getPortfolio();
    portfolio.services = req.body;
    portfolio.markModified("services");
    await portfolio.save();
    res.json({ success: true, message: "Services updated." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Contact ─────────────────────────────────────────────────────────────────
export const updateContact = async (req, res) => {
  try {
    const portfolio = await getPortfolio();
    Object.assign(portfolio.contact, req.body);
    portfolio.markModified("contact");
    await portfolio.save();
    res.json({ success: true, data: portfolio.contact, message: "Contact updated." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Navbar ──────────────────────────────────────────────────────────────────
export const updateNavbar = async (req, res) => {
  try {
    const portfolio = await getPortfolio();
    Object.assign(portfolio.navbar, req.body);
    portfolio.markModified("navbar");
    await portfolio.save();
    res.json({ success: true, data: portfolio.navbar, message: "Navbar updated." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Resume PDF update ───────────────────────────────────────────────────────
export const updateResume = async (req, res) => {
  try {
    const portfolio = await getPortfolio();
    if (req.body.pdfUrl) portfolio.resume.pdfUrl = req.body.pdfUrl;
    portfolio.resume.lastUpdated = new Date();
    portfolio.markModified("resume");
    await portfolio.save();
    res.json({ success: true, data: portfolio.resume, message: "Resume updated." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── File Upload (saves to disk, uploads to Cloudonix, then deletes local copy) ───────
export const uploadFile = async (req, res) => {
  let localFilePath = null;
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded." });

    localFilePath = req.file.path;
    const type = req.query.type || "image"; // "image", "resume", "screenshot", "cover"

    console.log(`Uploading file ${req.file.originalname} (${req.file.mimetype}) to Cloudonix...`);

    // Convert local file to Blob as required by the Cloudonix SDK
    const fileBuffer = fs.readFileSync(localFilePath);
    const blobFile = new Blob([fileBuffer], { type: req.file.mimetype });

    // Upload to Cloudonix
    const response = await getUploader().upload(blobFile);

    // Delete local temporary file
    if (localFilePath && fs.existsSync(localFilePath)) {
      try {
        fs.unlinkSync(localFilePath);
      } catch (cleanupErr) {
        console.error("Error deleting temporary file:", cleanupErr.message);
      }
    }

    if (!response.success) {
      return res.status(500).json({
        success: false,
        message: `Cloudonix upload failed: ${response.error || "Unknown SDK error"}`
      });
    }

    // Extract path from Cloudonix response structure (both root level and nested 'data' level)
    const apiData = response.data || {};
    const innerData = apiData.data || {};
    const rawPath = apiData.imageUrl || apiData.pdfUrl || apiData.videoUrl || apiData.fileUrl || apiData.url ||
                    innerData.imageUrl || innerData.pdfUrl || innerData.videoUrl || innerData.fileUrl || innerData.url;

    if (!rawPath) {
      return res.status(500).json({
        success: false,
        message: "No URL returned from Cloudonix upload.",
        data: response.data
      });
    }

    // Convert relative path to absolute URL
    let fileUrl = rawPath;
    if (!rawPath.startsWith("http://") && !rawPath.startsWith("https://")) {
      const storageHost = "https://cloudonix-tb41.onrender.com";
      fileUrl = rawPath.startsWith("/") ? `${storageHost}${rawPath}` : `${storageHost}/${rawPath}`;
    }

    // Save URL to portfolio based on type
    if (type === "image") {
      const portfolio = await getPortfolio();
      portfolio.hero.profilePhoto = fileUrl;
      portfolio.markModified("hero");
      await portfolio.save();
    } else if (type === "resume") {
      const portfolio = await getPortfolio();
      portfolio.resume.pdfUrl = fileUrl;
      portfolio.resume.lastUpdated = new Date();
      portfolio.markModified("resume");
      await portfolio.save();
    }

    res.json({ success: true, url: fileUrl, message: "File uploaded to Cloudonix successfully." });
  } catch (err) {
    // Delete local temporary file if error occurs
    if (localFilePath && fs.existsSync(localFilePath)) {
      try {
        fs.unlinkSync(localFilePath);
      } catch (cleanupErr) {
        console.error("Cleanup error in catch block:", cleanupErr.message);
      }
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Coding Stats ─────────────────────────────────────────────────────────────
export const updateCodingStats = async (req, res) => {
  try {
    const portfolio = await getPortfolio();
    portfolio.codingStats = req.body;
    portfolio.markModified("codingStats");
    await portfolio.save();
    res.json({ success: true, message: "Coding stats updated." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
