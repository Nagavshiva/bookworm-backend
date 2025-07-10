import express from "express";
import cors from "cors";
import "dotenv/config";
import job from "./config/cron.js";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

import { connectDB } from "./config/db.js";

const app = express();
// Increase payload limit (e.g., 10MB)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
const PORT = process.env.PORT || 3000;

job.start();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});