import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import OrderRow from './AdminOrderRow';
import Pagination from '../Pagination/Pagination';
import { useSelector } from 'react-redux';
import AdminOrderRow from './AdminOrderRow';

const OrderTable = () => {
    const [menuOpen, setMenuOpen] = useState(null);
    const [activeTab, setActiveTab] = useState('Todas');
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                console.log('Pedidos recibidos:', data); 
                setOrders(data);
            } catch (err) {
                setError(err.message || 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };
    
        fetchOrders();
    }, [token]);

    const handleConfirmOrder = (updatedOrder) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === updatedOrder.id ? updatedOrder : order
            )
        );
    };
    
    
    const handleSendMessage = (order) => {
        console.log('Enviar mensaje al cliente:', order.cliente);
    };
    
    const handleDelete = (order) => {
        console.log('Eliminar pedido con ID:', order.id);
    };

    const toggleMenu = (index) => {
        setMenuOpen(menuOpen === index ? null : index);
    };

    const filteredOrders = () => {
        let filtered = orders;

        // Filtrar por tabs
        if (activeTab === 'Completas') {
            filtered = orders.filter((order) => order.estadoPedido === 'Completado');
        } else if (activeTab === 'Pendientes') {
            filtered = orders.filter((order) => order.estadoPedido === 'Pendiente');
        }

        // Filtrar por búsqueda
        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            filtered = filtered.filter((order) => {
                return (
                    order.id.toString().toLowerCase().includes(search) ||
                    order.cliente?.toLowerCase().includes(search) || 
                    order.tipoPago?.toLowerCase().includes(search) ||
                    order.tipoEntrega?.toLowerCase().includes(search) ||
                    order.estadoPedido?.toLowerCase().includes(search)
                );
            });
        }

        // Paginación
        const startIndex = (currentPage - 1) * ordersPerPage;
        const endIndex = startIndex + ordersPerPage;
        return filtered.slice(startIndex, endIndex);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(orders.length / ordersPerPage);

    const handleSelectRow = (id) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(id)) {
                return prevSelectedRows.filter((rowId) => rowId !== id);
            } else {
                return [...prevSelectedRows, id];
            }
        });
    };

    const handleSelectAll = () => {
        const filtered = filteredOrders();
        if (selectedRows.length === filtered.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(filtered.map((order) => order.id));
        }
    };

    const isRowSelected = (id) => selectedRows.includes(id);

    const handleExport = () => {
        console.log('Exportando las filas seleccionadas:', selectedRows);
        setIsSelecting(false);
        setSelectedRows([]);
    };

    if (loading) {
        return <p className="text-center text-primary">Cargando pedidos...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4">
                    <div role="tablist" className="tabs tabs-lifted text-lg">
                        <a
                            role="tab"
                            className={`tab tab-bordered ${activeTab === 'Todas' ? 'tab-active text-primary' : ''}`}
                            onClick={() => setActiveTab('Todas')}
                        >
                            Todas
                        </a>
                        <a
                            role="tab"
                            className={`tab tab-bordered ${activeTab === 'Completas' ? 'tab-active text-primary' : ''}`}
                            onClick={() => setActiveTab('Completas')}
                        >
                            Completas
                        </a>
                        <a
                            role="tab"
                            className={`tab tab-bordered ${activeTab === 'Pendientes' ? 'tab-active text-primary' : ''}`}
                            onClick={() => setActiveTab('Pendientes')}
                        >
                            Pendientes
                        </a>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Buscar órdenes..."
                        className="px-4 py-2 bg-neutral text-text border border-neutral-300 rounded-lg focus:outline-none focus:border-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <button
                        className={`btn ${selectedRows.length > 0 ? 'btn-success' : 'btn-primary'}`}
                        onClick={() => {
                            if (selectedRows.length > 0) {
                                handleExport();
                            } else {
                                setIsSelecting(!isSelecting);
                            }
                        }}
                    >
                        {selectedRows.length > 0 ? 'Exportar' : 'Seleccionar'}
                    </button>
                </div>
            </div>
            <div className="overflow-x-visible relative">
                <table className="table w-full bg-neutral text-text table-auto">
                    <thead>
                        <tr className="text-primary">
                            {isSelecting && (
                                <th className="text-center">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-primary"
                                        onChange={handleSelectAll}
                                        checked={
                                            selectedRows.length === filteredOrders().length &&
                                            selectedRows.length > 0
                                        }
                                    />
                                </th>
                            )}
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
                        {filteredOrders().map((order, index) => (
                            <AdminOrderRow
                                key={index}
                                order={order}
                                isSelecting={isSelecting}
                                isRowSelected={isRowSelected}
                                handleSelectRow={handleSelectRow}
                                menuOpenId={menuOpen}
                                setMenuOpenId={setMenuOpen}
                                onSendMessage={handleSendMessage}
                                onDelete={handleDelete}
                                onConfirm={handleConfirmOrder}
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
