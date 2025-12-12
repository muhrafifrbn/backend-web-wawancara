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
    cb(new Error("File must be JPG/PNG"));
  }
};

export const uploadPaymentProof = multer({ storage, fileFilter });
