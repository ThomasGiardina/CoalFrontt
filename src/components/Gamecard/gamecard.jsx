import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
    const handleViewGame = () => {
        alert(`Ver detalles del juego: ${game.title}`);
        // Aquí podrías redirigir a otra página o hacer cualquier otra acción
    };

    return (
        <div className="relative w-44 h-auto overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <img className="w-full h-auto object-cover" src={game.image} alt={game.title} />
            
            <Link
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                to="/Details"
            >
                <span className="text-white text-xl font-bold">Ver juego</span>
            </Link>

            <div className="p-2">
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
