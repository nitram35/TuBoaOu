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
        username: {
            type: String,
            required: true,
        },
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
    ],
    meanCoordinates: {
        longitude: {
            type: Number,

        },
        latitude: {
            type: Number,
        }
    }


}, { timestamps: true });

const Group = mongoose.model("Group", groupSchema);


export default Group;