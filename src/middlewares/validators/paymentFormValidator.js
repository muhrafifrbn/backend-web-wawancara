import db from "../../config/db.js";
import { body, param } from "express-validator";

const paymentIdExists = async (id) => {
  const [rows] = await db.query("SELECT id FROM payment_form WHERE id = ? LIMIT 1", [id]);

  if (rows.length === 0) {
    throw new Error("Data payment_form tidak ditemukan");
  }

  return true;
};

const paymentIdFormExists = async (id) => {
  const [rows] = await db.query("SELECT id FROM registration_form WHERE id = ? LIMIT 1", [id]);

  if (rows.length === 0) {
    throw new Error("Data formulir tidak ditemukan");
  }

  return true;
};

export const createPaymentValidation = [
  body("nama_bank").notEmpty().withMessage("nama_bank wajib diisi"),

  body("tanggal_transfer").notEmpty().withMessage("tanggal_transfer wajib diisi").isISO8601().withMessage("tanggal_transfer harus format YYYY-MM-DD"),

  // body("jumlah_tagihan")
  //   .notEmpty()
  //   .withMessage("jumlah_tagihan wajib diisi")
  //   .isNumeric()
  //   .withMessage("jumlah_tagihan harus berupa angka")
  //   .custom((value) => {
  //     if (Number(value) <= 0) {
  //       throw new Error("jumlah_tagihan harus lebih dari 0");
  //     }
  //     return true;
  //   }),

  body("id_formulir").notEmpty().withMessage("id_formulir wajib diisi").isInt().withMessage("id_formulir harus berupa angka"),
];

export const updatePaymentValidation = [
  param("id").isInt().withMessage("ID tidak valid").custom(paymentIdExists),

  body("nama_bank").notEmpty().withMessage("nama_bank wajib diisi"),

  body("tanggal_transfer").notEmpty().withMessage("tanggal_transfer wajib diisi").isISO8601().withMessage("tanggal_transfer harus format YYYY-MM-DD"),

  // body("jumlah_tagihan").notEmpty().withMessage("jumlah_tagihan wajib diisi").isNumeric().withMessage("jumlah_tagihan harus berupa angka"),
];

export const confirmPaymentValidation = [
  param("id").isInt().withMessage("ID tidak valid").custom(paymentIdExists),

  body("konfirmasi_pembayaran").notEmpty().withMessage("konfirmasi_pembayaran wajib diisi").isIn([0, 1]).withMessage("konfirmasi_pembayaran harus bernilai 0 atau 1"),
];

export const idParamValidation = [param("id").isInt().withMessage("ID harus berupa angka").custom(paymentIdExists)];

export const idFormParamValidation = [param("id").isInt().withMessage("ID harus berupa angka").custom(paymentIdFormExists)];
