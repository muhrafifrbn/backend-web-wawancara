import express from "express";
import { getRegistrationForm, getRegistrationFormById, submitRegistrationForm } from "../controllers/registFormController.js";

import { verifyToken, verifyAdmin, verifyFormNumber } from "../middlewares/authMiddleware.js";

const router = express.Router();

// for mobile
router.post("/mobile/create", submitRegistrationForm);
router.get("/mobile/detail/:id", verifyFormNumber, getRegistrationFormById);

// for web
router.get("/", verifyToken, getRegistrationForm);
router.get("/detail/:id", verifyToken, getRegistrationFormById);

export default router;
