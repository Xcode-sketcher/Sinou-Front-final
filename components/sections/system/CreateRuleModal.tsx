"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Zap, Trash2, Edit2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { Rule } from "@/components/sections/statistics/types";

/**
 * Propriedades para o modal de criação de regras.
 */
interface CreateRuleModalProps {
    /** Indica se o modal está visível. */
    isOpen: boolean;
    /** Função chamada para fechar o modal. */
    onClose: () => void;
    /** Função chamada quando uma regra é criada ou atualizada com sucesso. */
    onRuleCreated: () => void;
}

const emotions = [
    { value: "happy", label: "Feliz" },
    { value: "sad", label: "Triste" },
    { value: "angry", label: "Raiva" },
    { value: "surprise", label: "Surpreso" },
    { value: "fear", label: "Medo" },
    { value: "disgust", label: "Desgosto" },
    { value: "neutral", label: "Neutro" },
];

/**
 * Modal de Criação e Gerenciamento de Regras.
 * 
 * Este componente permite aos usuários criar, editar, listar e excluir regras de mapeamento
 * de emoções. As regras definem gatilhos baseados em emoções detectadas e intensidade,
 * permitindo a personalização do comportamento do sistema.
 */
export function CreateRuleModal({ isOpen, onClose, onRuleCreated }: CreateRuleModalProps) {
    const [loading, setLoading] = useState(false);
    const [rules, setRules] = useState<Rule[]>([]);
    const [view, setView] = useState<"list" | "form">("list");
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        emotion: "",
        intensityLevel: "",
        minPercentage: 50,
        priority: 1,
        message: ""
    });

    useEffect(() => {
        if (isOpen) {
            fetchRules();
            setView("list");
        }
    }, [isOpen]);

    /**
     * Busca as regras existentes do usuário via API.
     */
    const fetchRules = async () => {
        try {
            const response = await api.get('/api/emotion-mappings/my-rules');
            setRules(response.data || []);
        } catch (error) {

        }
    };

    /**
     * Exclui uma regra específica após confirmação do usuário.
     * 
     * @param id - O identificador único da regra a ser excluída.
     */
    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir esta regra?")) return;
        try {
            await api.delete(`/api/emotion-mappings/${id}`);
            fetchRules();
        } catch (error) {
        }
    };

    /**
     * Prepara o formulário para edição de uma regra existente.
     * 
     * @param rule - O objeto da regra a ser editada.
     */
    const handleEdit = (rule: Rule) => {
        setFormData({
            emotion: rule.emotion || "",
            intensityLevel: rule.intensityLevel,
            minPercentage: rule.minPercentage,
            priority: rule.priority,
            message: rule.message
        });
        setEditingId(rule._id);
        setView("form");
    };

    /**
     * Processa o envio do formulário para criar ou atualizar uma regra.
     * 
     * @param e - Evento de submissão do formulário.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.emotion || !formData.intensityLevel || !formData.message) {
            alert("Preencha todos os campos obrigatórios");
            return;
        }

        setLoading(true);
        try {
            if (editingId) {
                await api.put(`/api/emotion-mappings/${editingId}`, formData);
            } else {
                await api.post('/api/emotion-mappings', formData);
            }

            await fetchRules();
            onRuleCreated();
            setView("list");
            setEditingId(null);
            setFormData({
                emotion: "",
                intensityLevel: "",
                minPercentage: 50,
                priority: 1,
                message: ""
            });
        } catch (error) {
            alert("Erro ao salvar regra");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl z-50 h-[80vh] flex flex-col"
                    >
                        <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col h-full">
                            {/* Header */}
                            <div className="p-6 border-b border-border bg-muted/30 flex justify-between items-center flex-shrink-0">
                                <div>
                                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-purple-500" />
                                        Gerenciar Regras
                                    </h2>
                                    <p className="text-sm text-muted-foreground">Configure alertas automáticos para emoções</p>
                                </div>
                                <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
                                    <X className="w-5 h-5 text-muted-foreground" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-hidden flex flex-col">
                                {view === "list" ? (
                                    <div className="flex-1 overflow-y-auto p-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="font-semibold text-foreground">Minhas Regras ({rules.length})</h3>
                                            <Button onClick={() => {
                                                setEditingId(null);
                                                setFormData({
                                                    emotion: "",
                                                    intensityLevel: "",
                                                    minPercentage: 50,
                                                    priority: 1,
                                                    message: ""
                                                });
                                                setView("form");
                                            }} className="gap-2 bg-purple-600 hover:bg-purple-700">
                                                <Plus className="w-4 h-4" /> Nova Regra
                                            </Button>
                                        </div>

                                        <div className="grid gap-4">
                                            {rules.length === 0 ? (
                                                <div key="empty-state" className="text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-xl">
                                                    Nenhuma regra encontrada. Crie sua primeira regra!
                                                </div>
                                            ) : (
                                                rules.map((rule, index) => (
                                                    <div key={`${rule._id}-${index}`} className="bg-muted/30 border border-border rounded-xl p-4 flex items-center justify-between group hover:border-purple-500/50 transition-colors">
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg
                                                                ${rule.emotion === 'happy' ? 'bg-green-500/10 text-green-500' :
                                                                    rule.emotion === 'angry' ? 'bg-red-500/10 text-red-500' :
                                                                        'bg-purple-500/10 text-purple-500'}`}>
                                                                {rule.emotion ? rule.emotion.charAt(0).toUpperCase() : '?'}
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-foreground flex items-center gap-2">
                                                                    {emotions.find(e => e.value === rule.emotion)?.label || rule.emotion || 'Emoção não identificada'}
                                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                                                                        {rule.intensityLevel}
                                                                    </span>
                                                                </div>
                                                                <div className="text-sm text-muted-foreground mt-0.5">
                                                                    Min: {rule.minPercentage}% • Prioridade: {rule.priority}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(rule)}>
                                                                <Edit2 className="w-4 h-4 text-blue-500" />
                                                            </Button>
                                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(rule._id)}>
                                                                <Trash2 className="w-4 h-4 text-red-500" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-foreground">Emoção</label>
                                                    <select
                                                        className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                                                        value={formData.emotion}
                                                        onChange={e => setFormData({ ...formData, emotion: e.target.value })}
                                                        required
                                                    >
                                                        <option value="">Selecione...</option>
                                                        {emotions.map(e => (
                                                            <option key={e.value} value={e.value}>{e.label}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-foreground">Intensidade</label>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div
                                                            onClick={() => setFormData({ ...formData, intensityLevel: "superior" })}
                                                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.intensityLevel === "superior"
                                                                ? "border-purple-500 bg-purple-500/5"
                                                                : "border-border hover:border-purple-200"
                                                                }`}
                                                        >
                                                            <div className="font-semibold text-foreground">Superior</div>
                                                            <div className="text-xs text-muted-foreground mt-1">{">"} 50-100%</div>
                                                        </div>
                                                        <div
                                                            onClick={() => setFormData({ ...formData, intensityLevel: "inferior" })}
                                                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.intensityLevel === "inferior"
                                                                ? "border-purple-500 bg-purple-500/5"
                                                                : "border-border hover:border-purple-200"
                                                                }`}
                                                        >
                                                            <div className="font-semibold text-foreground">Inferior</div>
                                                            <div className="text-xs text-muted-foreground mt-1">{"≤"} 0-50%</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-foreground">Prioridade (1-10)</label>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        max="10"
                                                        className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                                                        value={formData.priority}
                                                        onChange={e => setFormData({ ...formData, priority: Number(e.target.value) })}
                                                        required
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-foreground flex justify-between">
                                                        Percentual Mínimo
                                                        <span className="text-purple-600 font-bold">{formData.minPercentage}%</span>
                                                    </label>
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="100"
                                                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-purple-500"
                                                        value={formData.minPercentage}
                                                        onChange={e => setFormData({ ...formData, minPercentage: Number(e.target.value) })}
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-foreground">Mensagem de Alerta</label>
                                                    <textarea
                                                        className="w-full h-24 p-3 rounded-lg border border-border bg-background text-sm focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                                                        placeholder="Digite a mensagem que será exibida..."
                                                        value={formData.message}
                                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-border bg-muted/30 flex justify-end gap-3 flex-shrink-0">
                                {view === "form" ? (
                                    <>
                                        <Button variant="ghost" onClick={() => setView("list")}>
                                            Cancelar
                                        </Button>
                                        <Button
                                            onClick={handleSubmit}
                                            disabled={loading}
                                            className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
                                        >
                                            {loading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> : <Save className="w-4 h-4" />}
                                            {editingId ? "Atualizar Regra" : "Salvar Regra"}
                                        </Button>
                                    </>
                                ) : (
                                    <Button variant="ghost" onClick={onClose}>Fechar</Button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
