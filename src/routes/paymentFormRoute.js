import express from "express";
import { getPaymentForm, getPaymentFormById, submitPaymentForm, updatePaymentForm, deletePaymentForm, getPaymentFormByIdFormulir } from "../controllers/paymentFormController.js";

import { uploadPaymentProof } from "../middlewares/uploadPaymentMiddleware.js";
import { verifyToken, verifyFormNumber } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/mobile/detail/:id", verifyToken, verifyFormNumber, getPaymentFormByIdFormulir);
router.post("/mobile/create", uploadPaymentProof.single("bukti_bayar"), verifyToken, verifyFormNumber, submitPaymentForm);
router.put("/mobile/update/:id", uploadPaymentProof.single("bukti_bayar"), verifyToken, verifyFormNumber, updatePaymentForm);

// router.delete("/:id", deletePaymentForm);
router.get("/", verifyToken, getPaymentForm);
router.get("detail/:id", verifyToken, getPaymentFormById);

export default router;
