"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Home as IconHome, Info as IconInfo, Github as IconGithub, Linkedin as IconLinkedin, Twitter as IconTwitter, MonitorCog as IconMonitor, Sun as IconSun, Moon as IconMoon, BarChart3 as IconBarChart, HelpCircle as IconHelp, Settings as IconSettings, CreditCard as IconCreditCard, LogOut } from "lucide-react";
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
    socialItems: SocialItem[];
    logoUrl?: string;
}

const DEFAULT_SOCIAL_ITEMS: SocialItem[] = [
    { label: "GitHub", href: "https://github.com/Sinout-org" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/sinout/" },
];

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
    const opts: { key: string; icon: React.ComponentType<{ className?: string }>; value: 'system' | 'light' | 'dark' }[] = [
        { key: 'system', icon: IconMonitor, value: 'system' },
        { key: 'light', icon: IconSun, value: 'light' },
        { key: 'dark', icon: IconMoon, value: 'dark' },
    ];

    return (
        <div className="flex items-center gap-2">
            {opts.map((o) => {
                const IconComp = o.icon;
                const selected = theme === o.value;
                return (
                    <button
                        key={o.key}
                        onClick={() => setTheme(o.value)}
                        aria-pressed={selected}
                        suppressHydrationWarning
                        className={
                            `relative flex items-center justify-center rounded-md transition-all h-9 w-9 md:h-8 md:w-8 ` +
                            (selected
                                ? 'bg-primary text-primary-foreground border-transparent ring-2 ring-primary/50'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80 border border-border')
                        }
                    >
                        <IconComp className="h-5 w-5" />
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
                <nav className="hidden md:flex items-center space-x-8">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text-foreground hover:text-primary transition-colors font-medium"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Links sociais para desktop */}
                <div className="hidden md:flex items-center space-x-4">
                    {(socialItems.length > 0 ? socialItems : DEFAULT_SOCIAL_ITEMS).map((social) => (
                        <Link
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            {social.label}
                        </Link>
                    ))}
                    <div className="border-l border-border pl-4 ml-4 flex items-center gap-4">
                        <ThemeButtons />
                        {user ? (
                            <div className="flex items-center gap-2">
                                <Link href="/sistema">
                                    <Button variant="outline" size="sm">
                                        <IconSettings className="w-4 h-4 mr-2" />
                                        Sistema
                                    </Button>
                                </Link>
                                <Button variant="ghost" size="sm" onClick={logout}>
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </Button>
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                            </div>
                        ) : (
                            <Link href="/login">
                                <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground border-0">
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Menu mobile com Sheet */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            aria-label="Toggle menu"
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
                        {/* Cabeçalho do menu mobile */}
                        <SheetHeader className="flex items-center justify-between px-5">
                            <div className="flex items-center gap-3">
                                <SheetTitle className="text-left">
                                    <Image
                                        src={logoUrl}
                                        alt="Logo"
                                        width={100}
                                        height={40}
                                        className="h-10 w-auto"
                                    />
                                </SheetTitle>
                            </div>
                            <div className="flex items-center gap-2">
                            </div>
                        </SheetHeader>

                        <div className="px-5 mt-6">
                            {user ? (
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{user.name || 'Usuário'}</p>
                                            <p className="text-sm text-muted-foreground">{user.email}</p>
                                        </div>
                                    </div>
                                    <Link href="/sistema" onClick={() => setOpen(false)}>
                                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-0 h-12 text-lg font-semibold">
                                            <IconSettings className="w-5 h-5 mr-2" />
                                            Sistema
                                        </Button>
                                    </Link>
                                    <Button onClick={() => { logout(); setOpen(false); }} variant="outline" className="w-full h-12 text-lg font-semibold">
                                        <LogOut className="w-5 h-5 mr-2" />
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <Link href="/login" onClick={() => setOpen(false)}>
                                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-0 h-12 text-lg font-semibold">
                                        Login
                                    </Button>
                                </Link>
                            )}
                        </div>

                        {/* Navegação principal do menu mobile */}
                        <nav className="flex flex-col space-y-3 mt-6 px-5">
                            {menuItems.map((item) => {
                                const icon = (() => {
                                    switch (item.label.toLowerCase()) {
                                        case "equipe":
                                        case "home":
                                            return <IconHome className="h-5 w-5 text-muted-foreground/80" />;
                                        case "sobre":
                                            return <IconInfo className="h-5 w-5 text-muted-foreground/80" />;
                                        case "planos":
                                            return <IconCreditCard className="h-5 w-5 text-muted-foreground/80" />;
                                        case "estatística":
                                            return <IconBarChart className="h-5 w-5 text-muted-foreground/80" />;
                                        case "central de ajuda":
                                            return <IconHelp className="h-5 w-5 text-muted-foreground/80" />;
                                        default:
                                            return <IconHome className="h-5 w-5 text-muted-foreground/80" />;
                                    }
                                })();

                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className="w-full flex items-center gap-4 px-5 py-3 rounded-xl hover:bg-muted/80 transition-colors border border-border bg-card transform-gpu motion-safe:transition-transform motion-safe:duration-150 hover:-translate-y-1 hover:shadow-md active:scale-95"
                                    >
                                        <div className="bg-muted p-2 rounded-lg flex items-center justify-center">
                                            {icon}
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className="text-lg font-semibold text-foreground">{item.label}</div>
                                            <div className="text-xs text-muted-foreground/80 mt-0.5">
                                                {MENU_SUBTITLES[item.label] || `Explore ${item.label.toLowerCase()}`}
                                            </div>
                                        </div>
                                        <div className="text-muted-foreground/70 text-sm">→</div>
                                    </Link>
                                );
                            })}
                            {/* Seletor de tema integrado no menu */}
                            <div className="w-2/3 self-center flex items-center justify-center gap-4 px-5 py-3 rounded-xl hover:bg-muted/80 transition-colors border border-border bg-card mt-2 transform-gpu motion-safe:transition-transform motion-safe:duration-150 hover:-translate-y-1 hover:shadow-md active:scale-95">
                                <div className="flex items-center gap-2">
                                    <ThemeButtons />
                                </div>
                            </div>
                        </nav>

                        {/* Seção de links sociais no menu mobile */}
                        <div className="mt-8 pt-8 border-t border-border">
                            <div className="mx-auto max-w-[92%] px-5 text-center">
                                <h3 className="text-sm font-medium text-muted-foreground mb-4">
                                    Socials
                                </h3>
                                <div className="mt-6 text-sm text-muted-foreground/80">
                                    <p className="mb-3">Want more? Follow us on socials below.</p>

                                    {/* Grid de links sociais */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {(socialItems.length > 0 ? socialItems : DEFAULT_SOCIAL_ITEMS).map((social) => {
                                            const icon = (() => {
                                                switch (social.label.toLowerCase()) {
                                                    case "github":
                                                        return <IconGithub className="h-5 w-5 text-muted-foreground/90" />;
                                                    case "linkedin":
                                                        return <IconLinkedin className="h-5 w-5 text-muted-foreground/90" />;
                                                    case "twitter":
                                                        return <IconTwitter className="h-5 w-5 text-muted-foreground/90" />;
                                                    default:
                                                        return <IconGithub className="h-5 w-5 text-muted-foreground/90" />;
                                                }
                                            })();

                                            return (
                                                <Link
                                                    key={social.label}
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full flex items-center gap-4 px-5 py-3 rounded-xl border border-border bg-card hover:shadow-lg transition-transform duration-150 transform-gpu hover:-translate-y-1 active:scale-95 shadow-sm"
                                                    aria-label={social.label}
                                                >
                                                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-muted border border-border p-2">
                                                        {icon}
                                                    </div>
                                                    <div className="flex-1 pr-2">
                                                        <div className="text-sm font-semibold text-foreground">{social.label}</div>
                                                        <div className="text-xs text-muted-foreground/80">Open in a new tab</div>
                                                    </div>
                                                    <div className="text-muted-foreground/60">↗</div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}