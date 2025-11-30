import React, { useState, useEffect, useCallback } from "react";
import { PatientHeader } from "./PatientHeader";
import { MetricsGrid } from "./MetricsGrid";
import { VolumeChart } from "./VolumeChart";
import { EmotionsPieChart } from "./EmotionsPieChart";
import { RecentActivityList } from "./RecentActivityList";
import { TrendsAnalysis } from "./TrendsAnalysis";
import { HistoryItem, Rule, Patient } from "./types";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

/**
 * Interface para itens de histórico retornados pela API.
 * Representa um registro de detecção emocional com dados brutos da API.
 */
interface ApiHistoryItem {
    id: string;
    patientId: number;
    patientName: string;
    timestamp: string;
    emotionsDetected: Record<string, number>;
    dominantEmotion: string;
    percentage: number;
    message: string | null;
    ruleId: number | null;
}

/**
 * Interface para regras retornadas pela API.
 * Define as regras de mapeamento emocional com configurações de prioridade.
 */
interface ApiRuleItem {
    id: string;
    userId: number;
    emotion: string;
    intensityLevel: string;
    minPercentage: number;
    message: string;
    priority: number;
    active: boolean;
    createdAt: string;
    updatedAt: string | null;
}

/**
 * Interface para dados de paciente retornados pela API.
 * Inclui campos que podem aparecer em diferentes formas dependendo do endpoint.
 */
interface ApiPatientItem {
    patientId?: number;
    id?: number | string;
    _id?: number | string;
    patientName?: string;
    name?: string;
    nome?: string;
    username?: string;
    email?: string;
    userId?: number;
    caregiverId?: number;
    id_cuidador?: number;
    createdAt?: string;
    data_cadastro?: string;
    additionalInfo?: Record<string, unknown> | null;
    informacoes_adicionais?: Record<string, unknown> | null;
    createdBy?: string;
    criado_por?: string;
}

/**
 * Dashboard principal de estatísticas do sistema Sinout.
 *
 * Componente central que orquestra a exibição de dados estatísticos do paciente,
 * incluindo métricas em tempo real, gráficos de volume, análise de tendências,
 * distribuição emocional e lista de atividades recentes.
 *
 * Funcionalidades principais:
 * - Filtragem temporal de dados (6h, 12h, 24h).
 * - Integração com API para busca de histórico, regras e dados do paciente.
 * - Mapeamento e validação de dados da API para formato interno.
 * - Estados de carregamento e tratamento de erros.
 * - Layout responsivo com grid adaptativo.
 */
