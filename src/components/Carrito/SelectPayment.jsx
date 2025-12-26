import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateShippingAddress, setMetodoDePago, setDireccionEnvio, setRetiroEnLocal } from "../../redux/slices/cartSlice";
import { fetchUserCards } from "../../redux/slices/authSlice";
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
                Swal.fire({
                    title: "¡Éxito!",
                    text: "La tarjeta fue creada con éxito.",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: '#FF6828',
                    background: '#1D1F23',
                    color: '#fff',
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
                    confirmButtonColor: '#FF6828',
                    background: '#1D1F23',
                    color: '#fff',
                });
            }
        } catch (error) {
            console.error('Error al guardar el método de pago:', error);
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error al guardar la tarjeta. Verifica tu conexión.",
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: '#FF6828',
                background: '#1D1F23',
                color: '#fff',
            });
        }
    };


    const handleSaveNewCard = async (newCardData) => {
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
            dispatch(setRetiroEnLocal());
        } else {
            dispatch(setDireccionEnvio({}));
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
            Swal.fire({
                title: "Error",
                text: "Por favor completa todos los campos requeridos para continuar.",
                icon: "error",
                confirmButtonColor: '#FF6828',
                background: '#1D1F23',
                color: '#fff',
            });
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
        <div className="text-white w-full max-w-[1200px] mx-auto">
            <div className="bg-neutral rounded-xl border border-base-200 p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Seleccionar Método de Pago
                </h2>

                <div className="space-y-6">
                    <div>
                        <label className="text-gray-400 text-sm mb-2 block">Método de Pago</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => handlePaymentMethodChange("Tarjeta de Crédito/Débito")}
                                className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3
                                    ${paymentMethod === "Tarjeta de Crédito/Débito"
                                        ? "border-primary bg-primary/10"
                                        : "border-base-200 bg-base-200/50 hover:border-gray-500"}`}
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${paymentMethod === "Tarjeta de Crédito/Débito" ? "bg-primary/20" : "bg-base-300"}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${paymentMethod === "Tarjeta de Crédito/Débito" ? "text-primary" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-white">Tarjeta de Crédito/Débito</p>
                                    <p className="text-gray-400 text-sm">Hasta 10% de descuento</p>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => handlePaymentMethodChange("Efectivo")}
                                className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3
                                    ${paymentMethod === "Efectivo"
                                        ? "border-primary bg-primary/10"
                                        : "border-base-200 bg-base-200/50 hover:border-gray-500"}`}
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${paymentMethod === "Efectivo" ? "bg-primary/20" : "bg-base-300"}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${paymentMethod === "Efectivo" ? "text-primary" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-white">Efectivo</p>
                                    <p className="text-gray-400 text-sm">15% de descuento</p>
                                </div>
                            </button>
                        </div>
                    </div>

                    {paymentMethod === "Tarjeta de Crédito/Débito" && (
                        <div className="bg-base-200/30 rounded-xl p-4 sm:p-6 border border-base-200">
                            <label className="text-gray-400 text-sm mb-3 block">Selecciona tu tarjeta</label>
                            <select
                                value={selectedCard}
                                onChange={handleCardSelection}
                                className="select select-bordered w-full bg-base-300 border-base-200 text-white"
                            >
                                <option value="">Seleccione una tarjeta</option>
                                {cards.map((card) => (
                                    <option key={card.id} value={card.id}>
                                        **** **** **** {card.numeroTarjeta.slice(-4)} - {card.tipoPago === "CREDITO" ? "Crédito" : "Débito"} - {card.nombrePropietario}
                                    </option>
                                ))}
                                <option value="new">+ Agregar nueva tarjeta</option>
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
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 pt-6 border-t border-base-200">
                    <button
                        className="btn btn-ghost border border-base-200 text-white py-3 px-6 rounded-xl text-base w-full sm:w-auto"
                        onClick={onBack}
                    >
                        ← Atrás
                    </button>
                    <button
                        className={`py-3 px-8 rounded-xl font-semibold text-white text-base w-full sm:w-auto transition-all duration-300
                        ${!isFormValid()
                                ? "bg-gray-600 opacity-50 cursor-not-allowed"
                                : "bg-gradient-to-r from-[#FF6828] to-[#E57028] hover:from-[#E57028] hover:to-[#FF6828] shadow-lg hover:shadow-primary/30"}`}
                        onClick={handleConfirm}
                        disabled={!isFormValid()}
                    >
                        Confirmar Pedido →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectPayment;
