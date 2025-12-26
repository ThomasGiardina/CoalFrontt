import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGames } from '../../redux/slices/gamesSlice';
import GameCard from '../Gamecard/Gamecard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ITEMS_PER_PAGE = 6;

const GameCarrousel = ({ gameId }) => {
    const dispatch = useDispatch();
    const { items: games } = useSelector((state) => state.games);
    const [shuffledGames, setShuffledGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        if (games.length === 0) {
            dispatch(fetchGames());
        }
    }, [dispatch, games.length]);

    useEffect(() => {
        if (games.length > 0) {
            const nonGift = games.filter(g => !(g?.giftCard || g?.gift_card || (g?.plataforma || '').toLowerCase() === 'coal' || (g?.titulo || '').toLowerCase().includes('tarjeta')));
            const shuffled = [...nonGift].sort(() => Math.random() - 0.5);
            setShuffledGames(shuffled);
        }
    }, [games]);

    const filteredGames = gameId
        ? shuffledGames.filter((game) => parseInt(game.id) !== parseInt(gameId))
        : shuffledGames;

    const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = currentPage * ITEMS_PER_PAGE;
    const selectedGames = filteredGames.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const canGoPrev = currentPage > 0;
    const canGoNext = currentPage < totalPages - 1;

    if (filteredGames.length === 0) return null;

    return (
        <div className="mt-10 w-full">
            <div className="relative w-full mx-auto bg-neutral text-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Más Juegos Recomendados</h2>

                <button
                    onClick={handlePrevPage}
                    disabled={!canGoPrev}
                    className={`absolute left-2 top-1/2 z-10 btn btn-circle btn-sm bg-black/70 border-0 hover:bg-primary ${!canGoPrev ? 'opacity-30 cursor-not-allowed' : ''}`}
                >
                    <FaChevronLeft />
                </button>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mx-8">
                    {selectedGames.map((game) => (
                        <GameCard
                            key={game.id}
                            id={game.id}
                            title={game.titulo}
                            imageUrl={game.foto}
                            price={game.precio}
                            platform={game.plataforma}
                        />
                    ))}
                </div>

                <button
                    onClick={handleNextPage}
                    disabled={!canGoNext}
                    className={`absolute right-2 top-1/2 z-10 btn btn-circle btn-sm bg-black/70 border-0 hover:bg-primary ${!canGoNext ? 'opacity-30 cursor-not-allowed' : ''}`}
                >
                    <FaChevronRight />
                </button>

                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i)}
                                className={`w-2 h-2 rounded-full transition-all ${i === currentPage ? 'bg-primary w-6' : 'bg-gray-500'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameCarrousel;
