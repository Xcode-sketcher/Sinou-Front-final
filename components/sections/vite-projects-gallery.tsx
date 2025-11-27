"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import Link from "next/link";

/**
 * Interface para definição de um projeto no portfólio
 * Estrutura os dados necessários para renderizar cada card de projeto
 */
interface Project {
    /** Título do projeto */
    title: string;
    /** Descrição detalhada do projeto */
    description: string;
    /** URL da imagem do projeto */
    image: string;
    /** Tag/categoria do projeto (ex: "Core Tech", "Mobile") */
    tag: string;
    /** Classes CSS para gradiente da tag */
    tagColor: string;
    /** Array de tecnologias utilizadas no projeto */
    techs: string[];
}

/**
 * Props para o componente ProjectCard
 * Define as propriedades necessárias para renderizar um card individual
 */
interface ProjectCardProps {
    /** Dados do projeto a ser exibido */
    project: Project;
    /** Índice do projeto na lista para animação staggered */
    index: number;
}

/**
 * Componente de card individual para exibição de projeto
 *
 * Renderiza um card interativo com imagem, título, descrição, tags e tecnologias.
 * Inclui animações de entrada, efeitos hover e botões de ação para GitHub e link externo.
 *
 * Funcionalidades:
 * - Animação de entrada com delay baseado no índice
 * - Efeitos hover com escala e sombra
 * - Botões flutuantes para ações (GitHub/External Link)
 * - Tags coloridas com gradientes
 * - Lista de tecnologias utilizadas
 * - Imagem responsiva com overlay gradiente
 *
 * @component
 * @param {ProjectCardProps} props - Propriedades do componente
 * @returns {JSX.Element} Card de projeto com todas as informações e interações
 */
const ProjectCard = ({ project, index }: ProjectCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative rounded-2xl bg-card border border-border overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
        >
            {/* Seção da imagem com overlay e botões flutuantes */}
            <div className="relative h-48 overflow-hidden">
                {/* Overlay gradiente para melhorar legibilidade */}
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-60" />

                {/* Imagem do projeto com efeito de zoom no hover */}
                <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />

                {/* Botões de ação que aparecem no hover */}
                <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    <button className="p-2 rounded-full bg-background/50 backdrop-blur-md border border-border hover:bg-background/80 transition-colors">
                        <Github className="w-4 h-4 text-foreground" />
                    </button>
                    <button className="p-2 rounded-full bg-background/50 backdrop-blur-md border border-border hover:bg-background/80 transition-colors">
                        <ExternalLink className="w-4 h-4 text-foreground" />
                    </button>
                </div>
            </div>

            {/* Seção de conteúdo com informações do projeto */}
            <div className="p-6 relative z-20">
                {/* Tag/categoria do projeto com gradiente colorido */}
                <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r ${project.tagColor} bg-opacity-10 text-foreground border border-border/50`}>
                        {project.tag}
                    </span>
                </div>

                {/* Título com efeito hover e ícone animado */}
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-purple-400 transition-colors flex items-center gap-2">
                    {project.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>

                {/* Descrição truncada com line-clamp */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                </p>

                {/* Lista de tecnologias utilizadas */}
                <div className="flex flex-wrap gap-2">
                    {project.techs.map((tech: string, i: number) => (
                        <span key={i} className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded border border-border">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

/**
 * Galeria de projetos do ecossistema Sinout
 *
 * Componente que apresenta o portfólio completo de projetos e tecnologias
 * desenvolvidas pela equipe. Mostra quatro projetos principais em um grid
 * responsivo com cards interativos e animações de entrada.
 *
 * Projetos apresentados:
 * - Leitura Facial IA: Algoritmo de reconhecimento facial
 * - App do Cuidador: Interface móvel para acompanhamento
 * - Síntese de Voz Neural: Conversão texto-fala
 * - Integração IoT: Controle de dispositivos inteligentes
 *
 * Funcionalidades principais:
 * - Grid responsivo (1 coluna mobile, 2 tablet, 4 desktop)
 * - Animações de entrada staggered para cada card
 * - Efeitos hover avançados em cada projeto
 * - Botão de call-to-action para ver mais funcionalidades
 * - Design consistente com o restante da landing page
 *
 * @component
 * @example
 * ```tsx
 * <ViteProjectsGallery />
 * ```
 *
 * @returns {JSX.Element} Galeria completa de projetos com cards interativos
 */
export const ViteProjectsGallery = () => {
    // Array de projetos do ecossistema Sinout
    const projects: Project[] = [
        {
            title: "Leitura Facial IA",
            description: "Algoritmo proprietário que mapeia 42 pontos faciais para detectar micro-movimentos e traduzi-los em comandos.",
            image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3",
            tag: "Core Tech",
            tagColor: "from-blue-500 to-cyan-500",
            techs: ["Python", "TensorFlow", "OpenCV"]
        },
        {
            title: "App do Cuidador",
            description: "Interface móvel para familiares e cuidadores acompanharem o bem-estar e necessidades do paciente em tempo real.",
            image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3",
            tag: "Mobile",
            tagColor: "from-purple-500 to-pink-500",
            techs: ["React Native", "Expo", "Real-time DB"]
        },
        {
            title: "Síntese de Voz Neural",
            description: "Transforma o texto gerado em fala natural e expressiva, permitindo que o usuário seja ouvido com clareza.",
            image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3",
            tag: "Audio AI",
            tagColor: "from-emerald-500 to-teal-500",
            techs: ["TTS API", "Deep Learning", "Audio"]
        },
        {
            title: "Integração IoT",
            description: "Controle dispositivos inteligentes da casa (luzes, TV, ar-condicionado) apenas com expressões faciais.",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3",
            tag: "Smart Home",
            tagColor: "from-orange-500 to-red-500",
            techs: ["MQTT", "IoT", "Node.js"]
        }
    ];

    return (
        <section className="py-20 bg-muted/20">
            <div className="container mx-auto px-4">
                {/* Cabeçalho da seção com título em gradiente */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4">
                        Ecossistema Sinout
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Uma suíte completa de ferramentas projetadas para devolver a autonomia e conectar pessoas.
                    </p>
                </div>

                {/* Grid responsivo de projetos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>

                {/* Call-to-action para ver mais funcionalidades */}
                <div className="text-center mt-12">
                    <Link href="/features">
                        <button className="px-8 py-3 rounded-full bg-card hover:bg-card/80 border border-border text-foreground font-medium transition-all hover:scale-105 flex items-center gap-2 mx-auto">
                            Ver Todas as Funcionalidades <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};