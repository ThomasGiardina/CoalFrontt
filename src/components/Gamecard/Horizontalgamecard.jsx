import React from 'react';
import { Link } from 'react-router-dom';

const HorizontalGameCard = ({ id, title, imageUrl, price, platform }) => {
    const getPlatformIcon = (platform) => {
        if (!platform) return <i className="fas fa-question-circle text-gray-500 text-xl"></i>; 
        switch (platform.toLowerCase()) {
            case 'xbox':
                return <i className="fab fa-xbox text-green-500 text-xl"></i>;
            case 'playstation':
                return <i className="fab fa-playstation text-blue-500 text-xl"></i>;
            case 'nintendo switch':
                return <i className="fas fa-gamepad text-red-500 text-xl"></i>;
            case 'pc':
                return <i className="fas fa-laptop text-gray-500 text-xl"></i>;
            default:
                return <i className="fas fa-question-circle text-gray-500 text-xl"></i>;
        }
    };

    return (
        <Link to={`/Details/${id}`} className="flex items-center p-4 w-full max-w-3xl bg-neutral rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <img src={imageUrl} alt={title} className="w-32 h-32 object-cover rounded-lg" />
            <div className="ml-6 flex-1">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <span>{getPlatformIcon(platform)}</span>
                </div>
                <div className="mt-2">
                    <span className="text-xl font-semibold text-primary">${price}</span>
                </div>
            </div>
        </Link>
    );
};

export default HorizontalGameCard;
