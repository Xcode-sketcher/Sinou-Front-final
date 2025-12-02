"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

/**
 * Interface para dados do formulário de contato
 * Define a estrutura dos campos do formulário de contato
 */
interface ContactFormData {
    /** Nome completo do usuário */
    name: string;
    /** Endereço de email do usuário */
    email: string;
    /** Mensagem de contato */
    message: string;
}

/**
 * Seção de contato do site Sinout
 *
 * Componente que apresenta informações de contato da empresa e um formulário
 * interativo para que usuários entrem em contato. Inclui animações de entrada,
 * design responsivo com glassmorphism e validação de formulário.
 *
 * Funcionalidades principais:
 * - Formulário de contato com validação HTML5
 * - Informações de contato (email, telefone, localização)
 * - Animações de entrada com Framer Motion
 * - Design responsivo com grid adaptativo
 * - Efeitos visuais com gradientes e blur
 * - Estados interativos de hover e focus
 *
 * @component
 * @example
 * ```tsx
 * <ViteContactSection />
 * ```
 *
 * @returns {JSX.Element} Seção completa de contato com formulário e informações
 */
export const ViteContactSection = () => {
    // Estado para armazenar dados do formulário de contato
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        message: ''
    });

    /**
     * Manipulador de submissão do formulário
     * Processa o envio do formulário de contato
     *
     * @param {React.FormEvent} e - Evento de submissão do formulário
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lidar com submissão do formulário aqui
    };

    /**
     * Manipulador de mudança nos campos do formulário
     * Atualiza o estado do formulário conforme o usuário digita
     *
     * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - Evento de mudança do input
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <section className="py-20 relative overflow-hidden" id="contact">
            {/* Elementos decorativos de fundo com gradientes sutis */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Cabeçalho da seção com título e descrição */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                        Entre em Contato
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Tem dúvidas sobre nossa tecnologia? Estamos aqui para conversar.
                    </p>
                </div>

                {/* Grid responsivo com informações de contato e formulário */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Seção de informações de contato */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-foreground mb-6">Vamos Conversar</h3>
                            <p className="text-muted-foreground mb-8">
                                Nossa equipe está pronta para ajudar você a entender como o Sinout pode transformar vidas.
                                Entre em contato para demonstrações, parcerias ou suporte.
                            </p>
                        </div>

                        {/* Cards de informação de contato com ícones e hover effects */}
                        <div className="space-y-6">
                            {/* Card de email */}
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-card/50 border border-border backdrop-blur-sm hover:border-purple-500/30 transition-colors">
                                <div className="p-3 rounded-xl bg-purple-500/10">
                                    <Mail className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-foreground font-medium">Email</p>
                                    <p className="text-muted-foreground">suportesinout@gmail.com</p>
                                </div>
                            </div>

                            {/* Card de telefone */}
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-card/50 border border-border backdrop-blur-sm hover:border-purple-500/30 transition-colors">
                                <div className="p-3 rounded-xl bg-blue-500/10">
                                    <Phone className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-foreground font-medium">Telefone</p>
                                    <p className="text-muted-foreground">(11) 96478-3902</p>
                                </div>
                            </div>

                            {/* Card de localização */}
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-card/50 border border-border backdrop-blur-sm hover:border-purple-500/30 transition-colors">
                                <div className="p-3 rounded-xl bg-purple-500/10">
                                    <MapPin className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-foreground font-medium">Localização</p>
                                    <p className="text-muted-foreground">São Paulo, Brasil</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Seção do formulário de contato */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Container do formulário com efeito glassmorphism */}
                        <div className="p-8 rounded-3xl bg-card/40 border border-border backdrop-blur-md shadow-[0_0_50px_rgba(139,92,246,0.1)]">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Campo de nome */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                                        Nome
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border text-foreground placeholder-muted-foreground focus:border-purple-500/50 focus:outline-none transition-colors"
                                        placeholder="Seu nome completo"
                                    />
                                </div>

                                {/* Campo de email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border text-foreground placeholder-muted-foreground focus:border-purple-500/50 focus:outline-none transition-colors"
                                        placeholder="seu@email.com"
                                    />
                                </div>

                                {/* Campo de mensagem */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                                        Mensagem
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border text-foreground placeholder-muted-foreground focus:border-purple-500/50 focus:outline-none transition-colors resize-none"
                                        placeholder="Conte-nos como podemos ajudar..."
                                    />
                                </div>

                                {/* Botão de envio com animação hover */}
                                <button
                                    type="submit"
                                    className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
                                >
                                    Enviar Mensagem <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
