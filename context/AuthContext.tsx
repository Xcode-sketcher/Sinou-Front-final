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

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
    [key: string]: unknown;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
}

/**
 * Contexto de Autenticação.
 *
 * Gerencia o estado global de autenticação do usuário, incluindo:
 * - Dados do usuário logado.
 * - Status de carregamento.
 * - Funções de login, registro e logout.
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provedor de Autenticação.
 *
 * Envolve a aplicação para fornecer acesso ao contexto de autenticação.
 * Verifica a sessão atual ao iniciar e gerencia a persistência do token.
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    /**
     * Verifica se o usuário possui uma sessão válida.
     * 
     * @returns Uma promessa que resolve para verdadeiro se autenticado, falso caso contrário.
     */
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

    /**
     * Realiza o login do usuário.
     * 
     * @param data - Dados de login (email, senha).
     */
    const login = async (data: LoginData) => {
        const response = await api.post('/api/auth/login', data);
        if (response.data?.token) {
            localStorage.setItem('authToken', response.data.token);
        }
        await checkAuth();
        router.push('/');
    };

    /**
     * Realiza o registro de um novo usuário.
     * 
     * @param data - Dados de registro.
     */
    const register = async (data: RegisterData) => {
        await api.post('/api/auth/register', data);
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

    /**
     * Realiza o logout do usuário e limpa a sessão.
     */
    const logout = async () => {
        try {
            await api.post('/api/auth/logout');
        } catch (error) {
        } finally {
            localStorage.removeItem('authToken');
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

/**
 * Hook personalizado para acessar o contexto de autenticação.
 * 
 * @returns O contexto de autenticação (user, loading, login, register, logout).
 * @throws Erro se usado fora de um AuthProvider.
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
