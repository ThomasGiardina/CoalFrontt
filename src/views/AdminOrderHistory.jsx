import OrderTable from '../components/OrderHistory/OrderTable';
import OrderHeader from "../components/OrderHistory/OrderHeader"

const AdminOrderHistory = () => {
    return (
        <div className="min-h-screen bg-base-300">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
                <OrderHeader />
                <OrderTable />
            </div>
        </div>
    );
};

export default AdminOrderHistory;
