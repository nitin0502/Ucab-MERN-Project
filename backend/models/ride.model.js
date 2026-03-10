const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    fare: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'completed'], default: 'pending' },
    otp: { type: String, required: true }, // For security during pickup
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('ride', rideSchema);

