import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'; 

const TopCategories = () => {
    const data = {
        labels: [
            'ACCIÓN', 'AVENTURA', 'RPG', 'SIMULACIÓN', 'DEPORTES',
            'ESTRATEGIA', 'PUZZLE', 'TERROR', 'VR', 'EDUCATIVO'
        ],
        datasets: [
            {
                data: [4500, 3800, 3200, 2900, 2600, 2400, 2000, 1800, 1500, 1200],
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

    const options = {
        responsive: true,
        cutout: '70%', 
        plugins: {
            legend: {
                display: false, 
            },
        },
    };

    return (
        <div className="rounded-lg shadow-lg p-6 max-w-sm" style={{ backgroundColor: '#2D3A50' }}>
            <h2 className="text-xl font-bold mb-4">Top categorías</h2>
            <div className="relative mb-4 flex justify-center">
                <Doughnut data={data} options={options} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-lg font-semibold">$14,582.94</p>
                        <p className="text-sm text-gray-500">Febrero 2024</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-start gap-4">
                {data.labels.map((label, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <span className={`w-3 h-3 rounded-full`} style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}></span>
                        <p className="text-sm">{label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopCategories;
