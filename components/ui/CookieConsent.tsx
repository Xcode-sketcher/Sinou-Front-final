"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

/**
 * Componente CookieConsent
 *
 * Exibe um banner de consentimento de cookies na parte inferior da tela.
 * O banner é exibido apenas se o usuário ainda não tiver aceitado os cookies.
 *
 * Funcionalidades:
 * - Persistência da escolha do usuário via localStorage
 * - Links para Política de Privacidade e Termos de Uso
 * - Design responsivo e não intrusivo
 */
export function CookieConsent() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => {
                setShow(true);
            }, 0);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border p-4 shadow-lg">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl">
                <div className="flex-1">
                    <p className="text-sm text-muted-foreground">
                        Utilizamos cookies para garantir a segurança e funcionalidade da plataforma. Ao continuar navegando, você concorda com nossa{' '}
                        <a href="/privacidade" className="text-primary hover:underline">
                            Política de Privacidade
                        </a>{' '}
                        e{' '}
                        <a href="/termos" className="text-primary hover:underline">
                            Termos de Uso
                        </a>.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={acceptCookies} size="sm" className="bg-primary hover:bg-primary/90">
                        Aceitar
                    </Button>
                </div>
            </div>
        </div>
    );
}