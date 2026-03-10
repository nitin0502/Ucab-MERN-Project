import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';

const PaymentMethods = () => {
    const navigate = useNavigate();
    const [paymentMethods, setPaymentMethods] = useState([
        {
            id: 1,
            cardHolder: 'Nitin Kumar',
            last4: '4242',
            expiryDate: '12/25',
            type: 'credit_card',
            isDefault: true
        },
        {
            id: 2,
            cardHolder: 'Nitin Kumar',
            last4: '5555',
            expiryDate: '06/26',
            type: 'debit_card',
            isDefault: false
        }
    ]);
    const [walletBalance, setWalletBalance] = useState(520);
    const [showAddCard, setShowAddCard] = useState(false);
    const [newCard, setNewCard] = useState({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: ''
    });

    const handleAddCard = () => {
        if (newCard.cardNumber && newCard.cardHolder && newCard.expiryDate && newCard.cvv) {
            const card = {
                id: paymentMethods.length + 1,
                cardHolder: newCard.cardHolder,
                last4: newCard.cardNumber.slice(-4),
                expiryDate: newCard.expiryDate,
                type: 'credit_card',
                isDefault: false
            };
            setPaymentMethods([...paymentMethods, card]);
            setNewCard({ cardNumber: '', cardHolder: '', expiryDate: '', cvv: '' });
            setShowAddCard(false);
            alert('Card added successfully!');
        }
    };

    const handleSetDefault = (id) => {
        setPaymentMethods(paymentMethods.map(card =>
            card.id === id
                ? { ...card, isDefault: true }
                : { ...card, isDefault: false }
        ));
    };

    const handleDeleteCard = (id) => {
        if (paymentMethods.length > 1) {
            setPaymentMethods(paymentMethods.filter(card => card.id !== id));
            alert('Card deleted successfully!');
        } else {
            alert('You must have at least one payment method!');
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
                        {/* Header */}
                        <h1 className="text-4xl font-bold text-gray-800 mb-8">Payment Methods</h1>

                        {/* Wallet Balance */}
                        <motion.div 
                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg shadow-lg mb-8"
                            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        >
                            <p className="text-blue-100 mb-2">Wallet Balance</p>
                            <h2 className="text-4xl font-bold mb-4">₹{walletBalance}</h2>
                            <motion.button
                                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Add Money
                            </motion.button>
                        </motion.div>

                        {/* Saved Cards */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Saved Cards</h2>
                                <motion.button
                                    onClick={() => setShowAddCard(!showAddCard)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    + Add New Card
                                </motion.button>
                            </div>

                            {/* Add Card Form */}
                            {showAddCard && (
                                <motion.div
                                    className="bg-white p-8 rounded-lg shadow-lg mb-6"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <h3 className="text-xl font-bold text-gray-800 mb-6">Add New Card</h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">Card Holder Name</label>
                                            <input
                                                type="text"
                                                placeholder="John Doe"
                                                value={newCard.cardHolder}
                                                onChange={(e) => setNewCard({ ...newCard, cardHolder: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">Card Number</label>
                                            <input
                                                type="text"
                                                placeholder="1234 5678 9012 3456"
                                                maxLength="19"
                                                value={newCard.cardNumber}
                                                onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value.replace(/\s/g, '') })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-gray-700 font-semibold mb-2">Expiry Date</label>
                                                <input
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    maxLength="5"
                                                    value={newCard.expiryDate}
                                                    onChange={(e) => setNewCard({ ...newCard, expiryDate: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-gray-700 font-semibold mb-2">CVV</label>
                                                <input
                                                    type="text"
                                                    placeholder="123"
                                                    maxLength="3"
                                                    value={newCard.cvv}
                                                    onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-4 pt-4">
                                            <motion.button
                                                onClick={handleAddCard}
                                                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                Add Card
                                            </motion.button>
                                            <motion.button
                                                onClick={() => setShowAddCard(false)}
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

                            {/* Cards List */}
                            <div className="space-y-4">
                                {paymentMethods.map((card, index) => (
                                    <motion.div
                                        key={card.id}
                                        className={`p-6 rounded-lg border-2 transition-all ${
                                            card.isDefault
                                                ? 'bg-blue-50 border-blue-500'
                                                : 'bg-white border-gray-300'
                                        }`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -2 }}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-bold text-gray-800">
                                                        {card.type === 'credit_card' ? '💳 Credit Card' : '💳 Debit Card'}
                                                    </h3>
                                                    {card.isDefault && (
                                                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                                            DEFAULT
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-gray-700 font-semibold mb-1">{card.cardHolder}</p>
                                                <p className="text-gray-600">•••• •••• •••• {card.last4}</p>
                                                <p className="text-gray-500 text-sm">Expires {card.expiryDate}</p>
                                            </div>

                                            <div className="flex gap-2">
                                                {!card.isDefault && (
                                                    <motion.button
                                                        onClick={() => handleSetDefault(card.id)}
                                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        Set Default
                                                    </motion.button>
                                                )}
                                                <motion.button
                                                    onClick={() => handleDeleteCard(card.id)}
                                                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Delete
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

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

export default PaymentMethods;
