import CardRegister from "@/components/forms/auth/CardRegister";
import CustomCursor  from "@/components/ui/pointer";

/**
 * Página de Registro de Novos Usuários
 *
 * Esta página apresenta o formulário de cadastro para novos usuários
 * do sistema Sinout. Permite a criação de contas com validação
 * completa e verificação de dados.
 *
 * Funcionalidades:
 * - Formulário de registro completo
 * - Validação em tempo real dos campos
 * - Verificação de força da senha
 * - Confirmação de email
 * - Termos de uso e política de privacidade
 * - Proteção contra bots (CAPTCHA)
 * - Feedback visual de validação
 *
 * Campos obrigatórios:
 * - Nome completo
 * - Email válido
 * - Senha forte (mínimo 8 caracteres)
 * - Confirmação de senha
 * - Aceitação dos termos
 *
 * Fluxo de navegação:
 * - Usuário acessa /register
 * - Preenche e valida formulário
 * - Sistema cria conta e envia email de confirmação
 * - Redirecionamento para /login com instruções
 *
 * Validações implementadas:
 * - Email único no sistema
 * - Senha com requisitos de segurança
 * - Dados obrigatórios preenchidos
 * - Formato correto de email
 *
 * @component
 * @returns {JSX.Element} Página completa com formulário de registro
 */
export default function RegisterPage() {
    return(
        <>
        <header>
            <title>Sinout - Cadastre-se</title>
        </header>
            <CardRegister />;
            <CustomCursor />
        </>
    )
    
}
