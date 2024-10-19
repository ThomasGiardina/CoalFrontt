import React from 'react';

const MenuDropdown = () => {
    return (
        <ul className="menu bg-neutral shadow-lg rounded-box absolute right-0 mt-2 z-50 w-48">
            <li className="hover:bg-primary hover:text-white">
                <a>Enviar mensaje</a>
            </li>
            <li className="hover:bg-error hover:text-white">
                <a>Eliminar</a>
            </li>
        </ul>
    );
};

export default MenuDropdown;
