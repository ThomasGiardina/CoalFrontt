import { useEffect, useRef } from 'react';
import Badges from './Badges';
import { useSelector } from "react-redux";
import Swal from "sweetalert2";


const AdminOrderRow = ({
    order,
    isSelecting,
    isRowSelected,
    menuOpenId,
    setMenuOpenId,
    onSendMessage,
    onCancel,
    onConfirm,
    handleSelectRow
}) => {
    const rowRef = useRef(null);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuOpenId === order.id && rowRef.current && !rowRef.current.contains(event.target)) {
                setMenuOpenId(null);
            }
        };

        const handleScroll = () => {
            if (menuOpenId === order.id) {
                setMenuOpenId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [menuOpenId, order.id, setMenuOpenId]);

    const handleStatusChange = async (pedidoId, newStatus) => {
        try {
            const endpoint =
                newStatus === 'CONFIRMADO'
                    ? `http://localhost:4002/api/pedidos/${pedidoId}/confirmar`
                    : `http://localhost:4002/api/pedidos/${pedidoId}/pendiente`;

            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const updatedPedido = await response.json();
                onConfirm && onConfirm(updatedPedido);
            } else {
                console.error(`Error al cambiar el estado a ${newStatus}:`, response.statusText);
            }
        } catch (error) {
            console.error(`Error al realizar la solicitud: ${error.message}`);
        }
    };

    const handleCancel = async (pedidoId) => {
        const MySwal = Swal.mixin({
            customClass: {
                popup: 'custom-toast',
                title: 'text-white',
            },
            background: '#1D1F23',
            color: '#fff',
        });

        const result = await MySwal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción cancelará el pedido y no se puede revertir.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF6828',
            cancelButtonColor: '#374151',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No, volver',
            reverseButtons: true,
            background: '#1D1F23',
            customClass: {
                popup: 'custom-toast',
                title: 'text-white',
            },
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:4002/api/pedidos/${pedidoId}/cancelar`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(errorMessage || 'Hubo un problema al cancelar el pedido.');
                }

                const updatedPedido = await response.json();
                onCancel && onCancel(updatedPedido);

                await MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'El pedido ha sido cancelado con éxito.',
                    showConfirmButton: false,
                    timer: 4000,
                    background: '#1D1F23',
                    customClass: {
                        popup: 'custom-toast',
                        title: 'text-white',
                    },
                });
            } catch (error) {
                await MySwal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: error.message,
                    showConfirmButton: false,
                    timer: 4000,
                    background: '#1D1F23',
                    customClass: {
                        popup: 'custom-toast',
                        title: 'text-white',
                    },
                });
            }
        }
    };

    return (
        <tr
            ref={rowRef}
            className={`hover:bg-neutral-focus border-b border-[#2a2b2e]/50 ${isSelecting && isRowSelected(order.id) ? 'bg-neutral-focus' : ''}`}
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
            <td className="text-center text-xs sm:text-sm">{order.id}</td>
            <td className="text-center text-xs sm:text-sm">
                {new Date(order.fecha).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })}
            </td>
            <td className="text-center text-xs sm:text-sm break-words">{order.cliente}</td>
            <td className="text-center text-xs sm:text-sm">
                <Badges type="payment" value={order.tipoPago} />
            </td>
            <td className="text-center text-xs sm:text-sm">
                {order.montoTotal ? `$${order.montoTotal.toFixed(2)}` : 'Sin monto'}
            </td>
            <td className="text-center text-xs sm:text-sm hidden md:table-cell">
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
                    {order.cantidadArticulos} {order.cantidadArticulos > 1 ? 'art.' : 'art.'}
                </div>
            </td>

            <td className="text-center text-xs sm:text-sm hidden lg:table-cell">
                <Badges type="delivery" value={order.tipoEntrega} />
            </td>
            <td className="text-center text-xs sm:text-sm">
                <Badges type="status" value={order.estadoPedido} />
            </td>
            <td className="relative text-center">
                <div className="dropdown dropdown-end dropdown-top">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle btn-sm text-primary"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <i className="fas fa-ellipsis-v"></i>
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-neutral shadow-xl rounded-box w-48 z-[100] border border-[#2a2b2e]"
                    >
                        <li>
                            <button
                                className="text-text hover:bg-blue-600 hover:text-white"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSendMessage(order);
                                }}
                            >
                                Enviar mensaje
                            </button>
                        </li>
                        {order.estadoPedido !== "CANCELADO" && (
                            <>
                                <li>
                                    <button
                                        className={`text-text hover:text-white ${order.estadoPedido === "CONFIRMADO"
                                            ? "hover:bg-yellow-700"
                                            : "hover:bg-green-700"
                                            }`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const newStatus =
                                                order.estadoPedido === "CONFIRMADO"
                                                    ? "PENDIENTE"
                                                    : "CONFIRMADO";
                                            handleStatusChange(order.id, newStatus);
                                        }}
                                    >
                                        {order.estadoPedido === "CONFIRMADO"
                                            ? "Cambiar a pendiente"
                                            : "Confirmar pedido"}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="text-text hover:bg-error hover:text-white"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCancel(order.id);
                                        }}
                                    >
                                        Cancelar pedido
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </td>
        </tr>
    );
};

export default AdminOrderRow;
