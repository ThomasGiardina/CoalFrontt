import React from 'react';

const Badges = ({ type, value }) => {
    const getBadgeColor = () => {
        if (type === 'payment') {
            switch (value) {
                case 'DEBITO':
                    return 'bg-sky-600 text-white';
                case 'CREDITO':
                    return 'bg-sky-900 text-white';
                case 'EFECTIVO':
                    return 'bg-lime-700 text-white';
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
                    return 'bg-yellow-600 text-white'; 
                default:
                    return 'bg-gray-600 text-white'; 
            }
        } else if (type === 'delivery') {
            switch (value) {
                case 'ENVIO':
                    return 'bg-violet-600 text-white';
                case 'RETIRO':
                    return 'bg-violet-900 text-white'; 
                default:
                    return 'bg-gray-600 text-white'; 
            }
        }
    };

    return (
        <span
            className={`inline-flex items-center justify-center w-28 h-8 text-sm font-medium px-3 py-1 rounded-full ${getBadgeColor()}`}
        >
            {value}
        </span>
    );
};

export default Badges;
