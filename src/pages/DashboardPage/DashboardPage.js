import React, { useEffect, useState } from 'react';
import ExpenseChart from './ExpenseChart';
import AssetPieChart from './AssetPieChart';
import axios from '../../utils/api';
import '../../assets/css/dashboard.css';

const DashboardPage = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('/transactions/dashboard/data', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDashboardData(response.data);
            } catch (err) {
                console.error('Failed to fetch dashboard data:', err);
                setError('Unable to load dashboard data. Please try again later.');
            }
        };

        fetchDashboardData();
    }, []);

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (!dashboardData) {
        return <p>Loading dashboard...</p>;
    }

    // Correctly access the data using backend keys
    const totalSavings = dashboardData.total_savings ?? 0;
    const monthlyExpenses = dashboardData.monthly_expenses ?? 0;
    const investmentGrowth = dashboardData.investment_growth ?? 0;

    return (
        <div className="dashboard">
            <h1>Personal Finance Dashboard</h1>
            <div className="charts-container">
                <ExpenseChart data={dashboardData.expenseTrends || []} />
                <AssetPieChart data={dashboardData.assetAllocation || []} />
            </div>
            <div className="summary">
                <p>Total Savings: ${totalSavings.toFixed(2)}</p>
                <p>Monthly Expenses: ${monthlyExpenses.toFixed(2)}</p>
                <p>Investment Growth: ${investmentGrowth.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default DashboardPage;