export function StatisticsDashboard() {
    const { user } = useAuth();
    const [timeFilter, setTimeFilter] = useState<number>(0);
    const [filteredHistory, setFilteredHistory] = useState<HistoryItem[]>([]);
    const [rules, setRules] = useState<Rule[]>([]);
    const [patient, setPatient] = useState<Patient | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Atualiza o filtro temporal selecionado.
     * 
     * @param hours - Número de horas para filtrar o histórico.
     */
    const handleFilterChange = (hours: number) => {
        setTimeFilter(hours);
    };

    /**
     * Busca dados da API de forma assíncrona.
     * Executa múltiplas requisições em paralelo e processa os dados retornados.
     */
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        let historyResponse: { data: ApiHistoryItem[] } | undefined;
        let rulesResponse: { data: ApiRuleItem[] } | undefined;
        let patientResponse: { data: ApiPatientItem[] | { data?: ApiPatientItem[]; patients?: ApiPatientItem[] } | null } | undefined;

        try {
            const fetchWithTimeout = <T,>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
                const timeout = new Promise<T>((_, reject) => {
                    const id = setTimeout(() => {
                        clearTimeout(id);
                        reject(new Error(`Timed out in ${timeoutMs}ms.`));
                    }, timeoutMs);
                });

                return Promise.race([
                    promise,
                    timeout
                ]);
            };

            try {
                [historyResponse, rulesResponse, patientResponse] = await fetchWithTimeout(
                    Promise.all([
                        api.get(timeFilter === 0 ? '/api/history/my-history' : `/api/history/my-history?hours=${timeFilter}`),
                        api.get('/api/emotion-mappings/my-rules'),
                        api.get('/api/patients')
                    ]),
                    5000
                );
            } catch {
                // Tempo limite atingido ou requisição falhou; usa fallback de arrays vazios
                historyResponse = { data: [] };
                rulesResponse = { data: [] };
                patientResponse = { data: [] };
            }

            if (!historyResponse || !rulesResponse || !patientResponse) {
                throw new Error("Falha ao inicializar dados");
            }

            const rawHistory = historyResponse.data;
            let historyArray: HistoryItem[] = [];

            const mapHistoryItem = (item: ApiHistoryItem): HistoryItem => {
                let percentage = item.percentage;
                if (percentage === undefined || percentage === null) {
                    if (item.emotionsDetected && item.dominantEmotion) {
                        percentage = item.emotionsDetected[item.dominantEmotion] || 0;
                    } else {
                        percentage = 0;
                    }
                }

                return {
                    _id: item.id,
                    id_usuario: item.patientId,
                    nome_paciente: item.patientName,
                    timestamp: item.timestamp,
                    emocoes_detectadas: item.emotionsDetected,
                    emocao_dominante: item.dominantEmotion?.toLowerCase() || 'neutral',
                    percentual_dominante: percentage,
                    mensagem_disparada: item.message,
                    regra_acionada_id: item.ruleId
                };
            };

            if (Array.isArray(rawHistory)) {
                historyArray = rawHistory.map(mapHistoryItem);
            } else if (rawHistory && Array.isArray((rawHistory as { data?: ApiHistoryItem[] }).data)) {
                historyArray = (rawHistory as { data?: ApiHistoryItem[] }).data!.map(mapHistoryItem);
            } else if (rawHistory && Array.isArray((rawHistory as { items?: ApiHistoryItem[] }).items)) {
                historyArray = (rawHistory as { items?: ApiHistoryItem[] }).items!.map(mapHistoryItem);
            } else {
                // Formato de resposta de histórico inesperado — ignora e segue sem dados
            }

            historyArray = historyArray.filter(item =>
                item &&
                item.emocoes_detectadas && typeof item.emocoes_detectadas === "object"
            );

            setFilteredHistory(historyArray);

            const rawRules = rulesResponse.data;
            let rulesArray: Rule[] = [];

            const mapRuleItem = (item: ApiRuleItem): Rule => ({
                id: item.id,
                userId: item.userId,
                emotion: item.emotion?.toLowerCase() || 'neutral',
                intensityLevel: item.intensityLevel,
                minPercentage: item.minPercentage,
                message: item.message,
                priority: item.priority,
                active: item.active,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            });

            if (Array.isArray(rawRules)) {
                rulesArray = rawRules.map(mapRuleItem);
            } else if (rawRules && Array.isArray((rawRules as { data?: ApiRuleItem[] }).data)) {
                rulesArray = (rawRules as { data?: ApiRuleItem[] }).data!.map(mapRuleItem);
            } else {
                // Formato de resposta de regras inesperado — ignora e segue sem regras
            }

            setRules(rulesArray);

            // Processa dados do paciente a partir de /api/patients
            const rawPatients = patientResponse.data;
            let patientsList: ApiPatientItem[] = [];

            if (Array.isArray(rawPatients)) {
                patientsList = rawPatients;
            } else if (rawPatients && Array.isArray((rawPatients as { data?: ApiPatientItem[] }).data)) {
                patientsList = (rawPatients as { data?: ApiPatientItem[] }).data!;
            } else if (rawPatients && Array.isArray((rawPatients as { patients?: ApiPatientItem[] }).patients)) {
                patientsList = (rawPatients as { patients?: ApiPatientItem[] }).patients!;
            }

            // Usa o primeiro paciente da lista ou cria um fallback
            const patientData = patientsList.length > 0 ? patientsList[0] : null;

            if (patientData) {
                const mappedPatient: Patient = {
                    _id: String(patientData._id || patientData.id || patientData.patientId || ''),
                    nome: String(patientData.nome || patientData.name || patientData.patientName || user?.patientName || 'Paciente'),
                    id_cuidador: Number(patientData.id_cuidador || patientData.caregiverId || user?.id || 0),
                    data_cadastro: String(patientData.data_cadastro || patientData.createdAt || new Date().toISOString()),
                    status: true,
                    informacoes_adicionais: typeof patientData.informacoes_adicionais === 'string'
                        ? patientData.informacoes_adicionais
                        : (patientData.additionalInfo ? JSON.stringify(patientData.additionalInfo) : null),
                    foto_perfil: null,
                    criado_por: String(patientData.criado_por || patientData.createdBy || user?.name || 'user')
                };
                setPatient(mappedPatient);
            } else if (user) {
                // Fallback: cria paciente com dados do usuário logado
                const fallbackPatient: Patient = {
                    _id: user.patientId || "1",
                    nome: user.patientName || "Paciente",
                    id_cuidador: parseInt(user.id) || 0,
                    data_cadastro: new Date().toISOString(),
                    status: true,
                    informacoes_adicionais: null,
                    foto_perfil: null,
                    criado_por: user.name || "Sistema"
                };
                setPatient(fallbackPatient);
            }

            setError(null);
        } catch (err: unknown) {
            const error = err as Error;
            // Falha ao buscar dados: error armazenado em estado para exibição ao usuário
            setError(error?.message || "Erro ao carregar dados");
            setFilteredHistory([]);
            setRules([]);
            setPatient(null);
        } finally {
            setLoading(false);
        }
    }, [timeFilter, user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="space-y-6">
            {patient && <PatientHeader patient={patient} />}

            <div className="flex justify-end mb-4">
                <div className="flex items-center gap-2 bg-muted/30 p-1 rounded-lg border border-border">
                    <Filter className="w-4 h-4 ml-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground mr-2">Filtrar:</span>
                    {[6, 12, 24, 0].map((hours) => (
                        <Button
                            key={hours}
                            variant={timeFilter === hours ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => handleFilterChange(hours)}
                            className="text-xs h-7"
                        >
                            {hours === 0 ? "Todas" : `${hours}h`}
                        </Button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Carregando dados...</p>
                    </motion.div>
                </div>
            ) : (
                <>
                    {error && (
                        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {filteredHistory.length > 0 ? (
                        <>
                            <MetricsGrid history={filteredHistory} rules={rules} />

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto lg:h-[500px]">
                                <VolumeChart history={filteredHistory} />
                                <EmotionsPieChart history={filteredHistory} />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <TrendsAnalysis history={filteredHistory} />
                                <RecentActivityList history={filteredHistory} rules={rules} />
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center min-h-[400px]">
                            <p className="text-muted-foreground">Nenhum dado encontrado.</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
