import express from 'express';
import { createGroup, getAllGroups } from '../controllers/group.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/createGroup', verifyToken, createGroup);
router.get('/', verifyToken, getAllGroups);


export default router;
