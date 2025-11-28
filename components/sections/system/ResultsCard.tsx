"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AnalysisResult } from "./SystemDashboard";
import { MessageSquare, AlertCircle, CheckCircle2 } from "lucide-react";

/**
 * Propriedades do componente ResultsCard.
 */
interface ResultsCardProps {
    /** O resultado da análise facial a ser exibido. */
    result: AnalysisResult | null;
}

const emotionTranslations: Record<string, string> = {
    happy: "Feliz",
    sad: "Triste",
    angry: "Raiva",
    surprise: "Surpreso",
    fear: "Medo",
    disgust: "Desgosto",
    neutral: "Neutro",
};

const emotionColors: Record<string, string> = {
    happy: "text-green-500",
    sad: "text-blue-500",
    angry: "text-red-500",
    surprise: "text-yellow-500",
    fear: "text-purple-500",
    disgust: "text-orange-500",
    neutral: "text-gray-500",
};

/**
 * Componente de Cartão de Resultados.
 * 
 * Exibe os resultados da última análise facial realizada, incluindo
 * as emoções detectadas, seus percentuais e a mensagem sugerida (se houver).
 */
export function ResultsCard({ result }: ResultsCardProps) {
    if (!result) {
        return (
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">📊</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">Aguardando Análise</h3>
                <p className="text-muted-foreground text-sm max-w-[200px]">
                    Inicie a câmera e capture uma imagem para ver os resultados aqui.
                </p>
            </div>
        );
    }

    const sortedEmotions = Object.entries(result.emotions)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    return (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
            <div>
                <h2 className="text-xl font-bold text-foreground mb-1">Resultados</h2>
                <p className="text-sm text-muted-foreground">Última análise realizada</p>
            </div>

            <AnimatePresence mode="wait">
                {result.suggestedMessage && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border border-purple-100 dark:border-purple-800/50 rounded-xl p-4 flex gap-3"
                    >
                        <MessageSquare className="w-5 h-5 text-purple-500 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <div className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide mb-1">
                                Mensagem Sugerida
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {result.suggestedMessage}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-3">
                {sortedEmotions.map(([emotion, percentage], index) => (
                    <motion.div
                        key={`${emotion}-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-muted/30 rounded-lg p-3 border border-border/50 hover:border-border transition-colors group"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-medium capitalize text-foreground">
                                {emotionTranslations[emotion] || emotion}
                            </span>
                            <span className={`font-bold ${index === 0 ? "text-purple-600" : "text-muted-foreground"}`}>
                                {percentage.toFixed(1)}%
                            </span>
                        </div>

                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className={`h-full rounded-full ${index === 0
                                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                                    : "bg-gray-300 dark:bg-gray-600"
                                    }`}
                            />
                        </div>

                        {index === 0 && (
                            <div className="mt-2 flex items-center gap-1.5 text-xs text-green-600 font-medium">
                                <CheckCircle2 className="w-3 h-3" />
                                Emoção Dominante
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
