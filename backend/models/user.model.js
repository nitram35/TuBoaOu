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
        default: "https://static.wikia.nocookie.net/movie-heroes-and-villains/images/e/e8/Jake_Sully.png/revision/latest?cb=20230819025438",
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;