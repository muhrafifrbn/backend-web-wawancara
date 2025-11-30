import { body, param } from "express-validator";

export const createInformationRegistValidator = [
  body("nama_gelombang").notEmpty().withMessage("Nama gelombang wajib diisi"),

  body("deskripsi").notEmpty().withMessage("Deskripsi wajib diisi"),

  body("tanggal_mulai").isDate().withMessage("Tanggal mulai harus berupa tanggal yang valid"),

  body("tanggal_akhir").isDate().withMessage("Tanggal akhir harus berupa tanggal yang valid"),

  body("tanggal_akhir").custom((value, { req }) => {
    const start = new Date(req.body.tanggal_mulai);
    const end = new Date(value);

    if (start >= end) {
      throw new Error("Tanggal akhir harus lebih besar dari tanggal mulai");
    }

    return true;
  }),

  body("tahun_ajaran").notEmpty().withMessage("Tahun ajaran wajib diisi").isLength({ max: 10 }).withMessage("Tahun ajaran maksimal 10 karakter").matches(/^\d{4}[-/]\d{4}$/).withMessage("Format tahun ajaran harus YYYY/YYYY atau YYYY-YYYY"),

  body("status_gelombang").optional().isIn(["Aktif", "Non-Aktif"]).withMessage("Status gelombang hanya boleh: aktif, nonaktif"),
];

export const updateInformationRegistValidator = [
  param("id").isInt().withMessage("ID harus berupa angka"),

  body("nama_gelombang").notEmpty().withMessage("Nama gelombang wajib diisi"),

  body("deskripsi").notEmpty().withMessage("Deskripsi wajib diisi"),

  body("tanggal_mulai").isDate().withMessage("Tanggal mulai tidak valid"),

  body("tanggal_akhir").isDate().withMessage("Tanggal akhir tidak valid"),

  body("tanggal_akhir").custom((value, { req }) => {
    const start = new Date(req.body.tanggal_mulai);
    const end = new Date(value);

    if (start >= end) {
      throw new Error("Tanggal akhir harus lebih besar dari tanggal mulai");
    }

    return true;
  }),

  body("tahun_ajaran").notEmpty().withMessage("Tahun ajaran wajib diisi").isLength({ max: 10 }).withMessage("Tahun ajaran maksimal 10 karakter").matches(/^\d{4}[-/]\d{4}$/).withMessage("Format tahun ajaran harus YYYY/YYYY atau YYYY-YYYY"),

  body("status_gelombang").isIn(["Aktif", "Non-Aktif"]).withMessage("Status gelombang hanya boleh: Aktif, Non-Aktif"),
];

export const idValidator = [param("id").isInt().withMessage("ID harus berupa angka")];
