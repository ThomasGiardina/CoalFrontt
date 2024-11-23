import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateShippingAddress, setMetodoDePago, setDireccionEnvio } from "../../redux/slices/cartSlice";
import { fetchUserCards } from "../../redux/slices/authSlice"; 
import CardForm from './CardForm';
import AddressForm from './AddressForm';
import ModalPayment from "../Settings/ModalPayment";
import Swal from "sweetalert2";
import { setMetodoDePagoId } from "../../redux/slices/cartSlice";



const SelectPayment = ({ onBack, onConfirm }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token); 
    const cards = useSelector((state) => state.auth.userCards); 

    const [paymentMethod, setPaymentMethod] = useState("");
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
        phone: "",
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [errors, setErrors] = useState({}); 

    useEffect(() => {
        if (paymentMethod === "Tarjeta de Crédito/Débito") {
            dispatch(fetchUserCards())
                .catch((error) => {
                    console.error('Error en fetchUserCards:', error);
                });
        }
    }, [paymentMethod, dispatch, token]);

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method); 
    
        if (method === 'Efectivo') {
            dispatch(setMetodoDePago(method)); 
        }
    
        if (method === 'Tarjeta de Crédito/Débito') {
            handleCardSelection();  
        }
    };
    
    const handleCardSelection = (e) => {
        const selectedCardId = e?.target?.value;
    
        if (selectedCardId === "") {
            setSelectedCard(""); 
            return;
        }
    
        if (selectedCardId === "new") {
            setIsModalOpen(true); 
        } else {
            setIsNewCard(false);
            setSelectedCard(selectedCardId);
    
            dispatch(setMetodoDePagoId(selectedCardId)); 
    
            const selectedCardDetails = cards.find(card => card.id === parseInt(selectedCardId));
    
            if (selectedCardDetails) {
                setPaymentType(selectedCardDetails.tipoPago);  
                dispatch(setMetodoDePago(selectedCardDetails.tipoPago));
                console.log("Tipo de pago seleccionado:", selectedCardDetails.tipoPago);
            }
        }
    };
    
    
    

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveMetodoPago = async (nuevoMetodo) => {
        try {
            const response = await fetch('http://localhost:4002/metodosPago', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoMetodo),
            });
    
            if (response.ok) {
                console.log('Método de pago guardado exitosamente.');
                Swal.fire({
                    title: "¡Éxito!",
                    text: "La tarjeta fue creada con éxito.",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                });
                dispatch(fetchUserCards()); 
            } else {
                const errorData = await response.json();
                console.error('Error al guardar el método de pago:', errorData);
                Swal.fire({
                    title: "Error",
                    text: "No se pudo crear la tarjeta. Intenta de nuevo.",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            }
        } catch (error) {
            console.error('Error al guardar el método de pago:', error);
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error al guardar la tarjeta. Verifica tu conexión.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }
    };
    

    const handleSaveNewCard = async (newCardData) => {
        console.log("Guardando nueva tarjeta:", newCardData);
        await handleSaveMetodoPago(newCardData); 
        setIsModalOpen(false); 
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
        const option = e.target.value;
        setShippingOption(option);
    
        if (option === "retiro") {
            dispatch(setTipoEntrega("RETIRO_LOCAL"));
            dispatch(setDireccionEnvio(null));
        } else {
            dispatch(setTipoEntrega("DELIVERY"));
        }
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
            Swal.fire("Error", "Por favor completa todos los campos requeridos para continuar.", "error");
            return;
        }
    
        const addressData = shippingOption === "envio"
            ? {
                direccion: formValues.address,
                localidad: formValues.city,
                codigoPostal: formValues.postalCode,
                telefono: formValues.phone,
            }
            : null;
    
        if (shippingOption === "envio") {
            dispatch(setDireccionEnvio(addressData)); 
        } else {
            dispatch(setDireccionEnvio(null)); 
        }
    
        onConfirm(paymentMethod, shippingOption, selectedCard, addressData);
    };
    
    
    

    return (
        <div className="text-white p-6 rounded-lg bg-gray-800">
            <h2 className="text-2xl font-semibold mb-4">Seleccionar Método de Pago</h2>

            <div className="mb-6">
                <label className="block mb-2">Método de Pago</label>
                <select
                    value={paymentMethod} 
                    onChange={(e) => handlePaymentMethodChange(e.target.value)}
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
                        <option value="">Seleccione una tarjeta</option>
                        {cards.map((card) => (
                            <option key={card.id} value={card.id}>
                                **** **** **** {card.numeroTarjeta.slice(-4)} - {card.tipoPago === "CREDITO" ? "Crédito" : "Débito"} - {card.nombrePropietario}
                            </option>
                        ))}
                        <option value="new">Agregar nueva tarjeta</option>
                    </select>
                </div>
            )}

            <ModalPayment
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                onSave={handleSaveNewCard}
                initialFormData={{}} 
            />



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
