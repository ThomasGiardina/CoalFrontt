import React from 'react';
import { useEffect, useState } from 'react';
import GameCard from '../Gamecard/gamecard';

const Storegrid = ({}) => {
    const [games, setgames] = useState([]);

    useEffect(()=> {
        fetch("https://jsonplaceholder.typicode.com/games") //localhost:8080/products
        .then((response) => response.json())
        .then((data) => {
            setgames(data)
        })
        .catch((error) => {
            console.error("Error al obtener los daros:", error)
        }) 
    }, [])

    return (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {games.map((game) => (
                <GameCard 
                key={game.id} 
                title={game.title}
                body={game.body}
                id={game.id}
                />
            ))}
        </div>
        </>
    );
};

export default Storegrid;