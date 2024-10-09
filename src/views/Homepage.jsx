import "../index.css";
import Homehero from "../components/Hero/HomeHero";
import Homeimg from "../components/Homeimg/Homeimg";


function Homepage() {
    return (
        <div className="relative min-h-screen bg-black flex">
            <div className="w-1/2 flex items-center justify-center">
                <Homehero />
            </div>
            <div className="relative w-1/2 flex justify-center items-center mr-5">
                <Homeimg /> 
            </div>
        </div>
    );
}

export default Homepage;
