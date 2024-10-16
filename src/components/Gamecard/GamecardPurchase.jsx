import React from 'react';
import { BsNintendoSwitch, BsPcDisplay } from "react-icons/bs";

const GamecardPurchase = () => {
    const game = {
        titulo: 'Dead Cells',
        precio: 4.99,
        fotoUrl: '/path/to/game-image.jpg',  
        plataformas: ['XBOX'],  
    };

    
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
        <div className="bg-gray-800 p-4 rounded-lg flex justify-between items-center mb-4">
            <div className="flex items-center">
                <img 
                    src={game.fotoUrl} 
                    alt={game.titulo} 
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <div>
                    <h3 className="text-xl font-semibold text-white">{game.titulo}</h3>
                    <div className="flex items-center space-x-2 mt-2">
                        {game.plataformas.map((plataforma, index) => (
                            <span key={index}>{getPlatformIcon(plataforma)}</span>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <p className="text-xl font-semibold text-white">${game.precio} USD</p>
            </div>
        </div>
    );
};

export default GamecardPurchase;
