import { useState, useEffect } from 'react';
import Storegrid from '../components/Store/StoreGrid';
import Carrousel from '../components/Store/Carrousel';

const Store = () => {
    const [games, setGames] = useState([]); 

    useEffect(() => {
        fetch("http://localhost:4002/videojuegos")
            .then((response) => response.json())
            .then((data) => {
                setGames(Array.isArray(data) ? data : []);
            })
            .catch((error) => {
                console.error("Error al cargar los juegos:", error);
            });
    }, []);

    return (
        <div className="w-full">
            <Carrousel/>
            <Storegrid games={games} />
        </div>
    );
};

export default Store;