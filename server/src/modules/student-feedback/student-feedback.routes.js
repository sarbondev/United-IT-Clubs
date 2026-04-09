import express from "express";
import {
  createNewStudentFeedback,
  deleteStudentFeedback,
  getAllStudentFeedbacks,
  getOneStudentFeedback,
  updateStudentFeedback,
} from "./student-feedback.controller.js";
import isExisted from "../../shared/auth/auth.middleware.js";

const router = express.Router();

router.get("/", getAllStudentFeedbacks);
router.get("/:id", getOneStudentFeedback);
router.post("/create", isExisted, createNewStudentFeedback);
router.put("/update/:id", isExisted, updateStudentFeedback);
router.delete("/delete/:id", isExisted, deleteStudentFeedback);

export default router;