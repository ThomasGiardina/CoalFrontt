import React from 'react';
import OrderTable from '../components/OrderHistory/OrderTable';
import OrderHeader from "../components/OrderHistory/OrderHeader"
import OrderStats from "../components/OrderHistory/OrderStats"

const AdminOrderHistory = () => {
    return (
        <div className="bg-background min-h-screen p-8">
            <OrderHeader />
            <OrderStats />
            <OrderTable />
        </div>
    );
};

export default AdminOrderHistory;
