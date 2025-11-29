import express from "express";
import { 
  getInformationTest,
  getInformationTestById,
  submitInformationTest,
  updateInformationTest,
  deleteInformationTest
} from "../controllers/informationTestController.js";

import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Panitia + Admin
router.get("/", verifyToken, getInformationTest);
router.get("/:id", verifyToken, getInformationTestById);
router.post("/", verifyToken, verifyAdmin, submitInformationTest);

// Admin only
router.put("/:id", verifyToken, verifyAdmin, updateInformationTest);
router.delete("/:id", verifyToken, verifyAdmin, deleteInformationTest);

export default router;
