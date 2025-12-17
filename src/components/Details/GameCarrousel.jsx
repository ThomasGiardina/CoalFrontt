import { useState, useEffect } from 'react';
import GameCard from '../Gamecard/gamecard';

const ITEMS_PER_PAGE = 6; 

const GameCarrousel = ({ gameId }) => {
    const [shuffledGames, setShuffledGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetch("http://localhost:4002/videojuegos")
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    const shuffled = [...data].sort(() => Math.random() - 0.5);
                    setShuffledGames(shuffled);
                }
            })
            .catch((error) => {
                console.error("Error al cargar los juegos:", error);
            });
    }, []);

    const totalPages = Math.ceil(shuffledGames.length / ITEMS_PER_PAGE);

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
    
    const filteredGames = gameId
        ? shuffledGames.filter((game) => parseInt(game.id) !== parseInt(gameId)) 
        : shuffledGames;

    const selectedGames = filteredGames.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="mt-10 w-full">
            <div className="relative w-full mx-auto overflow-hidden bg-neutral text-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Más Juegos Recomendados</h2>

                <div className="flex items-center justify-between">
                    <button
                        onClick={handlePrevPage}
                        className="absolute left-4 z-10 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75"
                        disabled={currentPage === 0}
                    >
                        ❮
                    </button>
                    <div className="grid grid-cols-6 gap-6 overflow-hidden w-full px-12">
                        {selectedGames.length > 0 ? (
                            selectedGames.map((game) => (
                                <div key={game.id} className="w-[210px]">
                                    <GameCard
                                        id={game.id}
                                        title={game.titulo}
                                        imageUrl={game.foto}
                                        price={game.precio}
                                        platform={game.plataforma}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 col-span-6">No hay juegos disponibles.</p>
                        )}
                    </div>
                    <button
                        onClick={handleNextPage}
                        className="absolute right-4 z-10 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75"
                        disabled={currentPage === totalPages - 1}
                    >
                        ❯
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameCarrousel;
