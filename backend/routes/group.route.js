import express from 'express';
import { createGroup, getGroup, updateGroup, deleteGroup } from '../controllers/group.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/createGroup', verifyToken, createGroup);
router.get('/:groupId', verifyToken, getGroup);
router.put('/update/:groupId', verifyToken, updateGroup);
router.delete('/delete/:groupId', verifyToken, deleteGroup);

export default router;
