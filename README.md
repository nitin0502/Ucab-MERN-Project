# 🚕 Ucab - Complete Cab Booking Application

> A modern, full-stack cab booking application built with the MERN stack (MongoDB, Express.js, React, Node.js)

## 🌟 About Ucab

Ucab is a simple and easy-to-use cab booking app that helps people book rides quickly and comfortably. Whether you're going to work or exploring a new city, Ucab makes travel simple, reliable, and stress-free.

### Core Features
- 📍 Location-based ride booking
- 🚗 Multiple cab categories (Economy, Comfort, Premium)
- ⭐ Real-time ride tracking with live map
- 💳 Multiple payment methods (Card, Wallet, Cash)
- 📋 Complete booking history
- ⭐ Ride rating and reviews
- ❤️ Donation options during rides
- 🍹 Refreshments purchase system
- 👤 User profile management
- 💰 Wallet integration

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Router** - Navigation
- **React Hook Form** - Form handling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Mongoose** - ODM

---

## 📋 Project Structure

```
Fullstack1/
├── backend/
│   ├── models/
│   │   ├── user.model.js
│   │   ├── captain.model.js
│   │   ├── cab.model.js
│   │   ├── booking.model.js
│   │   ├── payment.model.js
│   │   └── rideHistory.model.js
│   ├── controllers/
│   │   ├── user.controller.js
│   │   ├── captain.controller.js
│   │   └── booking.controller.js
│   ├── routes/
│   │   ├── user.routes.js
│   │   ├── captain.routes.js
│   │   └── booking.routes.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── app.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── BookRide.jsx
│   │   │   ├── RideTracking.jsx
│   │   │   ├── RideRating.jsx
│   │   │   ├── BookingHistory.jsx
│   │   │   ├── PaymentMethods.jsx
│   │   │   └── Profile.jsx
│   │   ├── components/
│   │   └── App.jsx
│   └── vite.config.js
│
├── UCAB_APP_DOCUMENTATION.md
├── IMPLEMENTATION_GUIDE.md
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 14
- MongoDB Atlas account
- npm or yarn

### Backend Setup

1. **Navigate to backend**
   ```bash
   cd Fullstack1/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   PORT=4000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ucab
   JWT_SECRET=your_jwt_secret_key
   CORS_ORIGIN=*
   ```

4. **Start backend**
   ```bash
   npm start
   ```
   Backend runs on: `http://localhost:4000`

### Frontend Setup

1. **Navigate to frontend**
   ```bash
   cd Fullstack1/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start frontend**
   ```bash
   npm run dev
   ```
   Frontend runs on: `http://localhost:5174`

---

## 📚 Key Pages & Features

### 1. Dashboard
- Welcome greeting
- Quick action buttons
- User statistics (rides, spending, rating)
- Special offers and promotions

### 2. Book a Ride
- Enter pickup/drop-off locations
- Select cab type (3 categories)
- Choose payment method
- Get fare estimate
- View available cabs and book

### 3. Ride Tracking
- Real-time location tracking
- Live ETA and distance
- Driver information
- Call/Message driver
- Emergency assistance

### 4. Rate & Feedback
- 5-star rating system
- Written reviews
- Donation to charity
- Purchase refreshments
- Transparent fare breakdown

### 5. Booking History
- View all past rides
- Trip details and driver info
- Ratings and reviews
- Status tracking
- Quick re-booking

### 6. Payment Methods
- Digital wallet with balance
- Add/manage multiple cards
- Set default payment method
- Transaction history
- Secure payment processing

### 7. User Profile
- Edit personal information
- Account settings
- Password management
- Privacy controls
- Account options

---

## 🔌 API Endpoints

### Booking Endpoints
```
POST   /booking/create              Create new booking
GET    /booking/nearest-cabs        Get nearby available cabs
POST   /booking/accept              Accept booking request
PUT    /booking/status              Update booking status
GET    /booking/:bookingId          Get booking details
POST   /booking/complete            Complete ride with feedback
GET    /booking/history/list        Get user's booking history
POST   /booking/cancel              Cancel booking
```

### User Endpoints
```
POST   /user/register               Register new user
POST   /user/login                  User login
GET    /user/profile                Get user profile
GET    /user/logout                 Logout user
```

---

## 🧪 Testing the App

### 1. User Authentication
1. Go to `http://localhost:5174`
2. Click "Sign Up" and create account
3. Login with credentials
4. Redirects to Dashboard

### 2. Book a Ride
1. From Dashboard → "Book a Ride"
2. Enter locations (e.g., "Central Delhi" → "Airport")
3. Select cab type
4. Choose payment method
5. Click "Get Estimated Fare"
6. Select a cab and "Book Now"

