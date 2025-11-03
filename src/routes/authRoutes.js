import express from "express";
import {
  login,
  register,
  refreshToken,
  logout,
} from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.post("/refresh-token", refreshToken);

export default router;
