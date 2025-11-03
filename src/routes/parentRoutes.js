import express from "express";
import {
  getParentsForms,
  submitParentsForm,
  getParentFormById,
  updateParentsForm,
  deleteParentsForm
} from "../controllers/parentController.js";
import { 
  verifyToken,
  verifyAdmin
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Panitia and Admin Can Use
router.post("/submit", verifyToken, submitParentsForm);
router.get("/detail/:id",verifyToken,getParentFormById)
router.get("/", verifyToken, getParentsForms);

// Only Admin
router.put("/update/:id", verifyToken, verifyAdmin,updateParentsForm);
router.delete("/delete/:id", verifyToken, verifyAdmin,deleteParentsForm);

export default router;