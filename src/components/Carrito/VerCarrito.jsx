import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCarrito, setCartItems, updateCartItem, removeCartItem } from "../../redux/slices/cartSlice";
import GamecardCart from "../Gamecard/GamecardCart";

const VerCarrito = ({ onContinue }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const carritoId = useSelector((state) => state.cart.carritoId);
    const token = useSelector((state) => state.auth.token);

    const [total, setTotal] = useState(0);
    const [totalItemsCount, setTotalItemsCount] = useState(0);

    useEffect(() => {
        if (token) {
            dispatch(fetchCarrito());
        }
    }, [dispatch, token]);

    useEffect(() => {
        const calculatedTotal = cartItems.reduce(
            (acc, item) => acc + (item.precio || 0) * (item.cantidad || 0),
            0
        );
        setTotal(calculatedTotal);

        const calculatedTotalItemsCount = cartItems.reduce(
            (acc, item) => acc + (item.cantidad || 0),
            0
        );
        setTotalItemsCount(calculatedTotalItemsCount);
    }, [cartItems]);


    const handleUpdateQuantity = (itemId, nuevaCantidad) => {
        dispatch(updateCartItem({ id: itemId, cantidad: nuevaCantidad }));
    };

    const handleDeleteItem = (itemId) => {
        dispatch(removeCartItem(itemId));
    };

    return (
        <div className="flex flex-col lg:flex-row justify-between gap-8 min-h-screen">
            <div className="w-full lg:flex-1">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Tu Carrito
                </h2>
                {cartItems && cartItems.length > 0 ? (
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <GamecardCart
                                key={`${item.id}-${item.cantidad}`}
                                item={item}
                                onUpdateQuantity={handleUpdateQuantity}
                                onDeleteItem={handleDeleteItem}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-neutral rounded-xl p-12 text-center border border-base-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <p className="text-gray-400 text-lg">Tu carrito está vacío</p>
                        <p className="text-gray-500 text-sm mt-2">¡Explora nuestra tienda y encuentra juegos increíbles!</p>
                    </div>
                )}
            </div>

            <div className="w-full lg:w-[400px] lg:sticky lg:top-20 h-fit">
                <div className="bg-neutral rounded-xl p-6 border border-base-200 shadow-xl">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Resumen de Compra</h2>

                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center py-3 border-b border-base-200">
                            <span className="text-gray-400">Productos</span>
                            <span className="text-white font-medium">{totalItemsCount} items</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-base-200">
                            <span className="text-gray-400">Subtotal</span>
                            <span className="text-white font-medium">${total.toFixed(2)} ARS</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <span className="text-lg font-semibold text-white">Total Estimado</span>
                            <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        className={`w-full py-4 rounded-xl font-semibold text-white text-lg transition-all duration-300 shadow-lg
                        ${cartItems.length === 0
                                ? "bg-gray-600 opacity-50 cursor-not-allowed"
                                : "bg-gradient-to-r from-[#FF6828] to-[#E57028] hover:from-[#E57028] hover:to-[#FF6828] hover:shadow-primary/30 hover:-translate-y-0.5"}`}
                        onClick={onContinue}
                        disabled={cartItems.length === 0}
                    >
                        Continuar al Pago
                    </button>

                    <p className="text-center text-gray-500 text-xs mt-4">
                        Envío y descuentos calculados en el siguiente paso
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerCarrito;
