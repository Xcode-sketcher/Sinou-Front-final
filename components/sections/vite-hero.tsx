"use client";

import { motion } from "framer-motion";
// Link removed, CTAs stripped from this component
// CTA buttons intentionally removed per request
import { VitePipelineAnimation } from "./vite-pipeline-animation";

/**
 * Seção hero (principal) da landing page do Sinout
 *
 * Componente que apresenta a mensagem principal da empresa com título impactante,
 * descrição explicativa e call-to-actions. Inclui animações de entrada sequenciais
 * e um componente de animação visual que representa o pipeline de desenvolvimento.
 *
 * Estrutura da seção:
 * - Layout responsivo com texto à esquerda e animação à direita
 * - Título com gradiente de texto e efeito visual atrativo
 * - Descrição explicativa sobre a transformação de ideias em produtos
 * - Dois botões de ação: "Conheça a Equipe" e "Nossa Metodologia"
 * - Animação SVG representando o pipeline de desenvolvimento
 *
 * Funcionalidades principais:
 * - Animações de entrada com Framer Motion (fade-in + slide-up)
 * - Design responsivo com breakpoints para mobile e desktop
 * - Gradiente de texto dinâmico que se adapta ao tema
 * - Links de navegação para seções internas e externas
 * - Integração com componente de animação personalizado
 *
 * @component
 * @example
 * ```tsx
 * <ViteHero />
 * ```
 *
 * @returns {JSX.Element} Seção hero completa com texto, botões e animação visual
 */
export function ViteHero() {
    return (
        <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Layout flexível responsivo: coluna no mobile, linha no desktop */}
                <div className="flex flex-col md:flex-row items-center">
                    {/* Seção de texto - ocupa metade da largura no desktop */}
                    <div className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0">
                        {/* Título principal com animação de entrada */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
                        >
                            Nossa Equipe por Trás da Inclusão
                        </motion.h1>

                        {/* Descrição com animação atrasada */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-lg md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto md:mx-0"
                        >
                           Profissionais dedicados a desenvolver soluções que ampliam a autonomia e dão mais liberdade para se expressar.
                        </motion.p>

                        {/* (CTA buttons intentionally removed) */}
                    </div>

                    {/* Seção de animação visual - ocupa metade da largura no desktop */}
                    <div className="w-full md:w-1/2 flex justify-center relative">
                        {/* Container da animação com efeito de escala na entrada */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="w-full"
                        >
                            {/* Componente de animação que representa o pipeline de desenvolvimento */}
                            <VitePipelineAnimation />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
