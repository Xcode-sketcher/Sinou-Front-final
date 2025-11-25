import dynamic from 'next/dynamic';
import { ModernMenu } from "@/components/layout/Header";
import CustomCursor from '@/components/ui/pointer';

const Footer7 = dynamic(() => import("@/components/layout/Footer").then(mod => mod.Footer7));

export default function Termos() {
    const socialItems = [
        { label: "", href: "#" },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <header>
                <title>Sinout - Termos</title>
            </header>
            <ModernMenu items={[]} socialItems={socialItems} />

            <main className="flex-grow pt-36 pb-16">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2 text-foreground">Termos de Uso - Sinout</h1>
                        <p className="text-muted-foreground"><strong>Última atualização:</strong> 23 de novembro de 2025</p>
                    </div>

                    <div className="space-y-6">
                        <section>
                            <h2 className="text-2xl font-semibold text-foreground border-b-2 border-primary pb-1 mb-4">1. Aceitação dos Termos</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Ao acessar e utilizar o Sinout, você concorda em cumprir estes Termos de Uso. Se você não concordar com estes termos, não utilize nossa plataforma.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground border-b-2 border-primary pb-1 mb-4">2. Descrição do Serviço</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                O Sinout é uma plataforma de cuidados assistidos que utiliza inteligência artificial para análise emocional através de reconhecimento facial. Nosso objetivo é auxiliar cuidadores e profissionais de saúde na comunicação com os pacientes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground border-b-2 border-primary pb-1 mb-4">3. Elegibilidade</h2>

                            <h3 className="text-xl font-medium text-foreground mt-4">3.1 Requisitos para Uso</h3>
                            <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li>Ser maior de 18 anos</li>
                                <li>Ter formação adequada para cuidados de saúde (no caso de profissionais)</li>
                                <li>Possuir dispositivo compatível com câmera</li>
                                <li>Concordar com nossa Política de Privacidade</li>
                            </ul>

                            <h3 className="text-xl font-medium text-foreground mt-4">3.2 Responsabilidades do Usuário</h3>
                            <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li>Fornecer informações verdadeiras e atualizadas</li>
                                <li>Manter a confidencialidade de suas credenciais de acesso</li>
                                <li>Utilizar a plataforma apenas para fins legítimos</li>
                                <li>Respeitar a privacidade e dignidade dos pacientes</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground border-b-2 border-primary pb-1 mb-4">4. Uso Aceitável</h2>

                            <h3 className="text-xl font-medium text-foreground mt-4">4.1 Atividades Permitidas</h3>
                            <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li>Monitoramento emocional assistido de pacientes</li>
                                <li>Análise de dados para fins de cuidado médico</li>
                                <li>Registro de histórico emocional para acompanhamento</li>
                                <li>Uso educacional e de pesquisa (com autorização)</li>
                            </ul>

                            <h3 className="text-xl font-medium text-foreground mt-4">4.2 Atividades Proibidas</h3>
                            <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li>Uso para fins discriminatórios ou prejudiciais</li>
                                <li>Compartilhamento não autorizado de dados de pacientes</li>
                                <li>Manipulação ou falsificação de dados</li>
                                <li>Uso comercial sem autorização</li>
                                <li>Violação de leis de privacidade de dados</li>
                                <li>Tentativas de hacking ou acesso não autorizado</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground border-b-2 border-primary pb-1 mb-4">5. Propriedade Intelectual</h2>
                            <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li>O Sinout e seu conteúdo são protegidos por leis de direitos autorais</li>
                                <li>A implementação e integração dos algoritmos de IA (incluindo o uso de bibliotecas open-source como DeepFace e OpenCV) são propriedade exclusiva da Sinout</li>
                                <li>Os algoritmos base utilizados são de código aberto e licenciados sob termos de suas respectivas comunidades</li>
                                <li>Você não pode copiar, modificar ou distribuir nossa implementação personalizada</li>
                                <li>Dados dos usuários permanecem propriedade dos respectivos usuários</li>
                            </ul>
                        </section>                        <section>
                            <h2 className="text-2xl font-semibold text-foreground border-b-2 border-primary pb-1 mb-4">6. Limitações de Responsabilidade</h2>

                            <h3 className="text-xl font-medium text-foreground mt-4">6.1 Isenção de Garantias</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                O Sinout é fornecido "como está", sem garantias de qualquer tipo. Não garantimos que o serviço será ininterrupto, livre de erros, ou adequado para seus propósitos específicos.
                            </p>

                            <h3 className="text-xl font-medium text-foreground mt-4">6.2 Limitação de Danos</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Em nenhum caso seremos responsáveis por danos diretos, indiretos, incidentais, especiais ou consequenciais decorrentes do uso ou incapacidade de usar nossa plataforma.
                            </p>

                            <h3 className="text-xl font-medium text-foreground mt-4">6.3 Uso Médico</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                O Sinout é uma ferramenta auxiliar e não substitui o julgamento clínico profissional. As decisões médicas devem ser tomadas por profissionais qualificados.
                            </p>

                            <h3 className="text-xl font-medium text-foreground mt-4">6.4 Precisão da IA</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                A análise emocional é baseada em algoritmos de aprendizado de máquina que podem apresentar limitações em condições adversas (baixa iluminação, ângulos extremos, diversidade populacional). Os resultados devem ser interpretados com cautela e sempre corroborados por avaliação profissional.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground border-b-2 border-primary pb-1 mb-4">7. Privacidade e Dados</h2>
                            <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li>Sua privacidade é protegida conforme nossa Política de Privacidade</li>
                                <li>Dados biométricos são processados com máxima segurança</li>
                                <li>Você tem controle sobre seus dados pessoais</li>
                                <li>Cumprimos todas as leis de proteção de dados aplicáveis</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground border-b-2 border-primary pb-1 mb-4">8. Suspensão e Encerramento</h2>
                            <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li>Podemos suspender ou encerrar sua conta por violação destes termos</li>
                                <li>Você pode encerrar sua conta a qualquer momento</li>
                                <li>Dados serão retidos conforme nossa política de privacidade</li>
                                <li>Encerramento não isenta responsabilidades por violações anteriores</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground border-b-2 border-primary pb-1 mb-4">9. Modificações dos Termos</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Podemos atualizar estes termos periodicamente. Alterações significativas serão notificadas por email ou através da plataforma. O uso continuado constitui aceitação dos novos termos.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground border-b-2 border-primary pb-1 mb-4">10. Lei Aplicável e Jurisdição</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida nos tribunais competentes do Brasil.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground border-b-2 border-primary pb-1 mb-4">11. Contato</h2>
                            <p className="text-muted-foreground leading-relaxed">Para dúvidas sobre estes termos:</p>
                            <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li>Email: legal@sinout.com</li>
                                <li>Telefone: (11) 9999-9999</li>
                                <li>Endereço: São Paulo, SP</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground border-b-2 border-primary pb-1 mb-4">12. Disposições Gerais</h2>
                            <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li>Estes termos constituem o acordo completo entre as partes</li>
                                <li>Se qualquer disposição for considerada inválida, as demais permanecem em vigor</li>
                                <li>Não há terceiros beneficiários destes termos</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground border-b-2 border-primary pb-1 mb-4">13. Tecnologias Utilizadas</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Para garantir transparência, informamos que o Sinout utiliza as seguintes tecnologias open-source para o reconhecimento facial e análise emocional:
                            </p>
                            <ul className="list-disc list-inside text-muted-foreground ml-4">
                                <li><strong>OpenCV:</strong> Biblioteca de visão computacional para processamento de imagens (licença BSD/Apache)</li>
                                <li><strong>DeepFace:</strong> Framework de reconhecimento facial e análise de emoções (licença MIT)</li>
                                <li>Estes componentes são integrados em nossa arquitetura proprietária, mantendo a conformidade com suas respectivas licenças</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </main>

            <Footer7 className="mt-auto border-t border-border bg-muted/30" />
            <CustomCursor />
        </div>
    );
}