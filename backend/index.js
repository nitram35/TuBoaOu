import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import groupRoutes from './routes/group.route.js';
import cookieParser from 'cookie-parser';
import coordinatesRoutes from './routes/coordinates.route.js';
import barRoutes from './routes/bar.route.js';

dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

const app = express();
// allow json as input to the server
app.use(express.json());
// allow cookies to be parsed by the server (useful in verifyUser.js to verify the token)
app.use(cookieParser());

app.listen(3000, () => {
    console.log('Our server is running on http://localhost:3000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/group', groupRoutes);
app.use('/api/coordinates', coordinatesRoutes);
app.use('/api/bar', barRoutes);

// middleware to handle errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ success: false, statusCode, message, });
});