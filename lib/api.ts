import axios from 'axios';

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
    baseURL: typeof window !== 'undefined' ? '/' : process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sinout-back.onrender.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Interceptor de requisições - Logging detalhado
 *
 * Registra todas as requisições HTTP com informações completas:
 * - Método HTTP utilizado
 * - URL completa da requisição
 * - Dados enviados (se aplicável)
 * - Parâmetros de query
 *
 * Útil para debugging e monitoramento em desenvolvimento.
 */
api.interceptors.request.use(
    (config) => {
        // console.log('🚀 API Request:', {
        //     method: config.method?.toUpperCase(),
        //     url: config.url,
        //     baseURL: config.baseURL,
        //     fullURL: `${config.baseURL}${config.url}`,
        //     data: config.data,
        //     params: config.params
        // });
        return config;
    },
    (error) => {
        // console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

/**
 * Interceptor de respostas - Tratamento padronizado
 *
 * Processa todas as respostas HTTP com:
 * - Logging de sucesso em desenvolvimento
 * - Tratamento inteligente de erros
 * - Categorização de tipos de erro
 * - Mensagens de erro amigáveis
 */
api.interceptors.response.use(
    (response) => {
        // console.log('✅ API Response:', {
        //     url: response.config.url,
        //     status: response.status,
        //     data: response.data
        // });
        return response;
    },
    (error) => {
        // Tratamento especial para erros de autenticação
        // Evita logging excessivo de erros esperados (401 em endpoints de auth)
        const isAuthRelatedEndpoint = error.config?.url?.includes('/api/auth/') ||
            error.config?.url?.includes('/api/users/me') ||
            error.config?.url?.includes('/api/patient/');
        const isUnauthorized = error.response?.status === 401;

        if (!(isAuthRelatedEndpoint && isUnauthorized)) {
            // console.error('❌ API Error:', {
            //     url: error.config?.url,
            //     status: error.response?.status,
            //     statusText: error.response?.statusText,
            //     data: error.response?.data,
            //     message: error.message
            // });

            // Fornece mensagens de erro mais específicas baseadas no tipo
            if (error.response) {
                // Servidor respondeu com erro
                const message = error.response.data?.message || error.response.statusText;
                // console.error(`Server Error (${error.response.status}):`, message);
            } else if (error.request) {
                // Requisição feita mas sem resposta
                // console.error('Network Error: No response received from server. Is the backend running?');
            } else {
                // Erro na configuração da requisição
                // console.error('Request Error:', error.message);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
