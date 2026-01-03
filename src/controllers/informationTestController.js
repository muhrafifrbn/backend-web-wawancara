import db from "../config/db.js";

// GET ALL
export const getInformationTest = async (req, res) => {
  try {
    const [result] = await db.query(
      `SELECT id, nama_tes, deskripsi_tes 
       FROM information_test 
       ORDER BY id DESC`
    );

    return res.status(200).json({
      status: 200,
      msg: "Success Get Data Information Test",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to retrieve data",
      error: error.message,
    });
  }
};

// CREATE
export const submitInformationTest = async (req, res) => {
  let { nama_tes, deskripsi_tes } = req.body;

  try {
    const user_id = req.user_id;
    nama_tes = nama_tes?.trim();
    deskripsi_tes = deskripsi_tes?.trim();

    const sql = `
      INSERT INTO information_test (nama_tes, deskripsi_tes)
      VALUES (?, ?)
    `;

    const [result] = await db.execute(sql, [nama_tes, deskripsi_tes]);

    const insertedId = result.insertId;

    await db.query("INSERT INTO user_logs (user_id, action) VALUES (?, ?)", [user_id, `Added Information Test ID-${insertedId} Name ${nama_tes}`]);

    return res.status(201).json({
      message: "Create Information Test successfully",
      data: { id: insertedId },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET BY ID
export const getInformationTestById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT id, nama_tes, deskripsi_tes 
       FROM information_test 
       WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        msg: "Data not found",
      });
    }

    return res.status(200).json({
      status: 200,
      msg: "Success Get Data",
      data: rows[0],
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// UPDATE
export const updateInformationTest = async (req, res) => {
  const { id } = req.params;
  let { nama_tes, deskripsi_tes } = req.body;

  try {
    const user_id = req.user_id;
    nama_tes = nama_tes?.trim();
    deskripsi_tes = deskripsi_tes?.trim();

    const sql = `
      UPDATE information_test SET
        nama_tes = ?,
        deskripsi_tes = ?
      WHERE id = ?
    `;

    const [result] = await db.execute(sql, [nama_tes, deskripsi_tes, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 404,
        msg: "Data not found",
      });
    }

    await db.query("INSERT INTO user_logs (user_id, action) VALUES (?, ?)", [user_id, `Update Information Test ID-${id} Name ${nama_tes}`]);

    return res.status(200).json({
      status: 200,
      msg: "Update Information Test Successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// DELETE
export const deleteInformationTest = async (req, res) => {
  const { id } = req.params;

  try {
    const user_id = req.user_id;

    const [result] = await db.execute("DELETE FROM information_test WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 404,
        msg: "Data not found",
      });
    }

    await db.query("INSERT INTO user_logs (user_id, action) VALUES (?, ?)", [user_id, `Delete Information Test ID-${id}`]);

    return res.status(200).json({
      status: 200,
      msg: "Delete Information Test Successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
