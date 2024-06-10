import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    // console.log(req.body);
    const { email, username, password } = req.body;

    if (
        !email ||
        !email.includes('@') ||
        email === '' ||
        !username ||
        username.length < 3 ||
        username === '' ||
        !password ||
        password.length < 6 ||
        password === ''

    ) {
        next(errorHandler(400, 'All fields are required, username & password must be at least 3 & 6 characters long'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 12);

    const newUser = new User({
        email,
        username,
        password: hashedPassword,
    });
    try {
        await newUser.save();
        res.json({ message: 'User created, signup successful' });
    } catch (error) {
        next(error);
    }


};