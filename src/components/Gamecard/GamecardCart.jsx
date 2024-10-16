import React, { useState } from 'react';
import { BsNintendoSwitch, BsPcDisplay } from "react-icons/bs";
import { FaTimes } from 'react-icons/fa'; 
import Swal from 'sweetalert2'; 
import 'sweetalert2/dist/sweetalert2.min.css';

const GamecardCart = () => {
    const game = {
        titulo: 'Dead Cells',
        precio: 4.99,
        fotoUrl: './deadcellsPortada.png',  
        plataformas: ['XBOX', 'NINTENDO_SWITCH'],
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
                return <i className="fab fa-xbox text-green-500 text-xl"></i>;
            case 'PLAY_STATION':
                return <i className="fab fa-playstation text-blue-500 text-xl"></i>;
            case 'NINTENDO_SWITCH':
                return <div className='text-red-700 text-xl p-1'><BsNintendoSwitch /></div>;
            case 'PC':
                return <div className='text-gray-500 text-xl p-1'><BsPcDisplay /></div>;
            default:
                return null;
        }
    };

    const eliminarProducto = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se eliminará el producto del carrito.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'primary',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado!',
                    'El producto ha sido eliminado del carrito.',
                    'success'
                );
                console.log(`Producto ${game.titulo} eliminado del carrito.`);
            }
        });
    };

    return (
        <div className="bg-neutral text-white rounded-lg flex items-start shadow-lg transition-transform transform hover:scale-105 w-full h-[175px] p-4 relative">
            <div className="flex items-center space-x-4">
                <img
                    className="w-32 h-16 rounded-lg object-cover"
                    src={game.fotoUrl || defaultImage}
                    alt={game.titulo}
                />
            </div>

            <div className="flex-grow flex flex-col justify-between ml-4">
                <div className="flex justify-between items-start w-full">
                    <h2 className="text-lg font-semibold">{game.titulo}</h2>
                    <button 
                        className="text-gray-400 hover:text-red-500 transition"
                        onClick={eliminarProducto}
                    >
                        <FaTimes size={20} />
                    </button>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 mt-1">
                    {game.plataformas.map((plataforma, index) => (
                        <span key={index}>{getPlatformIcon(plataforma)}</span>
                    ))}
                </div>
                <div className="flex items-start mt-12">
                    <p className="text-xl font-bold text-green-400">${game.precio}</p>
                </div>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                <button
                    className="bg-gray-100 text-gray-700 w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 shadow hover:bg-gray-200 transition"
                    onClick={disminuirCantidad}
                > - </button>
                <span className="text-md">{cantidad}</span>
                <button
                    className="bg-gray-100 text-gray-700 w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 shadow hover:bg-gray-200 transition"
                    onClick={aumentarCantidad}
                > + </button>
            </div>
        </div>
    );
};

export default GamecardCart;
