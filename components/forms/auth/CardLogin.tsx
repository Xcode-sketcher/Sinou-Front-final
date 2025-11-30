"use client";
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import AuthLogo from './AuthLogo';
import { Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';


interface LoginFormData {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
}

interface PasswordValidation {
    minLength: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
}

/**
 * Componente de Login (CardLogin)
 *
 * Formulário de autenticação de usuários.
 * Gerencia o login de cuidadores no sistema.
 *
 * Funcionalidades:
 * - Validação de email e senha
 * - Feedback visual de erros
 * - Integração com AuthContext
 * - Redirecionamento após login
 */
const CardLogin: React.FC = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePasswordStrength = (password: string): PasswordValidation => {
        return {
            minLength: password.length >= 8,
            hasUpperCase: /[A-Z]/.test(password),
            hasLowerCase: /[a-z]/.test(password),
            hasNumber: /[0-9]/.test(password),
            hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
        };
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors: FormErrors = {};

        // Validação de email
        if (!formData.email) {
            newErrors.email = 'Por favor, insira seu e-mail';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'E-mail inválido. Use o formato: exemplo@email.com';
        }

        // Validação de senha
        if (!formData.password) {
            newErrors.password = 'Por favor, insira sua senha';
        } else {
            const validation = validatePasswordStrength(formData.password);

            if (!validation.minLength) {
                newErrors.password = 'A senha deve ter no mínimo 8 caracteres';
            } else if (!validation.hasUpperCase) {
                newErrors.password = 'A senha deve conter pelo menos uma letra maiúscula';
            } else if (!validation.hasLowerCase) {
                newErrors.password = 'A senha deve conter pelo menos uma letra minúscula';
            } else if (!validation.hasNumber) {
                newErrors.password = 'A senha deve conter pelo menos um número';
            } else if (!validation.hasSpecialChar) {
                newErrors.password = 'A senha deve conter pelo menos um caractere especial (!@#$%^&*...)';
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            if (newErrors.email) {
                emailRef.current?.focus();
            } else if (newErrors.password) {
                passwordRef.current?.focus();
            }
            return;
        }

        setIsLoading(true);

        try {
            await login(formData);
        } catch {
            // Registra falha de autenticação e mantém mensagem genérica para o usuário
            setErrors({ email: 'Falha no login. Verifique suas credenciais.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
            {/* Gradientes de fundo para efeito visual sutil */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

            <button
                type="button"
                className="absolute top-6 left-6 p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => router.push('/')}
                aria-label="Voltar"
                title="Voltar"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>

            <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-2xl relative z-10">
                {/* Logo */}
                <AuthLogo />

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Login</h1>
                    <p className="text-muted-foreground">Acesse sua conta para continuar</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground">E-mail</label>
                        <input
                            ref={emailRef}
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="exemplo@email.com"
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-purple-500'} text-foreground placeholder-muted-foreground outline-none transition-all`}
                            aria-invalid={!!errors.email}
                            autoComplete="email"
                            required
                        />
                        {errors.email && (
                            <span className="text-sm text-red-400 flex items-center gap-1">
                                ⚠️ {errors.email}
                            </span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-foreground">Senha</label>
                        <div className="relative">
                            <input
                                ref={passwordRef}
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="••••••••"
                                className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-purple-500'} text-foreground placeholder-muted-foreground outline-none transition-all pr-12`}
                                aria-invalid={!!errors.password}
                                autoComplete="current-password"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold shadow-lg shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Entrando...
                            </>
                        ) : (
                            'Entrar'
                        )}
                    </button>
                </form>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                    <Link href="/reset-password" className="text-purple-400 hover:text-purple-300 transition-colors">
                        Esqueci minha senha
                    </Link>
                    <span className="hidden sm:inline text-muted-foreground">•</span>
                    <Link href="/register" className="text-purple-400 hover:text-purple-300 transition-colors">
                        Criar conta
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CardLogin;