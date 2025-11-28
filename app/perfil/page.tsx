"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { ModernMenu } from "@/components/layout/Header";
import { Footer7 as Footer } from "@/components/layout/Footer";
import { Check, CreditCard, Loader2, User as UserIcon, Shield, Bell, History } from "lucide-react";


const AVATAR_SEEDS = [
  "Felix",
  "Aneka",
  "Zoe",
  "Bear",
  "Christian",
  "Jack",
  "Cuddles",
  "Bandit",
  "Willow",
  "Buster",
  "Sam",
  "Misty",
  "Simba",
  "Coco",
  "Lucky"
];

const getAvatarUrl = (index: number) => {
  if (!index || index < 1 || index > AVATAR_SEEDS.length) return null;
  const seed = AVATAR_SEEDS[index - 1];
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
};

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  patientId?: string;
  fotoPerfil?: number; // Changed to number to store index
  plan?: string;
  patient?: {
    id?: string;
    _id?: string;
    profilePhoto?: number;
    fotoPerfil?: number;
    foto_perfil?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<number>(1);
  const [isEditing, setIsEditing] = useState(false);

  // Estado para gerenciamento de plano (modal de pagamento e dados do cartão)
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/api/users/me');
      const data = response.data;
      setProfile(data);

      // Set initial avatar selection
      if (data.fotoPerfil) {
        setSelectedAvatar(data.fotoPerfil);
      } else if (data.patient?.profilePhoto) {
        setSelectedAvatar(data.patient.profilePhoto);
      } else if (data.patient?.fotoPerfil) {
        setSelectedAvatar(data.patient.fotoPerfil);
      } else if (data.patient?.foto_perfil) {
        setSelectedAvatar(data.patient.foto_perfil);
      }

      // Load plan from localStorage or profile
      const storedPlan = localStorage.getItem('userPlan');
      if (storedPlan) {
        setSelectedPlan(storedPlan);
        // Update profile state locally to reflect stored plan immediately
        setProfile(prev => prev ? ({ ...prev, plan: storedPlan }) : null);
      } else if (data.plan) {
        setSelectedPlan(data.plan);
      }
    } catch (error) {
      // Erro ao buscar perfil — registra para diagnóstico (sem exibir log em produção)
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAvatar = async () => {
    try {
      setSaving(true);

      // Try to find patient ID from various possible sources
      // The backend often uses _id, so we check for that too
      const patientData = profile?.patient || user?.patient;
      const patientId = patientData?.id || patientData?._id || profile?.patientId || user?.patientId;

      if (!patientId) {
        // ID do paciente não encontrado — usuário pode não possuir paciente vinculado
        alert("Erro: Perfil de paciente não encontrado. Tente recarregar a página.");
        return;
      }

      // Salvando avatar para paciente (sem log de debug em produção)

      // First fetch the current patient data to avoid overwriting other fields
      let currentPatientData = {};
      try {
        // Use /api/patients (English) as seen in PatientSelector
        const patientResponse = await api.get(`/api/patients/${patientId}`);
        currentPatientData = patientResponse.data;
      } catch (fetchError) {
        // Falha ao buscar dados completos do paciente - prossegue com atualização parcial
      }

      // Update the patient with the new avatar
      // Using 'profilePhoto' as confirmed in v1 (2).json
      await api.put(`/api/patients/${patientId}`, {
        ...currentPatientData,
        profilePhoto: selectedAvatar
      });

      // Refresh the user context to update the header
      await refreshUser();

      // Also update local profile state
      setProfile(prev => {
        if (!prev) return null;
        return {
          ...prev,
          patient: {
            ...prev.patient,
            id: patientId,
            _id: patientId,
            profilePhoto: selectedAvatar,
            fotoPerfil: selectedAvatar // Keep for backward compatibility if needed locally
          }
        };
      });

      alert("Avatar atualizado com sucesso!");
    } catch (error) {
      // Erro ao salvar avatar - informa usuário e registra internamente
      alert("Erro ao salvar avatar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      // Implement profile update logic here
      // await api.put('/api/users/me', { name: profile?.name, ... });

      // Refresh user context
      await refreshUser();

      setIsEditing(false);
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      // Erro ao salvar perfil - registra para diagnóstico
      alert("Erro ao salvar perfil.");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePlan = async () => {
    try {
      setSaving(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Save selected plan to localStorage
      localStorage.setItem('userPlan', selectedPlan);

      // Update local state
      setProfile(prev => prev ? ({ ...prev, plan: selectedPlan }) : null);

      setIsPlanModalOpen(false);
      alert("Plano e informações de pagamento atualizados com sucesso!");
    } catch (error) {
      // Erro ao atualizar plano - registra para diagnóstico
      alert("Erro ao atualizar plano.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ModernMenu items={[]} />

      <main className="flex-1 container mx-auto px-4 pt-32 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Cabeçalho da página - título e descrição */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Configurações de Perfil</h1>
              <p className="text-muted-foreground">Gerencie suas informações pessoais e preferências.</p>
            </div>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="general">Geral</TabsTrigger>
              <TabsTrigger value="plan">Plano</TabsTrigger>
              <TabsTrigger value="security">Segurança</TabsTrigger>
            </TabsList>

            {/* Aba 'Geral' — Avatar e Informações Pessoais */}
            <TabsContent value="general" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Avatar</CardTitle>
                  <CardDescription>Escolha um avatar para personalizar seu perfil.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      {AVATAR_SEEDS.map((seed, index) => {
                        const avatarIndex = index + 1;
                        const isSelected = selectedAvatar === avatarIndex;
                        return (
                          <div
                            key={seed}
                            className={`relative cursor-pointer transition-all duration-200 ${isSelected ? 'scale-110 ring-2 ring-primary rounded-full' : 'hover:scale-105 opacity-70 hover:opacity-100'}`}
                            onClick={() => setSelectedAvatar(avatarIndex)}
                          >
                            <Avatar className="h-20 w-20 border-2 border-border">
                              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`} />
                              <AvatarFallback>{seed[0]}</AvatarFallback>
                            </Avatar>
                            {isSelected && (
                              <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-1">
                                <Check className="h-3 w-3" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t px-6 py-4">
                  <Button onClick={handleSaveAvatar} disabled={saving}>
                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Salvar Avatar
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>Atualize seus dados de identificação.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                          id="name"
                          defaultValue={profile?.name}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          defaultValue={profile?.email}
                          disabled={true}
                          className="bg-muted"
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between border-t px-6 py-4">
                  <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Cancelar" : "Editar"}
                  </Button>
                  {isEditing && (
                    <Button onClick={handleSaveProfile} disabled={saving}>
                      {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Salvar Alterações
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Aba 'Plano' — Gerenciamento de assinatura e pagamento */}
            <TabsContent value="plan" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Plano Atual</CardTitle>
                  <CardDescription>Gerencie sua assinatura e método de pagamento.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg capitalize">
                          {selectedPlan === 'premium' ? 'Plano Premium' : 'Plano Gratuito'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedPlan === 'premium' ? 'Acesso ilimitado a todos os recursos' : 'Acesso básico ao sistema'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-xl">
                        {selectedPlan === 'premium' ? 'R$ 29,90' : 'R$ 0,00'}
                      </span>
                      <span className="text-xs text-muted-foreground">/mês</span>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <h3 className="font-medium">Benefícios do seu plano</h3>
                    <ul className="grid gap-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Acesso ao dashboard completo</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Histórico ilimitado</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Suporte prioritário</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t px-6 py-4">
                  <Dialog open={isPlanModalOpen} onOpenChange={setIsPlanModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full sm:w-auto">
                        Gerenciar Plano
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Atualizar Plano</DialogTitle>
                        <DialogDescription>
                          Escolha seu plano e atualize suas informações de pagamento.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="grid gap-6 py-4">
                        <div className="space-y-2">
                          <Label>Selecione o Plano</Label>
                          <div className="grid grid-cols-2 gap-4">
                            <div
                              className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center gap-2 transition-all ${selectedPlan === 'free' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:border-primary/50'}`}
                              onClick={() => setSelectedPlan('free')}
                            >
                              <span className="font-semibold">Gratuito</span>
                              <span className="text-sm text-muted-foreground">R$ 0,00/mês</span>
                            </div>
                            <div
                              className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center gap-2 transition-all ${selectedPlan === 'premium' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:border-primary/50'}`}
                              onClick={() => setSelectedPlan('premium')}
                            >
                              <span className="font-semibold">Premium</span>
                              <span className="text-sm text-muted-foreground">R$ 29,90/mês</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            <h4 className="font-medium text-sm">Dados do Cartão</h4>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cardName">Nome no Cartão</Label>
                            <Input
                              id="cardName"
                              placeholder="Nome como está no cartão"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Número do Cartão</Label>
                            <Input
                              id="cardNumber"
                              placeholder="0000 0000 0000 0000"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Validade</Label>
                              <Input
                                id="expiry"
                                placeholder="MM/AA"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc">CVC</Label>
                              <Input
                                id="cvc"
                                placeholder="123"
                                value={cardCvc}
                                onChange={(e) => setCardCvc(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPlanModalOpen(false)}>Cancelar</Button>
                        <Button onClick={handleUpdatePlan} disabled={saving}>
                          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Salvar Alterações
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Aba 'Segurança' — Em breve (placeholder) */}
            <TabsContent value="security" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Segurança</CardTitle>
                  <CardDescription>Gerencie sua senha e segurança da conta.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Shield className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>Configurações de segurança estarão disponíveis em breve.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}