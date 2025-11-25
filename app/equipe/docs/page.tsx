"use client";

import { ModernMenu } from "@/components/layout/Header";
import { motion } from "framer-motion";
import { MethodologyModal } from "@/components/modals/MethodologyModal";
import { ArrowLeft, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Dados reais da equipe (preenchido a partir dos perfis no site)
const teamMembers = [
    {
        name: "Fabio Rocha",
        role: "Scrum Master & Full Stack",
        avatar: "/Fabio.svg",
        description: "Foco em coordenação de equipes, definição de processos ágeis e entrega de valor iterativo.",
        contributions: [
            "Facilitação das Sprints e remoção de impedimentos",
            "Definição de práticas ágeis e governança do processo",
            "Contribuições em frontend e backend quando necessário",
            "Mentoria técnica e liderança de times"
        ],
        social: {
            github: "https://github.com/FabioRoberto-ppt",
            linkedin: "https://www.linkedin.com/in/fabio-roberto-980199301/",
            
        }
    },
    {
        name: "Luana Miron",
        role: "Product Owner & Marketing",
        avatar: "/Luana.svg",
        description: "Forte foco em estratégia de produto, UX e posicionamento de mercado.",
        contributions: [
            "Definição da visão do produto e roadmap",
            "Estratégia de comunicação e marketing",
            "Pesquisa com usuários e priorização de features",
            "Colaboração com design e growth"
        ],
        social: {
            github: "https://github.com/luanarochamiron",
            linkedin: "https://www.linkedin.com/in/luanarochamiron/",
        }
    },
    {
        name: "Eduardo Barbosa",
        role: "Full Stack & DevOps Lead",
        avatar: "/Eduardo.svg",
        description: "Responsável pela arquitetura, integração com IA e operação dos ambientes de produção.",
        contributions: [
            "Arquitetura do sistema em Next.js",
            "Implementação do reconhecimento facial e integração com APIs de IA",
            "Pipelines de CI/CD e práticas de observabilidade",
            "Gestão da infraestrutura e coordenação técnica"
        ],
        social: {
            github: "https://github.com/Xcode-sketcher",
            linkedin: "https://www.linkedin.com/in/eduardo-barbosa-silva-896635363/",

        }
    },
    {
        name: "Guilherme França",
        role: "Front End & Marketing",
        avatar: "/Guilherme.svg",
        description: "Focado em interfaces ricas, acessibilidade e material de divulgação/marketing.",
        contributions: [
            "Desenvolvimento de interfaces e componentes reativos",
            "Criação de material de marketing e conteúdo",
            "Otimização de performance e experiência do usuário",
            "Integração com design e fluxo de conteúdo"
        ],
        social: {
            github: "https://github.com/GuilhermefDomingues",
            linkedin: "https://www.linkedin.com/in/guilherme-fran%C3%A7a-domingues-84a070276/",

        }
    },
    {
        name: "Erick Isaac",
        role: "Full Stack & Finance",
        avatar: "/Erick.svg",
        description: "Foco em integração servidor/cliente e apoio às áreas financeiras do produto.",
        contributions: [
            "Integração backend/frontend e APIs",
            "Suporte a operações e integração financeira",
            "Desenvolvimento de features de infraestrutura crítica",
            "Garantia de estabilidade nas entregas"
        ],
        social: {
            github: "https://github.com/IsaacZ33",
            linkedin: "https://linkedin.com/in/erick-isaac",
        }
    },
    {
        name: "Felipe Trivia",
        role: "Front End Developer",
        avatar: "/Felipe.svg",
        description: "Dedicado a prototipagem, estilização e performance web/mobile.",
        contributions: [
            "Prototipagem e telas de alta fidelidade",
            "Estilização, temas e UX para dispositivos móveis",
            "Otimização de performance e acessibilidade",
            "Colaboração com QA para garantir qualidade"
        ],
        social: {
            github: "https://github.com/Felipe-Koshimizu",
            linkedin: "https://www.linkedin.com/in/felipe-trivia-koshimizu-90058721a/",
        }
    }
];

export default function TeamDocsPage() {
    const socialItems = [
        { label: "", href: "#" },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <ModernMenu items={[]} socialItems={socialItems} />

            <main className="container mx-auto px-4 py-24">
                <div className="mb-8">
                    <Link href="/equipe" className="inline-flex items-center text-muted-foreground hover:text-orange-500 transition-colors mb-6">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar para Equipe
                    </Link>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-4xl font-bold mb-2 text-purple-600">
                                Documentação da Equipe
                            </h1>
                            <p className="text-muted-foreground">
                                Detalhes sobre os membros, funções e contribuições para o projeto Sinout.
                            </p>
                        </div>
                        <MethodologyModal />
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow hover:border-orange-500/30 flex flex-col h-full"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-foreground">{member.name}</h2>
                                    <span className="text-sm font-medium text-orange-500">{member.role}</span>
                                </div>
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border bg-background flex items-center justify-center">
                                    <Image src={member.avatar} alt={member.name} width={48} height={48} className="object-cover rounded-full" />
                                </div>
                            </div>

                            <p className="text-muted-foreground text-sm mb-6 min-h-[60px]">
                                {member.description}
                            </p>

                            {/* ensure contributions take available space so social icons sit at the bottom */}
                            <div className="mb-6 flex-grow">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Contribuições Principais</h3>
                                <ul className="space-y-2">
                                    {member.contributions.map((contribution, idx) => (
                                        <li key={idx} className="text-sm flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0" />
                                            <span>{contribution}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-border mt-4">
                                <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-600 transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                {/* <a href={member.social.email} className="text-muted-foreground hover:text-orange-500 transition-colors">
                                    <Mail className="w-5 h-5" />
                                </a> */}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
