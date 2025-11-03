import express from "express";
import { deleteUser, getUserById, getUsers, updateUser,createUser } from "../controllers/userController.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getUsers);
router.get("/detail/:id", verifyToken, verifyAdmin, getUserById);
router.put("/update/:id", verifyToken, verifyAdmin, updateUser);
router.delete("/delete/:id", verifyToken, verifyAdmin, deleteUser);
router.post("/create", verifyToken, verifyAdmin, createUser);
export default router;