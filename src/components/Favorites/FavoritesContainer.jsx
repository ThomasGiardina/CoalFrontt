import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites, removeFavorite } from '../../redux/slices/favoritesSlice';
import GameCardFavorites from './GameCardFavorites';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FavoritesContainer = () => {
    const dispatch = useDispatch();
    const { items: favoriteGames, loading, error } = useSelector((state) => state.favorites);
    const { token, userId: usuarioId } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!token || !usuarioId) {
            return;
        }
        dispatch(fetchFavorites(token));
    }, [dispatch, token, usuarioId]);

    const handleRemoveFavorite = (videojuegoId) => {
        dispatch(removeFavorite({ usuarioId, videojuegoId, token }));
    };

    if (loading) {
        return (
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex items-center justify-center min-h-[400px]">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="alert alert-error">
                    <span>Error: {error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
            <div className="flex items-center gap-3 mb-8">
                <FaHeart className="text-primary text-2xl sm:text-3xl" />
                <h1 className="text-2xl sm:text-3xl font-bold">
                    <span className="bg-gradient-to-r from-[#FF6828] to-[#E57028] bg-clip-text text-transparent">
                        Mis Favoritos
                    </span>
                </h1>
                <span className="badge badge-primary badge-lg">{favoriteGames.length}</span>
            </div>

            {favoriteGames.length === 0 ? (
                <div className="card bg-neutral border border-base-200 p-10 text-center">
                    <FaHeart className="text-gray-600 text-5xl mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-white mb-2">No tienes favoritos aún</h2>
                    <p className="text-gray-400 mb-6">Explora nuestra tienda y agrega juegos a tu lista de favoritos</p>
                    <Link to="/Store" className="btn bg-gradient-to-r from-[#FF6828] to-[#E57028] hover:from-[#E57028] hover:to-[#FF6828] text-white border-none shadow-lg shadow-[#FF6828]/25 hover:shadow-[#FF6828]/40 transform hover:-translate-y-0.5 transition-all duration-300 mx-auto">
                        Ir a la tienda
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
