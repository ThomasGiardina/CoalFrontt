const LatestSales = () => {
    const sales = [
        { product: 'Zelda', date: '11 Octubre', status: 'Recibido', price: '$59.90' },
        { product: 'Dead Cells', date: '11 Octubre', status: 'Recibido', price: '$59.90' },
        { product: 'Call of Duty', date: '11 Octubre', status: 'Recibido', price: '$59.90' },
        { product: 'FC 25', date: '11 Octubre', status: 'Recibido', price: '$59.90' },
        { product: 'Fortnite', date: '11 Octubre', status: 'Recibido', price: '$59.90' },
        { product: 'Mario Bros', date: '11 Octubre', status: 'Recibido', price: '$59.90' },
        { product: 'Mario Bros', date: '11 Octubre', status: 'Recibido', price: '$59.90' },
        { product: 'Mario Bros', date: '11 Octubre', status: 'Recibido', price: '$59.90' },
    ];

    return (
        <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: '#2D3A50' }}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-5">Últimas Ventas</h2>
                <button className="btn">Ver Historial Ventas</button>
            </div>
            <table className="min-w-full text-left text-lg text-gray-600">
            <thead className="border-b text-white">
                <tr>
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Producto</th>
                    <th className="py-3 px-4">Fecha</th>
                    <th className="py-3 px-4">Estado</th>
                    <th className="py-3 px-4">Precio</th>
                </tr>
            </thead>
            <tbody>
                {sales.slice(0, 7).map((sale, index) => (
                    <tr key={index} className="border-b text-lg">
                        <td className="py-4 px-4 text-gray-300">{index + 1}</td>
                        <td className="py-4 px-4 text-gray-300">{sale.product}</td>
                        <td className="py-4 px-4 text-gray-300">{sale.date}</td>
                        <td className="py-4 px-4 text-green-500">{sale.status}</td>
                        <td className="py-4 px-4 text-gray-300">{sale.price}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
};

export default LatestSales;
