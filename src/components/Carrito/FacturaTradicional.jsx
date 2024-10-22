import React, { useEffect, useState } from "react";

const FacturaTradicional = ({ orderId, orderDate, cartItems, total, shippingAddress }) => {
    const [nombreCliente, setNombreCliente] = useState("Nombre del Cliente");

    useEffect(() => {
        const obtenerUsuarioActual = async () => {
            try {
                const response = await fetch("http://localhost:4002/api/usuario/actual", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                setNombreCliente(`${data.firstName} ${data.lastName}`);
            } catch (error) {
                console.error("Error al obtener el usuario actual:", error);
            }
        };

        obtenerUsuarioActual();
    }, []);

    const formatPrice = (price) => {
        return price.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
        });
    };

    return (
        <div className="p-8 bg-white text-black rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Factura</h1>

            <div className="flex justify-between mb-6 p-4 bg-white border-b">
                <div>
                    <h2 className="font-bold text-lg">Coal</h2>
                    <p>Tu aventura comienza aquí.</p>
                    <p>Dirección: Lima 757</p>
                    <p>Teléfono: 11-7662-5199</p>
                </div>
                <div>
                    <p><strong>N° DE FACTURA:</strong> {orderId}</p>
                    <p><strong>FECHA:</strong> {orderDate.toLocaleDateString()}</p>
                </div>
            </div>

            <div className="mb-6 p-4 bg-white border-b">
                <p><strong>Facturar a:</strong></p>
                <p>Cliente: {nombreCliente}</p>
                <p>Dirección: {shippingAddress.address || "No especificado"}</p>
                <p>Ciudad: {shippingAddress.city || "No especificado"}</p>
                <p>Código Postal: {shippingAddress.postalCode || "No especificado"}</p>
                <p>Teléfono: {shippingAddress.phone || "No especificado"}</p>
            </div>

            <table className="w-full text-left border-t">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 text-black">Descripción</th>
                        <th className="py-2 text-center text-black">Cantidad</th>
                        <th className="py-2 text-right text-black">Importe</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id} className="border-b">
                            <td className="py-2 text-black">{item.titulo}</td>
                            <td className="py-2 text-center text-black">{item.cantidad}</td>
                            <td className="py-2 text-right text-black">{formatPrice(item.precio * item.cantidad)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <table className="w-full mt-6">
                <tbody>
                    <tr>
                        <td className="font-bold text-black text-right pr-2">TOTAL:</td> 
                        <td className="font-bold text-black text-right pl-2">{formatPrice(total)}</td>
                    </tr>
                </tbody>
            </table>

            <div className="text-center mt-6">
                <p className="text-black">Gracias por su confianza</p>
            </div>
        </div>
    );
};

export default FacturaTradicional;
