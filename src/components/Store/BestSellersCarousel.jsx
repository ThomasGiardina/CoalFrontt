import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBestSellers } from '../../redux/slices/statisticsSlice';
import { fetchGames } from '../../redux/slices/gamesSlice';
import { FaTrophy, FaFire } from 'react-icons/fa';
import { BsNintendoSwitch, BsPcDisplay } from "react-icons/bs";
import { FaXbox, FaPlaystation } from "react-icons/fa";

const BestSellersSection = () => {
    const dispatch = useDispatch();
    const { bestSellers } = useSelector((state) => state.statistics);
    const { items: allGames } = useSelector((state) => state.games);
    const [displayGames, setDisplayGames] = useState([]);

    useEffect(() => {
        dispatch(fetchBestSellers());
        if (allGames.length === 0) dispatch(fetchGames());
    }, [dispatch, allGames.length]);

    useEffect(() => {
        if (bestSellers.length > 0) {
            // Use best sellers from backend, limited to 5
            const limited = bestSellers.slice(0, 5);
            setDisplayGames(limited.map((game, index) => ({
                ...game,
                isFromApi: true,
                rank: index + 1
            })));
        } else if (allGames.length > 0) {
            // Fallback: 5 random games if no best sellers
            const shuffled = [...allGames].sort(() => Math.random() - 0.5).slice(0, 5);
            setDisplayGames(shuffled.map((game, index) => ({
                titulo: game.titulo,
                foto: `data:image/jpeg;base64,${game.foto}`,
                plataforma: game.plataforma,
                ventas: Math.floor(Math.random() * 500) + 100,
                id: game.id,
                isFromApi: false,
                rank: index + 1
            })));
        }
    }, [bestSellers, allGames]);

    const getPlatformIcon = (p) => {
        switch (p) {
            case 'XBOX': return <FaXbox className="text-green-500 text-xs" />;
            case 'PLAY_STATION': return <FaPlaystation className="text-blue-500 text-xs" />;
            case 'NINTENDO_SWITCH': return <BsNintendoSwitch className="text-red-500 text-xs" />;
            case 'PC': return <BsPcDisplay className="text-gray-400 text-xs" />;
            default: return null;
        }
    };

    if (displayGames.length === 0) return null;

    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
                <FaTrophy className="text-primary text-xl" />
                <h2 className="text-xl font-bold text-white">Más Vendidos</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {displayGames.map((game, index) => (
                    <Link
                        key={game.id || index}
                        to={game.id ? `/Details/${game.id}` : '/Store'}
                        className="group relative"
                    >
                        <div className="card bg-neutral border border-base-200 hover:border-primary/40 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                            <div className="absolute top-2 left-2 z-10 badge badge-primary gap-1 text-xs font-bold">
                                <FaFire /> #{game.rank}
                            </div>
                            <figure className="relative aspect-[3/4] overflow-hidden">
                                <img
                                    src={game.foto}
                                    alt={game.titulo}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral via-transparent to-transparent"></div>
                                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1.5">
                                    {getPlatformIcon(game.plataforma)}
                                </div>
                            </figure>
                            <div className="p-3">
                                <h3 className="text-white text-sm font-medium line-clamp-1">{game.titulo}</h3>
                                <div className="flex items-center gap-1 mt-1">
                                    <span className="text-gray-400 text-xs">{game.ventas}+ vendidos</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BestSellersSection;
