import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../components/navbar';

const BookRide = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        pickupLocation: '',
        dropOffLocation: '',
        cabType: 'economy',
        paymentMethod: 'card'
    });
    const [selectedCabs, setSelectedCabs] = useState([]);
    const [showCabs, setShowCabs] = useState(false);
    const [estimatedFare, setEstimatedFare] = useState(null);
    const [estimatedDistance, setEstimatedDistance] = useState(null);

    const cabTypes = [
        { type: 'economy', label: 'Economy', ratePerKm: 40, icon: '🚗', description: 'Budget friendly' },
        { type: 'comfort', label: 'Comfort', ratePerKm: 150, icon: '🚙', description: 'More spacious' },
        { type: 'premium', label: 'Premium', ratePerKm: 200, icon: '🚘', description: 'Luxury experience' }
    ];

    const availableDrivers = [
        { name: 'Brad Pitt', vehicle: 'BMW 7 Series', plate: 'DL03CD5678', rating: 4.7 },
        { name: 'Johnny Depp', vehicle: 'Audi A6', plate: 'TN04EF1234', rating: 4.6 },
        { name: 'Will Smith', vehicle: 'Honda Accord', plate: 'KA05GH9012', rating: 4.8 }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateFare = () => {
        const ratePerKm = cabTypes.find(c => c.type === formData.cabType).ratePerKm;
        // Estimated distance between 10-20 km + base minimum fare of 100
        const distance = Math.floor(Math.random() * 11) + 10; // 10-20 km
        const minimumFare = 100;
        const distanceFare = distance * ratePerKm;
        const totalFare = Math.max(minimumFare, distanceFare);
        setEstimatedDistance(distance);
        setEstimatedFare(Math.round(totalFare));
        setShowCabs(true);
    };

    const handleBookRide = async (cab) => {
        try {
            const driver = availableDrivers[cab - 1];
            const estimatedDuration = Math.ceil(estimatedDistance * 1.5); // ~1.5 mins per km
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/booking/create`,
                {
                    pickupLocation: {
                        address: formData.pickupLocation,
                        latitude: 28.7041,
                        longitude: 77.1025
                    },
                    dropOffLocation: {
                        address: formData.dropOffLocation,
                        latitude: 28.5244,
                        longitude: 77.0855
                    },
                    cabType: formData.cabType,
                    estimatedFare: estimatedFare,
                    estimatedDuration: `${estimatedDuration} mins`,
                    estimatedDistance: estimatedDistance,
                    paymentMethod: formData.paymentMethod,
                    selectedDriver: driver
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            navigate('/tracking', { state: { bookingId: response.data.booking._id, selectedDriver: driver } });
        } catch (error) {
            console.error('Error booking ride:', error);
            alert('Failed to book ride. Please try again!');
        }
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
                        <h1 className="text-4xl font-bold text-gray-800 mb-8">Book Your Ride</h1>

                        {/* Location Input Section */}
                        <motion.div 
                            className="bg-white p-8 rounded-lg shadow-lg mb-8"
                            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Pickup Location</label>
                                    <input
                                        type="text"
                                        name="pickupLocation"
                                        placeholder="Enter pickup location"
                                        value={formData.pickupLocation}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Drop-off Location</label>
                                    <input
                                        type="text"
                                        name="dropOffLocation"
                                        placeholder="Enter drop-off location"
                                        value={formData.dropOffLocation}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Cab Type Selection */}
                            <div className="mb-6">
                                <label className="block text-gray-700 font-semibold mb-4">Select Cab Type</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {cabTypes.map(cab => (
                                        <motion.button
                                            key={cab.type}
                                            onClick={() => setFormData(prev => ({ ...prev, cabType: cab.type }))}
                                            className={`p-4 rounded-lg border-2 transition-all ${
                                                formData.cabType === cab.type
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-300 bg-white'
                                            }`}
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <div className="text-3xl mb-2">{cab.icon}</div>
                                            <h3 className="font-bold text-gray-800">{cab.label}</h3>
                                            <p className="text-sm text-gray-600">{cab.description}</p>
                                            <p className="font-semibold text-blue-600 mt-2">₹{cab.ratePerKm}/km</p>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="mb-6">
                                <label className="block text-gray-700 font-semibold mb-2">Payment Method</label>
                                <select
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="card">Credit/Debit Card</option>
                                    <option value="wallet">Digital Wallet</option>
                                    <option value="cash">Cash</option>
                                </select>
                            </div>

                            {/* Get Quote Button */}
                            <motion.button
                                onClick={calculateFare}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={!formData.pickupLocation || !formData.dropOffLocation}
                            >
                                Get Estimated Fare
                            </motion.button>
                        </motion.div>

                        {/* Available Cabs Section */}
                        {showCabs && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white p-8 rounded-lg shadow-lg"
                            >
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Estimated Fare: ₹{estimatedFare}</h2>
                                <p className="text-gray-600 mb-6">Distance: ~{estimatedDistance} km | Duration: ~{Math.ceil(estimatedDistance * 1.5)} mins</p>

                                <h3 className="text-xl font-bold text-gray-800 mb-6">Available Cabs Near You</h3>
                                <div className="space-y-4">
                                    {[1, 2, 3].map(cab => {
                                        const driver = availableDrivers[cab - 1];
                                        return (
                                        <motion.div
                                            key={cab}
                                            className="border border-gray-300 p-4 rounded-lg hover:shadow-lg transition-shadow"
                                            whileHover={{ x: 5 }}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-bold text-gray-800">Driver: {driver.name}</h4>
                                                    <p className="text-gray-600">Vehicle: {driver.vehicle}</p>
                                                    <p className="text-gray-600 text-sm">License: {driver.plate}</p>
                                                    <p className="text-sm text-gray-500">⭐ {driver.rating} rating | {Math.floor(Math.random() * 5) + 2} mins away</p>
                                                </div>
                                                <motion.button
                                                    onClick={() => handleBookRide(cab)}
                                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Book Now
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default BookRide;
