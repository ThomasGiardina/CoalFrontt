import React, { useState, useEffect } from 'react';
import HorizontalGameCard from '../Gamecard/Horizontalgamecard';

const MasRecomendaciones = () => {
    const [games, setGames] = useState([]);  
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        fetch("http://localhost:4002/videojuegos/recomendados")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener los datos");
                }
                return response.json();
            })
            .then((data) => {
                setGames(data);  
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Cargando recomendaciones...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex flex-col space-y-4">
            {games.map((game) => (
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
    );
};

export default MasRecomendaciones;
