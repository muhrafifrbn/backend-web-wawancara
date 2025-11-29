import express from "express";
import { getInformationRegist, getInformationById, submitInformationRegist, updateInformationRegist, deleteInformationRegist } from "../controllers/informationRegistController.js";

import { createInformationRegistValidator, updateInformationRegistValidator, idValidator } from "../middlewares/validators/informationRegistValidator.js";

import { validate } from "../middlewares/validateMiddleware.js";

import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Panitia and Admin Can Use
router.get("/", verifyToken, getInformationRegist);

router.get("/:id", verifyToken, idValidator, validate, getInformationById);

router.post("/create", verifyToken, createInformationRegistValidator, validate, submitInformationRegist);

// Only Admin
router.put("/update/:id", verifyToken, verifyAdmin, updateInformationRegistValidator, validate, updateInformationRegist);

router.delete("/delete/:id", verifyToken, verifyAdmin, idValidator, validate, deleteInformationRegist);

export default router;
