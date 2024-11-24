import React from 'react';
import Badges from './Badges';

const OrderRow = ({ order, isSelecting, isRowSelected = () => false, handleSelectRow = () => {}, toggleMenu = null, menuOpen = false }) => {
    return (
        <tr
            className={`hover:bg-neutral-focus ${isSelecting && isRowSelected(order.id) ? 'bg-neutral-focus' : ''}`}
            onClick={() => isSelecting && handleSelectRow(order.id)}
            style={isSelecting ? { cursor: 'pointer' } : { cursor: 'default' }}
        >
            {isSelecting && (
                <td className="text-center">
                    <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={isRowSelected(order.id)}
                        onChange={() => handleSelectRow(order.id)}
                        onClick={(e) => e.stopPropagation()} 
                    />
                </td>
            )}
            <td className="text-center">{order.id}</td>
            <td className="text-center">
                {new Date(order.fecha).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })}
            </td>

            <td className="text-center">
                <Badges type="payment" value={order.tipoPago} />
            </td>
            <td className="text-center">
                {order.montoTotal ? `$${order.montoTotal.toFixed(2)}` : 'Sin monto'}
            </td>
            <td className="text-center">
                <div
                    className="tooltip tooltip-primary "
                    data-tip={
                        order.productosAdquiridos
                            ?.map(item => `${item.videojuego.titulo} x${item.cantidad}`)
                            .join('\n') 
                    }
                >
                    {order.cantidadArticulos} {order.cantidadArticulos > 1 ? 'artículos' : 'artículo'}
                </div>
            </td>
            <td className="text-center">
                <Badges type="delivery" value={order.tipoEntrega} />
            </td>
            <td className="text-center">
                <Badges type="status" value={order.estadoPedido} />
            </td>
            {toggleMenu && (
                <td className="relative text-center">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleMenu();
                        }}
                        className="btn btn-ghost btn-circle text-primary"
                    >
                        <i className="fas fa-ellipsis-v"></i>
                    </button>

                    {menuOpen && <MenuDropdown />}
                </td>
            )}
        </tr>
    );
};

export default OrderRow;
