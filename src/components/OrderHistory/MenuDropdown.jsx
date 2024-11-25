import React, { useState, useEffect } from 'react';


const MenuDropdown = ({ buttonRef, onSendMessage, onDelete, onConfirm }) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });

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
                    onConfirm && onConfirm();
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
