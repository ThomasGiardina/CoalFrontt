import React, { useState, useEffect } from 'react';
import GameCardStock from "../Gamecard/GamecardStock";
import Pagination from "../Pagination/Pagination";
import AddGameButton from "./AddGame"

const ITEMS_PER_PAGE = 8;  

const StockContainer = () => {
    const [games, setGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:4002/videojuegos")  
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener los datos");
                }
                return response.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setGames(data);
                } else {
                    throw new Error("Los datos no son un array");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const totalPages = Math.ceil(games.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const selectedGames = games.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="mt-20 min-h-screen w-[1700px]">
            <div className="flex justify-between items-center">
                <p className="font-bold text-4xl">Stock de Juegos</p>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Buscar juegos..."
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <AddGameButton/>
                </div>
            </div>
            {loading ? (
                <p>Cargando juegos...</p>  
            ) : error ? (
                <p>Error: {error}</p>  
            ) : (
                <>
                    {games.length === 0 ? (
                        <p className="text-center text-xl mt-10">No hay juegos cargados, Agrega para ver contenido.</p>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                                {selectedGames.map((game) => (
                                    <GameCardStock 
                                        key={game.id} 
                                        game={game}  
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
    );
};

export default StockContainer;
