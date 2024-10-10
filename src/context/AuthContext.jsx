import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // iniciar sesión
    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true); 
    };

    // cerrar sesión
    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false); 
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true); 
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
