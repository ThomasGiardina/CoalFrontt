import React from 'react';
import { useSelector } from 'react-redux';
import GameCard from '../components/Gamecard/gamecard';

const Favorites = () => {
    const favoriteGames = useSelector(state => state.favorites);

    return (
        <div className="flex flex-wrap justify-center">
            {favoriteGames.length > 0 ? (
                favoriteGames.map((game) => (
                    <GameCard 
                        key={game.id} 
                        id={game.id}
                        title={game.title} 
                        imageUrl={game.imageUrl}  
                        price={game.price}
                        platform={game.platform}
                    />
                ))
            ) : (
                <p>No hay juegos favoritos.</p>
            )}
        </div>
    );
};

export default Favorites;