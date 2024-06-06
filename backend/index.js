import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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

app.listen(3000, () => {
    console.log('Our server is running on http://localhost:3000');
});