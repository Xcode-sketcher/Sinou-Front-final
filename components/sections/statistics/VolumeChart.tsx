"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HistoryItem } from "./types";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

/**
 * Props para o componente VolumeChart
 * Define as propriedades necessárias para renderizar gráfico de volume
 */
interface VolumeChartProps {
    /** Array de itens do histórico emocional para análise de volume */
    history: HistoryItem[];
}

/**
 * Interface para pontos de dados do gráfico de volume
 * Define a estrutura dos dados agrupados por hora
 */
interface VolumeDataPoint {
    /** Hora formatada (HH:00) */
    hour: string;
    /** Número de detecções nessa hora */
    detections: number;
}

/**
 * Componente de gráfico de volume de detecções emocionais
 *
 * Renderiza um gráfico interativo mostrando o volume de detecções emocionais
 * por hora nas últimas 24 horas, com opções de visualização em área ou linha.
 * Inclui animações de entrada e controles para alternar entre tipos de gráfico.
 *
 * Funcionalidades principais:
 * - Agrupamento de dados por hora (0-23h)
 * - Dois tipos de visualização: área preenchida e linha
 * - Controles interativos para alternar visualização
 * - Tooltips informativos com dados detalhados
 * - Gradiente visual para gráfico de área
 * - Design responsivo com animações Framer Motion
 *
 * @component
 * @example
 * ```tsx
 * <VolumeChart history={historyData} />
 * ```
 *
 * @param {VolumeChartProps} props - Propriedades do componente
 * @returns {JSX.Element} Gráfico de volume com controles de visualização
 */
export function VolumeChart({ history }: VolumeChartProps) {
    // Estado para controlar o tipo de gráfico (área ou linha)
    const [chartType, setChartType] = useState<'area' | 'line'>('area');

    /**
     * Processamento de dados para o gráfico
     * Agrupa detecções por hora do dia (0-23h) para visualização temporal
     *
     * Lógica de processamento:
     * 1. Cria array com todas as 24 horas do dia
     * 2. Para cada hora, conta detecções no histórico
     * 3. Formata hora como string HH:00
     * 4. Retorna array de pontos de dados para Recharts
     */
    const data: VolumeDataPoint[] = useMemo(() => {
        // Cria array com horas de 0 a 23
        const hours = Array.from({ length: 24 }, (_, i) => i);

        const grouped = hours.map(hour => {
            // Conta detecções para cada hora específica
            const count = history.filter(item => {
                const date = new Date(item.timestamp);
                return date.getHours() === hour;
            }).length;

            return {
                hour: `${hour.toString().padStart(2, '0')}:00`,
                detections: count
            };
        });

        return grouped;
    }, [history]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 lg:col-span-2"
        >
            <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        {/* Título com ícone de tendência */}
                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-purple-500" />
                            Volume de Recorrência
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">Detecções por hora nas últimas 24h</p>
                    </div>

                    {/* Controles para alternar tipo de gráfico */}
                    <div className="flex gap-2">
                        <Button
                            variant={chartType === 'area' ? "default" : "outline"}
                            size="sm"
                            onClick={() => setChartType('area')}
                            className="text-xs"
                        >
                            Área
                        </Button>
                        <Button
                            variant={chartType === 'line' ? "default" : "outline"}
                            size="sm"
                            onClick={() => setChartType('line')}
                            className="text-xs"
                        >
                            Linha
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            {/* Renderização condicional baseada no tipo de gráfico selecionado */}
                            {chartType === 'area' ? (
                                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    {/* Definição de gradiente para preenchimento da área */}
                                    <defs>
                                        <linearGradient id="colorDetections" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>

                                    {/* Eixo X com horas formatadas */}
                                    <XAxis
                                        dataKey="hour"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />

                                    {/* Eixo Y com formatação de números */}
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value: number) => `${value}`}
                                    />

                                    {/* Grade cartesiana sutil para orientação */}
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.1} />

                                    {/* Tooltip customizado com estilo moderno */}
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                            borderRadius: '8px',
                                            border: 'none',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                        }}
                                        labelStyle={{ color: '#666' }}
                                    />

                                    {/* Área preenchida com gradiente */}
                                    <Area
                                        type="monotone"
                                        dataKey="detections"
                                        stroke="#8b5cf6"
                                        fillOpacity={1}
                                        fill="url(#colorDetections)"
                                    />
                                </AreaChart>
                            ) : (
                                <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    {/* Eixo X com horas formatadas */}
                                    <XAxis
                                        dataKey="hour"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />

                                    {/* Eixo Y com formatação de números */}
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value: number) => `${value}`}
                                    />

                                    {/* Grade cartesiana sutil */}
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.1} />

                                    {/* Tooltip customizado */}
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                            borderRadius: '8px',
                                            border: 'none',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                        }}
                                        labelStyle={{ color: '#666' }}
                                    />

                                    {/* Linha com pontos destacados */}
                                    <Line
                                        type="monotone"
                                        dataKey="detections"
                                        stroke="#8b5cf6"
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: "#8b5cf6" }}
                                        activeDot={{ r: 8 }}
                                    />
                                </LineChart>
                            )}
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
