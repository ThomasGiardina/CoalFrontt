import React, { useState } from 'react';
import { BsNintendoSwitch, BsPcDisplay } from "react-icons/bs";
import { FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const GamecardCart = ({ item, onUpdateQuantity, onDeleteItem }) => { 

    const { id, titulo, precio, cantidad, videojuego, carrito_id, plataforma } = item; 
    const fotoUrl = videojuego && videojuego.foto
        ? `data:image/jpeg;base64,${videojuego.foto}` 
        : '/ruta/a/imagen_por_defecto.png'; 
    
    const token = localStorage.getItem('token');

    console.log("Plataforma del juego:", plataforma);
    console.log("Carrito ID:", carrito_id); // Asegúrate de que el carrito_id está definido correctamente

    const actualizarCantidadEnBackend = async (itemId, carritoId, nuevaCantidad) => {
        if (!carritoId) {
            console.error("El carrito_id no está definido.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:4002/carritos/${carritoId}/items/${itemId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ cantidad: nuevaCantidad }),
            });

            if (response.ok) {
                console.log(`Cantidad del item con id: ${itemId} actualizada a: ${nuevaCantidad}`);
            } else {
                console.error("Error al actualizar la cantidad en la base de datos");
            }
        } catch (error) {
            console.error("Error al hacer la solicitud PUT:", error);
        }
    };

    const aumentarCantidad = () => {
        const nuevaCantidad = cantidad + 1;
        onUpdateQuantity(id, nuevaCantidad);
        actualizarCantidadEnBackend(id, carrito_id, nuevaCantidad);  
    };

    const disminuirCantidad = () => {
        if (cantidad > 1) {
            const nuevaCantidad = cantidad - 1;
            onUpdateQuantity(id, nuevaCantidad);
            actualizarCantidadEnBackend(id, carrito_id, nuevaCantidad);  
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
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    console.log(`Intentando eliminar el producto con id: ${id}`);

                    const response = await fetch(`http://localhost:4002/carritos/items/${id}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
    
                    if (response.ok) {
                        console.log(`Producto ${titulo} eliminado del carrito.`);

                        Swal.fire({
                            icon: 'success',
                            title: 'Eliminado!',
                            text: 'El producto ha sido eliminado del carrito.',
                        });

                        onDeleteItem(id); 
                    } else {
                        console.error("Error al eliminar el producto.");
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo eliminar el producto.',
                        });
                    }
                } catch (error) {
                    console.error("Error al hacer la solicitud DELETE:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al eliminar el producto.',
                    });
                }
            }
        });
    };

    const getPlatformIcon = (platform) => {
        if (!platform) return null;

        switch (platform.toUpperCase()) {  
            case 'XBOX':
                return (
                    <span className="flex items-center space-x-2">
                        <i className="fab fa-xbox text-green-500 text-xl"></i>
                        <span className="text-sm">Xbox</span>
                    </span>
                );
            case 'PLAY_STATION':
            case 'PLAYSTATION':  
                return (
                    <span className="flex items-center space-x-2">
                        <i className="fab fa-playstation text-blue-500 text-xl"></i>
                        <span className="text-sm">PlayStation</span>
                    </span>
                );
            case 'NINTENDO_SWITCH':
                return (
                    <span className="flex items-center space-x-2">
                        <div className="text-red-700 text-xl p-1">
                            <BsNintendoSwitch />
                        </div>
                        <span className="text-sm">Nintendo Switch</span>
                    </span>
                );
            case 'PC':
                return (
                    <span className="flex items-center space-x-2">
                        <div className="text-gray-500 text-xl p-1">
                            <BsPcDisplay />
                        </div>
                        <span className="text-sm">PC</span>
                    </span>
                );
            default:
                return <span>Plataforma desconocida</span>;
        }
    };

    return (
        <div className="bg-neutral text-white rounded-lg flex items-start shadow-lg transition-transform transform hover:scale-105 w-full h-[200px] p-4 relative mb-6"> {/* Aumenta la altura aquí */}
            <div className="flex items-center space-x-4 h-full"> 
                <img
                    className="w-32 h-full rounded-lg object-cover"  
                    src={fotoUrl}  
                    alt={titulo}
                />
            </div>

            <div className="flex-grow flex flex-col justify-between ml-4">
                <div className="flex justify-between items-start w-full">
                    <h2 className="text-lg font-semibold">{titulo}</h2>
                    <button 
                        className="text-gray-400 hover:text-red-500 transition"
                        onClick={eliminarProducto}
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                <div className="flex items-center space-x-2 text-gray-400 mt-1">
                    {getPlatformIcon(plataforma)}
                </div>

                <div className="flex items-start mt-12">
                    <p className="text-xl font-bold text-green-400">${precio}</p>
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
