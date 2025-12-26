import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import FacturaTradicional from "./FacturaTradicional";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";

const Factura = ({ cartItems = [], shippingMethod, paymentMethod, invoiceData = {} }) => {
    const [orderDate] = useState(new Date());
    const [showTraditionalInvoice, setShowTraditionalInvoice] = useState(false);

    const shippingAddress = useSelector((state) => state.cart.direccionEnvio) || null;

    const parsedShippingAddress =
        typeof shippingAddress === "string" ? JSON.parse(shippingAddress) : shippingAddress;

    // Usar datos de invoiceData o calcular fallback
    const orderId = invoiceData.orderId || `ORD-${Math.floor(Math.random() * 1000000)}`;
    const subtotal = invoiceData.subtotal || cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const discount = invoiceData.discount || 0;
    const shippingCost = invoiceData.shippingCost || (shippingMethod === "envio" ? 5000 : 0);
    const total = invoiceData.total || (subtotal + shippingCost - discount);

    // Formato legible del método de pago
    const getPaymentMethodLabel = (method) => {
        const labels = {
            'CREDITO': 'Tarjeta de Crédito',
            'DEBITO': 'Tarjeta de Débito',
            'EFECTIVO': 'Efectivo',
            'Credito': 'Tarjeta de Crédito',
            'Debito': 'Tarjeta de Débito',
            'Efectivo': 'Efectivo'
        };
        return labels[method] || method || 'No especificado';
    };

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
                Swal.fire({
                    title: "Error",
                    text: "No se pudo descargar la factura",
                    icon: "error",
                    confirmButtonColor: '#FF6828',
                    background: '#1D1F23',
                    color: '#fff',
                });
            });
    };

    return (
        <div className="text-white p-4 sm:p-6 lg:p-8 rounded-lg w-full max-w-[1400px] mx-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-center">¡Gracias por tu compra!</h1>

            {!showTraditionalInvoice && (
                <>
                    <div className="bg-neutral p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Factura de Pedido</h2>
                        <div className="flex flex-col sm:flex-row justify-between mb-2 sm:mb-3 gap-1 sm:gap-0">
                            <span className="text-gray-400 text-sm sm:text-base">Número de Pedido:</span>
                            <span className="text-white text-sm sm:text-base break-all">{orderId}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between mb-2 sm:mb-3 gap-1 sm:gap-0">
                            <span className="text-gray-400 text-sm sm:text-base">Fecha:</span>
                            <span className="text-white text-sm sm:text-base">{orderDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between mb-2 sm:mb-3 gap-1 sm:gap-0">
                            <span className="text-gray-400 text-sm sm:text-base">Método de Pago:</span>
                            <span className="text-green-400 text-sm sm:text-base">{getPaymentMethodLabel(paymentMethod)}</span>
                        </div>
                        {shippingMethod === "envio" && parsedShippingAddress && (
                            <div className="flex flex-col sm:flex-row justify-between mb-2 sm:mb-3 gap-1 sm:gap-0">
                                <span className="text-gray-400 text-sm sm:text-base">Dirección de Envío:</span>
                                <span className="text-white text-sm sm:text-base break-words text-right sm:text-left">
                                    {`${parsedShippingAddress.direccion || ""}, ${parsedShippingAddress.localidad || ""}, ${parsedShippingAddress.codigoPostal || ""}, Tel: ${parsedShippingAddress.telefono || ""}`}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="bg-neutral p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Resumen de Compra</h2>
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

            <div className="mt-6 sm:mt-8 text-center flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                    className="btn bg-primary text-white py-2 px-4 rounded-md text-sm sm:text-base"
                    onClick={() => setShowTraditionalInvoice(!showTraditionalInvoice)}
                >
                    {showTraditionalInvoice ? "Volver a Resumen" : "Ver Factura"}
                </button>
                {showTraditionalInvoice && (
                    <button
                        className="btn bg-neutral text-white py-2 px-4 rounded-md text-sm sm:text-base"
                        onClick={downloadInvoiceAsPDF}
                    >
                        Descargar Factura
                    </button>
                )}
                <Link to="/Store" className="btn bg-primary text-white py-2 px-4 rounded-md text-sm sm:text-base">
                    Volver a la Tienda
                </Link>
            </div>
        </div>
    );
};

export default Factura;
