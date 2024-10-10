import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BuscadorNavbar from './BuscadorNavbar';
import Profilepicture from './Profilepicture';

const Homenavbar = () => {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false); 
    const searchBarRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleSearchBar = () => {
        setShowSearchBar((prev) => !prev);
    };

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

    // Verificar el token en localStorage y actualizar el estado de autenticación
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);  // Usuario autenticado
        } else {
            setIsAuthenticated(false); // Usuario no autenticado
        }
    }, []); 

    return (
        <div>
            <nav className="bg-base-300 h-auto top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center text-4xl">
                    <Link to="/" className="flex items-center">
                        <img alt="Logo" src="./logoCoalBlanco.png" className="w-14" />
                        <span className="ml-2 text-white">Coal</span>
                    </Link>
                </div>
                <div className="hidden sm:flex gap-6 justify-center items-center flex-grow">
                    <Link to="/Store" className="btn btn-ghost btn-sm">
                        <i className="fa-solid fa-store"></i>
                        Tienda
                    </Link>

                    <Link to="/Details" className="btn btn-ghost btn-sm">
                        <i className="fa-solid fa-users text-secondary"></i>
                        Team
                    </Link>

                    <div className="dropdown dropdown-end">
                        <button className="btn btn-ghost btn-sm">
                            <i className="fa-solid fa-fire text-secondary"></i>
                            Features
                            <i className="fa-solid fa-chevron-down"></i>
                        </button>
                        <ul tabIndex="0" className="dropdown-content menu bg-base-200 p-4 rounded-box shadow w-48 gap-2">
                            <li><a>Tech tools</a></li>
                            <li><a>Podcast</a></li>
                            <li><a>Community</a></li>
                        </ul>
                    </div>
                </div>
                <div className='relative flex items-center gap-4'>
                    <div className="relative">
                        <div className={`tooltip tooltip-bottom ${showSearchBar ? 'tooltip-open' : ''}`} data-tip="">
                            <button
                                ref={buttonRef}
                                onClick={toggleSearchBar}
                                className="btn btn-ghost btn-md"
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                            {showSearchBar && (
                                <div
                                    ref={searchBarRef}
                                    className="bg-base-100 p-3 rounded shadow-lg w-72 z-50"
                                    style={{ position: 'absolute', top: '100%', right: '0' }}
                                >
                                    <div className="absolute -top-2 right-6 w-3 h-3 bg-base-100 transform rotate-45"></div>
                                    <BuscadorNavbar className="w-full" />
                                </div>
                            )}
                        </div>
                    </div>

                    {isAuthenticated ? (
                        <>
                            {/* Carrito */}
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
                                        <span className="badge badge-sm indicator-item">8</span>
                                    </div>
                                </div>
                                <div
                                    tabIndex={0}
                                    className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
                                >
                                    <div className="card-body">
                                        <span className="text-lg font-bold">8 Items</span>
                                        <span className="text-info">Subtotal: $999</span>
                                        <div className="card-actions">
                                            <button className="btn btn-primary btn-block">View cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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

export default Homenavbar;
