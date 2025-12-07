import express from "express";
import { loginRegistForm, refreshTokenRegistForm, logoutRegistForm } from "../controllers/authMobileController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginRegistForm);
router.post("/logout", verifyToken, logoutRegistForm);
router.post("/refresh-token", refreshTokenRegistForm);

export default router;
