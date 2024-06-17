import mongoose from "mongoose";
import User from "../models/user.model.js";

const groupSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    groupName: {
        type: String,
        required: true,
    },
    users: [{
        // id: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'User',
        // }
        email: {
            type: String,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
        latitude: {
            type: Number,
            required: true,
        },
    }
    ]


}, { timestamps: true });

const Group = mongoose.model("Group", groupSchema);


export default Group;