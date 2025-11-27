import express from "express";
import { getUsers } from "../controllers/informationRegistController.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Panitia and Admin Can Use
router.get("/", verifyToken, getUsers);

export default router;
