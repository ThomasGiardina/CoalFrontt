import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsNintendoSwitch, BsPcDisplay } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { addFavorite, removeFavorite } from '../../redux/slices/favoritesSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const GameCard = ({ id, title, imageUrl, price, platform }) => {
    const dispatch = useDispatch();
    const usuarioId = useSelector((state) => state.auth.userId);
    const token = useSelector((state) => state.auth.token);
    const favoriteGames = useSelector((state) => state.favorites.items);

    const isFavorite = Array.isArray(favoriteGames) && favoriteGames.some((game) => game.id === id);

    const MySwal = withReactContent(Swal);

    const handleAddFavorite = async (e) => {
        e.preventDefault();

        if (!usuarioId || !token) {
            Swal.fire({
                title: 'Error',
                text: 'Debes estar autenticado para realizar esta acción.',
                icon: 'error',
                background: '#1D1F23',
                color: '#fff',
                toast: true,
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false,
            });
            return;
        }

        try {
            await dispatch(addFavorite({ usuarioId, videojuegoId: id, token })).unwrap();

            Swal.fire({
                title: 'Agregado a Favoritos',
                text: `${title} ha sido agregado a tus favoritos.`,
                icon: 'success',
                background: '#1D1F23',
                color: '#fff',
                toast: true,
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error('Error al agregar a favoritos:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al agregar este juego a favoritos.',
                icon: 'error',
                background: '#1D1F23',
                color: '#fff',
                toast: true,
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false,
            });
        }
    };

    const handleRemoveFavorite = async (e) => {
        e.preventDefault();

        if (!usuarioId || !token) {
            Swal.fire({
                title: 'Error',
                text: 'Debes estar autenticado para realizar esta acción.',
                icon: 'error',
                background: '#1D1F23',
                color: '#fff',
                toast: true,
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false,
            });
            return;
        }

        try {
            await dispatch(removeFavorite({ usuarioId, videojuegoId: id, token })).unwrap();

            Swal.fire({
                title: 'Eliminado de Favoritos',
                text: `${title} ha sido eliminado de tus favoritos.`,
                icon: 'error',
                background: '#1D1F23',
                color: '#fff',
                toast: true,
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error('Error al eliminar de favoritos:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al eliminar este juego de favoritos.',
                icon: 'error',
                background: '#1D1F23',
                color: '#fff',
                toast: true,
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false,
            });
        }
    };

    const getPlatformIcon = (platform) => {
        switch (platform) {
            case 'XBOX':
                return <i className="fab fa-xbox text-green-500 text-2xl"></i>;
            case 'PLAY_STATION':
                return <i className="fab fa-playstation text-blue-500 text-2xl"></i>;
            case 'NINTENDO_SWITCH':
                return <div className="text-red-700 text-2xl p-1"><BsNintendoSwitch /></div>;
            case 'PC':
                return <div className="text-gray-500 text-2xl p-1"><BsPcDisplay /></div>;
            default:
                return null;
        }
    };

    return (
        <Link to={`/Details/${id}`} className="relative block w-full max-w-xs sm:max-w-sm lg:max-w-md h-80 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <img className="absolute inset-0 w-full h-full object-cover" src={`data:image/jpeg;base64,${imageUrl}`} alt={title} />
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-2 right-4">
                {getPlatformIcon(platform)}
            </div>
            <button
                onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}
                className={`absolute top-2 left-2 p-2 rounded-full transition ${
                    isFavorite ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300'
                }`}
            >
                <FaHeart className="text-xl" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-white font-bold">${price}</span>
                </div>
            </div>
        </Link>
    );
};

export default GameCard;