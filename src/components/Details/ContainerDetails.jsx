import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AcercaDe from './AcercaDe';
import Calificacion from './Calificacion';
import CarruselDetails from './CarruselDetails';
import DividerDetails from './DividerDetails';
import MasRecomendaciones from './MasRecomendaciones';
import ModalAgregarCarrito from './ModalAgregarCarrito';
import { AuthContext } from '../../context/AuthContext';

const ContainerDetails = () => {
    const { id } = useParams(); 
    const [gameDetails, setGameDetails] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [carritoId, setCarritoId] = useState(null); 
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const storedCarritoId = localStorage.getItem('carritoId');
        if (storedCarritoId) {
            setCarritoId(storedCarritoId);
            console.log("Carrito ID obtenido de localStorage:", storedCarritoId);
        } else {
            fetchUserCarrito();
        }

        // Obtener los detalles del videojuego
        fetch(`http://localhost:4002/videojuegos/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener los detalles del juego');
                }
                return response.json();
            })
            .then((data) => {
                setGameDetails(data);
                console.log("Detalles del juego obtenidos:", data); // Imprime los detalles del juego
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
                    setCarritoId(data.id); // Guarda el carritoId en el estado
                    localStorage.setItem('carritoId', data.id); // Guarda en localStorage
                    console.log("Carrito obtenido del servidor:", data);
                } else {
                    console.error('No se encontró el carrito para este usuario.');
                }
            } catch (error) {
                console.error('Error al obtener el carrito:', error);
            }
        }
    };

    const handleAddToCart = () => {
        console.log('Agregando al carrito:', carritoId, gameDetails);
    
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

    return (
        <div className="flex flex-col justify-center">
            <div className="flex mt-14 w-full justify-between">
                <div className="flex items-center">
                    <p className="text-4xl font-sans">{gameDetails.titulo}</p>
                </div>
            </div>

            <div className="flex justify-center mt-5 h-max w-[1300px]">
                <CarruselDetails />
                <div className="ml-10 w-[500px]">
                    <img src={gameDetails.fotoUrl} alt={gameDetails.titulo} width="500" height="200" />
                    <p className="mt-4 text-white">
                        {gameDetails.descripcion}
                    </p>
                    <div className="flex items-center mt-3">
                        <p className="mr-3 text-xs">Reseña General:</p>
                        <Calificacion />
                    </div>
                    <div className="flex items-center mt-3">
                        <p className="mr-3 text-xs">Fecha de Lanzamiento:</p>
                        <p>{gameDetails.fechaLanzamiento}</p>
                    </div>
                    <div className="flex items-center mt-3">
                        <p className="mr-3 text-xs">Equipo Desarrollador:</p>
                        <p>{gameDetails.desarrolladora}</p>
                    </div>
                    <div className="mt-3">
                        <p className="mr-3 text-xs">Categorías:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {categories.map((category, index) => (
                                <span key={index} className="bg-gray-700 text-white text-xs py-1 px-2 rounded-full">
                                    {category}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex mt-10 justify-center">
                        <div className="mr-3 mb-3">
                            {/* Asegúrate de que el modal llama correctamente a handleAddToCart */}
                            <ModalAgregarCarrito 
                                gameDetails={gameDetails} 
                                carritoId={carritoId} 
                                onAddToCarrito={handleAddToCart}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-5">
                <DividerDetails />
            </div>

            <div className="flex justify-center">
                <div className="mt-10 w-[1303px] rounded-md" style={{ backgroundColor: "#465870" }}>
                    <AcercaDe />
                </div>
            </div>

            <div className="flex justify-center mt-5">
                <DividerDetails />
            </div>

            <div className="flex justify-center">
                <div className="mt-10 w-[1303px] rounded-md" style={{ backgroundColor: "#465870" }}>
                    <MasRecomendaciones />
                </div>
            </div>

            <br />
            <br />
            <br />
            <br />
        </div>
    );
};

export default ContainerDetails;
