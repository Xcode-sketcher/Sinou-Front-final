"use client";

/**
 * Página Sobre - Sinout
 *
 * Esta página apresenta a história, jornada e valores da empresa Sinout.
 * Apresenta de forma interativa a evolução do projeto desde sua concepção
 * até o impacto atual, utilizando animações e design moderno.
 *
 * Funcionalidades principais:
 * - Seção hero com introdução da história
 * - Timeline interativa da jornada de desenvolvimento
 * - Apresentação dos valores fundamentais
 * - Call-to-action para engajamento do usuário
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { ModernMenu } from "@/components/layout/Header";
import { OrbitalAnimation } from "@/components/sections/sobre/OrbitalAnimation";

// Custom Icons to replace Lucide
const CustomIcons = {
    Heart: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    ),
    Users: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    Target: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    ),
    Code: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    ),
    Rocket: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
    ),
    Lightbulb: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
            <path d="M9 18h6" />
            <path d="M10 22h4" />
        </svg>
    ),
    ArrowRight: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
};

/**
 * Props do componente JourneyStep
 */
interface JourneyStepProps {
    /** Número do passo na jornada */
    step: number;
    /** Título do passo */
    title: string;
    /** Descrição detalhada do passo */
    description: string;
    /** Componente do ícone a ser exibido */
    icon: React.ElementType;
    /** Classe CSS para cor de fundo do ícone */
    color: string;
    /** Atraso da animação em segundos */
    delay?: number;
}

/**
 * Componente JourneyStep
 *
 * Representa um passo individual na timeline da jornada da empresa.
 * Inclui animações de entrada, conexão visual com outros passos e
 * layout responsivo com ícone, título e descrição.
 */
