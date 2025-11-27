import express from "express";
import {
  getInformationRegist,
  getInformationById,
  submitInformationRegist,
  updateInformationRegist,
  deleteInformationRegist
} from "../controllers/informationRegistController.js";

import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getInformationRegist);

router.get("/:id", verifyToken, getInformationById);

router.post("/", verifyToken, verifyAdmin, submitInformationRegist);

router.put("/:id", verifyToken, verifyAdmin, updateInformationRegist);

router.delete("/:id", verifyToken, verifyAdmin, deleteInformationRegist);

export default router;
