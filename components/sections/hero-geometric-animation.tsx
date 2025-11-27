"use client";

/**
 * Componente HeroGeometricAnimation
 *
 * Animação de fundo estática para seções hero com elementos geométricos
 * e formas visuais decorativas. Cria uma atmosfera visual atrativa
 * com orbes de gradiente, formas geométricas animadas e elementos abstratos
 * que simulam código flutuante.
 *
 * Funcionalidades principais:
 * - Orbes de gradiente estáticos com efeitos de blur
 * - Formas geométricas SVG animadas (hexágonos, círculos)
 * - Grade de linhas animadas com movimento orgânico
 * - Elementos de código abstratos flutuantes
 * - Efeitos de blur e blend modes para profundidade visual
 * - Design responsivo e otimizado para performance
 */

import { motion } from "framer-motion";

/**
 * Componente HeroGeometricAnimation
 * Renderiza uma animação de fundo estática com elementos geométricos
 * decorativos e formas visuais atrativas
 */
export const HeroGeometricAnimation = () => {
    // Removido o estado e efeito de rastreamento do mouse para eliminar o parallax inconsistente
    // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Removido o efeito que rastreava o movimento do mouse
    // useEffect(() => {
    //     const handleMouseMove = (e: MouseEvent) => {
    //         setMousePosition({
    //             x: e.clientX / window.innerWidth,
    //             y: e.clientY / window.innerHeight,
    //         });
    //     };

    //     window.addEventListener("mousemove", handleMouseMove);
    //     return () => window.removeEventListener("mousemove", handleMouseMove);
    // }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            {/* Orbes de gradiente estáticos (removido movimento parallax) */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[100px] mix-blend-screen" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[100px] mix-blend-screen" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-[120px] mix-blend-screen" />

            {/* Formas geométricas SVG com animações complexas */}
            <svg className="absolute inset-0 w-full h-full opacity-30">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
                    </linearGradient>
                </defs>

                {/* Hexágono flutuante com movimento complexo */}
                <motion.path
                    d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z"
                    fill="url(#grad1)"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1"
                    initial={{ x: 100, y: 100, opacity: 0, scale: 0.5 }}
                    animate={{
                        x: [100, 120, 100],
                        y: [100, 80, 100],
                        rotate: [0, 360],
                        opacity: 0.6,
                        scale: 1
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Círculo com contorno tracejado em rotação */}
                <motion.circle
                    cx="80%"
                    cy="20%"
                    r="50"
                    fill="none"
                    stroke="url(#grad1)"
                    strokeWidth="2"
                    strokeDasharray="10 5"
                    animate={{
                        rotate: -360,
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Grade de linhas animadas com movimento orgânico */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ duration: 2 }}
                >
                    {Array.from({ length: 10 }).map((_, i) => (
                        <motion.line
                            key={i}
                            x1="0"
                            y1={i * 100}
                            x2="100%"
                            y2={i * 100 + 50}
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="1"
                            animate={{
                                y1: [i * 100, i * 100 + 20, i * 100],
                                y2: [i * 100 + 50, i * 100 + 70, i * 100 + 50],
                            }}
                            transition={{
                                duration: 5 + i,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </motion.g>
            </svg>

            {/* Elementos abstratos simulando trechos de código flutuantes */}
            <div className="absolute inset-0">
                {[
                    { left: 10, top: 20, delay: 0 },
                    { left: 70, top: 40, delay: 1 },
                    { left: 30, top: 70, delay: 2 },
                    { left: 80, top: 10, delay: 3 },
                    { left: 50, top: 80, delay: 4 }
                ].map((pos, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-2 w-32 h-12"
                        initial={{
                            x: pos.left * 10,
                            y: pos.top * 8,
                            opacity: 0
                        }}
                        animate={{
                            y: [null, pos.top * -5],
                            opacity: [0, 0.5, 0]
                        }}
                        transition={{
                            duration: 5 + i,
                            repeat: Infinity,
                            delay: pos.delay,
                            ease: "easeInOut"
                        }}
                        style={{
                            left: `${pos.left}%`,
                            top: `${pos.top}%`,
                        }}
                    >
                        {/* Elementos visuais simulando linhas de código */}
                        <div className="h-2 w-20 bg-muted-foreground/20 rounded mb-2" />
                        <div className="h-2 w-12 bg-muted-foreground/10 rounded" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
