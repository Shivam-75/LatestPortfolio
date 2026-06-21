import express from "express";
import auth from "../middleware/auth.js";
import {
  getPortfolioData,
  updateHero,
  updateAbout,
  getProjects, addProject, updateProject, deleteProject,
  addEducation, updateEducation, deleteEducation,
  updateCertifications,
  updateServices,
  updateContact,
  updateNavbar,
  updateResume,
  uploadFile, upload,
  updateCodingStats,
} from "../controller/portfolioController.js";

const router = express.Router();

// Public
router.get("/", getPortfolioData);

// Protected (admin only)
router.put("/hero", auth, updateHero);
router.put("/about", auth, updateAbout);

router.get("/projects", getProjects);
router.post("/projects", auth, addProject);
router.put("/projects/:id", auth, updateProject);
router.delete("/projects/:id", auth, deleteProject);

router.post("/education", auth, addEducation);
router.put("/education/:id", auth, updateEducation);
router.delete("/education/:id", auth, deleteEducation);
router.put("/certifications", auth, updateCertifications);
router.put("/coding-stats", auth, updateCodingStats);

router.put("/services", auth, updateServices);
router.put("/contact", auth, updateContact);
router.put("/navbar", auth, updateNavbar);
router.put("/resume", auth, updateResume);

// File upload
router.post("/upload", auth, upload.single("file"), uploadFile);

export default router;
