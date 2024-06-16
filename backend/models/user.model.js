import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileAvatar: {
        type: String,
        default: "https://img.freepik.com/psd-gratuit/illustration-3d-avatar-profil-humain_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.1788614524.1718150400&semt=sph",
    },
    address: {
        type: String,
        default: "",
    },
    latitude: {
        type: Number,
        default: 0,
    },
    longitude: {
        type: Number,
        default: 0,
    },

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;