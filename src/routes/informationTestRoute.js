import express from "express";

import { getInformationTest, getInformationTestById, submitInformationTest, updateInformationTest, deleteInformationTest } from "../controllers/informationTestController.js";

import { validateCreateInformationTest, validateUpdateInformationTest, idValidator } from "../middlewares/validators/informationTestValidator.js";

import { validate } from "../middlewares/validateMiddleware.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Panitia + Admin
router.get("/", verifyToken, getInformationTest);

router.get("/:id", verifyToken, idValidator, validate, getInformationTestById);

// Admin only
router.post("/", verifyToken, verifyAdmin, validateCreateInformationTest, validate, submitInformationTest);

router.put("/:id", verifyToken, verifyAdmin, validateUpdateInformationTest, validate, updateInformationTest);

router.delete("/:id", verifyToken, verifyAdmin, validate, validate, deleteInformationTest);

export default router;
