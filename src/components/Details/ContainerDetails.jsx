import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AcercaDe from "./AcercaDe";
import Calificacion from "./Calificacion";
import CarruselDetails from "./CarruselDetails";
import DividerDetails from "./DividerDetails";
import MasRecomendaciones from "./MasRecomendaciones";
import ModalAgregarCarrito from "./ModalAgregarCarrito";

const ContainerDetails = () => {
    const { id } = useParams(); 
    const [gameDetails, setGameDetails] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
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
                        <p>{gameDetails.equipoDesarrollador}</p>
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
                            <ModalAgregarCarrito />
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
