import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogin = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/user/login`,
                data
            );

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }

            alert("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again!');
        }
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', display: 'inline-block', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h2>Welcome Back</h2>
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '300px' }}>
                    <input 
                        {...register("email")} 
                        placeholder="Email" 
                        type="email" 
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
                    />
                    <input 
                        {...register("password")} 
                        placeholder="Password" 
                        type="password" 
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
                    />
                    <button type="submit" style={{ padding: '10px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

<<<<<<< HEAD
export default UserLogin;
=======
export default UserLogin;
>>>>>>> 672d86404baef4bcce82b8878a298326127c4539
