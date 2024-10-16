import React, { useState } from 'react';
import { BsNintendoSwitch, BsPcDisplay } from "react-icons/bs";
import { FaTrash } from 'react-icons/fa';

const GamecardCart = () => {
    const game = {
        titulo: 'Dead Cells',
        precio: 4.99,
        fotoUrl: './deadcellsPortada.png',  
        plataformas: ['XBOX'],
    };

    const [cantidad, setCantidad] = useState(1);

    const aumentarCantidad = () => {
        setCantidad(cantidad + 1);
    };

    const disminuirCantidad = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    const defaultImage = '/ruta/a/imagen_por_defecto.png';  

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

    const eliminarProducto = () => {
        console.log(`Producto ${game.titulo} eliminado del carrito.`);
    };

    return (
        <div className="bg-neutral text-white rounded-xl flex p-5 items-center shadow-lg transition-transform transform hover:scale-105 w-full max-w-4xl mx-auto">
            <img
                className="w-24 h-24 rounded-lg object-contain"
                src={game.fotoUrl || defaultImage}  
                alt={game.titulo}
            />
            <div className="flex-grow ml-6">
                <div className='flex'>
                    <h2 className="text-2xl font-semibold mr-4">{game.titulo}</h2>
                    <div className="flex items-center space-x-2">
                        {game.plataformas.map((plataforma, index) => (
                            <span key={index}>{getPlatformIcon(plataforma)}</span>
                        ))}
                    </div>
                </div>
                <p className="text-xl font-bold text-green-400 mt-2">${game.precio}</p>
            </div>
            <div className="ml-auto flex flex-col items-center space-y-4">
                
                <div className="flex items-center space-x-3">
                    <button
                        className="bg-gray-700 text-white px-3 py-2 rounded-full hover:bg-gray-600 transition"
                        onClick={disminuirCantidad}
                    >-</button>
                    <span className="text-xl">{cantidad}</span>
                    <button
                        className="bg-gray-700 text-white px-3 py-2 rounded-full hover:bg-gray-600 transition"
                        onClick={aumentarCantidad}
                    >+</button>
                </div>
                <button
                    className="text-red-500 hover:text-red-600 transition"
                    onClick={eliminarProducto}
                >
                    <FaTrash size={24} />
                </button>
            </div>
        </div>
    );
};

export default GamecardCart;
