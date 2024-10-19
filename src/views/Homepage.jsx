import React from 'react';
import Homehero from "../components/HomePage/HomeHero";
import Homeimg from "../components/HomePage/Homeimg";    
import ConsolesSection from "../components/HomePage/ConsolesSection";
import FindUsSection from "../components/HomePage/FindUsSection";
import WhyCoalSection from '../components/HomePage/WhyCoalSection';

function Homepage() {
    return (
        <div className="relative min-h-screen flex flex-col" style={{ background: 'linear-gradient(to bottom, #000000, #0d0d0d, #1a1a1a, #262626, #333333)' }}>
            <div className="w-full flex flex-1">
                <div className="w-1/2 flex items-center justify-center">
                    <Homehero />
                </div>
                <div className="relative w-1/2 flex justify-center items-center mr-5">
                    <Homeimg /> 
                </div>
            </div>
            <ConsolesSection />
            <WhyCoalSection />
            <FindUsSection />
        </div>
    );
}

export default Homepage;