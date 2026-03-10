import React from 'react';
import { Helmet } from 'react-helmet-async';
import BasicHome from '../components/BasicHome';

const Home = () => {
  return (
    <div>
      <Helmet>
<<<<<<< HEAD
        <title>Ucab - Book Rides Instantly</title>
        <meta 
          name="description" 
          content="Affordable and reliable transportation service. Book rides with Ucab now!" 
        />
        <meta 
          property="og:title" 
          content="Ucab - Your Ride, Your Way" 
        />
        <meta 
          property="og:description" 
          content="Experience seamless transportation with Ucab. Download the app today!"
=======
        <title>Cabify - Book Rides Instantly</title>
        <meta 
          name="description" 
          content="Affordable and reliable transportation service. Book rides with Cabify now!" 
        />
        <meta 
          property="og:title" 
          content="Cabify - Your Ride, Your Way" 
        />
        <meta 
          property="og:description" 
          content="Experience seamless transportation with Cabify. Download the app today!"
>>>>>>> 672d86404baef4bcce82b8878a298326127c4539
        />
        <meta 
          property="og:image" 
          content="/assets/og-home.jpg" // Update with actual image
        />
      </Helmet>
      
      <BasicHome/>
    </div>
  );
};

<<<<<<< HEAD
export default Home;
=======
export default Home;
>>>>>>> 672d86404baef4bcce82b8878a298326127c4539
