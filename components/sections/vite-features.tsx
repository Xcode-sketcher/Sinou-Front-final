"use client";

import { motion } from "framer-motion";
import { Brain, Users, Zap, Shield, Cog, Heart } from "lucide-react";

/**
 * Interface para definição de uma funcionalidade
 * Estrutura os dados necessários para renderizar cada card de funcionalidade
 */
interface Feature {
    /** Ícone React representando a funcionalidade */
    icon: React.JSX.Element;
    /** Título da funcionalidade */
    title: string;
    /** Descrição detalhada da funcionalidade */
    description: string;
}

/**
 * Array de funcionalidades do Sinout
 * Define as seis principais características que destacam o valor da plataforma
 * Cada funcionalidade inclui ícone, título e descrição explicativa
 */
const features: Feature[] = [
    {
        icon: <Brain className="w-6 h-6 text-purple-500" />,
        title: "Inovação em IA",
        description: "Desenvolvemos algoritmos avançados de reconhecimento facial para transformar expressões em comunicação verbal acessível."
    },
    {
        icon: <Users className="w-6 h-6 text-blue-500" />,
        title: "Tecnologia e Cuidado que Trabalham Juntos",
        description: "Somos uma equipe multidisciplinar comprometida em desenvolver soluções que dão voz e independência a pessoas com limitações motoras."
    },
    {
        icon: <Zap className="w-6 h-6 text-yellow-500" />,
        title: "Em Constante Melhoria",
        description: "Trabalhamos por etapas para melhorar o que já funciona. Trazemos novidades na comunicação sempre."
    },
    {
        icon: <Shield className="w-6 h-6 text-green-500" />,
        title: "Qualidade e Segurança",
        description: "Implementamos rigorosos testes e práticas de segurança para garantir produtos confiáveis e protegidos."
    },
    {
        icon: <Cog className="w-6 h-6 text-orange-500" />,
        title: "Conexão que Faz a Diferença",
        description: "Unimos o melhor da tecnologia pra entregar um sistema que realmente funciona bem no dia a dia."
    },
    {
        icon: <Heart className="w-6 h-6 text-pink-500" />,
        title: "Foco no Usuário",
        description: "Cada decisão é guiada pela empatia, de forma que prioriza a acessibilidade e a experiência de pessoas com necessidades especiais."
    }
];

/**
 * Configuração de animação para o container de funcionalidades
 * Define o estado inicial oculto e o estado final com stagger para animação sequencial
 */
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1 // Delay de 100ms entre cada item
        }
    }
};

/**
 * Configuração de animação para cada item individual
 * Anima entrada com fade-in e movimento vertical
 */
const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

/**
 * Seção de funcionalidades do Sinout
 *
 * Componente que apresenta as seis principais funcionalidades da plataforma
 * em um grid responsivo com animações de entrada sequenciais. Cada funcionalidade
 * é exibida em um card com ícone, título e descrição, com efeitos hover interativos.
 *
 * Funcionalidades apresentadas:
 * - Inovação em IA: Algoritmos de reconhecimento facial
 * - Colaboração Multidisciplinar: Equipe especializada
 * - Desenvolvimento Ágil: Metodologias modernas
 * - Qualidade e Segurança: Testes rigorosos
 * - Integração Tecnológica: Ecossistemas coesos
 * - Foco no Usuário: Empatia e acessibilidade
 *
 * @component
 * @example
 * ```tsx
 * <ViteFeatures />
 * ```
 *
 * @returns {JSX.Element} Grid responsivo com cards de funcionalidades animados
 */
export function ViteFeatures() {
    return (
        <section className="py-12 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                {/* Container animado com stagger para entrada sequencial dos cards */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {/* Mapeamento das funcionalidades para cards individuais */}
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="group p-6 rounded-xl bg-card border border-border hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 relative overflow-hidden"
                        >
                            {/* Gradiente de fundo sutil que aparece no hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Container do ícone com efeito de escala no hover */}
                            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>

                            {/* Título e descrição com z-index para sobrepor o gradiente */}
                            <h3 className="text-xl font-semibold mb-2 relative z-10">{feature.title}</h3>
                            <p className="text-muted-foreground relative z-10">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
