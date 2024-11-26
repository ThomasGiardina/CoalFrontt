import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const LatestSales = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const fetchLatestSales = async () => {
            try {
                const response = await fetch('http://localhost:4002/api/estadisticas/ultimas-ventas', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch latest sales');
                }

                const data = await response.json();
                setSales(data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching latest sales');
                setLoading(false);
            }
        };

        fetchLatestSales();
    }, [token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="p-6 rounded-lg shadow-md bg-neutral">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-5">Últimos Pedidos Confirmados</h2>
                <Link to="/AdminOrderHistory">
                    <button className="btn bg-primary"><p className='text-white'>Ver Pedidos</p></button>
                </Link>
            </div>
            <table className="min-w-full text-left text-lg text-gray-600">
                <thead className="border-b text-white">
                    <tr>
                        <th className="py-3 px-4">#</th>
                        <th className="py-3 px-4">Producto</th>
                        <th className="py-3 px-4">Fecha</th>
                        <th className="py-3 px-4">Estado</th>
                        <th className="py-3 px-4">Precio Total</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale, index) => (
                        <tr key={sale.id} className="border-b text-lg">
                            <td className="py-4 px-4 text-gray-300">{index + 1}</td>
                            <td className="py-4 px-4 text-gray-300">
                                {sale.items.slice(0, 3).map(item => (
                                    <p key={item.titulo}>{item.titulo} x{item.cantidad}</p>
                                ))}
                            </td>
                            <td className="py-4 px-4 text-gray-300">
                                {new Date(sale.fecha).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-4 text-green-500">{sale.estadoPedido}</td> 
                            <td className="py-4 px-4 text-gray-300">${sale.montoTotal.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    
};

export default LatestSales;
