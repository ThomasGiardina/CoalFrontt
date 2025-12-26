import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCarrito } from '../../redux/slices/cartSlice';
import Profilepicture from './Profilepicture.jsx';
import { useEffect, useState } from 'react';

const StoreNavbar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, role } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const closeMobileMenu = () => setMobileMenuOpen(false);

    const calculateCartSummary = () => {
        if (!cartItems || cartItems.length === 0) return { totalItems: 0, subtotal: 0 };
        const totalItems = cartItems.reduce((total, item) => total + (item?.cantidad || 0), 0);
        const subtotal = cartItems.reduce((total, item) => {
            const precio = item?.videojuego?.precio || item?.precio || 0;
            return total + (precio * (item?.cantidad || 0));
        }, 0);
        return { totalItems, subtotal };
    };

    useEffect(() => {
        if (isAuthenticated) dispatch(fetchCarrito());
    }, [isAuthenticated, dispatch]);

    const { totalItems, subtotal } = calculateCartSummary();

    return (
        <div className="w-full bg-base-100 sticky top-0 z-50">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="navbar min-h-[64px]">
                    <div className="navbar-start gap-2">
                        <Link to={!isAuthenticated ? "/" : role === 'ADMIN' ? "/GamesAdmin" : "/Store"} className="btn btn-ghost gap-2 px-2">
                            <img alt="Logo" src="/logoCoalBlanco.png" className="w-8 sm:w-9" />
                            <span className="font-bold text-white text-lg hidden sm:inline">Coal</span>
                        </Link>
                        <div className="dropdown lg:hidden">
                            <div role="button" className="btn btn-ghost btn-sm btn-circle" onClick={toggleMobileMenu}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </div>
                            {mobileMenuOpen && (
                                <ul className="absolute left-0 top-full menu bg-base-100 rounded-box z-[60] mt-1 w-52 p-2 shadow-lg">
                                    {isAuthenticated && role === 'ADMIN' ? (
                                        <>
                                            <li><Link to="/GamesAdmin" onClick={closeMobileMenu}><i className="fa-solid fa-gamepad text-primary text-sm"></i> Admin Juegos</Link></li>
                                            <li><Link to="/GiftCardsAdmin" onClick={closeMobileMenu}><i className="fa-solid fa-gift text-primary text-sm"></i> Tarjetas</Link></li>
                                            <li><Link to="/Statistics" onClick={closeMobileMenu}><i className="fa-solid fa-chart-bar text-primary text-sm"></i> Estadísticas</Link></li>
                                            <li><Link to="/AdminOrderHistory" onClick={closeMobileMenu}><i className="fa-solid fa-file-signature text-primary text-sm"></i> Pedidos</Link></li>
                                            <li><Link to="/Store" onClick={closeMobileMenu}><i className="fa-solid fa-store text-primary text-sm"></i> Tienda</Link></li>
                                        </>
                                    ) : (
                                        <>
                                            <li><Link to="/Store" onClick={closeMobileMenu}><i className="fa-solid fa-store text-primary text-sm"></i> Tienda</Link></li>
                                            {isAuthenticated && <li><Link to="/Favorites" onClick={closeMobileMenu}><i className="fa-solid fa-heart text-primary text-sm"></i> Favoritos</Link></li>}
                                            {isAuthenticated && <li><Link to="/UserOrderHistory" onClick={closeMobileMenu}><i className="fa-solid fa-file-contract text-primary text-sm"></i> Pedidos</Link></li>}
                                            <li><Link to="/GiftCards" onClick={closeMobileMenu}><i className="fa-solid fa-gift text-primary text-sm"></i> Tarjetas</Link></li>
                                            <li><Link to="/About" onClick={closeMobileMenu}><i className="fa-solid fa-info-circle text-primary text-sm"></i> Acerca de</Link></li>
                                            <li><Link to="/Support" onClick={closeMobileMenu}><i className="fa-solid fa-headset text-primary text-sm"></i> Soporte</Link></li>
                                        </>
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 gap-1">
                            {isAuthenticated && role === 'ADMIN' ? (
                                <>
                                    <li><Link to="/GamesAdmin" className="text-sm"><i className="fa-solid fa-gamepad text-primary text-xs"></i> Admin</Link></li>
                                    <li><Link to="/GiftCardsAdmin" className="text-sm"><i className="fa-solid fa-gift text-primary text-xs"></i> Tarjetas</Link></li>
                                    <li><Link to="/Statistics" className="text-sm"><i className="fa-solid fa-chart-bar text-primary text-xs"></i> Stats</Link></li>
                                    <li><Link to="/AdminOrderHistory" className="text-sm"><i className="fa-solid fa-file-signature text-primary text-xs"></i> Pedidos</Link></li>
                                    <li><Link to="/Store" className="text-sm"><i className="fa-solid fa-store text-primary text-xs"></i> Tienda</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/Store" className="text-sm"><i className="fa-solid fa-store text-primary text-xs"></i> Tienda</Link></li>
                                    {isAuthenticated && <li><Link to="/Favorites" className="text-sm"><i className="fa-solid fa-heart text-primary text-xs"></i> Favoritos</Link></li>}
                                    {isAuthenticated && <li><Link to="/UserOrderHistory" className="text-sm"><i className="fa-solid fa-file-contract text-primary text-xs"></i> Pedidos</Link></li>}
                                    <li><Link to="/GiftCards" className="text-sm"><i className="fa-solid fa-gift text-primary text-xs"></i> Tarjetas</Link></li>
                                    <li><Link to="/About" className="text-sm"><i className="fa-solid fa-info-circle text-primary text-xs"></i> Acerca de</Link></li>
                                    <li><Link to="/Support" className="text-sm"><i className="fa-solid fa-headset text-primary text-xs"></i> Soporte</Link></li>
                                </>
                            )}
                        </ul>
                    </div>

                    <div className="navbar-end gap-2">
                        {isAuthenticated ? (
                            <>
                                {role !== 'ADMIN' && (
                                    <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-sm btn-circle">
                                            <div className="indicator">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                <span className="badge badge-xs indicator-item badge-primary">{totalItems}</span>
                                            </div>
                                        </div>
                                        <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-[60] mt-3 w-48 shadow-lg">
                                            <div className="card-body">
                                                <span className="font-bold">{totalItems} Items</span>
                                                <span className="text-sm text-base-content/70">Subtotal: ${subtotal.toFixed(2)}</span>
                                                <div className="card-actions">
                                                    <Link to="/Cart" className="btn bg-gradient-to-r from-[#FF6828] to-[#E57028] hover:from-[#E57028] hover:to-[#FF6828] text-white border-none btn-sm btn-block">Ver carrito</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {role === 'ADMIN' && <span className="badge badge-primary hidden sm:flex">ADMIN</span>}
                                <Profilepicture />
                            </>
                        ) : (
                            <>
                                <Link to="/Login" className="btn btn-ghost btn-sm text-sm">Iniciar Sesión</Link>
                                <Link to="/Register" className="btn bg-gradient-to-r from-[#FF6828] to-[#E57028] hover:from-[#E57028] hover:to-[#FF6828] text-white border-none btn-sm text-sm">Registrarse</Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default StoreNavbar;
