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
    const [filteredGames, setFilteredGames] = useState(games);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const itemsPerPage = 12; // 3 rows x 4 columns

    const totalPages = Math.ceil(filteredGames.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedGames = filteredGames.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
    };

    useEffect(() => {
        const filtered = games.filter(game =>
            game.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            game.plataforma.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredGames(filtered);
    }, [games, searchTerm]);

    useEffect(() => { setFilteredGames(games); }, [games]);

    return (
        <div className="min-h-screen bg-base-300">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Carrousel />
                <BestSellersCarousel />
                <StoreBanner />
                <FeaturedGamesRow />
                <GiftCardsSection />

                {/* Mobile filter button */}
                <div className="lg:hidden mb-4">
                    <button onClick={() => setIsFilterOpen(true)} className="btn btn-outline btn-primary btn-sm w-full gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filtrar
                    </button>
                </div>

                {/* Mobile filter drawer */}
                <div className={`fixed inset-0 z-50 lg:hidden ${isFilterOpen ? 'visible' : 'invisible'}`}>
                    <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isFilterOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsFilterOpen(false)} />
                    <div className={`absolute left-0 top-0 h-full w-72 bg-base-100 transform transition-transform duration-300 overflow-y-auto ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                        <div className="sticky top-0 bg-base-100 p-4 border-b border-base-200 flex justify-between items-center">
                            <h2 className="font-bold text-white">Filtros</h2>
                            <button onClick={() => setIsFilterOpen(false)} className="btn btn-ghost btn-circle btn-sm">✕</button>
                        </div>
                        <div className="p-4">
                            <Gamefilter games={games} setFilter={setFilteredGames} setSearchTerm={setSearchTerm} />
                        </div>
                    </div>
                </div>

                {/* Section header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Todos los juegos</h2>
                    <span className="text-sm text-gray-400">{filteredGames.length} juegos</span>
                </div>

                {/* Main layout */}
                <div className="flex gap-6 items-start">
                    {/* Filter sidebar */}
                    <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-20">
                        <Gamefilter games={games} setFilter={setFilteredGames} setSearchTerm={setSearchTerm} />
                    </aside>

                    {/* Games grid */}
                    <main className="flex-1">
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                            {selectedGames.length > 0 ? (
                                selectedGames.map((game) => (
                                    <GameCard key={game.id} title={game.titulo} imageUrl={game.foto} price={game.precio} platform={game.plataforma} id={game.id} />
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-500 py-10">No hay juegos disponibles.</p>
                            )}
                        </div>

                        {/* Pagination */}
                        {selectedGames.length > 0 && totalPages > 1 && (
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