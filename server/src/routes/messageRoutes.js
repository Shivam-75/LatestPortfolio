import express from "express";
import { createMessage, getMessages, deleteMessage } from "../controller/messageController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", createMessage);
router.get("/", auth, getMessages);
router.delete("/:id", auth, deleteMessage);

export default router;
