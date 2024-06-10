import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
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
        return res.status(400).json({ message: 'All fields are required or invalid input' });
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
        res.status(500).json({ message: error.message });
    }


};