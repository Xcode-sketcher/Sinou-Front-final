"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, StopCircle, Clock, RefreshCw, ArrowUp, Moon, Sun, Share2, Settings, HelpCircle, Info, CreditCard, FileText } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

/**
 * Interface para definição de um item do menu
 */
interface MenuItem {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    action: () => void;
    color?: string;
    disabled?: boolean;
}

/**
 * Interface para definição de uma seção do menu
 */
interface MenuSection {
    label: string;
    type: "header";
    items: MenuItem[];
}

/**
 * Props do componente SystemContextMenu
 */
interface SystemContextMenuProps {
    children: React.ReactNode;
    onStartCamera: () => void;
    onStopCamera: () => void;
    onToggleAutoCapture: () => void;
    isCameraActive: boolean;
    isAutoCaptureActive: boolean;
}

/**
 * Componente SystemContextMenu
 *
 * Menu de contexto específico para o dashboard do sistema.
 * Oferece controles rápidos para a câmera e captura automática,
 * além das opções de navegação padrão.
 *
 * Funcionalidades:
 * - Controle de câmera (Iniciar/Parar)
 * - Controle de captura automática
 * - Feedback visual do estado da câmera
 * - Navegação e configurações
 */
export function SystemContextMenu({
    children,
    onStartCamera,
    onStopCamera,
    onToggleAutoCapture,
    isCameraActive,
    isAutoCaptureActive
}: SystemContextMenuProps) {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { theme, setTheme } = useTheme();
    const router = useRouter();

    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            setVisible(true);
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleClick = () => setVisible(false);

        const container = document.getElementById("system-dashboard-container");
        if (container) {
            container.addEventListener("contextmenu", handleContextMenu);
        } else {
            document.addEventListener("contextmenu", handleContextMenu);
        }

        document.addEventListener("click", handleClick);

        return () => {
            if (container) {
                container.removeEventListener("contextmenu", handleContextMenu);
            } else {
                document.removeEventListener("contextmenu", handleContextMenu);
            }
            document.removeEventListener("click", handleClick);
        };
    }, []);

    const systemItems: MenuSection[] = [
        {
            label: "Controles do Sistema",
            type: "header" as const,
            items: [
                {
                    label: !isCameraActive ? "Iniciar Câmera" : "Parar Câmera",
                    icon: !isCameraActive ? Camera : StopCircle,
                    action: !isCameraActive ? onStartCamera : onStopCamera,
                    color: !isCameraActive ? "text-foreground" : "text-red-500"
                },
                {
                    label: isAutoCaptureActive ? "Parar Captura Auto" : "Iniciar Captura Auto",
                    icon: isAutoCaptureActive ? RefreshCw : Clock,
                    action: onToggleAutoCapture,
                    color: !isCameraActive ? "text-muted-foreground" : (isAutoCaptureActive ? "text-purple-500" : "text-foreground"),
                    disabled: !isCameraActive
                }
            ]
        },
        {
            label: "Navegação",
            type: "header" as const,
            items: [
                {
                    label: "Voltar ao Topo",
                    icon: ArrowUp,
                    action: () => window.scrollTo({ top: 0, behavior: "smooth" })
                },
                {
                    label: theme === "dark" ? "Modo Claro" : "Modo Escuro",
                    icon: theme === "dark" ? Sun : Moon,
                    action: () => setTheme(theme === "dark" ? "light" : "dark")
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
                    }
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
                    }
                },
                {
                    label: "Ajuda",
                    icon: HelpCircle,
                    action: () => router.push("/ajuda")
                },
                {
                    label: "Sobre",
                    icon: Info,
                    action: () => router.push("/sobre")
                }
            ]
        }
    ];

    return (
        <>
            {children}
            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        style={{ top: position.y, left: position.x }}
                        className="fixed z-[10000] min-w-[220px] bg-background/90 backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden p-1"
                    >
                        {/* Container principal dos itens do menu */}
                        <div className="flex flex-col gap-1">
                            {systemItems.map((section, sectionIndex) => (
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
                                            disabled={item.disabled ?? false}
                                            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors group w-full text-left ${(item.disabled ?? false) ? "opacity-50 cursor-not-allowed" : ""
                                                }`}
                                        >
                                            <div className={`p-1.5 rounded-md bg-muted/50 group-hover:bg-background transition-colors ${(item.disabled ?? false) ? "group-hover:bg-muted/50" : ""
                                                }`}>
                                                <item.icon className={`w-4 h-4 text-muted-foreground group-hover:text-purple-500 transition-colors ${(item.disabled ?? false) ? "group-hover:text-muted-foreground" : ""
                                                    } ${isAutoCaptureActive && item.icon === RefreshCw ? "animate-spin" : ""}`} />
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
        </>
    );
}
