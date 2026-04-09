import express from "express";
import {
  CreateAccount,
  DeleteAccount,
  GetAdminById,
  GetAllAdmins,
  GetMe,
  LoginToAccount,
  UpdateAccount,
} from "./admin.controller.js";
import isExisted from "../../shared/auth/auth.middleware.js";

const router = express.Router();

router.get("/me", isExisted, GetMe);
router.get("/", isExisted, GetAllAdmins);
router.get("/:id", isExisted, GetAdminById);
router.post("/login", LoginToAccount);
router.post("/create", CreateAccount);
router.delete("/delete/:id", isExisted, DeleteAccount);
router.put("/update/:id", isExisted, UpdateAccount);

export default router;
