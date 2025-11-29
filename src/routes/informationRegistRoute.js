import express from "express";
import { getInformationRegist, getInformationById, submitInformationRegist, updateInformationRegist, deleteInformationRegist } from "../controllers/informationRegistController.js";

import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();


// Panitia and Admin Can Use
router.get("/", verifyToken, getInformationRegist);

router.get("/:id", verifyToken, getInformationById);

router.post("/create", verifyToken, verifyAdmin, submitInformationRegist);

// Only Admin
router.put("/update/:id", verifyToken, verifyAdmin, updateInformationRegist);

router.delete("/delete/:id", verifyToken, verifyAdmin, deleteInformationRegist);

export default router;
