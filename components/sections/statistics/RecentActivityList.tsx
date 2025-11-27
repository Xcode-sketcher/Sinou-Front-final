"use client";

/**
 * Componente RecentActivityList
 *
 * Lista interativa das atividades recentes de detecção facial com modal de detalhes,
 * exibindo emoções detectadas, regras acionadas e mensagens disparadas em tempo real.
 *
 * Funcionalidades principais:
 * - Lista rolável das últimas 20 detecções faciais
 * - Emojis representativos para cada emoção detectada
 * - Indicadores de confiança percentual das detecções
 * - Regras acionadas com mensagens associadas
 * - Modal detalhado com todas as emoções detectadas
 * - Animações de entrada escalonadas para cada item
 * - Scrollbar customizada para melhor UX
 * - Design responsivo com altura fixa e overflow controlado
 * - Timestamp formatado para cada detecção
 */

import { motion } from "framer-motion";
import { HistoryItem, Rule } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

/**
 * Props do componente RecentActivityList
 */
interface RecentActivityListProps {
    /** Array de itens do histórico de detecções faciais */
    history: HistoryItem[];
    /** Array de regras de conversão configuradas */
    rules: Rule[];
}

/**
 * Mapeamento de emoções para emojis representativos
 * Usado para tornar a interface mais intuitiva e visual
 */
const EMOTION_ICONS: Record<string, string> = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    fear: '😨',
    disgust: '🤢',
    surprise: '😲',
    neutral: '😐'
};

/**
 * Componente RecentActivityList
 * Renderiza uma lista cronológica das atividades recentes de detecção facial
 * com possibilidade de visualizar detalhes completos em modal
 */
export function RecentActivityList({ history, rules }: RecentActivityListProps) {
    // Estado para controlar qual item está selecionado no modal
    const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-1 lg:col-span-1 h-full"
        >
            <Card className="h-full flex flex-col">
                {/* Cabeçalho do card */}
                <CardHeader>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-500" />
                        Atividade Recente
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Últimas análises e disparos</p>
                </CardHeader>

                {/* Conteúdo rolável da lista */}
                <CardContent className="flex-1 overflow-hidden p-0">
                    <div className="h-[600px] overflow-y-auto px-6 pb-6 space-y-4 custom-scrollbar">
                        {/* Renderiza os últimos 20 itens do histórico */}
                        {history.slice(0, 20).map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="p-4 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors group"
                            >
                                {/* Cabeçalho do item com emoção e timestamp */}
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        {/* Emoji representativo da emoção */}
                                        <span className="text-2xl" role="img" aria-label={item.emocao_dominante}>
                                            {EMOTION_ICONS[item.emocao_dominante.toLowerCase()] || '😐'}
                                        </span>
                                        <div>
                                            {/* Nome da emoção capitalizado */}
                                            <p className="font-medium capitalize">{item.emocao_dominante}</p>
                                            {/* Timestamp formatado */}
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Clock className="w-3 h-3" />
                                                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Porcentagem de confiança */}
                                    <div className="text-xs font-bold text-muted-foreground bg-background/50 px-2 py-1 rounded-full">
                                        {item.percentual_dominante?.toFixed(0) || '0'}%
                                    </div>
                                </div>

                                {/* Seção da regra acionada (se existir) */}
                                {(() => {
                                    const triggeredRule = rules.find(rule => rule._id === item.regra_acionada_id?.toString());
                                    return triggeredRule ? (
                                        <div className="mt-2 pt-2 border-t border-border/50">
                                            <p className="text-xs text-muted-foreground">
                                                <span className="font-medium">Regra acionada:</span> {triggeredRule.message}
                                            </p>
                                        </div>
                                    ) : null;
                                })()}

                                {/* Botão para ver mensagem disparada (se existir) */}
                                {item.mensagem_disparada && (
                                    <div className="mt-3 pt-3 border-t border-border/50">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full justify-start text-xs h-auto py-2 text-purple-500 hover:text-purple-600 hover:bg-purple-500/10"
                                            onClick={() => setSelectedItem(item)}
                                        >
                                            <MessageCircle className="w-3 h-3 mr-2" />
                                            Ver Mensagem Disparada
                                        </Button>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Modal de detalhes da análise */}
            <Dialog open={!!selectedItem} onOpenChange={(open: boolean) => !open && setSelectedItem(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Detalhes da Análise</DialogTitle>
                        <DialogDescription>
                            Informações completas sobre a detecção.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedItem && (
                        <div className="space-y-4">
                            {/* Resumo da emoção principal */}
                            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                                <span className="text-4xl">{EMOTION_ICONS[selectedItem.emocao_dominante.toLowerCase()] || '😐'}</span>
                                <div>
                                    <h4 className="font-bold capitalize text-lg">{selectedItem.emocao_dominante}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Confiança: {selectedItem.percentual_dominante?.toFixed(2) || '0.00'}%
                                    </p>
                                </div>
                            </div>

                            {/* Mensagem disparada (se existir) */}
                            {selectedItem.mensagem_disparada && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Mensagem Disparada</label>
                                    <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-700 dark:text-purple-300">
                                        &ldquo;{selectedItem.mensagem_disparada}&rdquo;
                                    </div>
                                </div>
                            )}

                            {/* Grid com todas as emoções detectadas */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Todas as Emoções</label>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    {Object.entries(selectedItem.emocoes_detectadas).map(([emotion, value]) => (
                                        <div key={emotion} className="flex justify-between p-2 bg-background rounded border">
                                            <span className="capitalize">{emotion}</span>
                                            <span className="font-mono">{(value as number)?.toFixed(1) || '0.0'}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </motion.div>
    );
}
