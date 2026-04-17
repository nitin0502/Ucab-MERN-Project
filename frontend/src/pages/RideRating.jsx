import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../components/navbar';

const RideRating = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [donation, setDonation] = useState(0);
    const [refreshments, setRefreshments] = useState([]);
    const [showRefreshments, setShowRefreshments] = useState(false);
    const [bookingData, setBookingData] = useState(null);
    const [loadingBooking, setLoadingBooking] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const refreshmentOptions = [
        { id: 1, name: 'Water Bottle', price: 20 },
        { id: 2, name: 'Coffee', price: 50 },
        { id: 3, name: 'Snack Pack', price: 80 },
        { id: 4, name: 'Energy Drink', price: 40 }
    ];

    const handleRating = (value) => {
        setRating(value);
    };

    const handleRefreshmentSelect = (refreshment) => {
        const existing = refreshments.find(r => r.id === refreshment.id);
        if (existing) {
            setRefreshments(refreshments.map(r =>
                r.id === refreshment.id ? { ...r, quantity: r.quantity + 1 } : r
            ));
        } else {
            setRefreshments([...refreshments, { ...refreshment, quantity: 1 }]);
        }
    };

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const bookingId = location.state?.bookingId;
                if (!bookingId) return;

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/booking/${bookingId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setBookingData(data.booking);
                }
            } catch (error) {
                console.error('Error fetching booking details:', error);
            } finally {
                setLoadingBooking(false);
            }
        };

        fetchBooking();
    }, [location.state?.bookingId]);

    const handleSubmit = async () => {
        try {
            if (!rating) {
                alert('Please rate your ride before completing');
                return;
            }

            if (!location.state?.bookingId) {
                alert('Booking ID not found. Please try again!');
                return;
            }

            setIsSubmitting(true);

            const baseFare = bookingData?.estimatedFare ?? 285;
            const refreshmentTotal = refreshments.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const actualFare = baseFare + donation + refreshmentTotal;

            console.log('Submitting ride completion:', {
                bookingId: location.state?.bookingId,
                actualFare,
                rating,
                review,
                donations: donation,
                refreshments
            });

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/booking/complete`,
                {
                    bookingId: location.state?.bookingId,
                    actualFare,
                    rating,
                    review,
                    donations: donation,
                    refreshments: refreshments.map(r => ({
                        name: r.name,
                        price: r.price,
                        quantity: r.quantity
                    }))
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            alert('Thank you for your ride! Your feedback has been recorded.');
            navigate('/booking-history');
        } catch (error) {
            console.error('Error submitting rating:', error);
            alert(`Error occurred: ${error.response?.data?.error || error.message}. Please try again!`);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-24 pb-20">
                <div className="max-w-2xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Ride Completed */}
                        <motion.div 
                            className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-lg shadow-lg mb-8 text-center"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                        >
                            <div className="text-6xl mb-4">✅</div>
                            <h1 className="text-3xl font-bold mb-2">Ride Completed!</h1>
                            <p className="text-green-100">Thank you for choosing Ucab</p>
                        </motion.div>

                        {/* Rating Section */}
                        <motion.div 
                            className="bg-white p-8 rounded-lg shadow-lg mb-8"
                            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">How was your ride?</h2>
                            <div className="flex justify-center gap-4 mb-8">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <motion.button
                                        key={star}
                                        onClick={() => handleRating(star)}
                                        className="text-5xl transition-transform"
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {star <= rating ? '⭐' : '☆'}
                                    </motion.button>
                                ))}
                            </div>
                            {rating > 0 && (
                                <p className="text-center text-gray-600 font-semibold">
                                    You rated this ride {rating} star{rating !== 1 ? 's' : ''}
                                </p>
                            )}
                        </motion.div>

                        {/* Review Section */}
                        <motion.div 
                            className="bg-white p-8 rounded-lg shadow-lg mb-8"
                            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Leave a Review (Optional)</h2>
                            <textarea
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder="Tell us about your experience..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                rows="4"
                            />
                        </motion.div>

                        {/* Donation Section */}
                        <motion.div 
                            className="bg-white p-8 rounded-lg shadow-lg mb-8"
                            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">❤️ Donate to Charity</h2>
                            <p className="text-gray-600 mb-4">Contribute to a good cause with your ride fare</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                {[50, 100, 200, 500].map(amount => (
                                    <motion.button
                                        key={amount}
                                        onClick={() => setDonation(amount)}
                                        className={`p-4 rounded-lg border-2 font-semibold transition-all ${
                                            donation === amount
                                                ? 'border-red-500 bg-red-50 text-red-600'
                                                : 'border-gray-300 bg-white text-gray-800'
                                        }`}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        ₹{amount}
                                    </motion.button>
                                ))}
                            </div>
                            <input
                                type="number"
                                placeholder="Custom amount"
                                value={donation === 0 ? '' : donation}
                                onChange={(e) => setDonation(e.target.value ? parseInt(e.target.value) : 0)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </motion.div>

                        {/* Refreshments Section */}
                        <motion.div 
                            className="bg-white p-8 rounded-lg shadow-lg mb-8"
                            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        >
                            <button
                                onClick={() => setShowRefreshments(!showRefreshments)}
                                className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2"
                            >
                                🍹 Buy Refreshments
                                <span className="text-sm text-gray-600 font-normal">(Optional)</span>
                            </button>

                            {showRefreshments && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {refreshmentOptions.map(item => (
                                        <motion.button
                                            key={item.id}
                                            onClick={() => handleRefreshmentSelect(item)}
                                            className="p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <h3 className="font-bold text-gray-800">{item.name}</h3>
                                            <p className="text-blue-600 font-semibold">₹{item.price}</p>
                                        </motion.button>
                                    ))}
                                </div>
                            )}

                            {refreshments.length > 0 && (
                                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-bold text-gray-800 mb-3">Selected Items:</h4>
                                    {refreshments.map(item => (
                                        <div key={item.id} className="flex justify-between text-gray-700 mb-2">
                                            <span>{item.name} x{item.quantity}</span>
                                            <span>₹{item.price * item.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Summary */}
                        <motion.div 
                            className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg border-2 border-blue-200 mb-8"
                            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Fare Summary</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-gray-700">
                                    <span>Base Fare</span>
                                    <span>₹{bookingData?.estimatedFare ?? 285}</span>
                                </div>
                                {donation > 0 && (
                                    <div className="flex justify-between text-gray-700">
                                        <span>Donation</span>
                                        <span>₹{donation}</span>
                                    </div>
                                )}
                                {refreshments.length > 0 && (
                                    <div className="flex justify-between text-gray-700">
                                        <span>Refreshments</span>
                                        <span>₹{refreshments.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                                    </div>
                                )}
                                <div className="border-t-2 border-blue-300 pt-2 flex justify-between text-lg font-bold text-blue-600">
                                    <span>Total Amount</span>
                                    <span>₹{(bookingData?.estimatedFare ?? 285) + donation + refreshments.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            onClick={handleSubmit}
                            disabled={isSubmitting || !rating}
                            className={`w-full py-4 rounded-lg font-bold text-lg transition-colors mb-4 ${
                                isSubmitting || !rating
                                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                            whileHover={!isSubmitting && rating ? { scale: 1.02 } : {}}
                            whileTap={!isSubmitting && rating ? { scale: 0.98 } : {}}
                        >
                            {isSubmitting ? '⏳ Processing...' : rating ? 'Complete Ride' : '⭐ Rate your ride first'}
                        </motion.button>

                        <motion.button
                            onClick={() => navigate('/booking-history')}
                            className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Skip for Now
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default RideRating;
