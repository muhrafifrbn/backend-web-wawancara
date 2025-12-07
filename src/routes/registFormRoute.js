import express from "express";
import { getRegistrationForm, getRegistrationFormById, submitRegistrationForm, updateRegistrationForm, deleteRegistrationForm } from "../controllers/registFormController.js";

import { verifyToken, verifyAdmin, verifyFormNumber } from "../middlewares/authMiddleware.js";

const router = express.Router();

// for mobile
router.post("/mobile/create", submitRegistrationForm);
router.get("/mobile/detail/:id", verifyToken, verifyFormNumber, getRegistrationFormById);
router.put("/mobile/update/:id", verifyToken, verifyFormNumber, updateRegistrationForm);

// for web
router.get("/", verifyToken, getRegistrationForm);
router.get("/detail/:id", verifyToken, getRegistrationFormById);
// router.put("/mobile/update/:id", verifyToken, verifyAdmin, updateRegistrationForm);
router.delete("/delete/id", verifyToken, verifyAdmin, deleteRegistrationForm);

export default router;
