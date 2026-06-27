import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QuizQuestion.css";

/*
  QuizQuestion é a tela de uma pergunta do quiz.

  Esta é a PRIMEIRA pergunta (modelo). As próximas páginas podem ser
  criadas com base nesta, trocando o texto da pergunta, as opções e
  o número do progresso (perguntaAtual / totalPerguntas).

  As opções ficam em um array para ficar fácil de editar e reaproveitar.
*/

// Edite estes valores para montar a sua pergunta:
const perguntaAtual = 1;
const totalPerguntas = 5;

const pergunta = "Quanto tempo livre você tem no seu dia a dia?";

const opcoes = [
  {
    id: "muito",
    icone: "🌞",
    titulo: "Bastante tempo",
    descricao: "Tenho a manhã ou a tarde livres para passeios e brincadeiras.",
  },
  {
    id: "medio",
    icone: "⏰",
    titulo: "Um tempinho",
    descricao: "Consigo algumas horas por dia para cuidar de um amigo.",
  },
  {
    id: "pouco",
    icone: "🌙",
    titulo: "Pouco tempo",
    descricao: "Minha rotina é corrida e fico fora boa parte do dia.",
  },
];

function QuizQuestion() {
  const navigate = useNavigate();
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);

  const progresso = (perguntaAtual / totalPerguntas) * 100;

  function voltar() {
    navigate(-1);
  }

  function selecionarOpcao(id) {
    setOpcaoSelecionada(id);
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
            {perguntaAtual}/{totalPerguntas}
          </span>
        </div>
      </header>

      <h1 className="quiz-question-title">{pergunta}</h1>

      <ul className="quiz-options">
        {opcoes.map((opcao) => (
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
        onClick={() => navigate(`/quiz/pergunta/${perguntaAtual + 1}`)}
      >
        Continuar
      </button>
    </main>
  );
}

export default QuizQuestion;
