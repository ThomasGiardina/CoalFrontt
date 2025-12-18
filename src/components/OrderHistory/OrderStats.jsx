import { useEffect, useState } from 'react';

const OrderStats = ({ orders }) => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        itemsPerOrder: 0,
        pendingOrders: 0,
        completedOrders: 0,
    });

    useEffect(() => {
        if (orders && orders.length > 0) {
            const totalOrders = orders.length;
            const totalItems = orders.reduce((acc, order) => acc + order.cantidadArticulos, 0);
            const pendingOrders = orders.filter(order => order.estadoPedido === 'PENDIENTE').length;
            const completedOrders = orders.filter(order => order.estadoPedido === 'CONFIRMADO').length;

            setStats({
                totalOrders,
                itemsPerOrder: totalOrders > 0 ? (totalItems / totalOrders).toFixed(2) : 0,
                pendingOrders,
                completedOrders,
            });
        }
    }, [orders]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="stat bg-neutral text-text rounded-lg shadow-lg">
                <div className="stat-title text-primary text-xs sm:text-sm">Total de Pedidos</div>
                <div className="stat-value text-text text-lg sm:text-2xl lg:text-3xl">{stats.totalOrders}</div>
                <div className="stat-desc text-text text-xs sm:text-sm">+25.2% en la última semana</div>
            </div>
            <div className="stat bg-neutral text-text rounded-lg shadow-lg">
                <div className="stat-title text-primary text-xs sm:text-sm">Artículos por Pedido</div>
                <div className="stat-value text-text text-lg sm:text-2xl lg:text-3xl">{stats.itemsPerOrder}</div>
                <div className="stat-desc text-text text-xs sm:text-sm">+18.2% en la última semana</div>
            </div>
            <div className="stat bg-neutral text-text rounded-lg shadow-lg">
                <div className="stat-title text-primary text-xs sm:text-sm">Pedidos Pendientes</div>
                <div className="stat-value text-text text-lg sm:text-2xl lg:text-3xl">{stats.pendingOrders}</div>
                <div className="stat-desc text-text text-xs sm:text-sm">-1.2% en la última semana</div>
            </div>
            <div className="stat bg-neutral text-text rounded-lg shadow-lg">
                <div className="stat-title text-primary text-xs sm:text-sm">Pedidos Completados</div>
                <div className="stat-value text-text text-lg sm:text-2xl lg:text-3xl">{stats.completedOrders}</div>
                <div className="stat-desc text-text text-xs sm:text-sm">+12.2% en la última semana</div>
            </div>
        </div>
    );
};

export default OrderStats;
