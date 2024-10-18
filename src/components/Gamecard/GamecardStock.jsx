import React, { useState } from 'react';
import { BsNintendoSwitch, BsPcDisplay } from "react-icons/bs";
import { FaXbox, FaPlaystation, FaTrash } from "react-icons/fa";
import EditGameForm from '../GamesAdmin/EditGameForm';

const GameCardStock = ({ game, updateGame, removeGame }) => { 
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

    const handleDelete = async () => {
        const token = localStorage.getItem('token'); 
        try {
            const response = await fetch(`http://localhost:4002/videojuegos/${game.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el juego');
            }

            removeGame(game.id);
            console.log('Juego eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar el juego:', error);
        }
    };

    return (
        <>
            <div className="bg-neutral text-white rounded-lg overflow-hidden flex p-4 shadow-lg w-full max-w-none">
                <div className="w-40 h-40 flex-shrink-0">
                    <img 
                        className="w-full h-full object-cover rounded-md" 
                        src={`data:image/jpeg;base64,${game.foto}`} 
                        alt={game.titulo} 
                    />
                </div>
    
                <div className="flex-grow ml-4 flex flex-col justify-between">
                    <div className="flex-grow flex flex-col justify-between">
                        <div className="flex items-start justify-between">
                            <div className="flex-grow">
                                <h2 className="text-2xl font-semibold">{game.titulo}</h2>
                                <p className="text-lg font-bold text-orange-400">${game.precio}</p>
                            </div>
                            <div className="mr-2">
                                {getPlatformIcon(game.plataforma)}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                        <button className="p-2 hover:bg-gray-700 rounded-md transition" onClick={openModal}>
                            <i className="fa-solid fa-pen text-white"></i>
                        </button>
                        <button className="p-2 hover:bg-gray-700 rounded-md transition" onClick={handleDelete}>
                            <FaTrash className="text-red-500" />
                        </button>
                    </div>
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
