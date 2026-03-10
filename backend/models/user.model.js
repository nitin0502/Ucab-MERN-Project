import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
dotenv.config();
const userSchema = new mongoose.Schema({
    name: {
        firstname: {
            type: String,
            minlength: [2 , "Atleast 3 letters required"],
            required: true, 
        },
        middlename: {
            type: String,
            required: false,
        },
        lastname: {
            type: String,
            required: true,
        }
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be atleast 6 characters"],
        select: false,
    },
    phone: {
        type: String,
        default: null
    },
    socketId: {
        type: String,
        required: false,
    },
    profilePicture: {
        type: String,
        default: null
    },
    paymentMethods: [{
        cardId: String,
        cardNumber: String,
        cardHolder: String,
        expiryDate: String,
        last4: String,
        isDefault: Boolean,
        type: {
            type: String,
            enum: ['credit_card', 'debit_card']
        }
    }],
    walletBalance: {
        type: Number,
        default: 0
    },
    savedLocations: [{
        label: String,
        address: String,
        latitude: Number,
        longitude: Number
    }],
    totalRides: {
        type: Number,
        default: 0
    },
    totalSpent: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}) 

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET , {expiresIn: '24h'});
    return token;
}
userSchema.methods.matchPassword = async function(enteredPassword) {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
      } catch (error) {
        logger.error("Error comparing passwords:", error.message);
        return false;
      }
}
userSchema.statics.hashPassword = async function(password) {
    const hashedPass =  await bcrypt.hash(password, 10);
    return hashedPass;
}
const User = mongoose.model("user", userSchema);
<<<<<<< HEAD
export default User;
=======
export default User;
>>>>>>> 672d86404baef4bcce82b8878a298326127c4539
