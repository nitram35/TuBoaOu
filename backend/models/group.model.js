import mongoose from "mongoose";
import User from "../models/user.model.js";

const groupSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    groupName: {
        type: String,
        required: true,
    },
    members: [{
        user1: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
        user2: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
    }]

}, { timestamps: true });

const Group = mongoose.model("Group", groupSchema);


export default Group;