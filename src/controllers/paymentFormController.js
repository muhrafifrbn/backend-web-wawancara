import db from "../config/db.js";
import fs from "fs";

export const getPaymentForm = async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT id, nama_tagihan, nama_bank, bukti_bayar, tanggal_transfer,
             jumlah_tagihan, konfirmasi_pembayaran, id_formulir
      FROM payment_form
      ORDER BY id DESC
    `);

    return res.status(200).json({
      status: 200,
      message: "Success Get Payment Data",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve payment data",
      error: error.message,
    });
  }
};

export const getPaymentFormById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(`SELECT * FROM payment_form WHERE id = ? LIMIT 1`, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Payment data not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Success Get Payment Data",
      data: rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};

export const submitPaymentForm = async (req, res) => {
  const { nama_tagihan, nama_bank, tanggal_transfer, jumlah_tagihan, id_formulir } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({
        status: 400,
        message: "Bukti bayar wajib diupload",
      });
    }

    const bukti_bayar = req.file.filename;

    const sql = `
      INSERT INTO payment_form (
        nama_tagihan, nama_bank, bukti_bayar, tanggal_transfer,
        jumlah_tagihan, konfirmasi_pembayaran, id_formulir
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [nama_tagihan, nama_bank, bukti_bayar, tanggal_transfer, jumlah_tagihan, 0, id_formulir]);

    return res.status(201).json({
      status: 201,
      message: "Payment Form created successfully",
      data: { id: result.insertId },
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};

export const updatePaymentForm = async (req, res) => {
  const { id } = req.params;

  const { nama_tagihan, nama_bank, tanggal_transfer, jumlah_tagihan } = req.body;

  try {
    // Ambil data lama
    const [old] = await db.query(`SELECT bukti_bayar FROM payment_form WHERE id = ? LIMIT 1`, [id]);

    if (old.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Payment data not found",
      });
    }

    let bukti_bayar = old[0].bukti_bayar;

    // Jika upload file baru, hapus file lama
    if (req.file) {
      const oldPath = `./public/payment_form/${bukti_bayar}`;
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      bukti_bayar = req.file.filename;
    }

    const sql = `
      UPDATE payment_form SET
        nama_tagihan = ?,
        nama_bank = ?,
        bukti_bayar = ?,
        tanggal_transfer = ?,
        jumlah_tagihan = ?
        WHERE id = ?
    `;

    const [result] = await db.execute(sql, [nama_tagihan, nama_bank, bukti_bayar, tanggal_transfer, jumlah_tagihan, id]);

    return res.status(200).json({
      status: 200,
      message: "Update Payment Form Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};

export const deletePaymentForm = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(`SELECT bukti_bayar FROM payment_form WHERE id = ? LIMIT 1`, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Payment data not found",
      });
    }

    const fileName = rows[0].bukti_bayar;

    // Hapus file
    const filePath = `./public/payment_form/${fileName}`;
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await db.query(`DELETE FROM payment_form WHERE id = ? LIMIT 1`, [id]);

    return res.status(200).json({
      status: 200,
      message: "Delete Payment Form Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};

export const getPaymentFormByIdFormulir = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(`SELECT * FROM payment_form WHERE id_formulir = ? LIMIT 1`, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Payment data not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Success Get Payment Data",
      data: rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};

export const updateConfirmPayment = async (req, res) => {
  const { id } = req.params;
  const { konfirmasi_pembayaran } = req.body;

  try {
    // Validasi nilai
    if (![0, 1].includes(Number(konfirmasi_pembayaran))) {
      return res.status(400).json({
        status: 400,
        message: "konfirmasi_pembayaran harus bernilai 0 atau 1",
      });
    }

    const [result] = await db.execute(
      `
      UPDATE payment_form
      SET konfirmasi_pembayaran = ?
      WHERE id = ?
      LIMIT 1
      `,
      [konfirmasi_pembayaran, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 404,
        message: "Payment data not found",
      });
    }

    const user_id = req.user_id;

    await db.query("INSERT INTO user_logs (user_id, action) VALUES (?,?)", [user_id, `Updated Confirm Payment ID-${id}`]);

    return res.status(200).json({
      status: 200,
      message: "Konfirmasi pembayaran berhasil diperbarui",
      data: {
        id,
        konfirmasi_pembayaran,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};
