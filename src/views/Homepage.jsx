import Homehero from "../components/HomePage/HomeHero";
import Homeimg from "../components/HomePage/Homeimg";    
import ConsolesSection from "../components/HomePage/ConsolesSection";
import FindUsSection from "../components/HomePage/FindUsSection";
import WhyCoalSection from '../components/HomePage/WhyCoalSection';

function Homepage() {
    return (
        <div className="relative min-h-screen flex flex-col" style={{ background: 'linear-gradient(to bottom, #000000, #0d0d0d, #1a1a1a, #262626, #333333)' }}>
            <div className="w-full flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-12 gap-8 lg:gap-0">
                <div className="w-full lg:w-1/2 flex items-center justify-center order-2 lg:order-1">
                    <Homehero />
                </div>
                <div className="w-full lg:w-1/2 flex justify-center items-center order-1 lg:order-2">
                    <Homeimg /> 
                </div>
            </div>
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ConsolesSection />
                <WhyCoalSection />
                <FindUsSection />
            </div>
            <div className="h-16 sm:h-20"></div>
        </div>
    );
}

export default Homepage;