import { Link, useNavigate } from "react-router-dom";
import quizGato from "../../assets/images/quiz-image.png";
import "./QuizStart.css";

/*
  QuizStart é a primeira tela do quiz "Qual pet é ideal para você?".

  Ela mostra uma mensagem de boas-vindas, um botão para iniciar o quiz
  e a ilustração do gatinho na parte de baixo. No canto superior esquerdo
  há um botão de "X" que leva o usuário de volta para a tela inicial.
*/
function QuizStart() {
  const navigate = useNavigate();

  function voltarParaInicio() {
    navigate("/");
  }

  return (
    <main className="quiz-start">
      <button
        type="button"
        className="quiz-close"
        onClick={voltarParaInicio}
        aria-label="Voltar para a tela inicial"
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

      <div className="quiz-start-content">
        <p className="quiz-start-eyebrow">Quiz FindPet</p>

        <h1 className="quiz-start-title">
          Descubra se você está pronto para ter um pet
        </h1>

        <p className="quiz-start-text">
          Responda algumas perguntinhas rápidas e nós te ajudamos a descobrir
          qual amigo de quatro patas combina mais com a sua rotina e com o seu
          jeitinho.
        </p>

        <Link to="/quiz/pergunta/1" className="quiz-start-button">
          Iniciar quiz
        </Link>
      </div>

      <div className="quiz-start-image-wrapper">
        <img
          className="quiz-start-image"
          src={quizGato}
          alt="Ilustração de um gato laranja tranquilo"
        />
      </div>
    </main>
  );
}

export default QuizStart;