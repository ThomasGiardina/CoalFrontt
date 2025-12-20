import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGames } from '../../redux/slices/gamesSlice';
import { FaChevronLeft, FaChevronRight, FaFire, FaStar, FaGamepad } from 'react-icons/fa';

const StoreBanner = () => {
    const dispatch = useDispatch();
    const { items: games } = useSelector((state) => state.games);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [featuredGames, setFeaturedGames] = useState([]);

    useEffect(() => {
        if (games.length === 0) dispatch(fetchGames());
    }, [dispatch, games.length]);

    useEffect(() => {
        if (games.length > 0) {
            const shuffled = [...games].sort(() => Math.random() - 0.5).slice(0, 4);
            setFeaturedGames(shuffled);
        }
    }, [games]);

    useEffect(() => {
        if (featuredGames.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredGames.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [featuredGames.length]);

    const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + featuredGames.length) % featuredGames.length);
    const handleNext = () => setCurrentSlide((prev) => (prev + 1) % featuredGames.length);

    if (featuredGames.length === 0) return null;
    const currentGame = featuredGames[currentSlide];

    return (
        <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden mb-8">
            <div className="absolute inset-0 transition-opacity duration-700">
                <img src={`data:image/jpeg;base64,${currentGame.foto}`} alt={currentGame.titulo} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
            </div>
            <div className="absolute inset-0 flex items-center">
                <div className="max-w-xl p-6 sm:p-10">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="badge badge-primary gap-1"><FaFire /> Destacado</span>
                        <span className="badge badge-ghost">{currentGame.plataforma?.replace('_', ' ')}</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 line-clamp-2">{currentGame.titulo}</h2>
                    <p className="text-gray-300 text-sm sm:text-base mb-4 line-clamp-2">{currentGame.descripcion || 'Descubrí este increíble juego en nuestra tienda'}</p>
                    <div className="flex items-center gap-4">
                        <span className="text-2xl sm:text-3xl font-bold text-primary">${currentGame.precio}</span>
                        <Link to={`/Details/${currentGame.id}`} className="btn btn-primary text-white">Ver Juego</Link>
                    </div>
                </div>
            </div>
            <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-black/50 border-0 hover:bg-black/70">
                <FaChevronLeft />
            </button>
            <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-black/50 border-0 hover:bg-black/70">
                <FaChevronRight />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {featuredGames.map((_, i) => (
                    <button key={i} onClick={() => setCurrentSlide(i)} className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'bg-primary w-6' : 'bg-white/50'}`}></button>
                ))}
            </div>
        </div>
    );
};

export default StoreBanner;
