#  Sinout 

<div align="center">


[![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-purple?style=flat-square&logo=framer)](https://www.framer.com/motion/)

**Transformando expressões faciais em comunicação acessível e natural**

[📖 Documentação](#-documentação) •  [📦 Instalação](#-instalação)

</div>

---


### Tecnologias Core

| Componente | Tecnologia | Versão | Propósito |
|------------|------------|--------|-----------|
| **Framework** | Next.js | 16.0.3 | SSR/SSG, App Router |
| **Linguagem** | TypeScript | 5.0+ | Type Safety |
| **Estilização** | Tailwind CSS | 4.0 | Utility-First CSS |
| **Animações** | Framer Motion | 12.0+ | Interações Fluidas |
| **3D/Partículas** | Three.js + OGL | Latest | Efeitos Visuais |
| **UI Components** | Radix UI | Latest | Acessibilidade |
| **Ícones** | Lucide React | Latest | Interface Consistente |

### Estrutura de Diretórios

```
sinout-HOME-edu/
├── 📁 app/                    # Páginas Next.js (App Router)
│   ├── 📄 layout.tsx         # Layout raiz da aplicação
│   ├── 📄 page.tsx          # Landing page principal
│   ├── 📁 equipe/           # Página da equipe
│   ├── 📁 estatistica/      # Dashboard protegido
│   ├── 📁 login/            # Autenticação
│   ├── 📁 register/         # Cadastro
│   └── 📁 reset-password/   # Recuperação de senha
├── 📁 components/            # Componentes React reutilizáveis
│   ├── 📁 ui/               # Componentes base (shadcn/ui)
│   ├── 📁 sections/         # Seções da landing page
│   ├── 📁 forms/            # Formulários de autenticação
│   └── 📁 layout/           # Header, Footer, Menu
├── 📁 lib/                   # Utilitários e configurações
│   ├── 📄 utils.ts          # Funções auxiliares
│   └── 📄 api.ts            # Cliente HTTP Axios
├── 📁 context/               # Context API (Auth)
├── 📁 public/                # Assets estáticos
└── 📄 *.config.*             # Configurações (Next, ESLint, etc.)
```

---

## 🚀 Instalação e Execução

### 📋 Pré-requisitos

- **Node.js**: `18.0.0` ou superior
- **npm**: `8.0.0` ou superior (ou yarn/pnpm)
- **Git**: Para controle de versão

### 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/Xcode-sketcher/Sinou-Front-final.git
cd sinout-HOME-edu

# Instale as dependências
npm install
```

### 🏃‍♂️ Execução em Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em: **http://localhost:3000**



### 🧪 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento com hot-reload |
| `npm run build` | Build otimizado para produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | Executa verificação de código (ESLint) |
| `npm run analyze` | Análise de bundle (webpack-bundle-analyzer) |


---


### 📱 Responsividade

O design é **mobile-first** com breakpoints Tailwind:

- `sm`: 640px+
- `md`: 768px+
- `lg`: 1024px+
- `xl`: 1280px+

---


### ⚙️ Configuração de Produção

```javascript
// next.config.ts
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    domains: ['assets.aceternity.com', 'images.unsplash.com'],
  },
};

export default nextConfig;
```

---


### 📏 Padrões de Código

- **ESLint**: Configurado e obrigatório
- **Prettier**: Para formatação consistente
- **TypeScript**: Tipagem estrita


---

## 👨‍💻 Equipe de Desenvolvimento

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/FabioRoberto-ppt">
        <img src="https://github.com/FabioRoberto-ppt.png" width="100px;" alt="Fabio Roberto"/>
        <br />
        <sub><b>Fabio Roberto</b></sub>
      </a>
      <br />
      <sub>Scrum Master</sub>
    </td>
    <td align="center">
      <a href="https://github.com/GuilhermefDomingues">
        <img src="https://github.com/GuilhermefDomingues.png" width="100px;" alt="Guilherme França Domingues"/>
        <br />
        <sub><b>Guilherme França</b></sub>
      </a>
      <br />
      <sub>Desenvolvedor</sub>
    </td>
    <td align="center">
      <a href="https://github.com/Xcode-sketcher">
        <img src="https://github.com/Xcode-sketcher.png" width="100px;" alt="Eduardo Barbosa Silva"/>
        <br />
        <sub><b>Eduardo Barbosa</b></sub>
      </a>
      <br />
      <sub>Desenvolvedor</sub>
    </td>
  </tr>
</table>

---

<div align="center">

**Feito com ❤️ pela equipe Sinout**

[![Stars](https://img.shields.io/github/stars/Xcode-sketcher/Sinou-Front-final?style=social)](https://github.com/Xcode-sketcher/Sinou-Front-final)
[![Forks](https://img.shields.io/github/forks/Xcode-sketcher/Sinou-Front-final?style=social)](https://github.com/Xcode-sketcher/Sinou-Front-final)

</div>