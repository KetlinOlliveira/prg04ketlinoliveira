// Guarda as respostas e o resultado do quiz no localStorage, para o cálculo
// de pontuação acontecer só depois da última pergunta ser respondida.
const RESPOSTAS_KEY = "quizRespostas";
const RESULTADO_KEY = "quizResultado";

// Lê as respostas já dadas (mapa número da pergunta -> id da opção escolhida).
export function getRespostas() {
  const respostasSalvas = localStorage.getItem(RESPOSTAS_KEY);

  if (!respostasSalvas) {
    return {};
  }

  try {
    return JSON.parse(respostasSalvas);
  } catch {
    localStorage.removeItem(RESPOSTAS_KEY);
    return {};
  }
}

// Salva a opção escolhida numa pergunta específica.
export function salvarResposta(numero, opcaoId) {
  const respostas = getRespostas();
  respostas[numero] = opcaoId;
  localStorage.setItem(RESPOSTAS_KEY, JSON.stringify(respostas));
}

// Apaga as respostas salvas (usado ao reiniciar o quiz).
export function limparRespostas() {
  localStorage.removeItem(RESPOSTAS_KEY);
}

// Lê o resultado calculado ao final do quiz.
export function getResultado() {
  const resultadoSalvo = localStorage.getItem(RESULTADO_KEY);

  if (!resultadoSalvo) {
    return null;
  }

  try {
    return JSON.parse(resultadoSalvo);
  } catch {
    localStorage.removeItem(RESULTADO_KEY);
    return null;
  }
}

// Salva o resultado calculado (animal(is) vencedor(es) e se a trava ativou).
export function salvarResultado(resultado) {
  localStorage.setItem(RESULTADO_KEY, JSON.stringify(resultado));
}

// Apaga o resultado salvo.
export function limparResultado() {
  localStorage.removeItem(RESULTADO_KEY);
}
