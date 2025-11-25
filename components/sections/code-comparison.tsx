"use client";

/**
 * Componente CodeComparison
 *
 * Seção que demonstra a eficiência da equipe Sinout através de uma interface
 * interativa simulando terminal e editor de código. Apresenta o comando de clone
 * do repositório e um exemplo de configuração técnica da plataforma.
 *
 * Funcionalidades principais:
 * - Terminal interativo com comando de clone do GitHub
 * - Funcionalidade de cópia para clipboard com feedback visual
 * - Editor de código simulado mostrando configuração TypeScript
 * - Animações de entrada escalonadas com Framer Motion
 * - Design responsivo com layout lado a lado em desktop
 * - Efeitos visuais com gradientes e sombras
 */

import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * Componente CodeComparison
 * Renderiza uma seção demonstrativa com terminal e editor de código
 * para ilustrar a rapidez e eficiência da equipe Sinout
 */
export function CodeComparison() {
    // Estado para controlar o feedback visual da cópia
    const [copied, setCopied] = useState(false);

    /**
     * Função para copiar o comando de clone para o clipboard
     * Atualiza o estado para mostrar feedback visual por 2 segundos
     */
    const copyToClipboard = () => {
        navigator.clipboard.writeText("git clone https://github.com/sinout/equipe-projetos");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="py-20 bg-muted/10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Seção esquerda com título, descrição e terminal */}
                    <div className="w-full lg:w-1/2">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold mb-6"
                        >
                            Ideias que ganham vida rápido
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-muted-foreground mb-8"
                        >
                            Pegamos o conceito, construímos, testamos e já colocamos para funcionar tudo com foco em inclusão e comunicação.
                        </motion.p>

                        {/* Terminal interativo com comando de clone */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="relative group">
                                {/* Efeito de gradiente animado no hover */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative flex items-center bg-card rounded-lg p-4 font-mono text-sm md:text-base text-foreground border border-border shadow-2xl">
                                    {/* Prompt do terminal com símbolo $ */}
                                    <span className="text-green-400 mr-2">$</span>
                                    {/* Comando de clone do repositório */}
                                    <span className="flex-1">git clone https://github.com/sinout/equipe-projetos</span>
                                    {/* Botão de cópia com ícone dinâmico baseado no estado */}
                                    <button
                                        onClick={copyToClipboard}
                                        className="ml-4 p-2 hover:bg-muted rounded-md transition-colors"
                                        title="Copy to clipboard"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Seção direita com editor de código simulado */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-card rounded-xl border border-border shadow-2xl overflow-hidden"
                        >
                            {/* Barra de título simulando VS Code */}
                            <div className="flex items-center px-4 py-3 border-b border-border bg-muted/50">
                                {/* Botões de controle da janela (fechar, minimizar, maximizar) */}
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                </div>
                                {/* Nome do arquivo sendo editado */}
                                <div className="ml-4 text-xs text-muted-foreground font-mono">sinout-config.ts</div>
                            </div>
                            {/* Conteúdo do editor com código TypeScript sintaxe-colorida */}
                            <div className="p-6 overflow-x-auto">
                                <pre className="font-mono text-sm leading-relaxed">
                                    <code className="text-foreground">
                                        <span className="text-purple-400">import</span>{" { SinoutAI } "}<span className="text-purple-400">from</span>{" "}<span className="text-green-400">&apos;@sinout/ai-core&apos;</span>{"\n"}
                                        <span className="text-purple-400">import</span>{" { FacialRecognition } "}<span className="text-purple-400">from</span>{" "}<span className="text-green-400">&apos;@sinout/vision&apos;</span>{"\n\n"}
                                        <span className="text-gray-500">{"// Configuração da equipe Sinout"}</span>{"\n"}
                                        <span className="text-purple-400">const</span>{" equipeConfig = {"}
                                        {"\n  ai: new SinoutAI({\n"}
                                        {"    model: "}<span className="text-green-400">&apos;facial-expression-v2&apos;</span>{",\n"}
                                        {"    accuracy: "}<span className="text-orange-400">0.95</span>{"\n"}
                                        {"  }),\n"}
                                        {"  vision: new FacialRecognition({\n"}
                                        {"    points: "}<span className="text-orange-400">42</span>{",\n"}
                                        {"    realTime: "}<span className="text-blue-400">true</span>{"\n"}
                                        {"  })\n"}
                                        {"}"}
                                    </code>
                                </pre>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
