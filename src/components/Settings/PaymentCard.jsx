import { useState } from 'react';
import ModalPayment from './ModalPayment';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const PaymentCard = ({ metodo, onUpdateMetodoPago, onDeleteMetodoPago }) => {
    const { id, nombrePropietario, numeroTarjeta, tipoPago } = metodo;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const maskCardNumber = (number) => {
        return number ? number.slice(0, -4).replace(/\d/g, "•") + number.slice(-4) : "•••• •••• •••• ••••";
    };

    const formatCardNumber = (number) => {
        const masked = maskCardNumber(number);
        return masked.match(/.{1,4}/g)?.join(' ') || masked;
    };

    const handleSaveEdits = async (updatedMetodo) => {
        await onUpdateMetodoPago(updatedMetodo);
        setIsModalOpen(false);
    };

    const handleDelete = async () => {
        Swal.fire({
            title: '¿Eliminar tarjeta?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            background: '#1D1F23',
            color: '#fff',
            confirmButtonColor: '#FF6828',
            cancelButtonColor: '#3A3D46',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await onDeleteMetodoPago(id);
                Swal.fire({
                    title: '¡Eliminado!',
                    text: 'El método de pago ha sido eliminado.',
                    icon: 'success',
                    background: '#1D1F23',
                    color: '#fff',
                    confirmButtonColor: '#FF6828',
                });
            }
        });
    };

    const getCardIcon = () => {
        if (tipoPago === 'CREDITO') {
            return 'fa-cc-visa';
        } else if (tipoPago === 'DEBITO') {
            return 'fa-cc-mastercard';
        }
        return 'fa-credit-card';
    };

    const getCardGradient = () => {
        if (tipoPago === 'CREDITO') {
            return 'from-[#1a1f35] via-[#2a3045] to-[#1a1f35]';
        } else if (tipoPago === 'DEBITO') {
            return 'from-[#1f2937] via-[#374151] to-[#1f2937]';
        }
        return 'from-[#2d2d2d] to-[#1a1a1a]';
    };

    return (
        <div>
            <div className={`relative overflow-hidden rounded-xl p-5 bg-gradient-to-br ${getCardGradient()} border border-[#3a3d46]/50 hover:border-[#FF6828]/30 transition-all duration-300 group`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <i className={`fa-brands ${getCardIcon()} text-3xl text-white/80`}></i>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tipoPago === 'CREDITO'
                            ? 'bg-blue-500/20 text-blue-400'
                            : tipoPago === 'DEBITO'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-gray-500/20 text-gray-400'
                            }`}>
                            {tipoPago}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#FF6828] flex items-center justify-center transition-all duration-300"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <i className="fa-solid fa-pen text-white text-xs"></i>
                        </button>
                        <button
                            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-red-500 flex items-center justify-center transition-all duration-300"
                            onClick={handleDelete}
                        >
                            <i className="fa-solid fa-trash text-white text-xs"></i>
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-xl sm:text-2xl font-mono tracking-widest text-white/90">
                        {tipoPago !== 'EFECTIVO' ? formatCardNumber(numeroTarjeta) : "Pago en Efectivo"}
                    </p>
                </div>

                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Titular</p>
                        <p className="text-white font-medium text-sm uppercase tracking-wide">{nombrePropietario}</p>
                    </div>
                    <div className="w-12 h-8 bg-gradient-to-br from-yellow-500/30 to-yellow-600/30 rounded-md"></div>
                </div>
            </div>

            {isModalOpen && (
                <ModalPayment
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    onSave={handleSaveEdits}
                    initialFormData={metodo}
                />
            )}
        </div>
    );
};

export default PaymentCard;
