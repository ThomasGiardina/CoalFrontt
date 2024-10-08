import AcercaDe from "./AcercaDe";
import BotonComprarDetails from "./BotonComprarDetails";
import Calificacion from "./Calificacion";
import CarruselDetails from "./CarruselDetails";
import DividerDetails from "./DividerDetails";
import MasDe from "./MasDe";
import MasRecomendaciones from "./MasRecomendaciones";
import ModalAgregarCarrito from "./ModalAgregarCarrito";

const ContainerDetails = () =>{

    const categories = [
        'ACCION',
        'AVENTURA',
        'RPG',
        'SIMULACION',
        'DEPORTES',
        'ESTRATEGIA',
        'PUZZLE',
        'TERROR',
        'VR',
        'EDUCATIVO',
    ];

    return (

        <div className="flex flex-col  justify-center" >
            <div className="flex mt-20 w-full justify-between">
            <div className="flex items-center"> 
                    <p className="text-4xl font-sans">Dead Cells</p>
            </div>
            </div>
            <div className="flex justify-center mt-5 h-max  w-[1300px]" >
                <CarruselDetails />
                <div className="ml-10 w-[500px]">
                    <img img src="/deadcellsPortada.jpg" alt="Imagen de Juego" width="500" height="200" ></img>
                    <p className="mt-4 text-white">
                        Dead Cells es un juego de acción de plataformas de estilo roguelite inspirado en juegos tipo metroidvania.
                        Explorarás un castillo en constante cambio y expansión. Sin puntos de control: mata, muere, aprende, repite.
                    </p>
                    <div className="flex items-center mt-3">
                        <p className="mr-3 text-xs">Reseña Genereral: </p>
                        <Calificacion />
                    </div>
                    <div className="flex items-center mt-3">
                        <p className="mr-3 text-xs">Fecha de Lanzamiento:</p>
                        <p>6 AGO 2018</p>
                    </div>

                    <div className="flex items-center mt-3">
                        <p className="mr-3 text-xs">Equipo Desarollador:</p>
                        <p>Motion Twin</p>
                    </div>

                    <div className="mt-3">
                        <p className="mr-3 text-xs">Categorias:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {categories.map((category, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-700 text-white text-xs py-1 px-2 rounded-full"
                                >
                                    {category}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex mt-5 justify-center">
                        <div className="mr-3 mb-3">
                            <ModalAgregarCarrito />
                        </div>
                    </div>    
                </div>
            </div>

            <div className="flex justify-center mt-5 ">
                <DividerDetails />
            </div>

            <div className="flex justify-center ">
                <div className=" mt-10 w-[1303px] rounded-md" style={{backgroundColor:"#465870"}}>
                    <AcercaDe />
                </div>
            </div>

            <div className="flex justify-center mt-5 ">
                <DividerDetails />
            </div>

            <div className="flex justify-center ">
                <div className=" mt-10 w-[1303px] rounded-md" style={{backgroundColor:"#465870"}}>
                    <MasDe />
                </div>
            </div>

            <div className="flex justify-center ">
                <div className=" mt-10 w-[1303px] rounded-md" style={{backgroundColor:"#465870"}}>
                    <MasRecomendaciones />
                </div>
            </div>

            
            

            <br></br>
            <br></br>
            <br></br>
            <br></br>

        </div>
    )

}

export default ContainerDetails;