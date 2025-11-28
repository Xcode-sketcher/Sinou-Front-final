"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2, RefreshCw, Users, Kanban } from "lucide-react";

interface MethodologyModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    /**
     * Optional custom trigger element. When provided, it will be used as the
     * trigger for opening the modal (wrapped with DialogTrigger asChild).
     */
    trigger?: React.ReactNode;
}

/**
 * Modal de Metodologia (MethodologyModal)
 *
 * Apresenta informações sobre a metodologia ágil utilizada pela equipe.
 * Explica conceitos como Scrum, Sprints, Daily e Kanban.
 *
 * Funcionalidades:
 * - Exibição de conteúdo em modal (Dialog)
 * - Animações de entrada para os cards
 * - Trigger customizável ou botão padrão
 *
 * @param isOpen - Estado de controle de abertura do modal
 * @param onClose - Função para fechar o modal
 * @param trigger - Elemento opcional para acionar o modal
 */
export function MethodologyModal({ isOpen, onClose, trigger }: MethodologyModalProps) {
    const content = (
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center mb-4">Metodologia Ágil & Scrum</DialogTitle>
            </DialogHeader>

            <div className="space-y-8 py-4">
                <section>
                    <p className="text-muted-foreground leading-relaxed">
                        No Sinout, adotamos metodologias ágeis para garantir entregas contínuas de valor,
                        flexibilidade para mudanças e foco total nas necessidades dos nossos usuários.
                        Utilizamos a Metodologia Scrum para organizar nosso trabalho em ciclos iterativos e incrementais.
                    </p>
                </section>

                <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-6 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900 text-orange-600">
                                <RefreshCw className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg">Sprints</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Trabalhamos em ciclos curtos de 2 semanas (Sprints).
                            Isso nos permite planejar, executar e revisar funcionalidades rapidamente,
                            garantindo feedback constante.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-6 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg">Daily Scrum</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Realizamos reuniões diárias de 15 minutos para alinhar o progresso,
                            identificar impedimentos e garantir que toda a equipe esteja na mesma página.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600">
                                <Kanban className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg">Kanban</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Visualizamos nosso fluxo de trabalho através de quadros Kanban,
                            permitindo transparência total sobre o status de cada tarefa,
                            desde &quot;A Fazer&quot; até &quot;Concluído&quot;.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-6 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900 text-green-600">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg">Review & Retro</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Ao final de cada Sprint, apresentamos o trabalho concluído (Review)
                            e discutimos como podemos melhorar nosso processo (Retrospective).
                        </p>
                    </motion.div>
                </div>

                <section className="mt-8 pt-8 border-t border-border">
                    <blockquote className="italic text-center text-muted-foreground">
                        &quot;A tecnologia é a ponte que conecta mundos silenciosos.&quot;
                        <footer className="text-sm font-normal mt-2 not-italic opacity-75">
                            &quot;O que o rosto não diz, o coração sente.&quot; - A tecnologia traduzindo o invisível.
                        </footer>
                    </blockquote>
                </section>
            </div>
        </DialogContent>
    );

    if (isOpen !== undefined && onClose) {
        // Modal controlado externamente
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                {content}
            </Dialog>
        );
    }

    // If a custom trigger is provided, use it (keeps the existing uncontrolled
    // modal behavior when no trigger is passed).
    return (
        <Dialog>
            {trigger ? (
                <DialogTrigger asChild>{trigger}</DialogTrigger>
            ) : (
                <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2 border-orange-500 text-orange-600 hover:bg-orange-50">
                        <RefreshCw className="w-4 h-4" />
                        Nossa Metodologia
                    </Button>
                </DialogTrigger>
            )}
            {content}
        </Dialog>
    );
}
