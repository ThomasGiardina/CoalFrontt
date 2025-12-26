import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGames } from '../../redux/slices/gamesSlice';
import GiftCardStock from "./GiftCardStock";
import Pagination from "../Pagination/Pagination";
import Searchbar from "../Searchbar/searchbar";

const ITEMS_PER_PAGE = 8;

const isGiftCard = (item) => {
    const title = (item?.titulo || '').toLowerCase();
    return item?.giftCard === true ||
        item?.gift_card === true ||
        (item?.plataforma || '').toUpperCase() === 'COAL' ||
        title.includes('tarjeta');
};

const GiftCardsAdminContainer = () => {
    const dispatch = useDispatch();
    const { items: allGames, loading, error } = useSelector((state) => state.games);
    const [filteredGiftCards, setFilteredGiftCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (allGames.length === 0) dispatch(fetchGames());
    }, [dispatch, allGames.length]);

    useEffect(() => {
        const giftCards = allGames.filter(isGiftCard);
        setFilteredGiftCards(giftCards);
    }, [allGames]);

    const handleSearch = (term) => {
        const allGiftCards = allGames.filter(isGiftCard);
        const filtered = allGiftCards.filter((card) =>
            card.titulo.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredGiftCards(filtered);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(filteredGiftCards.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const selectedGiftCards = filteredGiftCards.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="min-h-screen pb-16">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10">
                <div className="sticky top-[64px] h-auto sm:h-36 w-full flex flex-col sm:flex-row justify-between items-center py-4 sm:py-0 z-10 gap-4 sm:gap-0" style={{ backgroundColor: "#0F1012" }}>
                    <p className="font-bold text-2xl sm:text-3xl lg:text-4xl text-primary">Stock de Tarjetas</p>
                    <Searchbar
                        placeholder="Buscar Tarjetas..."
                        onSearch={handleSearch}
                    />
                </div>

                {loading ? (
                    <div className='justify-center flex'>
                        <span className="loading loading-dots loading-lg"></span>
                    </div>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <>
                        {filteredGiftCards.length === 0 ? (
                            <p className="text-center text-xl mt-10">No hay tarjetas disponibles.</p>
                        ) : (
                            <>
                                <div className="w-full space-y-4 mt-6">
                                    {selectedGiftCards.map((card) => (
                                        <GiftCardStock
                                            key={card.id}
                                            giftCard={card}
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

export default GiftCardsAdminContainer;
