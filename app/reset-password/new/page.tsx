import CardNewPassword from "@/components/forms/auth/CardNewPassword";

/**
 * Página de Redefinição de Senha
 *
 * Esta página permite que usuários definam uma nova senha após
 * receberem o link de reset por email. O token de reset é validado
 * automaticamente para garantir segurança.
 *
 * Funcionalidades:
 * - Validação do token de reset (via URL)
 * - Formulário de nova senha
 * - Confirmação de senha
 * - Requisitos de segurança da senha
 * - Feedback visual de validação
 * - Redirecionamento automático após sucesso
 *
 * Fluxo de navegação:
 * - Usuário clica no link do email
 * - Sistema valida token e redireciona para /reset-password/new
 * - Usuário define nova senha
 * - Redirecionamento para /login com confirmação
 *
 * Segurança:
 * - Token de reset com expiração
 * - Validação server-side
 * - Proteção contra reutilização de tokens
 * - Hashing seguro de senhas
 *
 * @component
 * @returns {JSX.Element} Página completa com formulário de nova senha
 */
export default function NewPasswordPage() {
    return <CardNewPassword />;
}
