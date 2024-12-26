import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginRoute = () => {
    const { user } = useAuth();

    // Redirect logged-in users to the dashboard
    return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default LoginRoute;
