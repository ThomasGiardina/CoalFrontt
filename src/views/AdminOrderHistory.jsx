import OrderTable from '../components/OrderHistory/OrderTable';
import OrderHeader from "../components/OrderHistory/OrderHeader"

const AdminOrderHistory = () => {
    return (
        <div className="bg-background min-h-screen p-4 sm:p-6 lg:p-8">
            <OrderHeader />
            <OrderTable />
        </div>
    );
};

export default AdminOrderHistory;
