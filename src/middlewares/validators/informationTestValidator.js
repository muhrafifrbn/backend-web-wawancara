import { body, param } from "express-validator";

export const validateCreateInformationTest = [
  body("nama_tes").notEmpty().withMessage("Nama tes wajib diisi").isLength({ min: 3, max: 100 }).withMessage("Nama tes harus 3–100 karakter"),

  body("deskripsi_tes").notEmpty().isLength({ min: 5 }).withMessage("Deskripsi minimal 5 karakter"),
];

export const validateUpdateInformationTest = [
  param("id").isInt().withMessage("ID tidak valid"),

  body("nama_tes").notEmpty().withMessage("Nama tes wajib diisi").isLength({ min: 3, max: 100 }).withMessage("Nama tes harus 3–100 karakter"),

  body("deskripsi_tes").notEmpty().isLength({ min: 5 }).withMessage("Deskripsi minimal 5 karakter"),
];

export const idValidator = [param("id").isInt().withMessage("ID harus berupa angka")];
