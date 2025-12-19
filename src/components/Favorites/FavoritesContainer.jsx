import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites, removeFavorite } from '../../redux/slices/favoritesSlice';
import GameCardFavorites from './GameCardFavorites';

const FavoritesContainer = () => {
    const dispatch = useDispatch();
    const { items: favoriteGames, loading, error } = useSelector((state) => state.favorites);
    const { token, userId: usuarioId } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!token || !usuarioId) {
            console.error('Token o usuarioId no definidos');
            return;
        }
        dispatch(fetchFavorites(token));
    }, [dispatch, token, usuarioId]);

    const handleRemoveFavorite = (videojuegoId) => {
        dispatch(removeFavorite({ usuarioId, videojuegoId, token }));
    };

    if (loading) {
        return <p className="text-center text-primary">Cargando favoritos...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <div className="min-h-screen p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-4 sm:mb-6">Mis Juegos Favoritos</h1>
            {favoriteGames.length === 0 ? (
                <p className="text-gray-500 text-center text-sm sm:text-base">No tienes juegos en favoritos.</p>
            ) : (
                <div className="space-y-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {favoriteGames.map((game) => (
                        <GameCardFavorites
                            key={game.id}
                            game={game}
                            removeGame={handleRemoveFavorite}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesContainer;
