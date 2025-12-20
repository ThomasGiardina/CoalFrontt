import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGames } from '../../redux/slices/gamesSlice';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BsNintendoSwitch, BsPcDisplay } from "react-icons/bs";
import { FaXbox, FaPlaystation } from "react-icons/fa";

const FeaturedGamesRow = () => {
    const dispatch = useDispatch();
    const { items: games } = useSelector((state) => state.games);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [featuredGames, setFeaturedGames] = useState([]);

    useEffect(() => {
        if (games.length === 0) dispatch(fetchGames());
    }, [dispatch, games.length]);

    useEffect(() => {
        if (games.length > 0) {
            const shuffled = [...games].sort(() => Math.random() - 0.5).slice(0, 10);
            setFeaturedGames(shuffled);
        }
    }, [games]);

    const scrollLeft = () => setScrollPosition(Math.max(0, scrollPosition - 300));
    const scrollRight = () => setScrollPosition(scrollPosition + 300);

    const getPlatformIcon = (p) => {
        switch (p) {
            case 'XBOX': return <FaXbox className="text-green-500 text-xs" />;
            case 'PLAY_STATION': return <FaPlaystation className="text-blue-500 text-xs" />;
            case 'NINTENDO_SWITCH': return <BsNintendoSwitch className="text-red-500 text-xs" />;
            case 'PC': return <BsPcDisplay className="text-gray-400 text-xs" />;
            default: return null;
        }
    };

    if (featuredGames.length === 0) return null;

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Te puede interesar</h2>
                <div className="flex gap-2">
                    <button onClick={scrollLeft} className="btn btn-circle btn-xs btn-ghost"><FaChevronLeft /></button>
                    <button onClick={scrollRight} className="btn btn-circle btn-xs btn-ghost"><FaChevronRight /></button>
                </div>
            </div>
            <div className="overflow-hidden">
                <div className="flex gap-4 transition-transform duration-300" style={{ transform: `translateX(-${scrollPosition}px)` }}>
                    {featuredGames.map((game) => (
                        <Link key={game.id} to={`/Details/${game.id}`} className="flex-shrink-0 w-40 group">
                            <div className="card bg-neutral border border-base-200 hover:border-primary/40 overflow-hidden transition-all duration-300">
                                <figure className="relative aspect-[3/4] overflow-hidden">
                                    <img src={`data:image/jpeg;base64,${game.foto}`} alt={game.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    <div className="absolute top-1 left-1 bg-black/50 backdrop-blur-sm rounded-full p-1">
                                        {getPlatformIcon(game.plataforma)}
                                    </div>
                                </figure>
                                <div className="p-2">
                                    <h3 className="text-white text-xs font-medium line-clamp-1">{game.titulo}</h3>
                                    <span className="text-primary font-bold text-sm">${game.precio}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedGamesRow;
