import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; 
import Swal from "sweetalert2";
import FacturaTradicional from "./FacturaTradicional";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";

const Factura = ({ cartItems = [], shippingMethod }) => {
    const [orderId, setOrderId] = useState("");
    const [orderDate] = useState(new Date());
    const [showTraditionalInvoice, setShowTraditionalInvoice] = useState(false);

    const shippingAddress = useSelector((state) => state.cart.direccionEnvio) || null;

    const parsedShippingAddress =
        typeof shippingAddress === "string" ? JSON.parse(shippingAddress) : shippingAddress;

    const payment = useSelector((state) => state.cart.metodoDePago);


    const shippingCost = shippingMethod === "envio" ? 5000 : 0; 
    const discountPercentage = payment === "EFECTIVO" ? 0.15 : payment === "DEBITO" ? 0.10 : 0; 
    const subtotal = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const discount = subtotal * discountPercentage; 
    const total = subtotal + shippingCost - discount; 

    

    useEffect(() => {
        const generateOrderId = () => {
            const randomId = Math.floor(Math.random() * 1000000);
            setOrderId(`ORD-${randomId}`);
        };

        generateOrderId();
    }, []);

    const formatPrice = (price) => {
        return price.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
        });
    };

    const downloadInvoiceAsPDF = () => {
        const input = document.getElementById("invoice");
        html2canvas(input, { backgroundColor: "#ffffff" })
            .then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("p", "mm", "a4");
                const imgWidth = 210;
                const pageHeight = 295;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                pdf.save(`Factura-${orderId}.pdf`);
            })
            .catch((error) => {
                console.error("Error al generar el PDF:", error);
                Swal.fire("Error", "No se pudo descargar la factura", "error");
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
                            <span className="text-green-400">{payment}</span> 
                        </div>
                        {shippingMethod === "envio" && parsedShippingAddress && (
                            <div className="flex justify-between mb-3">
                                <span className="text-gray-400">Dirección de Envío:</span>
                                <span className="text-white">
                                    {`${parsedShippingAddress.direccion || ""}, ${parsedShippingAddress.localidad || ""}, ${parsedShippingAddress.codigoPostal || ""}, Tel: ${parsedShippingAddress.telefono || ""}`}
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
                        shippingCost={shippingCost} 
                        discount={discount}
                        shippingMethod={shippingMethod}
                    />
                </div>
            )}

            <div className="mt-8 text-center">
                <button 
                    className="btn bg-primary text-white mt-6 py-2 px-4 rounded-md"
                    onClick={() => setShowTraditionalInvoice(!showTraditionalInvoice)}
                >
                    {showTraditionalInvoice ? "Volver a Resumen" : "Ver Factura"}
                </button>
                {showTraditionalInvoice && (
                    <button 
                        className="btn bg-neutral text-white mt-6 py-2 px-4 rounded-md ml-4"
                        onClick={downloadInvoiceAsPDF} 
                    >
                        Descargar Factura
                    </button>
                )}
                <Link to="/Store" className="btn bg-primary text-white mt-6 py-2 px-4 ml-3 rounded-md">
                    Volver a la Tienda
                </Link>
            </div>
        </div>
    );
};

export default Factura;
