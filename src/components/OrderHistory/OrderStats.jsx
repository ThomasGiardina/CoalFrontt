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
        <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="stat bg-neutral text-text rounded-lg shadow-lg">
                <div className="stat-title text-primary">Total de Pedidos</div>
                <div className="stat-value text-text">{stats.totalOrders}</div>
                <div className="stat-desc text-text">+25.2% en la última semana</div>
            </div>
            <div className="stat bg-neutral text-text rounded-lg shadow-lg">
                <div className="stat-title text-primary">Artículos por Pedido</div>
                <div className="stat-value text-text">{stats.itemsPerOrder}</div>
                <div className="stat-desc text-text">+18.2% en la última semana</div>
            </div>
            <div className="stat bg-neutral text-text rounded-lg shadow-lg">
                <div className="stat-title text-primary">Pedidos Pendientes</div>
                <div className="stat-value text-text">{stats.pendingOrders}</div>
                <div className="stat-desc text-text">-1.2% en la última semana</div>
            </div>
            <div className="stat bg-neutral text-text rounded-lg shadow-lg">
                <div className="stat-title text-primary">Pedidos Completados</div>
                <div className="stat-value text-text">{stats.completedOrders}</div>
                <div className="stat-desc text-text">+12.2% en la última semana</div>
            </div>
        </div>
    );
};

export default OrderStats;
