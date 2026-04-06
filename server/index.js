import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import serviceRoutes from "./routes/serviceRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

import cors from "cors";
import uploadFiles from "./middlewares/uploadFiles.js";
import { removeFiles } from "./middlewares/removeFiles.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Auto-create uploads folder if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/uploads", express.static("uploads"));

app.get("/", (_, res) => res.send("Welcome home route!"));
app.use("/api/services", serviceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/team", teamRoutes);

app.use("/uploads", express.static("uploads"));

app.post("/api/upload", (req, res) => uploadFiles(req, res));
app.post("/api/removeFile", (req, res) => removeFiles(req, res));

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`server is running on port http://localhost:${PORT}`),
    ),
  )
  .catch((error) => console.log("mongodb error: " + error));
