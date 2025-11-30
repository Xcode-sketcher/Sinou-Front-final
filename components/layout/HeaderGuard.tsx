"use client";

import { usePathname } from "next/navigation";
import { ModernMenu } from "@/components/layout/Header";

interface HeaderGuardProps {
    /**
     * Permite opcionalmente sobrescrever os itens do menu.
     * Caso não fornecido, o menu padrão será utilizado.
     */
    items?: { label: string; href: string }[];
}

export default function HeaderGuard({ items = [] }: HeaderGuardProps) {
    // Utiliza roteamento no cliente para obter o pathname atual
    const pathname = usePathname();

    if (!pathname) return null;

    // Exclui rotas que não devem exibir o cabeçalho do site
    const excluded = [
        "/login",
        "/register",
        "/reset-password",
        "/reset-password/new",
        "/reset-password/new/",
        "/reset-password/",
    ];

    // Também exclui rotas cujo caminho começa com os prefixos listados
    const excludedPrefixes = [
        "/auth",
    ];

    const isExcluded = excluded.includes(pathname) || excludedPrefixes.some((pref) => pathname.startsWith(pref));

    if (isExcluded) {
        // Não exibe o cabeçalho em páginas de autenticação
        return null;
    }

    return <ModernMenu items={items} />;
}
