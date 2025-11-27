"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HistoryItem } from "./types";
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

/**
 * Props para o componente TrendsAnalysis
 * Define as propriedades necessárias para renderizar análise de tendências
 */
interface TrendsAnalysisProps {
    /** Array de itens do histórico emocional para análise */
    history: HistoryItem[];
}

/**
 * Interface para dados do gráfico de tendências
 * Define a estrutura dos dados processados para visualização
 */
interface ChartDataPoint {
    date: string;
    happy: number;
    sad: number;
    angry: number;
    fear: number;
    disgust: number;
    surprise: number;
    neutral: number;
}

/**
 * Mapeamento de cores para cada emoção no gráfico
 * Define a paleta de cores consistente para visualização emocional
 */
const EMOTION_COLORS: Record<string, string> = {
    happy: '#FCD34D', // Amarelo para felicidade
    sad: '#60A5FA',   // Azul para tristeza
    angry: '#EF4444', // Vermelho para raiva
    fear: '#8B5CF6',  // Roxo para medo
    disgust: '#10B981', // Verde para nojo
    surprise: '#F472B6', // Rosa para surpresa
    neutral: '#9CA3AF'  // Cinza para neutralidade
};

/**
 * Mapeamento de rótulos em português para as emoções
 * Fornece tradução consistente das emoções para interface do usuário
 */
const EMOTION_LABELS: Record<string, string> = {
    happy: 'Felicidade',
    sad: 'Tristeza',
    angry: 'Raiva',
    fear: 'Medo',
    disgust: 'Nojo',
    surprise: 'Surpresa',
    neutral: 'Neutralidade'
};

/**
 * Componente de análise de tendências temporais das emoções
 *
 * Renderiza um gráfico de linhas interativo mostrando a evolução das emoções
 * detectadas ao longo dos últimos 7 dias, com cálculo automático de tendências
 * e indicadores visuais de mudança percentual.
 *
 * Funcionalidades principais:
 * - Agrupamento de dados por dia nos últimos 7 dias
 * - Gráfico de linhas responsivo com cores distintas por emoção
 * - Cálculo de tendência comparando último dia com dia anterior
 * - Tooltips informativos com datas formatadas
 * - Animações de entrada com Framer Motion
 * - Design responsivo com gradientes decorativos
 *
 * @component
 * @example
 * ```tsx
 * <TrendsAnalysis history={historyData} />
 * ```
 *
 * @param {TrendsAnalysisProps} props - Propriedades do componente
 * @returns {JSX.Element} Gráfico de tendências com análise temporal
 */
export function TrendsAnalysis({ history }: TrendsAnalysisProps) {
    /**
     * Processamento de dados para o gráfico
     * Agrupa o histórico por dia e conta ocorrências de cada emoção
     *
     * Lógica de processamento:
     * 1. Cria array com os últimos 7 dias
     * 2. Filtra histórico por cada dia
     * 3. Conta ocorrências de cada emoção por dia
     * 4. Retorna dados formatados para Recharts
     */
    const data: ChartDataPoint[] = useMemo(() => {
        // Gera array com datas dos últimos 7 dias (formato YYYY-MM-DD)
        const days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            return d.toISOString().split('T')[0];
        });

        return days.map(day => {
            // Filtra itens do histórico para o dia específico
            const dayHistory = history.filter(item => item.timestamp.startsWith(day));

            // Inicializa objeto de contagem com data e contadores zerados
            const counts: ChartDataPoint = {
                date: day,
                happy: 0,
                sad: 0,
                angry: 0,
                fear: 0,
                disgust: 0,
                surprise: 0,
                neutral: 0
            };

            // Conta ocorrências de cada emoção no dia
            dayHistory.forEach(item => {
                const emotionKey = item.emocao_dominante.toLowerCase() as keyof Omit<ChartDataPoint, 'date'>;
                counts[emotionKey] = (counts[emotionKey] || 0) + 1;
            });

            return counts;
        });
    }, [history]);

    /**
     * Cálculo da tendência de mudança percentual
     * Compara o último dia com o dia anterior para determinar tendência
     *
     * Lógica de cálculo:
     * 1. Soma total de detecções do último dia
     * 2. Soma total de detecções do dia anterior
     * 3. Calcula mudança percentual
     * 4. Retorna valor absoluto e direção da tendência
     */
    const trend = useMemo(() => {
        if (data.length < 2) return { value: 0, isPositive: true };

        const lastDay = data[data.length - 1];
        const prevDay = data[data.length - 2];

        // Calcula totais de detecções por dia
        const totalLast = Object.values(lastDay).reduce((a: number, b) => (typeof b === 'number' ? a + b : a), 0);
        const totalPrev = Object.values(prevDay).reduce((a: number, b) => (typeof b === 'number' ? a + b : a), 0);

        // Trata caso especial de dia anterior sem dados
        if (totalPrev === 0) return { value: 100, isPositive: true };

        // Calcula mudança percentual
        const percentChange = ((totalLast - totalPrev) / totalPrev) * 100;

        return {
            value: Math.abs(percentChange).toFixed(1),
            isPositive: percentChange >= 0
        };
    }, [data]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="col-span-1 lg:col-span-2 h-full"
        >
            <Card className="h-full border-l-4 border-l-blue-500 overflow-hidden relative group">
                {/* Gradiente de fundo decorativo inspirado em MongoDB Atlas / Next.js */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Elemento decorativo circular com blur */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500" />

                <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            {/* Título com ícone de tendência */}
                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-500" />
                                Tendência Temporal de Emoções
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">Evolução das emoções nos últimos 7 dias</p>
                        </div>

                        {/* Indicador de tendência com ícone e cor dinâmica */}
                        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${trend.isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                            {trend.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                            <span>{trend.value}% vs. ontem</span>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="relative z-10">
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                {/* Grade cartesiana sutil para orientação visual */}
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.1} />

                                {/* Eixo X com formatação de dias da semana */}
                                <XAxis
                                    dataKey="date"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value: string) => new Date(value).toLocaleDateString(undefined, { weekday: 'short' })}
                                />

                                {/* Eixo Y com estilo minimalista */}
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />

                                {/* Tooltip customizado com formatação de data completa */}
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    labelStyle={{ color: '#333', fontWeight: 'bold', marginBottom: '5px' }}
                                    formatter={(value: number, name: string) => [value, EMOTION_LABELS[name] || name]}
                                    labelFormatter={(label) => new Date(label).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}
                                />

                                {/* Legenda posicionada abaixo do gráfico */}
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />

                                {/* Renderiza linha para cada emoção com cores distintas */}
                                {Object.keys(EMOTION_COLORS).map((emotion) => (
                                    <Line
                                        key={emotion}
                                        type="monotone"
                                        dataKey={emotion}
                                        stroke={EMOTION_COLORS[emotion]}
                                        strokeWidth={2}
                                        dot={false}
                                        activeDot={{ r: 6 }}
                                        name={EMOTION_LABELS[emotion]}
                                    />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
