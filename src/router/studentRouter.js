import express from 'express';
import StudentController from '../controller/studentController.js';
import upload from '../middleware/studentcloud.js';

const router = express.Router();

router.post('/',upload.single('studentReport'),StudentController.create)
router.get('/view',StudentController.viewStudents)
router.put('/:id',StudentController.updateStudent)
router.delete('/:id',StudentController.deleteStusdent)
export default router