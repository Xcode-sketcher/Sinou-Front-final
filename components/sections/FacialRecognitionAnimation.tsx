"use client";

/**
 * Componente FacialRecognitionAnimation
 *
 * Demonstração interativa do sistema de reconhecimento facial do Sinout.
 * Apresenta uma animação visual que simula o processo de detecção de emoções
 * em tempo real, mostrando os pontos faciais, linhas de varredura e
 * identificação de expressões emocionais.
 *
 * Funcionalidades principais:
 * - Animação de pontos faciais (42 pontos simulados)
 * - Ciclo automático entre diferentes emoções
 * - Linhas de varredura durante detecção
 * - Indicador visual de emoção detectada
 * - Estatísticas técnicas da tecnologia
 */

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { Eye, Smile, Frown, Meh, Angry, Heart, type LucideIcon } from "lucide-react";

/**
 * Interface para definição de uma emoção
 */
interface EmotionData {
    /** Nome da emoção em português */
    name: string;
    /** Componente do ícone Lucide React */
    icon: LucideIcon;
    /** Classe CSS para cor do texto */
    color: string;
    /** Classe CSS para cor de fundo */
    bg: string;
}

/**
 * Interface para coordenadas dos pontos faciais
 */
interface FacialPoint {
    /** Posição X em porcentagem (0-100) */
    x: number;
    /** Posição Y em porcentagem (0-100) */
    y: number;
}

/**
 * Componente FacialRecognitionAnimation
 *
 * Renderiza uma demonstração visual completa do sistema de reconhecimento facial,
 * incluindo animações, efeitos visuais e informações técnicas sobre a tecnologia.
 */
