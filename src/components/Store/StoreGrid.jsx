import { useState, useEffect } from 'react';
import GameCard from '../Gamecard/Gamecard';
import Pagination from '../Pagination/Pagination';
import Gamefilter from './gamefilter';
import Carrousel from './Carrousel';
import StoreBanner from './StoreBanner';
import BestSellersCarousel from './BestSellersCarousel';
import FeaturedGamesRow from './FeaturedGamesRow';
import GiftCardsSection from './GiftCardsSection';

const Storegrid = ({ games }) => {
    const [filteredGames, setFilteredGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const itemsPerPage = 15;

    const totalPages = Math.ceil(filteredGames.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedGames = filteredGames.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
    };

    const filterNonGift = (list) => list.filter(game => !(game?.giftCard || game?.gift_card || (game?.plataforma || '').toLowerCase() === 'coal' || (game?.titulo || '').toLowerCase().includes('tarjeta')));

    useEffect(() => {
        const base = filterNonGift(games);
        const filtered = base.filter(game =>
            (game.titulo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (game.plataforma || '').toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredGames(filtered);
    }, [games, searchTerm]);

    useEffect(() => { setFilteredGames(filterNonGift(games)); }, [games]);

    return (
        <div className="min-h-screen bg-base-300">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Carrousel />
                <BestSellersCarousel />
                <StoreBanner />
                <FeaturedGamesRow />
                <GiftCardsSection />

                <div className="lg:hidden mb-4">
                    <button onClick={() => setIsFilterOpen(true)} className="btn btn-outline btn-primary btn-sm w-full gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filtrar
                    </button>
                </div>

                <div className={`fixed inset-0 z-50 lg:hidden ${isFilterOpen ? 'visible' : 'invisible'}`}>
                    <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isFilterOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsFilterOpen(false)} />
                    <div className={`absolute left-0 top-0 h-full w-80 bg-base-100 transform transition-transform duration-300 overflow-y-auto ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                        <div className="sticky top-0 bg-base-100 p-4 border-b border-base-200 flex justify-between items-center">
                            <h2 className="font-bold text-white">Filtros</h2>
                            <button onClick={() => setIsFilterOpen(false)} className="btn btn-ghost btn-circle btn-sm">✕</button>
                        </div>
                        <div className="p-4">
                            <Gamefilter games={games} setFilter={setFilteredGames} setSearchTerm={setSearchTerm} />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Todos los juegos</h2>
                    <span className="text-sm text-gray-400">{filteredGames.length} juegos</span>
                </div>

                <div className="flex gap-6 relative">
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <div className="sticky top-20">
                            <Gamefilter games={games} setFilter={setFilteredGames} setSearchTerm={setSearchTerm} />
                        </div>
                    </aside>

                    <main className="flex-1 min-h-[600px]">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                            {selectedGames.length > 0 ? (
                                selectedGames.map((game) => (
                                    <GameCard key={game.id} title={game.titulo} imageUrl={game.foto} price={game.precio} platform={game.plataforma} id={game.id} />
                                ))
                            ) : (
                                <div className="col-span-full flex items-center justify-center min-h-[400px]">
                                    <p className="text-center text-gray-500 text-lg">No hay juegos disponibles con los filtros seleccionados.</p>
                                </div>
                            )}
                        </div>

                        {selectedGames.length > 0 && (
                            <div className="mt-8 flex justify-center">
                                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Storegrid;