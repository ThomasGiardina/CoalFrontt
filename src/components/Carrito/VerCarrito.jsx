import React, { useState, useEffect, useRef } from "react";
import GamecardCart from "../Gamecard/GamecardCart";

const VerCarrito = ({ onContinue, setCartItems, cartItems }) => {
    const [total, setTotal] = useState(0);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const token = localStorage.getItem('token');
    const [isPolling] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch("http://localhost:4002/carritos/usuarios/carrito", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCartItems(data.items || []);
                }
            } catch (error) {
                console.error("Error al cargar el carrito:", error);
            }
        };

        const intervalId = setInterval(() => {
            if (isPolling) {
                fetchCart();
            }
        }, 500);

        return () => clearInterval(intervalId); 
    }, [isPolling]);


    useEffect(() => {
        const calculatedTotal = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        setTotal(calculatedTotal);

        const calculatedTotalItemsCount = cartItems.reduce((acc, item) => acc + item.cantidad, 0);
        setTotalItemsCount(calculatedTotalItemsCount);
    }, [cartItems]);

    const handleUpdateQuantity = (itemId, nuevaCantidad) => {
        const updatedCartItems = cartItems.map(item =>
            item.id === itemId ? { ...item, cantidad: nuevaCantidad } : item
        );
        setCartItems(updatedCartItems);
    };

    const handleDeleteItem = (itemId) => {
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCartItems);
    };

    return (
        <div className="flex justify-between h-screen">
            <div className="w-[800px] mb-7">
                {cartItems && cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <GamecardCart
                            key={item.id}
                            item={item}
                            onUpdateQuantity={handleUpdateQuantity}
                            onDeleteItem={handleDeleteItem}
                        />
                    ))
                ) : (
                    <p className="text-white">El carrito está vacío.</p>
                )}
            </div>
            <div className="bg-neutral w-[500px] h-[300px] p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-white mb-4 text-center">Confirmar Compra</h1>

                <div className="flex flex-col space-y-3 text-white">
                    <div className="flex justify-between">
                        <h2 className="text-xl font-medium">Total Estimado:</h2>
                        <p className="text-xl">${total}</p>
                    </div>
                    <div className="flex justify-between">
                        <h2 className="text-xl font-medium">Cantidad Total de Productos:</h2>
                        <p className="text-xl">{totalItemsCount}</p>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        className={`text-white font-semibold py-3 px-6 w-full rounded-md shadow-lg transition duration-200 
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
