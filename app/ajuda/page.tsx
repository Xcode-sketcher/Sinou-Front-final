"use client";
import FAQ from "@/components/forms/auth/FAQ";
import { Footer7 } from "@/components/layout/Footer";
import { ModernMenu } from "@/components/layout/Header";
import CustomCursor  from "@/components/ui/pointer";
// import VLibrasWidget from '../../acessibilidade/vLibras'; 




export default function AjudaPage() {
    const socialItems = [
        { label: "", href: "#" },
        { label: "", href: "#" },
    ];

    return (
        <>
            <ModernMenu items={[]} socialItems={socialItems} />
            <FAQ />
            <Footer7 />
            <CustomCursor />
            {/* <VLibrasWidget /> */}

        </>
    );
}
