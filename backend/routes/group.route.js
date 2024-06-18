import express from 'express';
import { createGroup, deleteGroup, getAllGroups } from '../controllers/group.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/createGroup', verifyToken, createGroup);
router.get('/', verifyToken, getAllGroups);
router.delete('/delete/:groupId', verifyToken, deleteGroup);


export default router;
