import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./QuizResult.css";
import { RESULTADOS, ALERTA_TRAVA } from "../../data/quizResultados";
import { getResultado } from "../../services/quizStorage";

/*
  QuizResult é a tela final do quiz, mostrando o animal ideal calculado em
  utils/quizScoring.js a partir das respostas guardadas no localStorage.

  Se não houver resultado salvo (ex: usuário acessou a rota direto, sem
  responder o quiz), volta para a tela inicial do quiz.
*/
function QuizResult() {
  const navigate = useNavigate();
  const resultado = getResultado();

  useEffect(() => {
    if (!resultado) {
      navigate("/quiz", { replace: true });
    }
  }, [resultado, navigate]);

  if (!resultado) {
    return null;
  }

  const { animais, travaAtiva } = resultado;
  const principal = RESULTADOS[animais[0]];
  const empatado = animais.length > 1 ? RESULTADOS[animais[1]] : null;

  function voltarParaInicio() {
    navigate("/");
  }

  return (
    <main className="quiz-result">
      <button
        type="button"
        className="quiz-result-close"
        onClick={voltarParaInicio}
        aria-label="Cancelar e voltar para a tela inicial"
      >
        <svg
          width="20"
          height="20"
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

      <div className="quiz-result-content">
        <p className="quiz-result-eyebrow">Resultado do quiz</p>

        <h1 className="quiz-result-title">
          {principal.emoji} {principal.nome}
          {empatado && (
            <>
              {" "}
              &amp; {empatado.emoji} {empatado.nome}
            </>
          )}
        </h1>

        <p className="quiz-result-description">
          {principal.descricao}
          {empatado && <> {empatado.descricao}</>}
        </p>

        <ul className="quiz-result-avisos">
          {principal.avisos.map((aviso) => (
            <li key={aviso}>{aviso}</li>
          ))}
          {empatado?.avisos.map((aviso) => (
            <li key={aviso}>{aviso}</li>
          ))}
        </ul>

        {travaAtiva && (
          <div className="quiz-result-alert">
            <p>{ALERTA_TRAVA}</p>
          </div>
        )}

        <div className="quiz-result-image-wrapper">
          <img
            className="quiz-result-image"
            src={principal.imagem}
            alt={`Ilustração de um(a) ${principal.nome.toLowerCase()}`}
          />
        </div>

        <Link to="/" className="quiz-result-button">
          Ir adotar
        </Link>
      </div>
    </main>
  );
}

export default QuizResult;
