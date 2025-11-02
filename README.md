# 💜 Cuidar de Quem Cuida

> **Dicas de Prevenção de Sobrecarga Emocional e Burnout Parental**

Uma aplicação web interativa desenvolvida para apoiar pais e cuidadores na prevenção da sobrecarga emocional e burnout parental, oferecendo ferramentas práticas de autocuidado e reflexão.

**Desenvolvido pelas alunas:**
- Vitória Manuelly Alves Ribeiro - Tecnologia em Radiologia
- Daniely Evellin da Silva Vasconcelos - Sistemas para Internet

## 🌸 Sobre o Projeto

Este projeto foi desenvolvido como parte do **Programa de Educação pelo Trabalho para a Saúde (PET-Saúde)** focado em **Saúde Digital**, implementado pela **Universidade do Estado de Alagoas (UNCISAL)** em parceria com o **Sistema Único de Saúde (SUS)**. 

O programa visa integrar ensino, serviços de saúde e comunidade, aprimorando a formação de estudantes e profissionais de saúde com ênfase nas tecnologias de informação e comunicação para fortalecer o SUS.

### 🎯 Objetivo

Fornecer uma ferramenta digital acessível que auxilie pais e cuidadores a:
- Identificar sinais de sobrecarga emocional
- Implementar práticas de autocuidado no dia a dia
- Refletir sobre seu bem-estar emocional
- Prevenir o burnout parental

## ✨ Funcionalidades

### 📋 Checklist Interativo
- **Cuidado Pessoal**: Itens relacionados ao autocuidado básico (sono, alimentação, hidratação)
- **Rotina com Leveza**: Estratégias para organizar o dia sem sobrecarga
- **Relações e Apoio**: Foco no suporte social e conexões afetivas

### 🚨 Sinais de Alerta
- Sistema de identificação de sintomas de burnout parental
- Alertas visuais para sinais que requerem atenção

### 🌺 Flor do Progresso
- Visualização gamificada do progresso diário
- Feedback visual motivacional

### 📝 Espaço de Reflexão
- Área para anotações pessoais e reflexões
- Persistência local dos dados

### 💾 Persistência de Dados
- Salvamento automático no localStorage
- Continuidade da experiência entre sessões

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e servidor de desenvolvimento
- **Tailwind CSS** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones
- **React Hook Form** - Gerenciamento de formulários
- **React Router DOM** - Roteamento
- **Sonner** - Notificações toast

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/NOME_DA_ORGANIZACAO/cuidar-de-quem-cuida.git
cd cuidar-de-quem-cuida
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:5173
```

### Scripts Disponíveis

- `npm run dev` - Executa em modo de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run build:dev` - Gera build de desenvolvimento
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter

### 🌐 Acesso Online

O projeto está disponível online no GitHub Pages:
```
https://NOME_DA_ORGANIZACAO.github.io/cuidar-de-quem-cuida/
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base do design system
│   ├── AlertSection.tsx
│   ├── ChecklistItem.tsx
│   ├── ChecklistSection.tsx
│   ├── ProgressFlower.tsx
│   └── ReflectionBox.tsx
├── hooks/              # Hooks customizados
├── lib/                # Utilitários e configurações
├── pages/              # Páginas da aplicação
│   ├── Index.tsx
│   └── NotFound.tsx
└── main.tsx           # Ponto de entrada da aplicação
```

## 🎨 Design e UX

O projeto utiliza uma abordagem de design centrada no usuário, com:
- **Cores suaves** que transmitem calma e acolhimento
- **Tipografia legível** e acessível
- **Animações sutis** que não sobrecarregam
- **Layout responsivo** para diferentes dispositivos
- **Feedback visual** para interações do usuário

## 🧠 Fundamentação Teórica

A aplicação incorpora conceitos de:
- **Programação Neurolinguística (PNL)** - Lembretes e afirmações positivas
- **Análise Transacional (AT)** - Equilíbrio entre estados do ego
- **Psicologia Positiva** - Foco em gratidão e celebração de conquistas

## 👥 Equipe de Desenvolvimento

**Desenvolvido pelas alunas:**

- **Vitória Manuelly Alves Ribeiro**  
  Curso: Tecnologia em Radiologia - UNCISAL

- **Daniely Evellin da Silva Vasconcelos**  
  Curso: Sistemas para Internet - UNCISAL

## 🏥 Programa PET-Saúde UNCISAL

Este projeto é resultado do **Programa de Educação pelo Trabalho para a Saúde (PET-Saúde)** da UNCISAL, que promove:

- Integração entre ensino, serviço e comunidade
- Formação interprofissional em saúde
- Uso de tecnologias digitais no cuidado em saúde
- Fortalecimento do Sistema Único de Saúde (SUS)
- Desenvolvimento de competências em saúde digital

## 🤝 Contribuições

Este projeto foi desenvolvido com fins educacionais e de saúde pública. Sugestões e melhorias são bem-vindas através de issues e pull requests.

---

<div align="center">

**Feito com 💜 para quem cuida**

*Universidade do Estado de Alagoas (UNCISAL)*  
*PET-Saúde - Saúde Digital*

</div>