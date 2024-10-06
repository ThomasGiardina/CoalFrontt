import "./app.css";
import Homehero from "../components/Hero/HomeHero";

function Homepage() {

    return (
        <>
        <div className="relative min-h-screen flex" style={{ backgroundImage: `url('/proto2.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Homehero />
        </div>    
        </>
    )
}

export default Homepage;