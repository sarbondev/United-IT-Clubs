import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createApp } from "./src/app/create-app.js";
import { connectDatabase } from "./src/config/database.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Auto-create uploads folder if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = createApp();

const PORT = process.env.PORT || 3000;
connectDatabase(process.env.MONGODB_URI)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`server is running on port http://localhost:${PORT}`),
    ),
  )
  .catch((error) => console.log("mongodb error: " + error));
