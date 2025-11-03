import db from "../config/db.js";

export const submitParentsForm = async (req, res) => {
  const {
    father_name,
    mother_name,
    father_job,
    mother_job,
    father_email,
    mother_email,
    child_name,
    major,
    relationship_to_student,
    additional_info,
    child_status,
    has_serious_illness,
    parent_view_on_child,
    reason_choosing_school,
    parent_view_on_school,
    know_about_school,
    response_to_program,
    willing_to_communicate,
    accept_consequences,
    willing_to_pay_fees, 
    interviewer_notes,
    interviewer_name,
    interview_date,
  } = req.body;

  const query = `
    INSERT INTO parents_form 
      (father_name, mother_name, father_job, mother_job, father_email, mother_email, child_name, major, 
       relationship_to_student, additional_info, child_status, has_serious_illness, parent_view_on_child, 
       reason_choosing_school, parent_view_on_school, know_about_school, response_to_program, willing_to_communicate, 
       accept_consequences, willing_to_pay, interviewer_notes, interview_date, interviewer_name)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const user_id = req.user_id;
    const [result] = await db.query(query, [
      father_name,
      mother_name,
      father_job,
      mother_job,
      father_email,
      mother_email,
      child_name,
      major,
      relationship_to_student,
      additional_info,
      child_status,
      has_serious_illness,
      parent_view_on_child,
      reason_choosing_school,
      parent_view_on_school,
      know_about_school,
      response_to_program,
      willing_to_communicate,
      accept_consequences,
      willing_to_pay_fees,
      interviewer_notes,
      interview_date,
      interviewer_name,
    ]);

    const parentFormId = result.insertId;

    await db.query(
      'INSERT INTO user_logs (user_id, action) VALUES (?,?)',
      [user_id,`Added Parent Data ID-${parentFormId} Name Child ${child_name}`]
    )

    res.status(201).json({
      message: "Parents form submitted successfully",
      formId: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit parents form" });
  }
};

export const getParentsForms = async (req, res) => {
  const query = "SELECT * FROM parents_form";

  try {
    const [results] = await db.query(query);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve parents forms" });
  }
};

export const getParentFormById = async (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM parents_form WHERE id = ?`;

  try {
    const [results] = await db.query(query, [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: "Parent form not found" });
    }
    res.status(200).json(results[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve parent form" });
  
  }
};

export const updateParentsForm = async (req, res) => {
  const { id } = req.params;
  const {
    father_name,
    mother_name,
    father_job,
    mother_job,
    father_email,
    mother_email,
    child_name,
    major,
    relationship_to_student,
    additional_info,
    child_status,
    has_serious_illness,
    parent_view_on_child,
    reason_choosing_school,
    parent_view_on_school,
    know_about_school,
    response_to_program,
    willing_to_communicate,
    accept_consequences,
    willing_to_pay_fees,
    interviewer_notes,
    interviewer_name,
    interview_date,
  } = req.body;

  const query = `
    UPDATE parents_form SET
      father_name = ?, mother_name = ?, father_job = ?, mother_job = ?, father_email = ?, mother_email = ?,
      child_name = ?, major = ?, relationship_to_student = ?, additional_info = ?, child_status = ?,
      has_serious_illness = ?, parent_view_on_child = ?, reason_choosing_school = ?,
      parent_view_on_school = ?, know_about_school = ?, response_to_program = ?, willing_to_communicate = ?,
      accept_consequences = ?, willing_to_pay = ?, interviewer_notes = ?, interview_date = ?, interviewer_name = ?
    WHERE id = ?
  `;

  try {
    const user_id = req.user_id;
    const [result] = await db.query(query, [
      father_name,
      mother_name,
      father_job,
      mother_job,
      father_email,
      mother_email,
      child_name,
      major,
      relationship_to_student,
      additional_info,
      child_status,
      has_serious_illness,
      parent_view_on_child,
      reason_choosing_school,
      parent_view_on_school,
      know_about_school,
      response_to_program,
      willing_to_communicate,
      accept_consequences,
      willing_to_pay_fees,
      interviewer_notes,
      interview_date,
      interviewer_name,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Parent form not found" });
    }

    await db.query(
      'INSERT INTO user_logs (user_id, action) VALUES (?,?)',
      [user_id, `Updated Parent Data ID-${id} Name Child ${child_name}`]
    );

    res.status(200).json({ message: "Parent form updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update parent form" });
  }
};

export const deleteParentsForm = async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM parents_form WHERE id = ?`;

  try {
    const user_id = req.user_id;
    const [result] = await db.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Parent form not found" });
    }

    await db.query(
      'INSERT INTO user_logs (user_id, action) VALUES (?,?)',
      [user_id, `Deleted Parent Data ID-${id}`]
    );

    res.status(200).json({ message: "Parent form deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete parent form" });
  }
};
