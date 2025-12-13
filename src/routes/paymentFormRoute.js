import express from "express";
import { getPaymentForm, getPaymentFormById, submitPaymentForm, updatePaymentForm, deletePaymentForm, getPaymentFormByIdFormulir, updateConfirmPayment } from "../controllers/paymentFormController.js";

import { uploadPaymentProof } from "../middlewares/uploadPaymentMiddleware.js";
import { verifyToken, verifyFormNumber } from "../middlewares/authMiddleware.js";

import { idParamValidation, createPaymentValidation, updatePaymentValidation } from "../middlewares/validators/paymentFormValidator.js";
import { validate } from "../middlewares/validateMiddleware.js";

const router = express.Router();

// for mobile
router.get("/mobile/detail/:id", verifyToken, verifyFormNumber, idParamValidation, validate, getPaymentFormByIdFormulir);
router.post("/mobile/create", verifyToken, verifyFormNumber, uploadPaymentProof.single("bukti_bayar"), createPaymentValidation, validate, submitPaymentForm);
router.put("/mobile/update/:id", verifyToken, verifyFormNumber, idParamValidation, validate, uploadPaymentProof.single("bukti_bayar"), updatePaymentForm);

// for web
// router.delete("/:id", deletePaymentForm);
router.get("/", verifyToken, getPaymentForm);
router.get("/detail/:id", verifyToken, getPaymentFormById);
router.patch("/:id/konfirmasi", verifyToken, updateConfirmPayment);

export default router;
