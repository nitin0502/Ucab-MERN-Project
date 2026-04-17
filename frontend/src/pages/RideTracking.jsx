import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';

const RideTracking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [rideStatus, setRideStatus] = useState('on_the_way');
    const [bookingData, setBookingData] = useState(null);
    const [driverInfo, setDriverInfo] = useState({
        name: 'Tom Hanks',
        rating: 4.9,
        vehicle: 'Mercedes-Benz C-Class',
        licensePlate: 'MH02XY9876',
        phone: '+91 98765 43210'
    });
    const [userLocation, setUserLocation] = useState(null);
    const [driverLocation, setDriverLocation] = useState({ lat: 28.7141, lng: 77.1125 });
    const [eta, setEta] = useState('12 mins');
    const [distance, setDistance] = useState('8.5 km');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const selectedDriver = location.state?.selectedDriver;
        if (selectedDriver) {
            setDriverInfo(prev => ({
                ...prev,
                ...selectedDriver
            }));
        }

        const fetchBookingDetails = async () => {
            try {
                const bookingId = location.state?.bookingId;
                if (bookingId) {
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
                }
            } catch (error) {
                console.error('Error fetching booking details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingDetails();

        // Simulate ride status updates
        const timer = setTimeout(() => setRideStatus('arrived'), 5000);
        return () => clearTimeout(timer);
    }, [location.state?.bookingId, location.state?.selectedDriver]);

    useEffect(() => {
        if (!navigator.geolocation) {
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });
                setDriverLocation({
                    lat: latitude + 0.01,
                    lng: longitude + 0.01
                });
            },
            () => {
                setUserLocation({ lat: 28.7041, lng: 77.1025 });
            },
            {
                enableHighAccuracy: true,
                maximumAge: 10000,
                timeout: 10000
            }
        );
    }, []);

    useEffect(() => {
        if (bookingData?.estimatedDistance) {
            setDistance(`${bookingData.estimatedDistance} km`);
        }
        if (bookingData?.estimatedDuration) {
            setEta(bookingData.estimatedDuration);
        }
    }, [bookingData]);

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
                            {userLocation ? (
                                <iframe
                                    title="Live Ride Map"
                                    className="w-full h-96 border-0"
                                    src={`https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}+to+${driverLocation.lat},${driverLocation.lng}&hl=en&output=embed`}
                                />
                            ) : (
                                <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-6xl mb-4">🗺️</div>
                                        <p className="text-gray-600 font-semibold">Live Map - Real-time Tracking</p>
                                        <p className="text-gray-500 text-sm mt-2">Your driver location will appear here</p>
                                    </div>
                                </div>
                            )}
                            <div className="p-4 border-t border-gray-200 bg-gray-50">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Your location:</p>
                                        <p className="font-semibold text-gray-800">{userLocation ? `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}` : 'Detecting...'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Driver location:</p>
                                        <p className="font-semibold text-gray-800">{driverLocation ? `${driverLocation.lat.toFixed(4)}, ${driverLocation.lng.toFixed(4)}` : 'Loading...'}</p>
                                    </div>
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
                                <p className="text-2xl font-bold text-purple-600">₹{bookingData?.estimatedFare || 'Calculating...'}</p>
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

                            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                                <a
                                    href={`tel:${driverInfo.phone}`}
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2 text-center"
                                >
                                    📞 Call Driver
                                </a>
                                <a
                                    href={`sms:${driverInfo.phone}`}
                                    className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 flex items-center justify-center gap-2 text-center"
                                >
                                    💬 Message
                                </a>
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
                                    <span className="font-semibold text-gray-800">
                                        {bookingData?.pickupLocation?.address || 'Loading...'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-4">
                                    <span className="text-gray-600">📍 Drop-off Location</span>
                                    <span className="font-semibold text-gray-800">
                                        {bookingData?.dropOffLocation?.address || 'Loading...'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-4">
                                    <span className="text-gray-600">🚗 Vehicle Type</span>
                                    <span className="font-semibold text-gray-800">{bookingData?.cabType?.toUpperCase() || 'ECONOMY'}</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-4">
                                    <span className="text-gray-600">📏 Distance</span>
                                    <span className="font-semibold text-gray-800">{bookingData?.estimatedDistance ? `${bookingData.estimatedDistance} km` : 'Calculating...'}</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-4">
                                    <span className="text-gray-600">⏱️ Duration</span>
                                    <span className="font-semibold text-gray-800">{bookingData?.estimatedDuration || '~25 minutes'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">💰 Rate</span>
                                    <span className="font-semibold text-gray-800">
                                        {bookingData?.cabType === 'economy' && '₹40/km'}
                                        {bookingData?.cabType === 'comfort' && '₹150/km'}
                                        {bookingData?.cabType === 'premium' && '₹200/km'}
                                    </span>
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
