import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BuscadorNavbar from './BuscadorNavbar';

const Homenavbar = () => {
    const [showSearchBar, setShowSearchBar] = useState(false);
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

    return (
        <div>
            <nav class="bg-base-300 h-auto top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center">
                <div class="flex items-center text-4xl">
                    <Link to="/" class="flex items-center">
                        <img alt="Logo" src="./logoCoalBlanco.png" class="w-14" />
                        <span class="ml-2 text-white">Coal</span>
                    </Link>
                </div>
                <div class="hidden sm:flex gap-6 justify-center items-center flex-grow">
                    <Link to="/Store" class="btn btn-ghost btn-sm">
                        <i class="fa-solid fa-store"></i>
                        Tienda
                    </Link>

                    <Link to="/Details" class="btn btn-ghost btn-sm">
                        <i class="fa-solid fa-users text-secondary"></i>
                        Team
                    </Link>

                    <div class="dropdown dropdown-end">
                        <button class="btn btn-ghost btn-sm">
                            <i class="fa-solid fa-fire text-secondary"></i>
                            Features
                            <i class="fa-solid fa-chevron-down"></i>
                        </button>
                        <ul tabindex="0" class="dropdown-content menu bg-base-200 p-4 rounded-box shadow w-48 gap-2">
                            <li><a>Tech tools</a></li>
                            <li><a>Podcast</a></li>
                            <li><a>Community</a></li>
                        </ul>
                    </div>
                </div>
                <div className='relative flex items-center gap-4'>
                    {/* Botón de Lupa */}
                    <div className="relative">
                        <div class={`tooltip tooltip-bottom ${showSearchBar ? 'tooltip-open' : ''}`} data-tip="">
                            <button
                                ref={buttonRef}
                                onClick={toggleSearchBar}
                                class="btn btn-ghost btn-md"
                            >
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </button>
                            {showSearchBar && (
                                <div
                                    ref={searchBarRef}
                                    class="bg-base-100 p-3 rounded shadow-lg w-72 z-50"
                                    style={{ position: 'absolute', top: '100%', right: '0' }}
                                >
                                    <div class="absolute -top-2 right-6 w-3 h-3 bg-base-100 transform rotate-45"></div>
                                    <BuscadorNavbar className="w-full" /> 
                                </div>
                            )}
                        </div>
                    </div>

                    <Link to="/Register" class="btn btn-primary btn-md">
                        <i class="fa-solid fa-rocket"></i>
                        Registrarse
                    </Link>
                    <Link to="/Login" class="btn btn-primary btn-md">
                        <i class="fa-solid fa-right-to-bracket"></i>
                        Iniciar Sesión
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Homenavbar;
