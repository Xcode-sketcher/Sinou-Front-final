"use client";

import { usePathname } from "next/navigation";
import { ModernMenu } from "@/components/layout/Header";
import Image from "next/image";
import Link from "next/link";

interface HeaderGuardProps {
    /** Optionally allow overriding menu items */
    items?: { label: string; href: string }[];
}

export default function HeaderGuard({ items = [] }: HeaderGuardProps) {
    // Use client-side router to get pathname
    const pathname = usePathname();

    if (!pathname) return null;

    // Exclude routes that shouldn't show the site header
    const excluded = [
        "/login",
        "/register",
        "/reset-password",
        "/reset-password/new",
        "/reset-password/new/",
        "/reset-password/",
    ];

    // Also exclude if path begins with these prefixes
    const excludedPrefixes = [
        "/auth",
    ];

    const isExcluded = excluded.includes(pathname) || excludedPrefixes.some((pref) => pathname.startsWith(pref));

    if (isExcluded) {
        // Minimal header showing only the logo for auth pages
        return (
            <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="container mx-auto px-4 py-4 flex items-center">
                    <Link href="/" className="flex items-center">
                        <Image src="/Sinout.svg" alt="Sinout" width={100} height={40} className="h-12 w-auto" />
                    </Link>
                </div>
            </div>
        );
    }

    return <ModernMenu items={items} />;
}
