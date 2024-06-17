import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this user'));
    }
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Password must be at least 6 characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    } else {
        delete req.body.password;
    }

    if (req.body.username) {
        if (req.body.username.length < 5 || req.body.username.length > 15) {
            return next(
                errorHandler(400, 'Username must be between 5 and 15 characters')
            );
        }
        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'Username cannot contain spaces'));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, 'Username must be lowercase'));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(
                errorHandler(400, 'Username can only contain letters and numbers')
            );
        }
    }
    if (req.body.address) {
        if (req.body.address.length < 10) {
            return next(
                errorHandler(400, 'Address must be at least 10 characters long')
            );
        }
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    address: req.body.address,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                },
            },
            { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'Forbidden to delete this user'));
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('User deleted');

    } catch (error) {
        next(error);
    }
};

export const signout = (req, res, next) => {
    try {
        // we clear the cookie
        res.clearCookie('access_token');
        res.status(200).json('Signout successful');
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find(); // Fetch all users from database

        res.status(200).json(users); // Send users as JSON response
    } catch (error) {
        next(error); // Forward error to error handler middleware
    }
};