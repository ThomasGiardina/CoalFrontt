import { useState, useEffect } from 'react';
import UserOrderRow from './UserOrderRow';
import Pagination from '../Pagination/Pagination';
import DatePicker from 'react-datepicker';
import { useSelector } from "react-redux";
import 'react-datepicker/dist/react-datepicker.css';

const UserOrderTable = () => {
    const [orders, setOrders] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [searchTerm, setSearchTerm] = useState('');
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const token = useSelector((state) => state.auth.token);
    const userId = useSelector((state) => state.auth.userId); 
    const [currentPage, setCurrentPage] = useState(1);
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange; 

    const ordersPerPage = 12;

    useEffect(() => {
        if (isAuthenticated && userId && token) { 
            fetchOrders();
        }
    }, [isAuthenticated, userId, token]);
    

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:4002/api/pedidos/usuario/${userId}`, {
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

    const filteredOrders = orders
    .filter(order => {
        const search = searchTerm.toLowerCase();
        const matchesId = order.id.toString().toLowerCase().includes(search);
        const matchesPayment = order.tipoPago?.toLowerCase().includes(search);
        const matchesDelivery = order.tipoEntrega?.toLowerCase().includes(search);
        const matchesStatus = order.estadoPedido?.toLowerCase().includes(search);

        return matchesId || matchesPayment || matchesDelivery || matchesStatus;
    })
    .filter(order => {
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
    })
    .slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);



    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(orders.length / ordersPerPage);

    return (
        <div className="px-4 sm:px-6 lg:px-0">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 sm:mb-2 gap-4">
                <p className="text-xl sm:text-2xl font-bold text-neutral-300 mt-6 sm:mt-10">
                    {orders.length} Productos
                </p>
                <div className="flex flex-wrap space-x-2 sm:space-x-4 items-center w-full lg:w-auto">
                <div className="relative">
                    <DatePicker
                        selected={startDate}
                        onChange={(update) => {
                            if (!Array.isArray(update)) {
                                setDateRange([update, update]);
                            } else {
                                setDateRange(update);
                            }
                        }}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        isClearable
                        customInput={
                            <button className="btn btn-circle btn-outline btn-primary btn-sm sm:btn-md">
                                <i className="fas fa-calendar-alt text-sm sm:text-lg"></i>
                            </button>
                        }
                        calendarClassName="bg-neutral text-white"
                    />
                </div>
                    <input
                        type="text"
                        placeholder="Buscar pedidos..."
                        className="px-3 sm:px-4 py-2 bg-neutral text-text border border-neutral-300 rounded-lg focus:outline-none focus:border-primary text-sm sm:text-base flex-1 lg:flex-none min-w-[200px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full bg-neutral text-text table-auto min-w-[600px]">
                    <thead>
                        <tr className="text-primary">
                            <th className="text-center text-xs sm:text-sm">Pedido</th>
                            <th className="text-center text-xs sm:text-sm">Fecha</th>
                            <th className="text-center text-xs sm:text-sm">Pago</th>
                            <th className="text-center text-xs sm:text-sm">Total</th>
                            <th className="text-center text-xs sm:text-sm">Artículos</th>
                            <th className="text-center text-xs sm:text-sm">Entrega</th>
                            <th className="text-center text-xs sm:text-sm">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order, index) => (
                            <UserOrderRow
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
