import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || email === '' || !password || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }

    try {
        // findOne is going to search for email in the database
        const validUser = await User.findOne({ email });
        // If there is no user with that email
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password'));
        }
        // If everything is correct we are going to create a token for the user
        const token = jwt.sign(
            { userId: validUser._id },
            process.env.JWT_SECRET
        );
        // We don't want to send the password back even if it's hashed
        const { password: pass, ...rest } = validUser._doc;

        // We create a cookie with the token
        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(rest);
    } catch (error) {
        next(error);
    }

};