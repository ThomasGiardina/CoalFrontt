import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // iniciar sesión
    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true); // Actualizamos el estado de autenticación
    };

    // cerrar sesión
    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false); // Actualizamos el estado de autenticación
    };

    useEffect(() => {
        // Comprobar si hay un token en localStorage cuando la app se carga
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true); // Si hay token, el usuario está autenticado
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
