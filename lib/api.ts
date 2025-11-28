import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Cliente HTTP Axios configurado para a aplicação Sinout
 *
 * Este módulo fornece um cliente HTTP totalmente configurado com:
 * - Base URL automática baseada no ambiente
 * - Interceptors para logging detalhado em desenvolvimento
 * - Tratamento inteligente de erros
 * - Suporte a autenticação por cookies
 * - Configuração otimizada para SSR/SSG
 *
 * @module api
 */

/**
 * Instância configurada do Axios para comunicação com APIs
 *
 * Configurações aplicadas:
 * - Base URL dinâmica (desenvolvimento vs produção)
 * - Suporte a cookies para autenticação
 * - Headers padrão para JSON
 * - Timeouts apropriados
 * - Configuração CORS
 */
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || (typeof window !== 'undefined' ? '/' : 'http://localhost:3000'),
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Instância separada para a API de processamento facial
 */
export const processingApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_PROCESSING_API_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Interceptor de requisições - Logging detalhado e autenticação
 *
 * Registra todas as requisições HTTP com informações completas:
 * - Método HTTP utilizado
 * - URL completa da requisição
 * - Dados enviados (se aplicável)
 * - Parâmetros de query
 * - Adiciona token JWT automaticamente
 *
 * Útil para debugging e monitoramento em desenvolvimento.
 */
/**
 * Interceptor de requisições - Autenticação
 *
 * Adiciona o token JWT automaticamente ao cabeçalho Authorization
 * de todas as requisições, se estiver disponível no localStorage.
 */
const addAuth = (config: InternalAxiosRequestConfig) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

api.interceptors.request.use(addAuth, (error) => {
    return Promise.reject(error);
});

processingApi.interceptors.request.use(addAuth, (error) => {
    return Promise.reject(error);
});

/**
 * Interceptor de respostas - Tratamento padronizado
 *
 * Retorna a resposta diretamente se bem-sucedida.
 */
const handleResponse = (response: AxiosResponse) => {
    return response;
};

const handleError = (error: unknown) => {
    // Mantém o tratamento de erro silencioso para endpoints de autenticação
    // para evitar poluição no console do navegador em casos esperados (ex: 401)
    return Promise.reject(error);
};

api.interceptors.response.use(handleResponse, handleError);
processingApi.interceptors.response.use(handleResponse, handleError);

export default api;
