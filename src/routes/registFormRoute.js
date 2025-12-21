import express from "express";
import { getRegistrationForm, getRegistrationFormById, submitRegistrationForm, updateRegistrationForm, deleteRegistrationForm, updateHasilLulus } from "../controllers/registFormController.js";
import { getInformationById } from "../controllers/informationRegistController.js";

import { verifyToken, verifyAdmin, verifyFormNumber } from "../middlewares/authMiddleware.js";

import { validate } from "../middlewares/validateMiddleware.js";
import { createRegistrationValidation, idParamValidation, updateRegistrationValidation, updateHasilLulusValidation } from "../middlewares/validators/registFormValidator.js";

const router = express.Router();

// for mobile
router.post("/mobile/create", createRegistrationValidation, validate, submitRegistrationForm);
router.get("/mobile/detail/:id", verifyToken, verifyFormNumber, idParamValidation, validate, getRegistrationFormById);
router.put("/mobile/update/:id", verifyToken, verifyFormNumber, updateRegistrationValidation, validate, updateRegistrationForm);

// for web
router.get("/", verifyToken, getRegistrationForm);

router.get("/detail/:id", verifyToken, getRegistrationFormById);
// router.put("/mobile/update/:id", verifyToken, verifyAdmin, updateRegistrationForm);
router.delete("/delete/id", verifyToken, verifyAdmin, deleteRegistrationForm);

router.patch("/update/hasil-lulus/:id", verifyToken, updateHasilLulusValidation, validate, updateHasilLulus);

export default router;
