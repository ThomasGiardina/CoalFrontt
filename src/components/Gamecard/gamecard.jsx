import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faDownload } from '@fortawesome/free-solid-svg-icons';

const GameCard = ({ game }) => {
    return (
        <div className="w-96 bg-neutral rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img className="w-full object-cover h-64" src={game.image} alt={game.title} />
        <div className="p-4">
            <h3 className="text-lg font-bold text-white mb-2">{game.title}</h3>
            <div className="flex items-center justify-between text-gray-400">
            <div className="flex items-center space-x-1">
                <FontAwesomeIcon icon={faHeart} className="text-red-600" />
                <span>{game.likes}K</span>
            </div>
            <div className="flex items-center space-x-1">
                <FontAwesomeIcon icon={faDownload} />
                <span>{game.downloads}B</span>
            </div>
            </div>
        </div>
        </div>
    );
};

export default GameCard;
