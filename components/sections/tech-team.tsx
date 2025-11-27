"use client";

/**
 * Componente TechTeam
 *
 * Seção que apresenta a equipe técnica da Sinout com perfis detalhados de cada membro.
 * Exibe informações sobre responsabilidades, habilidades técnicas e links para redes sociais,
 * com design responsivo e animações de entrada elegantes.
 */

import { motion } from "framer-motion";
import { Github, Linkedin, Database, Server, Code2, Bug, ClipboardList, Palette, Users, Target, Megaphone, DollarSign, Headphones, Layout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/**
 * Interface para definir um membro da equipe
 */
interface TeamMember {
    /** Nome completo do membro */
    name: string;
    /** Cargo/função na empresa */
    role: string;
    /** Handle do usuário (GitHub/Twitter) */
    handle: string;
    /** Caminho para a imagem do avatar */
    avatar: string;
    /** Array de tags/tecnologias */
    tags: string[];
    /** Classe CSS para gradiente de cor */
    color: string;
    /** URL do perfil GitHub */
    github: string;
    /** URL do perfil LinkedIn */
    linkedin: string;
    /** Lista de responsabilidades com ícones */
    responsibilities: Array<{
        icon: React.ComponentType<{ className?: string }>;
        label: string;
        color: string;
    }>;
}

/**
 * Array com dados completos da equipe técnica
 * Cada membro inclui informações pessoais, responsabilidades e habilidades
 */
const team: TeamMember[] = [
    {
        name: "Fabio Rocha",
        role: "Scrum Master & Full Stack",
        handle: "@FabioRoberto-ppt",
        avatar: "/Fabio.svg",
        tags: ["Agile", "Leadership", "Jira"],
        color: "from-blue-500 to-cyan-500",
        github: "https://github.com/FabioRoberto-ppt",
        linkedin: "https://www.linkedin.com/in/fabio-rocha",
        responsibilities: [
            { icon: Palette, label: "UI/UX", color: "text-purple-400" },
            { icon: Users, label: "Leadership", color: "text-yellow-400" },
            { icon: Code2, label: "Desenvolvimento", color: "text-green-400" },
            { icon: ClipboardList, label: "Metodologias Ágeis", color: "text-blue-400" },
        ]
    },
    {
        name: "Luana Miron",
        role: "Product Owner & Marketing",
        handle: "@luanarochamiron",
        avatar: "/Luana.svg",
        tags: ["Product", "Strategy", "UX"],
        color: "from-purple-500 to-pink-500",
        github: "https://github.com/luanarochamiron",
        linkedin: "https://www.linkedin.com/in/luana-miron",
        responsibilities: [
            { icon: Layout, label: "Estratégia", color: "text-blue-400" },
            { icon: Palette, label: "UX Design", color: "text-purple-400" },
            { icon: Target, label: "Gestão de Produto", color: "text-red-400" },
            { icon: Megaphone, label: "Comunicação", color: "text-pink-400" },
        ]
    },
    {
        name: "Eduardo Barbosa",
        role: "Full Stack & DevOps Lead",
        handle: "@Xcode-sketcher",
        avatar: "/Eduardo.svg",
        tags: ["Full Stack", "QA", "DevOps", "DBA"],
        color: "from-green-500 to-emerald-500",
        github: "https://github.com/Xcode-sketcher",
        linkedin: "https://www.linkedin.com/in/eduardo-barbosa-silva-896635363/",
        responsibilities: [
            { icon: Bug, label: "QA Testing", color: "text-red-400" },
            { icon: Server, label: "DevOps", color: "text-blue-400" },
            { icon: Database, label: "DBA", color: "text-yellow-400" },
            { icon: Code2, label: "Arquitetura", color: "text-green-400" },
        ]
    },
    {
        name: "Guilherme França",
        role: "Full Stack & Marketing",
        handle: "@GuilhermefDomingues",
        avatar: "/Guilherme.svg",
        tags: ["React", "Next.js", "TypeScript"],
        color: "from-orange-500 to-red-500",
        github: "https://github.com/GuilhermefDomingues",
        linkedin: "https://www.linkedin.com/in/guilherme-fran%C3%A7a-domingues-84a070276/",
        responsibilities: [
            { icon: Palette, label: "UI/UX", color: "text-purple-400" },
            { icon: Layout, label: "React", color: "text-blue-400" },
            { icon: Code2, label: "Integração", color: "text-orange-400" },
            { icon: Megaphone, label: "Conteúdo Digital", color: "text-pink-400" },
        ]
    },
    {
        name: "Erick Isaac",
        role: "Full Stack & Finance",
        handle: "@ErickIsaac",
        avatar: "/Erick.svg",
        tags: ["Frontend", "Backend", "IA"],
        color: "from-indigo-500 to-blue-500",
        github: "https://github.com/IsaacZ33",
        linkedin: "https://www.linkedin.com/in/erick-isaac",
        responsibilities: [
            { icon: DollarSign, label: "Financeiro", color: "text-green-400" },
            { icon: Headphones, label: "Suporte", color: "text-blue-400" },
            { icon: Server, label: "Backend", color: "text-purple-400" },
            { icon: Code2, label: "Integração", color: "text-indigo-400" },
        ]
    },
    {
        name: "Felipe Trivia",
        role: "Front End Developer",
        handle: "@Felipe_Koshimizu",
        avatar: "/Felipe.svg",
        tags: ["Web", "Mobile", "Cloud"],
        color: "from-teal-500 to-green-500",
        github: "https://github.com/Felipe-Koshimizu",
        linkedin: "https://www.linkedin.com/in/felipe-trivia-koshimizu-90058721a/",
        responsibilities: [
            { icon: Layout, label: "Prototipagem", color: "text-blue-400" },
            { icon: Palette, label: "Estilização", color: "text-pink-400" },
            { icon: Server, label: "Integração", color: "text-green-400" },
            { icon: Code2, label: "Performance", color: "text-teal-400" },
        ]
    }
];

/**
 * Componente TechTeam
 * Renderiza uma seção apresentando todos os membros da equipe técnica
 * com animações e design responsivo
 */
export function TechTeam() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                {/* Cabeçalho da seção */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                        As Mentes por Trás da Sinout
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                       Equipe completa, com diferentes habilidades, dedicada a criar experiências web mais inteligentes e acessíveis.
                    </p>
                </div>

                {/* Grid responsivo de cards da equipe */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative p-1 rounded-2xl bg-gradient-to-br ${member.color} hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300`}
                        >
                            {/* Efeito de brilho no hover */}
                            <div className="absolute inset-0 bg-white/5 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Card principal com conteúdo */}
                            <div className="relative h-full bg-card rounded-xl p-6 flex flex-col border border-border">
                                {/* Header com avatar e links sociais */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="relative">
                                        {/* Efeito de brilho no avatar */}
                                        <div className={`absolute -inset-1 bg-gradient-to-br ${member.color} rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity`} />
                                        <Image
                                            src={member.avatar}
                                            alt={member.name}
                                            width={96}
                                            height={96}
                                            className="relative rounded-full border-2 border-border bg-background"
                                        />
                                    </div>
                                    {/* Links para redes sociais individualizados */}
                                    <div className="flex gap-2">
                                        <Link 
                                            href={member.github} 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
                                        >
                                            <Github className="w-4 h-4" />
                                        </Link>
                                        <Link 
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>

                                {/* Informações pessoais */}
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                                    <p className={`text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r ${member.color}`}>
                                        {member.role}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">{member.handle}</p>
                                </div>

                                {/* Seção de responsabilidades */}
                                <div className="mb-6 p-4 rounded-lg bg-muted/50 border border-border flex-grow">
                                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Responsabilidades Principais</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {member.responsibilities.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-sm text-foreground">
                                                <item.icon className={`w-4 h-4 ${item.color}`} /> {item.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Tags de tecnologias/habilidades */}
                                <div className="mt-auto flex flex-wrap gap-2">
                                    {member.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 rounded-md bg-muted border border-border text-xs font-medium text-muted-foreground group-hover:border-border group-hover:text-foreground transition-colors"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}