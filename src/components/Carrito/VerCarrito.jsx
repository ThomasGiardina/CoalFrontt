import React, { useState, useEffect } from "react";
import GamecardCart from "../Gamecard/GamecardCart";

const VerCarrito = ({ onContinue }) => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch("http://localhost:4002/carritos/usuarios/carrito", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("ID del carrito del usuario:", data.id);
                    console.log("Items del carrito:", data.items);

                    setCartItems(data.items);
                    const calculatedTotal = data.items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
                    setTotal(calculatedTotal);  
                } else {
                    console.error("Error al cargar el carrito");
                }
            } catch (error) {
                console.error("Error en la solicitud:", error);
            }
        };
        fetchCart();
    }, [token]);

    const handleUpdateQuantity = (itemId, nuevaCantidad) => {
        const updatedItems = cartItems.map(item =>
            item.id === itemId ? { ...item, cantidad: nuevaCantidad } : item
        );
        setCartItems(updatedItems);
        const newTotal = updatedItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        setTotal(newTotal);
    };

    return (
        <div className="flex justify-between h-screen">
            <div className="w-[800px]">
                {cartItems.length > 0 && cartItems.map((item) => (
                    <GamecardCart
                        key={item.id}
                        item={item}
                        onUpdateQuantity={handleUpdateQuantity}  
                    />
                ))}
            </div>
            <div className="bg-neutral w-[500px] h-[300px] p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-white mb-4 text-center">Confirmar Compra</h1>

                <div className="flex flex-col space-y-3 text-white">
                    <div className="flex justify-between">
                        <h2 className="text-xl font-medium">Total Estimado:</h2>
                        <p className="text-xl">${total}</p>
                    </div>
                    <div className="flex justify-between">
                        <h2 className="text-xl font-medium">Cantidad de Productos:</h2>
                        <p className="text-xl">{cartItems.length}</p>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 w-full rounded-md shadow-lg transition duration-200"
                        onClick={onContinue} 
                    >
                        Continuar al Pago
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerCarrito;
