import UserOrderTable from '../components/OrderHistory/UserOrderTable';

const UserOrderHistory = () => {
    const orders = [
        { id: '#1002', date: '11 Feb, 2024', payment: 'Débito', total: '$20.00', items: 2, delivery: 'Delivery', status: 'Completado' },
        { id: '#1004', date: '13 Feb, 2024', payment: 'Crédito', total: '$22.00', items: 3, delivery: 'Retiro local', status: 'Completado' },
        { id: '#1009', date: '17 Feb, 2024', payment: 'Crédito', total: '$27.00', items: 5, delivery: 'Retiro local', status: 'Completado' },
    ];

    return (
        <div className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mt-6 sm:mt-10 mb-4 sm:mb-6">Historial de Pedidos</h1>
            <UserOrderTable orders={orders} />
        </div>
    );
};

export default UserOrderHistory;
