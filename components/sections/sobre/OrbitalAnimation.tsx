"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * OrbitalAnimation Component
 * 
 * Animated hero component displaying Sinout's core values in an orbital layout.
 * Features a central Sinout logo that lights up from a spark particle, with 6 satellites
 * orbiting around it, each representing a core value.
 */

interface OrbitalAnimationProps {
    /** Size variant of the animation */
    size?: 'sm' | 'md' | 'lg';
    /** Whether to auto-play the animation on mount */
    autoPlay?: boolean;
}

interface ValueSatellite {
    label: string;
    angle: number;
    color: string;
    icon: React.ReactNode;
}

// Custom Sinout-themed icons as SVG components
const SinoutIcons = {
    Heart: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
        </svg>
    ),
    Hands: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
            <path d="M18 11c0-3.87-3.13-7-7-7s-7 3.13-7 7c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92z" fill="currentColor" />
            <circle cx="11" cy="11" r="2" fill="currentColor" />
        </svg>
    ),
    Spark: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
            <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" fill="currentColor" />
        </svg>
    ),
    Target: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
    ),
    People: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
            <circle cx="9" cy="7" r="4" fill="currentColor" />
            <path d="M2 21v-4c0-2.21 1.79-4 4-4h6c2.21 0 4 1.79 4 4v4" fill="currentColor" />
            <circle cx="17" cy="8" r="2.5" fill="currentColor" />
            <path d="M22 21v-2.5c0-1.38-1.12-2.5-2.5-2.5H17" fill="currentColor" />
        </svg>
    ),
    Growth: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" fill="currentColor" />
        </svg>
    )
};



