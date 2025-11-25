"use client";

import { StatisticsDashboard } from "@/components/sections/statistics/StatisticsDashboard";
import { ModernMenu } from "@/components/layout/Header";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CustomCursor  from "@/components/ui/pointer";

const Footer7 = dynamic(() => import("@/components/layout/Footer").then(mod => mod.Footer7));

/**
 * Página do Dashboard de Estatísticas
 *
 * Esta página apresenta o dashboard completo de estatísticas do Sinout,
 * mostrando métricas em tempo real sobre detecções de emoções, pacientes
 * e regras de automação. Área protegida que requer autenticação.
 *
 * Funcionalidades principais:
 * - Verificação de autenticação obrigatória
 * - Dashboard interativo com gráficos
 * - Histórico de detecções em tempo real
 * - Métricas de pacientes e regras
 * - Interface responsiva e moderna
 * - Navegação consistente com menu
 *
 * Proteção de rota:
 * - Verifica se usuário está autenticado
 * - Redireciona para /login se não autenticado
 * - Mostra loading durante verificação
 * - Protege dados sensíveis
 *
 * Componentes utilizados:
 * - StatisticsDashboard: Dashboard principal
 * - ModernMenu: Menu de navegação
 * - Footer7: Rodapé da aplicação
 * - AuthContext: Gerenciamento de autenticação
 *
 * Estados da página:
 * - Loading: Verificando autenticação
 * - Não autenticado: Redirecionamento
 * - Autenticado: Dashboard completo
 *
 * Dados exibidos:
 * - Detecções de emoções (últimas 24h)
 * - Estatísticas de pacientes
 * - Regras de automação ativas
 * - Gráficos interativos
 * - Histórico em tempo real
 *
 * @component
 * @requires Autenticação obrigatória
 * @returns {JSX.Element} Dashboard completo ou estados de loading/redirecionamento
 */
export default function StatisticsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const socialItems = [
        { label: "", href: "#" },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <header>
                <title>Sinout - Estatísticas</title>
            </header>
            <ModernMenu items={[]} socialItems={socialItems} />

            <main className="flex-grow pt-20">
                <StatisticsDashboard />
            </main>

            <Footer7 className="mt-auto border-t border-border bg-muted/30" />
             <CustomCursor />
        </div>
    );
}
