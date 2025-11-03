import express from "express";
import { getAllLogData } from "../controllers/logController.js";
import { 
    verifyToken,
    verifyAdmin
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get-all-log", verifyToken, verifyAdmin, getAllLogData);
export default router;