const JourneyStep = ({
    step,
    title,
    description,
    icon: Icon,
    color,
    delay = 0
}: JourneyStepProps) => {
    /**
     * Determina a cor do gradiente da linha de conexão baseada na cor do ícone
     * @param colorClass - Classe CSS da cor do ícone
     * @returns Classe CSS do gradiente para a linha de conexão
     */
    const getConnectionColor = (colorClass: string) => {
        // Simplified to Purple/Orange theme
        if (colorClass.includes('orange')) return 'from-orange-500 to-purple-500';
        return 'from-purple-500 to-orange-500';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="relative"
        >
            {/* Linha de conexão visual entre os passos */}
            {step > 1 && (
                <div className={`absolute left-28 top-8 w-0.5 h-16 bg-gradient-to-b ${getConnectionColor(color)} hidden md:block z-0`} />
            )}

            <div className="flex items-start gap-12">
                {/* Contêiner do número do passo e ícone */}
                <div className="flex-shrink-0 relative">
                    <div className={`w-20 h-20 rounded-2xl ${color} flex items-center justify-center shadow-lg relative z-20`}>
                        <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse" />
                        <Icon className="w-10 h-10 text-white relative z-10" />
                    </div>
                    <div className="text-center mt-3">
                        <span className="text-sm font-bold text-muted-foreground">Passo {step}</span>
                    </div>
                </div>

                {/* Conteúdo do passo */}
                <div className="flex-1 pb-16 pt-4 pl-4">
                    <h3 className="text-2xl font-bold text-foreground mb-4">{title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
                </div>
            </div>
        </motion.div>
    );
};

/**
 * Props do componente FloatingElement
 */
interface FloatingElementProps {
    /** Elementos filhos a serem animados */
    children: React.ReactNode;
    /** Atraso da animação em segundos */
    delay?: number;
}

/**
 * Componente FloatingElement
 *
 * Aplica animação de flutuação suave aos elementos filhos.
 * Utilizado para criar movimento sutil em ícones e elementos decorativos.
 */
const FloatingElement = ({ children, delay = 0 }: FloatingElementProps) => (
    <motion.div
        animate={{
            y: [0, -10, 0],
        }}
        transition={{
            duration: 3,
            repeat: Infinity,
            delay,
            ease: "easeInOut"
        }}
    >
        {children}
    </motion.div>
);

/**
 * Componente principal da página Sobre
 *
 * Renderiza a página completa "Sobre nós" com todas as seções:
 * - Menu de navegação
 * - Seção hero com introdução
 * - Timeline da jornada
 * - Valores da empresa
 * - Call-to-action
 */
export default function SobrePage() {
    // Configuração dos links das redes sociais para o menu
    const socialItems = [
        { label: "", href: "#" },
    ];

    return (
        <div className="min-h-screen bg-background">
            <header>
                <title>Sobre Sinout</title>
            </header>
            {/* Menu de navegação moderno */}
            <ModernMenu items={[]} socialItems={socialItems} />

            {/* Seção Hero - Introdução da história */}
            <section className="relative py-20 overflow-hidden">
                {/* Efeitos de fundo para criar atmosfera */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        {/* Ícone animado de introdução */}
                        <div className="flex justify-center mb-8">
                            <OrbitalAnimation size="lg" autoPlay={true} />
                        </div>

                        {/* Título principal com gradiente */}
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-orange-500 to-purple-600 animate-gradient">
                            Nossa História
                        </h1>

                        <p className="text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto">
                            Transformando o cuidado com tecnologia e empatia. Conheça a jornada da Sinout,
                            desde a primeira linha de código até impactar vidas.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Seção da Timeline - Jornada da empresa */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Passo 1: O Início */}
                        <JourneyStep
                            step={1}
                            title="O Início"
                            description="Tudo começou com uma ideia simples: usar a tecnologia para humanizar o cuidado. Em 2023, nossa equipe se reuniu para criar o primeiro protótipo do Sinout, focado em reconhecimento facial para pacientes com dificuldades de comunicação."
                            icon={CustomIcons.Lightbulb}
                            color="bg-orange-500"
                            delay={0.2}
                        />

                        {/* Passo 2: Desenvolvimento */}
                        <JourneyStep
                            step={2}
                            title="Desenvolvimento Intenso"
                            description="Foram meses de codificação, testes e aprendizado. Integramos IA avançada, criamos interfaces intuitivas e refinamos cada detalhe para garantir que a tecnologia servisse às pessoas, e não o contrário."
                            icon={CustomIcons.Code}
                            color="bg-purple-600"
                            delay={0.4}
                        />

                        {/* Passo 3: Lançamento */}
                        <JourneyStep
                            step={3}
                            title="Lançamento Oficial"
                            description="O Sinout foi lançado para o mundo. Com feedback positivo de cuidadores e profissionais de saúde, validamos nossa missão e começamos a expandir nossas funcionalidades para atender ainda mais necessidades."
                            icon={CustomIcons.Rocket}
                            color="bg-orange-500"
                            delay={0.6}
                        />

                        {/* Passo 4: O Futuro */}
                        <JourneyStep
                            step={4}
                            title="Olhando para o Futuro"
                            description="Não paramos por aqui. Estamos constantemente inovando, buscando novas formas de aplicar IA e tecnologia para melhorar a qualidade de vida de pacientes e facilitar o trabalho de quem cuida."
                            icon={CustomIcons.Target}
                            color="bg-purple-600"
                            delay={0.8}
                        />
                    </div>
                </div>
            </section>

            {/* Seção de Valores e Missão */}
            <section className="py-20 bg-muted/30 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6 text-foreground">Nossa Missão</h2>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                Acreditamos que a tecnologia deve ser uma ponte, não uma barreira. Nossa missão é desenvolver soluções que tragam clareza, empatia e eficiência para o cuidado de saúde, permitindo que profissionais se concentrem no que realmente importa: as pessoas.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
                                    <CustomIcons.Heart className="w-8 h-8 text-orange-500 mb-4" />
                                    <h3 className="font-bold text-lg mb-2">Empatia</h3>
                                    <p className="text-sm text-muted-foreground">Tecnologia com coração, focada no bem-estar humano.</p>
                                </div>
                                <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
                                    <CustomIcons.Users className="w-8 h-8 text-purple-600 mb-4" />
                                    <h3 className="font-bold text-lg mb-2">Colaboração</h3>
                                    <p className="text-sm text-muted-foreground">Trabalhamos juntos para criar soluções melhores.</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-purple-600 rounded-2xl blur-2xl opacity-20 transform rotate-3" />
                            <div className="bg-background border border-border rounded-2xl p-8 relative shadow-xl">
                                <h3 className="text-2xl font-bold mb-6">Por que Sinout?</h3>
                                <ul className="space-y-4">
                                    {[
                                        "Inovação constante em IA e reconhecimento facial",
                                        "Design focado na experiência do usuário",
                                        "Compromisso com a privacidade e segurança",
                                        "Suporte dedicado e próximo dos clientes"
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-muted-foreground">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-8 pt-8 border-t border-border">
                                    <Link
                                        href="/contato"
                                        className="inline-flex items-center justify-center w-full py-3 px-6 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-opacity"
                                    >
                                        Entre em contato conosco
                                        <CustomIcons.ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}