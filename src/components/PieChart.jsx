import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  const chartData = {
    labels: data.map(d => d.name),
    datasets: [
      {
        data: data.map(d => d.value),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',   // Deposits - blue
          'rgba(255, 99, 132, 0.6)',   // Withdrawals - red
          'rgba(153, 102, 255, 0.6)',  // Transfers - purple
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const raw = context.raw;
            const percentage = total ? ((raw / total) * 100).toFixed(2) : 0;
            return `${context.label}: ${raw} (${percentage}%)`;
          },
        },
      },
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div style={{ position: 'relative', height: '250px' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
