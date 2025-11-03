import express from 'express';
import {addRegistrationData, getAllRegistrationData, getRegistrationDataById, updateRegistrationData, updateRegistrationCapacity, deleteRegistrationData} from '../controllers/registrationController.js';
import { verifyToken, verifyAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getAllRegistrationData);
router.get('/detail/:id', verifyToken, getRegistrationDataById);
router.put('/update/:id', verifyToken, updateRegistrationCapacity);

//admin only
router.put('/update-data/:id', verifyToken, verifyAdmin, updateRegistrationData);
router.delete('/delete/:id', verifyToken, verifyAdmin, deleteRegistrationData);
router.post('/create', verifyToken, verifyAdmin, addRegistrationData);

export default router;
