import mongoose from "mongoose";

const cabSchema = new mongoose.Schema({
    captainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
        required: true
    },
    licensePlate: {
        type: String,
        required: true,
        unique: true
    },
    vehicleType: {
        type: String,
        enum: ['economy', 'comfort', 'premium'],
        required: true
    },
    capacity: {
        type: Number,
        default: 4
    },
    currentLocation: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5
    },
    totalTrips: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('cab', cabSchema);
