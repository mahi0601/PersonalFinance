import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const AssetPieChart = ({ data }) => {
    const chartData = {
        labels: data.map((item) => item.assetType),
        datasets: [
            {
                data: data.map((item) => item.percentage),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: true, position: 'bottom' },
        },
    };

    return (
        <div className="chart">
            <h3>Asset Allocation</h3>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default AssetPieChart;
