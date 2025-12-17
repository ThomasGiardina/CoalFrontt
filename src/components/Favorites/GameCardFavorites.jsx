import { Link } from 'react-router-dom';
import { BsNintendoSwitch, BsPcDisplay } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const GameCardFavorites = ({ game, removeGame }) => {
    const MySwal = withReactContent(Swal);

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

    const handleDelete = () => {
        MySwal.fire({
            title: `¿Estás seguro?`,
            text: `¿Deseas eliminar "${game.titulo}" de tus favoritos?`,
            icon: 'warning',
            background: '#1D1F23',
            color: '#fff',
            showCancelButton: true,
            confirmButtonColor: '#FF6828',
            cancelButtonColor: '#B3741F',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                removeGame(game.id);
                MySwal.fire({
                    title: 'Eliminado',
                    text: `"${game.titulo}" ha sido eliminado de tus favoritos.`,
                    icon: 'success',
                    background: '#1D1F23',
                    color: '#fff',
                    confirmButtonColor: '#FF6828',
                });
            }
        });
    };

    return (
        <div className="bg-neutral text-white rounded-lg overflow-hidden flex p-4 shadow-lg w-full max-w-none">
            <div className="w-40 h-40 flex-shrink-0">
                <img
                    className="w-full h-full object-cover rounded-md"
                    src={game.foto ? `data:image/jpeg;base64,${game.foto}` : '/images/placeholder.jpg'}
                    alt={game.titulo || 'Sin título'}
                />
            </div>
            <div className="flex-grow ml-4 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold">{game.titulo}</h2>
                        <p className="text-lg font-bold text-orange-400">${game.precio}</p>
                    </div>
                    <div>{getPlatformIcon(game.plataforma)}</div>
                </div>
                <div className="flex flex-col items-end mt-4">
                    <button
                        onClick={handleDelete}
                        className="p-2 hover:bg-gray-700 rounded-md transition mb-2"
                    >
                        <FaTrash className="text-red-500 text-2xl" />
                    </button>
                    <Link
                        to={`/Details/${game.id}`}
                        className="btn btn-primary text-lg"
                    >
                        Ver detalles
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GameCardFavorites;
