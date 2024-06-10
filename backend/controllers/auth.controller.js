import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    // console.log(req.body);
    const { username, email, password } = req.body;

    if (
        !username ||
        username === '' ||
        !email ||
        email === '' ||
        !password ||
        password === ''

    ) {
        next(errorHandler(400, 'All fields are required, username & password must be at least 3 & 6 characters long'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });
    try {
        await newUser.save();
        res.json({ message: 'User created, signup successful' });
    } catch (error) {
        next(error);
    }


};