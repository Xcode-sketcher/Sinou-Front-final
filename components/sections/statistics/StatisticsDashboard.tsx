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

/**
 * Interface para itens de histórico retornados pela API
 * Representa um registro de detecção emocional com dados brutos da API
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
 * Interface para regras retornadas pela API
 * Define as regras de mapeamento emocional com configurações de prioridade
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
 * Dashboard principal de estatísticas do sistema Sinout
 *
 * Componente central que orquestra a exibição de dados estatísticos do paciente,
 * incluindo métricas em tempo real, gráficos de volume, análise de tendências,
 * distribuição emocional e lista de atividades recentes.
 *
 * Funcionalidades principais:
 * - Filtragem temporal de dados (6h, 12h, 24h)
 * - Integração com API para busca de histórico, regras e dados do paciente
 * - Mapeamento e validação de dados da API para formato interno
 * - Estados de carregamento e tratamento de erros
 * - Layout responsivo com grid adaptativo
 *
 * @component
 * @example
 * ```tsx
 * <StatisticsDashboard />
 * ```
 *
 * @returns {JSX.Element} Dashboard completo com todas as seções estatísticas
 */
export function StatisticsDashboard() {
    // Estados para controle de filtro temporal (6, 12 ou 24 horas)
    const [timeFilter, setTimeFilter] = useState<number>(24);

    // Estados para armazenamento de dados do histórico emocional
    const [filteredHistory, setFilteredHistory] = useState<HistoryItem[]>([]);

    // Estado para regras de mapeamento emocional ativas
    const [rules, setRules] = useState<Rule[]>([]);

    // Estado para dados do paciente atual
    const [patient, setPatient] = useState<Patient | null>(null);

    // Estados para controle de UI (carregamento e erros)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Função assíncrona para buscar dados da API
     * Executa múltiplas requisições em paralelo e processa os dados retornados
     *
     * Processamento realizado:
     * 1. Busca histórico emocional filtrado por tempo
     * 2. Busca regras de mapeamento ativas do usuário
     * 3. Busca dados do paciente autenticado
     * 4. Mapeia dados da API para formato interno do componente
     * 5. Filtra entradas inválidas e calcula percentuais quando necessário
     */
    const fetchData = useCallback(async () => {
        try {
            // Executa requisições em paralelo para otimizar performance
            const [historyResponse, rulesResponse, patientResponse] = await Promise.all([
                api.get(`/api/history/my-history?hours=${timeFilter}`),
                api.get('/api/emotion-mappings/my-rules'),
                api.get('/api/users/me')
            ]);

            // Processamento do histórico emocional
            const rawHistory = historyResponse.data;
            let historyArray: HistoryItem[] = [];

            /**
             * Função auxiliar para mapear item da API para formato interno
             * Realiza cálculo de percentual dominante quando necessário
             */
            const mapHistoryItem = (item: ApiHistoryItem): HistoryItem => {
                // Calcula percentual se não fornecido pela API
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

            // Processa diferentes formatos possíveis de resposta da API
            if (Array.isArray(rawHistory)) {
                historyArray = rawHistory.map(mapHistoryItem);
            } else if (rawHistory && Array.isArray((rawHistory as { data?: ApiHistoryItem[] }).data)) {
                historyArray = (rawHistory as { data?: ApiHistoryItem[] }).data!.map(mapHistoryItem);
            } else if (rawHistory && Array.isArray((rawHistory as { items?: ApiHistoryItem[] }).items)) {
                historyArray = (rawHistory as { items?: ApiHistoryItem[] }).items!.map(mapHistoryItem);
            } else {
                console.error("Unexpected history response format", rawHistory);
            }

            // Filtra entradas inválidas (sem dados de emoções detectadas)
            historyArray = historyArray.filter(item =>
                item &&
                item.emocoes_detectadas && typeof item.emocoes_detectadas === "object"
            );

            // Atualiza estados com dados processados
            setFilteredHistory(historyArray);

            // Processamento das regras de mapeamento emocional
            const rawRules = rulesResponse.data;
            let rulesArray: Rule[] = [];

            /**
             * Função auxiliar para mapear regra da API para formato interno
             * Normaliza nomes de emoções para minúsculas
             */
            const mapRuleItem = (item: ApiRuleItem): Rule => ({
                _id: item.id,
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

            // Processa diferentes formatos de resposta para regras
            if (Array.isArray(rawRules)) {
                rulesArray = rawRules.map(mapRuleItem);
            } else if (rawRules && Array.isArray((rawRules as { data?: ApiRuleItem[] }).data)) {
                rulesArray = (rawRules as { data?: ApiRuleItem[] }).data!.map(mapRuleItem);
            } else {
                console.error("Unexpected rules response format", rawRules);
            }

            setRules(rulesArray);

            // Processamento dos dados do paciente
            const patientData = patientResponse.data;
            if (patientData) {
                // Mapeia dados do paciente com fallbacks para diferentes formatos de API
                const mappedPatient: Patient = {
                    _id: patientData.patientId || patientData.id || patientData._id,
                    nome: patientData.patientName || patientData.name || patientData.nome || patientData.username || patientData.email,
                    id_cuidador: patientData.userId || patientData.caregiverId || patientData.id_cuidador || 1, // fallback
                    data_cadastro: patientData.createdAt || patientData.data_cadastro || new Date().toISOString(),
                    status: true, // Default to true as status field was removed
                    informacoes_adicionais: patientData.additionalInfo || patientData.informacoes_adicionais || null,
                    foto_perfil: null, // Profile photo removed from User model
                    criado_por: patientData.createdBy || patientData.criado_por || 'user'
                };
                setPatient(mappedPatient);
            }

            // Limpa estado de erro em caso de sucesso
            setError(null);
        } catch (err: unknown) {
            // Tratamento de erros com logging e atualização de estados
            const error = err as Error;
            console.error("Failed to fetch data", err);
            setError(error?.message || "Erro ao carregar dados");
            setFilteredHistory([]);
            setRules([]);
            setPatient(null);
        } finally {
            // Garante que loading seja desativado independentemente do resultado
            setLoading(false);
        }
    }, [timeFilter]);

    // Hook useEffect para buscar dados quando filtro temporal muda
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    /**
     * Manipulador para mudança de filtro temporal
     * Atualiza o estado timeFilter que dispara nova busca de dados
     *
     * @param {number} hours - Número de horas para filtrar (6, 12 ou 24)
     */
    const handleFilterChange = (hours: number) => {
        setTimeFilter(hours);
    };

    // Debug logging para desenvolvimento
    console.log('Filtered History:', filteredHistory);

    return (
        <div className="min-h-screen bg-background p-4 md:p-8 space-y-8">
            {/* Renderiza cabeçalho do paciente se dados estiverem disponíveis */}
            {patient && <PatientHeader patient={patient} />}

            {/* Seção de controles de filtro temporal */}
            <div className="flex justify-end mb-4">
                <div className="flex items-center gap-2 bg-muted/30 p-1 rounded-lg border border-border">
                    {/* Ícone de filtro para identificação visual */}
                    <Filter className="w-4 h-4 ml-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground mr-2">Filtrar:</span>
                    {/* Botões de filtro para diferentes períodos temporais */}
                    {[6, 12, 24].map((hours) => (
                        <Button
                            key={hours}
                            variant={timeFilter === hours ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => handleFilterChange(hours)}
                            className="text-xs h-7"
                        >
                            {hours}h
                        </Button>
                    ))}
                </div>
            </div>

            {/* Renderização condicional baseada no estado dos dados */}
            {loading ? (
                // Estado de carregamento com animação
                <div className="flex items-center justify-center min-h-[400px]">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Carregando dados...</p>
                    </motion.div>
                </div>
            ) : error ? (
                // Estado de erro com mensagem descritiva
                <div className="flex items-center justify-center min-h-[400px]">
                    <p className="text-destructive">{error}</p>
                </div>
            ) : filteredHistory.length > 0 ? (
                // Estado com dados - renderiza dashboard completo
                <>
                    {/* Grade de métricas em tempo real */}
                    <MetricsGrid history={filteredHistory} rules={rules} />

                    {/* Grid responsivo com gráficos de volume e emoções */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto lg:h-[500px]">
                        <VolumeChart history={filteredHistory} />
                        <EmotionsPieChart history={filteredHistory} />
                    </div>

                    {/* Grid com análise de tendências e atividades recentes */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <TrendsAnalysis history={filteredHistory} />
                        <RecentActivityList history={filteredHistory} rules={rules} />
                    </div>
                </>
            ) : (
                // Estado sem dados disponíveis
                <div className="flex items-center justify-center min-h-[400px]">
                    <p className="text-muted-foreground">Nenhum dado encontrado.</p>
                </div>
            )}
        </div>
    );
}
