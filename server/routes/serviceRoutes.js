import express from "express";
import {
  getAllServices,
  getOneService,
  createNewService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import isExisted from "../middlewares/isExisted.js";

const router = express.Router();

router.get("/", getAllServices);
router.get("/:id", getOneService);
router.post("/create", isExisted, createNewService);
router.put("/update/:id", isExisted, updateService);
router.delete("/delete/:id", isExisted, deleteService);

export default router;
