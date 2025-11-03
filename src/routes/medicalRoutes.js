import express from "express";
import {
  getMedicalCheckForms,
  getMedicalFormsById,
  submitMedicalCheckForm,
  updateMedicalCheckForm,
  deleteMedicalCheckForm
} from "../controllers/medicalController.js";
import { 
  verifyToken, 
  verifyAdmin 
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Panitia and Admin Can Use
router.post("/submit", verifyToken, submitMedicalCheckForm);
router.get("/detail/:id", verifyToken, getMedicalFormsById);
router.get("/", verifyToken, getMedicalCheckForms);

// Only Admin
router.put("/update/:id", verifyToken, verifyAdmin, updateMedicalCheckForm);
router.delete("/delete/:id", verifyToken, verifyAdmin, deleteMedicalCheckForm);

export default router;