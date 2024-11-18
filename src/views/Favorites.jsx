import React from 'react';
import { useSelector } from 'react-redux';
import GameCard from '../components/Gamecard/gamecard';

const Favorites = () => {
    const favoriteGames = useSelector(state => state.favorites);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Mis Favoritos</h2>
            {favoriteGames.length === 0 ? (
                <p className="text-gray-500 text-center">No tienes juegos en favoritos.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favoriteGames.map(game => (
                        <GameCard
                            key={game.id}
                            id={game.id}
                            title={game.title}
                            imageUrl={game.imageUrl}
                            price={game.price}
                            platform={game.platform}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;