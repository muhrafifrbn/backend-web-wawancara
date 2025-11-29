import db from "../config/db.js";

// GET ALL
export const getTestSchedule = async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT ts.*, sr.nama_gelombang
      FROM test_schedule ts
      LEFT JOIN student_registration sr ON ts.id_gelombang = sr.id
      ORDER BY ts.id DESC
    `);

    return res.status(200).json({
      status: 200,
      msg: "Success Get Test Schedule Data",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to retrieve data",
      error: error.message,
    });
  }
};

// GET BY ID
export const getTestScheduleById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      `
      SELECT ts.*, sr.nama_gelombang 
      FROM test_schedule ts
      LEFT JOIN student_registration sr ON ts.id_gelombang = sr.id
      WHERE ts.id = ?
      `,
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

// CREATE
export const submitTestSchedule = async (req, res) => {
  const { tanggal_tes, jam_mulai, jam_selesai, informasi_ruangan, id_gelombang } = req.body;

  try {
    const user_id = req.user_id;

    const sql = `
      INSERT INTO test_schedule
      (tanggal_tes, jam_mulai, jam_selesai, informasi_ruangan, id_gelombang)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      tanggal_tes, 
      jam_mulai, 
      jam_selesai, 
      informasi_ruangan, 
      id_gelombang
    ]);

    const insertedId = result.insertId;

    await db.query(
      "INSERT INTO user_logs (user_id, action) VALUES (?, ?)",
      [user_id, `Added Test Schedule ID-${insertedId}`]
    );

    return res.status(201).json({
      status: 201,
      msg: "Create Test Schedule successfully",
      data: { id: insertedId },
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// UPDATE
export const updateTestSchedule = async (req, res) => {
  const { id } = req.params;
  const { tanggal_tes, jam_mulai, jam_selesai, informasi_ruangan, id_gelombang } = req.body;

  try {
    const user_id = req.user_id;

    const sql = `
      UPDATE test_schedule SET
        tanggal_tes = ?,
        jam_mulai = ?,
        jam_selesai = ?,
        informasi_ruangan = ?,
        id_gelombang = ?
      WHERE id = ?
    `;

    const [result] = await db.execute(sql, [
      tanggal_tes,
      jam_mulai,
      jam_selesai,
      informasi_ruangan,
      id_gelombang,
      id
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 404,
        msg: "Data not found",
      });
    }

    await db.query(
      "INSERT INTO user_logs (user_id, action) VALUES (?, ?)",
      [user_id, `Update Test Schedule ID-${id}`]
    );

    return res.status(200).json({
      status: 200,
      msg: "Update Test Schedule Successfully",
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// DELETE
export const deleteTestSchedule = async (req, res) => {
  const { id } = req.params;

  try {
    const user_id = req.user_id;

    const [result] = await db.execute("DELETE FROM test_schedule WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 404,
        msg: "Data not found",
      });
    }

    await db.query(
      "INSERT INTO user_logs (user_id, action) VALUES (?, ?)",
      [user_id, `Delete Test Schedule ID-${id}`]
    );

    return res.status(200).json({
      status: 200,
      msg: "Delete Test Schedule Successfully",
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
