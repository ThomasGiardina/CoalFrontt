import React from 'react';

const MenuDropdown = ({ buttonRef, onSendMessage, onDelete, onConfirm }) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY, // Calcula la posición vertical dinámica
                left: rect.left + window.scrollX,  // Calcula la posición horizontal dinámica
            });
        }
    }, [buttonRef]);

    return (
        <ul
            className="menu bg-neutral shadow-lg rounded-box fixed z-50 w-48"
            style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
        >

            <li
                className="hover:bg-primary hover:text-white"
                onClick={(e) => {
                    e.stopPropagation();
                    onSendMessage && onSendMessage();
                }}
            >
                <button>Enviar mensaje</button>
            </li>
            <li
                className="hover:bg-warning hover:text-white"
                onClick={(e) => {
                    e.stopPropagation();
                    onConfirm && onConfirm();
                }}
            >
                <button>Confirmar pedido</button>
            </li>
            <li
                className="hover:bg-error hover:text-white"
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
