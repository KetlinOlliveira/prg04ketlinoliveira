const RESPOSTAS_KEY = "quizRespostas";
const RESULTADO_KEY = "quizResultado";

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

export function salvarResposta(numero, opcaoId) {
  const respostas = getRespostas();
  respostas[numero] = opcaoId;
  localStorage.setItem(RESPOSTAS_KEY, JSON.stringify(respostas));
}

export function limparRespostas() {
  localStorage.removeItem(RESPOSTAS_KEY);
}

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

export function salvarResultado(resultado) {
  localStorage.setItem(RESULTADO_KEY, JSON.stringify(resultado));
}

export function limparResultado() {
  localStorage.removeItem(RESULTADO_KEY);
}
