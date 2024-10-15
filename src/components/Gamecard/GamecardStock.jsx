import React from 'react';
import { BsNintendoSwitch, BsPcDisplay } from "react-icons/bs";

const GameCardStock = ({ game }) => {
    const getPlatformIcon = (platform) => {
        switch (platform) {
            case 'XBOX':
                return <i className="fab fa-xbox text-green-500 text-2xl"></i>;
            case 'PLAY_STATION':
                return <i className="fab fa-playstation text-blue-500 text-2xl"></i>;
            case 'NINTENDO_SWITCH':
                return <div className='text-red-700 text-2xl p-1'><BsNintendoSwitch /></div>;
            case 'PC':
                return <div className='text-gray-500 text-2xl p-1'><BsPcDisplay /></div>;
            default:
                return null;
        }
    };

    return (
        <div className="bg-neutral text-white rounded-lg overflow-hidden flex p-4 items-center shadow-lg transition-transform transform hover:scale-105">
            <img
                className="w-32 h-32 rounded-lg object-contain"
                src={game.fotoUrl} 
                alt={game.titulo}
            />
            <div className="flex-grow ml-4">
                <h2 className="text-2xl font-semibold">{game.titulo}</h2>
                <p className="text-lg font-bold text-orange-400">${game.precio}</p>
            </div>
            <div className="mr-6">
                {getPlatformIcon(game.plataforma)}
            </div>
            <div className="flex flex-col space-y-2">
                <button className="p-2 hover:bg-gray-700 rounded-md transition">
                    <i className="fa-solid fa-pen text-white"></i>
                </button>
                <button className="p-2 hover:bg-gray-700 rounded-md transition">
                    <i className="fa-solid fa-trash text-red-500"></i>
                </button>
            </div>
        </div>
    );
};

export default GameCardStock;
