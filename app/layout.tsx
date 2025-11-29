import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { ContextMenu } from "@/components/ui/ContextMenu";
import HeaderGuard from "@/components/layout/HeaderGuard";
import { AuthProvider } from "@/context/AuthContext";
import { CookieConsent } from "@/components/ui/CookieConsent";
import Script from "next/script";
import "./globals.css";
import { VLibras } from "@/components/Vlibras";
import CustomCursor from "@/components/ui/pointer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Sinout",
    default: "Sinout – Comunicação Assistiva com Tecnologia Inclusiva",
  },
  description:
    "Sinout é uma plataforma de comunicação assistiva desenvolvida para pessoas com limitação motora. Transformando micro-expressões em voz, texto com dignidade, autonomia e inclusão.",
  keywords: [
    "comunicação assistiva",
    "tecnologia assistiva",
    "deficiência motora",
    "acessibilidade digital",
    "comunicação alternativa",
    "Sinout",
    "plataforma inclusiva",
    "Tecnologia para PcD",
    "comunicação não verbal",
    "controle por movimento",
    "inclusão digital",
  ],
  authors: [{ name: "Equipe Sinout", url: "https://sinout.com.br" }],
  creator: "Sinout Tecnologia Inclusiva",
  publisher: "Sinout",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomCursor />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ContextMenu />
            <CookieConsent />
            <HeaderGuard items={[]} />
            {children}
            <VLibras />
          </AuthProvider>
        </ThemeProvider>

        {/* Chatbot Chatling */}
        <Script
          id="chatling-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.chtlConfig = { chatbotId: "3668595753" }
            `,
          }}
        />
        <Script
          id="chtl-script"
          data-id="3668595753"
          src="https://chatling.ai/js/embed.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js"
          strategy="lazyOnload"
          defer
        />
      </body>
    </html>
  );
}

