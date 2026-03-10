# 🚕 Ucab - Modern Cab Booking Application

## Overview

Ucab is a comprehensive cab booking application built with the MERN stack (MongoDB, Express.js, React, Node.js). It provides a seamless experience for users to book rides, track cabs in real-time, make payments, and manage their booking history.

## 🌟 Key Features

### 1. **User Authentication**
- Secure user registration and login
- JWT-based authentication
- Password encryption with bcryptjs
- Session management with cookies

### 2. **Dashboard**
- Welcome section with user greeting
- Quick action buttons for common tasks
- User statistics (total rides, total spent, rating)
- Special offers and promotions display
- Navigation to all app sections

### 3. **Ride Booking System**
- **Location Selection**: Enter pickup and drop-off locations
- **Cab Type Selection**: Choose between Economy, Comfort, and Premium cabs
- **Fare Calculation**: Instant fare estimates based on distance and cab type
- **Available Cabs**: View nearby available cabs with driver ratings
- **Payment Method Selection**: Choose from card, wallet, or cash payment
- **Quick Booking**: One-click booking with selected cab

### 4. **Real-time Ride Tracking** 
- Live map integration showing driver location
- Real-time ETA (Estimated Time of Arrival)
- Distance remaining to destination
- Driver information display (name, rating, vehicle details)
- Call and message driver functionality
- Ride status updates (on the way, arrived, completed)

### 5. **Ride Rating & Reviews**
- Star rating system (1-5 stars)
- Written reviews for feedback
- **Donation Options**: Contribute to charitable causes during rides
- **Refreshments Purchase**: Buy items like water, coffee, snacks during ride
- Transparent fare breakdown with all charges

### 6. **Booking History**
- View all past rides
- Sort bookings by date, status, or fare
- Detailed booking information modal
- Ride status indicators (completed, cancelled, pending)
- Driver and vehicle information
- Payment method used
- Ratings and reviews given

### 7. **Payment Methods Management**
- **Wallet System**: Digital wallet with balance tracking and top-up options
- **Saved Cards**: Add and manage multiple credit/debit cards
- **Default Payment Method**: Set preferred payment option
- **Card Management**: Add, delete, or update card details
- **Payment History**: Track all transactions
- Secure payment processing

### 8. **User Profile**
- View and edit personal information
- Update name, email, and phone number
- Profile picture management
- Account settings
- Password management
- Notification preferences
- Privacy and security controls
- Account deletion option

### 9. **Special Features**
- **Discounts & Coupons**: Apply promotional codes for discounts
- **Donation Integration**: Contribute to charities with each ride
- **Refreshments Store**: Purchase items during rides with delivery
- **Saved Locations**: Save frequent locations (home, office, etc.)
- **Ride History Analytics**: View spending patterns and ride statistics
- **Driver Ratings**: Rate driver experience and view driver information
- **Emergency Assistance**: Quick access to emergency features

## 📱 Technical Architecture

### Frontend (React + Vite)
- **Pages**:
  - Dashboard: Main user hub
  - BookRide: Ride booking interface
  - RideTracking: Live tracking during ride
  - RideRating: Post-ride feedback
  - BookingHistory: Past rides library
  - PaymentMethods: Payment management
  - Profile: User account settings
  - Home: Landing page
  - UserLogin/UserSignUp: Authentication

- **Components**:
  - Navbar: Navigation bar with links
  - Footer: Footer section
  - BackToTopButton: Scroll to top functionality
  - Preloader: Loading animation

- **Libraries**:
  - Framer Motion: Smooth animations and transitions
  - Axios: HTTP requests
  - React Router: Navigation
  - React Hook Form: Form management
  - React Icons: Icon library
  - Tailwind CSS: Styling

### Backend (Node.js + Express)

**Models**:
- **User Model**: User profile, payment methods, wallet, saved locations
- **Captain Model**: Driver information (existing)
- **Cab Model**: Vehicle details, location, availability, ratings
- **Booking Model**: Ride request, status tracking, fare details
- **Payment Model**: Transaction records, payment status
- **RideHistory Model**: Completed rides archive
- **BlacklistToken Model**: Logout token management (existing)

**Routes**:
- `/user/*`: User authentication and profile
- `/booking/*`: Ride booking and management
- `/captain/*`: Driver operations
- `/payment/*`: Payment processing (expandable)

**Controllers**:
- `user.controller.js`: User operations
- `booking.controller.js`: Booking operations
- `captain.controller.js`: Captain operations
- `payment.controller.js`: Payment operations (expandable)

