import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import db from "../config/db.js";

dotenv.config();

// ======================= TOKEN GENERATOR ======================= //
const generateAccessToken = (form) => {
  return jwt.sign(
    {
      id: form.id,
      nomor_formulir: form.nomor_formulir,
      id_gelombang: form.id_gelombang,
    },
    process.env.JWT_SECRET || "SECRETBEBAS",
    { expiresIn: "7h" }
  );
};

const generateRefreshToken = (form) => {
  return jwt.sign(
    {
      id: form.id,
      nomor_formulir: form.nomor_formulir,
      id_gelombang: form.id_gelombang,
    },
    process.env.JWT_REFRESH_SECRET || "REFRESHSECRETBEBAS",
    { expiresIn: "7d" }
  );
};

// ======================= LOGIN SISWA ======================= //
export const loginRegistForm = async (req, res) => {
  try {
    const { nomor_formulir, tanggal_lahir } = req.body;

    const [rows] = await db.query(
      `
        SELECT 
          id, nomor_formulir, id_gelombang,
          DATE_FORMAT(tanggal_lahir, '%Y-%m-%d') AS tanggal_lahir
        FROM registration_form
        WHERE nomor_formulir = ?
      `,
      [nomor_formulir]
    );

    if (rows.length === 0) {
      return res.status(404).json({ msg: "Nomor formulir tidak ditemukan" });
    }

    const form = rows[0];
    console.log(tanggal_lahir);
    console.log(form);

    if (tanggal_lahir !== form.tanggal_lahir) {
      return res.status(401).json({ msg: "Tanggal lahir tidak sesuai" });
    }

    const accessToken = generateAccessToken(form);
    const refreshToken = generateRefreshToken(form);

    res.cookie("refreshTokenForm", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      msg: "Login berhasil",
      token: accessToken,
      refreshToken: refreshToken,
      id: form.id,
      nomor_formulir: form.nomor_formulir,
      id_gelombang: form.id_gelombang,
    });
  } catch (error) {
    console.error("Error in Registration Form login:", error);
    return res.status(500).json({
      msg: "Login gagal",
      error: error.message,
    });
  }
};

export const refreshTokenRegistForm = async (req, res) => {
  const refreshToken = req.cookies.refreshTokenStudent;

  if (!refreshToken) {
    return res.status(403).json({ msg: "No refresh token provided" });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || "REFRESHSECRETBEBAS", (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken({
      id: decoded.id,
      nomor_formulir: decoded.nomor_formulir,
      id_gelombang: decoded.id_gelombang,
    });

    return res.status(200).json({
      token: newAccessToken,
      refreshToken: refreshToken,
      id: decoded.id,
      nomor_formulir: decoded.nomor_formulir,
      id_gelombang: decoded.id_gelombang,
    });
  });
};

// ======================= LOGOUT SISWA ======================= //
export const logoutRegistForm = async (req, res) => {
  try {
    const formId = req.form_id; // Data dari middleware auth

    if (!formId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    res.clearCookie("refreshTokenForm");

    return res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({
      msg: "Logout Failed",
      error: error.message,
    });
  }
};
