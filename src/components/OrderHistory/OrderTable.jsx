import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import OrderRow from './OrderRow';
import Pagination from '../Pagination/Pagination';
import { useSelector } from 'react-redux';

const OrderTable = () => {
    const [orders, setOrders] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const [currentPage, setCurrentPage] = useState(1); 
    const token = useSelector((state) => state.auth.token); 

    const ordersPerPage = 12;

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('http://localhost:4002/api/pedidos', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los pedidos del backend');
                }

                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError(err.message || 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    const filteredOrders = orders.slice(
        (currentPage - 1) * ordersPerPage,
        currentPage * ordersPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(orders.length / ordersPerPage);

    if (loading) {
        return <p className="text-center text-primary">Cargando pedidos...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
                <p className="text-2xl font-bold text-neutral-300 ml-5">Pedidos Administrativos</p>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full bg-neutral text-text table-auto">
                    <thead>
                        <tr className="text-primary">
                            <th className="text-center">Pedido</th>
                            <th className="text-center">Fecha</th>
                            <th className="text-center">Cliente</th>
                            <th className="text-center">Pago</th>
                            <th className="text-center">Total</th>
                            <th className="text-center">Artículos</th>
                            <th className="text-center">Entrega</th>
                            <th className="text-center">Estado</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order, index) => (
                            <OrderRow
                                key={index}
                                order={order}
                                isSelecting={false}
                                toggleMenu={null}
                                menuOpen={false}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            {orders.length > ordersPerPage && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
        </div>
    );
};

export default OrderTable;
