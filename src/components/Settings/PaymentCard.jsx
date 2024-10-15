import React, { useState } from 'react';
import ModalPayment from './ModalPayment';
import Swal from 'sweetalert2';  // Importar SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css';  // Asegúrate de importar los estilos de SweetAlert

const PaymentCard = ({ metodo, onUpdateMetodoPago, onDeleteMetodoPago }) => {
    const { id, nombrePropietario, numeroTarjeta, tipoPago } = metodo;

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Enmascarar el número de tarjeta
    const maskCardNumber = (number) => {
        return number ? number.slice(0, -4).replace(/\d/g, "*") + number.slice(-4) : "**** **** **** ****";
    };

    // Guardar cambios del método de pago
    const handleSaveEdits = async (updatedMetodo) => {
        await onUpdateMetodoPago(updatedMetodo);
        setIsModalOpen(false);
    };

    const handleDelete = async () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await onDeleteMetodoPago(id);  
                Swal.fire(
                    '¡Eliminado!',
                    'El método de pago ha sido eliminado.',
                    'success'
                );
            }
        });
    };

    return (
        <div>
            <div className="h-[120px] w-[600px] rounded-lg p-5 ml-6 mb-6" style={{ backgroundColor: "#2d2d2d", color: "white" }}>
                <div className="flex justify-between">
                    <h1 className="text-lg font-bold">{nombrePropietario}</h1>
                    <span className="text-sm font-bold">{tipoPago}</span>
                </div>
                <div className="flex justify-between items-end h-full">
                    <div className="text-lg font-mono tracking-widest mb-4">
                        {tipoPago !== 'EFECTIVO' ? maskCardNumber(numeroTarjeta) : "Pago en Efectivo"}
                    </div>
                    <div className="flex items-center space-x-4 mb-5">
                        <i
                            className="fa-solid fa-pen text-white cursor-pointer"
                            onClick={() => setIsModalOpen(true)}  // Abrir el modal para editar
                        ></i>
                        <i
                            className="fa-solid fa-trash text-red-500 cursor-pointer"
                            onClick={handleDelete}  // Eliminar el método de pago
                        ></i>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <ModalPayment
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    onSave={handleSaveEdits}
                    initialFormData={metodo}  // Pasar los datos actuales al modal para edición
                />
            )}
        </div>
    );
};

export default PaymentCard;
