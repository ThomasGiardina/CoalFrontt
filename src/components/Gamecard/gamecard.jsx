import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
    return (
        <div className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 h-auto overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <img className="w-full h-64 object-cover" src={game.image} alt={game.title} />
            
            <Link
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                to="/Details"
            >
                <span className="text-white text-lg font-bold">Ver juego</span>
            </Link>

            <div className="p-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white mb-2 text-left">{game.title}</h3>
                    <p className="text-gray-400 text-right">{game.platform}</p>
                </div>
                <div className="flex items-center justify-start">
                    <span className="text-white font-bold">$59.96</span>
                </div>
            </div>
        </div>
    );
};

export default GameCard;
