import { useState, useEffect } from 'react';
import SearchBar from '../Searchbar/searchbar';

const CATEGORIES = [
    { label: 'Acción', value: 'ACCION' },
    { label: 'Aventura', value: 'AVENTURA' },
    { label: 'RPG', value: 'RPG' },
    { label: 'Simulación', value: 'SIMULACION' },
    { label: 'Deportes', value: 'DEPORTES' },
    { label: 'Estrategia', value: 'ESTRATEGIA' },
    { label: 'Puzzle', value: 'PUZZLE' },
    { label: 'Terror', value: 'TERROR' },
    { label: 'VR', value: 'VR' },
    { label: 'Educativo', value: 'EDUCATIVO' }
];

const PLATFORMS = [
    { label: 'XBOX', value: 'XBOX' },
    { label: 'PC', value: 'PC' },
    { label: 'Nintendo Switch', value: 'NINTENDO_SWITCH' },
    { label: 'PlayStation', value: 'PLAY_STATION' }
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
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [maxPrice, setMaxPrice] = useState(11000);
    const [priceRange, setPriceRange] = useState(11000);

    useEffect(() => {
        const nonGift = games.filter((g) => !isGiftCard(g));
        const computedMax = Math.max(0, ...nonGift.map((g) => Number(g.precio) || 0));
        const finalMax = computedMax > 0 ? computedMax : 11000;
        setMaxPrice(finalMax);
        setPriceRange(finalMax);
    }, [games]);

    useEffect(() => {
        let filteredGames = games.filter((g) => !isGiftCard(g));

        if (selectedCategories.length > 0) {
            filteredGames = filteredGames.filter((game) => {
                const cats = game.categorias || [];
                return selectedCategories.some(selCat =>
                    cats.some(cat => normalize(cat) === normalize(selCat))
                );
            });
        }

        if (selectedPlatforms.length > 0) {
            filteredGames = filteredGames.filter((game) => {
                const plat = normalize(game.plataforma);
                return selectedPlatforms.some(selPlat => plat === normalize(selPlat));
            });
        }

        filteredGames = filteredGames.filter((game) => (Number(game.precio) || 0) <= priceRange);
        setFilter(filteredGames);
    }, [selectedCategories, selectedPlatforms, priceRange, games, setFilter]);

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handlePlatformClick = (platform) => {
        setSelectedPlatforms(prev =>
            prev.includes(platform)
                ? prev.filter(p => p !== platform)
                : [...prev, platform]
        );
    };

    const handleResetFilters = () => {
        setSelectedCategories([]);
        setSelectedPlatforms([]);
        setPriceRange(maxPrice);
        setSearchTerm('');
    };

    return (
        <div className="bg-neutral rounded-lg shadow-lg">
            <div className="p-5 space-y-5">
                <SearchBar placeholder="Buscar juegos..." onSearch={handleSearchChange} />

                <div>
                    <h2 className="text-white font-bold mb-3 text-sm">Categorías</h2>
                    <div className="space-y-1.5">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category.value}
                                onClick={() => handleCategoryClick(category.value)}
                                className={`btn btn-sm w-full justify-start gap-2 ${selectedCategories.includes(category.value) ? 'btn-primary text-white' : 'btn-ghost'}`}
                            >
                                <span className={`w-2.5 h-2.5 rounded-full ${selectedCategories.includes(category.value) ? 'bg-white' : 'bg-primary'}`}></span>
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-white font-bold mb-3 text-sm">Plataformas</h2>
                    <div className="space-y-1.5">
                        {PLATFORMS.map((platform) => (
                            <button
                                key={platform.value}
                                onClick={() => handlePlatformClick(platform.value)}
                                className={`btn btn-sm w-full justify-start gap-2 ${selectedPlatforms.includes(platform.value) ? 'btn-primary text-white' : 'btn-ghost'}`}
                            >
                                <span className={`w-2.5 h-2.5 rounded-full ${selectedPlatforms.includes(platform.value) ? 'bg-white' : 'bg-primary'}`}></span>
                                {platform.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-white font-bold mb-3 text-sm">Precio máximo</h2>
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

                <button onClick={handleResetFilters} className="btn btn-outline btn-primary w-full">
                    Resetear Filtros
                </button>
            </div>
        </div>
    );
};

export default Gamefilter;