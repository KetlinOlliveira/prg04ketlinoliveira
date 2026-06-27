import "./QuizProgress.css";

interface QuizProgressProps {
  /** Número da pergunta atual (começa em 1) */
  current: number;
  /** Total de perguntas */
  total: number;
}

// Barra de progresso do quiz, com contador "atual/total".
function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="quiz-progress">
      <div
        className="quiz-progress__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-label={`Pergunta ${current} de ${total}`}
      >
        <div
          className="quiz-progress__fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="quiz-progress__counter">
        {current}/{total}
      </span>
    </div>
  );
}

export default QuizProgress;
