import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link, useNavigate } from "react-router-dom";
import { fetchCarrito, addItemToCarrito, updateCartItem } from '../../redux/slices/cartSlice'; // Añadir la acción updateCartItem
import "../../index.css";

const ModalAgregarCarrito = ({ gameDetails, onAddToCarrito = () => console.log('Acción por defecto: agregar al carrito') }) => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const dispatch = useDispatch();
    const { isAuthenticated, token } = useSelector((state) => state.auth);
    const { cartItems, carritoId } = useSelector((state) => state.cart);

    const isOutOfStock = gameDetails.stock <= 0;

    useEffect(() => {
        if (isAuthenticated && token) {
            dispatch(fetchCarrito());
        }
    }, [isAuthenticated, token, dispatch]);

    const handleButtonClick = async () => {
        if (isAuthenticated) {
            // Verificar si el producto ya existe en el carrito
            const existingItem = cartItems.find(item => item.videojuego.id === gameDetails.id);
            const quantityInCart = existingItem ? existingItem.cantidad : 0;
            const totalQuantity = quantityInCart + 1; // Aumentar cantidad

            // Verificar que no exceda el stock disponible
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
                try {
                    if (existingItem) {
                        // Si ya existe en el carrito, actualizar la cantidad
                        await dispatch(updateCartItem({ id: existingItem.id, cantidad: totalQuantity }));
                        MySwal.fire({
                            title: 'Cantidad Actualizada!',
                            text: `La cantidad del producto ha sido actualizada a ${totalQuantity}.`,
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
                            if (!result.isConfirmed) {
                                navigate('/Cart');
                            }
                        });
                    } else {
                        // Si no existe en el carrito, agregarlo
                        await dispatch(addItemToCarrito({ 
                            carritoId, 
                            videojuegoId: gameDetails.id, 
                            cantidad: 1, 
                            token 
                        }));

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
                            if (!result.isConfirmed) {
                                navigate('/Cart');
                            }
                        });
                    }
                } catch (error) {
                    console.error("Error al agregar o actualizar el item en el carrito:", error);
                    MySwal.fire({
                        icon: 'error',
                        title: 'Error al agregar el producto',
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
