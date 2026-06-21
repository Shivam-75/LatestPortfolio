import express from "express";
import { login, logout, verifyToken } from "../controller/authController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", auth, verifyToken);

export default router;
