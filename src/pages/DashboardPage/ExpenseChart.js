import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const ExpenseChart = ({ data }) => {
    const chartData = {
        labels: data.map((item) => item.month),
        datasets: [
            {
                label: 'Monthly Expenses',
                data: data.map((item) => item.amount),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: true, position: 'top' },
        },
    };

    return (
        <div className="chart">
            <h3>Expense Trends</h3>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default ExpenseChart;
