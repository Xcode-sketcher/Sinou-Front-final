"use client";

/**
 * Componente FrameworkLogos
 *
 * Seção que exibe a stack tecnológica da empresa em um efeito de marquee animado.
 * Apresenta os principais frameworks e tecnologias utilizados, com cores
 * características de cada tecnologia e efeito de scroll infinito.
 *
 * Funcionalidades principais:
 * - Lista de 8 tecnologias principais (HTML, CSS, JS, TS, React, Next.js, ASP.NET, C#)
 * - Efeito de marquee duplo para scroll infinito suave
 * - Cores oficiais de cada tecnologia
 * - Interação hover com mudança de opacidade
 * - Design responsivo com espaçamento adequado
 * - Animações CSS personalizadas (animate-marquee, animate-marquee2)
 */

/**
 * Array de frameworks/tecnologias exibidos na seção
 * Cada item contém nome e cor oficial da tecnologia
 */
const frameworks = [
    { name: "HTML", color: "#e34f26" },
    { name: "CSS", color: "#1572b6" },
    { name: "JavaScript", color: "#f7df1e" },
    { name: "TypeScript", color: "#3178c6" },
    { name: "React", color: "#61dafb" },
    { name: "Next.js", color: "#f0f" },
    { name: "ASP.NET", color: "#512bd4" },
    { name: "C#", color: "#239120" },
];

/**
 * Componente FrameworkLogos
 * Renderiza uma seção com logos/frameworks em movimento contínuo
 */
export function FrameworkLogos() {
    return (
        <section className="py-12 border-y border-border bg-background overflow-hidden">
            {/* Cabeçalho da seção */}
            <div className="container mx-auto px-4 md:px-6 text-center mb-8">
                <h2 className="text-2xl font-semibold text-muted-foreground">
                    Nossa stack tecnológica
                </h2>
            </div>

            {/* Container do efeito marquee com overflow oculto */}
            <div className="relative flex overflow-x-hidden group">
                {/* Primeira camada do marquee - movimento da esquerda para direita */}
                <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
                    {[...frameworks, ...frameworks, ...frameworks].map((fw, i) => (
                        <div
                            key={i}
                            className="text-2xl font-bold flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-default"
                            style={{ color: fw.color }}
                        >
                            {/* Indicador visual colorido da tecnologia */}
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: fw.color }}></span>
                            {fw.name}
                        </div>
                    ))}
                </div>

                {/* Segunda camada do marquee - movimento com delay para efeito contínuo */}
                <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-16 items-center ml-16">
                    {[...frameworks, ...frameworks, ...frameworks].map((fw, i) => (
                        <div
                            key={i}
                            className="text-2xl font-bold flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-default"
                            style={{ color: fw.color }}
                        >
                            {/* Indicador visual colorido da tecnologia */}
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: fw.color }}></span>
                            {fw.name}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
