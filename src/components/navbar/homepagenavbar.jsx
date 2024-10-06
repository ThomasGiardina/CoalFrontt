import React from 'react';
import { Link } from 'react-router-dom';
import BuscardorNavbar from './BuscadorNavbar';

const Homenavbar = () => {
    return (
        <div>
            <nav class="navbar justify-between bg-base-300 h-24 top-0 left-0 w-full z-50">
                <Link to="/" class="btn btn-ghost text-4xl">
                    <img alt="Logo" src="./logoCoalBlanco.png" class="w-14" />
                    Coal
                </Link>

                <div class="dropdown dropdown-end sm:hidden  ">
                    <button class="btn btn-ghost">
                        <i class="fa-solid fa-bars text-lg"></i>
                    </button>

                    <ul tabindex="0" class="dropdown-content menu z-[1] bg-base-200 p-4 rounded-box shadow w-64 gap-2">
                        <li><a>Tienda</a></li>
                        <li><a>Team</a></li>
                        <li>
                            <h2 class="menu-title">Features</h2>
                            <ul>
                                <li><a>Tech tools</a></li>
                                <li><a>Podcast</a></li>
                                <li><a>Community</a></li>
                            </ul>
                        </li>
                        
                        <a class="btn btn-primary btn-sm">
                            <i class="fa-solid fa-rocket"></i>
                            Access
                        </a>
                        <a class="btn btn-primary btn-sm">
                            <i class="fa-solid fa-rocket"></i>
                            Access
                        </a>
                    </ul>
                </div>

                <div class="hidden sm:flex gap-2 justify-center items-center flex-grow">
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

                        <ul tabindex="0" class="dropdown-content menu z-[1] bg-base-200 p-6 rounded-box shadow w-56 gap-2">
                            <li><a>Tech tools</a></li>
                            <li><a>Podcast</a></li>
                            <li><a>Community</a></li>
                        </ul>
                    </div>

                    <BuscardorNavbar />


                </div>
                <div className='flex items-center gap-2'>
                    <Link to="/Register" class="btn btn-primary btn-md">
                        <i class="fa-solid fa-rocket"></i>
                        Registrarse
                    </Link >

                    <Link to="/Login" class="btn btn-primary btn-md">
                        <i class="fa-solid fa-right-to-bracket"></i>
                        Iniciar Sesión
                    </Link >
                </div>
            </nav>
        </div>
    )
}

export default Homenavbar;