import React, { useState, useEffect } from 'react'; // Combined import
import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom'; 

import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignUp from "./pages/CaptainSignup";
import About from "./pages/About";
import ContactUs from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import BookRide from "./pages/BookRide";
import RideTracking from "./pages/RideTracking";
import RideRating from "./pages/RideRating";
import BookingHistory from "./pages/BookingHistory";
import PaymentMethods from "./pages/PaymentMethods";
import Profile from "./pages/Profile";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import BackToTopButton from "./components/BackToTopButton";
import Preloader from "./components/Preloader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []); // Added [] to stop the timer from running forever

  return (
    <HelmetProvider>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/captain-login" element={<CaptainLogin />} />
          <Route path="/captain-signup" element={<CaptainSignUp />} />
          <Route path="/about" element={<About />} /> 
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book-ride" element={<BookRide />} />
          <Route path="/tracking" element={<RideTracking />} />
          <Route path="/rating" element={<RideRating />} />
          <Route path="/booking-history" element={<BookingHistory />} />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer/>
        <BackToTopButton/>
      </div>
    </HelmetProvider>
  );  
}


export default App;

