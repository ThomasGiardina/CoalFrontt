import React from 'react';
import Homehero from "../components/Hero/HomeHero";
import Homeimg from "../components/Homeimg/Homeimg";
import ConsolesSection from "../components/Homeimg/ConsolesSection";
import FindUsSection from "../components/Homeimg/FindUsSection";

function Homepage() {
    return (
        <div className="relative min-h-screen bg-black flex flex-col">
            <div className="w-full flex flex-1">
                <div className="w-1/2 flex items-center justify-center">
                    <Homehero />
                </div>
                <div className="relative w-1/2 flex justify-center items-center mr-5">
                    <Homeimg /> 
                </div>
            </div>
            <ConsolesSection />
            <FindUsSection />
        </div>
    );
}

export default Homepage;