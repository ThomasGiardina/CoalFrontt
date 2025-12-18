import { useState, useEffect } from 'react';
import GameCard from '../Gamecard/gamecard';
import Pagination from '../Pagination/Pagination';
import Gamefilter from './gamefilter';
import {useDispatch } from "react-redux";
import { fetchCarrito } from "../../redux/slices/cartSlice";

const ITEMS_PER_PAGE = 15;

const Storegrid = ({ games }) => {
    const [filteredGames, setFilteredGames] = useState(games);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const selectedGames = filteredGames.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    useEffect(() => {
        dispatch(fetchCarrito());
        const filtered = games.filter(game => {
            const matchesSearchTerm = 
                game.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                game.plataforma.toLowerCase().includes(searchTerm.toLowerCase());
    
            return matchesSearchTerm; 
        });
    
        setFilteredGames(filtered); 
    }, [games, searchTerm]);

    useEffect(() => {
        setFilteredGames(games);
    }, [games]);

    return (
        <div className="flex flex-col lg:flex-row px-4 sm:px-6 lg:px-0">
            <div className="w-full lg:w-[400px] mb-6 lg:mb-0 lg:mr-6 lg:ml-4 xl:ml-10">
                <Gamefilter games={games} setFilter={setFilteredGames} setSearchTerm={setSearchTerm} />
            </div>

            <div className="flex-1 lg:mr-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                    {selectedGames.length > 0 ? (
                        selectedGames.map((game) => (
                            <GameCard 
                                key={game.id} 
                                title={game.titulo} 
                                imageUrl={game.foto}  
                                price={game.precio}
                                platform={game.plataforma}
                                id={game.id}
                            />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-white">No hay juegos disponibles.</p>
                    )}
                </div>

                {selectedGames.length > 0 && (
                    <div className="mt-6">
                        <Pagination 
                            currentPage={currentPage} 
                            totalPages={totalPages} 
                            onPageChange={handlePageChange}  
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Storegrid;