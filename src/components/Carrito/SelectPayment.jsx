import React, { useState } from "react";

const SelectPayment = ({ onBack, onConfirm }) => {
    const [paymentMethod, setPaymentMethod] = useState(""); 
    const [shippingOption, setShippingOption] = useState("envio");
    const [termsAccepted, setTermsAccepted] = useState(false); 
    const [formValues, setFormValues] = useState({ 
        name: "",
        address: "",
        city: "",
        postalCode: "",
        phone: ""
    });
    const token = localStorage.getItem('token');  // Asumimos que el token JWT se guarda en localStorage

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleShippingOptionChange = (e) => {
        setShippingOption(e.target.value);
    };

    const isFormValid = () => {
        if (!paymentMethod || !termsAccepted) {
            return false;
        }

        if (shippingOption === "envio") {
            const { name, address, city, postalCode, phone } = formValues;
            return name && address && city && postalCode && phone; 
        }

        return true; 
    };

    // Función para manejar la confirmación del pago usando fetch
    const handleConfirm = async () => {
        if (!isFormValid()) {
            alert("Por favor completa todos los campos requeridos y acepta los términos para continuar.");
            return;
        }

        const metodoPagoData = {
            nombrePropietario: formValues.name,
            direccion: formValues.address,
            tipoPago: paymentMethod === "Efectivo" ? "EFECTIVO" : "CREDITO",
            codigoSeguridad: paymentMethod === "Efectivo" ? null : formValues.securityCode,
            numeroTarjeta: paymentMethod === "Efectivo" ? null : formValues.cardNumber,
            fechaVencimiento: paymentMethod === "Efectivo" ? null : formValues.expirationDate
        };

        try {
            const response = await fetch("http://localhost:4002/metodosPago", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(metodoPagoData),
            });

            if (response.ok) {
                const data = await response.json();
                onConfirm(paymentMethod);  // Pasamos el método de pago seleccionado al siguiente paso
            } else {
                console.error("Error al procesar el método de pago");
                alert("Hubo un error al procesar el método de pago.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    const isDisabled = shippingOption === "retiro"; 

    return (
        <div className=" text-white p-6 rounded-lg ">
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

            <h2 className="text-2xl font-semibold mb-4">Método de Entrega</h2>
            <div className="mb-6">
                <label className="block mb-2">Selecciona una opción de entrega</label>
                <select
                    value={shippingOption}
                    onChange={handleShippingOptionChange}
                    className="bg-gray-700 p-3 w-full rounded-md"
                >
                    <option value="envio">Envío a Domicilio</option>
                    <option value="retiro">Retiro en el Local</option>
                </select>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Información de Envío</h2>

            <div className="mb-6">
                <label className="block mb-2">Nombre Completo</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Ingresa tu nombre completo"
                    value={formValues.name}
                    onChange={handleInputChange}
                    className={`bg-gray-700 p-3 w-full rounded-md ${isDisabled ? "bg-opacity-50 cursor-not-allowed" : ""}`}
                    disabled={isDisabled} 
                />
            </div>

            {/* Otros campos de envío, como Dirección, Ciudad, Código Postal, Teléfono... */}

            <div className="mt-6">
                <label className="inline-flex items-center">
                    <input 
                        type="checkbox" 
                        className="form-checkbox bg-gray-700 text-green-500" 
                        checked={termsAccepted} 
                        onChange={() => setTermsAccepted(!termsAccepted)} 
                    />
                    <span className="ml-2 text-gray-400">
                        Acepto las condiciones del <a href="#" className="text-blue-400">Acuerdo de Suscriptor</a>
                    </span>
                </label>
            </div>

            <div className="flex justify-between mt-6">
                <button 
                    className="btn text-white py-2 px-4 rounded-md" 
                    onClick={onBack}  
                >
                    Atrás
                </button>
                <button 
                    className={`btn bg-primary text-white py-2 px-4 rounded-md ${!isFormValid() ? "opacity-50 cursor-not-allowed" : ""}`} 
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
