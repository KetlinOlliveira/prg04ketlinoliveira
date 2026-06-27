import type { QuizQuestion } from "../types/quiz";

/*
  =========================================================
  PERGUNTAS DO QUIZ — EDITE AQUI
  =========================================================
  Estas perguntas são apenas um exemplo da estrutura.
  Substitua pelos seus próprios textos, alternativas e emojis.

  Regras simples:
  - Cada pergunta precisa de um "id" único.
  - Cada alternativa precisa de um "id" único dentro da pergunta.
  - "emoji" e "description" são opcionais (pode deixar "" ou remover).
  - Pode adicionar quantas perguntas quiser; a barra de progresso
    se ajusta automaticamente.
*/
export const quizQuestions: QuizQuestion[] = [
  {
    id: "rotina",
    question: "Quanto tempo livre você tem no dia a dia?",
    options: [
      {
        id: "pouco",
        emoji: "🕒",
        title: "Pouco tempo",
        description: "Minha rotina é bem corrida.",
      },
      {
        id: "medio",
        emoji: "🌤️",
        title: "Um tempo razoável",
        description: "Consigo me organizar bem.",
      },
      {
        id: "muito",
        emoji: "🛋️",
        title: "Bastante tempo",
        description: "Tenho o dia bem flexível.",
      },
    ],
  },
  {
    id: "espaco",
    question: "Como é o espaço onde você mora?",
    options: [
      {
        id: "pequeno",
        emoji: "🏢",
        title: "Apartamento compacto",
        description: "Espaço pequeno e aconchegante.",
      },
      {
        id: "medio",
        emoji: "🏠",
        title: "Casa com quintal",
        description: "Tenho uma área externa.",
      },
      {
        id: "grande",
        emoji: "🌳",
        title: "Bastante espaço",
        description: "Lugar amplo para correr.",
      },
    ],
  },
  {
    id: "experiencia",
    question: "Qual sua experiência com animais?",
    options: [
      {
        id: "iniciante",
        emoji: "🌱",
        title: "Iniciante",
        description: "Será meu primeiro pet.",
      },
      {
        id: "intermediario",
        emoji: "🐾",
        title: "Já tive antes",
        description: "Conheço o básico dos cuidados.",
      },
      {
        id: "experiente",
        emoji: "⭐",
        title: "Experiente",
        description: "Cuido de animais há anos.",
      },
    ],
  },
];
