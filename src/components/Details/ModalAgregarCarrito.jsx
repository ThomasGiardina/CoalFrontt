import React, { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext'; 
import "../../index.css";

const ModalAgregarCarrito = ({ gameDetails, onAddToCarrito = () => console.log('Acción por defecto: agregar al carrito') }) => {
    const { isAuthenticated } = useContext(AuthContext); 
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal); 

    const [cartItems, setCartItems] = useState([]);
    const isOutOfStock = gameDetails.stock <= 0;

    useEffect(() => {
        const fetchCartItems = async () => {
            if (isAuthenticated) {
                try {
                    const token = localStorage.getItem('token');
                    const response = await fetch('http://localhost:4002/carritos/usuarios/carrito', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Error al obtener el carrito');
                    }

                    const data = await response.json();
                    setCartItems(data.items || []); 

                } catch (error) {
                    console.error('Error fetching cart items:', error);
                    MySwal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.message,
                        confirmButtonText: 'OK',
                        background: '#1D1F23',
                        color: '#fff',
                        customClass: {
                            popup: 'custom-toast',
                        },
                    });
                }
            }
        };

        fetchCartItems();
    }, [isAuthenticated]);

    const handleButtonClick = async () => {
        if (isAuthenticated) {
            const existingItem = cartItems.find(item => item.videojuego.id === gameDetails.id);
            const quantityInCart = existingItem ? existingItem.cantidad : 0;
            const totalQuantity = quantityInCart + 1; 

            if (totalQuantity > gameDetails.stock) {
                MySwal.fire({
                    icon: 'warning',
                    title: 'Cantidad máxima alcanzada',
                    text: `Solo hay ${gameDetails.stock} unidades disponibles.`,
                    confirmButtonText: 'OK',
                    background: '#1D1F23',
                    color: '#fff',
                    customClass: {
                        popup: 'custom-toast',
                    },
                });
            } else {
                setCartItems(prevItems => {
                    if (existingItem) {
                        return prevItems.map(item =>
                            item.videojuego.id === gameDetails.id
                                ? { ...item, cantidad: item.cantidad + 1 }
                                : item
                        );
                    } else {
                        return [...prevItems, { videojuego: gameDetails, cantidad: 1 }];
                    }
                });

                onAddToCarrito();

                MySwal.fire({
                    title: 'Producto Agregado al Carrito!',
                    text: 'El producto ha sido agregado al carrito con éxito. Elija si desea seguir comprando o ir al carrito.',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Seguir Comprando',
                    cancelButtonText: 'Ir al Carrito',
                    background: '#1D1F23',
                    color: '#fff',
                    customClass: {
                        popup: 'custom-toast',
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        console.log('Continuar comprando presionado');
                    } else if (result.isDismissed) {
                        console.log('Ir al carrito presionado');
                        navigate('/Cart'); 
                    }
                });
            }
        } else {
            MySwal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Para agregar un juego al carrito primero debes iniciar sesión en la página',
                showConfirmButton: false,
                timer: 4000,
                background: '#1D1F23', 
                customClass: {
                    popup: 'custom-toast', 
                    title: 'text-white' 
                }
            });
            navigate('/Login'); 
        }
    };

    return (
        <>
            <div className="join items-center w-[300px]">
                <div className="join-item w-[120px] h-[48px] flex justify-center items-center rounded-l-lg bg-neutral">
                    <p className="text-[16px] text-success">${gameDetails.precio} ARS</p>
                </div>
                <button 
                    className={`join-item w-[180px] h-[48px] flex justify-center items-center rounded-r-lg 
                        ${isOutOfStock 
                            ? 'bg-red-500 text-neutral cursor-not-allowed'  
                            : 'bg-success text-neutral hover:bg-success/80 border border-black'}`}             
                    onClick={handleButtonClick}
                    disabled={isOutOfStock}
                >
                    {isOutOfStock ? 'No hay Stock' : 'Agregar al Carrito'}
                </button>
            </div>
        </>
    );
};

export default ModalAgregarCarrito;
