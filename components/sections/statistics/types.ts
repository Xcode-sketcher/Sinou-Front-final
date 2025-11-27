export interface Emotions {
    [key: string]: number;
}

export interface HistoryItem {
    _id: string;
    id_usuario: number;
    nome_paciente: string;
    timestamp: string;
    emocoes_detectadas: Emotions;
    emocao_dominante: string;
    percentual_dominante: number;
    mensagem_disparada: string | null;
    regra_acionada_id: number | null;
}

export interface Rule {
    _id: string;
    userId?: number;
    emotion: string;
    intensityLevel: string;
    minPercentage: number;
    message: string;
    priority: number;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string | null;
}

export interface Patient {
    _id: string;
    nome: string;
    idade?: number;
    diagnostico?: string;
    id_cuidador: number;
    data_cadastro: string;
    status: boolean;
    informacoes_adicionais: string | null;
    foto_perfil: string | null;
    criado_por: string;
}
