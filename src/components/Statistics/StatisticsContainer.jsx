import TotalRevenue from './TotalRevenue';
import TopProducts from './TopProducts';
import TopCategories from './TopCategories';
import LatestSales from './LatestSales';
import { FaChartLine } from 'react-icons/fa';

const StatisticsContainer = () => {
    return (
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
            <div className="flex items-center gap-3 mb-8">
                <FaChartLine className="text-primary text-2xl sm:text-3xl" />
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Estadísticas</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <TotalRevenue />
                    <LatestSales />
                </div>
                <div className="space-y-6">
                    <TopCategories />
                    <TopProducts />
                </div>
            </div>
        </div>
    );
};

export default StatisticsContainer;
