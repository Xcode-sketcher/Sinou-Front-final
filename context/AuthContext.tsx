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
    profilePhoto?: number;
    patient?: {
        id: string;
        fotoPerfil?: number;
        [key: string]: any;
    };
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
    refreshUser: () => Promise<boolean>;
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
            let userData = response.data;

            // Se o usuário possuir um patientId, busca os dados mais recentes do paciente
            const patientId = userData.patientId || userData.patient?.id || userData.patient?._id;

            if (patientId) {
                try {
                    // Busca dados atualizados do paciente para manter o avatar sincronizado
                    // Adiciona timestamp para evitar cache
                    const patientResponse = await api.get(`/api/patients/${patientId}?t=${new Date().getTime()}`);

                    // Mescla os dados atualizados do paciente no objeto do usuário
                    const freshPatientData = patientResponse.data;

                    // Determina o índice do avatar a partir dos dados atualizados
                    // Prioriza 'profilePhoto' conforme a documentação da API
                    const avatarIndex = freshPatientData.profilePhoto || freshPatientData.fotoPerfil || freshPatientData.foto_perfil;

                    userData = {
                        ...userData,
                        // Map the patient avatar to the top-level profilePhoto for easier access
                        profilePhoto: avatarIndex,
                        patient: {
                            ...userData.patient,
                            ...freshPatientData,
                            // Ensure id is consistent if backend returns _id
                            id: freshPatientData._id || freshPatientData.id || patientId,
                            // Ensure profilePhoto is consistent
                            profilePhoto: avatarIndex,
                            fotoPerfil: avatarIndex, // Backward compatibility
                            foto_perfil: avatarIndex // Backward compatibility
                        }
                    };
                } catch (patientError) {
                    // Falha ao buscar dados do paciente — mantém os dados existentes
                }
            }

            // Gera uma nova referência de objeto para garantir que o React detecte a alteração
            setUser({ ...userData });
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
        <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser: checkAuth }}>
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
