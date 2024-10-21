import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Factura = ({ cartItems = [], paymentMethod, total = 0, shippingMethod }) => {
    const [orderId, setOrderId] = useState("");
    const [orderDate, setOrderDate] = useState(new Date());
    const [shippingAddress, setShippingAddress] = useState("");

    useEffect(() => {
        const generateOrderId = () => {
            const randomId = Math.floor(Math.random() * 1000000);
            setOrderId(`ORD-${randomId}`);
        };

        generateOrderId();

        if (shippingMethod === "envio" || shippingMethod === "Envío a Domicilio") {
            const savedAddress = localStorage.getItem("direccionEnvio");
            setShippingAddress(savedAddress || "Dirección no proporcionada");
        }
    }, [shippingMethod]);

    const formatPrice = (price) => {
        if (typeof price !== "number" || isNaN(price)) {
            return "0 ARS"; 
        }
        return price.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
        });
    };

    return (
        <div className="text-white p-8 rounded-lg w-[1400px] mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-center">¡Gracias por tu compra!</h1>

            <div className="bg-neutral p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4">Factura de Pedido</h2>
                <div className="flex justify-between mb-3">
                    <span className="text-gray-400">Número de Pedido:</span>
                    <span className="text-white">{orderId}</span>
                </div>
                <div className="flex justify-between mb-3">
                    <span className="text-gray-400">Fecha:</span>
                    <span className="text-white">{orderDate.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between mb-3">
                    <span className="text-gray-400">Método de Pago:</span>
                    <span className="text-green-400">{paymentMethod}</span>
                </div>
                {shippingMethod === "envio" && (
                    <div className="flex justify-between mb-3">
                        <span className="text-gray-400">Dirección de Envío:</span>
                        <span className="text-white">{shippingAddress}</span>
                    </div>
                )}
            </div>

            <div className="bg-neutral p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4">Resumen de Compra</h2>
                <div className="mb-6">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between mb-3">
                            <span className="text-white">
                                {item.nombre} x {item.cantidad}
                            </span>
                            <span className="text-white">{formatPrice(item.precio * item.cantidad)}</span>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between mb-3">
                    <span className="text-gray-400">Total:</span>
                    <span className="text-white">{formatPrice(total)}</span>
                </div>
            </div>

            <div className="mt-8 text-center">
                <h2 className="text-xl font-semibold mb-4">¡Esperamos verte pronto!</h2>
                <p className="text-gray-400">
                    Si tienes alguna duda o problema con tu pedido, no dudes en
                    <a href="#" className="text-blue-400"> contactarnos.</a>
                </p>
            </div>
        </div>
    );
};

export default Factura;
