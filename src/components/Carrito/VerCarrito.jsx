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
        <div className="flex flex-col lg:flex-row justify-between gap-6 min-h-screen">
            <div className="w-full lg:w-[800px] mb-4 lg:mb-7">
                {cartItems && cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <GamecardCart
                            key={`${item.id}-${item.cantidad}`}
                            item={item}
                            onUpdateQuantity={handleUpdateQuantity}
                            onDeleteItem={handleDeleteItem}
                        />
                    ))
                ) : (
                    <p className="text-white text-center lg:text-left">El carrito está vacío.</p>
                )}
            </div>
            <div className="bg-neutral w-full lg:w-[500px] h-auto lg:h-[300px] p-4 sm:p-6 rounded-lg shadow-lg sticky top-4 lg:sticky z-10">
                <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-4 text-center">Confirmar Compra</h1>

                <div className="flex flex-col space-y-3 text-white">
                    <div className="flex justify-between">
                        <h2 className="text-base sm:text-lg lg:text-xl font-medium">Total Estimado:</h2>
                        <p className="text-base sm:text-lg lg:text-xl">${total.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                        <h2 className="text-base sm:text-lg lg:text-xl font-medium">Cantidad Total:</h2>
                        <p className="text-base sm:text-lg lg:text-xl">{totalItemsCount}</p>
                    </div>
                </div>

                <div className="mt-6 sm:mt-8 flex justify-center">
                    <button
                        className={`text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 w-full rounded-md shadow-lg transition duration-200 text-sm sm:text-base
                        ${cartItems.length === 0 ? "bg-gray-500 opacity-50 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}`}
                        onClick={onContinue}
                        disabled={cartItems.length === 0}
                    >
                        Continuar al Pago
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerCarrito;
