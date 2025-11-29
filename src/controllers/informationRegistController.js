import db from "../config/db.js";

export const getInformationRegist = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM student_registration ORDER BY id DESC");
    return res.status(200).json({
      status: 200,
      msg: "Success Get Data Information Registration",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to retrieve data",
      error: error.message,
    });
  }
};

export const submitInformationRegist = async (req, res) => {
  const { nama_gelombang, deskripsi, tanggal_mulai, tanggal_akhir, tahun_ajaran } = req.body;

  try {
    const user_id = req.user_id;
    const sql = `
      INSERT INTO student_registration 
      (nama_gelombang, deskripsi, tanggal_mulai, tanggal_akhir, tahun_ajaran, kouta, status_gelombang) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [nama_gelombang, deskripsi, tanggal_mulai, tanggal_akhir, tahun_ajaran, 2, "aktif"]);

    const informationRegistId = result.insertId;

    await db.query("INSERT INTO user_logs (user_id, action) VALUES (?,?)", [user_id, `Added Information Registration Data ID-${informationRegistId} Name Child ${nama_gelombang}`]);
    return res.status(201).json({
      message: "Create Information successfully",
      data: { id: result.insertId },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getInformationById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT * FROM student_registration WHERE id = ?", [id]);

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

export const updateInformationRegist = async (req, res) => {
  const { id } = req.params;
  const { nama_gelombang, deskripsi, tanggal_mulai, tanggal_akhir, tahun_ajaran, kouta, status_gelombang } = req.body;

  try {
    const user_id = req.user_id;
    const sql = `
      UPDATE student_registration SET
        nama_gelombang = ?,
        deskripsi = ?,
        tanggal_mulai = ?,
        tanggal_akhir = ?,
        tahun_ajaran = ?,
        kouta = ?,
        status_gelombang = ?
      WHERE id = ?
    `;

    const [result] = await db.execute(sql, [nama_gelombang, deskripsi, tanggal_mulai, tanggal_akhir, tahun_ajaran, kouta, status_gelombang, id]);

    const informationRegistId = result.insertId;

    await db.query("INSERT INTO user_logs (user_id, action) VALUES (?,?)", [user_id, `Update Information Registration Data ID-${informationRegistId} Name Child ${nama_gelombang}`]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 404,
        msg: "Data not found",
      });
    }

    return res.status(200).json({
      status: 200,
      msg: "Update Information Successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteInformationRegist = async (req, res) => {
  const { id } = req.params;

  try {
    const user_id = req.user_id;
    const [result] = await db.execute("DELETE FROM student_registration WHERE id = ?", [id]);

    const informationRegistId = id;

    await db.query("INSERT INTO user_logs (user_id, action) VALUES (?,?)", [user_id, `Delete Information Registration Data ID-${informationRegistId}`]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 404,
        msg: "Data not found",
      });
    }

    return res.status(200).json({
      status: 200,
      msg: "Delete Information Successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
