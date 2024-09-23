import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        const authToken = localStorage.getItem('token');
        if (userData) {
            setUser(JSON.parse(userData));
        }
        if (authToken) {
            setToken(authToken);
        }
    }, []);

    const login = (userData, authToken) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', authToken);
        setUser(userData);
        setToken(authToken);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
