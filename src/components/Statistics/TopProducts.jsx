import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { BsNintendoSwitch, BsPcDisplay } from "react-icons/bs"; 

const getPlatformIcon = (platform) => {
    switch (platform?.toUpperCase()) {
        case 'XBOX':
            return <i className="fab fa-xbox text-green-500 text-xl"></i>;
        case 'PLAYSTATION':
            return <i className="fab fa-playstation text-blue-500 text-xl"></i>;
        case 'NINTENDO_SWITCH':
            return <BsNintendoSwitch className="text-red-700 text-xl" />;
        case 'PC':
            return <BsPcDisplay className="text-gray-500 text-xl" />;
        default:
            return <span>Plataforma desconocida</span>;
    }
};

const TopProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const fetchTopProducts = async () => {
            try {
                const response = await fetch('http://localhost:4002/api/estadisticas/productos-mas-vendidos', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch top products');
                }

                const data = await response.json();
                setProducts(data.slice(0, 5));
                setLoading(false);
            } catch (err) {
                setError('Error fetching top products');
                setLoading(false);
            }
        };

        fetchTopProducts();
    }, [token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="rounded-lg shadow-lg p-6 max-w-md bg-neutral">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Top Products</h2>
            </div>
            <ul>
                {Array.isArray(products) && products.map((product, index) => (
                    <li
                        key={index}
                        className="flex items-center justify-between p-4 bg-accent rounded-lg mb-3"
                    >
                        <div className="flex items-center">
                            <img
                                src={product.fotoUrl || 'https://via.placeholder.com/50x50.png?text=No+Image'}
                                alt={product.titulo}
                                className="w-12 h-12 rounded-md mr-4"
                            />
                            <div>
                                <p className="font-semibold">{product.titulo}</p>
                                <p className="text-sm text-white">{product.ventas} Ventas</p>
                            </div>
                        </div>
                        <div className="text-right">
                            {getPlatformIcon(product.plataforma)} 
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopProducts;
