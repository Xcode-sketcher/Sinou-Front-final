"use client";

/**
 * Componente ContextMenu
 *
 * Menu de contexto personalizado que aparece ao clicar com o botão direito do mouse.
 * Fornece acesso rápido a funcionalidades essenciais da aplicação, incluindo navegação,
 * alteração de tema, compartilhamento e acesso a informações do sistema.
 *
 * Funcionalidades principais:
 * - Menu contextual responsivo com animações suaves
 * - Alternância entre tema claro e escuro
 * - Navegação para seções específicas da página
 * - Compartilhamento nativo ou cópia de link
 * - Acesso rápido a configurações e ajuda
 * - Design moderno com backdrop blur e transições
 */

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Moon, Sun, Share2, Settings, HelpCircle, Info, CreditCard, FileText, type LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";

/**
 * Interface para definição de um item do menu de contexto
 */
interface MenuItem {
    /** Texto exibido no item do menu */
    label: string;
    /** Componente do ícone Lucide React */
    icon: LucideIcon;
    /** Função executada ao clicar no item */
    action: () => void;
}

/**
 * Interface para definição de uma seção do menu
 */
interface MenuSection {
    /** Título da seção */
    label: string;
    /** Tipo da seção (sempre "header") */
    type: "header";
    /** Itens da seção */
    items: MenuItem[];
}

/**
 * Componente ContextMenu
 *
 * Renderiza um menu de contexto personalizado que aparece na posição do cursor
 * quando o usuário clica com o botão direito. O menu inclui animações suaves
 * e é automaticamente fechado ao clicar fora ou rolar a página.
 */
export function ContextMenu() {
    // Estado para controlar se estamos no cliente (evita problemas de SSR)
    const [isClient, setIsClient] = useState(false);

    // Hook para obter a rota atual
    const pathname = usePathname();

    // Estado para controlar a visibilidade do menu
    const [visible, setVisible] = useState(false);

    // Estado para armazenar a posição do cursor onde o menu deve aparecer
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Hook para controle do tema (claro/escuro)
    const { theme, setTheme } = useTheme();

    // Hook para navegação programática
    const router = useRouter();

    // Referência para o elemento do menu (usado para detectar cliques fora)
    const menuRef = useRef<HTMLDivElement>(null);

    // Efeito para marcar que estamos no cliente
    useEffect(() => {
        setIsClient(true);
    }, []);

    /**
     * Efeito que configura os event listeners para o menu de contexto
     * - Previne o menu padrão do navegador
     * - Mostra o menu personalizado na posição do cursor
     * - Fecha o menu ao clicar fora ou rolar a página
     * Só executa quando estamos no cliente e não na página do sistema
     */
    useEffect(() => {
        // Só configura os event listeners se estivermos no cliente e não na página do sistema
        if (!isClient || pathname === '/sistema') {
            return;
        }

        /**
         * Manipulador para o evento de menu de contexto (botão direito)
         * Previne o comportamento padrão e mostra o menu personalizado
         */
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            setVisible(true);
            setPosition({ x: e.clientX, y: e.clientY });
        };

        /**
         * Manipulador para cliques na página
         * Fecha o menu se o clique for fora do menu
         */
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setVisible(false);
            }
        };

        /**
         * Manipulador para eventos de rolagem
         * Fecha o menu quando a página é rolada
         */
        const handleScroll = () => {
            setVisible(false);
        };

        // Registra os event listeners no documento
        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("click", handleClick);
        document.addEventListener("scroll", handleScroll);

        // Remove os event listeners na limpeza
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("click", handleClick);
            document.removeEventListener("scroll", handleScroll);
        };
    }, [isClient, pathname]);

    // Não renderizar no servidor ou na página de sistema
    if (!isClient || pathname === '/sistema') {
        return null;
    }

    /**
     * Array de seções do menu de contexto
     * Organizado por categorias para melhor usabilidade
     */
    const menuSections: MenuSection[] = [
        {
            label: "Navegação",
            type: "header" as const,
            items: [
                {
                    label: "Voltar ao Topo",
                    icon: ArrowUp,
                    action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
                },
                {
                    label: theme === "dark" ? "Modo Claro" : "Modo Escuro",
                    icon: theme === "dark" ? Sun : Moon,
                    action: () => setTheme(theme === "dark" ? "light" : "dark"),
                },
                {
                    label: "Planos",
                    icon: CreditCard,
                    action: () => {
                        const element = document.getElementById("pricing");
                        if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                        } else {
                            router.push("/#pricing");
                        }
                    },
                },
                {
                    label: "Docs",
                    icon: FileText,
                    action: () => router.push('/equipe/docs')
                }
            ]
        },
        {
            label: "Ações",
            type: "header" as const,
            items: [
                {
                    label: "Compartilhar",
                    icon: Share2,
                    action: () => {
                        if (navigator.share) {
                            navigator.share({
                                title: "Sinout",
                                text: "Confira o Sinout - Tecnologia acessível para comunicação.",
                                url: window.location.href,
                            });
                        } else {
                            navigator.clipboard.writeText(window.location.href);
                            alert("Link copiado para a área de transferência!");
                        }
                    },
                },
                {
                    label: "Configurações",
                    icon: Settings,
                    action: () => router.push("/sistema"),
                },
                {
                    label: "Ajuda",
                    icon: HelpCircle,
                    action: () => router.push("/ajuda"),
                },
                {
                    label: "Sobre",
                    icon: Info,
                    action: () => router.push("/sobre"),
                }
            ]
        }
    ];

    /**
     * Renderiza o menu de contexto com animações e itens interativos
     * O menu aparece na posição do cursor e inclui efeitos visuais modernos
     */
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    ref={menuRef}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{ duration: 0.2 }}
                    style={{ top: position.y, left: position.x }}
                    className="fixed z-[9999] min-w-[220px] bg-background/90 backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden p-1"
                >
                    {/* Container principal dos itens do menu */}
                    <div className="flex flex-col gap-1">
                        {menuSections.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                                <div className="text-xs font-semibold text-muted-foreground px-2 py-1.5 mb-1 uppercase tracking-wider">
                                    {section.label}
                                </div>
                                {section.items.map((item, itemIndex) => (
                                    <motion.button
                                        key={itemIndex}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: (sectionIndex * section.items.length + itemIndex) * 0.05 }}
                                        onClick={() => {
                                            item.action();
                                            setVisible(false);
                                        }}
                                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors group w-full text-left"
                                    >
                                        {/* Container do ícone com efeitos visuais no hover */}
                                        <div className="p-1.5 rounded-md bg-muted/50 group-hover:bg-background transition-colors">
                                            <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-purple-500 transition-colors" />
                                        </div>
                                        {item.label}
                                    </motion.button>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Rodapé do menu com informações de copyright */}
                    <div className="mt-1 pt-1 border-t border-border/50 px-2 pb-1">
                        <div className="text-[10px] text-muted-foreground text-center">
                            Sinout © 2025
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
