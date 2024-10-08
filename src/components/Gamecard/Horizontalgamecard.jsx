import React from 'react';
import { Link } from 'react-router-dom';

const Horizontalgamecard = ({ game }) => {
    return (
        <div className="relative flex w-full max-w-2xl h-40 bg-gray-900 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <div className="w-1/3 h-full">
                <img className="w-full h-full object-cover" src={game.image} alt={game.title} />
            </div>
            <div className="relative w-2/3 p-4 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white">{game.title}</h3>
                    <p className="text-gray-400 text-sm">{game.platform}</p>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-white font-bold">${game.price}</span>
                    <Link
                        className="text-white text-sm font-bold bg-blue-600 py-2 px-4 rounded hover:bg-blue-700 transition"
                        to="/Details"
                    >
                        Ver juego
                    </Link>
                </div>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Link
                    className="text-white text-lg font-bold bg-blue-600 py-2 px-4 rounded hover:bg-blue-700 transition"
                    to="/Details"
                >
                    Ver juego
                </Link>
            </div>
        </div>
    );
};

export default Horizontalgamecard;
