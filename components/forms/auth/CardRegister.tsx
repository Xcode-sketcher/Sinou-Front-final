// "use client";
// import React, { useState, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import type { FormEvent, ChangeEvent } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
// import { useAuth } from '@/context/AuthContext';

// interface RegisterFormData {
//     name: string;
//     email: string;
//     password: string;
//     confirmPassword: string;
//     phone: string;
//     patientName: string;
// }

// interface FormErrors {
//     name?: string;
//     email?: string;
//     password?: string;
//     confirmPassword?: string;
//     phone?: string;
//     patientName?: string;
// }

// const CardRegister: React.FC = () => {
//     const { register } = useAuth();
//     const [formData, setFormData] = useState<RegisterFormData>({
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         phone: '',
//         patientName: '',
//     });

//     const [errors, setErrors] = useState<FormErrors>({});
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [showPassword, setShowPassword] = useState<boolean>(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

//     const nameRef = useRef<HTMLInputElement>(null);
//     const emailRef = useRef<HTMLInputElement>(null);
//     const passwordRef = useRef<HTMLInputElement>(null);
//     const confirmRef = useRef<HTMLInputElement>(null);
//     const router = useRouter();

//     const validateEmail = (email: string): boolean => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     };

//     const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//         if (errors[name as keyof FormErrors]) {
//             setErrors((prev) => ({ ...prev, [name]: undefined }));
//         }
//     };

//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const newErrors: FormErrors = {};

//         if (!formData.name.trim()) newErrors.name = 'Por favor, insira seu nome';
//         if (!formData.email) newErrors.email = 'Por favor, insira seu e-mail';
//         else if (!validateEmail(formData.email)) newErrors.email = 'E-mail inválido';
//         if (!formData.password) newErrors.password = 'Por favor, insira sua senha';
//         else if (formData.password.length < 8) newErrors.password = 'A senha deve ter no mínimo 8 caracteres';
//         if (!formData.confirmPassword) newErrors.confirmPassword = 'Por favor, confirme sua senha';
//         else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem';
//         if (!formData.phone.trim()) newErrors.phone = 'Por favor, insira seu telefone';
//         // else if (!/^\(\d{2}\)\s\d{5}-\d{4}$/.test(formData.phone)) newErrors.phone = 'Formato de telefone inválido. Use (11) 99999-9999';
//         if (!formData.patientName.trim()) newErrors.patientName = 'Por favor, insira o nome do paciente';

//         if (Object.keys(newErrors).length > 0) {
//             setErrors(newErrors);
//             if (newErrors.name) nameRef.current?.focus();
//             else if (newErrors.email) emailRef.current?.focus();
//             else if (newErrors.password) passwordRef.current?.focus();
//             else if (newErrors.confirmPassword) confirmRef.current?.focus();
//             return;
//         }

//         setIsLoading(true);
//         try {
//             await register({
//                 name: formData.name,
//                 email: formData.email,
//                 password: formData.password,
//                 phone: formData.phone,
//                 patientName: formData.patientName,
//             });
//         } catch (error) {
//             console.error(error);
//             setErrors({ email: 'Falha no cadastro. Tente novamente.' });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
//             {/* Background Gradients */}
//             <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none" />
//             <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

//             <button
//                 type="button"
//                 className="absolute top-6 left-6 p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
//                 onClick={() => router.back()}
//                 aria-label="Voltar"
//                 title="Voltar"
//             >
//                 <ArrowLeft className="w-6 h-6" />
//             </button>

//             <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-2xl relative z-10">
//                 <div className="flex justify-center mb-8">
//                     <div className="relative w-16 h-16">
//                         <Image src="/Logo.svg" alt="Logo" fill className="object-contain" />
//                     </div>
//                 </div>

//                 <div className="text-center mb-8">
//                     <h1 className="text-3xl font-bold text-foreground mb-2">Criar conta</h1>
//                     <p className="text-muted-foreground">Preencha os dados para criar sua conta</p>
//                 </div>

//                 <form className="space-y-6" onSubmit={handleSubmit} noValidate>
//                     <div className="space-y-2">
//                         <label htmlFor="name" className="text-sm font-medium text-foreground">Nome</label>
//                         <input
//                             ref={nameRef}
//                             id="name"
//                             name="name"
//                             type="text"
//                             value={formData.name}
//                             onChange={handleChange}
//                             placeholder="Seu nome completo"
//                             className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-purple-500'} text-foreground placeholder-muted-foreground outline-none transition-all`}
//                             aria-invalid={!!errors.name}
//                             required
//                         />
//                         {errors.name && <span className="text-sm text-red-400 flex items-center gap-1">⚠️ {errors.name}</span>}
//                     </div>

//                     <div className="space-y-2">
//                         <label htmlFor="email" className="text-sm font-medium text-foreground">E-mail</label>
//                         <input
//                             ref={emailRef}
//                             id="email"
//                             name="email"
//                             type="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             placeholder="exemplo@email.com"
//                             className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-purple-500'} text-foreground placeholder-muted-foreground outline-none transition-all`}
//                             aria-invalid={!!errors.email}
//                             autoComplete="email"
//                             required
//                         />
//                         {errors.email && <span className="text-sm text-red-400 flex items-center gap-1">⚠️ {errors.email}</span>}
//                     </div>

//                     <div className="space-y-2">
//                         <label htmlFor="password" className="text-sm font-medium text-foreground">Senha</label>
//                         <div className="relative">
//                             <input
//                                 ref={passwordRef}
//                                 id="password"
//                                 name="password"
//                                 type={showPassword ? 'text' : 'password'}
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 placeholder="••••••••"
//                                 className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-purple-500'} text-foreground placeholder-muted-foreground outline-none transition-all pr-12`}
//                                 aria-invalid={!!errors.password}
//                                 autoComplete="new-password"
//                                 required
//                             />
//                             <button
//                                 type="button"
//                                 className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                                 onClick={() => setShowPassword((s) => !s)}
//                             >
//                                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                             </button>
//                         </div>
//                         {errors.password && <span className="text-sm text-red-400 flex items-center gap-1">⚠️ {errors.password}</span>}
//                     </div>

//                     <div className="space-y-2">
//                         <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirmar senha</label>
//                         <div className="relative">
//                             <input
//                                 ref={confirmRef}
//                                 id="confirmPassword"
//                                 name="confirmPassword"
//                                 type={showConfirmPassword ? 'text' : 'password'}
//                                 value={formData.confirmPassword}
//                                 onChange={handleChange}
//                                 placeholder="••••••••"
//                                 className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.confirmPassword ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-purple-500'} text-foreground placeholder-muted-foreground outline-none transition-all pr-12`}
//                                 aria-invalid={!!errors.confirmPassword}
//                                 required
//                             />
//                             <button
//                                 type="button"
//                                 className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                                 onClick={() => setShowConfirmPassword((s) => !s)}
//                             >
//                                 {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                             </button>
//                         </div>
//                         {errors.confirmPassword && <span className="text-sm text-red-400 flex items-center gap-1">⚠️ {errors.confirmPassword}</span>}
//                     </div>

//                     <div className="space-y-2">
//                         <label htmlFor="phone" className="text-sm font-medium text-foreground">Telefone</label>
//                         <input
//                             id="phone"
//                             name="phone"
//                             type="tel"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             placeholder="(11) 99999-9999"
//                             className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.phone ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-purple-500'} text-foreground placeholder-muted-foreground outline-none transition-all`}
//                             aria-invalid={!!errors.phone}
//                             required
//                         />
//                         {errors.phone && <span className="text-sm text-red-400 flex items-center gap-1">⚠️ {errors.phone}</span>}
//                     </div>

//                     <div className="space-y-2">
//                         <label htmlFor="patientName" className="text-sm font-medium text-foreground">Nome do Paciente</label>
//                         <input
//                             id="patientName"
//                             name="patientName"
//                             type="text"
//                             value={formData.patientName}
//                             onChange={handleChange}
//                             placeholder="Nome do paciente a ser acompanhado"
//                             className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.patientName ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-purple-500'} text-foreground placeholder-muted-foreground outline-none transition-all`}
//                             aria-invalid={!!errors.patientName}
//                             required
//                         />
//                         {errors.patientName && <span className="text-sm text-red-400 flex items-center gap-1">⚠️ {errors.patientName}</span>}
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={isLoading}
//                         className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold shadow-lg shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                     >
//                         {isLoading ? (
//                             <>
//                                 <Loader2 className="w-5 h-5 animate-spin" />
//                                 Criando...
//                             </>
//                         ) : (
//                             'Criar conta'
//                         )}
//                     </button>
//                 </form>

//                 <div className="mt-8 text-center">
//                     <Link href="/login" className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
//                         Já tenho conta
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CardRegister;


"use client";
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, ArrowLeft, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    patientName: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    phone?: string;
    patientName?: string;
}

