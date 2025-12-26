import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PaymentCard from "./PaymentCard";
import ModalPayment from "./ModalPayment";

const PaymentSettings = () => {
    const [metodosPago, setMetodosPago] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const token = useSelector((state) => state.auth.token);

    const fetchMetodosPago = async () => {
        try {
            const response = await fetch('http://localhost:4002/metodosPago/usuario', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setMetodosPago(data);
            } else {
                console.error("Error al obtener los métodos de pago");
            }
        } catch (error) {
            console.error("Error al obtener los métodos de pago:", error);
        }
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
                fetchMetodosPago();
            } else {
                const errorData = await response.json();
                console.error('Error al guardar el método de pago:', errorData);
            }
        } catch (error) {
            console.error('Error al guardar el método de pago:', error);
        }
    };

    const handleDeleteMetodoPago = async (id) => {
        try {
            const response = await fetch(`http://localhost:4002/metodosPago/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setMetodosPago(metodosPago.filter((metodo) => metodo.id !== id));
            } else {
                console.error('Error al eliminar el método de pago');
            }
        } catch (error) {
            console.error('Error al eliminar el método de pago:', error);
        }
    };

    useEffect(() => {
        fetchMetodosPago();
    }, [token]);

    return (
        <>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1b1e] to-[#141517] border border-[#2a2b2e] shadow-xl">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#FF6828]/5 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#E57028]/5 to-transparent rounded-full blur-3xl"></div>

                <div className="relative p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6828] to-[#E57028] flex items-center justify-center shadow-lg shadow-[#FF6828]/20">
                                <i className="fa-solid fa-credit-card text-white text-lg"></i>
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-white">Métodos de Pago</h2>
                                <p className="text-gray-400 text-sm">Administra tus tarjetas</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 min-h-[200px] max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                        {metodosPago.length > 0 ? (
                            metodosPago.map((metodo, index) => (
                                <PaymentCard
                                    key={index}
                                    metodo={metodo}
                                    onUpdateMetodoPago={handleSaveMetodoPago}
                                    onDeleteMetodoPago={handleDeleteMetodoPago}
                                />
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="w-20 h-20 rounded-full bg-[#2a2b2e]/50 flex items-center justify-center mb-4">
                                    <i className="fa-solid fa-credit-card text-gray-500 text-3xl"></i>
                                </div>
                                <h3 className="text-white font-semibold mb-2">Sin métodos de pago</h3>
                                <p className="text-gray-400 text-sm max-w-xs">
                                    Agrega un método de pago para realizar compras de forma más rápida
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 pt-6 border-t border-[#2a2b2e]">
                        <button
                            className="w-full py-3 border-2 border-dashed border-[#FF6828]/50 rounded-xl text-[#FF6828] font-semibold hover:bg-[#FF6828]/10 hover:border-[#FF6828] transition-all duration-300 flex items-center justify-center gap-2"
                            onClick={() => setModalOpen(true)}
                        >
                            <i className="fa-solid fa-plus"></i>
                            Agregar Nuevo Método
                        </button>
                    </div>
                </div>
            </div>

            <ModalPayment
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                onSave={handleSaveMetodoPago}
            />
        </>
    );
};

export default PaymentSettings;
