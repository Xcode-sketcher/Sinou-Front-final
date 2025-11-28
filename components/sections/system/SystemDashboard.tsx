"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CameraCard } from "./CameraCard";
import { ResultsCard } from "./ResultsCard";

import { CreateRuleModal } from "./CreateRuleModal";
import { Patient } from "@/components/sections/statistics/types";
import { SystemContextMenu } from "@/components/ui/SystemContextMenu";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

/**
 * Interface que define a estrutura dos resultados de uma análise facial.
 */
export interface AnalysisResult {
    /** Dicionário contendo as emoções detectadas e seus respectivos percentuais. */
    emotions: Record<string, number>;
    /** A emoção predominante identificada na análise. */
    dominantEmotion: string;
    /** Mensagem sugerida pelo sistema com base na análise (opcional). */
    suggestedMessage?: string;
    /** Data e hora em que a análise foi realizada. */
    timestamp: string;
}

/**
 * Componente principal do Dashboard do Sistema.
 * 
 * Este componente atua como o controlador central da área logada, gerenciando:
 * - A visualização da câmera e o processo de análise em tempo real.
 * - A seleção e o estado do paciente ativo.
 * - A exibição dos resultados da análise e estatísticas de uso.
 * - O acesso ao gerenciamento de regras de alerta.
 * - O menu de contexto do sistema.
 */
export function SystemDashboard() {
    const { user } = useAuth();
    const [lastAnalysis, setLastAnalysis] = useState<AnalysisResult | null>(null);
    const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);

    const [isCameraActive, setIsCameraActive] = useState(false);
    const [isAutoCaptureActive, setIsAutoCaptureActive] = useState(false);

    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [loadingPatient, setLoadingPatient] = useState(true);

    const [stats, setStats] = useState({
        totalAnalysis: 0,
        alertsCount: 0
    });

    useEffect(() => {
        const loadStats = () => {
            const storedStats = localStorage.getItem('dailyStats');
            const storedDate = localStorage.getItem('statsDate');

            const now = new Date();
            const brasiliaTime = new Date(now.getTime() - (3 * 60 * 60 * 1000));
            const todayStr = brasiliaTime.toISOString().split('T')[0];

            if (storedStats && storedDate === todayStr) {
                setStats(JSON.parse(storedStats));
            } else {
                const initialStats = { totalAnalysis: 0, alertsCount: 0 };
                setStats(initialStats);
                localStorage.setItem('dailyStats', JSON.stringify(initialStats));
                localStorage.setItem('statsDate', todayStr);
            }
        };

        loadStats();

        const interval = setInterval(loadStats, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const loadPatient = async () => {
            if (!user) return;

            try {
                const response = await api.get('/api/patients');
                const data = response.data;

                let patientsList: Patient[] = [];

                if (Array.isArray(data)) {
                    patientsList = data;
                } else if (data && Array.isArray(data.data)) {
                    patientsList = data.data;
                } else if (data && Array.isArray(data.patients)) {
                    patientsList = data.patients;
                }

                patientsList = patientsList.map(patient => ({
                    ...patient,
                    _id: String(patient._id)
                }));

                if (patientsList.length === 0) {
                    const mockPatient: Patient = {
                        _id: "1",
                        nome: user.patientName || "Paciente",
                        idade: 65,
                        diagnostico: "Em acompanhamento",
                        id_cuidador: parseInt(user.id) || 1,
                        data_cadastro: new Date().toISOString().split('T')[0],
                        status: true,
                        informacoes_adicionais: null,
                        foto_perfil: null,
                        criado_por: user.name || "Sistema"
                    };
                    patientsList = [mockPatient];
                }

                if (patientsList.length > 0) {
                    setSelectedPatient(patientsList[0]);
                }
            } catch (error) {
                if (user) {
                    const fallbackPatient: Patient = {
                        _id: "1",
                        nome: user.patientName || "Paciente",
                        idade: 65,
                        diagnostico: "Em acompanhamento",
                        id_cuidador: parseInt(user.id) || 1,
                        data_cadastro: new Date().toISOString().split('T')[0],
                        status: true,
                        informacoes_adicionais: null,
                        foto_perfil: null,
                        criado_por: user.name || "Sistema"
                    };
                    setSelectedPatient(fallbackPatient);
                }
            } finally {
                setLoadingPatient(false);
            }
        };

        loadPatient();
    }, [user]);

    useEffect(() => {
        localStorage.setItem('dailyStats', JSON.stringify(stats));
    }, [stats]);

    /**
     * Processa o resultado de uma análise facial concluída.
     * Atualiza o estado da última análise e incrementa os contadores estatísticos.
     * 
     * @param result - O objeto contendo os dados da análise realizada.
     */
    const handleAnalysisComplete = (result: AnalysisResult) => {
        setLastAnalysis(result);
        setStats(prev => ({
            ...prev,
            totalAnalysis: prev.totalAnalysis + 1,
            alertsCount: ["sad", "angry", "fear", "disgust"].includes(result.dominantEmotion)
                ? prev.alertsCount + 1
                : prev.alertsCount
        }));
    };

    return (
        <SystemContextMenu
            isCameraActive={isCameraActive}
            isAutoCaptureActive={isAutoCaptureActive}
            onStartCamera={() => setIsCameraActive(true)}
            onStopCamera={() => setIsCameraActive(false)}
            onToggleAutoCapture={() => setIsAutoCaptureActive(!isAutoCaptureActive)}
        >
            <div id="system-dashboard-container" className="container mx-auto p-4 md:p-8 space-y-8 min-h-screen">
                <CreateRuleModal
                    isOpen={isRuleModalOpen}
                    onClose={() => setIsRuleModalOpen(false)}
                    onRuleCreated={() => {
                    }}
                />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            Análise facial
                        </h1>
                        <p className="text-muted-foreground">
                            Quando o rosto fala, o mundo entende
                        </p>
                        {user?.patientName && !loadingPatient && selectedPatient && (
                            <div className="flex items-center gap-4 mt-3">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="font-medium text-primary">Paciente: {selectedPatient.nome}</span>
                                </div>
                            </div>
                        )}
                        {loadingPatient && (
                            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                                <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                <span>Carregando paciente...</span>
                            </div>
                        )}
                    </div>
                    <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                        <button
                            onClick={() => setIsRuleModalOpen(true)}
                            className="h-11 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
                        >
                            <span>+</span> Nova Regra
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <CameraCard
                            selectedPatient={selectedPatient}
                            onAnalysisComplete={handleAnalysisComplete}
                            isActive={isCameraActive}
                            onActiveChange={setIsCameraActive}
                            autoCapture={isAutoCaptureActive}
                            onAutoCaptureChange={setIsAutoCaptureActive}
                        />
                    </div>

                    <div className="space-y-6">
                        <ResultsCard result={lastAnalysis} />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-card border border-border rounded-xl p-6 shadow-sm"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-muted/30 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-foreground mb-1">{stats.totalAnalysis}</div>
                                    <div className="text-xs text-muted-foreground">Análises Hoje</div>
                                </div>
                                <div className="bg-muted/30 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-foreground mb-1">{stats.alertsCount}</div>
                                    <div className="text-xs text-muted-foreground">Alertas Hoje</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </SystemContextMenu>
    );
}
