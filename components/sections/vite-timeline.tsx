"use client";

/**
 * Componente ViteTimeline
 *
 * Linha do tempo interativa apresentando os valores fundamentais da Sinout
 * com layout alternado e animações baseadas em scroll do usuário.
 *
 * Funcionalidades principais:
 * - Layout alternado (esquerda-direita) para melhor visualização
 * - Animações de entrada escalonadas com Framer Motion
 * - Efeitos de scroll que controlam opacidade do cabeçalho
 * - Ícones temáticos para cada valor da empresa
 * - Cards com efeitos hover e gradientes personalizados
 * - Linha central conectando todos os itens da timeline
 * - Design responsivo com largura máxima controlada
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Calendar, Trophy, Users, Rocket } from "lucide-react";

/**
 * Interface para definir um item da linha do tempo
 */
interface TimelineItemData {
    /** Data ou categoria do item */
    date: string;
    /** Título principal do item */
    title: string;
    /** Descrição detalhada do valor */
    description: string;
    /** Componente do ícone Lucide React */
    icon: React.ComponentType<{ className?: string }>;
    /** Classes CSS para gradiente de fundo */
    color: string;
}

/**
 * Componente TimelineItem
 * Renderiza um item individual da linha do tempo com layout alternado
 */
const TimelineItem = ({ data, index }: { data: TimelineItemData; index: number }) => {
    // Determina se o item deve aparecer do lado esquerdo ou direito
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`flex items-center justify-between w-full mb-12 ${isEven ? "flex-row-reverse" : "flex-row"}`}
        >
            {/* Lado do conteúdo */}
            <div className="w-5/12">
                <div className="p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-sm hover:border-purple-500/30 transition-colors group">
                    {/* Cabeçalho com ícone e data */}
                    <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${data.color} bg-opacity-10`}>
                            <data.icon className="w-5 h-5 text-foreground" />
                        </div>
                        <span className="text-sm font-mono text-muted-foreground">{data.date}</span>
                    </div>
                    {/* Título com efeito hover gradiente */}
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                        {data.title}
                    </h3>
                    {/* Descrição do valor */}
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {data.description}
                    </p>
                </div>
            </div>

            {/* Nó central da linha do tempo */}
            <div className="w-2/12 flex justify-center relative">
                {/* Círculo indicador com gradiente e sombra */}
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] z-10" />
                {/* Linha vertical conectando os itens */}
                <div className="absolute top-4 bottom-[-48px] w-0.5 bg-border" />
            </div>

            {/* Lado vazio para balanceamento visual */}
            <div className="w-5/12" />
        </motion.div>
    );
};

/**
 * Componente ViteTimeline
 * Renderiza a linha do tempo completa com valores da empresa
 * e efeitos de scroll interativos
 */
export const ViteTimeline = () => {
    // Referência para o elemento da seção para tracking de scroll
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Transformação da opacidade baseada no progresso do scroll
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

    // Dados dos valores da empresa organizados cronologicamente
    const timelineData: TimelineItemData[] = [
        {
            date: "Inclusividade",
            title: "Tecnologia para Todos",
            description: "Nossa IA foi treinada para reconhecer micro-expressões em rostos de todas as etnias, gêneros e idades, e garantimos acesso universal.",
            icon: Users,
            color: "from-blue-500 to-cyan-500"
        },
        {
            date: "Acessibilidade",
            title: "Comunicação Sem Barreiras",
            description: "Projetado para pessoas com limitações motoras severas, transformamos o mínimo movimento em palavras.",
            icon: Trophy,
            color: "from-purple-500 to-violet-500"
        },
        {
            date: "Inovação",
            title: "IA de Alta Precisão",
            description: "Algoritmos avançados que aprendem e se adaptam ao padrão único de cada usuário, que melhora a precisão a cada uso.",
            icon: Rocket,
            color: "from-pink-500 to-rose-500"
        },
        {
            date: "Futuro",
            title: "Autonomia Recuperada",
            description: "Entregamos independência. Permitimos que pensamentos e sentimentos sejam expressos livremente.",
            icon: Calendar,
            color: "from-amber-500 to-orange-500"
        }
    ];

    return (
        <section ref={ref} className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                {/* Cabeçalho com opacidade controlada por scroll */}
                <motion.div style={{ opacity }} className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4">
                        Nossos Valores
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Construimos um futuro onde a tecnologia serve à humanidade, quebramos o silêncio e conectamos vidas.
                    </p>
                </motion.div>

                {/* Container da linha do tempo */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Linha vertical de fundo com gradiente sutil */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/50 to-transparent -translate-x-1/2" />

                    {/* Renderização de cada item da timeline */}
                    {timelineData.map((item, index) => (
                        <TimelineItem key={index} data={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};
