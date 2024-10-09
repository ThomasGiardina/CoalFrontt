import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ id, title, body, imageUrl, price, platform, category, stock }) => {
    return (
        <Link to={`/Details/${id}`} className="relative block w-full max-w-xs sm:max-w-sm lg:max-w-md h-80 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <img className="absolute inset-0 w-full h-full object-cover" src={imageUrl} alt={title} />
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <p className="text-gray-400 text-sm">{platform}</p>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-white font-bold">${price}</span>
                </div>
            </div>
            <div className="p-4">
                <p className="text-white">{body}</p>
                <p className="text-sm text-gray-400">Category: {category}</p>
                <p className="text-sm text-gray-400">Stock: {stock}</p>
            </div>
        </Link>
    );
};

export default GameCard;