const FacialRecognitionAnimation = () => {
    // Estado para controlar qual emoção está sendo exibida
    const [currentEmotion, setCurrentEmotion] = useState(0);

    // Estado para controlar se a detecção está ativa
    const [isDetecting, setIsDetecting] = useState(false);

    // Controles de animação do Framer Motion
    const controls = useAnimation();

    /**
     * Array de emoções suportadas pelo sistema
     * Cada emoção contém nome, ícone, cores para interface
     */
    const emotions: EmotionData[] = [
        { name: "Felicidade", icon: Smile, color: "text-yellow-400", bg: "bg-yellow-400/20" },
        { name: "Tristeza", icon: Frown, color: "text-blue-400", bg: "bg-blue-400/20" },
        { name: "Raiva", icon: Angry, color: "text-red-400", bg: "bg-red-400/20" },
        { name: "Neutro", icon: Meh, color: "text-gray-400", bg: "bg-gray-400/20" },
        { name: "Alegria", icon: Heart, color: "text-pink-400", bg: "bg-pink-400/20" }
    ];

    /**
     * Coordenadas dos pontos faciais simulados
     * Representa 42 pontos distribuídos pelo rosto (olhos, nariz, boca, etc.)
     */
    const facialPoints: FacialPoint[] = [
        // Pontos dos olhos (2 pontos)
        { x: 35, y: 35 }, { x: 65, y: 35 },
        // Pontos do nariz (3 pontos)
        { x: 50, y: 45 }, { x: 48, y: 52 }, { x: 52, y: 52 },
        // Pontos da boca (3 pontos)
        { x: 40, y: 60 }, { x: 50, y: 65 }, { x: 60, y: 60 },
        // Ponto do queixo (1 ponto)
        { x: 50, y: 75 },
        // Pontos das sobrancelhas (4 pontos)
        { x: 32, y: 28 }, { x: 38, y: 28 }, { x: 62, y: 28 }, { x: 68, y: 28 }
    ];

    /**
     * Efeito que controla o ciclo automático de detecção de emoções
     * A cada 3 segundos, inicia uma nova detecção que dura 1.5 segundos
     */
    useEffect(() => {
        const interval = setInterval(() => {
            // Inicia o processo de detecção
            setIsDetecting(true);

            // Anima o contêiner principal (efeito de pulsação)
            controls.start({
                scale: [1, 1.05, 1],
                transition: { duration: 0.5 }
            });

            // Após 1.5 segundos, muda para próxima emoção e para detecção
            setTimeout(() => {
                setCurrentEmotion((prev) => (prev + 1) % emotions.length);
                setIsDetecting(false);
            }, 1500);
        }, 3000);

        // Limpa o intervalo quando componente é desmontado
        return () => clearInterval(interval);
    }, [controls, emotions.length]);

    // Obtém os dados da emoção atualmente selecionada
    const currentEmotionData = emotions[currentEmotion];

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Efeitos de fundo para criar atmosfera visual */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Cabeçalho da seção com título e descrição */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold mb-4 text-purple-600"
                    >
                        Reconhecimento Facial em Ação
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-muted-foreground max-w-2xl mx-auto"
                    >
                        Veja como nossa IA detecta emoções em tempo real, transformando expressões faciais em comunicação.
                    </motion.p>
                </div>

                {/* Layout principal com animação e conteúdo */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Seção da animação facial */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex justify-center"
                    >
                        <div className="relative">
                            {/* Contêiner principal do rosto com borda animada */}
                            <motion.div
                                animate={controls}
                                className="w-80 h-80 rounded-full border-4 border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-blue-500/10 flex items-center justify-center relative overflow-hidden"
                            >
                                {/* Pontos faciais animados - simulam os 42 pontos de detecção */}
                                {facialPoints.map((point, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: isDetecting ? 1 : 0.3,
                                            scale: isDetecting ? 1 : 0.8
                                        }}
                                        transition={{
                                            delay: isDetecting ? index * 0.05 : 0,
                                            duration: 0.3
                                        }}
                                        className="absolute w-2 h-2 bg-purple-400 rounded-full"
                                        style={{
                                            left: `${point.x}%`,
                                            top: `${point.y}%`,
                                            transform: 'translate(-50%, -50%)'
                                        }}
                                    />
                                ))}

                                {/* Linha de varredura que simula o processo de análise */}
                                <motion.div
                                    animate={{
                                        y: isDetecting ? [0, 320, 0] : 0,
                                        opacity: isDetecting ? [0, 1, 0] : 0
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: isDetecting ? Infinity : 0,
                                        ease: "linear"
                                    }}
                                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                                />

                                {/* Ícone do olho como elemento central */}
                                <motion.div
                                    animate={{ scale: isDetecting ? [1, 1.2, 1] : 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-purple-400/60"
                                >
                                    <Eye className="w-24 h-24" />
                                </motion.div>
                            </motion.div>

                            {/* Indicador da emoção detectada */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
                            >
                                <div className={`flex items-center gap-3 px-6 py-3 rounded-full ${currentEmotionData.bg} border border-border backdrop-blur-sm`}>
                                    <currentEmotionData.icon className={`w-6 h-6 ${currentEmotionData.color}`} />
                                    <span className="font-semibold text-foreground">
                                        {currentEmotionData.name}
                                    </span>
                                    {/* Indicador de atividade (pulsante durante detecção) */}
                                    <motion.div
                                        animate={{ scale: isDetecting ? [1, 1.2, 1] : 1 }}
                                        className="w-2 h-2 bg-green-400 rounded-full"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Seção de conteúdo explicativo */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Descrição da tecnologia */}
                        <div>
                            <h3 className="text-2xl font-bold text-foreground mb-4">
                                Tecnologia Avançada de Detecção
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                Nossa IA analisa 42 pontos faciais em tempo real, detectando micro-expressões
                                e traduzindo-as em comunicação clara e precisa.
                            </p>
                        </div>

                        {/* Cards com estatísticas técnicas */}
                        <div className="space-y-4">
                            {/* Card: Pontos Faciais */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border"
                            >
                                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                    <span className="text-purple-400 font-bold">42</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">Pontos Faciais</h4>
                                    <p className="text-sm text-muted-foreground">Mapeamento preciso de expressões</p>
                                </div>
                            </motion.div>

                            {/* Card: Emoções Principais */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border"
                            >
                                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                    <span className="text-blue-400 font-bold">7</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">Emoções Principais</h4>
                                    <p className="text-sm text-muted-foreground">Felicidade, tristeza, raiva, medo, nojo, surpresa, neutral</p>
                                </div>
                            </motion.div>

                            {/* Card: Processamento em Tempo Real */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border"
                            >
                                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                                    <span className="text-pink-400 font-bold">⚡</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">Processamento em Tempo Real</h4>
                                    <p className="text-sm text-muted-foreground">Análise instantânea de expressões faciais</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FacialRecognitionAnimation;