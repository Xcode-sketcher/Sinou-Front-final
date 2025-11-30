"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { SystemDashboard } from "@/components/sections/system/SystemDashboard";
import dynamic from "next/dynamic";


const Footer7 = dynamic(() => import("@/components/layout/Footer").then(mod => mod.Footer7));

export default function SistemaPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }



    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <header>
                <title>Sinout - Plataforma</title>
            </header>
            {/* Cabeçalho fornecido pelo layout global */}

            <main className="flex-grow pt-20">
                <SystemDashboard />
            </main>

            <Footer7 className="mt-auto border-t border-border bg-muted/30" />
        </div>
    );
}
