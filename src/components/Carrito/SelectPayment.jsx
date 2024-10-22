import React, { useState, useEffect } from "react";

const SelectPayment = ({ onBack, onConfirm, cartItems }) => {
    const [paymentMethod, setPaymentMethod] = useState(""); 
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState("");
    const [shippingOption, setShippingOption] = useState(""); 
    const [isNewCard, setIsNewCard] = useState(false);
    const [formValues, setFormValues] = useState({
        name: "",
        cardNumber: "",
        expirationDate: "",
        securityCode: "",
        address: "",
        city: "",
        postalCode: "",
        phone: ""
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch("http://localhost:4002/api/usuario/actual", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.telefono) {
                setFormValues((prevValues) => ({
                    ...prevValues,
                    phone: data.telefono,
                }));
            }
        })
        .catch((error) => console.error("Error al cargar los datos del usuario:", error));
    }, [token]);

    useEffect(() => {
        if (paymentMethod === "Tarjeta de Crédito/Débito") {
            fetch("http://localhost:4002/metodosPago/usuario", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => response.json())
            .then(data => {
                setCards(data);
            })
            .catch(error => console.error("Error al obtener las tarjetas:", error));
        }
    }, [paymentMethod, token]);

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
        if (e.target.value === "Efectivo") {
            setSelectedCard("");
            setIsNewCard(false);
        }
    };

    const handleCardSelection = (e) => {
        const selectedCardId = e.target.value;
        if (selectedCardId === "new") {
            setIsNewCard(true);
            setSelectedCard("");
        } else {
            setIsNewCard(false);
            setSelectedCard(selectedCardId);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleShippingOptionChange = (e) => {
        setShippingOption(e.target.value);
    };

    const isFormValid = () => {
        const { address, city, postalCode, phone } = formValues;
        const isShippingValid = shippingOption === "retiro" || (address && city && postalCode && phone);
        return paymentMethod && (paymentMethod === "Efectivo" || selectedCard || (isNewCard && formValues.name && formValues.cardNumber && formValues.expirationDate && formValues.securityCode)) && isShippingValid;
    };

    const handleConfirm = () => {
        if (!isFormValid()) {
            alert("Por favor completa todos los campos requeridos para continuar.");
            return;
        }

        const selectedPaymentMethod = paymentMethod === "Efectivo" ? "Efectivo" : (selectedCard.tipoPago || "Tarjeta de Crédito/Débito");
        const selectedShippingMethod = shippingOption === "envio" ? "Envío a Domicilio" : "Retiro en el Local";

        onConfirm(selectedPaymentMethod, selectedShippingMethod);
    };

    return (
        <div className="text-white p-6 rounded-lg bg-gray-800">
            <h2 className="text-2xl font-semibold mb-4">Seleccionar Método de Pago</h2>

            <div className="mb-6">
                <label className="block mb-2">Método de Pago</label>
                <select
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                    className="bg-gray-700 p-3 w-full rounded-md"
                >
                    <option value="" disabled>Selecciona un método</option>
                    <option value="Tarjeta de Crédito/Débito">Tarjeta de Crédito/Débito</option>
                    <option value="Efectivo">Efectivo</option>
                </select>
            </div>

            {paymentMethod === "Tarjeta de Crédito/Débito" && (
                <div className="mb-6">
                    <label className="block mb-2">Selecciona tu tarjeta</label>
                    <select
                        value={selectedCard}
                        onChange={handleCardSelection}
                        className="bg-gray-700 p-3 w-full rounded-md"
                    >
                        <option value="" disabled>Selecciona una tarjeta</option>
                        {cards.map(card => (
                            <option key={card.id} value={card.id}>
                                **** **** **** {card.numeroTarjeta.slice(-4)} - {card.tipoPago === "CREDITO" ? "Crédito" : "Débito"} - {card.nombrePropietario}
                            </option>
                        ))}
                        <option value="new">Agregar nueva tarjeta</option>
                    </select>

                    {isNewCard && (
                        <div className="mt-6">
                            <label className="block mb-2">Nombre en la tarjeta</label>
                            <input
                                type="text"
                                name="name"
                                value={formValues.name}
                                onChange={handleInputChange}
                                className="bg-gray-700 p-3 w-full rounded-md"
                                placeholder="Nombre en la tarjeta"
                            />

                            <label className="block mb-2 mt-4">Número de tarjeta</label>
                            <input
                                type="text"
                                name="cardNumber"
                                value={formValues.cardNumber}
                                onChange={handleInputChange}
                                className="bg-gray-700 p-3 w-full rounded-md"
                                placeholder="Número de tarjeta"
                            />

                            <label className="block mb-2 mt-4">Fecha de vencimiento</label>
                            <input
                                type="text"
                                name="expirationDate"
                                value={formValues.expirationDate}
                                onChange={handleInputChange}
                                className="bg-gray-700 p-3 w-full rounded-md"
                                placeholder="MM/AA"
                            />

                            <label className="block mb-2 mt-4">Código de seguridad</label>
                            <input
                                type="text"
                                name="securityCode"
                                value={formValues.securityCode}
                                onChange={handleInputChange}
                                className="bg-gray-700 p-3 w-full rounded-md"
                                placeholder="CVV"
                            />
                        </div>
                    )}
                </div>
            )}

            <h2 className="text-2xl font-semibold mb-4">Método de Entrega</h2>
            <div className="mb-6">
                <label className="block mb-2">Selecciona una opción de entrega</label>
                <select
                    value={shippingOption}
                    onChange={handleShippingOptionChange}
                    className="bg-gray-700 p-3 w-full rounded-md"
                >
                    <option value="" disabled>Selecciona tipo de entrega</option>
                    <option value="envio">Envío a Domicilio</option>
                    <option value="retiro">Retiro en el Local</option>
                </select>
            </div>

            {shippingOption === "envio" && (
                <div className="mt-6">
                    <label className="block mb-2">Dirección</label>
                    <input
                        type="text"
                        name="address"
                        value={formValues.address}
                        onChange={handleInputChange}
                        className="bg-gray-700 p-3 w-full rounded-md"
                        placeholder="Dirección"
                    />

                    <label className="block mb-2 mt-4">Ciudad</label>
                    <input
                        type="text"
                        name="city"
                        value={formValues.city}
                        onChange={handleInputChange}
                        className="bg-gray-700 p-3 w-full rounded-md"
                        placeholder="Ciudad"
                    />

                    <label className="block mb-2 mt-4">Código Postal</label>
                    <input
                        type="text"
                        name="postalCode"
                        value={formValues.postalCode}
                        onChange={handleInputChange}
                        className="bg-gray-700 p-3 w-full rounded-md"
                        placeholder="Código Postal"
                    />

                    <label className="block mb-2 mt-4">Teléfono</label>
                    <input
                        type="text"
                        name="phone"
                        value={formValues.phone}
                        onChange={handleInputChange}
                        className="bg-gray-700 p-3 w-full rounded-md"
                        placeholder="Teléfono"
                    />
                </div>
            )}

            <div className="flex justify-between mt-6">
                <button 
                    className="btn text-white py-2 px-4 rounded-md" 
                    onClick={onBack}
                >
                    Atrás
                </button>
                <button 
                    className={`btn bg-secondary text-white py-2 px-4 rounded-md ${!isFormValid() ? "opacity-50 cursor-not-allowed" : ""}`} 
                    onClick={handleConfirm}
                    disabled={!isFormValid()}
                >
                    Confirmar Pedido
                </button>
            </div>
        </div>
    );
};

export default SelectPayment;
