"use client";

/**
 * Componente VitePricing
 *
 * Seção de preços da plataforma Sinout apresentando três planos de assinatura
 * (Pessoal, Família e Institucional) com cards interativos e animações elegantes.
 *
 * Funcionalidades principais:
 * - Três planos de preços com características distintas
 * - Ícones SVG personalizados para cada categoria
 * - Card "Mais Popular" destacado com efeitos visuais
 * - Animações de entrada escalonadas com Framer Motion
 * - Design responsivo (1 coluna mobile, 3 desktop)
 * - Efeitos de hover e transições suaves
 * - Links para registro integrados aos botões
 */

import { motion } from "framer-motion";
import { Check, Users, Briefcase } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

/**
 * Ícone personalizado para o plano Pessoal
 * Representa um usuário individual com design minimalista
 */
const PersonalIcon = ({ className }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M12 14c-4 0-7 2-7 4v1h14v-1c0-2-3-4-7-4z" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
);

/**
 * Ícone personalizado para o plano Família
 * Representa múltiplos usuários conectados simbolizando família/cuidadores
 */
const FamilyIcon = ({ className }: { className?: string }) => (
    <Users className={className} />
);

/**
 * Ícone personalizado para o plano Institucional
 * Representa uma estrutura organizacional com divisões e setores
 */
const InstitutionalIcon = ({ className }: { className?: string }) => (
    <Briefcase className={className} />
);

/**
 * Interface para definir um plano de preços
 */
interface PricingPlan {
    /** Nome do plano */
    name: string;
    /** Preço do plano */
    price: string;
    /** Descrição do plano */
    description: string;
    /** Componente do ícone personalizado */
    icon: React.ComponentType<{ className?: string }>;
    /** Lista de funcionalidades incluídas */
    features: string[];
    /** Indica se é o plano mais popular */
    popular: boolean;
}

/**
 * Componente PricingCard
 * Renderiza um card individual de plano de preços com animações e estilos
 */
const PricingCard = ({ plan, index }: { plan: PricingPlan; index: number }) => {
    const { user } = useAuth();
    // Verifica se o plano é o mais popular para aplicar estilos especiais
    const isPopular = plan.popular;

    let href = "";
    if (plan.name === "Olhar Básico") {
        href = user ? "/sistema" : "/login";
    } else if (plan.name === "Olhar Corporativo") {
        href = "/contato";
    } else {
        href = `/pagamento?plan=${encodeURIComponent(plan.name)}`;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`relative p-8 rounded-3xl border ${isPopular
                ? "bg-gradient-to-b from-card to-background border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.15)] scale-105 z-10"
                : "bg-card/50 border-border hover:border-primary/20"
                } flex flex-col h-full transition-all duration-300`}
        >
            {/* Badge "Mais Popular" para o plano destacado */}
            {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                    Mais Popular
                </div>
            )}

            {/* Cabeçalho do card com ícone, nome e preço */}
            <div className="mb-8">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-muted/50 border border-border">
                    <plan.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6 h-10">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">/mês</span>
                </div>
            </div>

            {/* Lista de funcionalidades com ícones de check */}
            <div className="flex-grow mb-8">
                <ul className="space-y-4">
                    {plan.features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <Check className={`w-5 h-5 shrink-0 ${isPopular ? "text-purple-400" : "text-muted-foreground"}`} />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Botão de ação com link para registro */}
            <Link href={href} className="w-full">
                <button className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${isPopular
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                    : "bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border"
                    }`}>
                    Começar Agora
                </button>
            </Link>
        </motion.div >
    );
};

/**
 * Componente VitePricing
 * Renderiza a seção completa de preços com todos os planos disponíveis
 */
export const VitePricing = () => {
    // Array com dados completos dos três planos de preços
    const plans: PricingPlan[] = [
        {
            name: "Olhar Básico",
            price: "Gratuito",
            description: "Para uso individual. Recupere sua comunicação básica.",
            icon: PersonalIcon,
            features: [
                "Tradução de expressões básicas",
                "Relatório simplificado",
                "Acesso sem suporte prioritário",
                "Atualizações regulares"
            ],
            popular: false
        },
        {
            name: "Olhar Completo",
            price: "R$ 99,90",
            description: "Recursos avançados e ferramentas de monitoramento para cuidador.",
            icon: FamilyIcon,
            features: [
                "Tudo do plano Olhar Básico",
                "Relatórios detalhados",
                "Suporte prioritário",
                "Histórico de comunicação"
            ],
            popular: true
        },
        {
            name: "Olhar Corporativo",
            price: "Sob Consulta",
            description: "Para clínicas, hospitais e associações que atendem múltiplos pacientes.",
            icon: InstitutionalIcon,
            features: [
                "Múltiplos perfis de pacientes",
                "Dashboard clínico analítico",
                "API para integração hospitalar",
                "Treinamento da equipe"
            ],
            popular: false
        }
    ];

    return (
        <section id="pricing" className="py-20 relative overflow-hidden">
            {/* Efeitos de fundo com gradientes sutis */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Cabeçalho da seção */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4">
                        Acessível para Todos
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Nossa missão é democratizar a comunicação. Oferecemos planos flexíveis para garantir que ninguém fique sem voz.
                    </p>
                </div>

                {/* Grid responsivo dos cards de preços */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                    {plans.map((plan, index) => (
                        <PricingCard key={index} plan={plan} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};