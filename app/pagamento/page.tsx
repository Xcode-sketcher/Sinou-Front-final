"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, CreditCard, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Componente de conteúdo da página de pagamento.
 * 
 * Gerencia a exibição dos detalhes do plano selecionado e o processamento
 * simulado do pagamento. Utiliza hooks de navegação para recuperar o plano
 * escolhido via parâmetros de URL.
 */
function PaymentPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const planId = searchParams.get("plan");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    /**
     * Memoriza os detalhes do plano com base no ID fornecido na URL.
     * Retorna um objeto com nome, preço e funcionalidades do plano.
     */
    const planDetails = useMemo(() => {
        switch (planId) {
            case "Olhar Básico":
                return {
                    name: "Olhar Básico",
                    price: "Gratuito",
                    features: ["Tradução básica", "Relatório simples"]
                };
            case "Olhar Completo":
                return {
                    name: "Olhar Completo",
                    price: "R$ 49/mês",
                    features: ["Tudo do Básico", "Relatórios detalhados", "Suporte prioritário"]
                };
            case "Olhar Corporativo":
                return {
                    name: "Olhar Corporativo",
                    price: "Sob Consulta",
                    features: ["Múltiplos perfis", "Dashboard analítico", "API dedicada"]
                };
            default:
                return {
                    name: "Plano Selecionado",
                    price: "A definir",
                    features: []
                };
        }
    }, [planId]);

    /**
     * Gerencia o envio do formulário de pagamento.
     * Simula um processamento assíncrono e atualiza o estado para sucesso.
     * 
     * @param e - Evento de submissão do formulário.
     */
    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 2000);
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-md w-full text-center space-y-6"
                >
                    <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-12 h-12 text-green-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">Plano assinado com sucesso</h1>
                    <p className="text-muted-foreground">
                        Obrigado por assinar o plano {planDetails?.name}. Você receberá um email com os detalhes em breve.
                    </p>
                    <Button onClick={() => router.push("/sistema")} className="w-full">
                        Acessar Sistema
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/#pricing" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar para Planos
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card className="h-full border-primary/10 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>Resumo do Pedido</CardTitle>
                                <CardDescription>Revise os detalhes do seu plano</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex justify-between items-baseline border-b border-border pb-4">
                                    <h3 className="text-2xl font-bold">{planDetails?.name}</h3>
                                    <span className="text-xl font-semibold text-primary">{planDetails?.price}</span>
                                </div>
                                <ul className="space-y-3">
                                    {planDetails?.features.map((feature, i) => (
                                        <li key={i} className="flex items-center text-sm text-muted-foreground">
                                            <Check className="w-4 h-4 text-primary mr-2" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="bg-muted/20 mt-auto">
                                <div className="flex items-center text-xs text-muted-foreground w-full justify-center">
                                    <ShieldCheck className="w-3 h-3 mr-1" />
                                    Ambiente seguro para testes
                                </div>
                            </CardFooter>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="border-border shadow-lg">
                            <CardHeader>
                                <CardTitle>Dados de Pagamento</CardTitle>
                                <CardDescription>Insira os dados do cartão (Simulação)</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handlePayment} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Nome no Cartão
                                        </label>
                                        <input
                                            required
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="João da Silva"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Número do Cartão
                                        </label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <input
                                                required
                                                className="flex h-10 w-full rounded-md border border-input bg-background pl-9 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="0000 0000 0000 0000"
                                                maxLength={19}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                Validade
                                            </label>
                                            <input
                                                required
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="MM/AA"
                                                maxLength={5}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                CVV
                                            </label>
                                            <input
                                                required
                                                type="password"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="123"
                                                maxLength={3}
                                            />
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full mt-6" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processando...
                                            </>
                                        ) : (
                                            "Confirmar Pagamento"
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

/**
 * Página principal de Pagamento.
 * 
 * Envolve o conteúdo da página em um Suspense boundary para lidar com
 * o carregamento assíncrono dos parâmetros de busca.
 */
export default function PaymentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentPageContent />
        </Suspense>
    );
}
