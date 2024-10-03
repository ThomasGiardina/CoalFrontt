const Homenavbar = () => {
    return (
        <div className="navbar bg-base-100 bg-opacity-75 max-w-screen-2xl px-4 py-2 rounded-2xl">
            <div className="navbar-start flex items-center space-x-4">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                        <li><a>Item z</a></li>
                    </ul>
                </div>       
                <img src="./logoCoalBlanco.png" alt="Logo" className="h-10 w-auto" />
                <a className="ml-2 text-2xl font-bold text-white" target="blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Coal</a>
                <ul className="flex space-x-4">
                    <li><a className="btn btn-ghost text-sm">Tienda</a></li>
                    <li><a className="btn btn-ghost text-sm">Servicios</a></li>
                    <li><a className="btn btn-ghost text-sm">Contacto</a></li>
                </ul>
            </div>

            <div className="navbar-end">
                <a className="btn btn-primary text-extra rounded-xl w-40">Iniciar Sesion</a>
            </div>
        </div>
    )
}

export default Homenavbar;