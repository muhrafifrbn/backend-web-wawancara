import express from 'express';
import { addCompetenceToStudent, getCompetencesByStudent, getStudentsByCompetence } from '../controllers/competenceController.js';

const router = express.Router();

router.post('/add-competence', addCompetenceToStudent);
router.get('/competences/:student_id', getCompetencesByStudent);
router.get('/students/:competence_id', getStudentsByCompetence);

export default router;