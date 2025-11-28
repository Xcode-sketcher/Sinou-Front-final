import { HistoryItem, Patient, Rule } from "./types";

/**
 * Dados mock para desenvolvimento e testes do dashboard de estatísticas
 *
 * Este módulo fornece dados simulados para o desenvolvimento do sistema
 * de estatísticas do Sinout, permitindo testar a interface sem depender
 * do backend em tempo real.
 *
 * Dados incluídos:
 * - Paciente mock com informações básicas
 * - Regras de automação configuradas
 * - Histórico de detecções de emoções (últimas 24h)
 *
 * @module mock-data
 */

/**
 * Dados mock de um paciente para testes
 *
 * Representa um paciente típico do sistema Sinout com informações
 * básicas necessárias para o funcionamento do dashboard.
 */
export const mockPatient: Patient = {
    _id: "2",
    nome: "Private Patient",
    id_cuidador: 11,
    data_cadastro: "2025-11-19T19:04:58.969+00:00",
    status: true,
    informacoes_adicionais: null,
    foto_perfil: null,
    criado_por: "self"
};

/**
 * Array de regras mock para automação de mensagens
 *
 * Define regras configuradas para disparo automático de mensagens
 * baseado na detecção de emoções. Cada regra possui:
 * - Emoção alvo e nível de intensidade
 * - Percentual mínimo para ativação
 * - Mensagem a ser enviada
 * - Prioridade e status ativo
 */
export const mockRules: Rule[] = [
    {
        id: "691de9f5404192217234036e",
        userId: 1,
        emotion: "neutral",
        intensityLevel: "superior",
        minPercentage: 50,
        message: "Estou me sentindo calmo e focado.",
        priority: 1,
        active: true,
        createdAt: "2025-11-19T16:01:57.353+00:00",
        updatedAt: null
    },
    {
        id: "691de9f5404192217234036f",
        userId: 1,
        emotion: "happy",
        intensityLevel: "superior",
        minPercentage: 70,
        message: "Estou muito feliz!",
        priority: 2,
        active: true,
        createdAt: "2025-11-20T10:00:00.000+00:00",
        updatedAt: null
    },
    {
        id: "691de9f54041922172340370",
        userId: 1,
        emotion: "sad",
        intensityLevel: "superior",
        minPercentage: 60,
        message: "Preciso de atenção.",
        priority: 2,
        active: true,
        createdAt: "2025-11-20T11:00:00.000+00:00",
        updatedAt: null
    }
];

/**
 * Gera dados mock de histórico de detecções de emoções
 *
 * Cria um array de 50 itens simulando detecções de emoções
 * nas últimas 24 horas. Cada item contém:
 * - Timestamp aleatório dentro das últimas 24h
 * - Emoções detectadas com percentuais
 * - Emoção dominante
 * - Possível mensagem disparada
 *
 * @returns Array ordenado de itens de histórico (mais recente primeiro)
 */
const generateMockHistory = (): HistoryItem[] => {
    const items: HistoryItem[] = [];
    const now = new Date();
    const emotionsList = ['neutral', 'happy', 'sad', 'angry', 'fear', 'surprise', 'disgust'];

    for (let i = 0; i < 50; i++) {
        const time = new Date(now.getTime() - Math.random() * 24 * 60 * 60 * 1000);
        const dominant = emotionsList[Math.floor(Math.random() * emotionsList.length)];
        const percent = 50 + Math.random() * 50;

        items.push({
            _id: `hist_${i}`,
            id_usuario: 1,
            nome_paciente: "Dashboard",
            timestamp: time.toISOString(),
            emocoes_detectadas: {
                angry: dominant === 'angry' ? percent : Math.random() * 10,
                disgust: dominant === 'disgust' ? percent : Math.random() * 10,
                fear: dominant === 'fear' ? percent : Math.random() * 10,
                happy: dominant === 'happy' ? percent : Math.random() * 10,
                neutral: dominant === 'neutral' ? percent : Math.random() * 10,
                sad: dominant === 'sad' ? percent : Math.random() * 10,
                surprise: dominant === 'surprise' ? percent : Math.random() * 10,
            },
            emocao_dominante: dominant,
            percentual_dominante: percent,
            mensagem_disparada: Math.random() > 0.7 ? "Mensagem automática disparada" : null,
            regra_acionada_id: Math.random() > 0.7 ? 1 : null
        });
    }
    return items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

/**
 * Dados mock de histórico gerados no carregamento do módulo
 *
 * Array de 50 detecções de emoções simuladas, ordenadas por timestamp
 * decrescente (mais recentes primeiro). Gerado uma vez no server-side
 * para consistência em SSR.
 */
export const mockHistory = generateMockHistory();
