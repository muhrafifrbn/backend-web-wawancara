import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import db from "../config/db.js";

dotenv.config();

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.user_id,
      email: user.email,
      full_name: user.full_name,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET || "SECRETBEBAS",
    { expiresIn: "7h" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.user_id,
      email: user.email,
      full_name: user.full_name,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_REFRESH_SECRET || "REFRESHSECRETBEBAS",
    { expiresIn: "7d" }
  );
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);

    if (rows.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid Password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
    });

    await db.query("UPDATE users SET last_login = NOW(), is_active = 1 WHERE user_id = ?", [user.user_id]);

    return res.status(200).json({
      msg: "Login successfully",
      token: accessToken,
      refreshToken: refreshToken,
      full_name: user.full_name,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    console.error("Error in login function:", error);
    return res.status(500).json({
      msg: "Login Failed",
      error: error.message,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { username, password, full_name, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query("INSERT INTO users (username, password, full_name, role, created_at, is_active) VALUES (?, ?, ?, ?, NOW(), 0)", [username, hashedPassword, full_name, role]);

    const newUser = {
      id: result.insertId,
      username,
      full_name,
      role,
    };

    return res.status(201).json({
      msg: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Registration Failed",
      error: error.message,
    });
  }
};

export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({ msg: "No refresh token provided" });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || "REFRESHSECRETBEBAS", (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: "Invalid refresh token" });
    }

    console.log("🔄 Refresh Token Data:", decoded); // Debugging

    if (!decoded.full_name) {
      console.error("⚠️ Full name is missing in refresh token!");
    }

    const newAccessToken = generateAccessToken({
      user_id: decoded.id,
      email: decoded.email,
      full_name: decoded.full_name,
      username: decoded.username,
      role: decoded.role,
    });

    return res.status(200).json({
      token: newAccessToken,
      full_name: decoded.full_name,
      username: decoded.username,
      role: decoded.role,
    });
  });
};

export const logout = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    await db.query("UPDATE users SET is_active = 0 WHERE user_id = ?", [userId]);

    res.clearCookie("refreshToken");

    return res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({
      msg: "Logout Failed",
      error: error.message,
    });
  }
};
