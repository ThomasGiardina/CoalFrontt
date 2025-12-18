import TotalRevenue from './TotalRevenue';
import TopProducts from './TopProducts';
import TopCategories from './TopCategories';
import LatestSales from './LatestSales';

const StatisticsContainer = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-12 min-h-screen w-full max-w-[1800px] mx-auto">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
                <TotalRevenue />
                <LatestSales />
            </div>
            <div className="lg:row-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
                <div className="w-full max-w-sm mx-auto">
                    <TopCategories />
                </div>
                <div className="w-full max-w-sm mx-auto">
                    <TopProducts />
                </div>
            </div>
        </div>
    );
};

export default StatisticsContainer;
