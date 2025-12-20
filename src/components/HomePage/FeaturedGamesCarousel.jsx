import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGames } from '../../redux/slices/gamesSlice';
import { FaXbox, FaPlaystation, FaDesktop, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SiNintendoswitch } from 'react-icons/si';

const FeaturedGamesCarousel = () => {
    const dispatch = useDispatch();
    const { items: games } = useSelector((state) => state.games);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [featuredGames, setFeaturedGames] = useState([]);

    useEffect(() => {
        if (games.length === 0) dispatch(fetchGames());
    }, [dispatch, games.length]);

    useEffect(() => {
        if (games.length > 0) {
            const shuffled = [...games].sort(() => Math.random() - 0.5).slice(0, 8);
            setFeaturedGames(shuffled);
        }
    }, [games]);

    const itemsPerView = 4;
    const maxIndex = Math.max(0, featuredGames.length - itemsPerView);

    const handlePrev = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
    const handleNext = () => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));

    const getPlatformIcon = (platform) => {
        const iconClass = "text-xs";
        switch (platform) {
            case 'XBOX': return <FaXbox className={`${iconClass} text-green-500`} />;
            case 'PLAY_STATION': return <FaPlaystation className={`${iconClass} text-blue-500`} />;
            case 'NINTENDO_SWITCH': return <SiNintendoswitch className={`${iconClass} text-red-500`} />;
            case 'PC': return <FaDesktop className={`${iconClass} text-gray-400`} />;
            default: return null;
        }
    };

    if (featuredGames.length === 0) return null;

    return (
        <section className="w-full py-12 sm:py-16">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">Juegos Destacados</h2>
                    <p className="text-gray-400 text-sm mt-1">Descubrí los títulos más populares</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={handlePrev} disabled={currentIndex === 0} className="btn btn-circle btn-sm btn-ghost disabled:opacity-30">
                        <FaChevronLeft />
                    </button>
                    <button onClick={handleNext} disabled={currentIndex >= maxIndex} className="btn btn-circle btn-sm btn-ghost disabled:opacity-30">
                        <FaChevronRight />
                    </button>
                </div>
            </div>

            <div className="overflow-hidden">
                <div className="flex gap-4 transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView + 1)}%)` }}>
                    {featuredGames.map((game) => (
                        <Link key={game.id} to={`/Details/${game.id}`} className="flex-shrink-0 w-[calc(25%-12px)] min-w-[200px] group">
                            <div className="card bg-neutral border border-base-200 hover:border-primary/30 overflow-hidden transition-all duration-300 hover:shadow-xl">
                                <figure className="relative aspect-[3/4] overflow-hidden">
                                    <img src={`data:image/jpeg;base64,${game.foto}`} alt={game.titulo} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1.5">
                                        {getPlatformIcon(game.plataforma)}
                                    </div>
                                </figure>
                                <div className="p-3">
                                    <h3 className="text-white font-semibold text-sm line-clamp-1">{game.titulo}</h3>
                                    <span className="text-primary font-bold text-base">${game.precio}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <Link to="/Store" className="btn btn-primary text-white">
                    Ver todos los juegos
                </Link>
            </div>
        </section>
    );
};

export default FeaturedGamesCarousel;
