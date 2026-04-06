import express from "express";
import {
  createNewCourse,
  deleteCourse,
  getAllCourses,
  getOneCourse,
  updateCourse,
} from "../controllers/courseController.js";
import isExisted from "../middlewares/isExisted.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id", getOneCourse);
router.post("/create", isExisted, createNewCourse);
router.put("/update/:id", isExisted, updateCourse);
router.delete("/delete/:id", isExisted, deleteCourse);

export default router;
