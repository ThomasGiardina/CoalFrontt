import "./app.css";
import Homehero from "../components/Hero/HomeHero";
import Homeimg from "../components/Homeimg/Homeimg"; // Importamos el nuevo componente de imagen

function Homepage() {
    return (
        <div className="relative min-h-screen bg-black flex">
            {/* Columna izquierda: Hero */}
            <div className="w-1/2 flex items-center justify-center">
                <Homehero />
            </div>

            {/* Columna derecha: Imagen como componente separado */}
            <div className="relative w-1/2 flex justify-center items-center mr-5">
                <Homeimg /> {/* Aquí llamamos al componente de la imagen */}
            </div>
        </div>
    );
}

export default Homepage;
