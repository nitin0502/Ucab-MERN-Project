import bookingModel from "../models/booking.model.js";
import cabModel from "../models/cab.model.js";
import rideHistoryModel from "../models/rideHistory.model.js";
import logger from "../utils/logger.js";

export const createBooking = async (req, res) => {
    try {
        const { pickupLocation, dropOffLocation, cabType, estimatedFare, estimatedDuration, estimatedDistance, paymentMethod } = req.body;
        const userId = req.user._id;

        const booking = new bookingModel({
            userId,
            pickupLocation,
            dropOffLocation,
            cabType,
            estimatedFare,
            estimatedDuration,
            estimatedDistance,
            paymentMethod,
            finalAmount: estimatedFare
        });

        await booking.save();

        return res.status(201).json({ message: "Booking created successfully", booking });
    } catch (error) {
        logger.error("Error creating booking:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

export const getNearestCabs = async (req, res) => {
    try {
        const { latitude, longitude, cabType } = req.query;

        const cabs = await cabModel.find({
            isAvailable: true,
            vehicleType: cabType,
            currentLocation: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: 5000 // 5km radius
                }
            }
        }).limit(10)
        .select('licensePlate vehicleType capacity currentLocation rating totalTrips');

        if (!cabs || cabs.length === 0) {
            return res.status(404).json({ message: "No cabs available in your area" });
        }

        return res.status(200).json({ cabs });
    } catch (error) {
        logger.error("Error getting nearest cabs:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

export const acceptBooking = async (req, res) => {
    try {
        const { bookingId, captainId, cabId } = req.body;

        const booking = await bookingModel.findByIdAndUpdate(
            bookingId,
            { 
                status: 'accepted',
                captainId,
                cabId,
                updatedAt: new Date()
            },
            { new: true }
        );

        return res.status(200).json({ message: "Booking accepted", booking });
    } catch (error) {
        logger.error("Error accepting booking:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

export const updateBookingStatus = async (req, res) => {
    try {
        const { bookingId, status } = req.body;

        const booking = await bookingModel.findByIdAndUpdate(
            bookingId,
            { 
                status,
                updatedAt: new Date(),
                ...(status === 'in_progress' && { startTime: new Date() }),
                ...(status === 'completed' && { endTime: new Date() })
            },
            { new: true }
        );

        return res.status(200).json({ message: `Booking status updated to ${status}`, booking });
    } catch (error) {
        logger.error("Error updating booking status:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

export const getBookingDetails = async (req, res) => {
    try {
        const { bookingId } = req.params;

        const booking = await bookingModel.findById(bookingId)
            .populate('userId', 'name email phone')
            .populate('captainId', 'name email phone')
            .populate('cabId', 'licensePlate vehicleType rating');

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        return res.status(200).json({ booking });
    } catch (error) {
        logger.error("Error getting booking details:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

export const completeBooking = async (req, res) => {
    try {
        const { bookingId, actualFare, rating, review, donations, refreshments } = req.body;

        const booking = await bookingModel.findByIdAndUpdate(
            bookingId,
            {
                status: 'completed',
                actualFare,
                finalAmount: actualFare + (donations || 0) + (refreshments?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0),
                rating,
                review,
                donations: donations || 0,
                refreshments: refreshments || [],
                endTime: new Date(),
                updatedAt: new Date()
            },
            { new: true }
        );

        // Save to ride history
        const rideHistory = new rideHistoryModel({
            userId: booking.userId,
            captainId: booking.captainId,
            bookingId: booking._id,
            pickupLocation: booking.pickupLocation.address,
            dropOffLocation: booking.dropOffLocation.address,
            distance: booking.estimatedDistance,
            duration: booking.estimatedDuration,
            fare: booking.estimatedFare,
            actualFare: booking.actualFare,
            discount: booking.discount,
            finalAmount: booking.finalAmount,
            paymentMethod: booking.paymentMethod,
            rating,
            review,
            donations: donations || 0,
            refreshments: refreshments || []
        });

        await rideHistory.save();

        return res.status(200).json({ message: "Booking completed successfully", booking });
    } catch (error) {
        logger.error("Error completing booking:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

export const getUserBookings = async (req, res) => {
    try {
        const userId = req.user._id;

        const bookings = await bookingModel.find({ userId })
            .sort({ createdAt: -1 })
            .populate('captainId', 'name email phone')
            .populate('cabId', 'licensePlate vehicleType');

        return res.status(200).json({ bookings });
    } catch (error) {
        logger.error("Error getting user bookings:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

export const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.body;

        const booking = await bookingModel.findByIdAndUpdate(
            bookingId,
            { 
                status: 'cancelled',
                updatedAt: new Date()
            },
            { new: true }
        );

        return res.status(200).json({ message: "Booking cancelled successfully", booking });
    } catch (error) {
        logger.error("Error cancelling booking:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

export default {
    createBooking,
    getNearestCabs,
    acceptBooking,
    updateBookingStatus,
    getBookingDetails,
    completeBooking,
    getUserBookings,
    cancelBooking
};
