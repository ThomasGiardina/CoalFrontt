import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import GamecardPurchase from "../Gamecard/GamecardPurchase";
import { refreshToken } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlice";

const ConfirmPurchase = ({ paymentMethod, shippingMethod, cartItems = [], handleNextStep }) => {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);

    const carritoId = useSelector((state) => state.cart.carritoId);
    const token = useSelector((state) => state.auth.token);
    const userId = useSelector((state) => state.auth.userId);
    const selectedPaymentMethodId = useSelector((state) => state.cart.metodoDePagoId);
    const shippingAddress = useSelector((state) => state.cart.direccionEnvio);
    const dispatch = useDispatch();

    const payment = useSelector((state) => state.cart.metodoDePago);

    const shipping = shippingMethod;

    const shippingCost = shipping === "envio" ? 5000 : 0;

    const discountPercentage =
        payment === "Efectivo" ? 0.15 : payment === "DEBITO" ? 0.10 : 0;

    useEffect(() => {
        const calculatedSubtotal = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        setSubtotal(calculatedSubtotal);

        const discount = calculatedSubtotal * discountPercentage;
        const calculatedTotal = calculatedSubtotal + shippingCost - discount;
        setTotal(calculatedTotal);
    }, [cartItems, discountPercentage, shippingCost]);

    const handleTermsChange = (e) => {
        setTermsAccepted(e.target.checked);
    };

    const handlePurchase = async () => {
        if (!termsAccepted) {
            Swal.fire({
                title: "Error",
                text: "Debes aceptar los términos para continuar.",
                icon: "error",
                confirmButtonColor: '#FF6828',
                background: '#1D1F23',
                color: '#fff',
            });
            return;
        }

        if (!carritoId || !paymentMethod || !shippingMethod) {
            Swal.fire({
                title: "Error",
                text: "Faltan datos esenciales para completar la compra.",
                icon: "error",
                confirmButtonColor: '#FF6828',
                background: '#1D1F23',
                color: '#fff',
            });
            return;
        }

        const requestData = {
            tipoEntrega: shippingMethod.toUpperCase(),
            tipoPago: paymentMethod.toUpperCase(),
            metodoPagoId: paymentMethod === "Efectivo" ? null : selectedPaymentMethodId,
            direccionEnvio: shippingMethod === "envio" ? JSON.stringify(shippingAddress) : null,
            montoTotal: total,
            cantidadArticulos: cartItems.reduce((acc, item) => acc + item.cantidad, 0),
            items: cartItems.map(item => ({
                videojuegoId: item.id,
                cantidad: item.cantidad,
                precio: item.precio
            }))
        };

        try {
            const response = await fetch(`http://localhost:4002/carritos/confirmar/${carritoId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error("Error al confirmar el carrito");
            }

            const responseData = await response.json();

            Swal.fire({
                title: "Compra realizada!",
                text: "Tu compra ha sido completada con éxito.",
                icon: "success",
                confirmButtonColor: '#FF6828',
                background: '#1D1F23',
                color: '#fff',
            }).then(() => {
                dispatch(clearCart());
                handleNextStep();
            });
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al confirmar el carrito.",
                icon: "error",
                confirmButtonColor: '#FF6828',
                background: '#1D1F23',
                color: '#fff',
            });
        }
    };

    return (
        <div className="text-white min-h-screen w-full max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Confirmar Compra
            </h1>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <div className="bg-neutral rounded-xl border border-base-200 overflow-hidden">
                        <div className="p-4 sm:p-6 border-b border-base-200">
                            <h2 className="text-lg font-semibold text-white">Productos en tu pedido</h2>
                        </div>

                        <div className="p-4 sm:p-6">
                            {cartItems.length > 0 ? (
                                <div className="space-y-4">
                                    {cartItems.map(item => (
                                        <GamecardPurchase key={item.id} game={item} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-center py-8">No hay items en el carrito.</p>
                            )}
                        </div>

                        <div className="p-4 sm:p-6 bg-base-200/50 border-t border-base-200">
                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span className="text-white">${subtotal.toFixed(2)} ARS</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Envío ({shipping === 'envio' ? 'Delivery' : 'Retiro en local'})</span>
                                    <span className="text-white">{shippingCost > 0 ? `$${shippingCost} ARS` : 'Gratis'}</span>
                                </div>
                                {discountPercentage > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-green-400">Descuento ({discountPercentage * 100}%)</span>
                                        <span className="text-green-400">-${(subtotal * discountPercentage).toFixed(2)} ARS</span>
                                    </div>
                                )}
                                <hr className="border-base-200 my-2" />
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-xl font-bold text-white">Total</span>
                                    <span className="text-3xl font-bold text-primary">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-neutral rounded-xl p-4 sm:p-6 border border-base-200">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Método de Pago</p>
                                <p className="text-white font-semibold uppercase">{payment}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl bg-neutral border border-base-200 hover:border-primary/30 transition-colors">
                            <input
                                type="checkbox"
                                id="terms-accepted"
                                name="terms-accepted"
                                className="checkbox checkbox-primary"
                                checked={termsAccepted}
                                onChange={handleTermsChange}
                            />
                            <span className="text-gray-400 text-sm">
                                Acepto las condiciones del <a href="#" className="text-primary hover:underline">Acuerdo de Suscriptor</a> y confirmo que he leído la política de privacidad.
                            </span>
                        </label>
                    </div>
                </div>

                <div className="w-full lg:w-[350px]">
                    <div className="bg-neutral rounded-xl p-6 border border-base-200 shadow-xl lg:sticky lg:top-20">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-white">Finalizar Compra</h2>
                            <p className="text-gray-400 text-sm mt-2">
                                Revisa tu pedido y confirma la compra
                            </p>
                        </div>

                        <div className="bg-base-200/50 rounded-lg p-4 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Total a pagar</span>
                                <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 shadow-lg
                            ${!termsAccepted
                                    ? "bg-gray-600 opacity-50 cursor-not-allowed"
                                    : "bg-gradient-to-r from-[#FF6828] to-[#E57028] hover:from-[#E57028] hover:to-[#FF6828] hover:shadow-primary/30 hover:-translate-y-0.5"}`}
                            disabled={!termsAccepted}
                            onClick={handlePurchase}
                        >
                            Confirmar Compra
                        </button>

                        <p className="text-center text-gray-500 text-xs mt-4">
                            Al confirmar, aceptas nuestros términos y condiciones
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPurchase;
