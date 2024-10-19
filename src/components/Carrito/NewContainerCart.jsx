import React, { useState } from "react";
import SelectPayment from "./SelectPayment";
import VerCarrito from "./VerCarrito";
import ConfirmPurchase from "./ConfirmPurchase";  

const NewContainerCart = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState("");  

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleBackStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSelectPayment = (selectedMethod) => {
        setPaymentMethod(selectedMethod);  
        handleNextStep();  
    };

    return (
        <div className="flex flex-col  text-white min-h-screen w-[1400px] p-8">
        <h1 className="text-3xl font-semibold text-white mb-4 text-start">Carrito de Compra</h1>

        <ul className="steps mb-10 mt-5">
            <li className={`step ${currentStep >= 1 ? "step-primary" : ""}`}>Ver Carrito</li>
            <li className={`step ${currentStep >= 2 ? "step-primary" : ""}`}>Seleccionar Forma de Pago</li>
            <li className={`step ${currentStep >= 3 ? "step-primary" : ""}`}>Confirmar Compra</li>
            <li className="step">Factura</li>
        </ul>

        {currentStep === 1 && <VerCarrito onContinue={handleNextStep} />}
        {currentStep === 2 && <SelectPayment onBack={handleBackStep} onConfirm={handleSelectPayment} />}
        {currentStep === 3 && <ConfirmPurchase paymentMethod={paymentMethod} carritoId={carritoId} />}  
        
 
        </div>
    );
};

export default NewContainerCart;
