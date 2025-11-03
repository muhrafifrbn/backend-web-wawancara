import express from "express";
import {
  submitStudentForm,
  getStudentForms,
  getStudentFormById,
  updateStudentForm,
  deleteStudentForm
} from "../controllers/studentController.js";
import { 
  verifyToken,
  verifyAdmin
} from "../middlewares/authMiddleware.js";


const router = express.Router();
// Panitia and Admin Can Use
router.post("/submit", verifyToken, submitStudentForm);
router.get("/detail/:id", verifyToken, getStudentFormById);
router.get("/", verifyToken, getStudentForms);

// Only Admin
router.put("/update/:id", verifyToken, verifyAdmin, updateStudentForm);
router.delete("/delete/:id", verifyToken, verifyAdmin, deleteStudentForm);
export default router;