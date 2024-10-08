import React, { useState } from 'react';
import 'daisyui';

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Dead Cells', price: 25, quantity: 1, image: 'path/to/dead-cells.jpg' },
        { id: 2, name: 'Hollow Knight', price: 15, quantity: 2, image: 'path/to/hollow-knight.jpg' },
    ]);

    const [shipping, setShipping] = useState('standard');
    const [payment, setPayment] = useState('credit');
    const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' });
    const [address, setAddress] = useState({ street: '', city: '', state: '', zip: '' });

    const increaseQuantity = (id) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decreaseQuantity = (id) => {
        setCartItems(cartItems.map(item =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const getShippingCost = () => {
        switch (shipping) {
            case 'standard':
                return 5;
            case 'express':
                return 10;
            case 'free':
                return 0;
            default:
                return 0;
        }
    };

    const getDiscount = () => {
        switch (payment) {
            case 'cash':
                return 0.15;
            case 'debit':
                return 0.10;
            default:
                return 0;
        }
    };

    const totalGamesPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingCost = getShippingCost();
    const discount = getDiscount();
    const discountAmount = totalGamesPrice * discount;
    const total = totalGamesPrice + shippingCost - discountAmount;

    return (
        <div className="flex justify-center items-center bg-gray-900 text-white min-h-screen p-8">
            <div className="grid grid-cols-2 gap-8 w-full max-w-6xl h-auto">
                {/* Left Side - Cart Items */}
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold mb-8 text-orange-500">Carrito de Compras</h2>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-lg font-medium">Producto</p>
                        <p className="text-lg font-medium">Cantidad</p>
                        <p className="text-lg font-medium">Precio</p>
                    </div>
                    {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between items-center mb-6 p-6 bg-gray-700 rounded-lg">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                            <p className="text-lg font-medium">{item.name}</p>
                            <div className="flex items-center">
                                <button
                                    className="btn btn-error btn-xs mx-2"
                                    onClick={() => decreaseQuantity(item.id)}
                                >-</button>
                                <p className="text-lg">{item.quantity}</p>
                                <button
                                    className="btn btn-success btn-xs mx-2"
                                    onClick={() => increaseQuantity(item.id)}
                                >+</button>
                            </div>
                            <p className="text-lg font-bold">${item.price * item.quantity}</p>
                            <button
                                className="btn btn-error btn-xs mx-2"
                                onClick={() => removeItem(item.id)}
                            >Eliminar</button>
                        </div>
                    ))}
                    <div className="flex justify-between items-center mt-8">
                        <p className="text-2xl font-bold">Total Juegos:</p>
                        <p className="text-2xl font-bold text-orange-500">${totalGamesPrice}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-xl font-bold">Costo de Envío {shipping === 'standard' ? 'Estándar (1-3 días)' : shipping === 'express' ? 'Express (24 horas)' : 'Gratis (3-7 días)'}:</p>
                        <p className="text-xl font-bold text-orange-500">${shippingCost}</p>
                    </div>
                    {discount > 0 && (
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-xl font-bold">Descuento ({payment === 'cash' ? '15% Efectivo' : '10% Débito'}):</p>
                            <p className="text-xl font-bold text-orange-500">-${discountAmount.toFixed(2)}</p>
                        </div>
                    )}
                    <div className="flex justify-between items-center mt-8">
                        <p className="text-2xl font-bold">Total:</p>
                        <p className="text-2xl font-bold text-orange-500">${total.toFixed(2)}</p>
                    </div>
                </div>

                {/* Right Side - Order Summary */}
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-orange-500">Resumen de la Orden</h2>
                    
                    {/* Payment Method */}
                    <div className="mb-6">
                        <label className="block mb-2 text-lg">Método de Pago</label>
                        <select
                            className="select select-bordered w-full bg-gray-700 text-white"
                            value={payment}
                            onChange={(e) => setPayment(e.target.value)}
                        >
                            <option value="credit">Tarjeta de Crédito</option>
                            <option value="debit">Tarjeta de Débito</option>
                            <option value="cash">Efectivo</option>
                        </select>
                    </div>

                    {/* Credit/Debit Card Details */}
                    <div className="mb-6">
                        <label className="block mb-2 text-lg">Detalles de Tarjeta</label>
                        <input
                            className="input input-bordered w-full mb-4 bg-gray-700 text-white"
                            placeholder="Número de Tarjeta"
                            value={cardDetails.number}
                            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                            disabled={payment === 'cash'}
                        />
                        <input
                            className="input input-bordered w-full mb-4 bg-gray-700 text-white"
                            placeholder="Fecha de Expiración"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            disabled={payment === 'cash'}
                        />
                        <input
                            className="input input-bordered w-full mb-4 bg-gray-700 text-white"
                            placeholder="CVC"
                            value={cardDetails.cvc}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                            disabled={payment === 'cash'}
                        />
                    </div>

                    {/* Shipping Method */}
                    <div className="mb-6">
                        <label className="block mb-2 text-lg">Método de Envío</label>
                        <select
                            className="select select-bordered w-full bg-gray-700 text-white"
                            value={shipping}
                            onChange={(e) => setShipping(e.target.value)}
                        >
                            <option value="standard">Envío Estándar - $5 (1-3 días)</option>
                            <option value="express">Envío Express - $10 (24 horas)</option>
                            <option value="free">Envío Gratis (3-7 días)</option>
                        </select>
                    </div>

                    {/* Shipping Address */}
                    <div className="mb-6">
                        <label className="block mb-2 text-lg">Dirección de Envío</label>
                        <input
                            className="input input-bordered w-full mb-4 bg-gray-700 text-white"
                            placeholder="Calle"
                            value={address.street}
                            onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        />
                        <input
                            className="input input-bordered w-full mb-4 bg-gray-700 text-white"
                            placeholder="Ciudad"
                            value={address.city}
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        />
                        <input
                            className="input input-bordered w-full mb-4 bg-gray-700 text-white"
                            placeholder="Estado"
                            value={address.state}
                            onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        />
                        <input
                            className="input input-bordered w-full mb-4 bg-gray-700 text-white"
                            placeholder="Código Postal"
                            value={address.zip}
                            onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                        />
                    </div>

                    {/* Checkout and Continue Shopping Buttons */}
                    <div className="mt-8 flex justify-between">
                        <button className="btn btn-wide bg-orange-500 hover:bg-orange-600 text-white">Checkout</button>
                        <button className="btn btn-wide bg-gray-500 hover:bg-gray-600 text-white">Seguir Comprando</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;