import "dotenv/config";
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import Db from "./src/database/Db.js";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./src/routes/authRoutes.js";
import portfolioRoutes from "./src/routes/portfolioRoutes.js";
import messageRoutes from "./src/routes/messageRoutes.js";
import { seedAdmin } from "./src/controller/authController.js";

const PORT = process.env.PORT || 5000;
const app = express();
app.disable("etag");

app.use(
  cors({
    origin: (origin, callback) => {
      // Dynamically allow the request origin to support credentials (cookies)
      callback(null, origin || true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);
app.use(compression());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  return res.send("🚀 Shivam Portfolio API is running!");
});

Db().then(async () => {
  await seedAdmin();
  app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`),
  );
});
