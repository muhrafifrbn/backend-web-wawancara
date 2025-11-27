import db from "../config/db.js";

// Get All Users
export const getUsers = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM student_registration ORDER BY id DESC");
    return res.status(200).json({
      status: 200,
      msg: "Success Get Data Information Registration",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to retrieve users",
      error: error.message,
    });
  }
};
