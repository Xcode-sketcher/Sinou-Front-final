"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    patientId?: string;
    patientName?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (data: any) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const checkAuth = async (): Promise<boolean> => {
        try {
            const response = await api.get('/api/users/me');
            setUser(response.data);
            return true;
        } catch (error) {
            setUser(null);
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (data: any) => {
        await api.post('/api/auth/login', data);
        await checkAuth();
        router.push('/');
    };

    const register = async (data: any) => {
        await api.post('/api/auth/register', data);
        // Tenta verificar se o registro já logou o usuário
        try {
            const isAuthenticated = await checkAuth();
            if (isAuthenticated) {
                router.push('/');
            } else {
                router.push('/login');
            }
        } catch (e) {
            router.push('/login');
        }
    };

    const logout = async () => {
        try {
            await api.post('/api/auth/logout');
        } catch (error) {
            console.error('Erro no logout:', error);
        } finally {
            setUser(null);
            router.push('/login');
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
