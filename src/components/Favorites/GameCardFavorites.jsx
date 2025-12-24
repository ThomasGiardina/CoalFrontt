import { Link } from 'react-router-dom';
import { BsNintendoSwitch, BsPcDisplay } from "react-icons/bs";
import { FaXbox, FaPlaystation, FaTrash, FaShoppingCart } from "react-icons/fa";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const GameCardFavorites = ({ game, removeGame }) => {
    const MySwal = withReactContent(Swal);

    const getPlatformIcon = (platform) => {
        switch (platform) {
            case 'XBOX':
                return <FaXbox className="text-green-500 text-sm" />;
            case 'PLAY_STATION':
                return <FaPlaystation className="text-blue-500 text-sm" />;
            case 'NINTENDO_SWITCH':
                return <BsNintendoSwitch className="text-red-500 text-sm" />;
            case 'PC':
                return <BsPcDisplay className="text-gray-400 text-sm" />;
            default:
                return null;
        }
    };

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        MySwal.fire({
            title: `¿Eliminar de favoritos?`,
            text: `"${game.titulo}" será removido de tu lista`,
            icon: 'warning',
            background: '#1D1F23',
            color: '#fff',
            showCancelButton: true,
            confirmButtonColor: '#FF6B00',
            cancelButtonColor: '#374151',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                removeGame(game.id);
            }
        });
    };

    return (
        <Link to={`/Details/${game.id}`} className="card bg-neutral border border-base-200 hover:border-primary/40 transition-all duration-300 group overflow-hidden">
            <figure className="relative aspect-[4/5] overflow-hidden">
                <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={game.foto ? `data:image/jpeg;base64,${game.foto}` : '/images/placeholder.jpg'}
                    alt={game.titulo || 'Sin título'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral via-transparent to-transparent"></div>
                <button
                    onClick={handleDelete}
                    className="absolute top-3 right-3 btn btn-circle btn-sm btn-error"
                >
                    <FaTrash className="text-white text-xs" />
                </button>
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm rounded-full p-1.5">
                    {getPlatformIcon(game.plataforma)}
                </div>
            </figure>
            <div className="p-3">
                <h3 className="font-medium text-white text-sm line-clamp-1 mb-1">{game.titulo}</h3>
                <div className="flex items-center justify-between">
                    <span className="text-primary font-bold">${game.precio}</span>
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        className="btn btn-primary btn-xs gap-1"
                    >
                        <FaShoppingCart className="text-xs" />
                        Agregar
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default GameCardFavorites;
