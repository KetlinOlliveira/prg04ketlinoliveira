/*
  Perguntas do quiz "Qual é o seu pet ideal?", conforme o roteiro definido
  em roteiro-quiz-findpet.md.

  Cada opção soma pontos para um ou mais animais (cao, gato, roedor, ave).
  A pontuação de todas as respostas é somada em utils/quizScoring.js para
  descobrir o resultado final.
*/

export const perguntas = [
  {
    numero: 1,
    pergunta: "Como é o espaço da sua casa?",
    opcoes: [
      {
        id: "q1-a",
        icone: "🏡",
        titulo: "Casa com quintal ou área externa",
        descricao: "Tenho espaço externo para o pet correr e brincar.",
        pontos: { cao: 2 },
      },
      {
        id: "q1-b",
        icone: "🏢",
        titulo: "Apartamento espaçoso",
        descricao: "Ambiente amplo, mas sem área externa própria.",
        pontos: { gato: 2, cao: 1 },
      },
      {
        id: "q1-c",
        icone: "🏙️",
        titulo: "Apartamento compacto",
        descricao: "Espaço menor, mas confortável para os dois.",
        pontos: { gato: 2, ave: 1 },
      },
      {
        id: "q1-d",
        icone: "🚪",
        titulo: "Espaço bem limitado (kitnet, quarto)",
        descricao: "Pouco espaço livre no dia a dia.",
        pontos: { roedor: 2, ave: 1 },
      },
    ],
  },
  {
    numero: 2,
    pergunta: "Quanto tempo por dia você consegue dedicar ao pet?",
    opcoes: [
      {
        id: "q2-a",
        icone: "⏳",
        titulo: "Mais de 2 horas, com folga",
        descricao: "Tenho tempo de sobra para passeios e brincadeiras.",
        pontos: { cao: 2 },
      },
      {
        id: "q2-b",
        icone: "🕐",
        titulo: "Cerca de 1 hora",
        descricao: "Consigo dar atenção diária, em doses menores.",
        pontos: { gato: 2, ave: 1 },
      },
      {
        id: "q2-c",
        icone: "⏱️",
        titulo: "Uns 30 minutos",
        descricao: "Um tempinho curto, mas o suficiente para cuidar bem.",
        pontos: { ave: 2, roedor: 1 },
      },
      {
        id: "q2-d",
        icone: "🌙",
        titulo: "Bem pouco, minha rotina é corrida",
        descricao: "Quase não sobra tempo livre no meu dia.",
        pontos: { roedor: 2 },
      },
    ],
  },
  {
    numero: 3,
    pergunta: "Quanto tempo você passa fora de casa?",
    opcoes: [
      {
        id: "q3-a",
        icone: "🏠",
        titulo: "Fico em casa a maior parte do dia",
        descricao: "Presença constante para o pet não ficar sozinho.",
        pontos: { cao: 2, ave: 1 },
      },
      {
        id: "q3-b",
        icone: "🌤️",
        titulo: "Saio meio período",
        descricao: "Fico fora parte do dia, mas sempre volto.",
        pontos: { gato: 2, cao: 1 },
      },
      {
        id: "q3-c",
        icone: "🌇",
        titulo: "Fico fora o dia inteiro",
        descricao: "Trabalho ou estudo o dia todo fora de casa.",
        pontos: { gato: 2, roedor: 1 },
      },
      {
        id: "q3-d",
        icone: "✈️",
        titulo: "Fora o dia todo e ainda viajo com frequência",
        descricao: "Rotina corrida e viagens constantes.",
        pontos: { roedor: 2, gato: 1 },
      },
    ],
  },
  {
    numero: 4,
    pergunta: "Que tipo de companhia você procura?",
    opcoes: [
      {
        id: "q4-a",
        icone: "🤗",
        titulo: "Um grude: quero brincar e receber festa o dia todo",
        descricao: "Busco muita interação e afeto físico.",
        pontos: { cao: 2 },
      },
      {
        id: "q4-b",
        icone: "😻",
        titulo: "Carinho sim, mas cada um no seu espaço",
        descricao: "Quero equilíbrio entre afeto e independência.",
        pontos: { gato: 2 },
      },
      {
        id: "q4-c",
        icone: "🎶",
        titulo: "Interações leves: sons, truques, um bichinho no ombro",
        descricao: "Gosto de um vínculo leve e divertido.",
        pontos: { ave: 2 },
      },
      {
        id: "q4-d",
        icone: "🔍",
        titulo: "Gosto mais de observar e cuidar do que de contato físico",
        descricao: "Prefiro observar a interagir fisicamente.",
        pontos: { roedor: 2 },
      },
    ],
  },
  {
    numero: 5,
    pergunta: "Como é o seu nível de atividade?",
    opcoes: [
      {
        id: "q5-a",
        icone: "🏃",
        titulo: "Ativo: adoraria um parceiro de caminhada/corrida",
        descricao: "Quero um companheiro para me acompanhar nas atividades.",
        pontos: { cao: 2 },
      },
      {
        id: "q5-b",
        icone: "🛋️",
        titulo: "Caseiro: prefiro brincadeiras dentro de casa",
        descricao: "Prefiro brincar sem sair de casa.",
        pontos: { gato: 2 },
      },
      {
        id: "q5-c",
        icone: "🎵",
        titulo: "Tranquilo: gosto de um ambiente com vida e sons",
        descricao: "Gosto de um clima animado sem exigir esforço físico.",
        pontos: { ave: 2 },
      },
      {
        id: "q5-d",
        icone: "😴",
        titulo: "Bem sedentário ou sem rotina fixa",
        descricao: "Rotina imprevisível ou pouco ativa.",
        pontos: { roedor: 2, gato: 1 },
      },
    ],
  },
  {
    numero: 6,
    pergunta: "Quanto cabe no seu orçamento mensal para o pet?",
    opcoes: [
      {
        id: "q6-a",
        icone: "💰",
        titulo: "Orçamento confortável",
        descricao: "Consigo cobrir ração, vet, banho/tosa e passeador se precisar.",
        pontos: { cao: 2 },
      },
      {
        id: "q6-b",
        icone: "💳",
        titulo: "Orçamento médio",
        descricao: "Dá para cuidar bem, sem grandes luxos.",
        pontos: { gato: 2, cao: 1 },
      },
      {
        id: "q6-c",
        icone: "🪙",
        titulo: "Orçamento moderado/baixo",
        descricao: "Prefiro um custo mensal mais enxuto.",
        pontos: { ave: 2, roedor: 1 },
      },
      {
        id: "q6-d",
        icone: "🧾",
        titulo: "Orçamento bem apertado",
        descricao: "Preciso de algo bem econômico.",
        pontos: { roedor: 2 },
      },
    ],
  },
  {
    numero: 7,
    pergunta: "Por quanto tempo você consegue se comprometer?",
    opcoes: [
      {
        id: "q7-a",
        icone: "📅",
        titulo: "10–15 anos ou mais, sem medo",
        descricao: "Estou pronto para um compromisso de longuíssimo prazo.",
        pontos: { cao: 2, gato: 1 },
      },
      {
        id: "q7-b",
        icone: "📆",
        titulo: "Longo prazo, mas com um pet mais independente",
        descricao: "Quero longevidade com menos dependência diária.",
        pontos: { gato: 2, ave: 1 },
      },
      {
        id: "q7-c",
        icone: "🗓️",
        titulo: "Médio prazo (5–8 anos)",
        descricao: "Um compromisso considerável, mas não vitalício.",
        pontos: { roedor: 2, ave: 1 },
      },
      {
        id: "q7-d",
        icone: "⏲️",
        titulo: "Prefiro um compromisso mais curto (2–4 anos)",
        descricao: "Prefiro algo de prazo mais curto.",
        pontos: { roedor: 2 },
      },
    ],
  },
  {
    numero: 8,
    pergunta: "E o barulho, como fica?",
    opcoes: [
      {
        id: "q8-a",
        icone: "🔊",
        titulo: "Latido não me incomoda (nem aos vizinhos)",
        descricao: "Latidos fazem parte e minha vizinhança aceita bem.",
        pontos: { cao: 2 },
      },
      {
        id: "q8-b",
        icone: "🤫",
        titulo: "Quero o mínimo de barulho possível",
        descricao: "Prefiro tranquilidade e silêncio em casa.",
        pontos: { gato: 2 },
      },
      {
        id: "q8-c",
        icone: "🎶",
        titulo: "Cantos e assobios deixariam a casa mais alegre",
        descricao: "Quero som e vida no ambiente.",
        pontos: { ave: 2 },
      },
      {
        id: "q8-d",
        icone: "🌌",
        titulo: "Barulhinhos noturnos não me incomodam",
        descricao: "Não me importo com atividade durante a madrugada.",
        pontos: { roedor: 2 },
      },
    ],
  },
];
