import { useState, useEffect } from "react"; 
import { useSelector, useDispatch } from "react-redux";
import { setCarritoId, setCartItems } from "../../redux/slices/cartSlice";
import SelectPayment from "./SelectPayment";
import VerCarrito from "./VerCarrito";
import ConfirmPurchase from "./ConfirmPurchase";
import Factura from "./Factura";

const NewContainerCart = () => {
    const dispatch = useDispatch();
    const carritoId = useSelector((state) => state.cart.carritoId);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [currentStep, setCurrentStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [shippingMethod, setShippingMethod] = useState("");


    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleBackStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSelectPayment = (selectedMethod, selectedShipping) => {
        setPaymentMethod(selectedMethod);
        setShippingMethod(selectedShipping);
        handleNextStep();
    };

    return (
        <div className="flex flex-col text-white min-h-screen w-[1400px] p-8">
            <h1 className="text-3xl font-semibold text-white mb-4 text-start">Carrito de Compra</h1>

            <ul className="steps mb-10 mt-5">
                <li className={`step ${currentStep >= 1 ? "step-primary" : ""}`}>Ver Carrito</li>
                <li className={`step ${currentStep >= 2 ? "step-primary" : ""}`}>Seleccionar Forma de Pago</li>
                <li className={`step ${currentStep >= 3 ? "step-primary" : ""}`}>Confirmar Compra</li>
                <li className={`step ${currentStep >= 4 ? "step-primary" : ""}`}>Factura</li>
            </ul>

            {currentStep === 1 && (
                <VerCarrito onContinue={handleNextStep} cartItems={cartItems} />
            )}
            {currentStep === 2 && (
                <SelectPayment
                    onBack={handleBackStep}
                    onConfirm={handleSelectPayment}
                    handleNextStep={handleNextStep}
                    cartItems={cartItems}
                />
            )}
            {currentStep === 3 && (
                <ConfirmPurchase
                    paymentMethod={paymentMethod}
                    shippingMethod={shippingMethod}
                    carritoId={carritoId}
                    cartItems={cartItems}
                    handleNextStep={handleNextStep}
                />
            )}
            {currentStep === 4 && (
                <Factura
                    cartItems={cartItems}
                    paymentMethod={paymentMethod}
                    shippingMethod={shippingMethod}
                />
            )}
        </div>
    );
};

export default NewContainerCart;
