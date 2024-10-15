import React, { useState, useEffect } from "react";
import PaymentCard from "./PaymentCard";
import ModalPayment from "./ModalPayment";

const PaymentSettings = () => {
    const [metodosPago, setMetodosPago] = useState([]);  
    const [modalOpen, setModalOpen] = useState(false);   

    const fetchMetodosPago = async () => {
        try {
            const token = localStorage.getItem('token');
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
            const token = localStorage.getItem('token');
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
                console.error('Error al guardar el método de pago');
            }
        } catch (error) {
            console.error('Error al guardar el método de pago:', error);
        }
    };

    const handleDeleteMetodoPago = async (id) => {
        try {
            const token = localStorage.getItem('token');
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
    }, []);

    return (
        <>
            <div className="h-[800px] w-[650px] rounded-xl flex flex-col" style={{ backgroundColor: "#2c3e50" }}>
                <h1 className="flex items-start ml-5 mt-5 text-3xl text-white">Métodos de Pago</h1>
                <p className="flex items-start ml-5 mt-5 text-white">Aquí puedes agregar y cambiar tus métodos de pago</p>
                
                <div className="flex flex-col justify-start mt-4 overflow-y-auto h-[555px] pt-5">
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
                
                <div className="flex justify-end mt-5  mr-5">
                    <button 
                        className="btn w-[200px] bg-black text-white rounded-md p-2"
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
