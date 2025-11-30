"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, StopCircle, Aperture, Clock, Settings, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Patient } from "@/components/sections/statistics/types";
import { AnalysisResult } from "./SystemDashboard";
import api, { processingApi } from "@/lib/api";

interface CameraCardProps {
    selectedPatient: Patient | null;
    onAnalysisComplete: (result: AnalysisResult) => void;
    isActive: boolean;
    onActiveChange: (active: boolean) => void;
    autoCapture: boolean;
    onAutoCaptureChange: (active: boolean) => void;
}

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

/**
 * CameraCard
 *
 * Componente responsável pela captura de vídeo e análise facial do paciente.
 * Utiliza a webcam para capturar imagens, encaminha-as ao serviço de processamento
 * e registra os resultados no histórico. Suporta captura manual e automática.
 */
export function CameraCard({
    selectedPatient,
    onAnalysisComplete,
    isActive,
    onActiveChange,
    autoCapture,
    onAutoCaptureChange
}: CameraCardProps) {
    const webcamRef = useRef<Webcam>(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [intervalSeconds, setIntervalSeconds] = useState(5);
    const [selectedModel, setSelectedModel] = useState("Facenet");
    const [models, setModels] = useState<{ nome: string; velocidade: string }[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Carrega os modelos disponíveis (dados simulados; endpoint real pode não existir)
    useEffect(() => {
        // Define modelos padrão para demonstração
        setModels([
            { nome: "Facenet", velocidade: "Normal" },
            { nome: "VGG-Face", velocidade: "Lento" },
            { nome: "Facenet512", velocidade: "Lento" },
            { nome: "OpenFace", velocidade: "Rápido" },
            { nome: "ArcFace", velocidade: "Normal" },
            { nome: "Dlib", velocidade: "Normal" }
        ]);
    }, []);

    const captureAndAnalyze = useCallback(async () => {
        if (!webcamRef.current || !selectedPatient) return;

        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) return;

        setIsCapturing(true);

        try {
            // Prepara payload JSON para envio ao endpoint que recebe base64
            const base64Data = imageSrc.split(',')[1];
            const payload = {
                imageBase64: base64Data,
                model: selectedModel,
                detector: "opencv"
            };

            // 1. Analisar o rosto (chamada ao backend) via endpoint de base64
            const analyzeResponse = await processingApi.post('/api/FacialAnalysis/analyze-base64', payload);

            const data = analyzeResponse.data;

            // Normaliza possíveis estruturas de resposta (array ou objeto variam conforme backend)
            const analysis = Array.isArray(data) ? data[0] : (data.analise || data);

            // Extrai dados com alternativas; OBS: o backend pode retornar campos em português
            const emotions = analysis.emocoes || analysis.emotion || analysis.emotions || {};
            const dominantEmotion = analysis.emocao || analysis.emocao_dominante || analysis.dominant_emotion || "neutral";
            const age = analysis.idade ? String(analysis.idade) : (analysis.age ? String(analysis.age) : String(selectedPatient.idade || "0"));
            const gender = analysis.genero || analysis.gender || "unknown";

            // Garante que o objeto de emoções não esteja vazio; aplica fallback quando necessário
            const safeEmotions = Object.keys(emotions).length > 0 ? emotions : { neutral: 1.0 };

            // 2. Registrar resultado no histórico conforme esquema v1.json
            const historyPayload = {
                cuidadorId: "0", // Will be updated with actual user ID
                patientId: String(selectedPatient._id),
                emotionsDetected: safeEmotions, // Back to camelCase
                dominantEmotion: dominantEmotion,
                age: age,
                gender: gender,
                timestamp: new Date().toISOString()
            };

            // Obtém o ID do usuário logado (cuidador) para associar ao histórico
            try {
                const meResponse = await api.get('/api/auth/me');
                // Trata diferentes formatos de resposta do endpoint de autenticação
                const userId = meResponse.data.id || meResponse.data.userId || meResponse.data._id || meResponse.data.sub;
                if (userId) historyPayload.cuidadorId = String(userId);
            } catch {
                // Falha ao recuperar ID do usuário — não interrompe o fluxo de execução
            }

            let suggestedMessage: string | undefined = undefined; // Não definir mensagem padrão por padrão

            try {
                const historyResponse = await api.post('/api/history/cuidador-emotion', historyPayload);
                // Só define a mensagem se o backend retornar uma (ou seja, se houver regra correspondente)
                if (historyResponse.data?.suggestedMessage) {
                    suggestedMessage = historyResponse.data.suggestedMessage;
                }
            } catch {
                // Falha ao gravar histórico — não interrompe o fluxo de execução
            }

            const result: AnalysisResult = {
                emotions: emotions,
                dominantEmotion: dominantEmotion,
                suggestedMessage: suggestedMessage,
                timestamp: new Date().toISOString()
            };

            onAnalysisComplete(result);

        } catch {
            // Falha ao realizar a análise — erro é ignorado para não interromper a aplicação
        } finally {
            setIsCapturing(false);
        }
    }, [webcamRef, selectedPatient, selectedModel, onAnalysisComplete]);

    // Handle Auto Capture
    useEffect(() => {
        if (autoCapture && isActive && selectedPatient) {
            intervalRef.current = setInterval(() => {
                if (!isCapturing) {
                    captureAndAnalyze();
                }
            }, intervalSeconds * 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [autoCapture, isActive, intervalSeconds, selectedPatient, isCapturing, captureAndAnalyze]);

    return (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-foreground">Câmera</h2>
                    {isActive && (
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium border border-green-500/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Ao Vivo
                        </span>
                    )}
                </div>

                <div className="flex gap-2">
                    {!isActive ? (
                        <Button onClick={() => onActiveChange(true)} className="gap-2 bg-purple-600 hover:bg-purple-700">
                            <Camera className="w-4 h-4" /> Iniciar Câmera
                        </Button>
                    ) : (
                        <Button variant="destructive" onClick={() => {
                            onActiveChange(false);
                            onAutoCaptureChange(false);
                        }} className="gap-2">
                            <StopCircle className="w-4 h-4" /> Parar
                        </Button>
                    )}
                </div>
            </div>

            <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-6 group">
                {isActive ? (
                    <>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            className="w-full h-full object-cover"
                        />

                        {/* Processing Overlay with Premium Animation */}
                        <AnimatePresence>
                            {isCapturing && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm"
                                >
                                    <div className="relative">
                                        {/* Pulsing Gradient Ring */}
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.5, 0.8, 0.5],
                                                rotate: 360
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                            className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-lg opacity-70"
                                        />

                                        {/* Inner Spinner */}
                                        <div className="relative bg-background/80 backdrop-blur-md rounded-full p-4 border border-white/10 shadow-2xl">
                                            <RefreshCw className="w-8 h-8 text-purple-400 animate-spin" />
                                        </div>
                                    </div>
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-6 text-white font-medium tracking-wide text-sm bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10"
                                    >
                                        Analisando Expressões...
                                    </motion.p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Overlay Controls */}
                        {!isCapturing && (
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-center gap-4">
                                <Button
                                    size="lg"
                                    onClick={captureAndAnalyze}
                                    disabled={!selectedPatient || !isActive}
                                    className="rounded-full w-16 h-16 p-0 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-xl hover:scale-105 transition-all duration-300 group/btn"
                                >
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                    <Aperture className="w-8 h-8 relative z-10" />
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-muted/30">
                        <Camera className="w-16 h-16 mb-4 opacity-20" />
                        <p>Câmera desligada</p>
                    </div>
                )}
            </div>

            {/* Settings Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-muted/30 rounded-xl border border-border/50">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium flex items-center gap-2">
                            <Clock className="w-4 h-4 text-purple-500" />
                            Captura Automática
                        </label>
                        <div
                            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${autoCapture ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                            onClick={() => {
                                onAutoCaptureChange(!autoCapture);
                            }}
                        >
                            <motion.div
                                className="w-4 h-4 bg-white rounded-full shadow-sm"
                                animate={{ x: autoCapture ? 24 : 0 }}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">Intervalo (s):</span>
                        <div className="flex gap-2">
                            {[3, 5, 10, 15].map(seconds => (
                                <button
                                    key={seconds}
                                    onClick={() => setIntervalSeconds(seconds)}
                                    className={`px-3 py-1.5 text-xs rounded-md border transition-all ${intervalSeconds === seconds
                                        ? 'bg-purple-100 text-purple-700 border-purple-200 font-medium'
                                        : 'bg-background text-muted-foreground border-border hover:border-purple-200'
                                        }`}
                                >
                                    {seconds}s
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                        <Settings className="w-4 h-4 text-purple-500" />
                        Modelo de IA
                    </label>
                    <select
                        className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm focus:ring-1 focus:ring-purple-500 outline-none"
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                    >
                        {models.map(model => (
                            <option key={model.nome} value={model.nome}>
                                {model.nome}
                            </option>
                        ))}
                    </select>
                    <p className="text-[10px] text-muted-foreground">
                        Recomendado: Facenet para melhor balanço entre precisão e velocidade
                    </p>
                </div>
            </div>
        </div>
    );
}
