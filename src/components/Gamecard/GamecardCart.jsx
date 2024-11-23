import React from 'react';
import { BsNintendoSwitch, BsPcDisplay } from "react-icons/bs";
import { FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useDispatch } from 'react-redux';
import { deleteItemFromCarrito, updateCartItemAsync } from '../../redux/slices/cartSlice';

const GamecardCart = ({ item, onUpdateQuantity }) => {
    const dispatch = useDispatch();
    const { id, titulo, precio, cantidad, foto, plataforma, stock } = item || {};

    const fotoUrl = foto
        ? `data:image/jpeg;base64,${foto}`
        : '/ruta/a/imagen_por_defecto.png';

    const aumentarCantidad = () => {
        const nuevaCantidad = cantidad + 1;
        if (nuevaCantidad <= stock) {
            dispatch(updateCartItemAsync({ id, cantidad: nuevaCantidad }));
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Cantidad máxima alcanzada',
                text: `Solo hay ${stock} unidades disponibles.`,
                background: '#1D1F23',
                color: '#fff',
            });
        }
    };

    const disminuirCantidad = () => {
        if (cantidad > 1) {
            const nuevaCantidad = cantidad - 1;
            dispatch(updateCartItemAsync({ id, cantidad: nuevaCantidad }));
        }
    };

    const eliminarProducto = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se eliminará el producto del carrito.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF6828',
            cancelButtonColor: '#d33',
            background: '#1D1F23',
            color: '#fff',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteItemFromCarrito(id));
            }
        });
    };

    const getPlatformIcon = (platform) => {
        switch (platform?.toUpperCase()) {
            case 'XBOX':
                return <i className="fab fa-xbox text-green-500 text-xl"></i>;
            case 'PLAYSTATION':
                return <i className="fab fa-playstation text-blue-500 text-xl"></i>;
            case 'NINTENDO_SWITCH':
                return <BsNintendoSwitch className="text-red-700 text-xl" />;
            case 'PC':
                return <BsPcDisplay className="text-gray-500 text-xl" />;
            default:
                return <span>Plataforma desconocida</span>;
        }
    };

    return (
        <div className="bg-neutral text-white rounded-lg flex items-start shadow-lg transition-transform transform hover:scale-105 w-full h-[200px] p-4 relative mb-6">
            <div className="flex items-center space-x-4 h-full">
                <img className="w-32 h-full rounded-lg object-cover" src={fotoUrl} alt={titulo || "Producto sin título"} />
            </div>

            <div className="flex-grow flex flex-col justify-between ml-4">
                <div className="flex justify-between items-start w-full">
                    <h2 className="text-lg font-semibold">{titulo || "Producto desconocido"}</h2>
                    <button
                        className="text-gray-400 hover:text-red-500 transition"
                        onClick={eliminarProducto}
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                <div className="flex items-start mt-12">
                    <p className="text-xl font-bold text-green-400">${precio?.toFixed(2) || "0.00"}</p>
                </div>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                <button
                    className="bg-gray-100 text-gray-700 w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 shadow hover:bg-gray-200 transition"
                    onClick={disminuirCantidad}
                >
                    -
                </button>
                <span className="text-md">{cantidad || 1}</span>
                <button
                    className="bg-gray-100 text-gray-700 w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 shadow hover:bg-gray-200 transition"
                    onClick={aumentarCantidad}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default GamecardCart;
