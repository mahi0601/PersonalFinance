import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TransactionManagement from './TransactionManagement';

const TransactionManagementRoute = () => {
    return (
        <Routes>
            {/* Define the route for the Transaction Management component */}
            <Route path="/transactions" element={<TransactionManagement />} />
        </Routes>
    );
};

export default TransactionManagementRoute;
