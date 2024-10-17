import React, { useState } from 'react';
import { BsNintendoSwitch, BsPcDisplay } from "react-icons/bs";
import { FaXbox, FaPlaystation, FaTrash } from "react-icons/fa";
import EditGameForm from '../GamesAdmin/EditGameForm';

const GameCardStock = ({ game, updateGame }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getPlatformIcon = (platform) => {
        switch (platform) {
            case 'XBOX':
                return <FaXbox className="text-green-500 text-2xl" />;
            case 'PLAY_STATION':
                return <FaPlaystation className="text-blue-500 text-2xl" />;
            case 'NINTENDO_SWITCH':
                return <BsNintendoSwitch className="text-red-700 text-2xl" />;
            case 'PC':
                return <BsPcDisplay className="text-gray-500 text-2xl" />;
            default:
                return null;
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        console.log(`Eliminar el juego con ID: ${game.id}`);
    };

    return (
        <>
            <div className="bg-neutral text-white rounded-lg overflow-hidden flex p-4 items-center shadow-lg transition-transform transform hover:scale-105">
                <img className="w-32 h-32 rounded-lg object-contain" src={game.fotoUrl} alt={game.titulo} />
                <div className="flex-grow ml-4">
                    <h2 className="text-2xl font-semibold">{game.titulo}</h2>
                    <p className="text-lg font-bold text-orange-400">${game.precio}</p>
                </div>
                <div className="mr-6">
                    {getPlatformIcon(game.plataforma)}
                </div>
                <div className="flex flex-col space-y-2">
                    <button className="p-2 hover:bg-gray-700 rounded-md transition" onClick={openModal}>
                        <i className="fa-solid fa-pen text-white"></i>
                    </button>
                    <button className="p-2 hover:bg-gray-700 rounded-md transition" onClick={handleDelete}>
                        <FaTrash className="text-red-500" />
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
                        <button className="text-white text-right mb-4" onClick={closeModal}>X</button>
                        <EditGameForm 
                            game={game} 
                            closeModal={closeModal} 
                            updateGame={updateGame} 
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default GameCardStock;
