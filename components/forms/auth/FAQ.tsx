"use client";

import { useState } from "react";
import { ModernMenu } from "@/components/layout/Header";
import { Plus, Minus, Sparkles, MessageCircle, Settings, Edit3, Zap, Smile } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes drift1 {
    0% { transform: translate(0, 0) rotate(0deg); opacity: 0.4; }
    50% { transform: translate(100px, 50px) rotate(10deg); opacity: 0.6; }
    100% { transform: translate(0, 0) rotate(0deg); opacity: 0.4; }
  }

  @keyframes drift2 {
    0% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
    50% { transform: translate(-80px, 100px) rotate(-15deg); opacity: 0.5; }
    100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
  }

  @keyframes drift3 {
    0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
    50% { transform: translate(50px, -50px) scale(1.1); opacity: 0.5; }
    100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
  }

  .floating {
    animation: float 4s ease-in-out infinite;
  }
  
  .drifting-1 { animation: drift1 25s ease-in-out infinite; }
  .drifting-2 { animation: drift2 30s ease-in-out infinite; animation-delay: 2s; }
  .drifting-3 { animation: drift3 35s ease-in-out infinite; animation-delay: 5s; }
`;

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Equipe", href: "/equipe" },
  { label: "Planos", href: "/#pagamento" },
  { label: "Estatística", href: "/estatistica" },
];
const socialItems = [
  { label: "", href: "#" },
  { label: "", href: "#" },
];

interface FAQItemProps {
  icon: React.ElementType;
  question: string;
  answer: string;
  isOpen: boolean;
  toggle: () => void;
}

/**
 * Item Individual da FAQ (FAQItem).
 *
 * Exibe uma pergunta e resposta em formato de accordion.
 *
 * @param icon - Ícone ilustrativo da pergunta.
 * @param question - Texto da pergunta.
 * @param answer - Texto da resposta.
 * @param isOpen - Estado de visibilidade da resposta.
 * @param toggle - Função para alternar visibilidade.
 */
const FAQItem = ({ icon: Icon, question, answer, isOpen, toggle }: FAQItemProps) => {
  return (
    <div className="mb-4">
      <header>
        <title>Sinout - FAQ</title>
      </header>
      <button
        onClick={toggle}
        className={`w-full flex items-center justify-between p-5 rounded-xl transition-all duration-300 border 
        ${isOpen
            ? "bg-gradient-to-r from-orange-400 to-orange-300 dark:from-orange-700 dark:to-orange-900 border-orange-400 dark:border-orange-600 shadow-lg shadow-orange-500/20"
            : "bg-gradient-to-r from-orange-100/40 to-white/60 dark:from-gray-800 dark:to-gray-900 border-orange-200 dark:border-gray-700 hover:border-orange-400 dark:hover:border-orange-500"
          } group`}
      >
        <div className="flex items-center gap-4 text-left">
          <div className={`p-3 rounded-xl transition-colors ${isOpen
            ? 'bg-white/20 text-white'
            : 'bg-orange-100 dark:bg-gray-700 text-orange-600 dark:text-orange-400'
            }`}>
            <Icon size={24} />
          </div>

          <span className={`text-lg font-bold transition-colors ${isOpen
            ? 'text-white'
            : 'text-gray-700 dark:text-gray-200 group-hover:text-orange-600 dark:group-hover:text-orange-400'
            }`}>
            {question}
          </span>
        </div>

        <div className={`
            flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300
            ${isOpen
            ? "bg-white/20 border-white text-white rotate-180"
            : "bg-white dark:bg-gray-800 border-orange-200 dark:border-gray-600 text-orange-500 dark:text-orange-400 shadow-sm rotate-0 group-hover:bg-orange-500 group-hover:text-white dark:group-hover:bg-orange-500 dark:group-hover:text-white dark:group-hover:border-orange-500"
          }
        `}>
          {isOpen ? <Minus size={20} strokeWidth={3} /> : <Plus size={20} strokeWidth={3} />}
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out overflow-hidden text-slate-600 dark:text-slate-300 ${isOpen
          ? "grid-rows-[1fr] opacity-100 mt-2 p-6 bg-white/60 dark:bg-gray-900/60 rounded-xl border border-orange-100 dark:border-gray-800 shadow-sm backdrop-blur-sm"
          : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden leading-relaxed text-lg">
          {answer}
        </div>
      </div>
    </div>
  );
};

/**
 * Página de Ajuda / FAQ (AjudaPage).
 *
 * Apresenta uma lista de perguntas frequentes sobre o sistema Sinout.
 * Inclui animações de fundo e um call-to-action para contato.
 *
 * Funcionalidades:
 * - Listagem de perguntas expansíveis.
 * - Animações decorativas de fundo.
 * - Link para contato.
 */
export default function AjudaPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      icon: Zap,
      question: "Como funciona?",
      answer: "Nossa tecnologia funciona de forma simples e intuitiva, usando a câmera do seu computador, tablet ou celular para transformar suas expressões faciais em comunicação.",
    },
    {
      icon: Smile,
      question: "Como isso pode me ajudar?",
      answer: "Nosso software foi criado para ser uma ponte entre suas emoções e o mundo, trazendo benefícios práticos e diretos para o seu dia a dia.",
    },
    {
      icon: Settings,
      question: "Como personalizar?",
      answer: "Acesse o menu de opções e escolha as opções que mais combinam com você e ajuste facilmente cada detalhe conforme sua preferência.",
    },
    {
      icon: Edit3,
      question: "Como trocar as palavras pré-definidas?",
      answer: "Clique sobre a palavra que deseja alterar, digite o novo texto e pronto! Personalize facilmente conforme sua necessidade.",
    },
  ];

  return (
    <>
      <style jsx global>{customStyles}</style>

      <div className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden relative">

        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />

          <div className="absolute top-[20%] left-[10%] w-[300px] h-[600px] bg-purple-600/15 rounded-full blur-[100px] drifting-1 mix-blend-multiply dark:mix-blend-soft-light" />
          <div className="absolute bottom-[30%] right-[20%] w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[130px] drifting-2 mix-blend-multiply dark:mix-blend-soft-light" />
          <div className="absolute top-[40%] right-[-10%] w-[250px] h-[500px] bg-purple-400/15 rounded-full blur-[90px] rotate-45 drifting-3 mix-blend-multiply dark:mix-blend-soft-light" />
        </div>


        <ModernMenu items={menuItems} socialItems={socialItems} />

        <main className="container mx-auto px-4 pt-32 pb-20 max-w-4xl relative z-10">

          <div className="text-center mb-14 space-y-4">
            <div className="inline-block p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl mb-2 shadow-inner floating">
              <MessageCircle className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 pb-2 leading-tight">
              Perguntas Frequentes
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubra como o Sinout pode transformar sua comunicação
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                icon={faq.icon}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                toggle={() => toggleFAQ(index)}
              />
            ))}
          </div>

          <div className="mt-20 relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-purple-600 via-purple-700 to-blue-700 p-12 text-center shadow-2xl shadow-purple-500/30">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-900/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <Sparkles className="text-yellow-300 w-12 h-12 mb-6 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ainda tem dúvidas?
              </h2>
              <p className="text-purple-100 mb-8 text-lg md:text-xl max-w-xl">
                Nossa equipe está pronta para ajudar você a configurar tudo para suas necessidades.
              </p>

              <Link href="/#contact">
                <Button
                  size="lg"
                  className="bg-white text-purple-700 hover:bg-gray-50 hover:text-purple-800 font-bold rounded-full px-10 py-7 text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 border-2 border-transparent hover:border-purple-200"
                >
                  Entre em Contato
                </Button>
              </Link>
            </div>
          </div>

        </main>
      </div>
    </>
  );
}