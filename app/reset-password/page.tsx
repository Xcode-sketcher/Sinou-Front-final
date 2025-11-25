import CardResetPassword from "@/components/forms/auth/CardResetPassword";
import CustomCursor  from "@/components/ui/pointer";

/**
 * Página de Solicitação de Reset de Senha
 *
 * Esta página apresenta o formulário para solicitação de reset de senha
 * no sistema Sinout. Permite que usuários solicitem uma redefinição
 * de senha através do email cadastrado.
 *
 * Funcionalidades:
 * - Formulário de solicitação por email
 * - Validação de email
 * - Envio de link de reset
 * - Feedback visual de sucesso/erro
 * - Design responsivo e acessível
 *
 * Fluxo de navegação:
 * - Usuário acessa /reset-password
 * - Preenche email e solicita reset
 * - Sistema envia email com link
 * - Redirecionamento para /reset-password/new com token
 *
 * @component
 * @returns {JSX.Element} Página completa com formulário de reset
 */
export default function ResetPasswordPage() {
    return(
        <>
        <header>
            <title>Sinout - Redefinir Senha</title>
        </header>
            <CardResetPassword />;
            <CustomCursor />
        </>
    )
    
}
