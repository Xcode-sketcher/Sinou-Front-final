"use client";
import React, { useState, useRef } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';

/**
 * Componente de Redefinição de Senha (CardResetPassword)
 *
 * Formulário inicial para recuperação de senha.
 * Solicita o email do usuário para envio do link de recuperação.
 *
 * Funcionalidades:
 * - Validação de email
 * - Simulação de envio de email
 * - Feedback visual
 */
const CardResetPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (error) setError(null);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) {
            setError('Por favor, insira seu e-mail');
            emailRef.current?.focus();
            return;
        }
        if (!validateEmail(email)) {
            setError('E-mail inválido');
            emailRef.current?.focus();
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert(`✅ Enviamos um link de redefinição para ${email}. Verifique sua caixa de entrada.`);
            setEmail('');
            router.push('/reset-password/new');
        }, 1100);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
            {/* Background Gradients */}
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
                    <h1 className="text-3xl font-bold text-foreground mb-2">Redefinir senha</h1>
                    <p className="text-muted-foreground">Digite seu e-mail e enviaremos um link para redefinir sua senha</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    <div className="space-y-2">
                        <label htmlFor="reset-email" className="text-sm font-medium text-foreground">E-mail</label>
                        <input
                            ref={emailRef}
                            id="reset-email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="seu@email.com"
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${error ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-purple-500'} text-foreground placeholder-muted-foreground outline-none transition-all`}
                            aria-invalid={!!error}
                            autoComplete="email"
                            required
                        />
                        {error && <span className="text-sm text-red-400 flex items-center gap-1">⚠️ {error}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold shadow-lg shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Enviando...
                            </>
                        ) : (
                            'Enviar link'
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link href="/login" className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
                        Voltar ao login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CardResetPassword;
