import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

const MenuDropdown = ({ buttonRef, pedidoId, onSendMessage, onDelete, onConfirm }) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (buttonRef?.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const menuWidth = 192; 
            setPosition({
                top: rect.bottom + window.scrollY, 
                left: rect.left + window.scrollX + rect.width / 2 - menuWidth / 2, 
            });
        }
    }, [buttonRef]);

    const handleConfirm = async () => {
        if (!pedidoId) {
            console.error('Pedido no está definido');
            return;
        }

        try {
            const response = await fetch(`http://localhost:4002/api/pedidos/${pedidoId}/confirmar`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al confirmar el pedido');
            }

            const updatedPedido = await response.json();
            console.log('Pedido confirmado:', updatedPedido);
            onConfirm && onConfirm(updatedPedido);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <ul
            className="menu bg-primary shadow-lg rounded-box fixed z-50 w-48"
            style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <li
                className="text-neutral hover:bg-primary hover:text-white"
                onClick={(e) => {
                    e.stopPropagation();
                    onSendMessage && onSendMessage();
                }}
            >
                <button>Enviar mensaje</button>
            </li>
            <li
                className="text-neutral hover:bg-warning hover:text-white"
                onClick={(e) => {
                    e.stopPropagation();
                    handleConfirm();
                }}
            >
                <button>Confirmar pedido</button>
            </li>
            <li
                className="text-neutral hover:bg-error hover:text-white"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete && onDelete();
                }}
            >
                <button>Eliminar</button>
            </li>
        </ul>
    );
};

export default MenuDropdown;
