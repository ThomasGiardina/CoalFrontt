import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCarrito, addItemToCarrito } from '../../redux/slices/cartSlice';
import { fetchGameById, clearCurrentGame } from '../../redux/slices/gamesSlice';
import AcercaDe from './AcercaDe';
import Calificacion from './Calificacion';
import DividerDetails from './DividerDetails';
import ModalAgregarCarrito from './ModalAgregarCarrito';
import CarrouselDetails from './CarruselDetails';
import ReactMarkdown from 'react-markdown';
import GameCarrousel from './GameCarrousel';

const ContainerDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const rightContentRef = useRef(null);

    const carritoId = useSelector((state) => state.cart.carritoId);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const { currentGame: gameDetails, loading, error } = useSelector((state) => state.games);

    useEffect(() => {
        if (isAuthenticated && !carritoId) {
            dispatch(fetchCarrito());
        }
        dispatch(fetchGameById(id));

        return () => {
            dispatch(clearCurrentGame());
        };
    }, [id, isAuthenticated, carritoId, dispatch]);

    const handleAddToCart = () => {
        if (!carritoId) {
            console.error("No se ha encontrado el carrito del usuario.");
            return;
        }

        const item = {
            videojuegoId: gameDetails.id,
            cantidad: 1,
        };

        dispatch(addItemToCarrito({ carritoId, videojuegoId: gameDetails.id, cantidad: 1 }));
    };

    if (loading) return <p>Cargando detalles...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!gameDetails) return <p>Cargando...</p>;

    const categories = gameDetails?.categorias || [];

    const containerHeight = rightContentRef.current ? rightContentRef.current.offsetHeight : "auto";

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-background">
            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-stretch">
                    <div className="lg:flex-1 w-full">
                        <CarrouselDetails
                            containerHeight="700px"
                            carruselImagen1={gameDetails.carruselImagen1}
                            carruselImagen2={gameDetails.carruselImagen2}
                            carruselImagen3={gameDetails.carruselImagen3}
                        />
                    </div>

                    <div className="w-full lg:w-[380px] flex-shrink-0" ref={rightContentRef}>
                        <div className="bg-neutral rounded-xl p-6 border border-base-200 h-full flex flex-col">
                            <div className="flex-shrink-0">
                                <img
                                    src={`data:image/jpeg;base64,${gameDetails.foto}`}
                                    alt={gameDetails.titulo}
                                    className="w-full h-[350px] object-cover rounded-lg shadow-lg"
                                />
                            </div>

                            <h1 className="mt-6 text-white text-2xl font-bold leading-tight">
                                {gameDetails.titulo}
                            </h1>

                            <div className="flex-1 mt-5 space-y-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-400">Reseña General:</p>
                                    <Calificacion />
                                </div>

                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-400">Fecha de Lanzamiento:</p>
                                    <p className="text-white text-sm font-medium">{gameDetails.fechaLanzamiento}</p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-400">Desarrollador:</p>
                                    <p className="text-white text-sm font-medium">{gameDetails.desarrolladora}</p>
                                </div>

                                <div className="pt-2">
                                    <p className="text-sm text-gray-400 mb-2">Categorías:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((category, index) => (
                                            <span key={index} className="badge badge-primary text-xs">
                                                {category}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-base-200 flex flex-col items-center">
                                <ModalAgregarCarrito
                                    gameDetails={gameDetails}
                                    carritoId={carritoId}
                                    onAddToCarrito={handleAddToCart}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <DividerDetails />
                </div>

                <div className="mt-8">
                    <div className="rounded-xl bg-neutral p-6 border border-base-200">
                        <AcercaDe descripcion={gameDetails.descripcion} />
                    </div>
                </div>

                <div className="mt-6">
                    <DividerDetails />
                </div>

                <div className="mt-6 pb-8">
                    <GameCarrousel gameId={gameDetails?.id} />
                </div>
            </div>
        </div>
    );


};

export default ContainerDetails;
