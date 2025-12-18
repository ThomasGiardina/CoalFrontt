import { useEffect, useState } from 'react';
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
        <div className="p-4 sm:p-6 rounded-lg shadow-md bg-neutral">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white">Últimos Pedidos Confirmados</h2>
                <Link to="/AdminOrderHistory">
                    <button className="btn bg-primary text-white px-4 py-2 rounded-lg text-sm sm:text-base">
                        Ver Pedidos
                    </button>
                </Link>
            </div>

            <div className="block lg:hidden space-y-4">
                {sales.map((sale, index) => (
                    <div key={sale.id} className="bg-accent rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                            <span className="text-white font-bold text-lg">#{index + 1}</span>
                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                {sale.estadoPedido}
                            </span>
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray-400 text-xs font-semibold uppercase">Productos</p>
                            {sale.items.slice(0, 3).map(item => (
                                <p key={item.titulo} className="text-gray-300 text-sm">
                                    {item.titulo} x{item.cantidad}
                                </p>
                            ))}
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                            <div>
                                <p className="text-gray-400 text-xs">Fecha</p>
                                <p className="text-gray-300 text-sm">
                                    {new Date(sale.fecha).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-400 text-xs">Total</p>
                                <p className="text-white font-bold text-lg">
                                    ${sale.montoTotal.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full text-left text-lg text-gray-600">
                    <thead className="border-b text-white">
                        <tr>
                            <th className="py-3 px-4">#</th>
                            <th className="py-3 px-4">Productos</th>
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
                                    <div className="flex flex-col justify-center items-start min-h-[80px]">
                                        {sale.items.slice(0, 3).map(item => (
                                            <p key={item.titulo}>{item.titulo} x{item.cantidad}</p>
                                        ))}
                                        {sale.items.length < 3 &&
                                            Array.from({ length: 3 - sale.items.length }).map((_, i) => (
                                                <p key={`empty-${i}`}>&nbsp;</p>
                                            ))}
                                    </div>
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
        </div>
    );
};

export default LatestSales;
