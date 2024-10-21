import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import AcercaDe from './AcercaDe';
import Calificacion from './Calificacion';
import DividerDetails from './DividerDetails';
import ModalAgregarCarrito from './ModalAgregarCarrito';
import { AuthContext } from '../../context/AuthContext';
import CarrouselDetails from './CarruselDetails';
import ReactMarkdown from 'react-markdown'; 
import GameCarrousel from './GameCarrousel';

const ContainerDetails = () => {
    const { id } = useParams(); 
    const [gameDetails, setGameDetails] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [carritoId, setCarritoId] = useState(null); 
    const { isAuthenticated } = useContext(AuthContext);
    
    const rightContentRef = useRef(null); 

    useEffect(() => {
        const storedCarritoId = localStorage.getItem('carritoId');
        if (storedCarritoId) {
            setCarritoId(storedCarritoId);
            console.log("Carrito ID obtenido de localStorage:", storedCarritoId);
        } else {
            fetchUserCarrito();
        }

        fetch(`http://localhost:4002/videojuegos/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener los detalles del juego');
                }
                return response.json();
            })
            .then((data) => {
                setGameDetails(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    const fetchUserCarrito = async () => {
        if (isAuthenticated) {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:4002/carritos/usuarios/carrito', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setCarritoId(data.id);
                    localStorage.setItem('carritoId', data.id);
                } else {
                    console.error('No se encontró el carrito para este usuario.');
                }
            } catch (error) {
                console.error('Error al obtener el carrito:', error);
            }
        }
    };

    const handleAddToCart = () => {
        if (!carritoId) {
            console.error("No se ha encontrado el carrito del usuario.");
            return;
        }

        const token = localStorage.getItem('token');
        fetch(`http://localhost:4002/carritos/${carritoId}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                videojuegoId: gameDetails.id,
                cantidad: 1
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Item agregado al carrito:", data);
        })
        .catch(error => {
            console.error("Error al agregar el item al carrito:", error);
        });
    };

    if (loading) return <p>Cargando detalles...</p>;
    if (error) return <p>Error: {error}</p>;

    const categories = gameDetails?.categorias || [];

    const containerHeight = rightContentRef.current ? rightContentRef.current.offsetHeight : "auto";

    return (
        <div className="min-h-screen w-10/12 flex flex-col items-center bg-background">
            <div className="w-full max-w-[92%] flex flex-col lg:flex-row justify-between mt-10 gap-10">
                <div className="lg:w-[75%] w-full h-auto">
                    <CarrouselDetails
                        containerHeight="700px" 
                        carruselImagen1={gameDetails.carruselImagen1}
                        carruselImagen2={gameDetails.carruselImagen2}
                        carruselImagen3={gameDetails.carruselImagen3}
                    />
                </div>
                <div className="w-[330px] mt-10 lg:mt-0 px-4" ref={rightContentRef}> 
                    <img
                        src={`data:image/jpeg;base64,${gameDetails.foto}`}
                        alt={gameDetails.titulo}
                        className="w-[300px] h-[400px] object-cover shadow-lg"
                    />
                    <p className="mt-4 text-white text-xl break-words">
                        <ReactMarkdown>{`**${gameDetails.titulo}**`}</ReactMarkdown>
                    </p>

                    <div className="flex items-center mt-3 flex-wrap">
                        <p className="mr-3 text-sm text-gray-300">Reseña General:</p>
                        <Calificacion />
                    </div>

                    <div className="flex items-center mt-3 flex-wrap">
                        <p className="mr-3 text-sm text-gray-300">Fecha de Lanzamiento:</p>
                        <p className="text-white">{gameDetails.fechaLanzamiento}</p>
                    </div>

                    <div className="flex items-center mt-3 flex-wrap">
                        <p className="mr-3 text-sm text-gray-300">Equipo Desarrollador:</p>
                        <p className="text-white break-words">{gameDetails.desarrolladora}</p> 
                    </div>

                    <div className="mt-3">
                        <p className="mr-3 text-sm text-gray-300">Categorías:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {categories.map((category, index) => (
                                <span key={index} className="badge badge-secondary break-words">
                                    {category}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex mt-10">
                        <ModalAgregarCarrito 
                            gameDetails={gameDetails} 
                            carritoId={carritoId} 
                            onAddToCarrito={handleAddToCart}
                        />
                    </div>
                </div>
            </div>
    
            <div className="w-full max-w-[92%] mt-10">
                <DividerDetails />
            </div>
    
            <div className="w-full max-w-[92%] mt-10">
                <div className="rounded-md bg-neutral p-6  mx-auto">
                    <AcercaDe descripcion={gameDetails.descripcion} />
                </div>
            </div>
    
            <div className="w-full max-w-[92%] mt-5">
                <DividerDetails />
            </div>

            <div className="w-full max-w-[92%] mt-5">
                <GameCarrousel gameId={gameDetails?.id} />
            </div>
        </div>
    );
    
    
};

export default ContainerDetails;
