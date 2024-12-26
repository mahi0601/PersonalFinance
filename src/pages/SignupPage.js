
import React, { useState } from 'react';
import axios from '../utils/api';
import '../assets/css/signup.css';
const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async () => {
        try {
            if (!username || !password) {
                setError('Username and password are required');
                return;
            }

            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            // Send username and password as query parameters
            await axios.post('/auth/signup', null, {
                params: { username, password },
            });

            // Redirect to the login page after successful signup
            window.location.href = '/login';
        } catch (err) {
            console.error('Signup error:', err.response?.data || err.message);
            setError(err.response?.data?.detail?.[0]?.msg || 'Signup failed');
        }
    };

    return (
        <div className="signup-page">
            <h2>Signup</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleSignup}>Signup</button>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default SignupPage;
