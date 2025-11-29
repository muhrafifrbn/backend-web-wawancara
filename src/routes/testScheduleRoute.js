import express from "express";
import {
  getTestSchedule,
  getTestScheduleById,
  submitTestSchedule,
  updateTestSchedule,
  deleteTestSchedule
} from "../controllers/testScheduleController.js";

import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();


// Panitia and Admin Can Use
router.get("/", verifyToken, getTestSchedule);

router.get("/:id", verifyToken, getTestScheduleById);

router.post("/create", verifyToken, verifyAdmin, submitTestSchedule);

// Admin only
router.put("/update/:id", verifyToken, verifyAdmin, updateTestSchedule);

router.delete("/delete/:id", verifyToken, verifyAdmin, deleteTestSchedule);

export default router;
