import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

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

app.listen(3000, () => {
    console.log('Our server is running on http://localhost:3000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);