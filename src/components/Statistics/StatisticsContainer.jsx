import React from 'react';
import TotalRevenue from './TotalRevenue';
import TopProducts from './TopProducts';
import TopCategories from './TopCategories';
import LatestSales from './LatestSales';

const StatisticsContainer = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3  p-12 min-h-screen w-[1800px]">
            <div className="lg:col-span-2 space-y-8">
                <TotalRevenue />
                <div className="h-full">
                    <LatestSales />
                </div>
            </div>
            <div className="lg:row-span-2 space-y-8">
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
