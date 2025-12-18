import Badges from './Badges';

const UserOrderRow = ({ order }) => {
    return (
        <tr className="hover:bg-neutral-focus">
            <td className="text-center text-xs sm:text-sm">{order.id}</td>
            <td className="text-center text-xs sm:text-sm">
                {new Date(order.fecha).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })}
            </td>
            <td className="text-center text-xs sm:text-sm">
                <Badges type="payment" value={order.tipoPago} />
            </td>
            <td className="text-center text-xs sm:text-sm">
                {order.montoTotal ? `$${order.montoTotal.toFixed(2)}` : 'Sin monto'}
            </td>
            <td className="text-center text-xs sm:text-sm">
                <div
                    className="tooltip tooltip-primary"
                    data-tip={
                        order.productosAdquiridos?.length
                            ? order.productosAdquiridos
                                .map((item) => `${item.titulo} x${item.cantidad}`)
                                .join(' ; ')
                            : 'No hay productos en esta orden'
                    }
                >
                    {order.cantidadArticulos} {order.cantidadArticulos > 1 ? 'artículos' : 'artículo'}
                </div>
            </td>
            <td className="text-center text-xs sm:text-sm">
                <Badges type="delivery" value={order.tipoEntrega} />
            </td>
            <td className="text-center text-xs sm:text-sm">
                <Badges type="status" value={order.estadoPedido} />
            </td>
        </tr>
    );
};

export default UserOrderRow;
