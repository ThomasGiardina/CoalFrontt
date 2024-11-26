import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Pagination from '../Pagination/Pagination';
import { useSelector } from 'react-redux';
import AdminOrderRow from './AdminOrderRow';
import Swal from 'sweetalert2';
import OrderStats from './OrderStats';

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageContent, setMessageContent] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;


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

    const handleConfirmOrder = (updatedOrder) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === updatedOrder.id ? updatedOrder : order
            )
        );
    };

    const handleOpenModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setMessageContent('');
    };
    
    const handleMessageChange = (e) => {
        setMessageContent(e.target.value);
    };

    const handleSendMessage = async () => {
        Swal.fire({
            icon: 'success',
            title: 'Mensaje enviado',
            text: `Tu mensaje ha sido enviado al cliente del pedido #${selectedOrder.id}.`,
            showConfirmButton: true,
            confirmButtonText: 'OK',
            background: '#1D1F23', 
            customClass: {
                popup: 'custom-toast',
                title: 'text-primary',
                confirmButton: 'btn-primary',
            },
        });
        handleCloseModal();
    };
    
    const handleCancelOrder = (updatedOrder) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === updatedOrder.id ? updatedOrder : order
            )
        );
    };

    const handleDateRangeChange = (update) => {
        if (!Array.isArray(update)) {
            setDateRange([update, update]); 
        } else {
            setDateRange(update); 
        }
        setActiveTab('Todas');
        setCurrentPage(1); 
    }; 
    
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setActiveTab('Todas');
        setCurrentPage(1);
    };    
    
    const filteredOrders = () => {
        let filtered = [...orders];
    
        if (activeTab === 'Completos') {
            filtered = filtered.filter((order) => order.estadoPedido === 'CONFIRMADO');
        } else if (activeTab === 'Pendientes') {
            filtered = filtered.filter((order) => order.estadoPedido === 'PENDIENTE');
        } else if (activeTab === 'Cancelados') {
            filtered = filtered.filter((order) => order.estadoPedido === 'CANCELADO');
        }
    
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
    
        filtered = filtered.filter((order) => {
            const orderDate = new Date(order.fecha);
            if (startDate && endDate) {
                const adjustedEndDate = new Date(endDate);
                adjustedEndDate.setHours(23, 59, 59, 999);
                return orderDate >= startDate && orderDate <= adjustedEndDate;
            } else if (startDate) {
                return (
                    orderDate.getFullYear() === startDate.getFullYear() &&
                    orderDate.getMonth() === startDate.getMonth() &&
                    orderDate.getDate() === startDate.getDate()
                );
            }
            return true;
        });
    
        const startIndex = (currentPage - 1) * ordersPerPage;
        const endIndex = startIndex + ordersPerPage;
    
        return filtered.slice(startIndex, endIndex);
    };          

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(filteredOrders().length / ordersPerPage);

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
        const selectedData = orders.filter((order) => selectedRows.includes(order.id));
    
        const blob = new Blob([JSON.stringify(selectedData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
    
        const link = document.createElement('a');
        link.href = url;
        link.download = 'selected_orders.json';
        link.click();
    
        setIsSelecting(false);
        setSelectedRows([]);
    };       

    return (
        <div className="mt-2">
            <OrderStats orders={orders} />
            <div className="flex justify-between items-center mb-4 mt-10">
                <div className="flex space-x-4">
                    <div role="tablist" className="tabs tabs-lifted text-lg">
                        <a
                            role="tab"
                            className={`tab tab-bordered ${activeTab === 'Todas' ? 'tab-active text-primary' : ''}`}
                            onClick={() => setActiveTab('Todas')}
                        >
                            Todos
                        </a>
                        <a
                            role="tab"
                            className={`tab tab-bordered ${activeTab === 'Completos' ? 'tab-active text-primary' : ''}`}
                            onClick={() => setActiveTab('Completos')}
                        >
                            Confirmados
                        </a>
                        <a
                            role="tab"
                            className={`tab tab-bordered ${activeTab === 'Pendientes' ? 'tab-active text-primary' : ''}`}
                            onClick={() => setActiveTab('Pendientes')}
                        >
                            Pendientes
                        </a>
                        <a
                            role="tab"
                            className={`tab tab-bordered ${activeTab === 'Cancelados' ? 'tab-active text-primary' : ''}`}
                            onClick={() => setActiveTab('Cancelados')}
                        >
                            Cancelados
                        </a>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <DatePicker
                            selected={startDate}
                            onChange={handleDateRangeChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            isClearable
                            customInput={
                                <button className="btn btn-circle btn-outline btn-primary">
                                    <i className="fas fa-calendar-alt text-lg"></i>
                                </button>
                            }
                            calendarClassName="bg-neutral text-white"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar órdenes..."
                        className="px-4 py-2 bg-neutral text-text border border-neutral-300 rounded-lg focus:outline-none focus:border-primary"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button
                        className={`btn w-32 ${
                            selectedRows.length > 0 
                                ? 'btn-success'
                                : isSelecting 
                                ? 'btn-error'
                                : 'btn-primary'
                        }`}
                        onClick={() => {
                            if (selectedRows.length > 0) {
                                handleExport();
                            } else if (isSelecting) {
                                setIsSelecting(false);
                                setSelectedRows([]);
                            } else {
                                setIsSelecting(true);
                            }
                        }}
                    >
                        {selectedRows.length > 0 
                            ? 'Exportar'
                            : isSelecting 
                            ? 'Cancelar'
                            : 'Seleccionar'
                        }
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
                                            selectedRows.length === filteredOrders().length && selectedRows.length > 0
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
                                onSendMessage={handleOpenModal}
                                onCancel={handleCancelOrder}
                                onConfirm={handleConfirmOrder}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            {orders.length > ordersPerPage && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box bg-neutral text-white">
                        <h3 className="font-bold text-lg text-primary">
                            Enviar mensaje al cliente del pedido #{selectedOrder?.id}
                        </h3>
                        <textarea
                            className="textarea textarea-bordered w-full mt-4"
                            placeholder="Escribe tu mensaje aquí..."
                            value={messageContent}
                            onChange={handleMessageChange}
                        ></textarea>
                        <div className="modal-action">
                            <button
                                className="btn btn-primary"
                                onClick={handleSendMessage}
                            >
                                Enviar Mensaje
                            </button>
                            <button
                                className="btn btn-outline btn-error"
                                onClick={handleCloseModal}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderTable;
