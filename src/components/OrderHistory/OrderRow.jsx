import React from 'react';
import Badges from './Badges';
import MenuDropdown from './MenuDropdown';

const OrderRow = ({ order, isSelecting, isRowSelected, handleSelectRow, toggleMenu, menuOpen }) => {
    return (
        <tr
            className={`hover:bg-neutral-focus ${isRowSelected(order.id) ? 'bg-neutral-focus' : ''}`}
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
            <td className="text-center">{order.date}</td>
            <td className="text-center">
                <div className="flex items-center justify-center space-x-3">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://daisyui.com/tailwind-css-component-profile-3@56w.png" alt="Avatar" />
                        </div>
                    </div>
                    <div>{order.customer}</div>
                </div>
            </td>
            <td className="text-center">
                <Badges type="payment" value={order.payment} />
            </td>
            <td className="text-center">{order.total}</td>
            <td className="text-center">{order.items} artículos</td>
            <td className="text-center">
                <Badges type="delivery" value={order.delivery} />
            </td>
            <td className="text-center">
                <Badges type="status" value={order.status} />
            </td>
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
        </tr>
    );
};

export default OrderRow;
