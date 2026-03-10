import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';

const Dashboard = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        name: 'User',
        recentBookings: 0,
        totalSpent: 0,
        rating: 5
    });

    const cardVariants = {
        hover: { y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-24 pb-20">
                {/* Welcome Section */}
                <div className="max-w-7xl mx-auto px-4 mb-12">
                    <motion.div 
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-bold mb-2">Welcome back, {userInfo.name}! 👋</h1>
                        <p className="text-blue-100">Ready for your next adventure? Book a ride now.</p>
                    </motion.div>
                </div>

                {/* Quick Action Buttons */}
                <div className="max-w-7xl mx-auto px-4 mb-12">
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.1 }}
                    >
                        <motion.button 
                            onClick={() => navigate('/book-ride')}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="text-4xl mb-2">🚕</div>
                            <h3 className="text-xl font-semibold text-gray-800">Book a Ride</h3>
                            <p className="text-gray-600">Find and book your next ride</p>
                        </motion.button>

                        <motion.button 
                            onClick={() => navigate('/booking-history')}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="text-4xl mb-2">📋</div>
                            <h3 className="text-xl font-semibold text-gray-800">Booking History</h3>
                            <p className="text-gray-600">View your past rides</p>
                        </motion.button>

                        <motion.button 
                            onClick={() => navigate('/payment-methods')}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="text-4xl mb-2">💳</div>
                            <h3 className="text-xl font-semibold text-gray-800">Payment Methods</h3>
                            <p className="text-gray-600">Manage your payment options</p>
                        </motion.button>

                        <motion.button 
                            onClick={() => navigate('/profile')}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="text-4xl mb-2">👤</div>
                            <h3 className="text-xl font-semibold text-gray-800">My Profile</h3>
                            <p className="text-gray-600">Update your information</p>
                        </motion.button>
                    </motion.div>
                </div>

                {/* Stats Section */}
                <div className="max-w-7xl mx-auto px-4 mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Stats</h2>
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.1 }}
                    >
                        <motion.div 
                            className="bg-blue-50 p-6 rounded-lg border border-blue-200"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="text-3xl font-bold text-blue-600 mb-2">{userInfo.recentBookings}</div>
                            <p className="text-gray-600">Total Rides</p>
                        </motion.div>

                        <motion.div 
                            className="bg-green-50 p-6 rounded-lg border border-green-200"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="text-3xl font-bold text-green-600 mb-2">₹{userInfo.totalSpent}</div>
                            <p className="text-gray-600">Total Spent</p>
                        </motion.div>

                        <motion.div 
                            className="bg-yellow-50 p-6 rounded-lg border border-yellow-200"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="text-3xl font-bold text-yellow-600 mb-2">⭐ {userInfo.rating}</div>
                            <p className="text-gray-600">User Rating</p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Special Offers Section */}
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Special Offers</h2>
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.1 }}
                    >
                        <motion.div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <h3 className="text-xl font-bold mb-2">🎉 First Ride Discount</h3>
                            <p className="mb-4">Get 20% off on your first booking with code UCAB20</p>
                            <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
                                Claim Now
                            </button>
                        </motion.div>

                        <motion.div 
                            className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-lg"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <h3 className="text-xl font-bold mb-2">❤️ Donate & Save</h3>
                            <p className="mb-4">Donate during your ride and get cashback on future rides</p>
                            <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
                                Learn More
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
