import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../redux/slices/favoritesSlice';
import Swal from 'sweetalert2';
import { FaHeart } from 'react-icons/fa';
import { BsNintendoSwitch, BsPcDisplay } from "react-icons/bs";
import { FaXbox, FaPlaystation } from "react-icons/fa";

const GameCard = ({ title, imageUrl, price, platform, id }) => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const favorites = useSelector((state) => state.favorites.items);
    const isFavorite = favorites.some(fav => fav.id === id);

    const getPlatformIcon = (p) => {
        switch (p) {
            case 'XBOX': return <FaXbox className="text-green-500 text-xs" />;
            case 'PLAY_STATION': return <FaPlaystation className="text-blue-500 text-xs" />;
            case 'NINTENDO_SWITCH': return <BsNintendoSwitch className="text-red-500 text-xs" />;
            case 'PC': return <BsPcDisplay className="text-gray-400 text-xs" />;
            default: return null;
        }
    };

    const handleAddFavorite = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            Swal.fire({ title: 'Inicia sesión', text: 'Debes iniciar sesión para agregar favoritos', icon: 'info', background: '#1D1F23', color: '#fff', confirmButtonColor: '#FF6B00' });
            return;
        }
        dispatch(addFavorite(id));
    };

    const handleRemoveFavorite = (e) => {
        e.preventDefault();
        dispatch(removeFavorite(id));
    };

    return (
        <Link to={`/Details/${id}`} className="card bg-neutral border border-base-200 hover:border-primary/40 transition-all duration-300 group overflow-hidden hover:shadow-xl hover:shadow-primary/5">
            <figure className="relative aspect-square overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={`data:image/jpeg;base64,${imageUrl}`} alt={title} />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral via-transparent to-transparent"></div>
                <button onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite} className={`absolute top-1.5 right-1.5 btn btn-circle btn-xs ${isFavorite ? 'btn-error' : 'btn-ghost bg-black/40 backdrop-blur-sm hover:btn-error'}`}>
                    <FaHeart className={`text-xs ${isFavorite ? 'text-white' : 'text-gray-300'}`} />
                </button>
                <div className="absolute top-1.5 left-1.5 bg-black/40 backdrop-blur-sm rounded-full p-1">
                    {getPlatformIcon(platform)}
                </div>
            </figure>
            <div className="p-2">
                <h3 className="font-medium text-white text-xs line-clamp-1">{title}</h3>
                <span className="text-primary font-bold text-sm">${price}</span>
            </div>
        </Link>
    );
};

export default GameCard;