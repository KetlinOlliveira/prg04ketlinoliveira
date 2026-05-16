# 🐕 FindPet | Sistema de Adoção Responsável de Pets

Plataforma interativa para adoção consciente e responsável de animais de estimação.

O **FindPet** é um sistema web voltado para a adoção responsável de pets. O projeto busca conectar pessoas a animais que precisam de um lar, oferecendo uma experiência visual acolhedora, informativa e acessível.

Este projeto começou como uma aplicação desenvolvida com **HTML, CSS e JavaScript puro** durante as atividades da disciplina de Desenvolvimento Web. Posteriormente, foi refatorado para **React**, com foco em componentização, reutilização de código, organização de pastas e navegação entre páginas utilizando React Router DOM.

> ⚠️ A venda de animais é ilegal. O FindPet existe para facilitar adoções, nunca comercializações.

---

## 📌 Objetivo do Projeto

Refatorar uma aplicação web legada para React, transformando páginas HTML em componentes reutilizáveis e organizando a estrutura do projeto de forma mais escalável.

O projeto também tem como objetivo apresentar uma proposta de sistema para adoção responsável de pets, com funcionalidades planejadas para tornar o processo de adoção mais seguro, consciente e informativo.

---

## 🚀 Tecnologias Utilizadas

- React
- Vite
- JavaScript
- React Router DOM
- HTML5
- CSS3
- Bootstrap
- LocalStorage
- Git e GitHub

---

## ✅ Funcionalidades Implementadas

- Página inicial com apresentação visual do projeto
- Tela de login fictício
- Cadastro de usuários no LocalStorage
- Painel administrativo com listagem de usuários
- Edição de nome de usuário
- Exclusão de usuários
- Página de palheta de cores
- Página de contato
- Navegação entre páginas com React Router DOM
- Componentização da interface

---

## 🕰️ Funcionalidades Planejadas

- **Feed de Adoção**  
  Listagem de animais disponíveis com ficha completa, incluindo espécie, idade, temperamento, localização e outras informações importantes.

- **Quiz de Compatibilidade**  
  Recurso para ajudar o usuário a descobrir qual pet combina melhor com seu estilo de vida, considerando ambiente familiar, condição financeira, rotina e local de moradia.

- **Chatbot de Dúvidas**  
  Assistente para responder perguntas sobre adoção, legalização, cuidados e responsabilidades do tutor.

- **Guia de Cuidados Especializados**  
  Informações detalhadas por espécie, como habitat ideal, alimentação, higiene, saúde e adaptação ao novo lar.

---

## 🎨 Identidade Visual

A identidade visual do FindPet utiliza uma palheta baseada em tons terrosos e afetivos, transmitindo acolhimento, segurança e responsabilidade.

Principais cores utilizadas:

- Café Profundo: `#3B1F10`
- Mogno: `#6B3520`
- Cobre: `#A05535`
- Caramelo: `#D4956A`
- Pêssego: `#F0DBC8`
- Rosa Afeto: `#C94C5E`
- Âmbar: `#F5C84A`
- Creme Fundo: `#FAF5EE`

---

## 🗂️ Estrutura do Projeto

O projeto foi organizado de forma modular, separando páginas, componentes, dados, serviços e estilos globais.

```txt
findpet-react/
├── public/
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   │   └── patinha.ico
│   │   └── images/
│   │       ├── hero-animais.png
│   │       ├── login-hero.png
│   │       └── pets-contato.jpg
│   │
│   ├── components/
│   │   ├── ColorSwatches/
│   │   │   ├── ColorSwatches.jsx
│   │   │   └── ColorSwatches.css
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   ├── Hero/
│   │   │   ├── Hero.jsx
│   │   │   └── Hero.css
│   │   ├── LoginForm/
│   │   │   ├── LoginForm.jsx
│   │   │   └── LoginForm.css
│   │   └── UserTable/
│   │       ├── UserTable.jsx
│   │       └── UserTable.css
│   │
│   ├── data/
│   │   ├── colorPalette.js
│   │   └── initialUsers.js
│   │
│   ├── pages/
│   │   ├── AdminDashboard/
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── AdminDashboard.css
│   │   ├── Contact/
│   │   │   ├── Contact.jsx
│   │   │   └── Contact.css
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.css
│   │   ├── Login/
│   │   │   ├── Login.jsx
│   │   │   └── Login.css
│   │   └── Palette/
│   │       ├── Palette.jsx
│   │       └── Palette.css
│   │
│   ├── services/
│   │   └── userService.js
│   │
│   ├── styles/
│   │   ├── global.css
│   │   └── variables.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md