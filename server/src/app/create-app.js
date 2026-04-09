import express from "express";
import cors from "cors";
import { registerRoutes } from "./register-routes.js";
import uploadFiles from "../shared/files/upload-files.js";
import { removeFiles } from "../shared/files/remove-files.js";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use("/api/uploads", express.static("uploads"));
  app.use("/uploads", express.static("uploads"));

  registerRoutes(app);

  app.post("/api/upload", (req, res) => uploadFiles(req, res));
  app.post("/api/removeFile", (req, res) => removeFiles(req, res));

  return app;
}
