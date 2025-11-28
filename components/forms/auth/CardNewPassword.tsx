"use client";

import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";

/**
 * Componente de Nova Senha (CardNewPassword).
 *
 * Formulário para redefinição de senha após recuperação.
 * Permite que o usuário defina uma nova senha segura.
 *
 * Funcionalidades:
 * - Validação de senha e confirmação.
 * - Feedback visual de sucesso.
 * - Redirecionamento para login.
 */
const CardNewPassword = () => {
    const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
    const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    /**
     * Gerencia as alterações nos campos de entrada.
     * Atualiza o estado do formulário e limpa erros associados ao campo modificado.
     * 
     * @param e - Evento de mudança do input.
     */
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    /**
     * Gerencia o envio do formulário de redefinição de senha.
     * Realiza validações de campos obrigatórios e igualdade de senhas.
     * Simula o processo de redefinição com feedback visual.
     * 
     * @param e - Evento de submissão do formulário.
     */
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const newErrors: typeof errors = {};
        if (!formData.password) newErrors.password = 'Por favor, insira a nova senha';
        else if (formData.password.length < 8) newErrors.password = 'A senha deve ter no mínimo 8 caracteres';
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Por favor, confirme a nova senha';
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            if (newErrors.password) passwordRef.current?.focus();
            else if (newErrors.confirmPassword) confirmRef.current?.focus();
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert('✅ Sua senha foi redefinida com sucesso. Faça login com a nova senha.');
            router.push('/login');
        }, 1100);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

            <button
                type="button"
                className="absolute top-6 left-6 p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => router.back()}
                aria-label="Voltar"
                title="Voltar"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>

            <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-2xl relative z-10">
                <div className="flex justify-center mb-8">
                    <div className="relative w-16 h-16">
                        <Image src="/Logo.svg" alt="Logo" fill className="object-contain" />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Nova senha</h1>
                    <p className="text-muted-foreground">Escolha uma nova senha para sua conta</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-foreground">Senha</label>
                        <div className="relative">
                            <input
                                ref={passwordRef}
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-purple-500'} text-foreground placeholder-muted-foreground outline-none transition-all pr-12`}
                                aria-invalid={!!errors.password}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => setShowPassword((s) => !s)}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.password && <span className="text-sm text-red-400 flex items-center gap-1">⚠️ {errors.password}</span>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirmar senha</label>
                        <div className="relative">
                            <input
                                ref={confirmRef}
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirm ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.confirmPassword ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-purple-500'} text-foreground placeholder-muted-foreground outline-none transition-all pr-12`}
                                aria-invalid={!!errors.confirmPassword}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => setShowConfirm((s) => !s)}
                            >
                                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.confirmPassword && <span className="text-sm text-red-400 flex items-center gap-1">⚠️ {errors.confirmPassword}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold shadow-lg shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Redefinindo...
                            </>
                        ) : (
                            'Redefinir senha'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CardNewPassword;
