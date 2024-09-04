import express from 'express';
import upload from '../middleware/membercloud.js';
import MemberController from '../controller/memberController.js';

const router = express.Router();

router.post('/', upload.single('memberImage'), MemberController.createMember);
router.get('/', MemberController.viewMembers);
router.get('/:id', MemberController.viewMember);
router.delete('/:id', MemberController.deleteMember);
// router.delete('/', MemberController.deleteMembers);
router.put('/:id', MemberController.updateMember);
router.post('/login', MemberController.Login);

export default router;
