"use client";

/**
 * Componente MetricsGrid
 *
 * Grid responsivo que exibe métricas estatísticas em tempo real do sistema de detecção facial,
 * calculando dados de precisão, detecções e regras ativas baseados no histórico fornecido.
 *
 * Funcionalidades principais:
 * - Cálculo automático de métricas diárias (precisão média, detecções, regras ativas)
 * - Análise de sentimento predominante baseada no histórico
 * - Grid responsivo (1 coluna mobile, 2 tablet, 4 desktop)
 * - Animações de entrada escalonadas com Framer Motion
 * - Cards com efeitos hover (elevação e mudança de cor da borda)
 * - Ícones temáticos para cada métrica com cores diferenciadas
 * - Descrições contextuais para cada indicador
 */

import { motion } from "framer-motion";
import { Target, Eye, MessageSquare, Smile } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HistoryItem, Rule } from "./types";

/**
 * Props do componente MetricsGrid
 */
interface MetricsGridProps {
    /** Array de itens do histórico de detecções faciais */
    history: HistoryItem[];
    /** Array de regras de conversão configuradas */
    rules: Rule[];
}

/**
 * Componente MetricsGrid
 * Renderiza um grid de métricas estatísticas calculadas dinamicamente
 * baseado nos dados de histórico e regras fornecidos
 */
export function MetricsGrid({ history, rules }: MetricsGridProps) {
    // Filtra o histórico para obter apenas os dados de hoje
    const today = new Date().toDateString();
    const todaysHistory = history.filter(item => new Date(item.timestamp).toDateString() === today);

    // Calcula o total de detecções realizadas hoje
    const totalDetections = todaysHistory.length;

    // Calcula a precisão média das detecções de hoje
    const averageConfidence = todaysHistory.length > 0
        ? todaysHistory.reduce((acc, item) => acc + item.percentual_dominante, 0) / todaysHistory.length
        : 0;

    // Conta quantas regras estão ativas
    const activeRules = rules.filter(r => r.active).length;

    // Analisa os sentimentos predominantes no histórico de hoje
    const sentimentCounts = todaysHistory.reduce((acc, item) => {
        acc[item.emocao_dominante] = (acc[item.emocao_dominante] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Determina o sentimento mais frequente
    const dominantSentiment = Object.entries(sentimentCounts).sort((a, b) => b[1] - a[1])[0];
    const dominantSentimentName = dominantSentiment ? dominantSentiment[0] : "N/A";

    // Array com todas as métricas a serem exibidas
    const metrics = [
        {
            title: "Precisão Média da IA",
            value: `${averageConfidence.toFixed(1)}%`,
            icon: Target,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            description: "Confiança nas detecções de hoje"
        },
        {
            title: "Detecções Hoje",
            value: totalDetections.toString(),
            icon: Eye,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            description: "Total de análises faciais realizadas"
        },
        {
            title: "Regras Ativas",
            value: activeRules.toString(),
            icon: MessageSquare,
            color: "text-pink-500",
            bg: "bg-pink-500/10",
            description: "Palavras/frases programadas"
        },
        {
            title: "Sentimento Predominante",
            value: dominantSentimentName.charAt(0).toUpperCase() + dominantSentimentName.slice(1),
            icon: Smile,
            color: "text-green-500",
            bg: "bg-green-500/10",
            description: "Emoção mais frequente hoje"
        }
    ];

    // Configurações de animação para o container
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    // Configurações de animação para cada item
    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
            {metrics.map((metric, index) => (
                <motion.div key={index} variants={item}>
                    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-transparent hover:border-t-purple-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {metric.title}
                            </CardTitle>
                            {/* Ícone com fundo colorido personalizado */}
                            <div className={`p-2 rounded-full ${metric.bg}`}>
                                <metric.icon className={`h-4 w-4 ${metric.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Valor principal da métrica */}
                            <div className="text-2xl font-bold">{metric.value}</div>
                            {/* Descrição contextual */}
                            <p className="text-xs text-muted-foreground mt-1">
                                {metric.description}
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    );
}
