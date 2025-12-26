import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGames, addGame as addGameToStore, updateGame as updateGameInStore, removeGame as removeGameFromStore } from '../../redux/slices/gamesSlice';
import GameCardStock from "../Gamecard/GamecardStock";
import Pagination from "../Pagination/Pagination";
import AddGameButton from "./AddGame";
import Searchbar from "../Searchbar/searchbar";

const ITEMS_PER_PAGE = 8;

const isGiftCard = (item) => {
    const title = (item?.titulo || '').toLowerCase();
    return item?.giftCard === true ||
        item?.gift_card === true ||
        (item?.plataforma || '').toUpperCase() === 'COAL' ||
        title.includes('tarjeta');
};

const StockContainer = () => {
    const dispatch = useDispatch();
    const { items: allGames, loading, error } = useSelector((state) => state.games);
    const [filteredGames, setFilteredGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (allGames.length === 0) dispatch(fetchGames());
    }, [dispatch, allGames.length]);

    useEffect(() => {
        const gamesOnly = allGames.filter(game => !isGiftCard(game));
        setFilteredGames(gamesOnly);
    }, [allGames]);

    const addGame = (newGame) => {
        dispatch(addGameToStore(newGame));
    };

    const updateGameInList = (updatedGame) => {
        dispatch(updateGameInStore(updatedGame));
    };

    const removeGameFromList = (gameId) => {
        dispatch(removeGameFromStore(gameId));
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        const gamesOnly = allGames.filter(game => !isGiftCard(game));
        const filtered = gamesOnly.filter((game) =>
            game.titulo.toLowerCase().includes(term.toLowerCase()) ||
            game.plataforma.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredGames(filtered);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const selectedGames = filteredGames.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="min-h-screen pb-16">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10">
                <div className="sticky top-[64px] h-auto sm:h-36 w-full flex flex-col sm:flex-row justify-between items-center py-4 sm:py-0 z-10 gap-4 sm:gap-0" style={{ backgroundColor: "#0F1012" }}>
                    <p className="font-bold text-2xl sm:text-3xl lg:text-4xl text-primary">Stock de Juegos</p>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                        <Searchbar
                            placeholder="Buscar Juegos..."
                            onSearch={handleSearch}
                        />
                        <AddGameButton addGame={addGame} />
                    </div>
                </div>

                {loading ? (
                    <div className='justify-center flex'>
                        <span className="loading loading-dots loading-lg"></span>
                    </div>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <>
                        {filteredGames.length === 0 ? (
                            <p className="text-center text-xl mt-10">No hay juegos cargados, Agrega para ver contenido.</p>
                        ) : (
                            <>
                                <div className="w-full space-y-4 mt-6">
                                    {selectedGames.map((game) => (
                                        <GameCardStock
                                            key={game.id}
                                            game={game}
                                            updateGame={updateGameInList}
                                            removeGame={removeGameFromList}
                                        />
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default StockContainer;
