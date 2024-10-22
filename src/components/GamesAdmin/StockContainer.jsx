import React, { useState, useEffect } from 'react';
import GameCardStock from "../Gamecard/GamecardStock";
import Pagination from "../Pagination/Pagination";
import AddGameButton from "./AddGame";
import Searchbar from "../Searchbar/searchbar"

const ITEMS_PER_PAGE = 8;

const StockContainer = () => {
    const [allGames, setAllGames] = useState([]); 
    const [filteredGames, setFilteredGames] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = () => {
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
                    setAllGames(data); 
                    setFilteredGames(data); 
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
    };

    const addGame = (newGame) => {
        setAllGames((prevGames) => [newGame, ...prevGames]);
        setFilteredGames((prevGames) => [newGame, ...prevGames]); 
    };

    const updateGameInList = (updatedGame) => {
        setAllGames((prevGames) =>
            prevGames.map((game) => (game.id === updatedGame.id ? updatedGame : game))
        );
        setFilteredGames((prevGames) =>
            prevGames.map((game) => (game.id === updatedGame.id ? updatedGame : game))
        ); 
    };

    const removeGameFromList = (gameId) => {
        setAllGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
        setFilteredGames((prevGames) => prevGames.filter((game) => game.id !== gameId)); 
    };

    const handleSearch = (term) => {
        setSearchTerm(term);  
        const filtered = allGames.filter((game) =>
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
        <div className="mt-10 min-h-screen">
            <div className="sticky top-0 h-36 w-full flex justify-between items-center px-10 z-10" style={{backgroundColor:"#0F1012"}}> 
                <p className="font-bold text-4xl text-primary">Stock de Juegos</p>
                <div className="flex space-x-4">
                    <Searchbar
                        placeholder="Buscar por título o plataforma..." 
                        onSearch={handleSearch} 
                    />
                    <AddGameButton addGame={addGame} /> 
                </div>
            </div>
    
            {loading ? (
                <p>Cargando juegos...</p>  
            ) : error ? (
                <p>Error: {error}</p>  
            ) : (
                <>
                    {filteredGames.length === 0 ? (
                        <p className="text-center text-xl mt-10">No hay juegos cargados, Agrega para ver contenido.</p>
                    ) : (
                        <>
                            <div className="w-full space-y-4 px-20  mt-6 ">
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
    );
};

export default StockContainer;
