import express from "express";
import {
  createNewProject,
  deleteProject,
  getAllProjects,
  getOneProject,
  updateProject,
} from "./project.controller.js";
import isExisted from "../../shared/auth/auth.middleware.js";

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", getOneProject);
router.post("/create", isExisted, createNewProject);
router.put("/update/:id", isExisted, updateProject);
router.delete("/delete/:id", isExisted, deleteProject);

export default router;
