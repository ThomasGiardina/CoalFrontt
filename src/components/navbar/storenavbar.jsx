import React, { useContext, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Profilepicture from './Profilepicture.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';

const StoreNavbar = () => {
    const { isAuthenticated, role } = useContext(AuthContext); 
    const [showSearchBar, setShowSearchBar] = useState(false);
    const searchBarRef = useRef(null);
    const buttonRef = useRef(null);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [subtotal, setSubtotal] = useState(0); 

    const handleClickOutside = (event) => {
        if (
            searchBarRef.current &&
            !searchBarRef.current.contains(event.target) &&
            !buttonRef.current.contains(event.target)
        ) {
            setShowSearchBar(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                    throw new Error('Error al obtener el carrito');
                }

                const data = await response.json();

                const totalItems = data.items ? data.items.reduce((total, item) => total + item.cantidad, 0) : 0;
                setCartItemsCount(totalItems); 

                const calculatedSubtotal = data.items ? data.items.reduce((total, item) => total + (item.videojuego.precio * item.cantidad), 0) : 0;
                setSubtotal(calculatedSubtotal); 

            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        }
    };

    useEffect(() => {
        const intervalId = setInterval(fetchCartItems, 200); 
        return () => clearInterval(intervalId); 
    }, [isAuthenticated]);

    return (
        <div>
            <nav className="bg-background h-auto top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center text-4xl">
                    <Link 
                        to={!isAuthenticated ? "/" : role === 'ADMIN' ? "/GamesAdmin" : "/Store"} 
                        className="flex items-center"
                    >
                        <img alt="Logo" src="/logoCoalBlanco.png" className="w-14" />
                        <span className="ml-2 text-white font-bold">Coal</span>
                    </Link>
                    {isAuthenticated && role === 'ADMIN' ? (
                    <>
                        <Link to="/GamesAdmin" className="btn btn-ghost btn-sm ml-8">
                            <i className="fa-solid fa-gamepad text-primary"></i>
                            Admin de Juegos
                        </Link>
                        <Link to="/Statistics" className="btn btn-ghost btn-sm">
                            <i className="fa-solid fa-chart-bar text-primary"></i>
                            Estadísticas
                        </Link>
                        <Link to="/AdminOrderHistory" className="btn btn-ghost btn-sm">
                            <i className="fa-solid fas fa-file-signature text-primary"></i>
                            Pedidos
                        </Link>
                        <Link to="/Store" className="btn btn-ghost btn-sm">
                            <i className="fa-solid fa-store text-primary"></i>
                            Tienda
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/Store" className="btn btn-ghost btn-sm ml-8">
                            <i className="fa-solid fa-store text-primary"></i>
                            Tienda
                        </Link>
                        {isAuthenticated && (
                            <Link to="/UserOrderHistory" className="btn btn-ghost btn-sm">
                                <i className="fa-solid fas fa-file-contract text-primary"></i>
                                Pedidos
                            </Link>
                        )}
                        <Link to="/About" className="btn btn-ghost btn-sm">
                            <i className="fa-solid fa-info-circle text-primary"></i>
                            Acerca de
                        </Link>
                        <Link to="/Support" className="btn btn-ghost btn-sm">
                            <i className="fa-solid fa-headset text-primary"></i>
                            Soporte
                        </Link>
                        {isAuthenticated && (
                            <Link to="/Favorites" className="btn btn-ghost btn-sm">
                                <i className="fa-solid fa-star text-primary"></i>
                                Favoritos
                            </Link>
                        )}
                    </>
                )}
                </div>
                <div className='relative flex items-center gap-4'>
                    {isAuthenticated ? (
                        <>
                            {role !== 'ADMIN' && (
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                        <div className="indicator">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                                />
                                            </svg>
                                            <span className="badge badge-sm indicator-item badge-primary">{cartItemsCount}</span>
                                        </div>
                                    </div>
                                    <div
                                        tabIndex={0}
                                        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
                                    >
                                        <div className="card-body">
                                            <span className="text-lg font-bold">{cartItemsCount} Items</span> 
                                            <span className="text-slate-200">Subtotal: ${subtotal.toFixed(2)}</span> 
                                            <div className="card-actions">
                                                <Link to="/Cart" className="btn btn-primary btn-block text-white">
                                                    <i>Ver carrito</i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {role === 'ADMIN' && (
                                <span className="text-white text-2xl font-bold ml-4">ADMIN</span> 
                            )}
                            <Profilepicture />
                        </>
                    ) : (
                        <>
                            <Link to="/Register" className="btn btn-primary btn-md">
                                <i className="fa-solid fa-rocket"></i>
                                Registrarse
                            </Link>
                            <Link to="/Login" className="btn btn-primary btn-md">
                                <i className="fa-solid fa-right-to-bracket"></i>
                                Iniciar Sesión
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default StoreNavbar;
