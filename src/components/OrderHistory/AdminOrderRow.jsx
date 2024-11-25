import React, { useEffect, useRef } from 'react';
import Badges from './Badges';
import MenuDropdown from './MenuDropdown';

const AdminOrderRow = ({ 
    order, 
    isSelecting, 
    menuOpenId, 
    setMenuOpenId, 
    onSendMessage, 
    onDelete, 
    onConfirm 
}) => {
    const rowRef = useRef(null);
    const buttonRef = useRef(null); // Nuevo ref agregado


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuOpenId === order.id && rowRef.current && !rowRef.current.contains(event.target)) {
                setMenuOpenId(null); // Close menu when clicking outside
            }
        };
    
        const handleScroll = () => {
            if (menuOpenId === order.id) {
                setMenuOpenId(null); // Close menu on scroll
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [menuOpenId, order.id, setMenuOpenId]);
    

    const toggleMenu = (e) => {
        e.stopPropagation();
        if (menuOpenId === order.id) {
            setMenuOpenId(null);
        } else {
            setMenuOpenId(order.id);
        }
    };               

    return (
        <tr
            ref={rowRef}
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
            <td className="text-center">{order.cliente}</td>
            <td className="text-center">
                <Badges type="payment" value={order.tipoPago} />
            </td>
            <td className="text-center">
                {order.montoTotal ? `$${order.montoTotal.toFixed(2)}` : 'Sin monto'}
            </td>
            <td className="text-center">
                <div
                    className="tooltip tooltip-primary"
                    data-tip={
                        order.productosAdquiridos?.length
                            ? order.productosAdquiridos
                                .map((item) => `${item.titulo} x${item.cantidad}`)
                                .join('\n')
                            : 'No hay productos en esta orden'
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
            <td className="relative text-center">
                <button
                    ref={buttonRef} // Referencia para calcular la posición dinámica
                    className="btn btn-ghost btn-circle text-primary"
                    onClick={toggleMenu}
                >
                    <i className="fas fa-ellipsis-v"></i>
                </button>
                {menuOpenId === order.id && (
                    <MenuDropdown
                        onSendMessage={() => onSendMessage(order)}
                        onDelete={() => onDelete(order)}
                        onConfirm={() => onConfirm(order)}
                        closeMenu={() => setMenuOpenId(null)}
                    />
                )}
            </td>
        </tr>
    );
};

export default AdminOrderRow;
