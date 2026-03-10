import mongoose from "mongoose";

const rideHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
        required: true
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'booking',
        required: true
    },
    pickupLocation: String,
    dropOffLocation: String,
    distance: Number,
    duration: String,
    distance: Number,
    fare: Number,
    actualFare: Number,
    discount: Number,
    finalAmount: Number,
    paymentMethod: {
        type: String,
        enum: ['card', 'wallet', 'cash']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    review: String,
    donations: {
        type: Number,
        default: 0
    },
    refreshments: [{
        name: String,
        price: Number,
        quantity: Number
    }],
    completedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('rideHistory', rideHistorySchema);
