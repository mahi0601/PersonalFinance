import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const TransactionsRoute = () => {
    const { user } = useAuth();

    // If not logged in, redirect to login page
    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default TransactionsRoute;
