import React, { useState } from "react";
import Swal from "sweetalert2";
import GamecardPurchase from "../Gamecard/GamecardPurchase";  

const ConfirmPurchase = ({ paymentMethod }) => {
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleTermsChange = (e) => {
        setTermsAccepted(e.target.checked);
    };

    const handlePurchase = () => {
        if (termsAccepted) {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás deshacer esta acción.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'primary',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, comprar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Compra realizada!',
                        'Tu compra ha sido completada con éxito.',
                        'success'
                    );
                }
            });
        } else {
            Swal.fire(
                'Error',
                'Debes aceptar los términos para continuar.',
                'error'
            );
        }
    };

    return (
        <div className="flex flex-col  text-white min-h-screen w-[1400px] p-8 rounded-lg  max-w-7xl mx-auto">
            <div className="w-full h-auto flex space-x-8">
                <div className="w-2/3 bg-neutral p-6 rounded-lg ">
                    <GamecardPurchase />
                    <div className="mt-6">
                        <div className="flex justify-between mb-3">
                            <span className="text-gray-400">Subtotal:</span>
                            <span className="text-white">$4.99 USD</span>
                        </div>
                        <div className="flex justify-between mb-3">
                            <span className="text-gray-400">Envío:</span>
                            <span className="text-white">$1.99 USD</span>
                        </div>
                        <div className="flex justify-between mb-3">
                            <span className="text-gray-400">Descuento:</span>
                            <span className="text-white">-$1.99 USD</span>
                        </div>
                        <hr className="border-gray-700 my-4" />
                        <div className="flex justify-between font-semibold">
                            <span className="text-gray-300">Total:</span>
                            <span className="text-white">$4.99 USD</span>
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Método de pago:</span>
                            <span className="text-green-400">{paymentMethod} </span>
                        </div>
                    </div>
                    <div className="mt-6">
                        <label className="inline-flex items-center">
                            <input 
                                type="checkbox" 
                                className="form-checkbox bg-gray-700 text-green-500" 
                                checked={termsAccepted} 
                                onChange={handleTermsChange} 
                            />
                            <span className="ml-2 text-gray-400">
                                Acepto las condiciones del <a href="#" className="text-blue-400">Acuerdo de Suscriptor</a>
                            </span>
                        </label>
                    </div>
                </div>
                <div className="w-1/3 h-[200px] bg-neutral p-4 rounded-lg shadow-md flex flex-col justify-between items-center ">
                    <h2 className="text-lg font-semibold text-white mb-2 text-center">CONFIRMAR COMPRA</h2>
                    <p className="text-gray-400 text-center mb-4">
                        Una vez confirmada la compra, no podrás volver atrás.
                    </p>
                    <button 
                        className={` bg-primary text-white py-2 px-6 rounded-md transition duration-200 w-full ${!termsAccepted ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={!termsAccepted}
                        onClick={handlePurchase}
                    >
                        Comprar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPurchase;
