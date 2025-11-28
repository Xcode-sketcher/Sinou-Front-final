"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { User, CreditCard, LogOut, Save, Edit2, Camera, Sun, Moon, Globe, Shield, Lock, Mail, FileText } from 'lucide-react';

// Interface define os tipos de dados do perfil
interface Perfil {
  nomePaciente: string;
  nomeCuidador: string;
  assinatura: string;
  plano: string;
  fotoPerfil: string;
}

const GerenciarPerfil: React.FC = () => {
  // Estado para tema (claro/escuro)
  const [temaEscuro, setTemaEscuro] = useState(false);

  // Estado para idioma
  const [idioma, setIdioma] = useState<'pt' | 'en'>('pt');

  // Estado inicial do perfil
  const [perfil, setPerfil] = useState<Perfil>({
    nomePaciente: 'João Silva',
    nomeCuidador: 'Maria Silva',
    assinatura: 'Premium',
    plano: 'Mensal',
    fotoPerfil: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao'
  });

  // Estados para controlar edição
  const [editandoPaciente, setEditandoPaciente] = useState(false);
  const [editandoCuidador, setEditandoCuidador] = useState(false);
  const [mostrarPlanos, setMostrarPlanos] = useState(false);

  // Estados para segurança
  const [editandoSenha, setEditandoSenha] = useState(false);
  const [editandoEmail, setEditandoEmail] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [email, setEmail] = useState('joao.silva@email.com');
  const [novoEmail, setNovoEmail] = useState(email);

  // Estados temporários para os inputs
  const [tempNomePaciente, setTempNomePaciente] = useState(perfil.nomePaciente);
  const [tempNomeCuidador, setTempNomeCuidador] = useState(perfil.nomeCuidador);

  // Função para salvar nome do paciente
  const salvarNomePaciente = () => {
    setPerfil({ ...perfil, nomePaciente: tempNomePaciente });
    setEditandoPaciente(false);
  };

  // Função para salvar nome do cuidador
  const salvarNomeCuidador = () => {
    setPerfil({ ...perfil, nomeCuidador: tempNomeCuidador });
    setEditandoCuidador(false);
  };

  // Função para sair da conta
  const sairDaConta = () => {
    if (window.confirm('Tem certeza que deseja sair da conta?')) {
      alert('Saindo da conta...');
      // Aqui você implementaria a lógica real de logout
    }
  };

  // Função para trocar foto de perfil
  const trocarFoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = event.target.files?.[0];
    if (arquivo) {
      const leitor = new FileReader();
      leitor.onload = (e) => {
        const resultado = e.target?.result as string;
        setPerfil({ ...perfil, fotoPerfil: resultado });
      };
      leitor.readAsDataURL(arquivo);
    }
  };

  // Função para alternar tema
  const alternarTema = () => {
    setTemaEscuro(!temaEscuro);
  };

  // Função para trocar plano
  const selecionarPlano = (novoPlano: string) => {
    setPerfil({ ...perfil, assinatura: novoPlano });
    setMostrarPlanos(false);
    alert(`Plano alterado para ${novoPlano} com sucesso!`);
  };

  // Função para alterar senha
  const alterarSenha = () => {
    if (novaSenha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    if (novaSenha.length < 6) {
      alert('A senha deve ter no mínimo 6 caracteres!');
      return;
    }
    alert('Senha alterada com sucesso!');
    setEditandoSenha(false);
    setSenhaAtual('');
    setNovaSenha('');
    setConfirmarSenha('');
  };

  // Função para alterar email
  const alterarEmail = () => {
    if (!novoEmail.includes('@')) {
      alert('Digite um e-mail válido!');
      return;
    }
    setEmail(novoEmail);
    setEditandoEmail(false);
    alert('E-mail alterado com sucesso!');
  };

  return (
    <div className={`min-h-screen ${temaEscuro ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} p-6 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho com botão de tema */}
        <div className={`${temaEscuro ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 mb-6 transition-colors duration-300`}>
          <div className="flex justify-between items-start">
            <div>
              <h1 className={`text-3xl font-bold ${temaEscuro ? 'text-white' : 'text-gray-800'} mb-2`}>
                Gerenciar Perfil
              </h1>
              <p className={temaEscuro ? 'text-gray-400' : 'text-gray-600'}>
                Atualize suas informações e gerencie sua conta
              </p>
            </div>
            <button
              onClick={alternarTema}
              className={`${temaEscuro ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white p-3 rounded-lg transition-all duration-300 flex items-center gap-2 hover:scale-110 hover:shadow-lg transform`}
            >
              {temaEscuro ? <Sun size={20} /> : <Moon size={20} />}
              <span className="hidden sm:inline">{temaEscuro ? 'Claro' : 'Escuro'}</span>
            </button>
          </div>
        </div>

        {/* Seção de Idioma */}
        <div className={`${temaEscuro ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 mb-6 transition-colors duration-300`}>
          <div className="flex items-center mb-6">
            <Globe className="text-indigo-600 mr-3" size={28} />
            <h2 className={`text-2xl font-semibold ${temaEscuro ? 'text-white' : 'text-gray-800'}`}>
              Idioma
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setIdioma('pt')}
              className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg transform ${idioma === 'pt'
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900'
                : temaEscuro
                  ? 'border-gray-600 bg-gray-700 hover:border-indigo-400'
                  : 'border-gray-300 hover:border-indigo-400'
                }`}
            >
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl">🇧🇷</span>
                <span className={`font-semibold text-lg ${idioma === 'pt' ? 'text-indigo-600' : temaEscuro ? 'text-gray-300' : 'text-gray-700'}`}>
                  Português
                </span>
              </div>
            </button>

            <button
              onClick={() => setIdioma('en')}
              className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg transform ${idioma === 'en'
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900'
                : temaEscuro
                  ? 'border-gray-600 bg-gray-700 hover:border-indigo-400'
                  : 'border-gray-300 hover:border-indigo-400'
                }`}
            >
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl">🇺🇸</span>
                <span className={`font-semibold text-lg ${idioma === 'en' ? 'text-indigo-600' : temaEscuro ? 'text-gray-300' : 'text-gray-700'}`}>
                  English
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Seção de Foto de Perfil */}
        <div className={`${temaEscuro ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 mb-6 transition-colors duration-300`}>
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <Image
                src={perfil.fotoPerfil}
                alt="Foto de perfil"
                width={128}
                height={128}
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
              />
              <label
                htmlFor="upload-foto"
                className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:scale-125 hover:rotate-12 transform"
              >
                <Camera size={20} />
                <input
                  id="upload-foto"
                  type="file"
                  accept="image/*"
                  onChange={trocarFoto}
                  className="hidden"
                />
              </label>
            </div>
            <p className={`text-sm ${temaEscuro ? 'text-gray-400' : 'text-gray-600'}`}>
              Clique no ícone da câmera para alterar sua foto
            </p>
          </div>
        </div>

        {/* Seção de Informações do Usuário */}
        <div className={`${temaEscuro ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 mb-6 transition-colors duration-300`}>
          <div className="flex items-center mb-6">
            <User className="text-indigo-600 mr-3" size={28} />
            <h2 className={`text-2xl font-semibold ${temaEscuro ? 'text-white' : 'text-gray-800'}`}>
              Informações do Usuário
            </h2>
          </div>

          {/* Nome do Paciente */}
          <div className={`mb-6 pb-6 ${temaEscuro ? 'border-gray-700' : 'border-gray-200'} border-b`}>
            <label className={`block text-sm font-medium ${temaEscuro ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Nome do Paciente
            </label>
            {editandoPaciente ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tempNomePaciente}
                  onChange={(e) => setTempNomePaciente(e.target.value)}
                  className={`flex-1 px-4 py-2 border ${temaEscuro ? 'bg-gray-700 border-gray-600 text-white' : 'border-indigo-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
                  placeholder="Digite o nome do paciente"
                />
                <button
                  onClick={salvarNomePaciente}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-lg transform"
                >
                  <Save size={18} />
                  Salvar
                </button>
                <button
                  onClick={() => {
                    setEditandoPaciente(false);
                    setTempNomePaciente(perfil.nomePaciente);
                  }}
                  className={`${temaEscuro ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'} px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 transform`}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <div className={`flex items-center justify-between ${temaEscuro ? 'bg-gray-700' : 'bg-gray-50'} px-4 py-3 rounded-lg`}>
                <span className={`font-medium ${temaEscuro ? 'text-white' : 'text-gray-800'}`}>
                  {perfil.nomePaciente}
                </span>
                <button
                  onClick={() => setEditandoPaciente(true)}
                  className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2 transition-all duration-300 hover:scale-110 transform hover:gap-3"
                >
                  <Edit2 size={18} />
                  Editar
                </button>
              </div>
            )}
          </div>

          {/* Nome do Cuidador */}
          <div>
            <label className={`block text-sm font-medium ${temaEscuro ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Nome do Cuidador
            </label>
            {editandoCuidador ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tempNomeCuidador}
                  onChange={(e) => setTempNomeCuidador(e.target.value)}
                  className={`flex-1 px-4 py-2 border ${temaEscuro ? 'bg-gray-700 border-gray-600 text-white' : 'border-indigo-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
                  placeholder="Digite o nome do cuidador"
                />
                <button
                  onClick={salvarNomeCuidador}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-lg transform"
                >
                  <Save size={18} />
                  Salvar
                </button>
                <button
                  onClick={() => {
                    setEditandoCuidador(false);
                    setTempNomeCuidador(perfil.nomeCuidador);
                  }}
                  className={`${temaEscuro ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'} px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 transform`}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <div className={`flex items-center justify-between ${temaEscuro ? 'bg-gray-700' : 'bg-gray-50'} px-4 py-3 rounded-lg`}>
                <span className={`font-medium ${temaEscuro ? 'text-white' : 'text-gray-800'}`}>
                  {perfil.nomeCuidador}
                </span>
                <button
                  onClick={() => setEditandoCuidador(true)}
                  className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2 transition-all duration-300 hover:scale-110 transform hover:gap-3"
                >
                  <Edit2 size={18} />
                  Editar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Seção de Assinatura */}
        <div className={`${temaEscuro ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 mb-6 transition-colors duration-300`}>
          <div className="flex items-center mb-6">
            <CreditCard className="text-indigo-600 mr-3" size={28} />
            <h2 className={`text-2xl font-semibold ${temaEscuro ? 'text-white' : 'text-gray-800'}`}>
              Sua Assinatura
            </h2>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white mb-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-indigo-100 text-sm mb-1">Plano Atual</p>
                <h3 className="text-3xl font-bold">{perfil.assinatura}</h3>
              </div>
              <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                {perfil.plano}
              </div>
            </div>
            <div className="border-t border-indigo-400 pt-4">
              <p className="text-indigo-100 text-sm mb-2">Benefícios inclusos:</p>
              <ul className="space-y-1 text-sm">
                <li>✓ Acesso completo à plataforma</li>
                <li>✓ Suporte prioritário 24/7</li>
                <li>✓ Recursos premium desbloqueados</li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => setMostrarPlanos(!mostrarPlanos)}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 font-semibold hover:scale-105 hover:shadow-lg transform"
          >
            {mostrarPlanos ? 'Ocultar Planos' : 'Alterar Plano'}
          </button>

          {mostrarPlanos && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
              {/* Plano Olhar Completo */}
              <div className={`${temaEscuro ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg border-2 border-indigo-600 hover:border-indigo-700 transition-all duration-300 hover:scale-105 transform cursor-pointer`}
                onClick={() => selecionarPlano('Olhar Completo')}>
                <h3 className={`text-xl font-bold mb-2 ${temaEscuro ? 'text-white' : 'text-gray-800'}`}>
                  Olhar Completo
                </h3>
                <p className={`text-3xl font-bold mb-4 ${temaEscuro ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  R$ 49,90<span className="text-sm font-normal">/mês</span>
                </p>
                <ul className={`space-y-2 text-sm ${temaEscuro ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>✓ 1 paciente</li>
                  <li>✓ 2 cuidadores</li>
                  <li>✓ Relatórios básicos</li>
                  <li>✓ Suporte por e-mail</li>
                  <li>✓ Armazenamento 5GB</li>
                </ul>
              </div>

              {/* Plano Olhar Corporativo */}
              <div className={`${temaEscuro ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg border-2 border-purple-600 hover:border-purple-700 transition-all duration-300 hover:scale-105 transform cursor-pointer`}
                onClick={() => selecionarPlano('Olhar Corporativo')}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`text-xl font-bold ${temaEscuro ? 'text-white' : 'text-gray-800'}`}>
                    Olhar Corporativo
                  </h3>
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">Popular</span>
                </div>
                <p className={`text-3xl font-bold mb-4 ${temaEscuro ? 'text-purple-400' : 'text-purple-600'}`}>
                  R$ 149,90<span className="text-sm font-normal">/mês</span>
                </p>
                <ul className={`space-y-2 text-sm ${temaEscuro ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>✓ Pacientes ilimitados</li>
                  <li>✓ Cuidadores ilimitados</li>
                  <li>✓ Relatórios avançados</li>
                  <li>✓ Suporte prioritário 24/7</li>
                  <li>✓ Armazenamento ilimitado</li>
                  <li>✓ Integrações personalizadas</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Seção de Segurança */}
        <div className={`${temaEscuro ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 mb-6 transition-colors duration-300`}>
          <div className="flex items-center mb-6">
            <Shield className="text-indigo-600 mr-3" size={28} />
            <h2 className={`text-2xl font-semibold ${temaEscuro ? 'text-white' : 'text-gray-800'}`}>
              Segurança
            </h2>
          </div>

          {/* Alterar Senha */}
          <div className={`mb-6 pb-6 ${temaEscuro ? 'border-gray-700' : 'border-gray-200'} border-b`}>
            <label className={`block text-sm font-medium ${temaEscuro ? 'text-gray-300' : 'text-gray-700'} mb-2 flex items-center gap-2`}>
              <Lock size={18} />
              Senha
            </label>
            {editandoSenha ? (
              <div className="space-y-3">
                <input
                  type="password"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  placeholder="Senha atual"
                  className={`w-full px-4 py-2 border ${temaEscuro ? 'bg-gray-700 border-gray-600 text-white' : 'border-indigo-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
                />
                <input
                  type="password"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="Nova senha"
                  className={`w-full px-4 py-2 border ${temaEscuro ? 'bg-gray-700 border-gray-600 text-white' : 'border-indigo-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
                />
                <input
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  placeholder="Confirmar nova senha"
                  className={`w-full px-4 py-2 border ${temaEscuro ? 'bg-gray-700 border-gray-600 text-white' : 'border-indigo-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
                />
                <div className="flex gap-2">
                  <button
                    onClick={alterarSenha}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-lg transform"
                  >
                    <Save size={18} />
                    Salvar
                  </button>
                  <button
                    onClick={() => {
                      setEditandoSenha(false);
                      setSenhaAtual('');
                      setNovaSenha('');
                      setConfirmarSenha('');
                    }}
                    className={`${temaEscuro ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'} px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 transform`}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className={`flex items-center justify-between ${temaEscuro ? 'bg-gray-700' : 'bg-gray-50'} px-4 py-3 rounded-lg`}>
                <span className={`font-medium ${temaEscuro ? 'text-white' : 'text-gray-800'}`}>
                  ••••••••
                </span>
                <button
                  onClick={() => setEditandoSenha(true)}
                  className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2 transition-all duration-300 hover:scale-110 transform hover:gap-3"
                >
                  <Edit2 size={18} />
                  Alterar
                </button>
              </div>
            )}
          </div>

          {/* Alterar E-mail */}
          <div className="mb-6">
            <label className={`block text-sm font-medium ${temaEscuro ? 'text-gray-300' : 'text-gray-700'} mb-2 flex items-center gap-2`}>
              <Mail size={18} />
              E-mail
            </label>
            {editandoEmail ? (
              <div className="space-y-3">
                <input
                  type="email"
                  value={novoEmail}
                  onChange={(e) => setNovoEmail(e.target.value)}
                  placeholder="Digite o novo e-mail"
                  className={`w-full px-4 py-2 border ${temaEscuro ? 'bg-gray-700 border-gray-600 text-white' : 'border-indigo-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
                />
                <div className="flex gap-2">
                  <button
                    onClick={alterarEmail}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-lg transform"
                  >
                    <Save size={18} />
                    Salvar
                  </button>
                  <button
                    onClick={() => {
                      setEditandoEmail(false);
                      setNovoEmail(email);
                    }}
                    className={`${temaEscuro ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'} px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 transform`}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className={`flex items-center justify-between ${temaEscuro ? 'bg-gray-700' : 'bg-gray-50'} px-4 py-3 rounded-lg`}>
                <span className={`font-medium ${temaEscuro ? 'text-white' : 'text-gray-800'}`}>
                  {email}
                </span>
                <button
                  onClick={() => setEditandoEmail(true)}
                  className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2 transition-all duration-300 hover:scale-110 transform hover:gap-3"
                >
                  <Edit2 size={18} />
                  Alterar
                </button>
              </div>
            )}
          </div>

          {/* Botão Termos e Privacidade */}
          <button
            onClick={() => alert('Abrindo Termos e Política de Privacidade...')}
            className={`w-full ${temaEscuro ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} py-3 px-4 rounded-lg transition-all duration-300 font-semibold flex items-center justify-center gap-2 hover:scale-105 transform`}
          >
            <FileText size={20} />
            Termos e Privacidade
          </button>
        </div>

        {/* Botão de Sair */}
        <div className={`${temaEscuro ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 transition-colors duration-300`}>
          <button
            onClick={sairDaConta}
            className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-all duration-300 font-semibold flex items-center justify-center gap-2 hover:scale-105 hover:shadow-2xl transform hover:gap-3"
          >
            <LogOut size={20} />
            Sair da Conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default GerenciarPerfil;