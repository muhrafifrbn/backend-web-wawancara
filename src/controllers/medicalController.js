import db from "../config/db.js";

export const submitMedicalCheckForm = async (req, res) => {
  
  const {
    student_name,
    weight,
    height,
    blood_type,
    participant_card_number,
    place_of_birth,
    date_of_birth,
    gender,
    address,
    medical_notes,
    parent_knowledge_smoking_history,
    parent_knowledge_tattoo_piercing,
    interview_date,
    interviewer_name,
    interviewer_notes,
  } = req.body;

  const query = `
    INSERT INTO medical_check_form (
      student_name, weight, height, blood_type, participant_card_number, place_of_birth,
      date_of_birth, gender, address, medical_notes, 
      parent_knowledge_smoking_history, parent_knowledge_tattoo_piercing, 
      interview_date, interviewer_name, interviewer_notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const user_id = req.user_id;
    const [result] = await db.query(query, [
      student_name,
      weight,
      height,
      blood_type,
      participant_card_number,
      place_of_birth,
      date_of_birth,
      gender,
      address,
      medical_notes,
      parent_knowledge_smoking_history,
      parent_knowledge_tattoo_piercing,
      interview_date,
      interviewer_name,
      interviewer_notes,
    ]);

    const medicaFormId = result.insertId;
  

    await db.query(
      'INSERT INTO user_logs (user_id, action) VALUES (?,?)',
      [user_id,`Added Medical Data ID-${medicaFormId} Name ${student_name}`]
    )

    res.status(201).json({
      message: "Medical check form submitted successfully",
      formId: result.insertId,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Failed to submit medical check form" });
  }
};

export const getMedicalFormsById = async (req, res) => {
  const {id} = req.params;
  const query = `SELECT * FROM medical_check_form WHERE id= ?`;

  try {
    const [result] = await db.query(query, [id]);
    if(result.length === 0 ) {
      return res.status(404).json({error: "Medical form not found"});
    }
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve medical form" });
  }
};

export const getMedicalCheckForms = async (req, res) => {
  const query = `SELECT * FROM medical_check_form`;

  try {
    const [results] = await db.query(query);
    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching medical check forms:", err);
    res.status(500).json({ error: "Failed to retrieve medical check forms" });
  
  }
};

export const updateMedicalCheckForm = async (req, res) => {
  const { id } = req.params;
  const {
    student_name,
    weight,
    height,
    blood_type,
    participant_card_number,
    place_of_birth,
    date_of_birth,
    gender,
    address,
    medical_notes,
    parent_knowledge_smoking_history,
    parent_knowledge_tattoo_piercing,
    interview_date,
    interviewer_name,
    interviewer_notes,
  } = req.body;

  const query = `
    UPDATE medical_check_form SET
      student_name = ?, weight = ?, height = ?, blood_type = ?, participant_card_number = ?,
      place_of_birth = ?, date_of_birth = ?, gender = ?, address = ?, medical_notes = ?,
      parent_knowledge_smoking_history = ?, parent_knowledge_tattoo_piercing = ?,
      interview_date = ?, interviewer_name = ?, interviewer_notes = ?
    WHERE id = ?
  `;

  try {
    const user_id = req.user_id;
    const [result] = await db.query(query, [
      student_name,
      weight,
      height,
      blood_type,
      participant_card_number,
      place_of_birth,
      date_of_birth,
      gender,
      address,
      medical_notes,
      parent_knowledge_smoking_history,
      parent_knowledge_tattoo_piercing,
      interview_date,
      interviewer_name,
      interviewer_notes,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Medical form not found" });
    }

    await db.query(
      'INSERT INTO user_logs (user_id, action) VALUES (?,?)',
      [user_id, `Updated Medical Data ID-${id} Name ${student_name}`]
    );

    res.status(200).json({ message: "Medical check form updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update medical check form" });
  }
};

export const deleteMedicalCheckForm = async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM medical_check_form WHERE id = ?`;

  try {
    const user_id = req.user_id;
    const [result] = await db.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Medical form not found" });
    }

    await db.query(
      'INSERT INTO user_logs (user_id, action) VALUES (?,?)',
      [user_id, `Deleted Medical Data ID-${id}`]
    );

    res.status(200).json({ message: "Medical check form deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete medical check form" });
  }
};
