import express from "express";
import {
  getAllMembers,
  getOneMembers,
  createMember,
  updateMember,
  deleteMember,
} from "./team.controller.js";
import isExisted from "../../shared/auth/auth.middleware.js";

const router = express.Router();

router.get("/", getAllMembers);
router.get("/:id", getOneMembers);
router.post("/create", isExisted, createMember);
router.put("/update/:id", isExisted, updateMember);
router.delete("/delete/:id", isExisted, deleteMember);

export default router;
