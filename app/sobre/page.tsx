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
import CustomCursor from "@/components/ui/pointer";

// Custom Icons to replace Lucide
const CustomIcons = {
    Heart: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    ),
    Users: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    Target: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    ),
    Code: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    ),
    Rocket: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
    ),
    Lightbulb: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
            <path d="M9 18h6" />
            <path d="M10 22h4" />
        </svg>
    ),
    ArrowRight: (props: any) => (
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
    icon: any;
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
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-purple-600">
                            Nossa História
                        </h1>

                        {/* Subtítulo descritivo */}
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Uma jornada de empatia que se transformou em inovação tecnológica.
                            Descubra como o Sinout nasceu da necessidade de conectar pessoas.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Seção da Jornada - Timeline interativa */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                            Da Empatia à Inovação
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Veja como uma simples ideia de ajudar se transformou em uma solução tecnológica completa
                        </p>
                    </motion.div>

                    {/* Container da timeline com passos da jornada */}
                    <div className="max-w-4xl mx-auto relative">
                        {/* Linha central da timeline */}
                        <div className="absolute left-28 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 hidden md:block opacity-30 z-0" />

                        <div className="space-y-16">
                            {/* Passo 1: Nascimento da ideia */}
                            <JourneyStep
                                step={1}
                                title="O Nascimento da Ideia"
                                description="Tudo começou com uma história real. Uma família enfrentando as barreiras da comunicação não-verbal. Vimos a necessidade urgente de criar uma ponte entre o mundo digital e as expressões humanas, nascida da empatia e solidariedade."
                                icon={CustomIcons.Heart}
                                color="bg-purple-600"
                                delay={0.1}
                            />

                            {/* Passo 2: Pesquisa e empatia profunda */}
                            <JourneyStep
                                step={2}
                                title="Pesquisa e Empatia"
                                description="Mergulhamos no universo das pessoas com deficiência motora e suas famílias. Entrevistas, observações e imersão nos permitiram entender não apenas os desafios técnicos, mas as emoções, frustrações e esperanças de cada pessoa."
                                icon={CustomIcons.Users}
                                color="bg-orange-500"
                                delay={0.2}
                            />

                            {/* Passo 3: Planejamento estruturado */}
                            <JourneyStep
                                step={3}
                                title="Planejamento Estruturado"
                                description="Desenvolvemos um plano abrangente que incluía pesquisa de tecnologias emergentes, arquitetura de sistema escalável, e uma estratégia de implementação realista e sustentável."
                                icon={CustomIcons.Target}
                                color="bg-purple-500"
                                delay={0.3}
                            />

                            {/* Passo 4: Desenvolvimento técnico */}
                            <JourneyStep
                                step={4}
                                title="Desenvolvimento Técnico"
                                description="Nossa equipe multidisciplinar começou a construir. Algoritmos de reconhecimento facial, interfaces intuitivas, foram desenvolvidos com rigor técnico e atenção aos detalhes."
                                icon={CustomIcons.Code}
                                color="bg-orange-600"
                                delay={0.4}
                            />

                            {/* Passo 5: Lançamento e impacto */}
                            <JourneyStep
                                step={5}
                                title="Lançamento e Impacto"
                                description="O Sinout deixou de ser uma ideia e entrou na vida real. Cada usuário que consegue se comunicar, cada família que se reconecta, cada barreira que é quebrada, valida nossa missão e nos impulsiona a continuar inovando."
                                icon={CustomIcons.Rocket}
                                color="bg-purple-700"
                                delay={0.5}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Seção de Valores - Apresentação dos princípios fundamentais */}
            <section className="py-20 bg-muted/20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                            Nossos Valores
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Princípios que guiam cada decisão e cada linha de código
                        </p>
                    </motion.div>

                    {/* Grid de valores com animações */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                title: "Empatia",
                                description: "Cada recurso é desenvolvido pensando primeiro nas pessoas, não na tecnologia.",
                                icon: CustomIcons.Heart,
                                color: "from-purple-600 to-purple-500"
                            },
                            {
                                title: "Inovação",
                                description: "Tecnologia de ponta deve estar ao alcance de todos, independente da condição financeira.",
                                icon: CustomIcons.Lightbulb,
                                color: "from-orange-500 to-orange-400"
                            },
                            {
                                title: "Impacto",
                                description: "Buscamos mudanças reais e duradouras na vida das pessoas que atendemos.",
                                icon: CustomIcons.Target,
                                color: "from-purple-500 to-orange-500"
                            }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="text-center p-8 rounded-2xl bg-card border border-border hover:border-purple-500/50 transition-all duration-300"
                            >
                                {/* Elemento flutuante com ícone animado */}
                                <FloatingElement delay={index * 0.5}>
                                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center shadow-lg`}>
                                        <value.icon className="w-8 h-8 text-white" />
                                    </div>
                                </FloatingElement>

                                {/* Conteúdo do valor */}
                                <h3 className="text-xl font-bold text-foreground mb-4">{value.title}</h3>
                                <p className="text-muted-foreground">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Seção Call-to-Action - Engajamento do usuário */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                            Faça Parte Desta História
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Junte-se a nós nesta missão de transformar vidas através da tecnologia
                        </p>

                        {/* Botões de ação */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            {/* Botão principal para planos */}
                            <Link href="/#pricing">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2"
                                >
                                    Conheça Nossos Planos
                                    <CustomIcons.ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </Link>

                            {/* Botão secundário para equipe */}
                            <Link href="/equipe">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 rounded-full bg-card hover:bg-card/80 border border-border text-foreground font-medium text-lg transition-all"
                                >
                                    Conheça Nossa Equipe
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
            <CustomCursor />
        </div>
    );
}