"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

/**
 * Componente de Rodapé (Footer7)
 *
 * Rodapé principal da aplicação com links de navegação,
 * informações de contato e redes sociais.
 *
 * Funcionalidades:
 * - Navegação organizada por seções
 * - Links para redes sociais com animação
 * - Informações de contato e copyright
 * - Elementos decorativos de fundo
 *
 * @param className - Classes CSS adicionais
 */
export const Footer7 = ({ className = "" }: { className?: string }) => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Produto",
      links: [
        { name: "Como Funciona", href: "/ajuda" },
        { name: "Planos", href: "/#pricing" },
        { name: "Funcionalidades", href: "/#features" },
        { name: "Demonstração", href: "/#demo" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { name: "Sobre Nós", href: "/sobre" },
        { name: "Equipe", href: "/equipe" },
        { name: "Recursos", href: "/sistema" },
      ],
    },
    {
      title: "Suporte",
      links: [
        { name: "Ajuda", href: "/ajuda" },
        { name: "Contato", href: "/#contact" },
        { name: "Privacidade", href: "/privacidade" },
        { name: "Termos", href: "/termos" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/Sinout-org", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/sinout/", label: "LinkedIn" },
  ];

  return (
    <footer className={`relative overflow-hidden bg-background ${className}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">Sinout</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Quando o rosto fala, o mundo entende!
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span>suportesinout@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>(11) 96478-3902</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>São Paulo, Brasil</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-lg bg-muted/50 border border-border hover:border-purple-500/30 hover:bg-muted transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links Sections */}
            {footerSections.map((section, sectionIdx) => (
              <motion.div
                key={sectionIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: sectionIdx * 0.1 }}
              >
                <h4 className="text-lg font-semibold text-foreground mb-6">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-8 border-t border-border"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>© {currentYear} Sinout.</span>
              </div>

              <div className="flex gap-6 text-sm">
                <Link href="/privacidade" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacidade
                </Link>
                <Link href="/termos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Termos
                </Link>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
