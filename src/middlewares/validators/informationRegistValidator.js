import { body, param } from "express-validator";
import db from "../../config/db.js";

  export const studentRegistrationRepo = {
    async existsActiveOverlapByYear(tahunAjaran, startDate, endDate) {
      const [rows] = await db.query(
        `SELECT id
        FROM student_registration
        WHERE tahun_ajaran = ?
          AND status_gelombang = 'Aktif'
          AND (? <= tanggal_akhir AND ? >= tanggal_mulai)
        LIMIT 1`,
        [tahunAjaran, startDate, endDate]
      );
      return rows.length > 0;
    },
  };

// Field yang boleh diterima dari client (anti mass assignment)
const ALLOWED_CREATE_FIELDS = ["nama_gelombang", "deskripsi", "tanggal_mulai", "tanggal_akhir", "tahun_ajaran", "status_gelombang"];

// Middleware: blok request body yang mengandung field tidak dikenal
export const blockUnknownFields =
  (allowed = []) =>
  (req, res, next) => {
    const keys = Object.keys(req.body || {});
    const unknown = keys.filter((k) => !allowed.includes(k));
    if (unknown.length > 0) {
      return res.status(400).json({
        message: "Field tidak diizinkan",
        unknown_fields: unknown,
      });
    }
    return next();
  };

const gelombangEnum = ["Gelombang 1", "Gelombang 2", "Gelombang 3", "Gelombang 4"];
const statusEnum = ["Aktif", "Non-Aktif"];

// Helper: validasi tahun ajaran berurutan (2024/2025 atau 2024-2025)
const tahunAjaranBerurutan = (value) => {
  const [a, b] = value.split(/[-/]/).map((x) => Number(x));
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    throw new Error("Tahun ajaran tidak valid");
  }
  if (b !== a + 1) {
    throw new Error("Tahun ajaran harus berurutan (contoh: 2024/2025)");
  }
  return true;
};

// Helper: aturan tanggal_akhir harus > tanggal_mulai
const tanggalAkhirLebihBesar = (end, { req }) => {
  const startRaw = req.body.tanggal_mulai;
  if (!startRaw) return true; // error utama akan ditangani validator tanggal_mulai

  const start = new Date(startRaw);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    // biar error format tanggal tetap berasal dari validator isISO8601
    return true;
  }
  if (start >= end) {
    throw new Error("Tanggal akhir harus lebih besar dari tanggal mulai");
  }
  return true;
};

export const createInformationRegistValidator = [
  blockUnknownFields(ALLOWED_CREATE_FIELDS),

  body("nama_gelombang").exists({ checkFalsy: true }).withMessage("Nama gelombang wajib diisi").trim().isIn(gelombangEnum).withMessage("Nama gelombang harus: Gelombang 1, Gelombang 2, Gelombang 3, Gelombang 4"),

  body("deskripsi").exists({ checkFalsy: true }).withMessage("Deskripsi wajib diisi").trim().isLength({ min: 5, max: 255 }).withMessage("Deskripsi minimal 5 dan maksimal 255 karakter"),

  body("tanggal_mulai").exists({ checkFalsy: true }).withMessage("Tanggal mulai wajib diisi").isISO8601({ strict: true }).withMessage("Tanggal mulai harus format YYYY-MM-DD").toDate(),

  body("tanggal_akhir").exists({ checkFalsy: true }).withMessage("Tanggal akhir wajib diisi").isISO8601({ strict: true }).withMessage("Tanggal akhir harus format YYYY-MM-DD").toDate().custom(tanggalAkhirLebihBesar),

  body("tahun_ajaran")
    .exists({ checkFalsy: true })
    .withMessage("Tahun ajaran wajib diisi")
    .trim()
    .isLength({ max: 10 })
    .withMessage("Tahun ajaran maksimal 10 karakter")
    .matches(/^\d{4}[-/]\d{4}$/)
    .withMessage("Format tahun ajaran harus YYYY/YYYY atau YYYY-YYYY")
    .custom(tahunAjaranBerurutan)
    .custom(async (tahun, { req }) => {
      const { tanggal_mulai, tanggal_akhir } = req.body;

      const overlap = await studentRegistrationRepo.existsActiveOverlapByYear(tahun, tanggal_mulai, tanggal_akhir);

      if (overlap) {
        throw new Error(`Sudah ada gelombang Aktif pada tahun ajaran ${tahun} dengan tanggal yang bertabrakan`);
      }
      return true;
    }),
];

export const updateInformationRegistValidator = [
  param("id").isInt({ min: 1 }).withMessage("ID harus berupa angka dan minimal 1"),

  body("nama_gelombang").exists({ checkFalsy: true }).withMessage("Nama gelombang wajib diisi").trim().isIn(gelombangEnum).withMessage("Nama gelombang harus: Gelombang 1, Gelombang 2, Gelombang 3, Gelombang 4"),

  body("deskripsi").exists({ checkFalsy: true }).withMessage("Deskripsi wajib diisi").trim().isLength({ min: 5, max: 255 }).withMessage("Deskripsi minimal 5 dan maksimal 255 karakter"),

  body("tanggal_mulai").exists({ checkFalsy: true }).withMessage("Tanggal mulai wajib diisi").isISO8601({ strict: true }).withMessage("Tanggal mulai harus format YYYY-MM-DD").toDate(),

  body("tanggal_akhir").exists({ checkFalsy: true }).withMessage("Tanggal akhir wajib diisi").isISO8601({ strict: true }).withMessage("Tanggal akhir harus format YYYY-MM-DD").toDate().custom(tanggalAkhirLebihBesar),

  body("tahun_ajaran")
    .exists({ checkFalsy: true })
    .withMessage("Tahun ajaran wajib diisi")
    .trim()
    .isLength({ max: 10 })
    .withMessage("Tahun ajaran maksimal 10 karakter")
    .matches(/^\d{4}[-/]\d{4}$/)
    .withMessage("Format tahun ajaran harus YYYY/YYYY atau YYYY-YYYY")
    .custom(tahunAjaranBerurutan),

  body("status_gelombang").isIn(["Aktif", "Non-Aktif"]).withMessage("Status gelombang hanya boleh: Aktif, Non-Aktif"),
];

export const idValidator = [param("id").isInt().withMessage("ID harus berupa angka")];
