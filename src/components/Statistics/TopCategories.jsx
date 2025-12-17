import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const TopCategories = () => {
    const [categories, setCategories] = useState({});
    const [monthlyRevenue, setMonthlyRevenue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const categoryResponse = await fetch('http://localhost:4002/api/estadisticas/ventas-por-categoria', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!categoryResponse.ok) {
                    throw new Error('Failed to fetch category data');
                }

                const categoryData = await categoryResponse.json();
                setCategories(categoryData);

                const revenueResponse = await fetch('http://localhost:4002/api/estadisticas/recaudacion-mensual-confirmada', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!revenueResponse.ok) {
                    throw new Error('Failed to fetch monthly revenue');
                }

                const revenueData = await revenueResponse.json();
                setMonthlyRevenue(revenueData);

                setLoading(false);
            } catch (err) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchCategoryData();
    }, [token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    const labels = Object.keys(categories);
    const dataValues = Object.values(categories);

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: [
                    '#EC4899', '#9CA3AF', '#6366F1', '#4F46E5', '#34D399',
                    '#F87171', '#FBBF24', '#A78BFA', '#DB2777', '#10B981'
                ],
                hoverBackgroundColor: [
                    '#DB2777', '#6B7280', '#4C51BF', '#4338CA', '#10B981',
                    '#EF4444', '#F59E0B', '#8B5CF6', '#BE185D', '#047857'
                ],
                borderWidth: 0,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        cutout: '70%',
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value} ventas`; 
                    },
                },
            },
        },
    };

    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const currentYear = currentDate.getFullYear();

    return (
        <div className="rounded-lg shadow-lg p-6 max-w-sm bg-neutral">
            <h2 className="text-xl font-bold mb-4 text-white">Top Categorías</h2>
            <div className="relative mb-4 flex justify-center">
                <Doughnut data={chartData} options={chartOptions} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-lg font-semibold">${monthlyRevenue.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">{`${currentMonth} ${currentYear}`}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-start gap-4">
                {labels.map((label, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <span
                            className={`w-3 h-3 rounded-full`}
                            style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
                        ></span>
                        <p className="text-sm text-white">{label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopCategories;
