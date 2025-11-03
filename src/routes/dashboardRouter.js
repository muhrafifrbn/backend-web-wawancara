import express from "express";
import { 
    countDataTable, 
    countDataForChart, 
    countOnlineUsers,
    countUser
} from "../controllers/dashboardController.js";
import { 
    verifyToken,
    verifyAdmin
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Panitia and Admin Can Use
router.get("/count", verifyToken, countDataTable);
router.get("/count-data-week-permonth",verifyToken, countDataForChart);

// Only Admin
router.get('/count-online-user', verifyToken,verifyAdmin,countOnlineUsers);
router.get('/count-users', verifyToken,verifyAdmin,countUser);

export default router;