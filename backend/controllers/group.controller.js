import Group from "../models/group.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const createGroup = async (req, res, next) => {
    try {
        const { ownerId, groupName, users } = req.body;

        // Validate input
        if (!ownerId || !groupName || !Array.isArray(users)) {
            return next(errorHandler(400, 'Invalid input data'));
        }

        const owner = await User.findById(ownerId);
        if (!owner) {
            return next(errorHandler(404, 'Owner not found'));
        }

        const usersWithMail = users.map(user => ({
            email: user.email,
            longitude: user.longitude,
            latitude: user.latitude,
        }));

        const group = new Group({
            ownerId: owner._id,
            groupName,
            users: usersWithMail,
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

export const getGroup = async (req, res, next) => {
    try {
        const { groupId } = req.params;

        const group = await Group.findById(groupId).populate('owner').populate('members.user');
        if (!group) {
            return next(errorHandler(404, 'Group not found'));
        }

        res.status(200).json(group);
    } catch (error) {
        next(error);
    }
};

export const updateGroup = async (req, res, next) => {
    try {
        const { groupId } = req.params;
        const updates = req.body;

        const updatedGroup = await Group.findByIdAndUpdate(groupId, updates, { new: true })
            .populate('owner')
            .populate('members.user');
        if (!updatedGroup) {
            return next(errorHandler(404, 'Group not found'));
        }

        res.status(200).json(updatedGroup);
    } catch (error) {
        next(error);
    }
};

export const deleteGroup = async (req, res, next) => {
    try {
        const { groupId } = req.params;

        await Group.findByIdAndDelete(groupId);
        res.status(200).json({ message: 'Group deleted successfully' });
    } catch (error) {
        next(error);
    }
};
