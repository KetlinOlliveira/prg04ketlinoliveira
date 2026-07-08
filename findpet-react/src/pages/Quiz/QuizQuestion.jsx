import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./QuizQuestion.css";
import { perguntas } from "../../data/quizQuestions";
import { calcularResultado } from "../../utils/quizScoring";
import {
  getRespostas,
  salvarResposta,
  salvarResultado,
} from "../../services/quizStorage";

/*
  QuizQuestion é a tela de uma pergunta do quiz.

  A pergunta e as opções exibidas dependem do número na URL
  (/quiz/pergunta/:numero), buscado em data/quizQuestions.js. Cada resposta
  é salva no localStorage (services/quizStorage.js) para que, ao chegar na
  última pergunta, o resultado seja calculado com base em todas as respostas.
*/
function QuizQuestion() {
  const { numero } = useParams();
  const navigate = useNavigate();

  const numeroAtual = Number(numero);
  const totalPerguntas = perguntas.length;
  const pergunta = perguntas.find((p) => p.numero === numeroAtual);

  const [opcaoSelecionada, setOpcaoSelecionada] = useState(
    () => getRespostas()[numeroAtual] || null
  );

  useEffect(() => {
    if (!pergunta) {
      navigate("/quiz", { replace: true });
      return;
    }

    setOpcaoSelecionada(getRespostas()[numeroAtual] || null);
  }, [numeroAtual, pergunta, navigate]);

  if (!pergunta) {
    return null;
  }

  const progresso = (numeroAtual / totalPerguntas) * 100;

  function voltar() {
    navigate(-1);
  }

  function cancelar() {
    navigate("/");
  }

  function selecionarOpcao(id) {
    setOpcaoSelecionada(id);
    salvarResposta(numeroAtual, id);
  }

  function continuar() {
    if (numeroAtual < totalPerguntas) {
      navigate(`/quiz/pergunta/${numeroAtual + 1}`);
      return;
    }

    const resultado = calcularResultado(getRespostas(), perguntas);
    salvarResultado(resultado);
    navigate("/quiz/resultado");
  }

  return (
    <main className="quiz-question">
      <header className="quiz-question-top">
        <button
          type="button"
          className="quiz-back"
          onClick={voltar}
          aria-label="Voltar para a pergunta anterior"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="quiz-progress">
          <div className="quiz-progress-track">
            <div
              className="quiz-progress-fill"
              style={{ width: `${progresso}%` }}
            ></div>
          </div>
          <span className="quiz-progress-label">
            {numeroAtual}/{totalPerguntas}
          </span>
        </div>

        <button
          type="button"
          className="quiz-cancel"
          onClick={cancelar}
          aria-label="Cancelar quiz e voltar para a tela inicial"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>
      </header>

      <h1 className="quiz-question-title">{pergunta.pergunta}</h1>

      <ul className="quiz-options">
        {pergunta.opcoes.map((opcao) => (
          <li key={opcao.id}>
            <button
              type="button"
              className={`quiz-option ${
                opcaoSelecionada === opcao.id ? "quiz-option-selected" : ""
              }`}
              onClick={() => selecionarOpcao(opcao.id)}
            >
              <span className="quiz-option-icon" aria-hidden="true">
                {opcao.icone}
              </span>
              <span className="quiz-option-texts">
                <span className="quiz-option-title">{opcao.titulo}</span>
                <span className="quiz-option-desc">{opcao.descricao}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="quiz-next"
        disabled={!opcaoSelecionada}
        onClick={continuar}
      >
        Continuar
      </button>
    </main>
  );
}

export default QuizQuestion;
