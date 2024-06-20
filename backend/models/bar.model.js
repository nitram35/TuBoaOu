import mongoose from "mongoose";
const barSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    position: {
        longitude: {
            type: Number,
            required: true,
        },
        latitude: {
            type: Number,
            required: true,
        },
    },
    interestCount: { type: Number, default: 0 },
}, { timestamps: true });

const Bar = mongoose.model('Bar', barSchema);
export default Bar;