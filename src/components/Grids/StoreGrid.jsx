import React, { useState, useEffect } from 'react';
import GameCard from '../Gamecard/gamecard';
import Pagination from '../Pagination/Pagination';

const ITEMS_PER_PAGE = 15;

const Storegrid = () => {
    const [games, setGames] = useState([]);  // Inicialización como array vacío
    const [currentPage, setCurrentPage] = useState(1);  // Página actual
    const [loading, setLoading] = useState(true);  // Estado de carga
    const [error, setError] = useState(null);  // Estado de error para manejar posibles problemas

    // Obtener los videojuegos desde el backend
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
                    setGames(data);  // Asegurarse de que sea un array
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

    // Calcular el número total de páginas
    const totalPages = Math.ceil(games.length / ITEMS_PER_PAGE);

    // Obtener los juegos de la página actual
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const selectedGames = games.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Cambiar de página
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <>
            {loading ? (
                <p>Loading games...</p>  // Estado de carga
            ) : error ? (
                <p>Error: {error}</p>  // Mostrar un mensaje de error
            ) : (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {selectedGames.map((game) => (
                            <GameCard 
                                key={game.id} 
                                title={game.titulo} 
                                body={game.descripcion} 
                                imageUrl={game.fotoUrl} 
                                price={game.precio}
                                platform={game.plataforma}
                                category={game.categoria}
                                stock={game.stock}
                                id={game.id}
                            />
                        ))}
                    </div>
                    <Pagination 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        onPageChange={handlePageChange}  // Maneja el cambio de página
                    />
                </div>
            )}
        </>
    );
};

export default Storegrid;
