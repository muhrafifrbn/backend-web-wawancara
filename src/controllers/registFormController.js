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
  const { jurusan_dipilih, nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, agama, sekolah_asal, alamat, telepon, email, nama_ayah, nama_ibu, id_gelombang } = req.body;

  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const dateCode = `${year}${month}${day}`;

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

    const newId = result.insertId;

    return res.status(201).json({
      message: "Create Registration Form successfully",
      data: { id: newId, nomor_formulir },
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
