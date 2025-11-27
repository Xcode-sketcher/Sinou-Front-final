"use client";

/**
 * Componente VitePipelineAnimation
 *
 * Animação SVG interativa que representa o pipeline de desenvolvimento da Sinout,
 * mostrando a transformação de ideias conceituais em tecnologias concretas através
 * de um fluxo visual com elementos animados.
 *
 * Funcionalidades principais:
 * - Animação de partículas fluindo da esquerda (entradas) para direita (saídas)
 * - Caixa central representando o Vite como núcleo do processo
 * - Gradientes e efeitos de glow para destacar elementos importantes
 * - Animações SVG nativas com animateMotion para movimento suave
 * - Design responsivo que se adapta ao container pai
 * - Efeitos visuais com filtros SVG (blur, glow)
 */

/**
 * Componente VitePipelineAnimation
 * Renderiza uma animação SVG representando o fluxo de desenvolvimento
 * desde ideias até tecnologias implementadas
 */
export function VitePipelineAnimation() {
    // Dados das entradas do pipeline (lados esquerdo)
    const inputs = [
        { label: "Ideia", y: 50 },
        { label: "Conceito", y: 100 },
        { label: "Planejamento", y: 150 },
        { label: "Tecnologia", y: 200 },
    ];

    // Dados das saídas do pipeline (lado direito)
    const outputs = [
        { label: "React", y: 80 },
        { label: "TypeScript", y: 150 },
        { label: "ASP.NET", y: 220 },
    ];

    return (
        <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center relative select-none pointer-events-none">
            {/* Fundo com efeito de brilho gradiente */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl rounded-full opacity-50" />

            {/* SVG principal da animação */}
            <svg className="w-full h-full" viewBox="-100 0 1000 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Definições de gradientes e filtros */}
                <defs>
                    {/* Gradiente para as linhas de conexão */}
                    <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#646cff" stopOpacity="0" />
                        <stop offset="50%" stopColor="#646cff" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#bd34fe" stopOpacity="1" />
                    </linearGradient>

                    {/* Gradiente para o logo Vite */}
                    <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#41d1ff" />
                        <stop offset="100%" stopColor="#bd34fe" />
                    </linearGradient>

                    {/* Filtro de brilho para efeitos visuais */}
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Linhas de entrada (lado esquerdo) */}
                {inputs.map((input, i) => {
                    // Caminho curvo da entrada até a caixa central
                    const path = `M50 ${input.y} C 200 ${input.y} 250 150 350 150`;
                    return (
                        <g key={`input-${i}`}>
                            {/* Nó com label da entrada */}
                            <g transform={`translate(50, ${input.y})`}>
                                <circle r="4" fill="#1e1e20" stroke="#646cff" strokeWidth="2" />
                                <text x="-10" y="4" textAnchor="end" fill="#a78bfa" fontSize="12" fontFamily="monospace" className="font-bold">{input.label}</text>
                            </g>

                            {/* Linha de conexão com gradiente */}
                            <path d={path} stroke="url(#line-gradient)" strokeWidth="1" strokeOpacity="0.3" />
                            {/* Partícula animada seguindo o caminho */}
                            <circle r="3" fill="#646cff">
                                <animateMotion
                                    dur="5s"
                                    repeatCount="indefinite"
                                    path={path}
                                    rotate="auto"
                                    begin={`${i * 0.2}s`}
                                    keyPoints="0;1;1"
                                    keyTimes="0;0.4;1"
                                    calcMode="linear"
                                />
                            </circle>
                        </g>
                    );
                })}

                {/* Caixa central representando o Vite */}
                <g transform="translate(350, 100)">
                    <rect width="100" height="100" rx="16" fill="#1e1e20" stroke="#646cff" strokeWidth="2" className="drop-shadow-[0_0_15px_rgba(100,108,255,0.5)]" />
                    {/* Logo do Vite estilizado */}
                    <path transform="translate(15, 15) scale(0.7)" d="M50 10 L90 90 L50 70 L10 90 Z" fill="url(#logo-gradient)" filter="url(#glow)" />
                </g>

                {/* Linhas de saída (lado direito) */}
                {outputs.map((output, i) => {
                    // Caminho curvo da caixa central até a saída
                    const path = `M450 150 C 550 150 600 ${output.y} 750 ${output.y}`;
                    return (
                        <g key={`output-${i}`}>
                            {/* Linha de conexão roxa */}
                            <path d={path} stroke="#bd34fe" strokeWidth="1" strokeOpacity="0.3" />

                            {/* Partículas de saída animadas */}
                            <circle r="3" fill="#bd34fe">
                                <animateMotion
                                    dur="5s"
                                    repeatCount="indefinite"
                                    path={path}
                                    rotate="auto"
                                    begin={`${i * 0.2}s`}
                                    keyPoints="0;0;1;1"
                                    keyTimes="0;0.5;0.9;1"
                                    calcMode="linear"
                                />
                            </circle>

                            {/* Nó com label da saída */}
                            <g transform={`translate(750, ${output.y})`}>
                                <circle r="4" fill="#1e1e20" stroke="#bd34fe" strokeWidth="2" />
                                <text x="10" y="4" textAnchor="start" fill="#a78bfa" fontSize="12" fontFamily="monospace" className="font-bold">{output.label}</text>
                            </g>
                        </g>
                    )
                })}

            </svg>
        </div>
    );
}
