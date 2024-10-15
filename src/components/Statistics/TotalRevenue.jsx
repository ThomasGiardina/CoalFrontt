import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const TotalRevenue = () => {
  const data = {
    labels: ['Apr 7', 'Apr 8', 'Apr 9', 'Apr 10', 'Apr 11', 'Apr 12', 'Apr 13', 'Apr 14'],
    datasets: [
      {
        label: 'Revenue',
        data: [42000, 50000, 45000, 62800, 35000, 40000, 52000, 47000],
        borderColor: '#3b82f6', 
        backgroundColor: 'rgba(59, 130, 246, 0.1)', 
        fill: true,
        tension: 0.4, 
        pointRadius: 5, 
        pointBackgroundColor: '#3b82f6', 
        pointHoverRadius: 8, 
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false, 
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [5], 
        },
      },
    },
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw}k`; 
          },
        },
      },
    },
  };

  return (
    <div className="rounded-lg shadow-lg p-6 bg-neutral">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">$17,086.92</h2>
          <p className="text-sm text-gray-300">Ganado este Mes $9000</p>
        </div>
        
      </div>

      <div className="h-64">
        <Line data={data} options={options} />
      </div>

      <div className="flex justify-between mt-4">
        <p className="text-sm text-gray-300">Apr 7 - Apr 14</p>
        
      </div>
    </div>
  );
};

export default TotalRevenue;
