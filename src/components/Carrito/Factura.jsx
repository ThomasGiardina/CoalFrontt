import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import FacturaTradicional from "./FacturaTradicional";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Factura = ({ cartItems = [], paymentMethod, shippingMethod }) => {
    const [orderId, setOrderId] = useState("");
    const [orderDate, setOrderDate] = useState(new Date());
    const [shippingAddress, setShippingAddress] = useState({});
    const [showTraditionalInvoice, setShowTraditionalInvoice] = useState(false);

    const shippingCost = shippingMethod === "envio" ? 5000 : 0; 
    const discountPercentage = paymentMethod === "EFECTIVO" ? 0.15 : paymentMethod === "DEBITO" ? 0.10 : 0; 
    const subtotal = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const discount = subtotal * discountPercentage; 
    const total = subtotal + shippingCost - discount; 

    useEffect(() => {
        const generateOrderId = () => {
            const randomId = Math.floor(Math.random() * 1000000);
            setOrderId(`ORD-${randomId}`);
        };

        generateOrderId();

        if (shippingMethod === "envio") {
            const savedAddress = JSON.parse(localStorage.getItem("direccionEnvio"));
            if (savedAddress) {
                setShippingAddress({
                    address: savedAddress.direccion || "No especificado",
                    city: savedAddress.localidad || "No especificado",
                    postalCode: savedAddress.codigoPostal || "No especificado",
                    phone: savedAddress.telefono || "No especificado",
                });
            } else {
                setShippingAddress({
                    address: "Dirección no proporcionada",
                    city: "No especificado",
                    postalCode: "No especificado",
                    phone: "No especificado",
                });
            }
        }
    }, [shippingMethod]);

    const formatPrice = (price) => {
        return price.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
        });
    };

    return (
        <div className="text-white p-8 rounded-lg w-[1400px] mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-center">¡Gracias por tu compra!</h1>

            {!showTraditionalInvoice && (
                <>
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
                            <span className="text-white">
                                {`${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, Tel: ${shippingAddress.phone}`}
                            </span>
                        </div>
                        )}
                    </div>

                    <div className="bg-neutral p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Resumen de Compra</h2>
                        <div className="mb-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex justify-between mb-3">
                                    <span className="text-white">
                                        {item.titulo} x {item.cantidad}
                                    </span>
                                    <span className="text-white">{formatPrice(item.precio * item.cantidad)}</span>
                                </div>
                            ))}
                        </div>

                        <hr className="border-gray-600 my-4" />

                        <div className="flex justify-between mb-3">
                            <span className="text-gray-400">Subtotal:</span>
                            <span className="text-white">{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between mb-3">
                            <span className="text-gray-400">Envío:</span>
                            <span className="text-white">{formatPrice(shippingCost)}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between mb-3">
                                <span className="text-gray-400">Descuento:</span>
                                <span className="text-white">-{formatPrice(discount)}</span>
                            </div>
                        )}
                        <div className="flex justify-between mb-3">
                            <span className="text-gray-400 font-semibold">Total:</span>
                            <span className="text-white font-semibold">{formatPrice(total)}</span>
                        </div>
                    </div>
                </>
            )}

            {showTraditionalInvoice && (
                <div id="invoice">
                    <FacturaTradicional
                        orderId={orderId}
                        orderDate={orderDate}
                        cartItems={cartItems}
                        total={total}
                        shippingAddress={shippingAddress} 
                    />
                </div>
            )}

            <div className="mt-8 text-center">
                <button 
                    className="btn bg-primary text-white mt-6 py-2 px-4 rounded-md"
                    onClick={() => setShowTraditionalInvoice(!showTraditionalInvoice)}
                >
                    {showTraditionalInvoice ? "Volver a la Factura Moderna" : "Ver Factura Tradicional"}
                </button>
            </div>
        </div>
    );
};

export default Factura;
