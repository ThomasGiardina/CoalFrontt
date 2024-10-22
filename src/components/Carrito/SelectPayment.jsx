import React, { useState, useEffect } from "react";
import CardForm from './CardForm';
import AddressForm from './AddressForm';

const SelectPayment = ({ onBack, onConfirm, cartItems }) => {
    const [paymentMethod, setPaymentMethod] = useState(""); 
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState("");
    const [shippingOption, setShippingOption] = useState("");
    const [isNewCard, setIsNewCard] = useState(false);
    const [cardType, setCardType] = useState("");
    const [paymentType, setPaymentType] = useState(""); 
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

    const [errors, setErrors] = useState({}); 
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchUserData();
    }, [token]);

    const fetchUserData = async () => {
        try {
            const response = await fetch("http://localhost:4002/api/usuario/actual", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data.telefono) {
                setFormValues((prevValues) => ({
                    ...prevValues,
                    phone: data.telefono,
                }));
            }
        } catch (error) {
            console.error("Error al cargar los datos del usuario:", error);
        }
    };

    useEffect(() => {
        if (paymentMethod === "Tarjeta de Crédito/Débito") {
            fetchUserCards();
        }
    }, [paymentMethod, token]);

    const fetchUserCards = async () => {
        try {
            const response = await fetch("http://localhost:4002/metodosPago/usuario", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setCards(data);
        } catch (error) {
            console.error("Error al obtener las tarjetas:", error);
        }
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
        if (e.target.value === "Efectivo") {
            setSelectedCard("");
            setIsNewCard(false);
            setPaymentType("EFECTIVO"); 
        }
    };

    const handleCardSelection = (e) => {
        const selectedCardId = e.target.value;
    
        if (selectedCardId === "new") {
            setIsNewCard(true);
            setSelectedCard("");
            setPaymentType("");
        } else {
            setIsNewCard(false);
            setSelectedCard(selectedCardId);

            const selectedCardDetails = cards.find(card => card.id === parseInt(selectedCardId));

            if (selectedCardDetails) {
                setPaymentType(selectedCardDetails.tipoPago);
                console.log("Tipo de pago seleccionado:", selectedCardDetails.tipoPago);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleCardTypeChange = (e) => {
        setCardType(e.target.value);
    };

    const handleShippingOptionChange = (e) => {
        setShippingOption(e.target.value);
    };

    const validateForm = () => {
        let formErrors = {};
        const { name, cardNumber, expirationDate, securityCode } = formValues;

        if (!/^[A-Za-z\s]{1,75}$/.test(name)) {
            formErrors.name = "El nombre solo puede contener letras y debe tener máximo 75 caracteres.";
        }
        if (!/^\d{16}$/.test(cardNumber)) {
            formErrors.cardNumber = "El número de tarjeta debe ser exactamente 16 dígitos.";
        }
        if (!/^\d{3}$/.test(securityCode)) {
            formErrors.securityCode = "El CVV debe ser exactamente 3 números.";
        }

        const today = new Date();
        const expirationDateObj = new Date(expirationDate);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(expirationDate) || expirationDateObj <= today) {
            formErrors.expirationDate = "La fecha de vencimiento debe estar en formato AAAA-MM-DD y ser mayor a hoy.";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0; 
    };

    const isFormValid = () => {
        const { address, city, postalCode, phone } = formValues;
        const isShippingValid = shippingOption === "retiro" || (address && city && postalCode && phone);
        return paymentMethod && (paymentMethod === "Efectivo" || selectedCard || (isNewCard && validateForm())) && isShippingValid;
    };

    const handleConfirm = () => {
        if (!isFormValid()) {
            alert("Por favor completa todos los campos requeridos para continuar.");
            return;
        }

        console.log("Tipo de pago seleccionado:", paymentType);

        const paymentTypeToSend = paymentType || "Tarjeta de Crédito/Débito";
        console.log("Método de pago final:", paymentTypeToSend);

        onConfirm(paymentTypeToSend, shippingOption);
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
                        {cards.map((card) => (
                            <option key={card.id} value={card.id}>
                                **** **** **** {card.numeroTarjeta.slice(-4)} - {card.tipoPago === "CREDITO" ? "Crédito" : "Débito"} - {card.nombrePropietario}
                            </option>
                        ))}
                        <option value="new">Agregar nueva tarjeta</option>
                    </select>

                    {isNewCard && (
                        <CardForm
                            formValues={formValues}
                            handleInputChange={handleInputChange}
                            cardType={cardType}
                            handleCardTypeChange={handleCardTypeChange}
                            errors={errors}
                        />
                    )}
                </div>
            )}

            <AddressForm
                formValues={formValues}
                handleInputChange={handleInputChange}
                shippingOption={shippingOption}
                handleShippingOptionChange={handleShippingOptionChange}
            />

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
