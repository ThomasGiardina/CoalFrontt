import React from 'react';

const OrderStats = () => {
    return (
        <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="stat bg-neutral text-text rounded-lg shadow-lg">
                <div className="stat-title text-primary">Total de Pedidos</div>
                <div className="stat-value text-text">21</div>
                <div className="stat-desc text-text">+25.2% en la última semana</div>
            </div>
            <div className="stat bg-neutral text-text rounded-lg shadow-lg">
                <div className="stat-title text-primary">Artículos por Pedido</div>
                <div className="stat-value text-text">15</div>
                <div className="stat-desc text-text">+18.2% en la última semana</div>
            </div>
            <div className="stat bg-neutral text-text rounded-lg shadow-lg">
                <div className="stat-title text-primary">Pedidos Pendientes</div>
                <div className="stat-value text-text">0</div>
                <div className="stat-desc text-text">-1.2% en la última semana</div>
            </div>
            <div className="stat bg-neutral text-text rounded-lg shadow-lg">
                <div className="stat-title text-primary">Pedidos Completados</div>
                <div className="stat-value text-text">12</div>
                <div className="stat-desc text-text">+12.2% en la última semana</div>
            </div>
        </div>
    );
};

export default OrderStats;
