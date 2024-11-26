import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const TotalRevenue = () => {
  const [dailyRevenue, setDailyRevenue] = useState({});
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const generateDateRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('default', { day: 'numeric', month: 'short' }); 
  };

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const dailyResponse = await fetch('http://localhost:4002/api/estadisticas/ganancias-diarias-confirmadas', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!dailyResponse.ok) {
          throw new Error('Failed to fetch daily revenue');
        }

        const dailyData = await dailyResponse.json();

        const currentDate = new Date();
        const startDate = new Date();
        const endDate = new Date();

        startDate.setDate(currentDate.getDate() - 6); 
        endDate.setDate(currentDate.getDate() + 3); 

        const dateRange = generateDateRange(startDate, endDate);

        const filledData = dateRange.reduce((acc, date) => {
          acc[date] = dailyData[date] || 0; 
          return acc;
        }, {});

        setDailyRevenue(filledData);

        const monthlyResponse = await fetch('http://localhost:4002/api/estadisticas/recaudacion-mensual-confirmada', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!monthlyResponse.ok) {
          throw new Error('Failed to fetch monthly revenue');
        }

        const monthlyData = await monthlyResponse.json();
        setMonthlyRevenue(monthlyData);

        const totalResponse = await fetch('http://localhost:4002/api/estadisticas/recaudacion-total-confirmada', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!totalResponse.ok) {
          throw new Error('Failed to fetch total revenue');
        }

        const totalData = await totalResponse.json();
        setTotalRevenue(totalData);

        setLoading(false);
      } catch (err) {
        setError('Error fetching revenue data');
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const labels = Object.keys(dailyRevenue).map(formatDate); 
  const dataValues = Object.values(dailyRevenue);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Revenue',
        data: dataValues,
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
            return `$${context.raw.toFixed(2)}`;
          },
        },
      },
    },
  };

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  return (
    <div className="rounded-lg shadow-lg p-6 bg-neutral">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">${totalRevenue.toFixed(2)}</h2>
          <p className="text-sm text-gray-300">Ganado este mes: ${monthlyRevenue.toFixed(2)}</p>
        </div>
      </div>

      <div className="h-64">
        <Line data={data} options={options} />
      </div>

      <div className="flex justify-between mt-4">
        <p className="text-sm text-gray-300">{`${currentMonth} ${currentYear}`}</p>
      </div>
    </div>
  );
};

export default TotalRevenue;
