import db from "../config/db.js";

export const getRegistrationForm = async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT id, nomor_formulir, nama_lengkap, jurusan_dipilih, tanggal_lahir, jenis_kelamin, email
      FROM registration_form
      ORDER BY id DESC
    `);

    return res.status(200).json({
      status: 200,
      message: "Success Get Registration Form Data",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve data",
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
        WHERE tanggal_mulai <= ? AND tanggal_akhir >= ? AND status_gelombang = 'Aktif'
        LIMIT 1
      `,
      [todayStr, todayStr]
    );

    if (gelombang.length === 0) {
      return res.status(400).json({
        status: 400,
        message: "Tidak ada gelombang PPDB yang sedang dibuka.",
      });
    }

    const id_gelombang = gelombang[0].id;

    const dateCode = `${yyyy}${mm}${dd}`;

    const [last] = await db.query(`
      SELECT id FROM registration_form ORDER BY id DESC LIMIT 1
    `);

    const nextID = last.length === 0 ? 1 : last[0].id + 1;

    const nomor_formulir = `PPDB${dateCode}${String(nextID).padStart(4, "0")}`;

    const sql = `
      INSERT INTO registration_form (
        nomor_formulir, jurusan_dipilih, nama_lengkap, tempat_lahir, tanggal_lahir,
        jenis_kelamin, agama, sekolah_asal, alamat, telepon, email,
        nama_ayah, nama_ibu, hasil_lulus , id_gelombang
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [nomor_formulir, jurusan_dipilih, nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, agama, sekolah_asal, alamat, telepon, email, nama_ayah, nama_ibu, "Belum Dikonfirmasi", id_gelombang]);

    return res.status(201).json({
      status: 201,
      message: "Create Registration Form successfully",
      data: { id: result.insertId, nomor_formulir, id_gelombang },
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};

export const getRegistrationFormById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(`SELECT * FROM registration_form WHERE id = ? LIMIT 1`, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Data not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Success Get Data",
      data: rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message,
    });
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
        message: "Data not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Update Registration Form Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message,
    });
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
        message: "Data not found",
      });
    }

    await db.query("INSERT INTO user_logs (user_id, action) VALUES (?,?)", [user_id, `Deleted Registration Form ID-${id}`]);

    return res.status(200).json({
      status: 200,
      message: "Delete Registration Form Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};

export const updateHasilLulus = async (req, res) => {
  const { id } = req.params;
  const { hasil_lulus } = req.body;

  try {
    const user_id = req.user_id;

    // validasi enum
    const allowedStatus = ["Belum Dikonfirmasi", "Lulus", "Tidak Lulus"];

    if (!allowedStatus.includes(hasil_lulus)) {
      return res.status(400).json({
        status: 400,
        message: "Nilai hasil_lulus tidak valid",
      });
    }

    const sql = `
      UPDATE registration_form
      SET hasil_lulus = ?
      WHERE id = ?
    `;

    const [result] = await db.execute(sql, [hasil_lulus, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 404,
        message: "Data not found",
      });
    }

    await db.query("INSERT INTO user_logs (user_id, action) VALUES (?,?)", [user_id, `Update Result Test Registration Form ID-${id}`]);

    return res.status(200).json({
      status: 200,
      message: "Update hasil kelulusan berhasil",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};
