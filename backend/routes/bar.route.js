import express from 'express';
import { addOrUpdateBar, getInterestCount } from '../controllers/bar.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.post('/addOrUpdateBar', verifyToken, addOrUpdateBar);
router.get('/interestCount/:barId', getInterestCount);

export default router;