"use client";

/**
 * Componente PatientHeader
 *
 * Cabeçalho elegante que exibe informações detalhadas do paciente selecionado,
 * incluindo foto de perfil, status de atividade, dados cadastrais e informações do cuidador.
 *
 * Funcionalidades principais:
 * - Avatar circular com foto do paciente ou inicial do nome
 * - Indicador visual de status (ativo/inativo) com cores diferenciadas
 * - Informações completas: nome, data de cadastro, ID do cuidador
 * - Campo opcional para informações adicionais do paciente
 * - Design responsivo com layout adaptável (vertical mobile, horizontal desktop)
 * - Efeitos visuais com gradientes e sombras
 * - Animação de entrada suave com Framer Motion
 * - Elemento decorativo com ícone de usuário em background
 */

import { motion } from "framer-motion";
import { User, Calendar, Info } from "lucide-react";
import { Patient } from "./types";
import { Card } from "@/components/ui/card";
import Image from "next/image";

/**
 * Props do componente PatientHeader
 */
interface PatientHeaderProps {
    /** Objeto contendo todas as informações do paciente */
    patient: Patient;
}

/**
 * Componente PatientHeader
 * Renderiza um cabeçalho informativo para o dashboard do paciente
 * com foto, status e dados cadastrais organizados visualmente
 */
export function PatientHeader({ patient }: PatientHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
        >
            <Card className="bg-gradient-to-r from-background to-muted/50 border-l-4 border-l-purple-500 overflow-hidden relative">
                {/* Elemento decorativo com ícone de usuário em background */}
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <User className="w-32 h-32" />
                </div>

                {/* Conteúdo principal do card */}
                <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
                    {/* Seção do avatar e status */}
                    <div className="relative">
                        {/* Avatar circular com gradiente ou foto */}
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg ring-4 ring-background">
                            {patient.foto_perfil ? (
                                <Image src={patient.foto_perfil} alt={patient.nome} width={80} height={80} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                patient.nome.charAt(0).toUpperCase()
                            )}
                        </div>
                        {/* Indicador de status (bolinha verde/vermelha) */}
                        <div className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-background ${patient.status ? 'bg-green-500' : 'bg-gray-400'}`} />
                    </div>

                    {/* Seção de informações textuais */}
                    <div className="flex-1">
                        {/* Título principal com gradiente */}
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                            Dashboard de {patient.nome}
                        </h1>

                        {/* Metadados do paciente em linha flexível */}
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                            {/* Data de cadastro formatada */}
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>Cadastrado em {new Date(patient.data_cadastro).toLocaleDateString()}</span>
                            </div>
                            {/* ID do cuidador responsável */}
                            <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span>Cuidador ID: {patient.id_cuidador}</span>
                            </div>
                            {/* Informações adicionais (se existirem) */}
                            {patient.informacoes_adicionais && (
                                <div className="flex items-center gap-1">
                                    <Info className="w-4 h-4" />
                                    <span>{patient.informacoes_adicionais}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
