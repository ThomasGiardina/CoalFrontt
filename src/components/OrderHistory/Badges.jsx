import React from 'react';

const Badges = ({ type, value }) => {
    const getBadgeColor = () => {
        if (type === 'payment') {
            switch (value) {
                case 'Débito':
                    return 'bg-teal-800 text-white';
                case 'Crédito':
                    return 'bg-blue-900 text-white';
                case 'Efectivo':
                    return 'bg-orange-700 text-white';
                default:
                    return 'bg-gray-600 text-white';
            }
        } else if (type === 'status') {
            switch (value) {
                case 'CONFIRMADO':
                    return 'bg-green-700 text-white';
                case 'CANCELADO':
                    return 'bg-red-700 text-white';
                case 'PENDIENTE':
                    return 'bg-yellow-700 text-white';
                default:
                    return 'bg-gray-600 text-white';
            }
        } else if (type === 'delivery') {
            return 'bg-indigo-800 text-white';
        }
    };

    return (
        <span
            className={`inline-flex items-center justify-center h-8 text-sm font-medium px-3 py-1 rounded-full w-32 ${getBadgeColor()}`}
            style={{
                fontSize: value === 'CONFIRMADO' || value === 'CANCELADO' ? '0.9rem' : '1rem',
            }}
        >
            {value}
        </span>
    );
};

export default Badges;