export function OrbitalAnimation({ size = 'lg', autoPlay = true }: OrbitalAnimationProps) {
    const [animationPhase, setAnimationPhase] = useState<'dark' | 'spark' | 'lit' | 'orbiting'>('dark');
    const [mounted, setMounted] = useState(false);

    // Define the 6 core values as satellites with solid colors
    const satellites: ValueSatellite[] = [
        { label: "Empatia", angle: 0, color: "bg-purple-600", icon: <SinoutIcons.Heart /> },
        { label: "Solidariedade", angle: 60, color: "bg-orange-500", icon: <SinoutIcons.Hands /> },
        { label: "Inovação", angle: 120, color: "bg-purple-500", icon: <SinoutIcons.Spark /> },
        { label: "Impacto", angle: 180, color: "bg-orange-600", icon: <SinoutIcons.Target /> },
        { label: "Inclusão", angle: 240, color: "bg-purple-700", icon: <SinoutIcons.People /> },
        { label: "Crescimento", angle: 300, color: "bg-orange-400", icon: <SinoutIcons.Growth /> }
    ];

    // Size configurations
    const sizeConfig = {
        sm: { container: 400, core: 80, satellite: 70, orbit: 150 },
        md: { container: 500, core: 100, satellite: 80, orbit: 180 },
        lg: { container: 600, core: 120, satellite: 90, orbit: 220 }
    };

    const config = sizeConfig[size];

    // Handle client-side mounting to avoid hydration mismatch
    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    // Animation sequence
    useEffect(() => {
        if (!autoPlay || !mounted) return;

        const runAnimation = async () => {
            // Phase 1: Dark (0-1s)
            setAnimationPhase('dark');
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Phase 2: Spark travels (1-2s)
            setAnimationPhase('spark');
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Phase 3: Light up (2-2.5s)
            setAnimationPhase('lit');
            await new Promise(resolve => setTimeout(resolve, 500));

            // Phase 4: Orbiting (2.5s+)
            setAnimationPhase('orbiting');
        };

        runAnimation();
    }, [autoPlay, mounted]);

    // Calculate satellite position (no self-rotation, just orbital position)
    const getSatellitePosition = (angle: number, radius: number, orbitRotation: number = 0) => {
        const totalAngle = angle + orbitRotation;
        const radian = (totalAngle * Math.PI) / 180;
        return {
            x: Math.cos(radian) * radius,
            y: Math.sin(radian) * radius
        };
    };

    if (!mounted) {
        // Return a simple placeholder during SSR to match initial client render
        return (
            <div
                className="relative flex items-center justify-center"
                style={{ height: config.container, width: config.container }}
            >
                <div
                    className="absolute rounded-3xl flex items-center justify-center overflow-hidden bg-gray-900 dark:bg-gray-900 border-2 border-gray-800"
                    style={{
                        width: config.core,
                        height: config.core,
                        opacity: 0.3
                    }}
                >
                    <img
                        src="/Logo.svg"
                        alt="Sinout Logo"
                        className="w-20 h-20 opacity-30 object-contain"
                    />
                </div>
            </div>
        );
    }

    return (
        <div
            className="relative flex items-center justify-center"
            style={{ height: config.container, width: config.container }}
        >
            {/* SVG for connection lines */}
            <svg
                className="absolute inset-0 pointer-events-none"
                width={config.container}
                height={config.container}
            >
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#9333EA" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#F97316" stopOpacity="0.1" />
                    </linearGradient>
                </defs>

                {animationPhase === 'orbiting' && satellites.map((satellite, index) => {
                    const pos = getSatellitePosition(satellite.angle, config.orbit);
                    return (
                        <motion.line
                            key={index}
                            x1={config.container / 2}
                            y1={config.container / 2}
                            x2={config.container / 2 + pos.x}
                            y2={config.container / 2 + pos.y}
                            stroke="url(#lineGradient)"
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                        />
                    );
                })}
            </svg>

            {/* Spark particle */}
            {animationPhase === 'spark' && (
                <motion.div
                    className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 shadow-lg shadow-orange-500/50"
                    initial={{
                        x: -config.container / 2 + 50,
                        y: -config.container / 2 + 50,
                        scale: 0.5,
                        opacity: 0
                    }}
                    animate={{
                        x: 0,
                        y: 0,
                        scale: 1,
                        opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                        duration: 1,
                        ease: "easeInOut"
                    }}
                    style={{
                        left: config.container / 2,
                        top: config.container / 2
                    }}
                />
            )}

            {/* Central Core Element with Sinout Logo */}
            <motion.div
                className={`absolute rounded-3xl flex items-center justify-center overflow-hidden bg-gray-900 dark:bg-gray-900 border-2 ${animationPhase === 'lit' || animationPhase === 'orbiting'
                    ? 'border-purple-500'
                    : 'border-gray-800 dark:border-gray-800'
                    }`}
                style={{
                    width: config.core,
                    height: config.core
                }}
                initial={{ opacity: 0.3, scale: 0.9 }}
                animate={{
                    opacity: animationPhase === 'lit' || animationPhase === 'orbiting' ? 1 : 0.3,
                    scale: animationPhase === 'lit' || animationPhase === 'orbiting' ? 1 : 0.9,
                    boxShadow:
                        animationPhase === 'lit' || animationPhase === 'orbiting'
                            ? '0 0 60px rgba(147, 51, 234, 0.4), 0 0 100px rgba(249, 115, 22, 0.2)'
                            : 'none'
                }}
                transition={{ duration: 0.5 }}
            >
                {/* Inner glow effect */}
                {(animationPhase === 'lit' || animationPhase === 'orbiting') && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-orange-500/20 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0.7] }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
                    />
                )}

                {/* Sinout Logo */}
                <div className="relative z-10">
                    <img
                        src="/Logo.svg"
                        alt="Sinout Logo"
                        className={`w-20 h-20 object-contain transition-opacity duration-500 ${animationPhase === 'lit' || animationPhase === 'orbiting' ? 'opacity-100' : 'opacity-30'
                            }`}
                    />
                </div>
            </motion.div>

            {/* Orbital Satellites - they orbit around center, no self-rotation */}
            {animationPhase === 'orbiting' && (
                <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        width: config.container,
                        height: config.container
                    }}
                >
                    {satellites.map((satellite, index) => {
                        const position = getSatellitePosition(satellite.angle, config.orbit);

                        return (
                            <motion.div
                                key={index}
                                className="absolute"
                                initial={{
                                    opacity: 0,
                                    scale: 0
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1
                                }}
                                transition={{
                                    opacity: { duration: 0.4, delay: index * 0.1 },
                                    scale: { duration: 0.4, delay: index * 0.1 }
                                }}
                                style={{
                                    left: config.container / 2 + position.x - config.satellite / 2,
                                    top: config.container / 2 + position.y - config.satellite / 2,
                                    width: config.satellite,
                                    height: config.satellite
                                }}
                            >
                                {/* Counter-rotate the content so text stays readable */}
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="w-full h-full"
                                >
                                    <div
                                        className="w-full h-full rounded-xl bg-gray-800/80 dark:bg-gray-800/80 border border-gray-700 backdrop-blur-sm shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                                    >
                                        <div className="text-center px-2">
                                            <div className={`w-8 h-8 mx-auto mb-1 rounded-lg ${satellite.color} flex items-center justify-center text-white`}>
                                                {satellite.icon}
                                            </div>
                                            <span className="text-xs font-bold text-white whitespace-nowrap">
                                                {satellite.label}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}

            {/* Rotating orbit indicator (subtle) */}
            {animationPhase === 'orbiting' && (
                <motion.div
                    className="absolute rounded-full border border-purple-500/10"
                    style={{
                        width: config.orbit * 2,
                        height: config.orbit * 2,
                        left: config.container / 2 - config.orbit,
                        top: config.container / 2 - config.orbit
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: [0, 0.3, 0.3],
                        scale: 1
                    }}
                    transition={{ duration: 1 }}
                />
            )}
        </div>
    );
}