interface PasswordValidation {
    minLength: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
}

const CardRegister: React.FC = () => {
    const { register } = useAuth();
    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        patientName: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [showPasswordRequirements, setShowPasswordRequirements] = useState<boolean>(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

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

    const passwordValidation = validatePasswordStrength(formData.password);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handlePasswordFocus = () => {
        setShowPasswordRequirements(true);
    };

    const handlePasswordBlur = () => {
        if (!formData.password) {
            setShowPasswordRequirements(false);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: FormErrors = {};

        // Validação de nome
        if (!formData.name.trim()) {
            newErrors.name = 'Por favor, insira seu nome';
        } else if (formData.name.trim().length < 3) {
            newErrors.name = 'O nome deve ter no mínimo 3 caracteres';
        }

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

        // Validação de confirmação de senha
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Por favor, confirme sua senha';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'As senhas não coincidem';
        }

        // Validação de telefone
        if (!formData.phone.trim()) {
            newErrors.phone = 'Por favor, insira seu telefone';
        }

        // Validação de nome do paciente
        if (!formData.patientName.trim()) {
            newErrors.patientName = 'Por favor, insira o nome do paciente';
        } else if (formData.patientName.trim().length < 3) {
            newErrors.patientName = 'O nome do paciente deve ter no mínimo 3 caracteres';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setShowPasswordRequirements(true);
            if (newErrors.name) nameRef.current?.focus();
            else if (newErrors.email) emailRef.current?.focus();
            else if (newErrors.password) passwordRef.current?.focus();
            else if (newErrors.confirmPassword) confirmRef.current?.focus();
            return;
        }

        setIsLoading(true);
        try {
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                patientName: formData.patientName,
            });
        } catch (error) {
            console.error(error);
            setErrors({ email: 'Falha no cadastro. Tente novamente.' });
        } finally {
            setIsLoading(false);
        }
    };

    const RequirementItem = ({ met, text }: { met: boolean; text: string }) => (
        <div className={`flex items-center gap-2 text-xs transition-colors ${met ? 'text-green-400' : 'text-muted-foreground'}`}>
            {met ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
                <XCircle className="w-3.5 h-3.5" />
            )}
            <span>{text}</span>
        </div>
    );

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
                    <div className="relative w-24 h-24">
                        <Image src="/Logo.svg" alt="Logo" fill className="object-contain" />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Criar conta</h1>
                    <p className="text-muted-foreground">Preencha os dados para criar sua conta</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-foreground">Nome</label>
                        <input
                            ref={nameRef}
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Seu nome completo"
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-purple-500'} text-foreground placeholder-muted-foreground outline-none transition-all`}
                            aria-invalid={!!errors.name}
                            required
                        />
                        {errors.name && <span className="text-sm text-red-400 flex items-center gap-1">⚠️ {errors.name}</span>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground">E-mail</label>
                        <input
                            ref={emailRef}
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="exemplo@email.com"
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-purple-500'} text-foreground placeholder-muted-foreground outline-none transition-all`}
                            aria-invalid={!!errors.email}
                            autoComplete="email"
                            required
                        />
                        {errors.email && <span className="text-sm text-red-400 flex items-center gap-1">⚠️ {errors.email}</span>}
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
                                onChange={handleChange}
                                onFocus={handlePasswordFocus}
                                onBlur={handlePasswordBlur}
                                placeholder="••••••••"
                                className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-purple-500'} text-foreground placeholder-muted-foreground outline-none transition-all pr-12`}
                                aria-invalid={!!errors.password}
                                autoComplete="new-password"
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

                        {/* Requisitos de senha */}
                        {showPasswordRequirements && formData.password && (
                            <div className="mt-3 p-3 rounded-lg bg-muted/50 border border-border space-y-1.5">
                                <p className="text-xs font-medium text-foreground mb-2">Requisitos da senha:</p>
                                <RequirementItem met={passwordValidation.minLength} text="Mínimo de 8 caracteres" />
                                <RequirementItem met={passwordValidation.hasUpperCase} text="Uma letra maiúscula (A-Z)" />
                                <RequirementItem met={passwordValidation.hasLowerCase} text="Uma letra minúscula (a-z)" />
                                <RequirementItem met={passwordValidation.hasNumber} text="Um número (0-9)" />
                                <RequirementItem met={passwordValidation.hasSpecialChar} text="Um caractere especial (!@#$%...)" />
                            </div>
                        )}

                        {errors.password && <span className="text-sm text-red-400 flex items-center gap-1">⚠️ {errors.password}</span>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirmar senha</label>
                        <div className="relative">
                            <input
                                ref={confirmRef}
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
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
                                onClick={() => setShowConfirmPassword((s) => !s)}
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.confirmPassword && <span className="text-sm text-red-400 flex items-center gap-1">⚠️ {errors.confirmPassword}</span>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-foreground">Telefone</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(11) 99999-9999"
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.phone ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-purple-500'} text-foreground placeholder-muted-foreground outline-none transition-all`}
                            aria-invalid={!!errors.phone}
                            required
                        />
                        {errors.phone && <span className="text-sm text-red-400 flex items-center gap-1">⚠️ {errors.phone}</span>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="patientName" className="text-sm font-medium text-foreground">Nome do Paciente</label>
                        <input
                            id="patientName"
                            name="patientName"
                            type="text"
                            value={formData.patientName}
                            onChange={handleChange}
                            placeholder="Nome do paciente a ser acompanhado"
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.patientName ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-purple-500'} text-foreground placeholder-muted-foreground outline-none transition-all`}
                            aria-invalid={!!errors.patientName}
                            required
                        />
                        {errors.patientName && <span className="text-sm text-red-400 flex items-center gap-1">⚠️ {errors.patientName}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold shadow-lg shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Criando...
                            </>
                        ) : (
                            'Criar conta'
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link href="/login" className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
                        Já tenho conta
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CardRegister;