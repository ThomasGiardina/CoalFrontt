import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';

const CATEGORIES = [
    { label: 'Accion', value: 'ACCION' },
    { label: 'Aventura', value: 'AVENTURA' },
    { label: 'Rpg', value: 'RPG' },
    { label: 'Simulacion', value: 'SIMULACION' },
    { label: 'Deportes', value: 'DEPORTES' },
    { label: 'Estrategia', value: 'ESTRATEGIA' },
    { label: 'Puzzle', value: 'PUZZLE' },
    { label: 'Terror', value: 'TERROR' },
    { label: 'Vr', value: 'VR' },
    { label: 'Educativo', value: 'EDUCATIVO' }
];

const PLATFORMS = [
    { label: 'XBOX', value: 'XBOX' },
    { label: 'PC', value: 'PC' },
    { label: 'NINTENDO SWITCH', value: 'NINTENDO_SWITCH' },
    { label: 'PLAY STATION', value: 'PLAY_STATION' }
];

const normalize = (str) => (str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/_/g, ' ')
    .toUpperCase()
    .trim();

const isGiftCard = (g) => {
    const title = (g?.titulo || '').toLowerCase();
    const platform = (g?.plataforma || '').toLowerCase();
    return Boolean(g?.giftCard || g?.gift_card || platform === 'coal' || title.includes('tarjeta'));
};

const Gamefilter = ({ games, setFilter, setSearchTerm }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [maxPrice, setMaxPrice] = useState(11000);
    const [priceRange, setPriceRange] = useState(11000);

    useEffect(() => {
        // Calcular precio máximo dinámico en base a los juegos no giftcard
        const nonGift = games.filter((g) => !isGiftCard(g));
        const computedMax = Math.max(0, ...nonGift.map((g) => Number(g.precio) || 0));
        const finalMax = computedMax > 0 ? computedMax : 11000;
        setMaxPrice(finalMax);
        setPriceRange(finalMax);
    }, [games]);

    useEffect(() => {
        let filteredGames = games.filter((g) => !isGiftCard(g));

        if (selectedCategory) {
            const selCat = normalize(selectedCategory);
            filteredGames = filteredGames.filter((game) =>
                normalize(game.categoria) === selCat
            );
        }
        if (selectedPlatform) {
            const selPlat = normalize(selectedPlatform);
            filteredGames = filteredGames.filter((game) =>
                normalize(game.plataforma) === selPlat
            );
        }

        filteredGames = filteredGames.filter((game) => (Number(game.precio) || 0) <= priceRange);
        setFilter(filteredGames);
    }, [selectedCategory, selectedPlatform, priceRange, games, setFilter]);

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(selectedCategory === category ? '' : category);
    };

    const handlePlatformClick = (platform) => {
        setSelectedPlatform(selectedPlatform === platform ? '' : platform);
    };

    const handleResetFilters = () => {
        setSelectedCategory('');
        setSelectedPlatform('');
        setPriceRange(maxPrice);
        setSearchTerm('');
    };

    return (
        <div className="card bg-neutral shadow-lg">
            <div className="card-body p-5 gap-6">
                <SearchBar placeholder="Buscar juegos..." onSearch={handleSearchChange} />

                <div>
                    <h2 className="text-white font-bold mb-3 text-base">Categorías</h2>
                    <div className="grid grid-cols-1 gap-2">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category.value}
                                onClick={() => handleCategoryClick(category.value)}
                                className={`btn btn-sm justify-start gap-2 ${selectedCategory === category.value ? 'btn-primary text-white' : 'btn-ghost'}`}
                            >
                                <span className={`w-2.5 h-2.5 rounded-full ${selectedCategory === category.value ? 'bg-white' : 'bg-primary'}`}></span>
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-white font-bold mb-3 text-base">Plataformas</h2>
                    <div className="grid grid-cols-1 gap-2">
                        {PLATFORMS.map((platform) => (
                            <button
                                key={platform.value}
                                onClick={() => handlePlatformClick(platform.value)}
                                className={`btn btn-sm justify-start gap-2 ${selectedPlatform === platform.value ? 'btn-primary text-white' : 'btn-ghost'}`}
                            >
                                <span className={`w-2.5 h-2.5 rounded-full ${selectedPlatform === platform.value ? 'bg-white' : 'bg-primary'}`}></span>
                                {platform.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-white font-bold mb-3 text-base">Precio máximo</h2>
                    <input
                        type="range"
                        min={0}
                        max={maxPrice}
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="range range-primary range-sm w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-400 mt-2">
                        <span>$0</span>
                        <span className="text-primary font-bold">${priceRange}</span>
                        <span>${maxPrice}</span>
                    </div>
                </div>

                <button onClick={handleResetFilters} className="btn btn-outline btn-primary w-full mt-2">
                    Resetear Filtros
                </button>
            </div>
        </div>
    );
};

export default Gamefilter;