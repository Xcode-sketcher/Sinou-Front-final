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

export interface AnalysisResult {
    emotions: Record<string, number>;
    dominantEmotion: string;
    suggestedMessage?: string;
    timestamp: string;
}

export function SystemDashboard() {
    const { user } = useAuth();
    const [lastAnalysis, setLastAnalysis] = useState<AnalysisResult | null>(null);
    const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);

    // Camera State lifted up for Context Menu control
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [isAutoCaptureActive, setIsAutoCaptureActive] = useState(false);

    // Patient state - auto-load the user's patient
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [loadingPatient, setLoadingPatient] = useState(true);

    const [stats, setStats] = useState({
        totalAnalysis: 0,
        alertsCount: 0
    });

    // Load stats from localStorage on mount and handle expiration
    useEffect(() => {
        const loadStats = () => {
            const storedStats = localStorage.getItem('dailyStats');
            const storedDate = localStorage.getItem('statsDate');

            const now = new Date();
            // Adjust to Brasilia time (UTC-3)
            const brasiliaTime = new Date(now.getTime() - (3 * 60 * 60 * 1000));
            const todayStr = brasiliaTime.toISOString().split('T')[0];

            if (storedStats && storedDate === todayStr) {
                setStats(JSON.parse(storedStats));
            } else {
                // Reset stats if date changed or no stats found
                const initialStats = { totalAnalysis: 0, alertsCount: 0 };
                setStats(initialStats);
                localStorage.setItem('dailyStats', JSON.stringify(initialStats));
                localStorage.setItem('statsDate', todayStr);
            }
        };

        loadStats();

        // Check for expiration every minute
        const interval = setInterval(loadStats, 60000);
        return () => clearInterval(interval);
    }, []);

    // Auto-load patient's patient when component mounts
    useEffect(() => {
        const loadPatient = async () => {
            if (!user) return;

            try {
                const response = await api.get('/api/patients');
                const data = response.data;

                // Robust data parsing to handle various API response structures
                let patientsList: Patient[] = [];

                if (Array.isArray(data)) {
                    patientsList = data;
                } else if (data && Array.isArray(data.data)) {
                    patientsList = data.data;
                } else if (data && Array.isArray(data.patients)) {
                    patientsList = data.patients;
                }

                // Normalize _id to string for consistency
                patientsList = patientsList.map(patient => ({
                    ...patient,
                    _id: String(patient._id)
                }));

                // Use mock data if no patients from API (for development)
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

                // Auto-select the first (and likely only) patient
                if (patientsList.length > 0) {
                    setSelectedPatient(patientsList[0]);
                }
            } catch (error) {
                console.error("Failed to load patient", error);
                // Fallback to mock patient if API fails
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

    // Save stats to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('dailyStats', JSON.stringify(stats));
    }, [stats]);

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
                        // Optional: Show success toast
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
                            // Pass controlled state
                            isActive={isCameraActive}
                            onActiveChange={setIsCameraActive}
                            autoCapture={isAutoCaptureActive}
                            onAutoCaptureChange={setIsAutoCaptureActive}
                        />
                    </div>

                    <div className="space-y-6">
                        <ResultsCard result={lastAnalysis} />

                        {/* User Stats Card */}
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