### 3. Track Your Ride
1. See live map and driver info
2. View ETA and distance
3. Call/Message driver
4. After 5 seconds, status changes
5. Click "End Ride & Rate"

### 4. Complete Feedback
1. Rate the ride (1-5 stars)
2. Write review (optional)
3. Donate amount (optional)
4. Select refreshments (optional)
5. Submit and view in history

### 5. Manage Payments
1. Go to "Payment Methods"
2. Add new card
3. Set default method
4. Delete card

### 6. Update Profile
1. Go to "Profile"
2. Click "Edit Profile"
3. Update information
4. Save changes

---

## 🎨 Features Highlight

✨ **Beautiful UI/UX**
- Smooth animations with Framer Motion
- Responsive design (mobile, tablet, desktop)
- Modern gradient styling
- Interactive elements

🔒 **Security**
- JWT authentication (24-hour expiry)
- Password hashing with bcryptjs
- Protected API routes
- CORS enabled
- Input validation

⚡ **Performance**
- Fast page loads
- Optimized database queries
- Efficient state management
- Code splitting with Vite

🌍 **Real-World Features**
- Fare estimation
- Real-time tracking
- Payment processing
- Booking history
- Driver ratings
- Emergency assistance

---

## 📊 Database Models

### User
```javascript
{
  name: { firstname, middlename, lastname },
  email,
  password (hashed),
  paymentMethods,
  walletBalance,
  savedLocations,
  rating,
  totalRides,
  totalSpent
}
```

### Booking
```javascript
{
  userId,
  captainId,
  cabId,
  pickupLocation: { address, coordinates },
  dropOffLocation: { address, coordinates },
  estimatedFare,
  actualFare,
  discount,
  finalAmount,
  status,
  rating,
  review,
  donations,
  refreshments
}
```

---

## 🔮 Future Enhancements

- Real-time WebSocket updates
- Google Maps integration
- SMS notifications
- Social login (Google, Facebook)
- Ride scheduling
- Carpooling feature
- Driver application system
- In-app chat
- Loyalty rewards
- Multiple language support

---

## 📞 Support & Contact

For issues or questions:
1. Check the documentation files
2. Review API endpoints
3. Test with Postman
4. Check browser console for errors

---

## 📄 Documentation Files

1. **UCAB_APP_DOCUMENTATION.md** - Complete app documentation
2. **IMPLEMENTATION_GUIDE.md** - Implementation details and testing guide
3. **README.md** - This file

---

## 🤝 Contributing

This is an open-source project. Feel free to:
- Report issues
- Suggest improvements
- Submit pull requests
- Share feedback

---

## ⚖️ License

This project is open source and available under the MIT License.

---

## 👨‍💻 Project Team

- **Developed for**: Apertre 2.0 Event
- **Stack**: MERN (MongoDB, Express, React, Node.js)
- **Last Updated**: March 2026

---

## 🎯 Made with ❤️

**Ucab** - Making Transportation Simple, Reliable, and Stress-Free! 🚕

---

### Quick Links
- [Complete Documentation](./UCAB_APP_DOCUMENTATION.md)
- [Implementation Guide](./IMPLEMENTATION_GUIDE.md)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)

---

Happy Coding! 🚀
    PORT=4000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Start the server:
    ```bash
    npm start
    ```

## API Endpoints

### User Registration
- **URL:** `/user/register`
- **Method:** `POST`
- **Body:**
    ```json
    {
        "name": {
            "firstname": "John",
            "middlename": "Doe",
            "lastname": "Smith"
        },
        "email": "john.doe@example.com",
        "password": "yourpassword"
    }
    ```

### User Login
- **URL:** `/user/login`
- **Method:** `POST`
- **Body:**
    ```json
    {
        "email": "john.doe@example.com",
        "password": "yourpassword"
    }
    ```

## Environment Variables

- `PORT`: Server port.
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: JWT secret key.

## Project Structure

```
FullStack1/
├── backend/
│   ├── controllers/
│   │   ├── user.controller.js
│   │   └── captain.controller.js
│   ├── db/
│   │   └── db.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── captain.model.js
│   │   └── blacklist.token.model.js
│   ├── routes/
│   │   ├── user.routes.js
│   │   └── captain.routes.js
│   ├── services/
│   │   └── user.service.js
│   ├── .env
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── components/
│   │   │   ├── signup.jsx
│   │   │   └── ui/
│   │   │       ├── input.jsx
│   │   │       └── label.jsx
│   │   ├── lib/
│   │   │   └── utils.js
│   │   ├── pages/
│   │   │   └── UserSignUp.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```


<<<<<<< HEAD
Added a shell script to append files in github and stage it from local to remote git repository
=======
Added a shell script to append files in github and stage it from local to remote git repository
>>>>>>> 672d86404baef4bcce82b8878a298326127c4539
