import { lazy, Suspense } from 'react';
import Homehero from "../components/HomePage/HomeHero";
import Homeimg from "../components/HomePage/Homeimg";

const ConsolesSection = lazy(() => import("../components/HomePage/ConsolesSection"));
const FindUsSection = lazy(() => import("../components/HomePage/FindUsSection"));
const WhyCoalSection = lazy(() => import('../components/HomePage/WhyCoalSection'));

const SectionLoader = () => (
    <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
);

function Homepage() {
    return (
        <div className="relative flex flex-col bg-background">
            {/* Hero Section - Full viewport height minus navbar */}
            <section className="min-h-[calc(100vh-64px)] w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-0 gap-6 lg:gap-10">
                <div className="w-full lg:w-2/5 flex items-center justify-center order-2 lg:order-1">
                    <Homehero />
                </div>
                <div className="w-full lg:w-3/5 flex justify-center items-center order-1 lg:order-2">
                    <Homeimg />
                </div>
            </section>

            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <Suspense fallback={<SectionLoader />}>
                    <ConsolesSection />
                </Suspense>
                <Suspense fallback={<SectionLoader />}>
                    <WhyCoalSection />
                </Suspense>
                <Suspense fallback={<SectionLoader />}>
                    <FindUsSection />
                </Suspense>
            </div>
        </div>
    );
}

export default Homepage;
