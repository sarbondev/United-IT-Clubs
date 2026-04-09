import express from "express";
import {
  createNewParentFeedback,
  deleteParentFeedback,
  getAllParentFeedbacks,
  getOneParentFeedback,
  updateParentFeedback,
} from "./parent-feedback.controller.js";
import isExisted from "../../shared/auth/auth.middleware.js";

const router = express.Router();

router.get("/", getAllParentFeedbacks);
router.get("/:id", getOneParentFeedback);
router.post("/create", isExisted, createNewParentFeedback);
router.put("/update/:id", isExisted, updateParentFeedback);
router.delete("/delete/:id", isExisted, deleteParentFeedback);

export default router;