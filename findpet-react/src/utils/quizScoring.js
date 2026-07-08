/*
  Lógica de pontuação do quiz "Qual é o seu pet ideal?", conforme o roteiro
  em roteiro-quiz-findpet.md (seções 1, 4 e 5).

  - Soma os pontos de cada resposta escolhida para cao/gato/roedor/ave.
  - Em caso de empate, aplica o desempate na ordem: P2 (tempo), P4 (interação), P1 (espaço).
  - Verifica a "trava de responsabilidade": P2=q2-d, P3=q3-d e P6=q6-d ao mesmo tempo.
*/

const ORDEM_DESEMPATE = [2, 4, 1];

function encontrarOpcaoEscolhida(pergunta, respostas) {
  const opcaoId = respostas[pergunta.numero];
  return pergunta.opcoes.find((opcao) => opcao.id === opcaoId) || null;
}

function resolverEmpate(animaisEmpatados, respostas, perguntas) {
  let empatados = animaisEmpatados;

  for (const numero of ORDEM_DESEMPATE) {
    if (empatados.length <= 1) break;

    const pergunta = perguntas.find((p) => p.numero === numero);
    const opcaoEscolhida = pergunta && encontrarOpcaoEscolhida(pergunta, respostas);
    if (!opcaoEscolhida) continue;

    const beneficiados = empatados.filter(
      (animal) => (opcaoEscolhida.pontos[animal] || 0) > 0
    );

    if (beneficiados.length > 0 && beneficiados.length < empatados.length) {
      empatados = beneficiados;
    }
  }

  return empatados;
}

export function calcularResultado(respostas, perguntas) {
  const pontuacao = { cao: 0, gato: 0, roedor: 0, ave: 0 };

  perguntas.forEach((pergunta) => {
    const opcaoEscolhida = encontrarOpcaoEscolhida(pergunta, respostas);
    if (!opcaoEscolhida) return;

    Object.entries(opcaoEscolhida.pontos).forEach(([animal, pontos]) => {
      pontuacao[animal] += pontos;
    });
  });

  const maiorPontuacao = Math.max(...Object.values(pontuacao));
  const empatados = Object.keys(pontuacao).filter(
    (animal) => pontuacao[animal] === maiorPontuacao
  );

  const animais = resolverEmpate(empatados, respostas, perguntas);

  const travaAtiva =
    respostas[2] === "q2-d" && respostas[3] === "q3-d" && respostas[6] === "q6-d";

  return { pontuacao, animais, travaAtiva };
}
