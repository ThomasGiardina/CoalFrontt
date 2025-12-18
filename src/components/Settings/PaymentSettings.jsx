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
            <div className="min-h-[800px] h-auto w-full max-w-[650px] rounded-xl flex flex-col bg-neutral p-4 sm:p-6">
                <h1 className="flex items-start text-2xl sm:text-3xl text-white mb-3 sm:mb-5">Métodos de Pago</h1>
                <p className="flex items-start text-sm sm:text-base text-white mb-4 sm:mb-5">Aquí puedes agregar y cambiar tus métodos de pago</p>
                
                <div className="flex flex-col justify-start mt-4 overflow-y-auto min-h-[400px] max-h-[555px] pt-5">
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
                        <p className="text-white text-center">No tienes métodos de pago guardados.</p>
                    )}
                </div>
                
                <div className="flex justify-end mt-4 sm:mt-5">
                    <button 
                        className="btn btn-primary w-full sm:w-[200px] text-white rounded-md p-2 text-sm sm:text-base"
                        onClick={() => setModalOpen(true)}
                    >
                        Agregar Método
                    </button>
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
