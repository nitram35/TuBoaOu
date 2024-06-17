import express from 'express';
import { deleteUser, signout, getAllUsers, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Route to get all users
router.get('/', verifyToken, getAllUsers);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);

export default router;