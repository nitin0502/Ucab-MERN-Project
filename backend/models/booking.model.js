import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
        required: false
    },
    cabId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cab',
        required: false
    },
    pickupLocation: {
        address: {
            type: String,
            required: true
        },
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    dropOffLocation: {
        address: {
            type: String,
            required: true
        },
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    cabType: {
        type: String,
        enum: ['economy', 'comfort', 'premium'],
        required: true
    },
    estimatedFare: {
        type: Number,
        required: true
    },
    estimatedDuration: {
        type: String,
        required: true
    },
    estimatedDistance: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'on_the_way', 'arrived', 'in_progress', 'completed', 'cancelled'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'wallet', 'cash'],
        required: true
    },
    actualFare: {
        type: Number,
        default: null
    },
    discount: {
        type: Number,
        default: 0
    },
    finalAmount: {
        type: Number,
        default: null
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: null
    },
    review: {
        type: String,
        default: null
    },
    startTime: {
        type: Date,
        default: null
    },
    endTime: {
        type: Date,
        default: null
    },
    donations: {
        type: Number,
        default: 0
    },
    refreshments: [{
        name: String,
        price: Number,
        quantity: Number
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('booking', bookingSchema);
