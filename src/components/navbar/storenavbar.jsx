import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCarrito } from '../../redux/slices/cartSlice';
import Profilepicture from './Profilepicture.jsx';

const StoreNavbar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, role } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const searchBarRef = useRef(null);
    const buttonRef = useRef(null);

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

    const calculateCartSummary = () => {
        if (!cartItems || cartItems.length === 0) {
            return { totalItems: 0, subtotal: 0 }; 
        }

        const totalItems = cartItems.reduce(
            (total, item) => total + (item?.cantidad || 0),
            0
        );

        const subtotal = cartItems.reduce(
            (total, item) => total + ((item?.videojuego?.precio || 0) * (item?.cantidad || 0)),
            0
        );

        return { totalItems, subtotal };
    };

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchCarrito());
        }
    }, [isAuthenticated, dispatch]);

    const { totalItems, subtotal } = calculateCartSummary();

    return (
        <div>
            <nav className="bg-background h-auto top-0 left-0 w-full z-50 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
                <div className="flex items-center text-2xl sm:text-3xl lg:text-4xl">
                    <Link 
                        to={!isAuthenticated ? "/" : role === 'ADMIN' ? "/GamesAdmin" : "/Store"} 
                        className="flex items-center"
                    >
                        <img alt="Logo" src="/logoCoalBlanco.png" className="w-10 sm:w-12 lg:w-14" />
                        <span className="ml-2 text-white font-bold hidden sm:inline">Coal</span>
                    </Link>
                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center">
                        {isAuthenticated && role === 'ADMIN' ? (
                            <>
                                <Link to="/GamesAdmin" className="btn btn-ghost btn-sm ml-4 lg:ml-8">
                                    <i className="fa-solid fa-gamepad text-primary"></i>
                                    <span className="hidden xl:inline">Admin de Juegos</span>
                                </Link>
                                <Link to="/Statistics" className="btn btn-ghost btn-sm">
                                    <i className="fa-solid fa-chart-bar text-primary"></i>
                                    <span className="hidden xl:inline">Estadísticas</span>
                                </Link>
                                <Link to="/AdminOrderHistory" className="btn btn-ghost btn-sm">
                                    <i className="fa-solid fas fa-file-signature text-primary"></i>
                                    <span className="hidden xl:inline">Pedidos</span>
                                </Link>
                                <Link to="/Store" className="btn btn-ghost btn-sm">
                                    <i className="fa-solid fa-store text-primary"></i>
                                    <span className="hidden xl:inline">Tienda</span>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/Store" className="btn btn-ghost btn-sm ml-4 lg:ml-8">
                                    <i className="fa-solid fa-store text-primary"></i>
                                    <span className="hidden xl:inline">Tienda</span>
                                </Link>
                                {isAuthenticated && (
                                    <Link to="/UserOrderHistory" className="btn btn-ghost btn-sm">
                                        <i className="fa-solid fas fa-file-contract text-primary"></i>
                                        <span className="hidden xl:inline">Pedidos</span>
                                    </Link>
                                )}
                                <Link to="/About" className="btn btn-ghost btn-sm">
                                    <i className="fa-solid fa-info-circle text-primary"></i>
                                    <span className="hidden xl:inline">Acerca de</span>
                                </Link>
                                <Link to="/Support" className="btn btn-ghost btn-sm">
                                    <i className="fa-solid fa-headset text-primary"></i>
                                    <span className="hidden xl:inline">Soporte</span>
                                </Link>
                                {isAuthenticated && (
                                    <Link to="/Favorites" className="btn btn-ghost btn-sm">
                                        <i className="fa-solid fa-heart text-primary"></i>
                                        <span className="hidden xl:inline">Favoritos</span>
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                </div>
                {/* Mobile Menu Button */}
                <div className="lg:hidden relative z-[60]">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle relative z-[60]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[60] mt-3 w-52 p-2 shadow-lg">
                            {isAuthenticated && role === 'ADMIN' ? (
                                <>
                                    <li><Link to="/GamesAdmin" className="text-white"><i className="fa-solid fa-gamepad text-primary"></i> Admin de Juegos</Link></li>
                                    <li><Link to="/Statistics" className="text-white"><i className="fa-solid fa-chart-bar text-primary"></i> Estadísticas</Link></li>
                                    <li><Link to="/AdminOrderHistory" className="text-white"><i className="fa-solid fas fa-file-signature text-primary"></i> Pedidos</Link></li>
                                    <li><Link to="/Store" className="text-white"><i className="fa-solid fa-store text-primary"></i> Tienda</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/Store" className="text-white"><i className="fa-solid fa-store text-primary"></i> Tienda</Link></li>
                                    {isAuthenticated && (
                                        <li><Link to="/UserOrderHistory" className="text-white"><i className="fa-solid fas fa-file-contract text-primary"></i> Pedidos</Link></li>
                                    )}
                                    <li><Link to="/About" className="text-white"><i className="fa-solid fa-info-circle text-primary"></i> Acerca de</Link></li>
                                    <li><Link to="/Support" className="text-white"><i className="fa-solid fa-headset text-primary"></i> Soporte</Link></li>
                                    {isAuthenticated && (
                                        <li><Link to="/Favorites" className="text-white"><i className="fa-solid fa-heart text-primary"></i> Favoritos</Link></li>
                                    )}
                                </>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="relative flex items-center gap-2 sm:gap-4">
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
                                            <span className="badge badge-sm indicator-item badge-primary">{totalItems}</span>
                                        </div>
                                    </div>
                                    <div
                                        tabIndex={0}
                                        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
                                    >
                                        <div className="card-body">
                                            <span className="text-lg font-bold">{totalItems} Items</span>
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
                                <span className="text-white text-lg sm:text-xl lg:text-2xl font-bold ml-2 sm:ml-4 hidden sm:inline">ADMIN</span> 
                            )}
                            <Profilepicture />
                        </>
                    ) : (
                        <>
                            <Link to="/Register" className="btn btn-primary btn-sm sm:btn-md">
                                <i className="fa-solid fa-rocket"></i>
                                <span className="hidden sm:inline">Registrarse</span>
                            </Link>
                            <Link to="/Login" className="btn btn-primary btn-sm sm:btn-md">
                                <i className="fa-solid fa-right-to-bracket"></i>
                                <span className="hidden sm:inline">Iniciar Sesión</span>
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default StoreNavbar;
