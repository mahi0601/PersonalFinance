import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                await axios.post('/auth/logout');
                alert('Logout successful');
                navigate('/login');
            } catch (error) {
                console.error('Error during logout:', error);
                alert('Logout failed');
            }
        };

        performLogout();
    }, [navigate]);

    return (
        <div className="logout-page">
            <h1>Logging out...</h1>
        </div>
    );
};

export default Logout;
