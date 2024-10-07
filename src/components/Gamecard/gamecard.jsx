import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
    return (
        <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg h-80 bg-gray-900 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <img className="absolute inset-0 w-full h-full object-cover" src={game.image} alt={game.title} />
            
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Link
                    className="text-white text-lg font-bold bg-blue-600 py-2 px-4 rounded hover:bg-blue-700 transition"
                    to="/Details"
                >
                    Ver juego
                </Link>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">{game.title}</h3>
                    <p className="text-gray-400 text-sm">{game.platform}</p>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-white font-bold">${game.price}</span>
                </div>
            </div>
        </div>
    );
};

export default GameCard;
