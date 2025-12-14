import { body, param } from "express-validator";

export const idParamValidation = [param("id").notEmpty().withMessage("ID wajib diisi").isInt({ min: 1 }).withMessage("ID harus berupa angka")];

export const createRegistrationValidation = [
  body("jurusan_dipilih").notEmpty().withMessage("jurusan_dipilih wajib diisi"),

  body("nama_lengkap").notEmpty().withMessage("nama_lengkap wajib diisi"),

  body("tempat_lahir").notEmpty().withMessage("tempat_lahir wajib diisi"),

  body("tanggal_lahir")
    .notEmpty()
    .withMessage("tanggal_lahir wajib diisi")
    .isISO8601({ strict: true })
    .withMessage("tanggal_lahir harus format YYYY-MM-DD")
    .custom((value) => {
      const inputDate = new Date(value);
      const today = new Date();
      if (inputDate >= today) {
        throw new Error("tanggal_lahir harus kurang dari hari ini");
      }
      return true;
    }),

  body("jenis_kelamin").notEmpty().withMessage("jenis_kelamin wajib diisi").isIn(["LAKI-LAKI", "PEREMPUAN"]).withMessage("jenis_kelamin harus LAKI atau PEREMPUAN"),

  body("agama").notEmpty().withMessage("agama wajib diisi"),

  body("sekolah_asal").notEmpty().withMessage("sekolah_asal wajib diisi"),

  body("alamat").notEmpty().withMessage("alamat wajib diisi"),

  body("telepon").notEmpty().withMessage("telepon wajib diisi").isNumeric().withMessage("telepon harus berupa angka").isLength({ min: 10, max: 15 }).withMessage("telepon minimal 10 dan maksimal 15 digit"),

  body("email").notEmpty().withMessage("email wajib diisi").isEmail().withMessage("format email tidak valid").normalizeEmail(),

  body("nama_ayah").notEmpty().withMessage("nama_ayah wajib diisi"),

  body("nama_ibu").notEmpty().withMessage("nama_ibu wajib diisi"),
];

export const updateRegistrationValidation = [
  ...idParamValidation,

  body("jurusan_dipilih").notEmpty().withMessage("jurusan_dipilih wajib diisi"),

  body("nama_lengkap").notEmpty().withMessage("nama_lengkap wajib diisi"),

  body("tempat_lahir").notEmpty().withMessage("tempat_lahir wajib diisi"),

  body("tanggal_lahir").notEmpty().withMessage("tanggal_lahir wajib diisi").isISO8601({ strict: true }).withMessage("tanggal_lahir harus format YYYY-MM-DD"),

  body("jenis_kelamin").notEmpty().withMessage("jenis_kelamin wajib diisi").isIn(["LAKI-LAKI", "PEREMPUAN"]).withMessage("jenis_kelamin harus LAKI-LAKI atau PEREMPUAN"),

  body("agama").notEmpty().withMessage("agama wajib diisi"),

  body("sekolah_asal").notEmpty().withMessage("sekolah_asal wajib diisi"),

  body("alamat").notEmpty().withMessage("alamat wajib diisi"),

  body("telepon").notEmpty().withMessage("telepon wajib diisi").isNumeric().withMessage("telepon harus berupa angka"),

  body("email").notEmpty().withMessage("email wajib diisi").isEmail().withMessage("format email tidak valid").normalizeEmail(),

  body("nama_ayah").notEmpty().withMessage("nama_ayah wajib diisi"),

  body("nama_ibu").notEmpty().withMessage("nama_ibu wajib diisi"),
];
