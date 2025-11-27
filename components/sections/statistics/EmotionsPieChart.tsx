"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HistoryItem } from "./types";
import { PieChart as PieChartIcon } from "lucide-react";

interface EmotionsPieChartProps {
    history: HistoryItem[];
}

const COLORS = {
    happy: '#FCD34D', // Yellow
    sad: '#60A5FA',   // Blue
    angry: '#EF4444', // Red
    fear: '#8B5CF6',  // Purple
    disgust: '#10B981', // Green
    surprise: '#F472B6', // Pink
    neutral: '#9CA3AF'  // Gray
};

const EMOTION_LABELS: Record<string, string> = {
    happy: 'Felicidade',
    sad: 'Tristeza',
    angry: 'Raiva',
    fear: 'Medo',
    disgust: 'Nojo',
    surprise: 'Surpresa',
    neutral: 'Neutralidade'
};

export function EmotionsPieChart({ history }: EmotionsPieChartProps) {
    const data = useMemo(() => {
        const counts: Record<string, number> = {};
        history.forEach(item => {
            const emotionKey = item.emocao_dominante.toLowerCase();
            counts[emotionKey] = (counts[emotionKey] || 0) + 1;
        });

        return Object.entries(counts).map(([key, value]) => ({
            name: EMOTION_LABELS[key] || key,
            value: value,
            color: COLORS[key as keyof typeof COLORS] || '#000000'
        })).sort((a, b) => b.value - a.value);
    }, [history]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1"
        >
            <Card className="h-full">
                <CardHeader>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <PieChartIcon className="w-5 h-5 text-pink-500" />
                        Distribuição de Emoções
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Proporção das emoções detectadas</p>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    itemStyle={{ color: '#333' }}
                                />
                                <Legend
                                    layout="vertical"
                                    verticalAlign="middle"
                                    align="right"
                                    iconType="circle"
                                    wrapperStyle={{ fontSize: '12px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
