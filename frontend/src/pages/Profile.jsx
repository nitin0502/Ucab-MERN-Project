import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';

const Profile = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        firstName: 'Nitin',
        lastName: 'Kumar',
        email: 'nitin@example.com',
        phone: '+91 98765 43210',
        profilePicture: null
    });
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(userInfo);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveChanges = () => {
        setUserInfo(formData);
        setIsEditing(false);
        alert('Profile updated successfully!');
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
                        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Profile</h1>

                        {/* Profile Header */}
                        <motion.div 
                            className="bg-white p-8 rounded-lg shadow-lg mb-8"
                            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        >
                            <div className="flex items-center gap-6 mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-4xl">
                                    👤
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-800">
                                        {userInfo.firstName} {userInfo.lastName}
                                    </h2>
                                    <p className="text-gray-600">{userInfo.email}</p>
                                    <p className="text-gray-600">{userInfo.phone}</p>
                                </div>
                            </div>

                            {!isEditing && (
                                <motion.button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Edit Profile
                                </motion.button>
                            )}
                        </motion.div>

                        {/* Edit Form */}
                        {isEditing && (
                            <motion.div 
                                className="bg-white p-8 rounded-lg shadow-lg mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Edit Your Information</h3>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <motion.button
                                            onClick={handleSaveChanges}
                                            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Save Changes
                                        </motion.button>
                                        <motion.button
                                            onClick={() => {
                                                setIsEditing(false);
                                                setFormData(userInfo);
                                            }}
                                            className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-400"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Cancel
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Account Settings */}
                        <motion.div 
                            className="bg-white p-8 rounded-lg shadow-lg mb-8"
                            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        >
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h3>

                            <div className="space-y-4">
                                <motion.button
                                    className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                                    whileHover={{ x: 5 }}
                                >
                                    <h4 className="font-bold text-gray-800">🔐 Change Password</h4>
                                    <p className="text-gray-600 text-sm">Update your password regularly</p>
                                </motion.button>

                                <motion.button
                                    className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                                    whileHover={{ x: 5 }}
                                >
                                    <h4 className="font-bold text-gray-800">🔔 Notification Preferences</h4>
                                    <p className="text-gray-600 text-sm">Control how you receive notifications</p>
                                </motion.button>

                                <motion.button
                                    className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                                    whileHover={{ x: 5 }}
                                >
                                    <h4 className="font-bold text-gray-800">🛡️ Privacy & Security</h4>
                                    <p className="text-gray-600 text-sm">Manage your privacy settings</p>
                                </motion.button>

                                <motion.button
                                    className="w-full text-left p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                    whileHover={{ x: 5 }}
                                >
                                    <h4 className="font-bold text-red-600">🗑️ Delete Account</h4>
                                    <p className="text-red-600 text-sm">Permanently delete your account</p>
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Back Button */}
                        <motion.button
                            onClick={() => navigate('/dashboard')}
                            className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Back to Dashboard
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
