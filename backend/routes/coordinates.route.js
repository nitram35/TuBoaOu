import express from 'express';
import { getMeanCoordinates } from '../controllers/coordinates.controller.js';

const router = express.Router();

router.post('/mean-coordinates', getMeanCoordinates);

export default router;
