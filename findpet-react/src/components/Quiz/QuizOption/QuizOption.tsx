import type { QuizOption as QuizOptionType } from "../../../types/quiz";
import "./QuizOption.css";

interface QuizOptionProps {
  option: QuizOptionType;
  isSelected: boolean;
  onSelect: (optionId: string) => void;
}

// Card de alternativa: emoji, título e descrição opcional.
// Fica destacado quando selecionado.
function QuizOption({ option, isSelected, onSelect }: QuizOptionProps) {
  return (
    <button
      type="button"
      className={`quiz-option${isSelected ? " quiz-option--selected" : ""}`}
      onClick={() => onSelect(option.id)}
      aria-pressed={isSelected}
    >
      {option.emoji && (
        <span className="quiz-option__emoji" aria-hidden="true">
          {option.emoji}
        </span>
      )}
      <span className="quiz-option__texts">
        <span className="quiz-option__title">{option.title}</span>
        {option.description && (
          <span className="quiz-option__description">{option.description}</span>
        )}
      </span>
    </button>
  );
}

export default QuizOption;
