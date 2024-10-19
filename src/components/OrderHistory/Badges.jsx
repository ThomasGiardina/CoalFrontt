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
            return value === 'Completado' ? 'bg-green-700 text-white' : 'bg-yellow-700 text-white'; 
        } else if (type === 'delivery') {
            return 'bg-indigo-800 text-white'; 
        }
    };

    return (
        <span className={`inline-block w-24 h-8 text-sm font-medium px-3 py-1 rounded-full ${getBadgeColor()}`}>
            {value}
        </span>
    );
};

export default Badges;
