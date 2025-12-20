import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsNintendoSwitch, BsPcDisplay } from "react-icons/bs";
import { FaHeart, FaXbox, FaPlaystation } from "react-icons/fa";
import { addFavorite, removeFavorite } from '../../redux/slices/favoritesSlice';
import Swal from 'sweetalert2';

const GameCard = ({ id, title, imageUrl, price, platform }) => {
    const dispatch = useDispatch();
    const usuarioId = useSelector((state) => state.auth.userId);
    const token = useSelector((state) => state.auth.token);
    const favoriteGames = useSelector((state) => state.favorites.items);
    const isFavorite = Array.isArray(favoriteGames) && favoriteGames.some((game) => game.id === id);

    const handleAddFavorite = async (e) => {
        e.preventDefault();
        if (!usuarioId || !token) {
            Swal.fire({ title: 'Error', text: 'Debes estar autenticado.', icon: 'error', background: '#1D1F23', color: '#fff', toast: true, position: 'top-end', timer: 3000, showConfirmButton: false });
            return;
        }
        try {
            await dispatch(addFavorite({ usuarioId, videojuegoId: id, token })).unwrap();
            Swal.fire({ title: 'Agregado', text: `${title} agregado a favoritos.`, icon: 'success', background: '#1D1F23', color: '#fff', toast: true, position: 'top-end', timer: 3000, showConfirmButton: false });
        } catch { Swal.fire({ title: 'Error', text: 'No se pudo agregar.', icon: 'error', background: '#1D1F23', color: '#fff', toast: true, position: 'top-end', timer: 3000, showConfirmButton: false }); }
    };

    const handleRemoveFavorite = async (e) => {
        e.preventDefault();
        if (!usuarioId || !token) return;
        try {
            await dispatch(removeFavorite({ usuarioId, videojuegoId: id, token })).unwrap();
            Swal.fire({ title: 'Eliminado', text: `${title} eliminado de favoritos.`, icon: 'info', background: '#1D1F23', color: '#fff', toast: true, position: 'top-end', timer: 3000, showConfirmButton: false });
        } catch { }
    };

    const getPlatformIcon = (p) => {
        switch (p) {
            case 'XBOX': return <FaXbox className="text-green-500" />;
            case 'PLAY_STATION': return <FaPlaystation className="text-blue-500" />;
            case 'NINTENDO_SWITCH': return <BsNintendoSwitch className="text-red-500" />;
            case 'PC': return <BsPcDisplay className="text-gray-400" />;
            default: return null;
        }
    };

    return (
        <Link to={`/Details/${id}`} className="card bg-neutral border border-base-200 hover:border-primary/40 transition-all duration-300 group overflow-hidden hover:shadow-xl hover:shadow-primary/5">
            <figure className="relative aspect-[4/5] overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={`data:image/jpeg;base64,${imageUrl}`} alt={title} />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral via-transparent to-transparent"></div>
                <button onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite} className={`absolute top-2 right-2 btn btn-circle btn-xs ${isFavorite ? 'btn-error' : 'btn-ghost bg-black/40 backdrop-blur-sm hover:btn-error'}`}>
                    <FaHeart className={`text-xs ${isFavorite ? 'text-white' : 'text-gray-300'}`} />
                </button>
                <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-sm rounded-full p-1.5">
                    {getPlatformIcon(platform)}
                </div>
            </figure>
            <div className="p-3">
                <h3 className="font-semibold text-white text-sm line-clamp-1 mb-1">{title}</h3>
                <span className="text-primary font-bold">${price}</span>
            </div>
        </Link>
    );
};

export default GameCard;