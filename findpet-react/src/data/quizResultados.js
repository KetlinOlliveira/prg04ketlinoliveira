import imagemCao from "../assets/images/quiz-resultado-cao.png";
import imagemGato from "../assets/images/quiz-resultado-gato.png";
import imagemRoedor from "../assets/images/quiz-resultado-roedor.png";
import imagemAve from "../assets/images/quiz-resultado-ave.png";

/*
  Textos e imagens dos resultados do quiz, conforme a seção 6 do roteiro
  em roteiro-quiz-findpet.md.

  As imagens abaixo são placeholders (mesma ilustração da tela inicial) —
  basta substituir os arquivos em src/assets/images/quiz-resultado-*.png
  por uma imagem própria de cada animal.
*/
export const RESULTADOS = {
  cao: {
    emoji: "🐶",
    nome: "Cão",
    descricao:
      "Você tem tempo, presença, energia e espaço — exatamente o que um cão precisa. Prepare-se para passeios diários, brincadeiras e um amor que não cabe em você.",
    avisos: [
      "Considere adoção em ONGs e abrigos.",
      "Escolha o porte de acordo com o seu espaço — raças pequenas se adaptam bem a apartamentos.",
    ],
    imagem: imagemCao,
  },
  gato: {
    emoji: "🐱",
    nome: "Gato",
    descricao:
      "Você quer companhia e carinho, mas valoriza independência — dos dois lados. Gatos se adaptam muito bem a apartamentos, lidam bem com sua ausência durante o dia e retribuem com ronronados e amassadinhos.",
    avisos: [
      "Caixa de areia sempre limpa.",
      "Arranhador e telas de proteção nas janelas são essenciais.",
      "Capriche no enriquecimento ambiental.",
    ],
    imagem: imagemGato,
  },
  roedor: {
    emoji: "🐹",
    nome: "Roedor",
    descricao:
      "Com rotina corrida ou espaço pequeno, um hamster ou porquinho-da-índia é a companhia perfeita: fofos, de baixo custo e fáceis de cuidar.",
    avisos: [
      "Hamster: mais independente, compromisso mais curto (2–3 anos).",
      "Porquinho-da-índia: mais sociável, vive de 5 a 8 anos e é mais feliz em dupla.",
      "Gaiola espaçosa, limpeza regular e feno diário (para o porquinho) são obrigatórios.",
    ],
    imagem: imagemRoedor,
  },
  ave: {
    emoji: "🦜",
    nome: "Ave",
    descricao:
      "Você gosta de vida, som e interações leves — calopsitas e periquitos criam vínculo real com o tutor, aprendem truques e adoram um ombro para pousar.",
    avisos: [
      "No Brasil, tenha apenas espécies domésticas: calopsita, periquito-australiano, canário, mandarim, manon, diamante-de-gould e rolinha-diamante.",
      "NUNCA compre aves silvestres (sabiá, trinca-ferro, papagaio, azulão) sem origem legalizada — isso alimenta o tráfico de animais.",
      "Compre sempre de criadores certificados, com nota fiscal.",
    ],
    imagem: imagemAve,
  },
};

export const ALERTA_TRAVA =
  "Pelo seu momento atual, talvez valha esperar um pouco antes de adotar. Todo pet, mesmo o mais independente, precisa de tempo, dinheiro e presença. Que tal voltar aqui quando a rotina der uma folga? 🐾";
