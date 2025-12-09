import express from "express";

import { getTestSchedule, getTestScheduleById, submitTestSchedule, updateTestSchedule, deleteTestSchedule, getTestScheduleByIdGelombang } from "../controllers/testScheduleController.js";

import { validateCreateTestSchedule, validateUpdateTestSchedule, idValidator } from "../middlewares/validators/testScheduleValidator.js";

import { validate } from "../middlewares/validateMiddleware.js";
import { verifyToken, verifyAdmin, verifyFormNumber } from "../middlewares/authMiddleware.js";

const router = express.Router();

// mobile
router.get("/mobile/detail/:id", verifyToken, verifyFormNumber, getTestScheduleByIdGelombang);

// Panitia + Admin
router.get("/", verifyToken, getTestSchedule);

router.get("/:id", verifyToken, idValidator, validate, getTestScheduleById);

// Admin - CREATE
router.post("/create", verifyToken, verifyAdmin, validateCreateTestSchedule, validate, submitTestSchedule);

// Admin - UPDATE
router.put("/update/:id", verifyToken, verifyAdmin, validateUpdateTestSchedule, validate, updateTestSchedule);

// Admin - DELETE
router.delete("/delete/:id", verifyToken, verifyAdmin, idValidator, validate, deleteTestSchedule);

export default router;