**Middlewares**:
- Authentication middleware: JWT verification
- Authorization checks
- Error handling

## 🚀 How to Run

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account
- npm or yarn package manager

### Installation

1. **Clone and Navigate**
```bash
cd Fullstack1
```

2. **Backend Setup**
```bash
cd backend
npm install
```

Create `.env` file:
```
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start backend:
```bash
npm start
```

3. **Frontend Setup**
```bash
cd frontend
npm install
```

Start frontend:
```bash
npm run dev
```

The app will run on `http://localhost:5174`

## 📊 Workflow

### User Journey
1. **Sign Up/Login** → Register or authenticate
2. **Dashboard** → View stats and access features
3. **Book Ride** → Select locations and cab type
4. **View Cabs** → See available drivers nearby
5. **Book** → Confirm and make payment
6. **Track** → See real-time location and ETA
7. **Rate** → Provide feedback and donate
8. **History** → View past rides
9. **Manage** → Update payment methods and profile

## 🔐 Security Features
- Password hashing with bcrypt
- JWT token authentication (24-hour expiry)
- Protected routes with middleware
- CORS enabled for safe API access
- Cookie-based session management
- Input validation on backend
- Encrypted payment data handling

## 💳 Payment Flow
1. User selects payment method
2. Fare calculated and displayed
3. Payment processed (simulated)
4. Transaction recorded
5. Wallet can be topped up for future rides
6. All payments tracked in history

## 🎁 Extra Features Implementation

### Discounts
- Promotional codes applied automatically
- Discount percentage shown in fare breakdown
- Cumulative discount tracking

### Donations
- Predefined donation amounts available
- Custom donation option
- Added to final trip amount
- Separate tracking for charity contributions

### Refreshments
- In-ride shopping menu
- Quantity selection
- Price per item
- Delivery upon arrival
- Added to final bill

## 📈 Database Schema

### User Collection
```javascript
{
  name: { firstname, middlename, lastname },
  email,
  password (hashed),
  phone,
  profilePicture,
  paymentMethods: [{ cardId, cardNumber, last4, isDefault }],
  walletBalance,
  savedLocations: [{ label, address, coordinates }],
  totalRides,
  totalSpent,
  rating
}
```

### Booking Collection
```javascript
{
  userId,
  captainId,
  cabId,
  pickupLocation: { address, coordinates },
  dropOffLocation: { address, coordinates },
  cabType,
  estimatedFare,
  actualFare,
  discount,
  finalAmount,
  status,
  paymentMethod,
  rating,
  review,
  donations,
  refreshments,
  timestamps
}
```

## 🔄 API Endpoints

### Booking Endpoints
- `POST /booking/create` - Create new booking
- `GET /booking/nearest-cabs` - Get nearby available cabs
- `POST /booking/accept` - Accept booking (captain)
- `PUT /booking/status` - Update booking status
- `GET /booking/:bookingId` - Get booking details
- `POST /booking/complete` - Complete ride with rating
- `GET /booking/history/list` - Get user's booking history
- `POST /booking/cancel` - Cancel booking

### User Endpoints
- `POST /user/register` - Register new user
- `POST /user/login` - User login
- `GET /user/profile` - Get user profile
- `GET /user/logout` - User logout

## 🎨 UI/UX Highlights
- Smooth Framer Motion animations
- Responsive design (mobile, tablet, desktop)
- Gradient backgrounds and modern styling
- Interactive buttons with hover effects
- Loading states and error handling
- Modal dialogs for detailed information
- Toast notifications for feedback
- Intuitive navigation flow

## 🔮 Future Enhancements
- Real-time WebSocket integration for live updates
- Map integration (Google Maps API)
- SMS notifications for ride updates
- Multiple language support
- Social login (Google, Facebook)
- Ride scheduling for future dates
- Carpooling feature
- Driver application and verification
- In-app chat support
- Video streaming for ride verification
- AI-based fare prediction
- Loyalty rewards program

## 📝 Notes
- All API calls include proper error handling
- Frontend validates all user inputs
- Backend validates all requests
- Responsive design works on all devices
- Dark mode support can be added
- PWA capabilities for offline access

## 👨‍💻 Developer Notes
- Use environment variables for sensitive data
- Keep API calls in separate files
- Follow component composition best practices
- Use React hooks for state management
- Consider adding Redux for complex state
- Implement proper error boundaries
- Add unit tests for critical functions

---

**Ucab** - Making Transportation Simple, Reliable, and Stress-Free! 🚕
