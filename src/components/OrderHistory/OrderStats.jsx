import { useEffect, useState } from 'react';
import { FaShoppingBag, FaBoxes, FaClock, FaCheckCircle } from 'react-icons/fa';

const OrderStats = ({ orders }) => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        itemsPerOrder: 0,
        pendingOrders: 0,
        completedOrders: 0,
        pendingPercent: 0,
        completedPercent: 0,
    });

    useEffect(() => {
        if (orders && orders.length > 0) {
            const totalOrders = orders.length;
            const totalItems = orders.reduce((acc, order) => acc + order.cantidadArticulos, 0);
            const pendingOrders = orders.filter(order => order.estadoPedido === 'PENDIENTE').length;
            const completedOrders = orders.filter(order => order.estadoPedido === 'CONFIRMADO').length;

            const pendingPercent = totalOrders > 0 ? ((pendingOrders / totalOrders) * 100).toFixed(1) : 0;
            const completedPercent = totalOrders > 0 ? ((completedOrders / totalOrders) * 100).toFixed(1) : 0;

            setStats({
                totalOrders,
                itemsPerOrder: totalOrders > 0 ? (totalItems / totalOrders).toFixed(2) : 0,
                pendingOrders,
                completedOrders,
                pendingPercent,
                completedPercent,
            });
        }
    }, [orders]);

    const statCards = [
        {
            title: 'Total de Pedidos',
            value: stats.totalOrders,
            icon: <FaShoppingBag className="text-2xl" />,
            color: 'text-primary',
            bgColor: 'bg-primary/10',
            change: `${stats.totalOrders} pedidos`,
            isPercent: false
        },
        {
            title: 'Artículos por Pedido',
            value: stats.itemsPerOrder,
            icon: <FaBoxes className="text-2xl" />,
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
            change: 'Promedio general',
            isPercent: false
        },
        {
            title: 'Pedidos Pendientes',
            value: stats.pendingOrders,
            icon: <FaClock className="text-2xl" />,
            color: 'text-yellow-500',
            bgColor: 'bg-yellow-500/10',
            change: `${stats.pendingPercent}%`,
            isPercent: true,
            isNegative: true
        },
        {
            title: 'Pedidos Completados',
            value: stats.completedOrders,
            icon: <FaCheckCircle className="text-2xl" />,
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
            change: `${stats.completedPercent}%`,
            isPercent: true,
            isNegative: false
        }
    ];

    return (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {statCards.map((card, index) => (
                <div key={index} className="card bg-neutral border border-base-200 p-3 sm:p-5">
                    <div className="sm:hidden">
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`p-2 rounded-lg ${card.bgColor}`}>
                                <span className={`${card.color} text-lg`}>{card.icon}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-400 text-xs truncate">{card.title}</p>
                                <p className="text-white text-xl font-bold">{card.value}</p>
                            </div>
                        </div>
                        {card.isPercent ? (
                            <span className={`text-xs font-medium ${card.isNegative ? 'text-yellow-500' : 'text-green-500'}`}>
                                {card.change} del total
                            </span>
                        ) : (
                            <span className="text-xs text-gray-400">{card.change}</span>
                        )}
                    </div>

                    <div className="hidden sm:block">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`p-3 rounded-lg ${card.bgColor}`}>
                                <span className={card.color}>{card.icon}</span>
                            </div>
                            {card.isPercent ? (
                                <span className={`text-sm font-medium ${card.isNegative ? 'text-yellow-500' : 'text-green-500'}`}>
                                    {card.change} del total
                                </span>
                            ) : (
                                <span className="text-sm text-gray-400">{card.change}</span>
                            )}
                        </div>
                        <p className="text-gray-400 text-sm mb-1">{card.title}</p>
                        <p className="text-white text-2xl font-bold">{card.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderStats;
