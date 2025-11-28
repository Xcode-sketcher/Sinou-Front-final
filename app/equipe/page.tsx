"use client";

import dynamic from 'next/dynamic';
import { ModernMenu } from "@/components/layout/Header";
import { motion } from "framer-motion";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ViteHero } from "@/components/sections/vite-hero";
import { ViteFeatures } from "@/components/sections/vite-features";
import { FrameworkLogos } from "@/components/sections/framework-logos";
import { CodeComparison } from "@/components/sections/code-comparison";
import { TechTeam } from "@/components/sections/tech-team";
import { VLibras } from '@/components/Vlibras';
// Removed local CTAs (buttons) per request — content simplified

const Footer7 = dynamic(() => import("@/components/layout/Footer").then(mod => mod.Footer7));

/**
 * Página da Equipe Sinout
 *
 * Esta página apresenta a equipe de desenvolvimento do Sinout, mostrando
 * o processo de transformação de ideias em código através de animações
 * interativas e seções informativas sobre a tecnologia.
 *
 * Seções apresentadas:
 * - Hero com animação de pipeline (conversão ideia → código)
 * - Logos dos frameworks utilizados (marquee animado)
 * - Grid de funcionalidades técnicas
 * - Comparação de código (antes/depois)
 * - Apresentação da equipe técnica
 *
 * Componentes utilizados:
 * - ViteHero: Hero section com pipeline animation
 * - FrameworkLogos: Marquee com logos de tecnologias
 * - ViteFeatures: Grid de funcionalidades
 * - CodeComparison: Comparação de implementações
 * - TechTeam: Cards da equipe
 * - ModernMenu: Menu de navegação consistente
 * - Footer7: Rodapé da aplicação
 *
 * Funcionalidades técnicas:
 * - Client-side rendering para interatividade
 * - Dynamic imports para otimização de bundle
 * - Animações Framer Motion
 * - Design responsivo
 * - SEO otimizado
 *
 * Estrutura da página:
 * - Menu de navegação fixo
 * - Main content com seções sequenciais
 * - Footer consistente
 * - Layout flexível (min-h-screen)
 *
 * Tema visual:
 * - Background consistente com app
 * - Cores do tema (foreground/background)
 * - Bordas e espaçamentos padronizados
 * - Efeitos hover e transições
 *
 * @component
 * @returns {JSX.Element} Página completa da equipe com todas as seções
 */
export default function TeamPage() {
    // Configuração dos links sociais para o menu



    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <header>
                <title>Sinout - Equipe</title>
            </header>
            {/* Menu de navegação */}
            <ModernMenu items={[]} />

            <main className="flex-grow">
                {/* Hero Section com Pipeline Animation */}
                <ViteHero />

                {/* Framework Logos Marquee */}
                <FrameworkLogos />

                {/* Top info area (heading + description) — restored without CTAs */}
                <section className="py-8 bg-muted/0">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center max-w-4xl mx-auto mb-8"
                        >
                            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3">
                                Conheça Nossa Equipe
                            </h2>
                            <p className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto">
                                Descubra os profissionais por trás da Sinout: suas funções, contribuições e a metodologia que usamos para entregar valor.
                            </p>

                            {/* CTA buttons: link to docs page */}
                            <div className="flex items-center justify-center gap-3 mt-4">
                                <Button asChild>
                                    <Link href="/equipe/docs">Ver Documentação</Link>
                                </Button>

                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* (previously here) */}

                {/* Features Grid */}
                <ViteFeatures />

                {/* Code Comparison Section */}
                <CodeComparison />

                {/* Team Section */}
                <TechTeam />

                {/* bottom CTA removed — moved to top hero area per user request */}
            </main>

            {/* Page-level methodology modal removed (modal still available elsewhere) */}

            {/* Rodapé */}
            <Footer7 className="mt-auto border-t border-border bg-muted/30" />
            <VLibras />
        </div>
    );
}
