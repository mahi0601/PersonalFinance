import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

const ChartComponent = ({ data, options, type = 'line' }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy(); // Destroy existing chart instance
        }

        chartInstance.current = new Chart(chartRef.current, {
            type,
            data,
            options,
        });

        return () => {
            chartInstance.current.destroy(); // Cleanup on component unmount
        };
    }, [data, options, type]);

    return <canvas ref={chartRef} />;
};

export default ChartComponent;
