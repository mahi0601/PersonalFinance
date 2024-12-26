import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LogoutRoute = () => {
    const { user } = useAuth();

    // Redirect logged-in users to the dashboard
    return user ? <Navigate to="/login" replace /> : <Outlet />;
};

export default LogoutRoute;
