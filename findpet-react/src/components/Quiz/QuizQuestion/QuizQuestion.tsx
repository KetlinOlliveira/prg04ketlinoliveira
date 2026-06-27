import type { QuizQuestion as QuizQuestionType } from "../../../types/quiz";
import QuizProgress from "../QuizProgress/QuizProgress";
import QuizOption from "../QuizOption/QuizOption";
import "./QuizQuestion.css";

interface QuizQuestionProps {
  question: QuizQuestionType;
  /** Índice da pergunta atual (começa em 0) */
  index: number;
  /** Total de perguntas */
  total: number;
  /** Alternativa já selecionada nesta pergunta (se houver) */
  selectedOptionId?: string;
  /** Chamado ao escolher uma alternativa */
  onSelectOption: (optionId: string) => void;
  /** Volta para a pergunta anterior (ou intro, se for a primeira) */
  onBack: () => void;
  /** Avança para a próxima pergunta (ou resultado, se for a última) */
  onNext: () => void;
}

// Tela de uma pergunta: voltar + progresso, enunciado, alternativas
// e botão de avançar (habilitado após escolher uma alternativa).
function QuizQuestion({
  question,
  index,
  total,
  selectedOptionId,
  onSelectOption,
  onBack,
  onNext,
}: QuizQuestionProps) {
  const isLast = index === total - 1;
  const hasAnswer = Boolean(selectedOptionId);

  return (
    <div className="quiz-question">
      <div className="quiz-question__top">
        <button
          type="button"
          className="quiz-question__back"
          onClick={onBack}
          aria-label="Voltar"
        >
          {"\u2039"}
        </button>
        <QuizProgress current={index + 1} total={total} />
      </div>

      <h2 className="quiz-question__title">{question.question}</h2>

      <div className="quiz-question__options">
        {question.options.map((option) => (
          <QuizOption
            key={option.id}
            option={option}
            isSelected={selectedOptionId === option.id}
            onSelect={onSelectOption}
          />
        ))}
      </div>

      <button
        type="button"
        className="quiz-question__next"
        onClick={onNext}
        disabled={!hasAnswer}
      >
        {isLast ? "Ver resultado" : "Continuar"}
      </button>
    </div>
  );
}

export default QuizQuestion;
