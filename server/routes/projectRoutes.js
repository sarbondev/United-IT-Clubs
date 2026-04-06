import express from "express";
import {
  createNewProject,
  deleteProject,
  getAllProjects,
  getOneProject,
  updateProject,
} from "../controllers/projectController.js";
import isExisted from "../middlewares/isExisted.js";

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", getOneProject);
router.post("/create", isExisted, createNewProject);
router.put("/update/:id", isExisted, updateProject);
router.delete("/delete/:id", isExisted, deleteProject);

export default router;
