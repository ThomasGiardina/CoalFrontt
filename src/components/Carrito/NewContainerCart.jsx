import React, { useState } from "react";
import SelectPayment from "./SelectPayment";
import VerCarrito from "./VerCarrito";

const NewContainerCart = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = () => {
        setCurrentStep(2); 
    };

    return (
        <div className="flex flex-col bg-gray-900 text-white min-h-screen w-[1400px] p-8">
        <h1 className="text-3xl font-semibold text-white mb-4 text-start">Carrito de Compra</h1>

        <ul className="steps mb-10 mt-5">
            <li className={`step ${currentStep >= 1 ? "step-primary" : ""}`}>Ver Carrito</li>
            <li className={`step ${currentStep >= 2 ? "step-primary" : ""}`}>Seleccionar Forma de Pago</li>
            <li className="step">Confirmar Compra</li>
            <li className="step">Factura</li>
        </ul>

        {currentStep === 1 && <VerCarrito onContinue={handleNextStep} />} 
        {currentStep === 2 && <SelectPayment />}
        </div>
    );
    };

export default NewContainerCart;
