/**
 * Página Inicial
 * Página de entrada focada em apresentar a Sinout e direcionar visitantes às seções principais do site.
 */
"use client";

import { Footer7 } from "@/components/layout/Footer";
import Particles from "@/components/ui/Particles";
import { HeroGeometricAnimation } from "@/components/sections/hero-geometric-animation";
import { ViteDemoSection } from "@/components/sections/vite-demo-section";
import { ViteTimeline } from "@/components/sections/vite-timeline";
import { VitePricing } from "@/components/sections/vite-pricing";
import { ViteContactSection } from "@/components/sections/vite-contact-section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Script from "next/script";

export default function Home() {
  const particleColors = ['#9333EA', '#F97316', '#A855F7'];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      {/* O `ModernMenu` é renderizado no layout global; evite renderizar novamente nesta página para prevenir duplicação. */}

      <main className="flex-grow">
        {/* Hero Section com Animação Geométrica e Partículas */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Fundo com partículas animadas */}
          <div className="absolute inset-0 z-0">
            <Particles
              particleColors={particleColors}
              particleCount={400}
              particleSpread={10}
              speed={0.2}
              particleBaseSize={200}
              moveParticlesOnHover={false}
              alphaParticles={false}
              disableRotation={false}
            />
          </div>

          {/* Animação Geométrica de Fundo */}
          <HeroGeometricAnimation />

          <div className="container mx-auto px-4 text-center relative z-10 pt-20">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 text-purple-600 drop-shadow-2xl">
              Sinout
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 backdrop-blur-sm bg-muted/50 p-4 rounded-xl border border-border/50">
              Dê voz às suas expressões. Transforme micro-expressões em palavras com tecnologia acessível para comunicação sem limites.
            </p>


            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/sobre">
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-bold text-lg shadow-[0_0_20px_rgba(249,115,22,0.5)] transition-all hover:scale-105 flex items-center gap-2">
                  Saiba mais sobre o projeto <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/login">
                <button className="px-8 py-4 rounded-full bg-card/50 hover:bg-card/80 border border-border text-foreground font-medium text-lg transition-all hover:scale-105 backdrop-blur-md">
                  Experimente Gratuitamente
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Separador visual */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent w-full" />

        {/* Seção de Demo */}
        <ViteDemoSection />

        {/* Separador visual */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent w-full" />

        {/* Seção da timeline */}
        <ViteTimeline />

        {/* Separador visual */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent w-full" />

        {/* Seção de Preços */}
        <VitePricing />

        {/* Separador visual */}
        <div className="h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent w-full" />

        {/* Separador visual */}
        <div className="h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent w-full" />

        {/* Seção de Contato */}
        <ViteContactSection />

        {/* Separador visual */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent w-full" />
      </main >

      {/* Rodapé */}
      <Footer7 className="mt-auto border-t border-border bg-muted/30" />
      {/* < CustomCursor /> */}
      <Script
        src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js"
        strategy="lazyOnload"
        defer
      />

    </div >
  );
}