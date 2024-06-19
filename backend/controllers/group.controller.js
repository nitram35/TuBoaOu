import Group from "../models/group.model.js";
import User from "../models/user.model.js";
import { ObjectId } from "mongodb";
import { errorHandler } from "../utils/error.js";
import { calculateMeanCoordinates } from "../utils/coordinates.js";

export const createGroup = async (req, res, next) => {
    try {
        const { ownerId, groupName, users } = req.body;

        // Validate input
        if (!ownerId || !groupName || !Array.isArray(users) || users.length === 0) {
            return next(errorHandler(400, 'Invalid input data'));
        }

        const owner = await User.findById(ownerId);
        if (!owner) {
            return next(errorHandler(404, 'Owner not found'));
        }

        // Extract relevant data and calculate mean coordinates
        const usersWithData = users.map(user => ({
            username: user.username,
            email: user.email,
            longitude: user.longitude,
            latitude: user.latitude,
        }));

        const { meanLongitude, meanLatitude } = calculateMeanCoordinates(usersWithData, 'longitude', 'latitude');

        // Create new Group instance
        const group = new Group({
            ownerId: owner._id,
            groupName,
            users: usersWithData,
            meanCoordinates: {
                longitude: meanLongitude,
                latitude: meanLatitude
            }
        });

        // Save the group to the database
        await group.save();

        // Respond with the created group
        res.status(201).json(group);
    } catch (error) {
        next(error);
    }
};



// export const createGroup = async (req, res, next) => {
//     try {
//         const { ownerId, groupName, users } = req.body;
//         // Validate input
//         if (!ownerId || !groupName || !Array.isArray(users)) {
//             return next(errorHandler(400, 'Invalid input data'));
//         }

//         const owner = await User.findById(ownerId);
//         if (!owner) {
//             return next(errorHandler(404, 'Owner not found'));
//         }

//         const usersWithData = users.map(user => ({
//             username: user.username,
//             email: user.email,
//             longitude: user.longitude,
//             latitude: user.latitude,
//         }));

//         const group = new Group({
//             ownerId: owner._id,
//             groupName,
//             users: usersWithData,
//         });

//         await group.save();
//         res.status(201).json(group);
//     } catch (error) {
//         next(error);
//     }
// };

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
};

// Controller function to delete a group by its groupId
export const deleteGroup = async (req, res, next) => {
    try {
        const { groupId } = req.params; // Extract groupId from URL params
        const currentUserId = req.user.id; // Assuming req.user.id is available from authentication middleware

        // Find the group in MongoDB
        const group = await Group.findById(groupId);
        if (!group) {
            return next(errorHandler(404, 'Group not found'));
        }

        // Check if current user is the owner of the group
        if (currentUserId !== group.ownerId.toString()) {
            return next(errorHandler(403, 'Forbidden to delete this group'));
        }

        // Delete the group from MongoDB
        const deletedGroup = await Group.findByIdAndDelete(groupId);

        if (!deletedGroup) {
            return next(errorHandler(404, 'Group not found'));
        }
        res.status(200).json('Group deleted successfully');
    } catch (error) {
        console.error('Error deleting group:', error.message);
        next(error); // Pass the error to the error handling middleware
    }
};