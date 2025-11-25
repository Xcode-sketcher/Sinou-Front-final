import CardLogin from "@/components/forms/auth/CardLogin";
import CustomCursor  from "@/components/ui/pointer";

/**
 * Página de Autenticação (Login)
 *
 * Esta página apresenta o formulário de login para usuários existentes
 * no sistema Sinout. Gerencia a autenticação e redirecionamento
 * baseado no status do usuário.
 *
 * Funcionalidades:
 * - Formulário de login com email/senha
 * - Validação de credenciais
 * - Lembrar-me (persistência de sessão)
 * - Recuperação de senha (link para reset)
 * - Redirecionamento automático após login
 * - Tratamento de erros de autenticação
 *
 * Fluxo de autenticação:
 * - Usuário acessa /login
 * - Sistema verifica se já está logado
 * - Se não, apresenta formulário
 * - Valida credenciais via API
 * - Define tokens de autenticação
 * - Redireciona para dashboard ou página anterior
 *
 * Estados possíveis:
 * - Não autenticado: mostra formulário
 * - Autenticado: redireciona automaticamente
 * - Carregando: mostra spinner
 * - Erro: exibe mensagem de erro
 *
 * Segurança implementada:
 * - Proteção contra brute force
 * - Validação server-side
 * - Tokens JWT seguros
 * - Sessões com expiração
 * - Logout automático em inatividade
 *
 * @component
 * @returns {JSX.Element} Página completa com formulário de login
 */
export default function LoginPage() {
    return(
        <>
        <header>
            <title>Sinout - Login</title>
        </header>
            <CardLogin />;
            <CustomCursor />
        </>
    ) 
        
}
