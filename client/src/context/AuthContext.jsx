import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const response = await api.get('/user');
                    setUser(response.data.data.user);
                } catch (error) {
                    console.error('Failed to fetch user', error);
                    localStorage.removeItem('access_token');
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = async (credentials) => {
        try {
            const response = await api.post('/login', credentials);
            localStorage.setItem('access_token', response.data.data.access_token);
            setUser(response.data.data.user);
        } catch (error) {
            throw new Error(error.response?.data?.message || 'بيانات الدخول غير صحيحة');
        }
    };

    const register = async (data) => {
        try {
            const response = await api.post('/register', data);
            localStorage.setItem('access_token', response.data.data.access_token);
            setUser(response.data.data.user);
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Registration failed');
        }
    };

    const logout = async () => {
        await api.post('/logout');
        localStorage.removeItem('access_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
