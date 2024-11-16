// src/components/Gamecard/gamecard.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsNintendoSwitch, BsPcDisplay } from "react-icons/bs";
import { toggleFavorite } from '../../redux/favoritesSlice';

const GameCard = ({ id, title, imageUrl, price, platform }) => {
    const dispatch = useDispatch();
    const favoriteGames = useSelector(state => state.favorites);
    const isStarred = favoriteGames.some(game => game.id === id);

    const handleStarClick = (e) => {
        e.preventDefault();
        console.log("Toggling favorite for game:", { id, title, imageUrl, price, platform });
        dispatch(toggleFavorite({ id, title, imageUrl, price, platform }));
    };

    const getPlatformIcon = (platform) => {
        switch (platform) {
            case 'XBOX':
                return <i className="fab fa-xbox text-green-500 text-2xl"></i>;
            case 'PLAY_STATION':
                return <i className="fab fa-playstation text-blue-500 text-2xl"></i>;
            case 'NINTENDO_SWITCH':
                return <div className='text-red-700 text-2xl p-1'><BsNintendoSwitch/></div>;
            case 'PC':
                return <div className='text-gray-500 text-2xl p-1'><BsPcDisplay/></div>;
            default:
                return null; 
        }
    };

    return (
        <Link to={`/Details/${id}`} className="relative block w-full max-w-xs sm:max-w-sm lg:max-w-md h-80 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <img className="absolute inset-0 w-full h-full object-cover" src={`data:image/jpeg;base64,${imageUrl}`} alt={title} />
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-2 right-4">
                {getPlatformIcon(platform)}
            </div>
            <button 
                onClick={handleStarClick} 
                className={`absolute top-2 left-2 text-2xl ${isStarred ? 'text-yellow-500' : 'text-gray-300'}`}
            >
                ★
            </button>
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