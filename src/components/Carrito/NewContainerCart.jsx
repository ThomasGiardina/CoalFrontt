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
    const [purchasedItems, setPurchasedItems] = useState([]); // Guarda copia para la factura
    const [invoiceData, setInvoiceData] = useState({
        orderId: "",
        subtotal: 0,
        discount: 0,
        shippingCost: 0,
        total: 0
    });


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

    // Callback para guardar los items y datos antes de limpiar el carrito
    const handlePurchaseComplete = (orderData) => {
        setPurchasedItems([...cartItems]); // Guarda copia antes de clearCart
        if (orderData) {
            setInvoiceData(orderData);
        }
        handleNextStep();
    };

    return (
        <div className="flex flex-col text-white min-h-screen w-full max-w-[1400px] p-4 sm:p-6 lg:p-8 mx-auto">
            <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-4 text-start">Carrito de Compra</h1>

            <ul className="steps steps-vertical sm:steps-horizontal mb-6 sm:mb-10 mt-4 sm:mt-5 text-xs sm:text-sm md:text-base">
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
                    handleNextStep={handlePurchaseComplete}
                />
            )}
            {currentStep === 4 && (
                <Factura
                    cartItems={purchasedItems}
                    paymentMethod={paymentMethod}
                    shippingMethod={shippingMethod}
                    invoiceData={invoiceData}
                />
            )}
        </div>
    );
};

export default NewContainerCart;
