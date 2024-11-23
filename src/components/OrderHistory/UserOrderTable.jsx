import React, { useState, useEffect } from 'react';
import OrderRow from './OrderRow';
import Pagination from '../Pagination/Pagination';
import DatePicker from 'react-datepicker';
import { useSelector } from "react-redux";
import 'react-datepicker/dist/react-datepicker.css';

const UserOrderTable = () => {
    const [orders, setOrders] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [searchTerm, setSearchTerm] = useState('');
    const token = useSelector((state) => state.auth.token);
    console.log(token);
    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const ordersPerPage = 12;

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('http://localhost:4002/api/pedidos/usuario', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los pedidos');
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
    }, []); 

    const filteredOrders = orders
        .filter(order => order.id.toString().toLowerCase().includes(searchTerm.toLowerCase())) 
        .filter(order => {
            if (!startDate || !endDate) return true; 
            const orderDate = new Date(order.fecha); 
            return orderDate >= startDate && orderDate <= endDate;
        })
        .slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

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
        <div>
            <div className="flex justify-between items-center mb-2">
                <p className="text-2xl font-bold text-neutral-300 ml-5 mt-10">
                    {orders.length} Productos
                </p>
                <div className="flex space-x-4 items-center">
                    <DatePicker
                        selected={startDate}
                        onChange={(dates) => {
                            const [start, end] = dates;
                            setStartDate(start);
                            setEndDate(end);
                        }}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        customInput={
                            <button className="btn btn-circle btn-outline btn-primary">
                                <i className="fas fa-calendar-alt text-lg"></i>
                            </button>
                        }
                        calendarClassName="bg-neutral text-white"
                    />
                    <input
                        type="text"
                        placeholder="Buscar pedidos..."
                        className="px-4 py-2 bg-neutral text-text border border-neutral-300 rounded-lg focus:outline-none focus:border-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full bg-neutral text-text table-auto">
                    <thead>
                        <tr className="text-primary">
                            <th className="text-center">Pedido</th>
                            <th className="text-center">Fecha</th>
                            <th className="text-center">Pago</th>
                            <th className="text-center">Total</th>
                            <th className="text-center">Artículos</th>
                            <th className="text-center">Entrega</th>
                            <th className="text-center">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order, index) => (
                            <OrderRow
                                key={index}
                                order={order}
                                isSelecting={false}
                            />
                        ))}
                        {Array.from({ length: ordersPerPage - filteredOrders.length }).map((_, index) => (
                            <tr key={`empty-${index}`} style={{ visibility: 'hidden' }}>
                                <td colSpan="7" className="h-12"></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default UserOrderTable;
