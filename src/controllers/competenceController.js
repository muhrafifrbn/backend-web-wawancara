import db from "../config/db.js";

export const addCompetenceToStudent = async (req, res) => {
  const { student_id, competence_id } = req.body;

  try {
    const [studentResults] = await db.query('SELECT * FROM student_form WHERE id = ?', [student_id]);
    if (studentResults.length === 0) {
      return res.status(404).json({ msg: "Student not found" });
    }

    const [competenceResults] = await db.query('SELECT * FROM competences WHERE id = ?', [competence_id]);
    if (competenceResults.length === 0) {
      return res.status(404).json({ msg: "Competence not found" });
    }

    const [insertResults] = await db.query('INSERT INTO student_competences (student_id, competence_id) VALUES (?, ?)', [student_id, competence_id]);

    return res.status(201).json({ msg: "Competence added to student", insertId: insertResults.insertId });
  } catch (error) {
    console.error("Error adding competence to student:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const getCompetencesByStudent = async (req, res) => {
  const { student_id } = req.params;

  try {
    const [results] = await db.query(`
      SELECT c.competence_name
      FROM student_competences sc
      JOIN competences c ON sc.competence_id = c.id
      WHERE sc.student_id = ?`, [student_id]);

    return res.status(200).json({ competences: results });
  } catch (error) {
    console.error("Error fetching competences by student:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const getStudentsByCompetence = async (req, res) => {
  const { competence_id } = req.params;

  try {
    const [results] = await db.query(`
      SELECT s.student_name
      FROM student_competences sc
      JOIN student_form s ON sc.student_id = s.id
      WHERE sc.competence_id = ?`, [competence_id]);

    return res.status(200).json({ students: results });
  } catch (error) {
    console.error("Error fetching students by competence:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};