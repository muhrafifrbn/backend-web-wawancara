import db from "../config/db.js";

export const addRegistrationData = async (req, res) => {
  const {
  competence_id,
  competence_name,
  max_capacity,
  current_registered
  } = req.body;

  const query =`INSERT INTO students_counts (competence_id, competence_name, max_capacity, current_registered) VALUES (?, ?, ?, ?, ?)`;

  try {
    const user_id = req.user_id;
    const [result] = await db.query(query, [
      competence_id,
      competence_name,
      max_capacity,
      current_registered
    ]);

    const registrationFormId = result.insertId

    await db.query("INSERT INTO user_logs (user_id, action) VALUES (?, ?)", [user_id, `Added registration data count ID-${registrationFormId}, Competence: ${competence_name}`]);
    res.status(201).json({ 
      message: "Registration data added successfully",
      formId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit registration data", details: error.message });
  }
}


export const getAllRegistrationData = async (req, res) => {
  const query = "SELECT * FROM student_counts";

  try {
    const [results] = await db.query(query);
    res.status(200).json(results);
  } catch (err) {
    console.error("❌ Error retrieving student counts:", err);
    res.status(500).json({ error: "Failed to retrieve student counts" });
  }
}

export const getRegistrationDataById = async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM student_counts WHERE id = ?";

  try {
    const [results] = await db.query(query, [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: "Student count not found" });
    }
    res.status(200).json(results[0]);
  } catch (err) {
    console.error("❌ Error retrieving student count:", err);
    res.status(500).json({ error: "Failed to retrieve student count" });
  }
}

export const updateRegistrationData = async (req, res) => {
  const { id } = req.params;
  const {
    competence_id,
    competence_name,
    max_capacity,
    current_registered
  } = req.body;

  const query = `UPDATE student_counts SET competence_id = ?, competence_name = ?, max_capacity = ?, current_registered = ? WHERE id = ?`;

  try {
    const user_id = req.user_id;
    const [result] = await db.query(query, [competence_id, competence_name, max_capacity, current_registered, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student count not found" });
    }

    await db.query("INSERT INTO user_logs (user_id, action) VALUES (?, ?)", [user_id, `Updated student count ID-${id}, Competence: ${competence_name}`]);

    res.status(200).json({ message: "Student count updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update student count" });
  }
}

//only updated for max_capacity and current_registered (registrator role only)
export const updateRegistrationCapacity = async (req, res) => {
  const { id } = req.params;
  const { max_capacity, current_registered } = req.body;
  const query = `UPDATE student_counts SET max_capacity = ?, current_registered = ? WHERE id = ?`;
  const oldDataQuery = "SELECT max_capacity, current_registered FROM student_counts WHERE id = ?";

  try {
    // Ambil data lama sebelum update
    const user_id = req.user_id;
    const [oldDataResults] = await db.query(oldDataQuery, [id]);
    if (oldDataResults.length === 0) {
      return res.status(404).json({ error: "Student count not found" });
    }
    const oldData = oldDataResults[0];

    // Update data di database
    const [result] = await db.query(query, [max_capacity, current_registered, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student count not found" });
    }

    // Log perubahan ke user_logs
    await db.query(
      "INSERT INTO user_logs (user_id, action) VALUES (?, ?)",
      [
        user_id,
        `Updated student count ID-${id}: max_capacity from ${oldData.max_capacity} to ${max_capacity}, current_registered from ${oldData.current_registered} to ${current_registered}`
      ]
    );

    res.status(200).json({ message: "Student count updated successfully" });
  } catch (error) {
    console.error("❌ Error updating student count:", error);
    res.status(500).json({ error: "Failed to update student count" });
  }
};

export const deleteRegistrationData = async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM student_counts WHERE id = ?";

  try {
    const user_id = req.user_id;

    // Cek apakah data ada sebelum dihapus
    const [existing] = await db.query("SELECT competence_name FROM student_counts WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: "Student count not found" });
    }

    const competence_name = existing[0].competence_name;

    const [result] = await db.query(query, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student count not found" });
    }

    await db.query(
      "INSERT INTO user_logs (user_id, action) VALUES (?, ?)",
      [user_id, `Deleted Student Data ID-${id} Name ${competence_name}`]
    );

    res.status(200).json({ message: "Student count deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student count", details: error.message });
  }
}
