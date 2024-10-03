import React, { useState } from 'react';

const Gamefilter = ({ filter, setFilter }) => {
    const initialState = {
        categories: {
        Indy: false,
        Adventure: false,
        MMO: false,
        'Casual game': false,
        Strategy: false,
        Simulator: false,
        'Sports Game': false,
        'Action Game': false,
        },
        platforms: {
        PC: false,
        'PlayStation 5': false,
        'PlayStation 4': false,
        'Xbox Series': false,
        'Nintendo Switch': false,
        },
        price: 100,
    };

    const [filters, setFilters] = useState(initialState);

    const handlePriceChange = (e) => {
        setFilters({ ...filters, price: e.target.value });
    };

    const resetFilters = () => {
        setFilters(initialState);
    };

    return (
        <div className="bg-secondary bg-opacity-15 shadow-xl shadow-primary p-6 rounded-xl w-5/12 space-y-4">
            <div>
                <h2 className="text-white font-bold mb-2">Categorias</h2>
                <ul className="space-y-2">
                {Object.keys(filters.categories).map((category) => (
                    <li key={category} className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={filters.categories[category]}
                        onChange={() =>
                        setFilters({
                            ...filters,
                            categories: {
                            ...filters.categories,
                            [category]: !filters.categories[category],
                            },
                        })
                        }
                    />
                    <span className="text-gray-300">{category}</span>
                    </li>
                ))}
                </ul>
            </div>
            <div>
                <h2 className="text-white font-bold mb-2">Platformas</h2>
                <ul className="space-y-2">
                {Object.keys(filters.platforms).map((platform) => (
                    <li key={platform} className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={filters.platforms[platform]}
                        onChange={() =>
                        setFilters({
                            ...filters,
                            platforms: {
                            ...filters.platforms,
                            [platform]: !filters.platforms[platform],
                            },
                        })
                        }
                    />
                    <span className="text-gray-300">{platform}</span>
                    </li>
                ))}
                </ul>
            </div>
            <div>
                <h2 className="text-white font-bold mb-2">Rango de Precios</h2>
                <input
                type="range"
                min="0"
                max="200"
                value={filters.price}
                className="range range-primary"
                onChange={handlePriceChange}
                />
                <p className="text-primary mt-2">${filters.price}</p>
            </div>
            <div>
                <button
                onClick={resetFilters}
                className="btn btn-outline btn-primary w-full h-12 text-lg rounded-lg"
                >
                Resetea Filtros
                </button>
            </div>
        </div>
    );
};

export default Gamefilter;
