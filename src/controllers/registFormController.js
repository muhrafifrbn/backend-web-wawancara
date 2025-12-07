import db from "../config/db.js";

export const getRegistrationForm = async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT *
      FROM registration_form
      ORDER BY id DESC
    `);

    return res.status(200).json({
      status: 200,
      msg: "Success Get Registration Form Data",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to retrieve data",
      error: error.message,
    });
  }
};

export const submitRegistrationForm = async (req, res) => {
  const { jurusan_dipilih, nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, agama, sekolah_asal, alamat, telepon, email, nama_ayah, nama_ibu } = req.body;

  try {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    const [gelombang] = await db.query(
      `
        SELECT id 
        FROM student_registration
        WHERE tanggal_mulai <= ? AND tanggal_akhir >= ?
        LIMIT 1
      `,
      [todayStr, todayStr]
    );

    if (gelombang.length === 0) {
      return res.status(400).json({
        message: "Tidak ada gelombang PPDB yang sedang dibuka.",
      });
    }

    const id_gelombang = gelombang[0].id;

    const dateCode = `${yyyy}${mm}${dd}`;

    const [rows] = await db.query("SELECT COUNT(*) AS total FROM registration_form");
    const nextNumber = rows[0].total + 1;
    const counter = String(nextNumber).padStart(4, "0");

    const nomor_formulir = `PPDB${dateCode}${counter}`;

    const sql = `
      INSERT INTO registration_form (
        nomor_formulir, jurusan_dipilih, nama_lengkap, tempat_lahir, tanggal_lahir,
        jenis_kelamin, agama, sekolah_asal, alamat, telepon, email,
        nama_ayah, nama_ibu, id_gelombang
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [nomor_formulir, jurusan_dipilih, nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, agama, sekolah_asal, alamat, telepon, email, nama_ayah, nama_ibu, id_gelombang]);

    return res.status(201).json({
      message: "Create Registration Form successfully",
      data: { id: result.insertId, nomor_formulir, id_gelombang },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getRegistrationFormById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(`SELECT * FROM registration_form WHERE id = ?`, [id]);

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

export const updateRegistrationForm = async (req, res) => {
  const { id } = req.params;

  const { jurusan_dipilih, nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, agama, sekolah_asal, alamat, telepon, email, nama_ayah, nama_ibu } = req.body;

  try {
    const sql = `
      UPDATE registration_form SET
        jurusan_dipilih = ?,
        nama_lengkap = ?,
        tempat_lahir = ?,
        tanggal_lahir = ?,
        jenis_kelamin = ?,
        agama = ?,
        sekolah_asal = ?,
        alamat = ?,
        telepon = ?,
        email = ?,
        nama_ayah = ?,
        nama_ibu = ?
      WHERE id = ?
    `;

    const [result] = await db.execute(sql, [jurusan_dipilih, nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, agama, sekolah_asal, alamat, telepon, email, nama_ayah, nama_ibu, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 404,
        msg: "Data not found",
      });
    }

    return res.status(200).json({
      status: 200,
      msg: "Update Registration Form Successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteRegistrationForm = async (req, res) => {
  const { id } = req.params;

  try {
    const user_id = req.user_id;

    const [result] = await db.execute("DELETE FROM registration_form WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 404,
        msg: "Data not found",
      });
    }

    await db.query("INSERT INTO user_logs (user_id, action) VALUES (?,?)", [user_id, `Deleted Registration Form ID-${id}`]);

    return res.status(200).json({
      status: 200,
      msg: "Delete Registration Form Successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
