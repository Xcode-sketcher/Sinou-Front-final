"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Home as IconHome, Info as IconInfo, Github as IconGithub, Linkedin as IconLinkedin, Twitter as IconTwitter, MonitorCog as IconMonitor, Sun as IconSun, Moon as IconMoon, BarChart3 as IconBarChart, HelpCircle as IconHelp, Settings as IconSettings, CreditCard as IconCreditCard, LogOut, User as IconUser } from "lucide-react";
import { useTheme } from 'next-themes';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

/**
 * Interface para itens do menu de navegação.
 */
interface MenuItem {
    label: string;
    href: string;
}

/**
 * Interface para itens sociais.
 */
interface SocialItem {
    label: string;
    href: string;
}

/**
 * Propriedades do componente ModernMenu.
 */
interface ModernMenuProps {
    items: MenuItem[];
    socialItems?: SocialItem[];
    logoUrl?: string;
}

const DEFAULT_SOCIAL_ITEMS: SocialItem[] = [
    { label: "GitHub", href: "https://github.com/Sinout-org" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/sinout/" },
];

const AVATAR_SEEDS = [
    "Felix",
    "Aneka",
    "Zoe",
    "Bear",
    "Christian",
    "Jack",
    "Cuddles",
    "Bandit",
    "Willow",
    "Buster",
    "Sam",
    "Misty",
    "Simba",
    "Coco",
    "Lucky"
];

const getAvatarUrl = (index: number) => {
    if (!index || index < 1 || index > AVATAR_SEEDS.length) return null;
    const seed = AVATAR_SEEDS[index - 1];
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
};

const MENU_SUBTITLES: Record<string, string> = {
    "Home": "Página inicial",
    "Sobre": "Conheça nossa história",
    "Docs": "Documentação técnica",
    "Equipe": "Conheça nosso time",
    "Planos": "Nossos planos",
    "Estatística": "Dados e métricas",
    "Central de Ajuda": "Tire suas dúvidas",
    "Sistema": "Acesse o sistema",
};

/**
 * Subcomponente para os botões de seleção de tema.
 */
const ThemeButtons = () => {
    const { theme, setTheme } = useTheme();
    const opts: { key: string; icon: React.ComponentType<{ className?: string }>; value: 'system' | 'light' | 'dark'; label: string }[] = [
        { key: 'system', icon: IconMonitor, value: 'system', label: 'Tema do sistema' },
        { key: 'light', icon: IconSun, value: 'light', label: 'Tema claro' },
        { key: 'dark', icon: IconMoon, value: 'dark', label: 'Tema escuro' },
    ];

    return (
        <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg border border-border/50" role="radiogroup" aria-label="Selecionar tema">
            {opts.map((o) => {
                const IconComp = o.icon;
                const selected = theme === o.value;
                return (
                    <button
                        key={o.key}
                        onClick={() => setTheme(o.value)}
                        role="radio"
                        aria-checked={selected}
                        aria-label={o.label}
                        suppressHydrationWarning
                        className={
                            `relative flex items-center justify-center rounded-md transition-all h-7 w-7 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ` +
                            (selected
                                ? 'bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/50'
                                : 'text-muted-foreground hover:text-foreground hover:bg-background/50')
                        }
                    >
                        <IconComp className="h-4 w-4" aria-hidden="true" />
                    </button>
                );
            })}
        </div>
    );
};

/**
 * Componente de menu moderno com navegação responsiva e seletor de tema.
 * Inclui menu desktop, menu mobile com sheet, e integração com tema escuro/claro.
 */
export function ModernMenu({
    items,
    socialItems,
    logoUrl = "/Sinout.svg",
}: ModernMenuProps) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const { user, logout } = useAuth();

    // Determine which social items to display
    const displaySocialItems = (socialItems && socialItems.length > 0 && socialItems.some(item => item.label !== ""))
        ? socialItems
        : DEFAULT_SOCIAL_ITEMS;

    // Função para gerar itens do menu baseado na rota atual
    const getMenuItems = () => {
        const isHome = pathname === "/";
        const isEquipe = pathname === "/equipe";
        const isEstatistica = pathname === "/estatistica";
        const isSobre = pathname === "/sobre";
        const isPrivacidade = pathname === "/privacidade";
        const isTermos = pathname === "/termos";
        const isSistema = pathname === "/sistema";

        if (isHome) {
            return [
                { label: "Sobre", href: "/sobre" },
                { label: "Docs", href: "/equipe/docs" },
                { label: "Equipe", href: "/equipe" },
                { label: "Planos", href: "/#pricing" },
                { label: "Estatística", href: "/estatistica" },
                { label: "Central de Ajuda", href: "/ajuda" },
            ];
        } else if (isEquipe) {
            return [
                { label: "Home", href: "/" },
                { label: "Sobre", href: "/sobre" },
                { label: "Docs", href: "/equipe/docs" },
                { label: "Planos", href: "/#pricing" },
                { label: "Estatística", href: "/estatistica" },
                { label: "Central de Ajuda", href: "/ajuda" },
            ];
        } else if (isEstatistica) {
            return [
                { label: "Home", href: "/" },
                { label: "Sobre", href: "/sobre" },
                { label: "Docs", href: "/equipe/docs" },
                { label: "Equipe", href: "/equipe" },
                { label: "Planos", href: "/#pricing" },
                { label: "Central de Ajuda", href: "/ajuda" },
            ];
        } else if (isSobre) {
            return [
                { label: "Home", href: "/" },
                { label: "Equipe", href: "/equipe" },
                { label: "Planos", href: "/#pricing" },
                { label: "Estatística", href: "/estatistica" },
                { label: "Central de Ajuda", href: "/ajuda" },
            ];
        } else if (isSistema) {
            return [
                { label: "Home", href: "/" },
                { label: "Sobre", href: "/sobre" },
                { label: "Docs", href: "/equipe/docs" },
                { label: "Equipe", href: "/equipe" },
                { label: "Planos", href: "/#pricing" },
                { label: "Estatística", href: "/estatistica" },
                { label: "Central de Ajuda", href: "/ajuda" },
            ];
        } else if (isPrivacidade || isTermos) {
            return [
                { label: "Home", href: "/" },
                { label: "Sobre", href: "/sobre" },
                { label: "Docs", href: "/equipe/docs" },
                { label: "Equipe", href: "/equipe" },
                { label: "Planos", href: "/#pricing" },
                { label: "Estatística", href: "/estatistica" },
            ];
        } else {
            // Para outras páginas: se `items` foi passado use-os, senão fornecer um menu padrão
            if (items && items.length > 0) return items;

            // Menu padrão (usado quando 'items' está vazio)
            return [
                { label: "Home", href: "/" },
                { label: "Sobre", href: "/sobre" },
                { label: "Docs", href: "/equipe/docs" },
                { label: "Equipe", href: "/equipe" },
                { label: "Planos", href: "/#pagamento" },
                { label: "Estatística", href: "/estatistica" },
                { label: "Central de Ajuda", href: "/ajuda" },
            ];
        }
    };

    const menuItems = getMenuItems();

    // Função auxiliar para renderizar avatar de forma segura
    const renderAvatar = () => {
        if (!user) return null;

        const avatarIndex = user.profilePhoto || user.patient?.profilePhoto || user.patient?.fotoPerfil || user.patient?.foto_perfil;
        const avatarUrl = getAvatarUrl(avatarIndex || 0);

        if (avatarUrl) {
            return (
                <Image
                    src={avatarUrl}
                    alt={user.name || "User"}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                />
            );
        }

        return (
            <div className="w-full h-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
        );
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo da aplicação */}
                <Link href="/" className="flex items-center">
                    <Image
                        src={logoUrl}
                        alt="Logo"
                        width={100}
                        height={40}
                        className="h-12 w-auto"
                    />
                </Link>

                {/* Menu de navegação para desktop */}
                <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Navegação principal">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text-foreground hover:text-primary focus:outline-none focus:underline focus:underline-offset-4 transition-colors font-medium"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Ações do usuário (Social + Tema + Login/Perfil) */}
                <div className="hidden md:flex items-center space-x-4">
                    {/* Ícones de redes sociais — posicionados próximos ao seletor de tema */}
                    <div className="flex items-center gap-3 mr-2 border-r border-border pr-4" role="group" aria-label="Redes sociais">
                        {displaySocialItems.map((item) => {
                            let Icon = IconGithub;
                            if (item.label.toLowerCase().includes("linkedin")) Icon = IconLinkedin;
                            if (item.label.toLowerCase().includes("twitter")) Icon = IconTwitter;

                            return (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${item.label} (abre em nova aba)`}
                                    className="text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md transition-colors"
                                >
                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                </a>
                            );
                        })}
                    </div>

                    <ThemeButtons />

                    {user ? (
                        <div className="flex items-center gap-4 pl-2">
                            <Link href="/perfil" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary/20">
                                    {renderAvatar()}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium leading-none">{user.name}</span>
                                    <span className="text-xs text-muted-foreground">{user.email}</span>
                                </div>
                            </Link>
                            <Button variant="ghost" size="icon" onClick={logout} title="Sair">
                                <LogOut className="h-5 w-5" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 pl-2">
                            <Link href="/login">
                                <Button variant="ghost">Entrar</Button>
                            </Link>
                            <Link href="/cadastro">
                                <Button>Cadastrar</Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Menu Mobile */}
                <div className="md:hidden flex items-center gap-2">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Abrir menu de navegação"
                                aria-expanded={open}
                                className="relative h-10 w-10 rounded-full bg-muted/50 hover:bg-muted focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
                            >
                                <Menu className="h-5 w-5" aria-hidden="true" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[85vw] max-w-[380px] flex flex-col p-0 bg-background/95 backdrop-blur-xl border-l border-border/50">
                            <SheetHeader className="p-6 pb-4 border-b border-border/50 bg-gradient-to-b from-muted/30 to-transparent">
                                <SheetTitle className="text-left flex items-center gap-3">
                                    <Image
                                        src={logoUrl}
                                        alt="Logo"
                                        width={100}
                                        height={40}
                                        className="h-9 w-auto"
                                    />
                                    <span className="sr-only">Menu</span>
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex-1 overflow-y-auto py-4 px-4" role="navigation" aria-label="Menu principal">
                                {/* Botão Sistema - Destaque Especial */}
                                <Link
                                    href="/sistema"
                                    onClick={() => setOpen(false)}
                                    aria-label="Acessar o Sistema - Plataforma principal do Sinout"
                                    className="group flex items-center gap-4 p-4 mb-4 rounded-xl border-2 border-primary bg-gradient-to-r from-primary/10 via-primary/5 to-transparent hover:from-primary/20 hover:via-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-center w-12 h-12 rounded-xl border-2 border-primary bg-primary/20 group-hover:bg-primary/30 transition-all duration-200" aria-hidden="true">
                                        <IconMonitor className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="flex flex-col gap-0.5 flex-1">
                                        <span className="font-bold text-base text-foreground">Acessar Sistema</span>
                                        <span className="text-xs text-muted-foreground">Plataforma principal</span>
                                    </div>
                                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground" aria-hidden="true">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>

                                {/* Navegação com estilo de botões */}
                                <nav className="flex flex-col space-y-2" aria-label="Links de navegação">
                                    {menuItems.map((item) => {
                                        // Ícone baseado no label
                                        let ItemIcon = IconHome;
                                        if (item.label === "Home") ItemIcon = IconHome;
                                        else if (item.label === "Sobre") ItemIcon = IconInfo;
                                        else if (item.label === "Docs") ItemIcon = IconInfo;
                                        else if (item.label === "Equipe") ItemIcon = IconUser;
                                        else if (item.label === "Planos") ItemIcon = IconCreditCard;
                                        else if (item.label === "Estatística") ItemIcon = IconBarChart;
                                        else if (item.label === "Central de Ajuda") ItemIcon = IconHelp;
                                        else if (item.label === "Sistema") ItemIcon = IconSettings;

                                        const subtitle = MENU_SUBTITLES[item.label];

                                        return (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                onClick={() => setOpen(false)}
                                                aria-label={subtitle ? `${item.label} - ${subtitle}` : item.label}
                                                className="group flex items-center gap-4 p-3 rounded-xl border border-border bg-background hover:bg-muted/50 hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
                                            >
                                                <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-muted/30 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-200" aria-hidden="true">
                                                    <ItemIcon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="font-medium text-[15px] text-foreground group-hover:text-primary transition-colors">{item.label}</span>
                                                    {subtitle && (
                                                        <span className="text-xs text-muted-foreground">
                                                            {subtitle}
                                                        </span>
                                                    )}
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>

                            <div className="border-t border-border/50 p-5 bg-gradient-to-t from-muted/40 to-muted/10 mt-auto space-y-4" role="complementary" aria-label="Configurações e redes sociais">
                                {/* Theme Toggle Section */}
                                <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-background" role="group" aria-label="Seleção de tema">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-muted/30" aria-hidden="true">
                                            <IconSun className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <span className="text-sm font-medium" id="theme-label">Tema</span>
                                    </div>
                                    <ThemeButtons />
                                </div>

                                {/* Social Icons - Styled Buttons with Borders */}
                                <div className="flex items-center justify-center gap-3" role="group" aria-label="Redes sociais">
                                    {displaySocialItems.map((item) => {
                                        let Icon = IconGithub;
                                        let label = "GitHub";
                                        if (item.label.toLowerCase().includes("linkedin")) {
                                            Icon = IconLinkedin;
                                            label = "LinkedIn";
                                        }
                                        if (item.label.toLowerCase().includes("twitter")) {
                                            Icon = IconTwitter;
                                            label = "Twitter";
                                        }

                                        return (
                                            <a
                                                key={item.label}
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Visite nosso ${label} (abre em nova aba)`}
                                                className="flex-1 flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-border bg-background hover:bg-muted/50 hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 group"
                                            >
                                                <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-muted/30 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-200" aria-hidden="true">
                                                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                                </div>
                                                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{label}</span>
                                            </a>
                                        );
                                    })}
                                </div>

                                {/* User Info or Login Actions */}
                                {user ? (
                                    <div className="space-y-3" role="group" aria-label="Conta do usuário">
                                        <Link
                                            href="/perfil"
                                            onClick={() => setOpen(false)}
                                            aria-label={`Perfil de ${user.name} - Configurações da conta`}
                                            className="flex items-center gap-3 p-3 bg-background/80 rounded-xl border border-border/50 shadow-sm hover:bg-primary/5 hover:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
                                        >
                                            <div className="h-11 w-11 rounded-full overflow-hidden border-2 border-primary/20" aria-hidden="true">
                                                {renderAvatar()}
                                            </div>
                                            <div className="flex flex-col overflow-hidden flex-1">
                                                <span className="font-semibold text-sm truncate">{user.name}</span>
                                                <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                                            </div>
                                            <IconSettings className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                                        </Link>
                                        <Button
                                            variant="outline"
                                            aria-label="Sair da conta"
                                            className="w-full h-11 border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground focus:ring-2 focus:ring-destructive focus:ring-offset-2 transition-all duration-200"
                                            onClick={() => {
                                                logout();
                                                setOpen(false);
                                            }}
                                        >
                                            <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                                            Sair da conta
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-3" role="group" aria-label="Autenticação">
                                        <Link href="/login" onClick={() => setOpen(false)} className="w-full">
                                            <Button variant="outline" className="w-full h-11 focus:ring-2 focus:ring-primary focus:ring-offset-2" aria-label="Entrar na sua conta">
                                                Entrar
                                            </Button>
                                        </Link>
                                        <Link href="/register" onClick={() => setOpen(false)} className="w-full">
                                            <Button className="w-full h-11 bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2" aria-label="Criar uma nova conta">
                                                Cadastrar
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    );
}