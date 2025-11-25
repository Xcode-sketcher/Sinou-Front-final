import dynamic from 'next/dynamic';
import { ModernMenu } from "@/components/layout/Header";
import CustomCursor  from "@/components/ui/pointer";

const Footer7 = dynamic(() => import("@/components/layout/Footer").then(mod => mod.Footer7));

export default function Privacidade() {
    const socialItems = [
        { label: "", href: "#" },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <header>
                <title>Sinout - Privacidade</title>
            </header>
            <ModernMenu items={[]} socialItems={socialItems} />

            <main className="flex-grow pt-36 pb-16">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2 text-foreground">Política de Privacidade - Sinout</h1>
                        <p className="text-muted-foreground"><strong>Última atualização:</strong> 23 de novembro de 2025</p>
                    </div>

                    <div className="space-y-6">
                        <section>
                            <h2 className="text-2xl font-semibold text-foreground border-b-2 border-primary pb-1 mb-4">1. Introdução</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                O Sinout é um sistema de cuidados assistidos que utiliza inteligência artificial para análise emocional através de reconhecimento facial. Esta política de privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações pessoais.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground border-b-2 border-primary pb-1 mb-4">2. Informações que Coletamos</h2>

                            <h3 className="text-xl font-medium text-foreground mt-4">2.1 Dados Pessoais</h3>
                            <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li>Nome completo</li>
                                <li>Endereço de e-mail</li>
                                <li>Número de telefone</li>
                                <li>Função/cargo (cuidador ou paciente)</li>
                                <li>Data de cadastro e último acesso</li>
                            </ul>

                            <h3 className="text-xl font-medium text-foreground mt-4">2.2 Dados Biométricos</h3>
                            <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li>Imagens faciais capturadas para análise emocional</li>
                                <li>Dados de análise facial (emoções detectadas, idade estimada, gênero)</li>
                            </ul>

                            <h3 className="text-xl font-medium text-foreground mt-4">2.3 Dados Técnicos</h3>
                            <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li>Endereço IP</li>
                                <li>Tipo de navegador e sistema operacional</li>
                                <li>Datas e horários de acesso</li>
                                <li>Cookies de autenticação</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground border-b-2 border-primary pb-1 mb-4">3. Uso de Cookies</h2>
                            <p className="text-muted-foreground leading-relaxed">Utilizamos cookies para garantir a segurança e funcionalidade da plataforma:</p>

                            <h3 className="text-xl font-medium text-foreground mt-4">3.1 Cookies Essenciais</h3>
                            <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li><strong>Cookies de Autenticação:</strong> Armazenam tokens JWT de forma segura (HttpOnly) para manter sua sessão ativa. Estes cookies são necessários para o funcionamento da plataforma e não podem ser desabilitados.</li>
                                <li><strong>Cookies de Segurança:</strong> Protegem contra ataques CSRF e outras vulnerabilidades.</li>
                            </ul>

                            <h3 className="text-xl font-medium text-foreground mt-4">3.2 Cookies de Preferências</h3>
                            <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li><strong>Aceitação de Cookies:</strong> Registra sua concordância com nossa política de cookies (armazenado localmente no navegador).</li>
                            </ul>

                            <p className="text-muted-foreground leading-relaxed mt-4"><strong>Importante:</strong> Não utilizamos cookies de rastreamento, publicidade ou analytics de terceiros.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground border-b-2 border-primary pb-1 mb-4">4. Como Usamos suas Informações</h2>
                            <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li>Fornecer serviços de análise emocional assistida</li>
                                <li>Manter a segurança da plataforma</li>
                                <li>Personalizar regras de mapeamento emocional</li>
                                <li>Enviar notificações importantes sobre o sistema</li>
                                <li>Gerar relatórios de histórico emocional (apenas para o usuário)</li>
                                <li>Cumprir obrigações legais e regulatórias</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground border-b-2 border-primary pb-1 mb-4">5. Compartilhamento de Dados</h2>
                            <p className="text-muted-foreground leading-relaxed">Seus dados são tratados com o máximo sigilo:</p>
                            <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li><strong>Não vendemos</strong> dados pessoais a terceiros</li>
                                <li><strong>Não compartilhamos</strong> dados biométricos sem consentimento explícito</li>
                                <li>Dados podem ser compartilhados apenas em casos legais obrigatórios</li>
                                <li>Imagens faciais são processadas localmente e não armazenadas permanentemente</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground border-b-2 border-primary pb-1 mb-4">6. Segurança dos Dados</h2>
                            <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li>Todas as comunicações são criptografadas (HTTPS)</li>
                                <li>Dados pessoais são armazenados em bancos de dados seguros</li>
                                <li>Cookies de autenticação são HttpOnly e SameSite</li>
                                <li>Acesso aos dados é restrito por função (cuidador/paciente)</li>
                                <li>Logs de acesso são mantidos para auditoria</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground border-b-2 border-primary pb-1 mb-4">7. Seus Direitos</h2>
                            <p className="text-muted-foreground leading-relaxed">De acordo com a LGPD, você tem direito a:</p>
                            <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li>Acessar seus dados pessoais</li>
                                <li>Corrigir dados incompletos ou incorretos</li>
                                <li>Solicitar exclusão de dados (exceto quando legalmente obrigatórios)</li>
                                <li>Portabilidade dos dados</li>
                                <li>Revogar consentimento para processamento não essencial</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground border-b-2 border-primary pb-1 mb-4">8. Retenção de Dados</h2>
                            <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li>Dados pessoais: Mantidos enquanto a conta estiver ativa</li>
                                <li>Histórico emocional: Retido por 2 anos para acompanhamento médico</li>
                                <li>Logs de segurança: Retidos por 1 ano</li>
                                <li>Dados são anonimizados ou excluídos após período de retenção</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground border-b-2 border-primary pb-1 mb-4">9. Contato</h2>
                            <p className="text-muted-foreground leading-relaxed">Para questões sobre privacidade ou exercer seus direitos:</p>
                            <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li>Email: privacidade@sinout.com</li>
                                <li>Telefone: (11) 9999-9999</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground border-b-2 border-primary pb-1 mb-4">10. Alterações nesta Política</h2>
                            <p className="text-muted-foreground leading-relaxed">Esta política pode ser atualizada periodicamente. Alterações significativas serão comunicadas por email ou notificação no sistema.</p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer7 className="mt-auto border-t border-border bg-muted/30" />
            <CustomCursor />
        </div>
    );
}