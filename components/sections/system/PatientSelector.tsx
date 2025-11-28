"use client";

import { useState, useEffect } from "react";
import { Patient } from "@/components/sections/statistics/types";
import api from "@/lib/api";
import { User, ChevronDown, Loader2 } from "lucide-react";

/**
 * Propriedades do componente PatientSelector.
 */
interface PatientSelectorProps {
    /** O paciente atualmente selecionado. */
    selectedPatient: Patient | null;
    /** Função chamada quando um novo paciente é selecionado. */
    onSelect: (patient: Patient) => void;
}

/**
 * Componente Seletor de Pacientes.
 * 
 * Exibe um menu suspenso (dropdown) que permite ao usuário selecionar o paciente ativo.
 * Carrega a lista de pacientes associados ao cuidador logado via API.
 */
export function PatientSelector({ selectedPatient, onSelect }: PatientSelectorProps) {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatients = async () => {
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

                setPatients(patientsList);

                if (patientsList.length === 0) {
                    const mockPatients: Patient[] = [
                        { _id: "1", nome: "João Silva", idade: 65, diagnostico: "Alzheimer", id_cuidador: 1, data_cadastro: "2024-01-15", status: true, informacoes_adicionais: null, foto_perfil: null, criado_por: "admin" },
                        { _id: "2", nome: "Maria Santos", idade: 72, diagnostico: "Demência", id_cuidador: 1, data_cadastro: "2024-02-20", status: true, informacoes_adicionais: null, foto_perfil: null, criado_por: "admin" },
                        { _id: "3", nome: "Pedro Oliveira", idade: 58, diagnostico: "Parkinson", id_cuidador: 1, data_cadastro: "2024-03-10", status: true, informacoes_adicionais: null, foto_perfil: null, criado_por: "admin" }
                    ];
                    setPatients(mockPatients);
                }
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    useEffect(() => {
        if (!loading && patients.length > 0 && !selectedPatient) {
            onSelect(patients[0]);
        }
    }, [loading, patients, selectedPatient, onSelect]);

    return (
        <div className="relative group min-w-[250px]">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                {loading ? (
                    <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
                ) : (
                    <User className="w-4 h-4 text-purple-500" />
                )}
            </div>

            <select
                className="w-full h-11 pl-10 pr-10 appearance-none bg-card border border-border rounded-xl text-sm font-medium text-foreground focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all cursor-pointer hover:bg-muted/50"
                value={selectedPatient?._id || ""}
                onChange={(e) => {
                    const patient = patients.find(p => p._id === e.target.value);
                    if (patient) onSelect(patient);
                }}
                disabled={loading}
            >
                {loading ? (
                    <option value="" disabled>Carregando pacientes...</option>
                ) : patients.length === 0 ? (
                    <option value="" disabled>Nenhum paciente encontrado</option>
                ) : (
                    <>
                        <option value="" disabled>Selecione um paciente</option>
                        {patients.map((patient, index) => (
                            <option key={`${patient._id}-${index}`} value={patient._id}>
                                {patient.nome}
                            </option>
                        ))}
                    </>
                )}
            </select>

            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-muted-foreground">
                <ChevronDown className="w-4 h-4" />
            </div>
        </div>
    );
}
