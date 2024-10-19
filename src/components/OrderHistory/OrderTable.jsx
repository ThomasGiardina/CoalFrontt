import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import OrderRow from './OrderRow';
import Pagination from '../Pagination/Pagination'; 

const OrderTable = () => {
    const [menuOpen, setMenuOpen] = useState(null); 
    const [activeTab, setActiveTab] = useState('Todas');
    const [startDate, setStartDate] = useState(null); 
    const [endDate, setEndDate] = useState(null); 
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 

    const ordersPerPage = 12; 

    const orders = [
        { id: '#1002', date: '11 Feb, 2024', customer: 'Wade Warren', payment: 'Débito', total: '$20.00', items: 2, delivery: 'Delivery', status: 'Pendiente' },
        { id: '#1004', date: '13 Feb, 2024', customer: 'Esther Howard', payment: 'Crédito', total: '$22.00', items: 3, delivery: 'Retiro local', status: 'Completado' },
        { id: '#1007', date: '15 Feb, 2024', customer: 'Jenny Wilson', payment: 'Efectivo', total: '$25.00', items: 1, delivery: 'Delivery', status: 'Pendiente' },
        { id: '#1009', date: '17 Feb, 2024', customer: 'Guy Hawkins', payment: 'Crédito', total: '$27.00', items: 5, delivery: 'Retiro local', status: 'Completado' },
    ];

    const toggleMenu = (index) => {
        setMenuOpen(menuOpen === index ? null : index); 
    };

    const filteredOrders = () => {
        let filtered = orders;
        if (activeTab === 'Completas') {
            filtered = orders.filter((order) => order.status === 'Completado');
        } else if (activeTab === 'Pendientes') {
            filtered = orders.filter((order) => order.status === 'Pendiente');
        }

        const startIndex = (currentPage - 1) * ordersPerPage;
        const endIndex = startIndex + ordersPerPage;

        return filtered.slice(startIndex, endIndex); 
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= Math.ceil(orders.length / ordersPerPage)) {
            setCurrentPage(page);
        }
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
        if (selectedRows.length === orders.length) {
            setSelectedRows([]); 
        } else {
            setSelectedRows(orders.map((order) => order.id)); 
        }
    };

    const isRowSelected = (id) => selectedRows.includes(id);

    const handleExport = () => {
        console.log('Exportando las filas seleccionadas:', selectedRows);

        setIsSelecting(false);
        setSelectedRows([]); 
    };

    return (
        <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4">
                    <div role="tablist" className="tabs tabs-lifted text-lg">
                        <a
                            role="tab"
                            className={`tab tab-bordered ${activeTab === 'Todas' ? 'tab-active text-primary px-6 py-3 [--tab-bg:transparent] [--tab-border-color:var(--primary)]' : ''}`}
                            onClick={() => setActiveTab('Todas')}
                        >
                            Todas
                        </a>
                        <a
                            role="tab"
                            className={`tab tab-bordered ${activeTab === 'Completas' ? 'tab-active text-primary px-6 py-3 [--tab-bg:transparent] [--tab-border-color:var(--primary)]' : ''}`}
                            onClick={() => setActiveTab('Completas')}
                        >
                            Completas
                        </a>
                        <a
                            role="tab"
                            className={`tab tab-bordered ${activeTab === 'Pendientes' ? 'tab-active text-primary px-6 py-3 [--tab-bg:transparent] [--tab-border-color:var(--primary)]' : ''}`}
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
            <div className="overflow-x-auto">
                <table className="table w-full bg-neutral text-text table-auto">
                    <thead>
                        <tr className="text-primary">
                            {isSelecting && (
                                <th className="text-center">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-primary"
                                        onChange={handleSelectAll}
                                        checked={selectedRows.length === orders.length}
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
                            <OrderRow
                                key={index}
                                order={order}
                                isSelecting={isSelecting}
                                isRowSelected={isRowSelected}
                                handleSelectRow={handleSelectRow}
                                toggleMenu={() => toggleMenu(index)} 
                                menuOpen={menuOpen === index} 
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            {orders.length > ordersPerPage && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
        </div>
    );
};

export default OrderTable;
