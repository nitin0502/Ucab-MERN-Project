import express from 'express';
import bookingController from '../controllers/booking.controller.js';
import auth from '../middlewares/auth.middleware.js';
const router = express.Router();

// Create a new booking
router.post('/create', auth.authUser, bookingController.createBooking);

// Get nearest available cabs
router.get('/nearest-cabs', bookingController.getNearestCabs);

// Accept booking as captain
router.post('/accept', auth.authUser, bookingController.acceptBooking);

// Update booking status
router.put('/status', auth.authUser, bookingController.updateBookingStatus);

// Get booking details
router.get('/:bookingId', auth.authUser, bookingController.getBookingDetails);

// Complete booking with rating and review
router.post('/complete', auth.authUser, bookingController.completeBooking);

// Get user's booking history
router.get('/history/list', auth.authUser, bookingController.getUserBookings);

// Cancel booking
router.post('/cancel', auth.authUser, bookingController.cancelBooking);

export default router;
