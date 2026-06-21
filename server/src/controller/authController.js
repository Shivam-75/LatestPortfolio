import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import Portfolio from "../models/Portfolio.js";
import { getDefaultPortfolioData } from "../utils/defaultData.js";

// ─── Seed Admin + Portfolio if not exists ────────────────────────────────────
export const seedAdmin = async () => {
  try {
    const portfolioDoc = await Portfolio.findOne();
    if (!portfolioDoc) {
      await Portfolio.create(getDefaultPortfolioData());
      console.log("✅ Default portfolio data seeded.");
    } else {
      // Ensure arrays are populated if empty (re-seed missing data)
      let updated = false;
      const defaults = getDefaultPortfolioData();
      if (!portfolioDoc.projects?.length) {
        portfolioDoc.projects = defaults.projects;
        updated = true;
      }
      if (!portfolioDoc.education?.length) {
        portfolioDoc.education = defaults.education;
        updated = true;
      }
      if (!portfolioDoc.certifications?.length) {
        portfolioDoc.certifications = defaults.certifications;
        updated = true;
      }
      if (!portfolioDoc.codingStats?.length) {
        portfolioDoc.codingStats = defaults.codingStats;
        updated = true;
      }
      if (!portfolioDoc.services?.length) {
        portfolioDoc.services = defaults.services;
        updated = true;
      }
      if (!portfolioDoc.about?.bio) {
        Object.assign(portfolioDoc.about, defaults.about);
        portfolioDoc.markModified("about");
        updated = true;
      }
      if (!portfolioDoc.hero?.roles?.length) {
        portfolioDoc.hero.roles = defaults.hero.roles;
        portfolioDoc.hero.stats = defaults.hero.stats;
        portfolioDoc.hero.techStack = defaults.hero.techStack;
        portfolioDoc.hero.socialLinks = defaults.hero.socialLinks;
        portfolioDoc.markModified("hero");
        updated = true;
      }
      if (!portfolioDoc.navbar?.links?.length) {
        portfolioDoc.navbar.links = defaults.navbar.links;
        portfolioDoc.markModified("navbar");
        updated = true;
      }
      if (updated) {
        await portfolioDoc.save();
        console.log("✅ Portfolio data re-seeded with missing defaults.");
      }
    }

    // Seed admin if it doesn't exist to match dashboard credentials
    const adminDoc = await Admin.findOne({ email: "admin@shivam.dev" });
    if (!adminDoc) {
      const hashedPassword = await bcrypt.hash("Shivam@Admin2026", 10);
      await Admin.create({
        email: "admin@shivam.dev",
        password: hashedPassword
      });
      console.log("✅ Admin admin@shivam.dev seeded.");
    }
  } catch (err) {
    console.error("Seed error:", err.message);
  }
};

seedAdmin();
// ─── Login ───────────────────────────────────────────────────────────────────
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and password required." });

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("shivamtoken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.json({ success: true, token, message: "Login successful." });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Logout ──────────────────────────────────────────────────────────────────
export const logout = (req, res) => {
  res.clearCookie("shivamtoken", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });
  return res.json({ success: true, message: "Logged out successfully." });
};

// ─── Verify Token ─────────────────────────────────────────────────────────────
export const verifyToken = (req, res) => {
  return res.json({ success: true, admin: req.admin });
};
