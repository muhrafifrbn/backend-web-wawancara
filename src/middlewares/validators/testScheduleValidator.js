import { body, param } from "express-validator";
import db from "../config/db.js";

// Cek apakah id_gelombang valid dan ada di database
const checkGelombangExists = async (value) => {
  const [rows] = await db.query("SELECT id FROM student_registration WHERE id = ?", [value]);

  if (rows.length === 0) {
    return Promise.reject("id_gelombang tidak ditemukan");
  }
  return true;
};

export const validateCreateTestSchedule = [
  body("tanggal_tes").notEmpty().withMessage("tanggal_tes wajib diisi").isISO8601().withMessage("tanggal_tes harus format tanggal valid"),

  body("jam_mulai")
    .notEmpty()
    .withMessage("jam_mulai wajib diisi")
    .matches(/^([01]\d|2[0-3]):[0-5]\d$/)
    .withMessage("jam_mulai harus format HH:mm"),

  body("jam_selesai")
    .notEmpty()
    .withMessage("jam_selesai wajib diisi")
    .matches(/^([01]\d|2[0-3]):[0-5]\d$/)
    .withMessage("jam_selesai harus format HH:mm")
    .custom((value, { req }) => {
      if (req.body.jam_mulai >= value) {
        throw new Error("jam_mulai harus lebih awal dari jam_selesai");
      }
      return true;
    }),

  body("informasi_ruangan").notEmpty().withMessage("informasi_ruangan wajib diisi").isLength({ min: 3 }).withMessage("informasi_ruangan minimal 3 karakter"),

  body("id_gelombang").notEmpty().withMessage("id_gelombang wajib diisi").isInt().withMessage("id_gelombang harus berupa angka").custom(checkGelombangExists), // cek database
];

export const validateUpdateTestSchedule = [
  param("id").isInt().withMessage("ID tidak valid"),

  body("tanggal_tes").notEmpty().withMessage("tanggal_tes wajib diisi").isISO8601().withMessage("tanggal_tes harus format tanggal valid"),

  body("jam_mulai")
    .notEmpty()
    .withMessage("jam_mulai wajib diisi")
    .matches(/^([01]\d|2[0-3]):[0-5]\d$/)
    .withMessage("jam_mulai harus format HH:mm"),

  body("jam_selesai")
    .notEmpty()
    .withMessage("jam_selesai wajib diisi")
    .matches(/^([01]\d|2[0-3]):[0-5]\d$/)
    .withMessage("jam_selesai harus format HH:mm")
    .custom((value, { req }) => {
      if (req.body.jam_mulai >= value) {
        throw new Error("jam_mulai harus lebih awal dari jam_selesai");
      }
      return true;
    }),

  body("informasi_ruangan").notEmpty().withMessage("informasi_ruangan wajib diisi").isLength({ min: 3 }).withMessage("informasi_ruangan minimal 3 karakter"),

  body("id_gelombang").notEmpty().withMessage("id_gelombang wajib diisi").isInt().withMessage("id_gelombang harus berupa angka").custom(checkGelombangExists), // cek database
];

export const idValidator = [param("id").isInt().withMessage("ID harus berupa angka")];
