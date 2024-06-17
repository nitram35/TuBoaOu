import Group from "../models/group.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const createGroup = async (req, res, next) => {
    try {
        console.log('Request Body:', req.body);

        const { ownerId, groupName, users } = req.body;

        // Validate input
        if (!ownerId || !groupName || !Array.isArray(users)) {
            return next(errorHandler(400, 'Invalid input data'));
        }

        const owner = await User.findById(ownerId);
        if (!owner) {
            return next(errorHandler(404, 'Owner not found'));
        }

        const usersWithData = users.map(user => ({
            username: user.username,
            email: user.email,
            longitude: user.longitude,
            latitude: user.latitude,
        }));

        const group = new Group({
            ownerId: owner._id,
            groupName,
            users: usersWithData,
        });

        await group.save();
        res.status(201).json(group);
    } catch (error) {
        next(error);
    }
};

// const members = await User.find({ '_id': { $in: users } });
// // if (members.length !== users.length) {
// //     return next(errorHandler(404, 'One or more members not found'));
// // }
// const members = users;

// const usersWithCoordinates = members.map(member => ({
//     users: member.mail,
// }));

export const getAllGroups = async (req, res, next) => {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
    } catch (error) {
        next(error);
    }
}
