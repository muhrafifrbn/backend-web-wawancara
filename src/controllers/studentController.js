import db from "../config/db.js";

export const submitStudentForm = async (req, res) => {
  const {
    student_name,
    student_email,
    student_phone_number,
    place_of_birth,
    date_of_birth,
    gender,
    religion,
    nationality,
    previous_school,
    student_vision,
    student_mission,
    skill_competence,
    reason_choosing_competence,
    knowledge_about_competence,
    has_competence_work,
    motivation_for_competence,
    expectations_for_competence,
    reason_choosing_school,
    active_in_extracurricular,
    achievements,
    agree_to_rules,
    ever_broken_rules,
    interviewer_notes,
    interviewer_name,
    interview_date,
  } = req.body;

  const query = `
    INSERT INTO student_form (
      student_name, student_email, student_phone_number, place_of_birth,
      date_of_birth, gender, religion, nationality, previous_school, student_vision, student_mission, skill_competence,
      reason_choosing_competence, knowledge_about_competence, has_competence_work,
      motivation_for_competence, expectations_for_competence, reason_choosing_school,
      active_in_extracurricular, achievements, agree_to_rules, ever_broken_rules,
      interviewer_notes, interviewer_name, interview_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const user_id = req.user_id;
    const [result] = await db.query(query, [
      student_name,
      student_email,
      student_phone_number,
      place_of_birth,
      date_of_birth,
      gender,
      religion,
      nationality,
      previous_school,
      student_vision,
      student_mission,
      skill_competence,
      reason_choosing_competence,
      knowledge_about_competence,
      has_competence_work,
      motivation_for_competence,
      expectations_for_competence,
      reason_choosing_school,
      active_in_extracurricular,
      achievements,
      agree_to_rules,
      ever_broken_rules,
      interviewer_notes,
      interviewer_name,
      interview_date,
    ]);

    const studentFormId = result.insertId;

    await db.query(
      'INSERT INTO user_logs (user_id, action) VALUES (?,?)',
      [user_id,`Added Student Data ID-${studentFormId} Name Child ${student_name}`]
    )


    res.status(201).json({
      message: "Student form submitted successfully",
      formId: result.insertId,
    });
  } catch (err) {
    console.error("Error inserting student form:", err);
    res.status(500).json({ error: "Failed to submit student form", details: err.message });
  }
};

export const getStudentForms = async (req, res) => {
  const query = "SELECT * FROM student_form";

  try {
    const [results] = await db.query(query);
    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching student forms:", err);
    res.status(500).json({ error: "Failed to retrieve student forms", details: err.message });
  }
};

export const getStudentFormById = async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM student_form WHERE id = ?";

  try {
    const [results] = await db.query(query, [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: "Student form not found" });
    }
    res.status(200).json(results[0]);
  } catch (err) {
    console.error("Error fetching student form by ID:", err);
    res.status(500).json({ error: "Failed to retrieve student form", details: err.message });
  }
};

export const updateStudentForm = async (req, res) => {
  const { id } = req.params;
  const {
    student_name,
    student_email,
    student_phone_number,
    place_of_birth,
    date_of_birth,
    gender,
    religion,
    nationality,
    previous_school,
    student_vision,
    student_mission,
    skill_competence,
    reason_choosing_competence,
    knowledge_about_competence,
    has_competence_work,
    motivation_for_competence,
    expectations_for_competence,
    reason_choosing_school,
    active_in_extracurricular,
    achievements,
    agree_to_rules,
    ever_broken_rules,
    interviewer_notes,
    interviewer_name,
    interview_date,
  } = req.body;

  const query = `
    UPDATE student_form SET
      student_name = ?, student_email = ?, student_phone_number = ?, place_of_birth = ?,
      date_of_birth = ?, gender = ?, religion = ?, nationality = ?, previous_school = ?,
      student_vision = ?, student_mission = ?, skill_competence = ?,
      reason_choosing_competence = ?, knowledge_about_competence = ?, has_competence_work = ?,
      motivation_for_competence = ?, expectations_for_competence = ?, reason_choosing_school = ?,
      active_in_extracurricular = ?, achievements = ?, agree_to_rules = ?, ever_broken_rules = ?,
      interviewer_notes = ?, interviewer_name = ?, interview_date = ?
    WHERE id = ?
  `;

  try {
    const user_id = req.user_id;
    const [result] = await db.query(query, [
      student_name,
      student_email,
      student_phone_number,
      place_of_birth,
      date_of_birth,
      gender,
      religion,
      nationality,
      previous_school,
      student_vision,
      student_mission,
      skill_competence,
      reason_choosing_competence,
      knowledge_about_competence,
      has_competence_work,
      motivation_for_competence,
      expectations_for_competence,
      reason_choosing_school,
      active_in_extracurricular,
      achievements,
      agree_to_rules,
      ever_broken_rules,
      interviewer_notes,
      interviewer_name,
      interview_date,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student form not found" });
    }

    await db.query(
      "INSERT INTO user_logs (user_id, action) VALUES (?, ?)",
      [user_id, `Updated Student Data ID-${id} Name ${student_name}`]
    );

    res.status(200).json({ message: "Student form updated successfully" });
  } catch (err) {
    console.error("Error updating student form:", err);
    res.status(500).json({ error: "Failed to update student form", details: err.message });
  }
};

export const deleteStudentForm = async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM student_form WHERE id = ?";

  try {
    const user_id = req.user_id;

    // Cek apakah data ada sebelum dihapus
    const [existing] = await db.query("SELECT student_name FROM student_form WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: "Student form not found" });
    }

    const student_name = existing[0].student_name;

    const [result] = await db.query(query, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student form not found" });
    }

    await db.query(
      "INSERT INTO user_logs (user_id, action) VALUES (?, ?)",
      [user_id, `Deleted Student Data ID-${id} Name ${student_name}`]
    );

    res.status(200).json({ message: "Student form deleted successfully" });
  } catch (err) {
    console.error("Error deleting student form:", err);
    res.status(500).json({ error: "Failed to delete student form", details: err.message });
  }
};
