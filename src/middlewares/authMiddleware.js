import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    // console.log("Authorization header not found");
    return res.status(403).json({ msg: "No token provided." });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7, authHeader.length)
    : authHeader;

  if (!token) {
    // console.log("Token not found in header");
    return res.status(403).json({ msg: "Token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRETBEBAS");
    // Simpan user ID di request agar bisa digunakan di controller lain (untuk logging)
    req.user = decoded;
    req.user_id = decoded.id; 

    next();
  } catch (error) {
    //console.log("Token verification failed:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token expired. Please login again." });
    }

    return res.status(401).json({ msg: "Unauthorized or invalid token" });
  }
};

export const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied. Admins only." });
  }
  next();
};
