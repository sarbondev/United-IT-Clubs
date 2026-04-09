import express from "express";
import {
  createNewCourse,
  deleteCourse,
  getAllCourses,
  getOneCourse,
  updateCourse,
} from "./course.controller.js";
import isExisted from "../../shared/auth/auth.middleware.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id", getOneCourse);
router.post("/create", isExisted, createNewCourse);
router.put("/update/:id", isExisted, updateCourse);
router.delete("/delete/:id", isExisted, deleteCourse);

export default router;
