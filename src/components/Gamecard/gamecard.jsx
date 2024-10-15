import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ id, title, imageUrl, price, platform }) => {
    const getPlatformIcon = (platform) => {
        switch (platform.toLowerCase()) {
            case 'xbox':
                return <i className="fab fa-xbox text-green-500 text-2xl"></i>;
            case 'playstation':
                return <i className="fab fa-playstation text-blue-500 text-2xl"></i>;
            case 'nintendo switch':
                return <i className="fas fa-gamepad text-red-500 text-2xl"></i>;
            case 'pc':
                return <i className="fas fa-laptop text-gray-500 text-2xl"></i>;
            default:
                return <i className="fas fa-question-circle text-gray-500 text-2xl"></i>;
        }
    };

    return (
        <Link to={`/Details/${id}`} className="relative block w-full max-w-xs sm:max-w-sm lg:max-w-md h-80 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <img className="absolute inset-0 w-full h-full object-cover" src={imageUrl} alt={title} />
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-2 right-4">
                {getPlatformIcon(platform)}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-white font-bold">${price}</span>
                </div>
            </div>
        </Link>
    );
};

export default GameCard;
