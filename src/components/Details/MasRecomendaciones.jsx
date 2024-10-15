import React, { useState, useEffect } from 'react';
import HorizontalGameCard from "../Gamecard/HorizontalGameCard";

const MasRecomendaciones = () => {
    const [games, setGames] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0); // Control del carrusel
    const ITEMS_PER_PAGE = 3; // Número de juegos por "slide"

    useEffect(() => {
        // Llamada a la API para obtener los juegos recomendados
        fetch("http://localhost:4002/videojuegos/recomendados")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener los datos");
                }
                return response.json();
            })
            .then((data) => {
                setGames(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? Math.max(games.length - ITEMS_PER_PAGE, 0) : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + ITEMS_PER_PAGE >= games.length ? 0 : prev + 1));
    };

    const displayedGames = games.slice(currentSlide, currentSlide + ITEMS_PER_PAGE);

    return (
        <div className="w-full flex flex-col items-center">
            <div className="carousel w-full flex justify-between items-center">
                {/* Botón anterior */}
                <button className="btn btn-circle" onClick={handlePrev}>❮</button>

                {/* Contenedor de las tarjetas */}
                <div className="flex space-x-4 overflow-hidden">
                    {displayedGames.map((game) => (
                        <HorizontalGameCard
                            key={game.id}
                            id={game.id}
                            title={game.titulo}
                            imageUrl={game.fotoUrl}
                            price={game.precio}
                            platform={game.plataforma}
                        />
                    ))}
                </div>

                {/* Botón siguiente */}
                <button className="btn btn-circle" onClick={handleNext}>❯</button>
            </div>
        </div>
    );
};

export default MasRecomendaciones;
