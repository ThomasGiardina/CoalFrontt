import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../Searchbar/searchbar';

const CATEGORIES = [
    'ACCION', 'AVENTURA', 'RPG', 'SIMULACION', 'DEPORTES',
    'ESTRATEGIA', 'PUZZLE', 'TERROR', 'VR', 'EDUCATIVO',
];

const PLATFORMS = ['XBOX', 'PC', 'NINTENDO_SWITCH', 'PLAY_STATION'];

const Gamefilter = ({ games, setFilter }) => {
    const [maxPrice, setMaxPrice] = useState(20000);
    const [filters, setFilters] = useState({
        ACCION: false, AVENTURA: false, RPG: false, SIMULACION: false,
        DEPORTES: false, ESTRATEGIA: false, PUZZLE: false, TERROR: false,
        VR: false, EDUCATIVO: false, XBOX: false, PC: false,
        NINTENDO_SWITCH: false, PLAY_STATION: false, price: maxPrice,
    });

    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (games.length > 0) {
            const highestPrice = Math.max(...games.map(game => game.precio));
            setMaxPrice(highestPrice);
            setFilters(prevFilters => ({ ...prevFilters, price: highestPrice }));
        }
    }, [games]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const filter = queryParams.get('filter');
        if (filter && PLATFORMS.includes(filter)) {
            setFilters(prevFilters => ({ ...prevFilters, [filter]: true }));
        }
    }, [location.search]);

    useEffect(() => {
        const filtered = games.filter(game => {
            const matchSearchTerm = game.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                game.plataforma.toLowerCase().includes(searchTerm.toLowerCase());
            const matchCategory = CATEGORIES.some(category => filters[category] && game.categorias.includes(category));
            const matchPlatform = PLATFORMS.some(platform => filters[platform] && game.plataforma === platform);
            const matchPrice = game.precio <= filters.price;
            const noCategorySelected = CATEGORIES.every(category => !filters[category]);
            const noPlatformSelected = PLATFORMS.every(platform => !filters[platform]);
            return matchSearchTerm && (noCategorySelected || matchCategory) && (noPlatformSelected || matchPlatform) && matchPrice;
        });
        setFilter(filtered);
    }, [filters, games, searchTerm, setFilter]);

    const handlePriceChange = (e) => {
        setFilters({ ...filters, price: e.target.value });
    };

    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    const resetFilters = () => {
        setFilters({
            ACCION: false, AVENTURA: false, RPG: false, SIMULACION: false,
            DEPORTES: false, ESTRATEGIA: false, PUZZLE: false, TERROR: false,
            VR: false, EDUCATIVO: false, XBOX: false, PC: false,
            NINTENDO_SWITCH: false, PLAY_STATION: false, price: maxPrice,
        });
        setSearchTerm('');
    };

    return (
        <div className="card bg-neutral shadow-lg">
            <div className="card-body p-4 lg:p-5 gap-5">
                <SearchBar placeholder="Buscar juegos..." onSearch={handleSearchChange} />

                <div>
                    <h2 className="text-white font-bold mb-3 text-sm lg:text-base">Categorías</h2>
                    <div className="grid grid-cols-1 gap-2">
                        {CATEGORIES.map((category) => (
                            <label key={category} className="flex items-center gap-3 cursor-pointer hover:bg-base-300 p-1.5 rounded-lg transition-colors">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm checkbox-primary"
                                    checked={filters[category]}
                                    onChange={() => setFilters({ ...filters, [category]: !filters[category] })}
                                />
                                <span className="text-gray-300 text-sm">{category.charAt(0) + category.slice(1).toLowerCase()}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="divider my-0"></div>

                <div>
                    <h2 className="text-white font-bold mb-3 text-sm lg:text-base">Plataformas</h2>
                    <div className="grid grid-cols-1 gap-2">
                        {PLATFORMS.map((platform) => (
                            <label key={platform} className="flex items-center gap-3 cursor-pointer hover:bg-base-300 p-1.5 rounded-lg transition-colors">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm checkbox-primary"
                                    checked={filters[platform]}
                                    onChange={() => setFilters({ ...filters, [platform]: !filters[platform] })}
                                />
                                <span className="text-gray-300 text-sm">{platform.replace('_', ' ')}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="divider my-0"></div>

                <div>
                    <h2 className="text-white font-bold mb-3 text-sm lg:text-base">Precio máximo</h2>
                    <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={filters.price}
                        className="range range-sm range-primary w-full"
                        onChange={handlePriceChange}
                    />
                    <div className="flex justify-between mt-2">
                        <span className="text-gray-400 text-xs">$0</span>
                        <span className="text-primary font-bold text-sm">${filters.price}</span>
                        <span className="text-gray-400 text-xs">${maxPrice}</span>
                    </div>
                </div>

                <button onClick={resetFilters} className="btn btn-outline btn-primary btn-sm w-full mt-2">
                    Resetear Filtros
                </button>
            </div>
        </div>
    );
};

export default Gamefilter;