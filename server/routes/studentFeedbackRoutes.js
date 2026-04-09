import express from "express";
import {
  createNewStudentFeedback,
  deleteStudentFeedback,
  getAllStudentFeedbacks,
  getOneStudentFeedback,
  updateStudentFeedback,
} from "../controllers/studentFeedbackController.js";
import isExisted from "../middlewares/isExisted.js";

const router = express.Router();

router.get("/", getAllStudentFeedbacks);
router.get("/:id", getOneStudentFeedback);
router.post("/create", isExisted, createNewStudentFeedback);
router.put("/update/:id", isExisted, updateStudentFeedback);
router.delete("/delete/:id", isExisted, deleteStudentFeedback);

export default router;