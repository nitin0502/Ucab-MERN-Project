import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';

const RideTracking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [rideStatus, setRideStatus] = useState('on_the_way');
    const [driverInfo, setDriverInfo] = useState({
        name: 'John Smith',
        rating: 4.8,
        vehicle: 'Toyota Fortuner',
        licensePlate: 'DL01AB1234',
        phone: '+91 98765 43210'
    });
    const [eta, setEta] = useState('12 mins');
    const [distance, setDistance] = useState('8.5 km');

    useEffect(() => {
        // Simulate ride status updates
        const timer = setTimeout(() => setRideStatus('arrived'), 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleEndRide = () => {
        navigate('/rating', { state: { bookingId: location.state?.bookingId } });
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
                        {/* Map Section */}
                        <motion.div 
                            className="bg-white rounded-lg shadow-lg overflow-hidden mb-8"
                            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        >
                            <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-6xl mb-4">🗺️</div>
                                    <p className="text-gray-600 font-semibold">Live Map - Real-time Tracking</p>
                                    <p className="text-gray-500 text-sm mt-2">Your driver location will appear here</p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {/* Status Card */}
                            <motion.div 
                                className="bg-white p-6 rounded-lg shadow-lg"
                                whileHover={{ y: -5 }}
                            >
                                <h3 className="text-gray-600 font-semibold mb-2">Ride Status</h3>
                                <p className="text-2xl font-bold text-blue-600 capitalize">{rideStatus.replace('_', ' ')}</p>
                                <motion.div
                                    className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden"
                                >
                                    <motion.div
                                        className="h-full bg-blue-600"
                                        initial={{ width: '33%' }}
                                        animate={{ width: rideStatus === 'arrived' ? '100%' : '66%' }}
                                        transition={{ duration: 1 }}
                                    />
                                </motion.div>
                            </motion.div>

                            {/* ETA Card */}
                            <motion.div 
                                className="bg-white p-6 rounded-lg shadow-lg"
                                whileHover={{ y: -5 }}
                            >
                                <h3 className="text-gray-600 font-semibold mb-2">Estimated Arrival</h3>
                                <p className="text-2xl font-bold text-green-600">{eta}</p>
                                <p className="text-gray-500 text-sm mt-4">Distance: {distance}</p>
                            </motion.div>

                            {/* Fair Card */}
                            <motion.div 
                                className="bg-white p-6 rounded-lg shadow-lg"
                                whileHover={{ y: -5 }}
                            >
                                <h3 className="text-gray-600 font-semibold mb-2">Fare</h3>
                                <p className="text-2xl font-bold text-purple-600">₹285</p>
                                <p className="text-gray-500 text-sm mt-4">Inclusive of all charges</p>
                            </motion.div>
                        </div>

                        {/* Driver Info */}
                        <motion.div 
                            className="bg-white p-8 rounded-lg shadow-lg mb-8"
                            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Driver Information</h2>
                            <div className="flex items-center gap-6 mb-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-4xl">
                                    👨‍💼
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{driverInfo.name}</h3>
                                    <p className="text-gray-600">⭐ {driverInfo.rating} rating</p>
                                    <p className="text-gray-600">{driverInfo.vehicle}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-600 text-sm">License Plate</p>
                                    <p className="font-bold text-gray-800">{driverInfo.licensePlate}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-600 text-sm">Driver Contact</p>
                                    <p className="font-bold text-gray-800">{driverInfo.phone}</p>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-4">
                                <motion.button
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    📞 Call Driver
                                </motion.button>
                                <motion.button
                                    className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 flex items-center justify-center gap-2"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    💬 Message
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Ride Details */}
                        <motion.div 
                            className="bg-white p-8 rounded-lg shadow-lg mb-8"
                            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ride Details</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b pb-4">
                                    <span className="text-gray-600">📍 Pickup Location</span>
                                    <span className="font-semibold text-gray-800">Central Delhi</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-4">
                                    <span className="text-gray-600">📍 Drop-off Location</span>
                                    <span className="font-semibold text-gray-800">Airport Terminal 3</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-4">
                                    <span className="text-gray-600">🚗 Vehicle Type</span>
                                    <span className="font-semibold text-gray-800">ECONOMY</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">⏱️ Duration</span>
                                    <span className="font-semibold text-gray-800">~25 minutes</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Emergency & Cancel Buttons */}
                        <div className="flex gap-4">
                            {rideStatus === 'arrived' && (
                                <motion.button
                                    onClick={handleEndRide}
                                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    End Ride & Rate
                                </motion.button>
                            )}
                            <motion.button
                                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-red-700"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                🚨 Emergency
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default RideTracking;
