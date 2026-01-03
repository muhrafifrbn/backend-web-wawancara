import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/payment_form/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `bukti_${Date.now()}${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("bukti_bayar harus berupa JPG / PNG / JPEG"));
  }
};

export const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    let message = err.message;

    if (err.code === "LIMIT_FILE_SIZE") {
      message = "Ukuran file maksimal 2MB";
    }

    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      message = "Hanya boleh upload 1 file bukti_bayar";
    }

    if (err.code === "LIMIT_FILE_COUNT") {
      message = "Hanya boleh upload 1 file bukti_bayar";
    }

    return res.status(400).json({
      status: 400,
      message,
    });
  }

  if (err instanceof Error) {
    return res.status(400).json({
      status: 400,
      message: err.message,
    });
  }

  next(err);
};

export const uploadPaymentProof = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
    files: 1,
  },
});
