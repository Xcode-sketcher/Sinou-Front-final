"use client";

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ModernMenu } from "@/components/layout/Header";
import { ArrowRight } from 'lucide-react';
import { HeroGeometricAnimation } from "@/components/sections/hero-geometric-animation";
import { ViteTimeline } from "@/components/sections/vite-timeline";
import { ViteProjectsGallery } from "@/components/sections/vite-projects-gallery";
import { VitePricing } from "@/components/sections/vite-pricing";
import { ViteDemoSection } from "@/components/sections/vite-demo-section";
import { ViteContactSection } from "@/components/sections/vite-contact-section";
import FacialRecognitionAnimation from "@/components/sections/FacialRecognitionAnimation";

const Particles = dynamic(() => import('@/components/ui/Particles'), { ssr: false });
const Footer7 = dynamic(() => import("@/components/layout/Footer").then(mod => mod.Footer7));

/**
 * Página Inicial (Home).
 * Landing page focada em apresentar a Sinout e direcionar para a equipe.
 */
export default function Home() {
  const particleColors = ['#8b5cf6', '#3b82f6', '#ec4899']; // Vite colors: Purple, Blue, Pink

  // Configuração dos links sociais
  const socialItems = [
    { label: "GitHub", href: "https://github.com" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "Discord", href: "https://discord.com" },
  ];





  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">

      {/* Menu de navegação */}
      <ModernMenu items={[]} socialItems={socialItems} />

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
              moveParticlesOnHover={true}
              alphaParticles={false}
              disableRotation={false}
            />
          </div>

          {/* Animação Geométrica de Fundo */}
          <HeroGeometricAnimation />

          <div className="container mx-auto px-4 text-center relative z-10 pt-20">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-2xl">
              Sinout
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 backdrop-blur-sm bg-muted/50 p-4 rounded-xl border border-border/50">
              Dê voz às suas expressões. Transforme micro-gestos em palavras com tecnologia acessível para comunicação sem limites.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/equipe">
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-lg shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all hover:scale-105 flex items-center gap-2">
                  Saiba Mais sobre ELA <ArrowRight className="w-5 h-5" />
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

        {/* Animação de Reconhecimento Facial */}
        <FacialRecognitionAnimation />

        {/* Separador visual */}
        <div className="h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent w-full" />
        {/* Galeria de tecnologias */}
        <ViteProjectsGallery />

        {/* Separador visual */}
        <div className="h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent w-full" />

        {/* Seção de pagamento e equipe */}
        <section id="pagamento" className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <VitePricing />
            <div className="text-center mt-10">
              <Link href="/equipe">
                <button className="px-8 py-3 rounded-full bg-card hover:bg-card/80 border border-border text-foreground font-medium transition-all hover:scale-105">
                  Ver Detalhes da Equipe
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Separador visual */}
        <div className="h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent w-full" />

        {/* Seção de Contato */}
        <ViteContactSection />

        {/* Separador visual */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent w-full" />
      </main>

      {/* Rodapé */}
      <Footer7 className="mt-auto border-t border-border bg-muted/30" />
    </div>
  );
}