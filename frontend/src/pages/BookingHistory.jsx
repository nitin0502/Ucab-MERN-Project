import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../components/navbar';

const BookingHistory = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([
        {
            _id: 1,
            pickupLocation: { address: 'Central Delhi' },
            dropOffLocation: { address: 'Airport Terminal 3' },
            estimatedFare: 285,
            actualFare: 310,
            discount: 20,
            finalAmount: 290,
            status: 'completed',
            rating: 5,
            review: 'Excellent service!',
            createdAt: '2024-03-01',
            captainId: { name: 'John Smith' }
        },
        {
            _id: 2,
            pickupLocation: { address: 'Brigade Road' },
            dropOffLocation: { address: 'MG Road Station' },
            estimatedFare: 150,
            actualFare: 165,
            discount: 15,
            finalAmount: 150,
            status: 'completed',
            rating: 4,
            review: 'Good ride',
            createdAt: '2024-02-28',
            captainId: { name: 'Sarah Johnson' }
        }
    ]);
    const [loading, setLoading] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        fetchBookingHistory();
    }, []);

    const fetchBookingHistory = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/booking/history/list`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setBookings(response.data.bookings || bookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
            pending: 'bg-yellow-100 text-yellow-800',
            in_progress: 'bg-blue-100 text-blue-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-24 pb-20">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-4xl font-bold text-gray-800">Booking History</h1>
                            <motion.button
                                onClick={() => navigate('/book-ride')}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                + Book New Ride
                            </motion.button>
                        </div>

                        {loading ? (
                            <div className="text-center py-12">
                                <p className="text-gray-600">Loading your bookings...</p>
                            </div>
                        ) : bookings.length === 0 ? (
                            <motion.div 
                                className="bg-white p-12 rounded-lg shadow-lg text-center"
                                whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            >
                                <div className="text-6xl mb-4">📋</div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">No Rides Yet</h2>
                                <p className="text-gray-600 mb-6">Start your first journey with Ucab today!</p>
                                <motion.button
                                    onClick={() => navigate('/book-ride')}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Book Your First Ride
                                </motion.button>
                            </motion.div>
                        ) : (
                            <div className="space-y-4">
                                {bookings.map((booking, index) => (
                                    <motion.div
                                        key={booking._id}
                                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -2 }}
                                    >
                                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                            {/* Trip Info */}
                                            <div className="flex-1">
                                                <div className="flex items-start gap-4">
                                                    <div className="text-2xl">🚕</div>
                                                    <div>
                                                        <div className="flex items-center gap-4 mb-2">
                                                            <p className="font-bold text-gray-800">
                                                                {booking.pickupLocation.address} → {booking.dropOffLocation.address}
                                                            </p>
                                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                                                                {booking.status.replace('_', ' ').toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-600 text-sm">Driver: {booking.captainId?.name || 'N/A'}</p>
                                                        <p className="text-gray-500 text-xs mt-1">
                                                            {new Date(booking.createdAt).toLocaleDateString()} at {new Date(booking.createdAt).toLocaleTimeString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Rating & Amount */}
                                            <div className="text-right">
                                                {booking.rating && (
                                                    <div className="mb-2">
                                                        <p className="text-yellow-500 text-lg">
                                                            {Array(booking.rating).fill('⭐').join('')}
                                                        </p>
                                                    </div>
                                                )}
                                                <p className="text-2xl font-bold text-blue-600">
                                                    ₹{booking.finalAmount || booking.actualFare || booking.estimatedFare}
                                                </p>
                                                {booking.discount > 0 && (
                                                    <p className="text-green-600 text-sm">Discount: -₹{booking.discount}</p>
                                                )}
                                            </div>

                                            {/* View Details Button */}
                                            <motion.button
                                                onClick={() => setSelectedBooking(booking)}
                                                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                View Details
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Details Modal */}
            {selectedBooking && (
                <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setSelectedBooking(null)}
                >
                    <motion.div
                        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto p-8"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Ride Details</h2>
                            <button
                                onClick={() => setSelectedBooking(null)}
                                className="text-gray-600 hover:text-gray-800 text-2xl"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-600 text-sm">Pickup Location</p>
                                    <p className="font-bold text-gray-800">{selectedBooking.pickupLocation.address}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-600 text-sm">Drop-off Location</p>
                                    <p className="font-bold text-gray-800">{selectedBooking.dropOffLocation.address}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-600 text-sm">Estimated Fare</p>
                                    <p className="font-bold text-gray-800">₹{selectedBooking.estimatedFare}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-600 text-sm">Actual Fare</p>
                                    <p className="font-bold text-gray-800">₹{selectedBooking.actualFare || selectedBooking.estimatedFare}</p>
                                </div>
                            </div>

                            {selectedBooking.discount > 0 && (
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <p className="text-gray-600 text-sm">Discount Applied</p>
                                    <p className="font-bold text-green-600">-₹{selectedBooking.discount}</p>
                                </div>
                            )}

                            {selectedBooking.review && (
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <p className="text-gray-600 text-sm">Your Review</p>
                                    <p className="font-semibold text-gray-800">⭐ {selectedBooking.rating}/5</p>
                                    <p className="text-gray-700 mt-2">{selectedBooking.review}</p>
                                </div>
                            )}
                        </div>

                        <motion.button
                            onClick={() => setSelectedBooking(null)}
                            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Close
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default BookingHistory;
