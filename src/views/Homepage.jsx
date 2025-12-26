import Homehero from "../components/HomePage/HomeHero";
import Homeimg from "../components/HomePage/Homeimg";
import ConsolesSection from "../components/HomePage/ConsolesSection";
import FindUsSection from "../components/HomePage/FindUsSection";
import WhyCoalSection from '../components/HomePage/WhyCoalSection';

function Homepage() {
    return (
        <div className="relative flex flex-col bg-base-300">
            <section className="min-h-[calc(100vh-64px)] w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-0 gap-6 lg:gap-10">
                <div className="w-full lg:w-1/2 flex items-center justify-center order-2 lg:order-1">
                    <Homehero />
                </div>
                <div className="w-full lg:w-1/2 flex justify-center items-center order-1 lg:order-2">
                    <Homeimg />
                </div>
            </section>

            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <ConsolesSection />
                <WhyCoalSection />
                <FindUsSection />
            </div>
        </div>
    );
}

export default Homepage;